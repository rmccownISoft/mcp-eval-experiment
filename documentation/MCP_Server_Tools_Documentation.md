# Enterprise API MCP Server - Tools Documentation

## Overview

This document describes the MCP (Model Context Protocol) server tools provided by the `@isoftdata/enterprise-api-mcp` server. This server acts as a bridge between MCP clients and the ITrack Enterprise GraphQL API, providing tools for authentication, schema exploration, and GraphQL querying.

**Server Information:**
- Name: `enterprise-api-mcp-server`
- Version: `1.0.0`
- Description: `GraphQL MCP extension for Enterprise Web`
- Repository: https://github.com/ISoft-Data-Systems/enterprise-api-mcp

## Server Configuration

### Environment Variables
- `HOST_ADDR` (required): GraphQL endpoint URL (e.g., "https://dev.itrackenterprise.com/graphql")
- `API_KEY` (optional): Pre-configured API key for authentication
- `DEBUG_LOG` (optional): Enable debug logging

### Transport Support
The server supports both STDIO and HTTP transports:
- **STDIO**: Direct process communication
- **HTTP**: RESTful HTTP interface on port 4000 (configurable via PORT env var)

## Available Tools

### 1. get_session_info

**Description:** Get MCP session ID and GraphQL token authentication status.

**Parameters:** None

**Response Format:**
```
MCP Session ID: {sessionId}
{Logged in|Not logged in}
GraphQL Host: {HOST_ADDR}
```

**Example Response:**
```
MCP Session ID: 550e8400-e29b-41d4-a716-446655440000
Logged in
GraphQL Host: https://dev.itrackenterprise.com/graphql
```

### 2. get_current_date

**Description:** Get current date in YYYY-MM-DD format.

**Parameters:** None

**Response Format:**
```
Today is {YYYY-MM-DD}
```

**Example Response:**
```
Today is 2025-01-10
```

### 3. authenticate

**Description:** Log in to the enterprise API. Required prior to running most queries. Disabled once successfully logged in or if API_KEY is pre-configured.

**Parameters:**
- `username` (string, required): Username for authentication
- `password` (string, required): Password for authentication  
- `selectedStoreId` (number, required): Store ID (positive integer)

**Response Format:**
- Success: `Success: Logged in as {userName}`
- Error: `Login failure: Token not found in response: {response}`

**Notes:**
- Use `Query.storesForLogin` to get available store IDs
- Tool becomes disabled after successful login
- Re-enabled when `close_session` is called

### 4. close_session

**Description:** Close the GraphQL session and re-enable the authenticate tool.

**Parameters:** None

**Response Format:**
```
Presumably session should be closed now. {response}
```

**Notes:**
- Removes authentication token from headers
- Re-enables the `authenticate` tool
- Disabled if API_KEY is pre-configured

### 5. get_server_information_query

**Description:** Query GraphQL server for schema version and release version number.

**Parameters:** None

**Response Format:**
```json
{
  "serverInformation": {
    "schemaVersion": "...",
    "releaseVersionNumber": "..."
  }
}
```

### 6. quick_reference

**Description:** Get business context and quick reference guide for the ITrack Enterprise system.

**Parameters:** None

**Response:** Returns the complete quick reference markdown content covering:
- System overview (inventory, sales, purchases, vehicles, work orders, reporting)
- Authentication requirements
- Key entity patterns
- Schema navigation tips
- Common query patterns and examples
- Pricing complexity notes
- Work orders & jobs workflow
- Common field name gotchas
- Key data relationships

### 7. explore_schema

**Description:** Introspect the GraphQL schema. Get lists of schema items or detailed information about specific items.

**Parameters:**
- `type` (enum, required): One of: `"enum"`, `"type"`, `"union"`, `"input"`, `"scalar"`, `"interface"`
- `items` (string | string[], optional): Specific item name(s) to get details for

**Response Formats:**

**List all items of a type:**
```
Valid item entries of type `{type}`:
Item1, Item2, Item3, ...
```

**Get specific item details:**
```
{type} {ItemName} {
  field1: Type1
  field2: Type2
  ...
}
```

