Here's the revised standalone prompt for Phase 1:

---

# MCP Client Implementation - Phase 1

You are working on creating an MCP (Model Context Protocol) client for testing an MCP server. This is Phase 1 of a larger test suite project.

## Project Context

I have an MCP server called `enterprise-api-mcp-server` (v1.0.0) built with the TypeScript MCP SDK that provides GraphQL API access tools. The server supports both stdio and HTTP transports and provides 9 distinct tools for authentication, schema exploration, and GraphQL querying.

## MCP Server Details

**Server Configuration:**
- **Name**: `enterprise-api-mcp-server`
- **Transports**: STDIO (primary) and HTTP on port 4000
- **Environment Variables**: HOST_ADDR (required), API_KEY (optional), DEBUG_LOG (optional)

**Available Tools** (9 total):
1. `get_session_info` - Get session ID and auth status (no params)
2. `get_current_date` - Get current date in YYYY-MM-DD format (no params)
3. `authenticate` - Login with username, password, selectedStoreId (becomes disabled after login)
4. `close_session` - Close session and re-enable authenticate tool (no params)
5. `get_server_information_query` - Get schema/release version info (no params)
6. `quick_reference` - Get business context guide (no params)
7. `explore_schema` - Introspect GraphQL schema with type and optional items params
8. `search_schema` - Search schema items by keyword
9. `query_graphql` - Execute GraphQL queries with query and optional variables params

**Key Behaviors:**
- Session management with unique session IDs
- Authentication state changes tool availability
- Schema caching (10-minute expiration)
- Error responses include `isError: true` flag
- HTTP transport uses `mcp-session-id` header for session persistence

## Phase 1 Goals

Create a complete MCP client implementation that can:
1. Connect to the MCP server via both stdio and HTTP transports
2. Discover and list all 9 available tools from the server
3. Call any tool with appropriate parameters and receive responses
4. Handle the authentication workflow (login/logout affects tool availability)
5. Manage sessions properly (especially for HTTP transport)
6. Handle errors gracefully with clear error messages
7. Include comprehensive testing and validation

## Technical Requirements

- **Language**: TypeScript/Node.js
- **Testing**: Use Node.js built-in test runner
- **Transport**: Implement both stdio and HTTP transports
- **Error Handling**: Handle MCP errors and server-specific error responses
- **Logging**: Console logging for debugging and verification
- **Session Management**: Handle session IDs for HTTP transport

## Implementation Structure

Create the following files:
1. `src/mcp-client.ts` - Main MCP client class
2. `src/transports/stdio-transport.ts` - STDIO transport implementation
3. `src/transports/http-transport.ts` - HTTP transport implementation
4. `src/types.ts` - TypeScript interfaces for MCP protocol and server responses
5. `test/mcp-client.test.ts` - Comprehensive test suite
6. `test/integration.test.ts` - End-to-end integration tests
7. `package.json` - Project dependencies
8. `README.md` - Usage documentation and examples

## Key Features to Implement

### MCPClient Class
```typescript
class MCPClient {
  // Connection management
  async connect(transport: 'stdio' | 'http', options: ConnectionOptions): Promise<void>
  async disconnect(): Promise<void>
  
  // Tool operations
  async listTools(): Promise<Tool[]>
  async callTool(name: string, arguments?: any): Promise<ToolResult>
  
  // Convenience methods for specific tools
  async authenticate(username: string, password: string, storeId: number): Promise<void>
  async getSessionInfo(): Promise<SessionInfo>
  async exploreSchema(type: string, items?: string | string[]): Promise<string>
  async queryGraphQL(query: string, variables?: string): Promise<any>
  
  // Status and utilities
  isConnected(): boolean
  isAuthenticated(): boolean
  getSessionId(): string | null
}
```

### Connection Options
```typescript
interface ConnectionOptions {
  // For stdio transport
  command?: string;           // Default: 'npx'
  args?: string[];           // Default: ['@isoftdata/enterprise-api-mcp']
  
  // For HTTP transport  
  url?: string;              // Default: 'http://localhost:4000'
  headers?: Record<string, string>;
  
  // Common options
  timeout?: number;          // Default: 30000ms
  retryAttempts?: number;    // Default: 3
  
  // Server environment variables (for stdio)
  env?: {
    HOST_ADDR?: string;
    API_KEY?: string;
    DEBUG_LOG?: string;
  };
}
```

### Error Handling
- Connection failures (stdio process spawn, HTTP connection)
- Tool call failures and server error responses with `isError: true`
- Authentication state management (tools becoming available/unavailable)
- Session management for HTTP transport
- GraphQL-specific errors vs general MCP errors
- Timeout handling and retry logic

### Session Management
- Track session IDs (especially for HTTP transport)
- Handle authentication state changes
- Manage tool availability based on auth state
- Session persistence across HTTP requests

## Testing Requirements

Create comprehensive tests covering:

### Connection Tests
- [ ] STDIO transport connection success/failure
- [ ] HTTP transport connection success/failure  
- [ ] Proper cleanup on disconnect
- [ ] Connection timeout handling

### Tool Discovery Tests
- [ ] Verify all 9 tools are discovered
- [ ] Tool availability changes after authentication
- [ ] Proper tool metadata (names, descriptions, parameters)

### Authentication Workflow Tests
- [ ] Successful authentication flow
- [ ] Failed authentication handling
- [ ] Tool availability before/after login
- [ ] Session closure and tool re-enablement

### Tool Execution Tests
- [ ] All parameterless tools (get_session_info, get_current_date, etc.)
- [ ] Tools with parameters (authenticate, explore_schema, query_graphql)
- [ ] Invalid parameter handling
- [ ] Server error response handling

### Session Management Tests
- [ ] Session ID tracking
- [ ] HTTP session persistence
- [ ] Session cleanup

### Integration Tests
- [ ] Full authentication → schema exploration → query workflow
- [ ] Error recovery scenarios
- [ ] Transport switching capabilities

## Test Data and Scenarios

For testing, assume you can:
- Start the MCP server locally (both transports)
- Use test credentials (mock or development environment)
- Execute safe GraphQL queries like `{ storesForLogin { id name } }`
- Test schema exploration on known types

## Dependencies

Include dependencies for:
- MCP protocol implementation (@modelcontextprotocol/sdk-typescript or equivalent)
- Child process spawning (built-in Node.js)
- HTTP client (fetch or axios)
- TypeScript support
- Node.js test runner

## Success Criteria

Phase 1 is complete when:
- [ ] Client connects via both stdio and HTTP transports
- [ ] All 9 server tools are discoverable and callable
- [ ] Authentication workflow works end-to-end
- [ ] Session management works correctly
- [ ] Error scenarios are handled gracefully  
- [ ] All tests pass
- [ ] Code handles tool availability changes
- [ ] Client is ready for AI model integration in Phase 2

## Server-Specific Considerations

- Handle the authentication tool becoming disabled after login
- Manage schema caching behavior (10-minute expiration)
- Parse server-specific error formats with `isError: true`
- Handle GraphQL response formats vs MCP response formats
- Support session persistence for HTTP transport
- Handle environment variable configuration for stdio transport

## Output Format

Provide complete, working code with:
- Full MCP client implementation for both transports
- Comprehensive error handling for server-specific behaviors
- Complete test suite covering all scenarios
- Clear documentation with server-specific examples
- Setup instructions for both transport modes

The implementation should be robust enough to handle the enterprise API server's specific behaviors and ready to serve as the foundation for AI model testing in subsequent phases.

---

