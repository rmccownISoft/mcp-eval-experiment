# MCP Test Suite

A comprehensive TypeScript test suite to evaluate GraphQL-API MCP (Model Context Protocol) server effectiveness for AI agents.

## Overview

The MCP Test Suite is designed to test and evaluate the performance of AI agents when interacting with a heavy truck salvage yard ERP system through a GraphQL-API MCP server. It provides comprehensive metrics on tool usage efficiency, response accuracy, reasoning quality, and hallucination detection.

## Features

- **Multi-LLM Support**: Test with Claude, Gemini, and ChatGPT
- **Comprehensive Metrics**: Tool call efficiency, latency, accuracy, and reasoning quality
- **Flexible Configuration**: YAML/JSON config files and environment variables
- **Library & CLI**: Use as a library or standalone CLI tool
- **Docker Integration**: Built-in Docker environment management
- **Detailed Reporting**: JSON, CSV, and HTML report generation

## Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Install globally (optional)
npm install -g .
```

## Quick Start

### CLI Usage

```bash
# Run tests with Claude
npx mcp-test-suite run --llm claude --config ./config/example.yaml

# Validate configuration
npx mcp-test-suite validate --config ./config/example.yaml

# Initialize new configuration
npx mcp-test-suite init --format yaml --output ./my-config.yaml

# Docker management
npx mcp-test-suite docker --start
```

### Library Usage

```typescript
import { MCPTestSuite, LLMProvider, loadConfig } from 'mcp-test-suite';

// Direct configuration
const testSuite = new MCPTestSuite({
  llmProvider: LLMProvider.CLAUDE,
  mcpServer: {
    url: 'http://localhost:3000',
    username: 'test_user',
    password: 'test_password',
    transport: 'http',      // New in Phase 2.1
    timeout: 30000         // New in Phase 2.1
  },
  apiKeys: {
    claude: 'sk-ant-api03-...'
  },
  outputDir: './results'
});

// Run tests
const results = await testSuite.runTests();
console.log(`Completed ${results.totalTests} tests`);
```

## Configuration

### YAML Configuration

```yaml
# config/test-config.yaml
llmProvider: claude

apiKeys:
  claude: "sk-ant-api03-..."
  gemini: "AIza..."
  chatgpt: "sk-..."

mcpServer:
  url: "http://localhost:3000"
  username: "test_user"
  password: "test_password"
  storeId: "store_001"
  transport: "http"        # New in Phase 2.1: 'http' | 'stdio' | 'sse'
  timeout: 30000          # New in Phase 2.1: Connection timeout in ms

llmConfig:
  temperature: 0.1
  maxTokens: 4000
  timeout: 30000

outputDir: "./results"
verbose: true
```

### Environment Variables

```bash
export MCP_LLM_PROVIDER=claude
export CLAUDE_API_KEY=sk-ant-api03-...
export MCP_SERVER_URL=http://localhost:3000
export MCP_USERNAME=test_user
export MCP_PASSWORD=test_password
export MCP_OUTPUT_DIR=./results
```

## Project Structure

```
mcp-test-suite/
├── src/
│   ├── lib/                    # Library core
│   │   ├── clients/           # LLM client implementations
│   │   │   ├── base/          # Base conversation client
│   │   │   └── providers/     # LLM provider plugins
│   │   ├── config/            # Configuration management
│   │   ├── mcp/              # MCP server integration
│   │   ├── scoring/          # Evaluation and scoring
│   │   ├── testing/          # Test execution engine
│   │   ├── reporting/        # Report generation
│   │   └── types.ts          # Type definitions
│   ├── cli/                   # CLI interface
│   └── index.ts              # Library exports
├── config/                   # Configuration examples
├── examples/                 # Usage examples
├── test-prompts/            # Test prompt definitions
└── results/                 # Generated reports
```

## Development Status

### ✅ Phase 1: Project Foundation & Library Architecture (COMPLETED)

- [x] TypeScript project setup with library configuration
- [x] Configuration system for API keys, test parameters, and MCP server connection
- [x] Library export structure and public API design
- [x] Basic CLI interface structure
- [x] Docker integration preparation
- [x] Initial project documentation and usage examples

### ✅ Phase 2.1: HTTP Transport & MCP Protocol Foundation (COMPLETED)

- [x] Multi-Transport MCP Client Implementation with official MCP TypeScript SDK
- [x] HTTP Transport using StreamableHTTPClientTransport for remote MCP servers
- [x] Stdio Transport using StdioClientTransport for local MCP server testing
- [x] MCP Protocol Message Handling with full JSON-RPC 2.0 compliance
- [x] Initialize handshake, tools discovery, and tool execution
- [x] Basic Connection Lifecycle Management with state tracking
- [x] Network Error Handling and Timeouts with configurable settings
- [x] Updated MCPServerConfig Type with transport field support
- [x] Comprehensive test suite with 17/18 tests passing

### ✅ Phase 2.2: Authentication & Session Management (COMPLETED)

- [x] Authentication flow implementation with authenticateUser() method
- [x] Session lifecycle management with getSessionInfo() and closeSession()
- [x] Authentication state tracking with persistent state across tool calls
- [x] Session information tracking (username, storeId, loginTime)
- [x] Authentication error handling and state recovery
- [x] Tool availability refresh after authentication state changes
- [x] Comprehensive test suite with 13 additional tests (41/41 total tests passing)

### 🚧 Phase 2.3: GraphQL Integration (PLANNED)

- [ ] Schema exploration tool integration
- [ ] Basic GraphQL query execution
- [ ] Query optimization and caching

### 🚧 Phase 3: Thin Client & LLM Integration (PLANNED)

- [ ] Thin client architecture with pluggable LLM providers
- [ ] LLM provider plugins (Claude, Gemini, ChatGPT)
- [ ] Conversation state management
- [ ] Token usage tracking and latency measurement

### 🚧 Phase 4: Test Prompt Execution Engine (PLANNED)

- [ ] Test prompt loader and manager
- [ ] Sequential test execution system
- [ ] MCP tool call tracking
- [ ] Raw query/response data capture

### 🚧 Phase 5: Scoring and Evaluation System (PLANNED)

- [ ] GPT-4 integration for response evaluation
- [ ] Scoring algorithms for all metrics
- [ ] Data validation system (hallucination detection)
- [ ] Comparative analysis engine

### 🚧 Phase 6: Reporting and Output (PLANNED)

- [ ] Comprehensive report generation
- [ ] Benchmark file output
- [ ] Performance visualization
- [ ] Final documentation

## API Reference

### Core Classes

#### `MCPTestSuite`

Main test suite orchestrator.

```typescript
class MCPTestSuite {
  constructor(config: TestConfig | ConfigManager)
  async runTests(testIds?: string[]): Promise<TestSuiteResult>
  async runSingleTest(testId: string): Promise<TestResult>
  async validateEnvironment(): Promise<{valid: boolean, issues: string[]}>
}
```

#### `ConfigManager`

Configuration management and validation.

```typescript
class ConfigManager {
  static fromFile(filePath: string): ConfigManager
  static fromEnvironment(): ConfigManager
  getConfig(): TestConfig
  updateConfig(updates: Partial<TestConfig>): void
}
```

#### `MCPClient`

MCP server integration client with multi-transport support and authentication.

```typescript
class MCPClient {
  constructor(config: MCPServerConfig)
  
