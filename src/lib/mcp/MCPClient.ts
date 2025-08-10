/**
 * MCP Client for GraphQL-API Server Integration
 * Phase 2.1: HTTP Transport & MCP Protocol Foundation
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { 
  MCPServerConfig, 
  MCPToolCall, 
  MCPServerError,
  MCPTestError 
} from '../types.js';

export interface MCPConnectionState {
  connected: boolean;
  initialized: boolean;
  authenticated: boolean;
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
    storeId?: string;
    sessionId?: string;
    loginTime?: Date;
  };
  authenticationError?: string;
}

export class MCPClient {
  private config: MCPServerConfig;
  private client: Client | null = null;
  private transport: StdioClientTransport | StreamableHTTPClientTransport | null = null;
  private connectionState: MCPConnectionState;
  private toolCallHistory: MCPToolCall[] = [];

  constructor(config: MCPServerConfig) {
    this.config = config;
    this.connectionState = {
      connected: false,
      initialized: false,
      authenticated: false
    };
  }

  /**
   * Initialize connection to MCP server
   * Phase 2.1: Multi-transport implementation (stdio and streamable HTTP)
   */
  public async connect(): Promise<boolean> {
    try {
      // Create appropriate transport based on configuration
      if (this.config.transport === 'stdio') {
        // For local MCP server testing via stdio
        if (!this.config.command) {
          throw new MCPServerError(
            'Command is required for stdio transport',
            { transport: this.config.transport }
          );
        }
        this.transport = new StdioClientTransport({
          command: this.config.command,
          args: this.config.args || []
        });
      } else if (this.config.transport === 'http') {
        // For remote MCP server testing via streamable HTTP
        this.transport = new StreamableHTTPClientTransport(new URL(this.config.url));
      } else {
        throw new MCPServerError(
          `Unsupported transport: ${this.config.transport}. Supported transports: stdio, http`,
          { transport: this.config.transport }
        );
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
          { url: this.config.url, transport: this.config.transport, originalError: error }
        );
      }
      throw error;
    }
  }

  /**
   * Initialize MCP protocol handshake
   * Phase 2.1: Protocol initialization
   */
  private async initialize(): Promise<boolean> {
    if (!this.client) {
      throw new MCPServerError('Client not connected');
    }

    try {
      // The SDK handles the initialize handshake automatically during connect()
      // We just need to capture the server info and capabilities
      
      // Get server capabilities by listing tools (this will also validate the connection)
      const toolsResult = await this.client.listTools();
      
      this.connectionState.initialized = true;
      this.connectionState.availableTools = toolsResult.tools;
      this.connectionState.capabilities = {
        tools: true, // We know tools are supported if we got a response
        resources: false, // Will be determined later if needed
        prompts: false, // Will be determined later if needed
        logging: false // Will be determined later if needed
      };

      // Server info would typically come from the initialize response
      // For now, we'll set basic info
      this.connectionState.serverInfo = {
        name: 'GraphQL-API MCP Server',
        version: 'unknown'
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
   * Phase 2.1: Connection lifecycle management
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
      // Log error but don't throw - we want to ensure cleanup happens
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
   * Check connection status
   * Phase 2.1: Connection status checking
   */
  public async checkConnection(): Promise<boolean> {
    if (!this.connectionState.connected || !this.connectionState.initialized) {
      return false;
    }

    try {
      // Perform a lightweight operation to verify connection
      await this.getAvailableTools();
      return true;
    } catch (error) {
      this.connectionState.connected = false;
      this.connectionState.initialized = false;
      this.connectionState.authenticated = false;
      return false;
    }
  }

  /**
   * Get available tools from MCP server
   * Phase 2.1: Tools discovery
   */
  public async getAvailableTools(): Promise<string[]> {
    if (!this.client || !this.connectionState.initialized) {
      throw new MCPServerError('MCP client not initialized. Call connect() first.');
    }

    try {
      const startTime = Date.now();
      const result = await this.client.listTools();
      const duration = Date.now() - startTime;

      // Update cached tools
      this.connectionState.availableTools = result.tools;

      // Track this as a tool call
      this.trackToolCall('tools/list', {}, duration, true, result);

      return result.tools.map(tool => tool.name);
    } catch (error) {
      const duration = Date.now() - Date.now(); // Will be 0 for failed calls
      this.trackToolCall('tools/list', {}, duration, false, undefined, error);
      
      if (error instanceof Error) {
        throw new MCPServerError(
          `Failed to list tools: ${error.message}`,
          { originalError: error }
        );
      }
      throw error;
    }
  }

  /**
   * Call a tool on the MCP server
   * Phase 2.1: Basic tool calling
   */
  public async callTool(toolName: string, parameters: Record<string, any> = {}): Promise<any> {
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

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.trackToolCall(toolName, parameters, duration, false, undefined, error);
      
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
   * Track tool call for metrics
   * Phase 2.1: Enhanced tool call tracking
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

  /**
   * Get connection state
   * Phase 2.1: Connection state inspection
   */
  public getConnectionState(): MCPConnectionState {
    return { ...this.connectionState };
  }

  /**
   * Get tool call history
   * Phase 2.1: Tool call tracking
   */
  public getToolCallHistory(): MCPToolCall[] {
    return [...this.toolCallHistory];
  }

  /**
   * Clear tool call history
   * Phase 2.1: History management
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
   * Check if connected and initialized
   */
  public isConnected(): boolean {
    return this.connectionState.connected && this.connectionState.initialized;
  }

  // Phase 2.2: Authentication & Session Management

  /**
   * Authenticate with the MCP server
   * Phase 2.2: Authentication implementation
   */
  public async authenticateUser(username: string, password: string, selectedStoreId: string): Promise<boolean> {
    if (!this.client || !this.connectionState.initialized) {
      throw new MCPServerError('MCP client not initialized. Call connect() first.');
    }

    const startTime = Date.now();
    
    try {
      const result = await this.client.callTool({
        name: 'authenticate',
        arguments: {
          username,
          password,
          selectedStoreId
        }
      });

      const duration = Date.now() - startTime;
      
      // Check if authentication was successful
      const success = result && 
        typeof result === 'object' && 
        'content' in result && 
        Array.isArray(result.content) && 
        result.content.some((item: any) => 
          item.type === 'text' && item.text && item.text.includes('successfully')
        );

      if (success) {
        // Update authentication state
        this.connectionState.authenticated = true;
        this.connectionState.sessionInfo = {
          username,
          storeId: selectedStoreId,
          loginTime: new Date()
        };
        this.connectionState.authenticationError = undefined;
        
        // Refresh available tools as authentication may change tool availability
        await this.getAvailableTools();
      } else {
        // Authentication failed
        this.connectionState.authenticated = false;
        this.connectionState.sessionInfo = undefined;
        this.connectionState.authenticationError = 'Authentication failed';
      }

      this.trackToolCall('authenticate', { username, selectedStoreId }, duration, success, result);
      
      return success;
    } catch (error) {
      const duration = Date.now() - startTime;
      
      // Authentication failed due to error
      this.connectionState.authenticated = false;
      this.connectionState.sessionInfo = undefined;
      this.connectionState.authenticationError = error instanceof Error ? error.message : String(error);
      
      this.trackToolCall('authenticate', { username, selectedStoreId }, duration, false, undefined, error);
      
      if (error instanceof Error) {
        throw new MCPServerError(
          `Authentication failed: ${error.message}`,
          { username, selectedStoreId, originalError: error }
        );
      }
      throw error;
    }
  }

  /**
   * Get current session information
   * Phase 2.2: Session management
   */
  public async getSessionInfo(): Promise<any> {
    if (!this.client || !this.connectionState.initialized) {
      throw new MCPServerError('MCP client not initialized. Call connect() first.');
    }

    const startTime = Date.now();
    
    try {
      const result = await this.client.callTool({
        name: 'get_session_info',
        arguments: {}
      });

      const duration = Date.now() - startTime;
      this.trackToolCall('get_session_info', {}, duration, true, result);

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.trackToolCall('get_session_info', {}, duration, false, undefined, error);
      
      if (error instanceof Error) {
        throw new MCPServerError(
          `Failed to get session info: ${error.message}`,
          { originalError: error }
        );
      }
      throw error;
    }
  }

  /**
   * Close the current session
   * Phase 2.2: Session management
   */
  public async closeSession(): Promise<boolean> {
    if (!this.client || !this.connectionState.initialized) {
      throw new MCPServerError('MCP client not initialized. Call connect() first.');
    }

    const startTime = Date.now();
    
    try {
      const result = await this.client.callTool({
        name: 'close_session',
        arguments: {}
      });

      const duration = Date.now() - startTime;
      
      // Reset authentication state
      this.connectionState.authenticated = false;
      this.connectionState.sessionInfo = undefined;
      this.connectionState.authenticationError = undefined;
      
      // Refresh available tools as session closure may change tool availability
      await this.getAvailableTools();
      
      this.trackToolCall('close_session', {}, duration, true, result);
      
      return true;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.trackToolCall('close_session', {}, duration, false, undefined, error);
      
      if (error instanceof Error) {
        throw new MCPServerError(
          `Failed to close session: ${error.message}`,
          { originalError: error }
        );
      }
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   * Phase 2.2: Authentication state checking
   */
  public isUserAuthenticated(): boolean {
    return this.connectionState.authenticated;
  }

  /**
   * Get current session information from connection state
   * Phase 2.2: Session state inspection
   */
  public getCurrentSession(): MCPConnectionState['sessionInfo'] {
    return this.connectionState.sessionInfo;
  }

  // Phase 2.3: Schema Exploration Tools

  /**
   * Explore GraphQL schema structure
   * Phase 2.3: Schema exploration implementation
   */
  public async exploreSchema(type: string, items?: string | string[]): Promise<any> {
    if (!type || typeof type !== 'string' || type.trim() === '') {
      throw new MCPServerError('Schema type is required and must be a non-empty string.');
    }

    if (!this.client || !this.connectionState.initialized) {
      throw new MCPServerError('MCP client not initialized. Call connect() first.');
    }

    const startTime = Date.now();
    
    try {
      const parameters: Record<string, any> = { type: type.trim() };
      
      // Add items parameter if provided
      if (items !== undefined) {
        parameters.items = items;
      }

      const result = await this.client.callTool({
        name: 'explore_schema',
        arguments: parameters
      });

      const duration = Date.now() - startTime;
      this.trackToolCall('explore_schema', parameters, duration, true, result);

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      const parameters = { type: type.trim(), ...(items !== undefined && { items }) };
      this.trackToolCall('explore_schema', parameters, duration, false, undefined, error);
      
      if (error instanceof Error) {
        throw new MCPServerError(
          `Schema exploration failed: ${error.message}`,
          { type, items, originalError: error }
        );
      }
      throw error;
    }
  }

  /**
   * Search GraphQL schema for items containing keyword
   * Phase 2.3: Schema search implementation
   */
  public async searchSchema(keyword: string): Promise<any> {
    if (!keyword || typeof keyword !== 'string' || keyword.trim() === '') {
      throw new MCPServerError('Search keyword is required and must be a non-empty string.');
    }

    if (!this.client || !this.connectionState.initialized) {
      throw new MCPServerError('MCP client not initialized. Call connect() first.');
    }

    const startTime = Date.now();
    
    try {
      const parameters = { keyword: keyword.trim() };

      const result = await this.client.callTool({
        name: 'search_schema',
        arguments: parameters
      });

      const duration = Date.now() - startTime;
      this.trackToolCall('search_schema', parameters, duration, true, result);

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      const parameters = { keyword: keyword.trim() };
      this.trackToolCall('search_schema', parameters, duration, false, undefined, error);
      
      if (error instanceof Error) {
        throw new MCPServerError(
          `Schema search failed: ${error.message}`,
          { keyword, originalError: error }
        );
      }
      throw error;
    }
  }

  // Legacy methods for backward compatibility (Phase 1 stubs)
  
  /**
   * @deprecated Use connect() instead
   */
  public async authenticate(): Promise<boolean> {
    console.warn('⚠️  authenticate() is deprecated. Use connect() instead.');
    return this.connect();
  }

  /**
   * @deprecated Use exploreSchema(type, items?) instead
   */
  public async legacyExploreSchema(): Promise<any> {
    console.warn('⚠️  legacyExploreSchema() is deprecated. Use exploreSchema(type, items?) instead.');
    return { schema: 'Use exploreSchema(type, items?) for actual schema exploration' };
  }

  /**
   * @deprecated Use callTool('query_graphql', {query, variables}) instead
   */
  public async executeQuery(query: string, variables?: Record<string, any>): Promise<any> {
    console.warn('⚠️  executeQuery() is deprecated. Use callTool("query_graphql", {query, variables}) instead.');
    return { 
      data: null, 
      message: 'Use callTool("query_graphql", {query, variables}) for actual query execution' 
    };
  }

  /**
   * @deprecated Use isConnected() instead
   */
  public isAuthenticated(): boolean {
    console.warn('⚠️  isAuthenticated() is deprecated. Use isConnected() instead.');
    return this.isConnected();
  }
}
