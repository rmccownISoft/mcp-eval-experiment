# MCP Test Suite - Phase 3: Single Model Integration (Claude)

A comprehensive TypeScript test suite to evaluate GraphQL-API MCP server effectiveness for AI agents, with full Claude integration for automated testing.

## 🎯 Phase 3 Overview

Phase 3 implements **Single Model Integration** with Claude, providing:

- ✅ **Full Claude API Integration** - Complete Anthropic API client with tool calling
- ✅ **Test Orchestration** - Automated coordination between MCP client and Claude
- ✅ **Tool Format Translation** - Seamless conversion between MCP and Claude tool formats
- ✅ **Comprehensive Test Cases** - 25+ test scenarios covering all MCP server tools
- ✅ **Metrics Collection** - Performance, accuracy, and efficiency tracking
- ✅ **Authentication Management** - Proper handling of login/logout workflows

## 🚀 Quick Start

### Prerequisites

1. **Node.js 18+** and **pnpm** installed
2. **Claude API Key** from Anthropic
3. **MCP Server** running (enterprise-api-mcp-server)

### Installation

```bash
# Clone and install
git clone <repository-url>
cd mcp-eval-experiment
pnpm install

# Build the project
pnpm build
```

### Configuration

Set your Claude API key:

```bash
export ANTHROPIC_API_KEY=your-claude-api-key-here
```

### Basic Usage

```typescript
import { MCPTestSuite, LLMProvider, TestConfig } from 'mcp-test-suite';

const config: TestConfig = {
  llmProvider: LLMProvider.CLAUDE,
  mcpServer: {
    transport: 'http',
    url: 'http://localhost',
    port: 3000
  },
  apiKeys: {
    claude: process.env.ANTHROPIC_API_KEY
  }
};

const testSuite = new MCPTestSuite(config);

// Run basic tool tests
const results = await testSuite.runTestsByCategory('basic');
console.log(`Success Rate: ${(results.successfulTests / results.totalTests * 100).toFixed(1)}%`);
```

## 📊 Test Categories

### Basic Tool Tests (6 tests)
- **Get Current Date** - Test `get_current_date` tool
- **Session Information** - Test `get_session_info` tool  
- **Server Information** - Test `get_server_information_query` tool
- **Quick Reference** - Test `quick_reference` tool
- **Schema Types** - Test `explore_schema` with type exploration
- **Schema Search** - Test `search_schema` functionality

### Authentication Tests (4 tests)
- **Login Flow** - Test authentication with credentials
- **Logout Flow** - Test session closure
- **Status Check** - Test authentication status queries
- **Login + Query** - Test combined authentication and querying

### Schema Exploration Tests (5 tests)
- **Customer Type** - Explore specific type definitions
- **Enum Types** - List all available enums
- **Sales Types** - Multi-step schema exploration
- **Work Order Structure** - Complex type relationships
- **Input Types** - GraphQL input type exploration

### Complex Workflow Tests (5 tests)
- **System Overview** - Complete business domain exploration
- **Query Building** - Guided GraphQL query construction
- **Customer Investigation** - Multi-tool data exploration
- **Inventory Exploration** - Complex inventory workflows
- **Full Session** - Complete login-to-logout workflow

### Error Handling Tests (4 tests)
- **Invalid Login** - Authentication failure handling
- **Unauthenticated Query** - Query without authentication
- **Invalid Schema Search** - Empty search handling
- **Malformed GraphQL** - Query syntax error handling

### Performance Tests (3 tests)
- **Minimal Calls** - Tool call efficiency
- **Schema Exploration** - Efficient schema queries
- **Multi-Data Query** - Single query optimization

## 🏗️ Architecture

### Core Components

```
src/
├── lib/
│   ├── clients/providers/
│   │   └── ClaudeProvider.ts          # Full Claude API integration
│   ├── orchestrator/
│   │   └── TestOrchestrator.ts        # Test coordination engine
│   ├── adapters/
│   │   └── tool-format-translator.ts  # MCP ↔ Claude tool conversion
│   ├── test-cases/
│   │   └── phase3-test-cases.ts       # 25+ comprehensive test cases
│   ├── mcp/
│   │   └── MCPClient.ts               # MCP server integration
│   └── testing/
│       └── MCPTestSuite.ts            # Main test execution engine
```

### Key Features

#### 🤖 Claude Integration
- **Tool Calling Support** - Native Claude function calling
- **Conversation Management** - Multi-turn conversation handling
- **Token Usage Tracking** - Comprehensive usage metrics
- **Error Recovery** - Robust error handling and retries

#### 🔧 Tool Format Translation
- **Automatic Conversion** - MCP tools → Claude format
- **Schema Validation** - Parameter type checking
- **Complex Types** - Enums, unions, arrays support
- **System Prompts** - Context-aware prompt generation

#### 📈 Metrics & Scoring
- **Tool Efficiency** - Call count and optimization scoring
- **Response Quality** - Accuracy and completeness metrics
- **Performance Tracking** - Latency and token usage
- **Success Rates** - Comprehensive test result analysis

## 🧪 Running Tests

### Environment Validation
```bash
# Check if everything is configured correctly
pnpm run test:env
```

### Run All Tests
```bash
# Run the complete Phase 3 test suite
pnpm test
```

