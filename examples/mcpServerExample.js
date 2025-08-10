import { z } from 'zod'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { GraphQLSchema, parse, OperationTypeNode, Kind, buildClientSchema } from 'graphql'
import { SCHEMA_ITEM_TYPES, extractSchemaItemsFromObject } from './extract_schema.js'
import { readFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { MCPLogger } from './McpLogger.js'

const logger = new MCPLogger()
// Interval in minutes of max age of introspect schema before updating.
const INTROSPECT_SCHEMA_MAX_AGE_MINUTES = 10;

const EnvSchema = z.object({
	HOST_ADDR: z.string(),
	API_KEY: z.string().optional(),
	DEBUG_LOG: z.boolean().optional(),
})

const ENV = EnvSchema.parse(process.env)
// If gets left blank (see manifest.json), replace with unset
if (ENV.API_KEY == '${user_config.api_key}') {
	ENV.API_KEY = undefined
}

const MCP_NAME = 'enterprise-api-mcp-server'
const MCP_VERSION = '1.0.0'
const MCP_DESCRIPTION = 'GraphQL MCP extension for Enterprise Web'
const CONFIG = {
	host: ENV.HOST_ADDR,
}


const introspectQuery = `
query introspectionQuery {
  __schema {
    queryType { name }
    types {
      ...FullType
    }
    directives {
      name
      description
      locations
      args {
        ...InputValue
      }
    }
  }
}

fragment FullType on __Type {
  kind
  name
  description
  fields(includeDeprecated: true) {
    name
    description
    args {
      ...InputValue
    }
    type {
      ...TypeRef
    }
    isDeprecated
    deprecationReason
  }
  inputFields {
    ...InputValue
  }
  interfaces {
    ...TypeRef
  }
  enumValues(includeDeprecated: true) {
    name
    description
    isDeprecated
    deprecationReason
  }
  possibleTypes {
    ...TypeRef
  }
}

fragment InputValue on __InputValue {
  name
  description
  type { ...TypeRef }
  defaultValue
}

fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`

const loginMutation = `
mutation LoginMutation($username: String!, $passphrase: String!, $selectedStoreId: UInt!) {
	createSession(user: $username, password: $passphrase, storeId: $selectedStoreId) {
		token
		userName
	}
}`

const closeSessionMutation = `
mutation CloseSessionMutation {
	closeSession
}`

const getServerInformationQuery = `
query ServerInformation {
	serverInformation {
		schemaVersion
		releaseVersionNumber
	}
}
`

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const quickReference: string = await readFile(join(__dirname, "../quick_reference.md"), "utf-8")

// Return graphql endpoint url
function getEndpoint(): string {
	return `${CONFIG.host}`
}

// Return client brand name for user agent header
function get_client_brand(): string {
	return `${MCP_NAME}/${MCP_VERSION}`
}

// Return default headers for GraphQL requests
function get_default_headers(): Record<string, string> {
	return {
		'User-Agent': get_client_brand(),
		'apollographql-client-name': MCP_NAME,
		'apollographql-client-version': MCP_VERSION,
		'Content-Type': 'application/json',
	}
}

// Return MCP text response
function textResponse(text: string): { content: [{ type: 'text'; text: string }] } {
	return {
		content: [{ type: 'text', text }],
	}
}

// Return MCP error text response
function errorTextResponse(text: string): { isError: true; content: [{ type: 'text'; text: string }] } {
	return {
		isError: true,
		...textResponse(text),
	}
}

// Perform a graphql query
// extras is additional fields to pass in request body
function performQuery(
	headers: Record<string, string>,
	query?: string,
	variables?: string | object,
	extras?: Record<string, string>,
): Promise<Response> {
	const endpoint = getEndpoint()
	const payload = {
		method: 'POST',
		headers,
		body: JSON.stringify({
			query,
			variables,
			...(extras ?? {}),
		}),
	}
	if (ENV.DEBUG_LOG) {
		console.error(`[performQuery] endpoint: ${endpoint}\n${JSON.stringify(payload, null, 2)}`)
	}
	return fetch(endpoint, payload)
}

/**
 * Introspect a GraphQL endpoint and return the schema as the GraphQL SDL
 * @returns The schema
 */
async function introspectEndpoint(headers: Record<string, string>): Promise<GraphQLSchema> {
	const response = await performQuery(headers, introspectQuery)

	if (!response.ok) {
		const responseText = await response.text()

		throw new Error(`GraphQL request failed: ${response.statusText}\n${responseText}`)
	}

	const responseJson = await response.json()
	// Transform to a schema object

	const schema = buildClientSchema(responseJson.data)

	return schema
}

// Return time now seconds identifier.
//
// Do not rely on being in sync with any clock, only usable for seeing differences in time.
export function time_now(): number {
	return process.hrtime()[0]
}

// Return difference in seconds from old time.
export function time_diff(old: number) {
	return process.hrtime([old, 0])[0]
}

interface SchemaCache {
	extracted: Record<string, Record<string, string>>
	last_updated: number
}

const SCHEMA_CACHE: SchemaCache = {
	extracted: {},
	last_updated: time_now() - ((INTROSPECT_SCHEMA_MAX_AGE_MINUTES + 1) * 60),  // always old at start
}

// Update schema cache
function update_schema_cache(schema: Record<string, Record<string, string>>){
	SCHEMA_CACHE.extracted = schema
	SCHEMA_CACHE.last_updated = time_now()
}

// Get schema cache age in seconds
function schema_cache_age(): number {
	return time_diff(SCHEMA_CACHE.last_updated)
}

async function getCachedExtractedSchema(): Promise<Record<string, Record<string, string>>> {
	if (schema_cache_age() > INTROSPECT_SCHEMA_MAX_AGE_MINUTES * 60){
		const schema = await introspectEndpoint(get_default_headers())
		update_schema_cache(extractSchemaItemsFromObject(schema))
		// update_schema_cache(extractSchemaItems(printSchema(schema)))
	}
	return SCHEMA_CACHE.extracted
}

// Get current date as yyyy-mm-dd
// https://stackoverflow.com/a/12409344
function get_formatted_date_today(): string {
	const today = new Date()
	const yyyy = today.getFullYear()
	let mm: string | number = today.getMonth() + 1 // Months start at 0!
	let dd: string | number = today.getDate()

	if (dd < 10) dd = `0${dd}`
	if (mm < 10) mm = `0${mm}`

	return `${yyyy}-${mm}-${dd}`
}

const schemaItemTypeSchema = z.enum(SCHEMA_ITEM_TYPES)

// Setup and return new McpServer instance for transport
export function setupServer(sessionId: string): McpServer {
	try {
		logger.info('Setting up MCP server instance', { sessionId })
		
		// Per-connection query request headers
		const mcp_headers = get_default_headers()
		logger.debug('Default headers configured', { headers: Object.keys(mcp_headers) })

		if (ENV.API_KEY) {
			mcp_headers['auth-token'] = ENV.API_KEY
			logger.debug('API key configured from environment')
		}

		logger.info('Creating McpServer instance', { name: MCP_NAME, version: MCP_VERSION })
		const server = new McpServer({
			name: MCP_NAME,
			version: MCP_VERSION,
			description: MCP_DESCRIPTION,
		})

	server.tool('get_session_info', 'Get mcp session ID and GraphQL token if logged in', () => {
		logger.info('Tool called: get_session_info')
		const token = mcp_headers['auth-token']
		const extra = token ? 'Logged in' : 'Not logged in'
		return textResponse(`MCP Session ID: ${sessionId}\n${extra}\nGraphQL Host: ${ENV.HOST_ADDR}`)
	})

	server.tool('get_current_date', 'Get current date as YYYY-MM-DD', () => {
		logger.info('Tool called: get_current_date')
		return textResponse(`Today is ${get_formatted_date_today()}`)
	})

	const authenticate_tool = server.tool(
		'authenticate',
		'Log in to the enterprise api. Required prior to running some queries. Ask user for credentials. Disabled once successfully logged in. You can find the store id map with `Query.storesForLogin`',
		{
			username: z.string().min(1, 'Username is required'),
			password: z.string().min(1, 'Password is required'),
			selectedStoreId: z.number().int().positive('Store ID must be a positive integer'),
		},
		async ({ username, password, selectedStoreId }) => {
			logger.info('Tool called: authenticate', { username, selectedStoreId })
			const response = await performQuery(
				mcp_headers,
				loginMutation,
				{ username, passphrase: password, selectedStoreId },
				{ operationName: 'LoginMutation' },
			)

			// console.log(response)

			if (!response.ok) {
				const responseText = await response.text()

				throw new Error(`Login request failed: ${response.statusText}\n${responseText}`)
			}

			const responseJson = await response.json()

			// console.log(responseJson)

			const createSession = responseJson?.data?.createSession
			const token = createSession?.token
			const userName = createSession?.userName

			if (token && userName) {
				mcp_headers['auth-token'] = `${token}`
				authenticate_tool.disable()

				return textResponse(`Success: Logged in as ${userName}`)
			} else {
				return errorTextResponse(
					`Login failure: Token not found in response:\n${JSON.stringify(responseJson, null, 2)}`,
				)
			}
		},
	)

	const close_session_tool = server.tool(
		'close_session',
		'Close the GraphQL session. Re-enables the authenticate tool if it is currently disabled.',
		async () => {
			logger.info('Tool called: close_session')
			const response = await performQuery(mcp_headers, closeSessionMutation)

			const responseText = await response.text()
			if (!response.ok) {
				return errorTextResponse(`GraphQL request failed: ${response.statusText}\n${responseText}`)
			}

			if (mcp_headers['auth-token']) {
				delete mcp_headers['auth-token']  // = undefined
				authenticate_tool.enable()
			}
			return textResponse(`Presumably session should be closed now. ${responseText}`)
		},
	)

	// If api key passed in to use, disable user's ability to log in or out
	if (ENV.API_KEY) {
		authenticate_tool.disable()
		close_session_tool.disable()
	}

	server.tool(
		'get_server_information_query',
		'Query GraphQL server for schema version and release version number.',
		async () => {
			logger.info('Tool called: get_server_information_query')
			const response = await performQuery(mcp_headers, getServerInformationQuery)

			const responseText = await response.text()
			if (!response.ok) {
				return errorTextResponse(`GraphQL request failed: ${response.statusText}\n${responseText}`)
			}

			const response_json = JSON.parse(responseText)
			if (!response_json.data) {
				return errorTextResponse('`data` field missing on response JSON')
			}
			return textResponse(JSON.stringify(response_json.data))
		},
	)

	server.tool('quick_reference', 'Start with quick_reference() to get business context before exploring.', () => {
		logger.info('Tool called: quick_reference')
		return textResponse(quickReference)
	})

	server.tool(
		'explore_schema',
		'Introspect the GraphQL schema. The GraphQL schema is too large to post all at once, so you can use this to get either lists of possible items or info about a specific item or list of specific items.',
		{
			type: schemaItemTypeSchema,
			items: z.union([z.string(), z.array(z.string())]).optional(),
		},
		async ({ type, items }) => {
			logger.info('Tool called: explore_schema', { type, items })
			const extractedSchema = await getCachedExtractedSchema()
			const extractedTypes = extractedSchema[type]

			// const meta_age_text = `\n\n[metainfo] Introspected schema cache is ${schema_cache_age()} seconds old`

			// It isn't supposed to, but for some reason ais tend to do array as
			// stringified json string instead of an actual array object
			if (items && typeof items === 'string' && items[0] == '[') {
				try {
					items = JSON.parse(items)
				} catch (error) {
					const message = error instanceof Error ? error.message : 'An error occurred parsing JSON.'
					return errorTextResponse(message)
				}
			}

			if (!items) {
				// Specific item undefined, return list of items
				const validItems = Object.keys(extractedTypes).join(', ')
				return textResponse(`Valid item entries of type \`${type}\`:\n${validItems}`)
			}
			if (Array.isArray(items)) {
				const response: string[] = []
				for (const item of items) {
					const result = extractedTypes[item]
					if (result) {
						response.push(result)
					} else {
						response.push(`Item \`${item}\` not found.\n`)
					}
				}
				return textResponse(response.join('\n\n'))
			} else {
				const item = items
				const response = extractedTypes[item]
				if (response) {
					return textResponse(response)
				}
				const validItems = Object.keys(extractedTypes).join(', ')
				return errorTextResponse(`Item \`${item}\` not found. Valid item entries of type \`${type}\`:\n${validItems}`)
			}
		},
	)

	server.tool(
		'search_schema',
		'Search all schema item types for items that contain the given keyword in their body. For use with explore_schema. Note that this is case-sensitive.',
		{
			keyword: z.string().min(1, 'Keyword is required').max(100, 'Keyword too long'),
		},
		async ({ keyword }) => {
			logger.info('Tool called: search_schema', { keyword })
			const extractedSchema = await getCachedExtractedSchema()

			// const meta_age_text = `\n\n[metainfo] Introspected schema cache is ${schema_cache_age()} seconds old`

			const groups: Record<string, string[]> = {}
			for (const item_type of SCHEMA_ITEM_TYPES) {
				const matches: string[] = []

				const items = extractedSchema[item_type]
				for (const item_name in items) {
					const item_body = items[item_name]

					if (item_body.includes(keyword)) {
						matches.push(item_name)
					}
				}

				if (matches.length > 0) {
					groups[item_type] = matches
				}
			}

			if (Object.keys(groups).length === 0) {
				return textResponse(`No schema items found containing keyword \`${keyword}\``)
			}

			return textResponse(JSON.stringify(groups, null, 1))
		},
	)

	server.tool(
		'query_graphql',
		'Query a GraphQL endpoint with the given query and variables. Try not to let the responses be too long or the context window will be too big to continue.',
		{
			query: z.string().min(1, 'Query is required'),
			variables: z.string().optional(),
		},
		async ({ query, variables }) => {
			logger.info('Tool called: query_graphql', { query: query.substring(0, 100) + '...', variables })
			try {
				const parsedQuery = parse(query)

				// Check if the query is a mutation
				const isMutation = parsedQuery.definitions.some(
					def => def.kind === Kind.OPERATION_DEFINITION && def.operation === OperationTypeNode.MUTATION,
				)

				if (isMutation) {
					// && !ALLOW_MUTATIONS) {
					return errorTextResponse('Mutations are not allowed. Please use a query operation instead.')
				}
			} catch (error) {
				return errorTextResponse(`Invalid GraphQL query: ${error}`)
			}

			try {
				const response = await performQuery(mcp_headers, query, variables)

				const responseText = await response.text()
				if (!response.ok) {
					return errorTextResponse(`GraphQL request failed: ${response.statusText}\n${responseText}`)
				}

				const data = JSON.parse(responseText)

				if (data.errors && data.errors.length > 0) {
					// Contains GraphQL errors
					//JSON.stringify(data, null, 2))
					return errorTextResponse(`The GraphQL response has errors, please fix the query: ${responseText}`)
				}

				// Why bother re-stringifying parsed if we can just reuse unparsed?
				return textResponse(responseText) //JSON.stringify(data, null, 2))
			} catch (error) {
				return errorTextResponse(`Failed to execute GraphQL query: ${error}`)
			}
		},
	)

		logger.info('MCP server setup completed successfully', { sessionId })
		return server
		
	} catch (error) {
		logger.critical('Failed to setup MCP server', { 
			sessionId,
			error: error instanceof Error ? error.message : error,
			stack: error instanceof Error ? error.stack : undefined
		})
		throw error
	}
}