**Get multiple item details:**
```
{type} Item1 {
  ...
}

{type} Item2 {
  ...
}
```

**Error response:**
```
Item `{item}` not found. Valid item entries of type `{type}`:
ValidItem1, ValidItem2, ...
```

**Examples:**
- `explore_schema(type: "type")` - List all GraphQL types
- `explore_schema(type: "input", items: "SalesOrderFilter")` - Get SalesOrderFilter input details
- `explore_schema(type: "type", items: ["Customer", "SalesOrder"])` - Get multiple type details

### 8. search_schema

**Description:** Search all schema item types for items containing a keyword (case-sensitive).

**Parameters:**
- `keyword` (string, required): Search keyword (1-100 characters)

**Response Format:**

**Items found:**
```json
{
  "type": ["TypeName1", "TypeName2"],
  "input": ["InputName1"],
  "enum": ["EnumName1", "EnumName2"]
}
```

**No items found:**
```
No schema items found containing keyword `{keyword}`
```

### 9. query_graphql

**Description:** Execute GraphQL queries against the enterprise API endpoint.

**Parameters:**
- `query` (string, required): GraphQL query string
- `variables` (string, optional): JSON string of query variables

**Response Format:**

**Successful query:**
```json
{
  "data": {
    // Query results
  }
}
```

**GraphQL errors:**
```
The GraphQL response has errors, please fix the query: {response}
```

**Request errors:**
```
GraphQL request failed: {statusText}
{responseText}
```

**Invalid query:**
```
Invalid GraphQL query: {error}
```

**Notes:**
- Mutations are blocked for safety
- Query validation is performed before execution
- Variables can be passed as JSON string
- Authentication token is automatically included if logged in

## Schema Caching

The server implements intelligent schema caching:
- Schema is introspected on first use
- Cache expires after 10 minutes
- Automatic re-introspection when cache is stale
- Improves performance for repeated schema operations

## Error Handling

All tools return structured error responses with `isError: true` flag when errors occur. Common error scenarios:

1. **Authentication errors**: Invalid credentials, missing store ID
2. **GraphQL errors**: Invalid queries, server-side errors
3. **Network errors**: Connection failures, timeouts
4. **Validation errors**: Invalid parameters, missing required fields

## Session Management

- Each MCP connection gets a unique session ID
- Sessions maintain independent authentication state
- HTTP transport supports session persistence via `mcp-session-id` header
- Automatic cleanup of unused sessions after 60 minutes

## Development and Testing Considerations

### For MCP Client Development:
1. Start with `quick_reference()` to understand the business domain
2. Use `explore_schema()` to discover available GraphQL types
3. Use `search_schema()` to find relevant schema items
4. Test authentication flow with `authenticate()` and `close_session()`
5. Validate GraphQL queries with `query_graphql()`

### For Testing Suite Development:
1. Test all authentication states (logged out, logged in, API key mode)
2. Verify schema caching behavior
3. Test error handling for invalid queries and network failures
4. Validate session management and cleanup
5. Test both STDIO and HTTP transport modes

### Sample Test Scenarios:
```javascript
// Authentication flow test
await client.call_tool("authenticate", {
  username: "testuser",
  password: "testpass", 
  selectedStoreId: 1
});

// Schema exploration test
await client.call_tool("explore_schema", {
  type: "type",
  items: ["Customer", "SalesOrder"]
});

// GraphQL query test
await client.call_tool("query_graphql", {
  query: "query { storesForLogin { id name } }"
});
```

## Business Context

The ITrack Enterprise system manages:
- **Inventory**: Parts, vehicles, serialized items, locations, stock tracking
- **Sales**: Orders, customers, pricing, payments
- **Purchases**: Orders, vendors, receiving
- **Vehicles**: Details, VIN decoding, appraisals, bidding
- **Work Orders**: Service/repair job tracking
- **Reporting**: Dashboard reports, subscriptions, queuing

Key relationships:
- WorkOrder ← Job (1:many)
- SalesOrder ← SalesOrderLine (1:many)  
- Customer ← SalesOrder (1:many)
- Store-scoped entities

This documentation should provide sufficient detail for developing MCP clients and comprehensive testing suites for the Enterprise API MCP server.