  // Core connection management
  async connect(): Promise<boolean>
  async disconnect(): Promise<void>
  async checkConnection(): Promise<boolean>
  
  // Tool operations
  async getAvailableTools(): Promise<string[]>
  async callTool(toolName: string, parameters?: Record<string, any>): Promise<any>
  
  // Authentication & Session Management (Phase 2.2)
  async authenticateUser(username: string, password: string, selectedStoreId: string): Promise<boolean>
  async getSessionInfo(): Promise<any>
  async closeSession(): Promise<boolean>
  isUserAuthenticated(): boolean
  getCurrentSession(): MCPConnectionState['sessionInfo']
  
  // State management
  getConnectionState(): MCPConnectionState
  getToolCallHistory(): MCPToolCall[]
  clearToolCallHistory(): void
  
  // Configuration
  getConfig(): MCPServerConfig
  isConnected(): boolean
}
```

### Configuration Types

```typescript
interface TestConfig {
  llmProvider: LLMProvider;
  mcpServer: MCPServerConfig;
  apiKeys: APIKeys;
  llmConfig?: LLMConfig;
  docker?: DockerConfig;
  testPrompts?: string[];
  outputDir?: string;
  verbose?: boolean;
}

interface MCPServerConfig {
  url: string;
  username?: string;
  password?: string;
  storeId?: string;
  transport: 'http' | 'stdio' | 'sse';  // New in Phase 2.1
  timeout?: number;                      // New in Phase 2.1
}

interface MCPConnectionState {
  connected: boolean;
  initialized: boolean;
  authenticated: boolean;                    // New in Phase 2.2
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
  sessionInfo?: {                           // New in Phase 2.2
    username?: string;
    storeId?: string;
    sessionId?: string;
    loginTime?: Date;
  };
  authenticationError?: string;             // New in Phase 2.2
}
```

## Testing

```bash
# Run unit tests
npm test

# Run tests in development mode
npm run test:dev

# Build and test
npm run build && npm test
```

## CLI Commands

### `run`
Execute the MCP test suite.

```bash
mcp-test-suite run [options]

Options:
  -c, --config <path>           Configuration file path
  -l, --llm <provider>          LLM provider (claude|gemini|chatgpt)
  -s, --server <url>            MCP server URL
  -o, --output <dir>            Output directory
  -v, --verbose                 Enable verbose logging
  --docker-container <name>     Docker container name
  --docker-port <port>          Docker port
```

### `validate`
Validate configuration without running tests.

```bash
mcp-test-suite validate [options]

Options:
  -c, --config <path>           Configuration file path
```

### `init`
Initialize a new configuration file.

```bash
mcp-test-suite init [options]

Options:
  -f, --format <format>         Format (json|yaml)
  -o, --output <path>           Output file path
```

### `docker`
Docker environment management.

```bash
mcp-test-suite docker [options]

Options:
  --start                       Start Docker environment
  --stop                        Stop Docker environment
  --status                      Check Docker status
  --container <name>            Container name
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC License - see LICENSE file for details.

## Support

For questions and support, please open an issue on the GitHub repository.

---

**Note**: This project has completed Phase 1 (Foundation), Phase 2.1 (HTTP Transport & MCP Protocol Foundation), and Phase 2.2 (Authentication & Session Management). The MCP client now supports multi-transport connections with full protocol compliance and comprehensive authentication capabilities. Core testing functionality will be implemented in subsequent phases. See the Development Status section for current progress.
