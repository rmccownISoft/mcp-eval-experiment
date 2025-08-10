/**
 * MCP Client for Enterprise API MCP Server
 * Complete rewrite based on actual server specification
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

// Types for the MCP client
export type SchemaType = "enum" | "type" | "union" | "input" | "scalar" | "interface";

export interface MCPServerConfig {
  transport: 'stdio' | 'http';
  // For HTTP transport
  url?: string;
  port?: number;
  // For STDIO transport
  command?: string;
  args?: string[];
  cwd?: string;
  // Environment variables
  env?: {
    HOST_ADDR?: string;
    API_KEY?: string;
    DEBUG_LOG?: string;
  };
  // Connection settings
  timeout?: number;
  // Test credentials
  username?: string;
  password?: string;
  storeId?: number;
}

export interface MCPConnectionState {
  connected: boolean;
  initialized: boolean;
  authenticated: boolean;
  sessionId?: string;
  serverInfo?: {
    name: string;
    version: string;
  };
  capabilities?: {
    tools?: boolean;
    resources?: boolean;
    prompts?: boolean;
    logging?: boolean;
  };
  availableTools?: any[];
  sessionInfo?: {
    username?: string;
    storeId?: number;
    sessionId?: string;
    loginTime?: Date;
  };
  authenticationError?: string;
}

export interface MCPToolCall {
  toolName: string;
  parameters: Record<string, any>;
  timestamp: Date;
  duration: number;
  success: boolean;
  response?: any;
  error?: string;
}

export class MCPServerError extends Error {
  constructor(
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'MCPServerError';
  }
}

export class MCPClient {
  private config: MCPServerConfig;
  private client: Client | null = null;
  private transport: StdioClientTransport | StreamableHTTPClientTransport | null = null;
  private connectionState: MCPConnectionState;
  private toolCallHistory: MCPToolCall[] = [];

  constructor(config: MCPServerConfig) {
    this.config = {
      // Set defaults
      port: 3000,
      timeout: 30000,
      ...config
    };
    
    this.connectionState = {
      connected: false,
      initialized: false,
      authenticated: false
    };
  }

  /**
   * Connect to the MCP server
   */
  public async connect(): Promise<boolean> {
    try {
      // Create appropriate transport
      if (this.config.transport === 'stdio') {
        if (!this.config.command) {
          throw new MCPServerError('Command is required for stdio transport');
        }
        
        const options: any = {
          command: this.config.command,
          args: this.config.args || []
        };
        
        // Add environment variables if specified
        if (this.config.env) {
          options.env = { ...process.env, ...this.config.env };
        }
        
        // Add working directory if specified
        if (this.config.cwd) {
          options.cwd = this.config.cwd;
        }
        
        this.transport = new StdioClientTransport(options);
      } else if (this.config.transport === 'http') {
        const url = this.config.url || `http://localhost:${this.config.port}`;
        this.transport = new StreamableHTTPClientTransport(new URL(url));
      } else {
        throw new MCPServerError(`Unsupported transport: ${this.config.transport}`);
      }

      // Create MCP client
      this.client = new Client(
        {
          name: 'mcp-test-suite',
          version: '1.0.0'
        },
        {
          capabilities: {
            roots: {
              listChanged: true
            },
            sampling: {}
          }
        }
      );

      // Connect to server
      await this.client.connect(this.transport);
      this.connectionState.connected = true;

      // Initialize the connection
      const initResult = await this.initialize();
      return initResult;
    } catch (error) {
      this.connectionState.connected = false;
      this.connectionState.initialized = false;
      this.connectionState.authenticated = false;
      
      if (error instanceof Error) {
        throw new MCPServerError(
          `Failed to connect to MCP server: ${error.message}`,
          { transport: this.config.transport, originalError: error }
        );
      }
      throw error;
    }
  }

  /**
   * Initialize MCP protocol handshake
   */
  private async initialize(): Promise<boolean> {
    if (!this.client) {
      throw new MCPServerError('Client not connected');
    }

    try {
      // List available tools to validate connection
      const toolsResult = await this.client.listTools();
      
      this.connectionState.initialized = true;
      this.connectionState.availableTools = toolsResult.tools;
      this.connectionState.capabilities = {
        tools: true,
        resources: false,
        prompts: false,
        logging: false
      };

      this.connectionState.serverInfo = {
        name: 'enterprise-api-mcp-server',
        version: '1.0.0'
      };

      return true;
    } catch (error) {
      this.connectionState.initialized = false;
      
      if (error instanceof Error) {
        throw new MCPServerError(
          `Failed to initialize MCP protocol: ${error.message}`,
          { originalError: error }
        );
      }
      throw error;
    }
  }

  /**
   * Disconnect from MCP server
   */
  public async disconnect(): Promise<void> {
    try {
      if (this.client) {
        await this.client.close();
        this.client = null;
      }
      
      if (this.transport) {
        await this.transport.close();
        this.transport = null;
      }
      
      this.connectionState = {
        connected: false,
        initialized: false,
        authenticated: false
      };
    } catch (error) {
      console.warn('Warning during MCP client disconnect:', error);
      
      // Force cleanup
      this.client = null;
      this.transport = null;
      this.connectionState = {
        connected: false,
        initialized: false,
        authenticated: false
      };
    }
  }

  /**
   * Check if connected and initialized
   */
  public isConnected(): boolean {
    return this.connectionState.connected && this.connectionState.initialized;
  }

  /**
   * Check if authenticated
   */
  public isAuthenticated(): boolean {
    return this.connectionState.authenticated;
  }

  /**
   * Get connection state
   */
  public getConnectionState(): MCPConnectionState {
    return { ...this.connectionState };
  }

  /**
   * Get tool call history
   */
  public getToolCallHistory(): MCPToolCall[] {
    return [...this.toolCallHistory];
  }

  /**
   * Clear tool call history
   */
  public clearToolCallHistory(): void {
    this.toolCallHistory = [];
  }

  /**
   * Get configuration
   */
  public getConfig(): MCPServerConfig {
    return { ...this.config };
  }

  /**
   * Generic tool call method
   */
  private async callTool(toolName: string, parameters: Record<string, any> = {}): Promise<any> {
    if (!this.client || !this.connectionState.initialized) {
      throw new MCPServerError('MCP client not initialized. Call connect() first.');
    }

    const startTime = Date.now();
    
    try {
      const result = await this.client.callTool({
        name: toolName,
        arguments: parameters
      });

      const duration = Date.now() - startTime;
      this.trackToolCall(toolName, parameters, duration, true, result);

      // Check for server error responses
      if (this.isServerError(result)) {
        throw new MCPServerError(
          `Server returned error for '${toolName}': ${this.extractErrorMessage(result)}`,
          { toolName, parameters, response: result }
        );
      }

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.trackToolCall(toolName, parameters, duration, false, undefined, error);
      
      if (error instanceof MCPServerError) {
        throw error;
      }
      
      if (error instanceof Error) {
        throw new MCPServerError(
          `Tool call failed for '${toolName}': ${error.message}`,
          { toolName, parameters, originalError: error }
        );
      }
      throw error;
    }
  }

  /**
   * Check if response indicates a server error
   */
  private isServerError(response: any): boolean {
    return response && 
           typeof response === 'object' && 
           'isError' in response && 
           response.isError === true;
  }

  /**
   * Extract error message from server error response
   */
  private extractErrorMessage(response: any): string {
    if (response && response.content && Array.isArray(response.content)) {
      const textContent = response.content.find((item: any) => item.type === 'text');
      if (textContent && textContent.text) {
        return textContent.text;
      }
    }
    return 'Unknown server error';
  }

  /**
   * Extract text content from MCP response
   */
  private extractTextContent(response: any): string {
    if (response && response.content && Array.isArray(response.content)) {
      const textContent = response.content.find((item: any) => item.type === 'text');
      if (textContent && textContent.text) {
        return textContent.text;
      }
    }
    return '';
  }

  /**
   * Track tool call for metrics
   */
  private trackToolCall(
    toolName: string, 
    parameters: Record<string, any>, 
    duration: number, 
    success: boolean, 
    response?: any, 
    error?: any
  ): MCPToolCall {
    const toolCall: MCPToolCall = {
      toolName,
      parameters,
      timestamp: new Date(),
      duration,
      success,
      response,
      error: error ? (error instanceof Error ? error.message : String(error)) : undefined
    };

    this.toolCallHistory.push(toolCall);
    return toolCall;
  }

  // ========================================
  // MCP Server Tool Implementations
  // ========================================

  /**
   * Tool 1: get_session_info
   * Get MCP session ID and GraphQL token authentication status
   */
  public async getSessionInfo(): Promise<string> {
    const result = await this.callTool('get_session_info');
    const content = this.extractTextContent(result);
    
    // Parse session ID from response
    const sessionIdMatch = content.match(/MCP Session ID: ([a-f0-9-]+)/);
    if (sessionIdMatch) {
      this.connectionState.sessionId = sessionIdMatch[1];
    }
    
    // Check authentication status
    this.connectionState.authenticated = content.includes('Logged in');
    
    return content;
  }

  /**
   * Tool 2: get_current_date
   * Get current date in YYYY-MM-DD format
   */
  public async getCurrentDate(): Promise<string> {
    const result = await this.callTool('get_current_date');
    return this.extractTextContent(result);
  }

  /**
   * Tool 3: authenticate
   * Log in to the enterprise API
   */
  public async authenticate(username: string, password: string, selectedStoreId: number): Promise<boolean> {
    if (typeof selectedStoreId !== 'number' || selectedStoreId <= 0) {
      throw new MCPServerError('selectedStoreId must be a positive number');
    }

    try {
      const result = await this.callTool('authenticate', {
        username,
        password,
        selectedStoreId
      });

      const content = this.extractTextContent(result);
      const success = content.includes('Success: Logged in as');

      if (success) {
        this.connectionState.authenticated = true;
        this.connectionState.sessionInfo = {
          username,
          storeId: selectedStoreId,
          sessionId: this.connectionState.sessionId,
          loginTime: new Date()
        };
        this.connectionState.authenticationError = undefined;
        
        // Refresh available tools as authentication changes tool availability
        await this.refreshAvailableTools();
      } else {
        this.connectionState.authenticated = false;
        this.connectionState.sessionInfo = undefined;
        this.connectionState.authenticationError = content;
      }

      return success;
    } catch (error) {
      this.connectionState.authenticated = false;
      this.connectionState.sessionInfo = undefined;
      this.connectionState.authenticationError = error instanceof Error ? error.message : String(error);
      throw error;
    }
  }

  /**
   * Tool 4: close_session
   * Close the GraphQL session and re-enable the authenticate tool
   */
  public async closeSession(): Promise<string> {
    const result = await this.callTool('close_session');
    
    // Reset authentication state
    this.connectionState.authenticated = false;
    this.connectionState.sessionInfo = undefined;
    this.connectionState.authenticationError = undefined;
    
    // Refresh available tools as session closure changes tool availability
    await this.refreshAvailableTools();
    
    return this.extractTextContent(result);
  }

  /**
   * Tool 5: get_server_information_query
   * Query GraphQL server for schema version and release version number
   */
  public async getServerInformationQuery(): Promise<any> {
    const result = await this.callTool('get_server_information_query');
    const content = this.extractTextContent(result);
    
    try {
      return JSON.parse(content);
    } catch {
      return content;
    }
  }

  /**
   * Tool 6: quick_reference
   * Get business context and quick reference guide for the ITrack Enterprise system
   */
  public async getQuickReference(): Promise<string> {
    const result = await this.callTool('quick_reference');
    return this.extractTextContent(result);
  }

  /**
   * Tool 7: explore_schema
   * Introspect the GraphQL schema
   */
  public async exploreSchema(type: SchemaType, items?: string | string[]): Promise<string> {
    const validTypes: SchemaType[] = ["enum", "type", "union", "input", "scalar", "interface"];
    
    if (!validTypes.includes(type)) {
      throw new MCPServerError(
        `Invalid schema type '${type}'. Valid types: ${validTypes.join(', ')}`
      );
    }

    const parameters: Record<string, any> = { type };
    if (items !== undefined) {
      parameters.items = items;
    }

    const result = await this.callTool('explore_schema', parameters);
    return this.extractTextContent(result);
  }

  /**
   * Tool 8: search_schema
   * Search all schema item types for items containing a keyword
   */
  public async searchSchema(keyword: string): Promise<any> {
    if (!keyword || keyword.trim().length === 0) {
      throw new MCPServerError('Search keyword cannot be empty');
    }

    if (keyword.length > 100) {
      throw new MCPServerError('Search keyword cannot exceed 100 characters');
    }

    const result = await this.callTool('search_schema', { keyword: keyword.trim() });
    const content = this.extractTextContent(result);
    
    // Try to parse as JSON, fallback to text
    try {
      return JSON.parse(content);
    } catch {
      return content;
    }
  }

  /**
   * Tool 9: query_graphql
   * Execute GraphQL queries against the enterprise API endpoint
   */
  public async queryGraphQL(query: string, variables?: string): Promise<any> {
    if (!query || query.trim().length === 0) {
      throw new MCPServerError('GraphQL query cannot be empty');
    }

    // Check for mutations (blocked for safety)
    if (query.trim().toLowerCase().startsWith('mutation')) {
      throw new MCPServerError('Mutations are blocked for safety');
    }

    const parameters: Record<string, any> = { query: query.trim() };
    if (variables !== undefined && variables.trim().length > 0) {
      // Validate JSON format for variables
      try {
        JSON.parse(variables);
        parameters.variables = variables.trim();
      } catch {
        throw new MCPServerError('Variables must be valid JSON string');
      }
    }

    const result = await this.callTool('query_graphql', parameters);
    const content = this.extractTextContent(result);
    
    // Try to parse as JSON, fallback to text
    try {
      return JSON.parse(content);
    } catch {
      return content;
    }
  }

  /**
   * Refresh available tools list
   */
  private async refreshAvailableTools(): Promise<void> {
    if (!this.client || !this.connectionState.initialized) {
      return;
    }

    try {
      const toolsResult = await this.client.listTools();
      this.connectionState.availableTools = toolsResult.tools;
    } catch (error) {
      console.warn('Failed to refresh available tools:', error);
    }
  }

  /**
   * Get available tools from server
   */
  public async getAvailableTools(): Promise<string[]> {
    if (!this.client || !this.connectionState.initialized) {
      throw new MCPServerError('MCP client not initialized. Call connect() first.');
    }

    try {
      const result = await this.client.listTools();
      this.connectionState.availableTools = result.tools;
      return result.tools.map(tool => tool.name);
    } catch (error) {
      if (error instanceof Error) {
        throw new MCPServerError(
          `Failed to list tools: ${error.message}`,
          { originalError: error }
        );
      }
      throw error;
    }
  }

  // ========================================
  // Convenience Methods
  // ========================================

  /**
   * Get current session information from connection state
   */
  public getCurrentSession(): MCPConnectionState['sessionInfo'] {
    return this.connectionState.sessionInfo;
  }

  /**
   * Get session ID
   */
  public getSessionId(): string | undefined {
    return this.connectionState.sessionId;
  }

  /**
   * Check connection health
   */
  public async checkConnection(): Promise<boolean> {
    if (!this.connectionState.connected || !this.connectionState.initialized) {
      return false;
    }

    try {
      await this.getAvailableTools();
      return true;
    } catch (error) {
      this.connectionState.connected = false;
      this.connectionState.initialized = false;
      this.connectionState.authenticated = false;
      return false;
    }
  }
}
