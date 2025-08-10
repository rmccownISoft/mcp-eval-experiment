# Phase 2: Single Model Integration - MCP Test Suite

## Overview

Phase 2 of the MCP Test Suite project focuses on integrating a single AI model (Claude) with the MCP client built in Phase 1. This phase establishes the foundation for automated testing by enabling Claude to automatically call MCP server tools through natural language prompts.

## Prerequisites

**Phase 1 Complete**: Working MCP client that can connect to `enterprise-api-mcp-server` via stdio/HTTP and call all 9 tools  
**MCP Server Running**: The enterprise API MCP server is operational and accessible  
**Anthropic API Access**: Valid API key for Claude integration

## Phase 2 Goals

### Primary Objectives
1. **AI Model Integration**: Connect Claude to automatically use MCP tools based on natural language prompts
2. **Tool Orchestration**: Coordinate between MCP client and AI model for seamless tool execution
3. **Basic Metrics Collection**: Track tool usage patterns, accuracy, and performance
4. **Test Framework Foundation**: Establish testing patterns for future model comparisons
5. **Validation System**: Ensure Claude can successfully use all 9 MCP server tools

### Success Criteria
- [ ] Claude adapter successfully calls all 9 MCP tools
- [ ] 90%+ success rate on basic single-tool test cases
- [ ] 80%+ success rate on multi-tool workflow test cases
- [ ] Proper handling of authentication state changes
- [ ] Metrics collection system captures key performance indicators
- [ ] Architecture ready for Phase 3 expansion (multiple models)

## Technical Architecture

### Core Components

#### 1. Model Adapter Interface
```typescript
interface ModelAdapter {
  name: string;
  sendMessage(prompt: string, tools: Tool[], context?: any): Promise<ModelResponse>;
  supportsStreaming: boolean;
  maxTokens: number;
  rateLimits: {
    requestsPerMinute: number;
    tokensPerMinute: number;
  };
}

interface ModelResponse {
  content: string;
  toolCalls: ToolCall[];
  usage: TokenUsage;
  finishReason: string;
  metadata: {
    model: string;
    timestamp: Date;
    processingTimeMs: number;
  };
}
```

#### 2. Test Orchestrator
```typescript
class TestOrchestrator {
  constructor(
    private mcpClient: MCPClient,
    private modelAdapter: ModelAdapter,
    private metricsCollector: MetricsCollector
  )
  
  async runTest(testCase: TestCase): Promise<TestResult>
  async runTestSuite(testCases: TestCase[]): Promise<TestSuiteResult>
  async validateToolAvailability(): Promise<ToolValidationResult>
}
```

#### 3. Metrics Collection System
```typescript
interface TestMetrics {
  toolCalls: {
    total: number;
    successful: number;
    failed: number;
    sequence: string[];
    redundant: number;
    missing: string[];
  };
  performance: {
    totalLatencyMs: number;
    modelProcessingMs: number;
    toolExecutionMs: number;
    tokenUsage: TokenUsage;
  };
  accuracy: {
    toolSelectionScore: number;
    parameterAccuracyScore: number;
    responseCompletenessScore: number;
    overallScore: number;
  };
}
```

## Implementation Structure

### File Organization
```
src/
├── adapters/
│   ├── model-adapter.interface.ts
│   ├── claude-adapter.ts
│   └── adapter-utils.ts
├── orchestrator/
│   ├── test-orchestrator.ts
│   ├── tool-mapper.ts
│   └── context-manager.ts
├── metrics/
│   ├── metrics-collector.ts
│   ├── scoring-algorithms.ts
│   └── performance-tracker.ts
├── test-cases/
│   ├── basic-tools.ts
│   ├── authentication-flow.ts
│   ├── schema-exploration.ts
│   └── complex-workflows.ts
└── config/
    ├── test-config.ts
    └── model-config.ts

test/
├── unit/
│   ├── claude-adapter.test.ts
│   ├── orchestrator.test.ts
│   └── metrics.test.ts
└── integration/
    ├── single-tool.test.ts
    ├── multi-tool.test.ts
    └── end-to-end.test.ts
```

## Test Case Categories

### 1. Basic Tool Usage Tests
**Objective**: Verify Claude can call individual tools correctly

```typescript
const basicToolTests: TestCase[] = [
  {
    id: "get-date",
    name: "Get Current Date",
    prompt: "What's today's date?",
    expectedTools: ["get_current_date"],
    expectedCallCount: 1,
    complexity: "simple",
    category: "basic"
  },
  {
    id: "session-info",
    name: "Get Session Information",
    prompt: "What's my current session status?",
    expectedTools: ["get_session_info"],
    expectedCallCount: 1,
    complexity: "simple",
    category: "basic"
  },
  {
    id: "server-info",
    name: "Get Server Information",
    prompt: "What version is the GraphQL server?",
    expectedTools: ["get_server_information_query"],
    expectedCallCount: 1,
    complexity: "simple",
    category: "basic"
  }
];
```

