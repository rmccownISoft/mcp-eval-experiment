/**
 * Tool Format Translator
 * Converts MCP tool definitions to Claude's expected format
 */

import { MCPClient } from '../mcp/MCPClient.js';

// Claude tool format (Anthropic API)
export interface ClaudeTool {
  name: string;
  description: string;
  input_schema: {
    type: 'object';
    properties: Record<string, any>;
    required?: string[];
  };
}

// MCP tool format (from MCP SDK)
export interface MCPTool {
  name: string;
  description?: string;
  inputSchema: {
    type: string;
    properties?: Record<string, any>;
    required?: string[];
    [key: string]: any;
  };
}

export class ToolFormatTranslator {
  /**
   * Convert MCP tools to Claude format
   */
  static convertMCPToolsToClaudeFormat(mcpTools: MCPTool[]): ClaudeTool[] {
    return mcpTools.map(tool => this.convertSingleTool(tool));
  }

  /**
   * Convert a single MCP tool to Claude format
   */
  static convertSingleTool(mcpTool: MCPTool): ClaudeTool {
    return {
      name: mcpTool.name,
      description: mcpTool.description || `Execute ${mcpTool.name} tool`,
      input_schema: {
        type: 'object',
        properties: this.convertProperties(mcpTool.inputSchema.properties || {}),
        required: mcpTool.inputSchema.required || []
      }
    };
  }

  /**
   * Convert MCP properties to Claude format
   */
  private static convertProperties(mcpProperties: Record<string, any>): Record<string, any> {
    const claudeProperties: Record<string, any> = {};

    for (const [key, value] of Object.entries(mcpProperties)) {
      claudeProperties[key] = this.convertProperty(value);
    }

    return claudeProperties;
  }

  /**
   * Convert a single property from MCP to Claude format
   */
  private static convertProperty(mcpProperty: any): any {
    if (!mcpProperty || typeof mcpProperty !== 'object') {
      return mcpProperty;
    }

    const claudeProperty: any = { ...mcpProperty };

    // Handle enum types
    if (mcpProperty.enum) {
      claudeProperty.type = 'string';
      claudeProperty.enum = mcpProperty.enum;
    }

    // Handle anyOf -> oneOf conversion
    if (mcpProperty.anyOf) {
      claudeProperty.oneOf = mcpProperty.anyOf.map((item: any) => this.convertProperty(item));
      delete claudeProperty.anyOf;
    }

    // Handle array items
    if (mcpProperty.type === 'array' && mcpProperty.items) {
      claudeProperty.items = this.convertProperty(mcpProperty.items);
    }

    // Handle nested object properties
    if (mcpProperty.type === 'object' && mcpProperty.properties) {
      claudeProperty.properties = this.convertProperties(mcpProperty.properties);
    }

    return claudeProperty;
  }

  /**
   * Get MCP tools from client and convert to Claude format
   */
  static async getMCPToolsAsClaudeFormat(mcpClient: MCPClient): Promise<ClaudeTool[]> {
    if (!mcpClient.isConnected()) {
      throw new Error('MCP client not connected');
    }

    // Get available tools from MCP server
    const toolNames = await mcpClient.getAvailableTools();
    
    // Create tool definitions based on known MCP server tools
    const mcpTools: MCPTool[] = this.createMCPToolDefinitions(toolNames);
    
    return this.convertMCPToolsToClaudeFormat(mcpTools);
  }