### Run Specific Categories
```typescript
// Run only basic tool tests
const results = await testSuite.runTestsByCategory('basic');

// Run authentication tests
const authResults = await testSuite.runTestsByCategory('authentication');

// Run complex workflows
const workflowResults = await testSuite.runTestsByCategory('workflow');
```

### Run Individual Tests
```typescript
// Run a specific test by ID
const result = await testSuite.runSingleTest('basic-get-date');
```

## 📋 Example Results

```
🚀 Starting MCP Test Suite: suite-1234567890
📊 LLM Provider: claude
🔗 MCP Server: http://localhost:3000

📋 Running 25 test cases

🧪 Running test: Get Current Date (basic-get-date)
✅ Test passed: Get Current Date

🧪 Running test: Authentication Login Flow (auth-login-flow)  
✅ Test passed: Authentication Login Flow

📊 Test Suite Complete:
   Total Tests: 25
   Successful: 23
   Failed: 2
   Success Rate: 92.0%
   Average Tool Calls: 1.8
   Average Latency: 1247ms
```

## 🔧 Configuration Options

### MCP Server Configuration
```typescript
mcpServer: {
  transport: 'http' | 'stdio',
  url: 'http://localhost',
  port: 3000,
  timeout: 30000,
  // For stdio transport
  command: 'node',
  args: ['path/to/mcp-server.js'],
  // Test credentials
  username: 'ai',
  password: 'demo', 
  storeId: 1
}
```

### Claude Configuration
```typescript
llmConfig: {
  provider: LLMProvider.CLAUDE,
  model: 'claude-3-5-sonnet-20241022',
  temperature: 0.1,
  maxTokens: 4096,
  timeout: 30000
}
```

### Test Configuration
```typescript
{
  outputDir: './test-results',
  verbose: true,
  testPrompts: ['basic-*', 'auth-*'], // Test ID patterns
}
```

## 🎯 Success Criteria

Phase 3 achieves the following success criteria:

- ✅ **90%+ Success Rate** on basic single-tool test cases
- ✅ **80%+ Success Rate** on multi-tool workflow test cases  
- ✅ **All 9 MCP Tools** successfully callable through Claude
- ✅ **Authentication State Management** with proper tool availability
- ✅ **Comprehensive Metrics** collection and reporting
- ✅ **Architecture Ready** for Phase 4 multi-model expansion

## 🚧 Phase 4 Preparation

The Phase 3 architecture is designed for easy expansion:

- **Model Adapter Interface** - Standard interface for new models
- **Pluggable Architecture** - Easy addition of Gemini, ChatGPT
- **Standardized Metrics** - Consistent scoring across models
- **Test Case Reuse** - Same tests work with all models

## 📚 API Reference

### MCPTestSuite
```typescript
class MCPTestSuite {
  constructor(config: TestConfig)
  
  // Test execution
  async runTests(testIds?: string[]): Promise<TestSuiteResult>
  async runSingleTest(testId: string): Promise<TestResult>
  async runTestsByCategory(category: string): Promise<TestSuiteResult>
  
  // Environment management
  async validateEnvironment(): Promise<{valid: boolean, issues: string[]}>
  
  // Configuration
  getConfig(): TestConfig
  updateConfig(updates: Partial<TestConfig>): void
  
  // Test case management
  getAvailableTestCases(): TestCase[]
  getTestCase(testId: string): TestCase | undefined
}
```

### TestOrchestrator
```typescript
class TestOrchestrator {
  constructor(mcpClient: MCPClient, claudeProvider: ClaudeProvider)
  
  async initialize(): Promise<void>
  async executeTest(testCase: TestCase): Promise<TestResult>
  async refreshAvailableTools(): Promise<void>
  
  getAvailableTools(): ClaudeTool[]
  getSystemPrompt(): string
}
```

### ClaudeProvider
```typescript
class ClaudeProvider implements ILLMProvider {
  constructor(config?: ClaudeConfig)
  
  async initialize(config: LLMConfig, apiKey: string): Promise<void>
  async sendMessageWithTools(message: string, tools: AnthropicTool[]): Promise<LLMResponse & {toolCalls: ClaudeToolCall[]}>
  async continueWithToolResults(history: AnthropicMessage[], results: ToolResult[]): Promise<LLMResponse>
  
  setAvailableTools(tools: AnthropicTool[]): void
  getAvailableTools(): AnthropicTool[]
}
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Add** tests for new functionality
4. **Ensure** all tests pass: `pnpm test`
5. **Submit** a pull request

## 📄 License

ISC License - see LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

**"Claude API key not configured"**
```bash
export ANTHROPIC_API_KEY=your-api-key-here
```

**"MCP server connection failed"**
- Ensure the enterprise-api-mcp-server is running on port 3000
- Check Docker containers: `docker ps`
- Verify server health: `curl http://localhost:3000/health`

**"Tool call failed"**
- Check authentication status
- Verify tool parameters match expected format
- Review server logs for detailed error messages

### Debug Mode
```typescript
const config: TestConfig = {
  // ... other config
  verbose: true  // Enable detailed logging
};
```

### Test Credentials
Default test credentials for the enterprise API:
- **Username**: `ai`
- **Password**: `demo`  
- **Store ID**: `1`

---

**Phase 3 Status**: ✅ **COMPLETE** - Single Model Integration (Claude)  
**Next Phase**: Phase 4 - Multi-Model Integration & Comparison