### 2. Authentication Workflow Tests
**Objective**: Test authentication state management and tool availability changes

```typescript
const authenticationTests: TestCase[] = [
  {
    id: "login-flow",
    name: "Authentication Flow",
    prompt: "Log me in with username 'testuser', password 'testpass', store ID 1",
    expectedTools: ["authenticate"],
    expectedCallCount: 1,
    complexity: "medium",
    category: "authentication",
    setup: {
      ensureLoggedOut: true
    }
  },
  {
    id: "logout-flow", 
    name: "Session Closure",
    prompt: "Close my current session",
    expectedTools: ["close_session"],
    expectedCallCount: 1,
    complexity: "medium",
    category: "authentication",
    setup: {
      ensureLoggedIn: true
    }
  }
];
```

### 3. Schema Exploration Tests
**Objective**: Test GraphQL schema introspection capabilities

```typescript
const schemaExplorationTests: TestCase[] = [
  {
    id: "list-types",
    name: "List All Types",
    prompt: "What types are available in the GraphQL schema?",
    expectedTools: ["explore_schema"],
    expectedCallCount: 1,
    complexity: "medium",
    category: "schema"
  },
  {
    id: "customer-type",
    name: "Get Customer Type Definition",
    prompt: "Show me the Customer type definition",
    expectedTools: ["explore_schema"],
    expectedCallCount: 1,
    complexity: "medium",
    category: "schema",
    expectedParameters: {
      type: "type",
      items: "Customer"
    }
  },
  {
    id: "find-sales-types",
    name: "Find Sales-Related Types",
    prompt: "Find all types related to sales orders and show their definitions",
    expectedTools: ["search_schema", "explore_schema"],
    expectedCallCount: 2,
    complexity: "high",
    category: "schema"
  }
];
```

### 4. Complex Workflow Tests
**Objective**: Test multi-step reasoning and tool chaining

```typescript
const complexWorkflowTests: TestCase[] = [
  {
    id: "complete-exploration",
    name: "Complete Schema Exploration",
    prompt: "I'm new to this system. Give me an overview of the business domain, then show me the main entity types",
    expectedTools: ["quick_reference", "explore_schema"],
    expectedCallCount: 2,
    complexity: "high",
    category: "workflow"
  },
  {
    id: "guided-query-building",
    name: "Guided Query Building",
    prompt: "Help me build a query to get all stores available for login, and explain the structure",
    expectedTools: ["explore_schema", "query_graphql"],
    expectedCallCount: 2,
    complexity: "high", 
    category: "workflow"
  }
];
```

## Key Technical Challenges

### 1. Tool Format Translation

**Challenge**: Convert MCP tool definitions to Claude's expected format

**MCP Server Tool Definition**:
```json
{
  "name": "explore_schema",
  "description": "Introspect the GraphQL schema...",
  "inputSchema": {
    "type": "object",
    "properties": {
      "type": {
        "enum": ["enum", "type", "union", "input", "scalar", "interface"]
      },
      "items": {
        "anyOf": [
          {"type": "string"},
          {"items": {"type": "string"}, "type": "array"}
        ]
      }
    },
    "required": ["type"]
  }
}
```

**Claude API Tool Format**:
```json
{
  "name": "explore_schema",
  "description": "Introspect the GraphQL schema...",
  "input_schema": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": ["enum", "type", "union", "input", "scalar", "interface"]
      },
      "items": {
        "oneOf": [
          {"type": "string"},
          {"type": "array", "items": {"type": "string"}}
        ]
      }
    },
    "required": ["type"]
  }
}
```

**Solution**: Implement schema transformation utility

### 2. Authentication State Management

**Challenge**: Track tool availability changes when authentication state changes

**Implementation Strategy**:
```typescript
class AuthenticationStateManager {
  private isAuthenticated = false;
  private availableTools: Tool[] = [];
  
  async updateAuthenticationState(mcpClient: MCPClient): Promise<void> {
    const sessionInfo = await mcpClient.callTool("get_session_info");
    this.isAuthenticated = sessionInfo.includes("Logged in");
    this.availableTools = await mcpClient.listTools();
  }
  
  getAvailableTools(): Tool[] {
    return this.availableTools;
  }
}
```

### 3. Multi-step Reasoning Context

**Challenge**: Provide Claude with context from previous tool calls

**Solution**: Implement context management system
```typescript
interface ConversationContext {
  previousToolCalls: ToolCall[];
  authenticationState: boolean;
  schemaCache: Map<string, any>;
  sessionInfo: SessionInfo;
}
```

## Metrics and Scoring

