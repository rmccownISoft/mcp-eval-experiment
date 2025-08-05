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
    password: 'test_password'
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

### 🚧 Phase 2: MCP Server Integration (PLANNED)

- [ ] MCP client implementation for GraphQL-API server
- [ ] Authentication flow (username/password/store ID)
- [ ] Schema exploration tool integration
- [ ] Basic GraphQL query execution
- [ ] Connection error handling

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

MCP server integration client.

```typescript
class MCPClient {
  constructor(config: MCPServerConfig)
  async authenticate(): Promise<boolean>
  async exploreSchema(): Promise<any>
  async executeQuery(query: string, variables?: Record<string, any>): Promise<any>
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

**Note**: This project is currently in Phase 1 (Foundation). Core testing functionality will be implemented in subsequent phases. See the Development Status section for current progress.