  /**
   * Create MCP tool definitions for known enterprise API tools
   */
  private static createMCPToolDefinitions(toolNames: string[]): MCPTool[] {
    const toolDefinitions: Record<string, MCPTool> = {
      get_session_info: {
        name: 'get_session_info',
        description: 'Get MCP session ID and GraphQL token authentication status',
        inputSchema: {
          type: 'object',
          properties: {},
          required: []
        }
      },
      get_current_date: {
        name: 'get_current_date',
        description: 'Get current date in YYYY-MM-DD format',
        inputSchema: {
          type: 'object',
          properties: {},
          required: []
        }
      },
      authenticate: {
        name: 'authenticate',
        description: 'Log in to the enterprise API with username, password, and store ID',
        inputSchema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'Username for authentication'
            },
            password: {
              type: 'string',
              description: 'Password for authentication'
            },
            selectedStoreId: {
              type: 'number',
              description: 'Store ID to authenticate with (must be a positive integer)'
            }
          },
          required: ['username', 'password', 'selectedStoreId']
        }
      },
      close_session: {
        name: 'close_session',
        description: 'Close the GraphQL session and re-enable the authenticate tool',
        inputSchema: {
          type: 'object',
          properties: {},
          required: []
        }
      },
      get_server_information_query: {
        name: 'get_server_information_query',
        description: 'Query GraphQL server for schema version and release version number',
        inputSchema: {
          type: 'object',
          properties: {},
          required: []
        }
      },
      quick_reference: {
        name: 'quick_reference',
        description: 'Get business context and quick reference guide for the ITrack Enterprise system',
        inputSchema: {
          type: 'object',
          properties: {},
          required: []
        }
      },
      explore_schema: {
        name: 'explore_schema',
        description: 'Introspect the GraphQL schema to explore types, enums, unions, inputs, scalars, or interfaces',
        inputSchema: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['enum', 'type', 'union', 'input', 'scalar', 'interface'],
              description: 'Type of schema items to explore'
            },
            items: {
              oneOf: [
                {
                  type: 'string',
                  description: 'Single item name to explore'
                },
                {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Array of item names to explore'
                }
              ],
              description: 'Specific items to explore (optional)'
            }
          },
          required: ['type']
        }
      },
      search_schema: {
        name: 'search_schema',
        description: 'Search all schema item types for items containing a keyword',
        inputSchema: {
          type: 'object',
          properties: {
            keyword: {
              type: 'string',
              description: 'Keyword to search for in schema items (max 100 characters)',
              maxLength: 100
            }
          },
          required: ['keyword']
        }
      },
      query_graphql: {
        name: 'query_graphql',
        description: 'Execute GraphQL queries against the enterprise API endpoint (mutations are blocked)',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'GraphQL query to execute (mutations not allowed)'
            },
            variables: {
              type: 'string',
              description: 'JSON string of variables for the query (optional)'
            }
          },
          required: ['query']
        }
      }
    };

    return toolNames
      .filter(name => name in toolDefinitions)
      .map(name => toolDefinitions[name]);
  }

  /**
   * Validate Claude tool format
   */
  static validateClaudeTool(tool: ClaudeTool): boolean {
    if (!tool.name || typeof tool.name !== 'string') {
      return false;
    }

    if (!tool.description || typeof tool.description !== 'string') {
      return false;
    }

    if (!tool.input_schema || typeof tool.input_schema !== 'object') {
      return false;
    }

    if (tool.input_schema.type !== 'object') {
      return false;
    }

    return true;
  }

  /**
   * Get system prompt for Claude with tool context
   */
  static getSystemPromptWithTools(tools: ClaudeTool[]): string {
    const toolDescriptions = tools.map(tool => 
      `- ${tool.name}: ${tool.description}`
    ).join('\n');

    return `You are an AI assistant that helps users interact with a heavy truck salvage yard ERP system through GraphQL queries.

Available MCP Tools:
${toolDescriptions}

Key Guidelines:
1. Always authenticate first before using tools that require authentication
2. Use explore_schema and search_schema to understand the data structure before querying
3. Use quick_reference to understand the business context
4. When building GraphQL queries, start simple and build complexity gradually
5. Always validate your understanding with the user before executing complex operations
6. If authentication fails or session expires, guide the user through re-authentication
7. Provide clear explanations of what each tool does and why you're using it

Authentication Details:
- Default test credentials: username='ai', password='demo', storeId=1
- Tools become available/unavailable based on authentication state
- Session management is handled automatically

Remember: You're helping users explore and query a truck salvage yard database with work orders, inventory, sales orders, parts, and stocking information.`;
  }
}