### Tool Call Metrics
**Accuracy**: Percentage of correct tool selections  
**Efficiency**: (Expected calls / Actual calls) × 100  
**Parameter Accuracy**: Percentage of correctly formatted tool parameters  
**Sequence Logic**: Evaluation of tool call order appropriateness

### Performance Metrics
**Total Latency**: End-to-end response time  
**Model Processing Time**: Time spent in Claude API  
**Tool Execution Time**: Time spent executing MCP tools  
**Token Usage**: Input/output tokens consumed

### Response Quality Metrics
**Completeness**: Does response answer the full question?  
**Accuracy**: Is tool output correctly interpreted?  
**Clarity**: Is the response understandable?  
**Relevance**: Does response stay on topic?

### Scoring Algorithm
```typescript
function calculateOverallScore(metrics: TestMetrics): number {
  const weights = {
    toolAccuracy: 0.3,
    efficiency: 0.2, 
    responseQuality: 0.3,
    performance: 0.2
  };
  
  return (
    metrics.accuracy.toolSelectionScore * weights.toolAccuracy +
    metrics.toolCalls.efficiency * weights.efficiency +
    metrics.accuracy.responseCompletenessScore * weights.responseQuality +
    metrics.performance.performanceScore * weights.performance
  );
}
```

## Implementation Timeline

### Week 1: Foundation
- [ ] Implement Claude adapter with basic tool calling
- [ ] Create test orchestrator framework
- [ ] Set up basic metrics collection
- [ ] Implement tool format translation

### Week 2: Test Cases
- [ ] Implement basic tool usage tests
- [ ] Add authentication workflow tests
- [ ] Create schema exploration test cases
- [ ] Set up automated test execution

### Week 3: Advanced Features
- [ ] Implement multi-step workflow tests
- [ ] Add context management system
- [ ] Create comprehensive scoring algorithms
- [ ] Add performance optimization

### Week 4: Validation & Polish
- [ ] Run comprehensive test suite
- [ ] Validate metrics accuracy
- [ ] Optimize performance bottlenecks
- [ ] Prepare for Phase 3 expansion

## Configuration Management

### Environment Variables
```bash
# Anthropic API
ANTHROPIC_API_KEY=your_api_key_here

# MCP Server Configuration
MCP_SERVER_HOST=localhost
MCP_SERVER_PORT=4000
MCP_SERVER_TRANSPORT=stdio  # or http

# Test Configuration
TEST_ENVIRONMENT=development
TEST_TIMEOUT=30000
MAX_RETRIES=3

# Logging
LOG_LEVEL=info
METRICS_OUTPUT_DIR=./test-results
```

### Test Configuration
```typescript
interface TestConfig {
  models: {
    claude: {
      model: "claude-3-5-sonnet-20241022";
      maxTokens: 4096;
      temperature: 0.1;
    };
  };
  testSuite: {
    timeoutMs: 30000;
    retryAttempts: 3;
    parallelExecution: false;
  };
  metrics: {
    outputFormat: "json" | "csv" | "both";
    includeRawResponses: boolean;
    calculateSemanticSimilarity: boolean;
  };
}
```

## Risk Management

### Identified Risks
1. **Claude Domain Understanding**: May not understand GraphQL/enterprise context
2. **Tool Parameter Complexity**: Complex parameter validation requirements  
3. **Authentication State Confusion**: Tool availability changes may confuse model
4. **API Rate Limits**: Anthropic API limits may affect test execution
5. **Response Parsing**: Difficulty extracting structured data from Claude responses

### Mitigation Strategies
1. **Domain Context**: Include `quick_reference()` output in system prompts
2. **Parameter Validation**: Implement comprehensive schema validation
3. **State Management**: Clear authentication state communication
4. **Rate Limiting**: Implement request throttling and retry logic
5. **Response Structure**: Use structured output features when available

## Success Validation

### Automated Validation
- All 9 MCP tools callable through Claude
- 90%+ success rate on single-tool tests
- 80%+ success rate on multi-tool tests
- Performance benchmarks within acceptable ranges

### Manual Validation
- Review sample conversations for quality
- Validate metric accuracy through spot checks
- Confirm authentication workflows work correctly
- Verify error handling is appropriate

## Next Steps (Phase 3 Preparation)

Phase 2 deliverables should enable:
- Easy addition of new model adapters (ChatGPT, Gemini)
- Comparative analysis between models
- Standardized metrics across all models
- Scalable test execution framework

## Documentation Requirements

### Technical Documentation
- [ ] API reference for all new classes/interfaces
- [ ] Configuration guide
- [ ] Troubleshooting guide
- [ ] Performance tuning guide

### User Documentation  
- [ ] Setup and installation guide
- [ ] Test case creation guide
- [ ] Metrics interpretation guide
- [ ] Example usage scenarios

This document serves as the complete specification for Phase 2 implementation and can be referenced throughout development to ensure all requirements are met.