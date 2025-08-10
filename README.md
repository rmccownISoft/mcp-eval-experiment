# MCP Test Suite - Enterprise API MCP Client

A comprehensive TypeScript test suite and MCP client for evaluating the effectiveness of GraphQL-API MCP (Model Context Protocol) servers for AI agents.

## 🚀 Complete MCP Client Refactor

This project has been completely refactored based on the actual Enterprise API MCP Server specification. The new implementation provides a robust, production-ready MCP client that supports all 9 tools from the actual server.

## ✨ Features

### 🔌 **Complete MCP Client Implementation**
- **All 9 Server Tools**: Full implementation of every tool from the Enterprise API MCP Server
- **Dual Transport Support**: Both STDIO and Streamable HTTP transports
- **Proper Authentication**: Complete authentication workflow with session management
- **Schema Exploration**: Full GraphQL schema introspection and search capabilities
- **GraphQL Queries**: Execute queries with variables and mutation blocking
- **Error Handling**: Comprehensive error handling with server-specific error detection

### 🛠️ **Supported MCP Tools**

1. **`get_session_info()`** - Get session ID and authentication status
2. **`get_current_date()`** - Get current date in YYYY-MM-DD format
3. **`authenticate(username, password, storeId)`** - Login to the enterprise API
4. **`close_session()`** - Close session and re-enable authenticate tool
5. **`get_server_information_query()`** - Get schema and release version info
6. **`quick_reference()`** - Get business context guide for ITrack Enterprise
7. **`explore_schema(type, items?)`** - Introspect GraphQL schema with proper enum validation
8. **`search_schema(keyword)`** - Search schema items by keyword
9. **`query_graphql(query, variables?)`** - Execute GraphQL queries with variables

### 🔧 **Technical Improvements**

- **Correct Parameter Types**: `storeId` as number, proper `SchemaType` enum validation
- **Server Error Detection**: Handles `isError: true` responses from server
- **Response Parsing**: Extracts text content from MCP responses correctly
- **Tool Call Tracking**: Comprehensive metrics tracking for performance analysis
- **Session Management**: Proper session ID tracking and authentication state
- **Validation**: Parameter validation before server calls to prevent unnecessary requests

## 📦 Installation

```bash
npm install
```

## 🏃‍♂️ Quick Start

### Basic Usage

```typescript
import { MCPClient } from './src/lib/mcp/MCPClient.js';

// Configure for HTTP transport (recommended)
const client = new MCPClient({
  transport: 'http',
  url: 'http://localhost:3000',
  env: {
    HOST_ADDR: 'https://ai.itrackenterprise.com/graphql'
  },
  username: 'ai',
  password: 'demo',
  storeId: 1
});

// Connect and authenticate
await client.connect();
const success = await client.authenticate('ai', 'demo', 1);

if (success) {
  // Use all 9 tools
  const sessionInfo = await client.getSessionInfo();
  const currentDate = await client.getCurrentDate();
  const serverInfo = await client.getServerInformationQuery();
  const quickRef = await client.getQuickReference();
  
  // Schema exploration
  const types = await client.exploreSchema('type');
  const searchResults = await client.searchSchema('Customer');
  
  // GraphQL queries
  const stores = await client.queryGraphQL(`
    query {
      storesForLogin {
        id
        name
      }
    }
  `);
  
  // Close session when done
  await client.closeSession();
}

await client.disconnect();
```

### STDIO Transport

```typescript
const client = new MCPClient({
  transport: 'stdio',
  command: 'node',
  args: ['-r', 'dotenv/config', 'dist/entryPoint.js'],
  cwd: '/path/to/enterprise-api-mcp-server',
  env: {
    HOST_ADDR: 'https://ai.itrackenterprise.com/graphql'
  }
});
```

## 🧪 Testing

The project includes comprehensive test suites:

```bash
# Run all tests
npm test

# Build project
npm run build

# Run demo
npm run build && node dist/examples/mcp-client-demo.js
```

### Test Coverage

- **68 Tests Total** - All passing ✅
- **Integration Tests** - Complete MCP client functionality
- **Unit Tests** - Individual component testing
- **Error Handling** - Comprehensive error scenario testing
- **Type Safety** - TypeScript compilation and type checking

## 📋 Server Requirements

To use this MCP client, you need the Enterprise API MCP Server running:

### HTTP Transport (Recommended)
```bash
# Start the MCP server on port 3000
HOST_ADDR=https://ai.itrackenterprise.com/graphql node -r dotenv/config dist/entryPoint.js
```

### STDIO Transport
```bash
# The client will spawn the server process automatically
# Just ensure the server is built and available at the specified path
```

## 🔧 Configuration

### Environment Variables

- **`HOST_ADDR`** (required): GraphQL endpoint URL
- **`API_KEY`** (optional): Pre-configured API key
- **`DEBUG_LOG`** (optional): Enable debug logging

### Test Credentials

- **Username**: `ai`
- **Password**: `demo`
- **Store ID**: `1`

## 📊 Performance Tracking

The client includes comprehensive performance tracking:

```typescript
// Get tool call history
const history = client.getToolCallHistory();
console.log('Total tool calls:', history.length);
console.log('Average latency:', 
  history.reduce((sum, call) => sum + call.duration, 0) / history.length
);

// Clear history
client.clearToolCallHistory();
```

## 🔍 Error Handling

The client provides detailed error handling:

```typescript
try {
  await client.authenticate('user', 'pass', 1);
} catch (error) {
  if (error instanceof MCPServerError) {
    console.error('MCP Error:', error.message);
    console.error('Details:', error.details);
  }
}
```

## 🏗️ Architecture

### Project Structure

```
src/lib/mcp/
├── MCPClient.ts           # Complete MCP client implementation
└── types exported via     # TypeScript interfaces
    ../types.ts

examples/
├── mcp-client-demo.ts     # Comprehensive usage examples

tests/
├── mcp-client-integration.test.ts  # Integration tests
├── phase02.1.test.ts              # Transport & protocol tests
├── phase02.2.test.ts              # Authentication tests
└── phase02.3.test.ts              # Schema exploration tests
```

### Key Classes

- **`MCPClient`** - Main client class with all 9 tool implementations
- **`MCPServerError`** - Custom error class for MCP-specific errors
- **`MCPConnectionState`** - Connection and authentication state tracking
- **`MCPToolCall`** - Tool call metrics and tracking

## 🔄 Migration from Previous Version

The client has been completely rewritten. Key changes:

### Method Name Changes
- `authenticateUser()` → `authenticate()`
- `isUserAuthenticated()` → `isAuthenticated()`
- Parameter types corrected (storeId now number, not string)

### New Methods
- `getCurrentDate()` - Get current date
- `getServerInformationQuery()` - Get server info
- `getQuickReference()` - Get business context
- `queryGraphQL()` - Execute GraphQL queries

### Improved Error Handling
- Server error detection with `isError: true` flag
- Better parameter validation
- More descriptive error messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a pull request

## 📄 License

ISC License

## 🔗 Related Projects

- [Enterprise API MCP Server](https://github.com/ISoft-Data-Systems/enterprise-api-mcp)
- [Model Context Protocol](https://modelcontextprotocol.io/)

---

**Ready to test your MCP server with AI agents!** 🚀

This refactored client provides a solid foundation for testing AI agent interactions with GraphQL APIs through the Model Context Protocol.
