# GraphQL-API MCP Server Test Suite Project Specification

## Project Overview
Create a comprehensive TypeScript test suite to evaluate the effectiveness of a GraphQL-API MCP (Model Context Protocol) server for AI agents. The MCP server provides access to a heavy truck salvage yard ERP system with read-only GraphQL queries.

## Business Context
- **Domain**: Heavy truck salvage yard ERP system
- **Key Business Areas**: Work orders, inventory lookups, sales orders, parts searches, stocking levels
- **Test Environment**: Docker-deployed database with test data and GraphQL API
- **Authentication**: Simple login tool requiring username, password, and store ID

## Technical Requirements
- **Language**: TypeScript
- **Testing Framework**: Node.js built-in test runner
- **Dependencies**: Minimal external libraries (prefer built-in Node.js capabilities)
- **Architecture**: Library with CLI interface and thin client for LLM conversations
- **AI Models**: Configurable LLM integration (Claude, Gemini, ChatGPT) via API calls
- **Evaluation Model**: GPT-4 for response scoring
- **Library Design**: Exportable modules for integration into other projects

## Core Functionality Requirements

### 1. AI Agent Integration & Conversation Management
- **Thin Client Architecture**: Lightweight conversation manager for each LLM
- **Configurable LLM Support**: Plugin-style architecture for Claude, Gemini, and ChatGPT APIs
- **Conversation State Tracking**: Maintain context and message history throughout prompt tests
- **Session Management**: Handle authentication, rate limiting, and API-specific requirements
- Execute approximately 24 test prompts of varying complexity
- Handle MCP server authentication and GraphQL schema exploration
- Track tool usage and API interactions

### 2. Scoring Metrics
- **Tool Call Efficiency**: Count and score number of MCP tool calls (fewer is better)
- **Latency**: Measure response times for complete test scenarios
- **Reasoning Quality**: Evaluate GraphQL query construction and schema exploration
- **Data Accuracy**: Verify natural language responses match actual GraphQL response data
- **Token Usage**: Track API token consumption
- **Error Rates**: Monitor and report failures

### 3. Data Validation
- Compare AI agent natural language responses against raw GraphQL query results
- Detect hallucinations (data not present in actual API responses)
- Ensure accurate representation of salvage yard business data

### 4. Reporting & Logging
- Generate final test reports with all metrics
- Save performance benchmarks to files
- Integrate with MCP tool logging for traceability
- Provide comparative analysis across AI models

## Project Phases
**IMPORTANT**: Complete each phase as a standalone unit. Test thoroughly and verify functionality before proceeding. Update this specification document as you progress through each phase.

### Phase 1: Project Foundation & Library Architecture
**Deliverables**:
- TypeScript project setup with library configuration (package.json exports, typings)
- Configuration system for API keys, test parameters, and MCP server connection
- Library export structure and public API design
- Basic CLI interface structure (as consumer of the library)
- Docker integration for test environment
- Initial project documentation and usage examples

**Testing Criteria**: 
- Library can be imported and used programmatically
- Configuration loads correctly both as library and CLI
- Docker test environment connects successfully
- CLI accepts basic commands and uses library functions
- TypeScript compilation works without errors
- Library exports are properly typed and documented

### Phase 2: MCP Server Integration
Transform the stub MCPClient into a fully functional MCP client that communicates with the GraphQL-API MCP server via HTTP transport using JSON-RPC 2.0.

**IMPORTANT**: Complete each sub-phase as a standalone unit. Test thoroughly before proceeding to the next sub-phase.

#### Phase 2.1: HTTP Transport & MCP Protocol Foundation
**Deliverables**:
- JSON-RPC 2.0 HTTP client implementation
- MCP protocol message handling (initialize, tools/list, tools/call)
- Basic connection lifecycle management
- Network error handling and timeouts
- Update MCPServerConfig type for HTTP transport

**Testing Criteria**:
- Successfully connect to MCP server via HTTP
- Proper MCP protocol initialization handshake
- Can list available tools from server
- Network failures handled gracefully
- Configuration supports HTTP endpoints

#### Phase 2.2: Authentication & Session Management
**Deliverables**:
- Implement `authenticate(username, password, selectedStoreId)` tool call
- Authentication state tracking and management
- Implement `get_session_info()` and `close_session()` tools
- Handle authentication success/failure responses
- Auto-disable/enable authenticate tool based on login status

**Testing Criteria**:
- Successful authentication with valid credentials
- Proper error handling for invalid credentials
- Authentication state persists across tool calls
- Session management works correctly
- Tool availability changes based on auth state

#### Phase 2.3: Schema Exploration Tools
**Deliverables**:
- Implement `explore_schema(type, items?)` tool call
- Implement `search_schema(keyword)` tool call
- Handle schema item types and response parsing
- Support for both single items and arrays
- Proper error handling for invalid schema requests

**Testing Criteria**:
- Schema exploration returns valid schema information
- Search functionality finds relevant schema items
- Both single and multiple item requests work
- Invalid requests return appropriate errors
- Schema responses are properly parsed

#### Phase 2.4: GraphQL Query Execution
**Deliverables**:
- Implement `query_graphql(query, variables?)` tool call
- GraphQL query validation and error handling
- Response parsing and error detection
- Support for query variables
- Mutation blocking (read-only enforcement)

**Testing Criteria**:
- Can execute simple GraphQL queries successfully
- Query variables are properly passed
- GraphQL errors are detected and reported
- Mutations are properly blocked
- Response data is correctly parsed

#### Phase 2.5: Utility Tools & Integration
**Deliverables**:
- Implement remaining utility tools (`get_current_date`, `get_server_information_query`, `quick_reference`)
- Enhanced tool call tracking with actual metrics
- Integration with existing configuration system
- Comprehensive error handling and logging
- Update type definitions for all new functionality

**Testing Criteria**:
- All utility tools work correctly
- Tool call tracking captures real latency and success metrics
- Configuration system properly supports MCP settings
- Error messages are clear and actionable
- Type definitions are complete and accurate

#### Phase 2.6: Integration Testing & Validation
**Deliverables**:
- Comprehensive integration tests for all MCP functionality
- End-to-end testing with actual MCP server
- Performance benchmarking for tool calls
- Documentation updates with usage examples
- Validation of all Phase 2 testing criteria

**Testing Criteria**:
- All 9 MCP tools can be called successfully
- Authentication flow works end-to-end
- Schema operations return expected results
- GraphQL queries execute without errors
- Tool call metrics are accurately captured
- Integration with existing library architecture is seamless

**Overall Phase 2 Success Criteria**:
- Complete MCP client can authenticate and maintain sessions
- All server tools are accessible and functional
- Schema exploration provides useful information for AI agents
- GraphQL queries execute reliably with proper error handling
- Tool call tracking provides accurate performance metrics
- Client integrates seamlessly with existing configuration and type systems

### Phase 3: Thin Client & LLM Integration
**Deliverables**:
- **Thin Client Architecture**: Base conversation client with pluggable LLM providers
- **LLM Provider Plugins**: Separate modules for Claude, Gemini, and ChatGPT APIs
- **Conversation State Manager**: Track message history, context, and session state
- **Configurable LLM Selection**: Runtime LLM switching based on configuration
- **Rate Limiting & Error Handling**: Robust API interaction management
- Token usage tracking and latency measurement

**Testing Criteria**:
- All three LLM providers work through the thin client interface
- Conversation state is maintained correctly across multi-turn interactions
- LLM can be switched via configuration without code changes
- Token usage and response times are accurately tracked
- API errors and rate limits are handled gracefully
- Library exports work correctly for external integration

### Phase 4: Test Prompt Execution Engine
**Deliverables**:
- Test prompt loader and manager
- Sequential test execution system
- MCP tool call tracking
- Raw query/response data capture
- Comprehensive logging system

**Testing Criteria**:
- All test prompts execute successfully
- MCP tool calls are accurately counted
- GraphQL responses are captured correctly
- Logs provide sufficient detail for debugging

### Phase 5: Scoring and Evaluation System
**Deliverables**:
- GPT-4 integration for response evaluation
- Scoring algorithms for all metrics (tool calls, latency, reasoning, accuracy)
- Data validation system (hallucination detection)
- Comparative analysis engine

**Testing Criteria**:
- GPT-4 scoring produces consistent, reasonable results
- Hallucination detection works correctly
- All metrics are calculated accurately
- Comparative analysis provides meaningful insights

### Phase 6: Reporting and Output
**Deliverables**:
- Comprehensive report generation
- Benchmark file output
- Performance visualization (if applicable)
- Final documentation and usage instructions

**Testing Criteria**:
- Reports contain all required metrics
- Benchmark files are properly formatted and saved
- Documentation is complete and accurate
- End-to-end system test passes

## Technical Specifications

## Library Usage & Integration

### As a Library
```typescript
import { MCPTestSuite, LLMProvider } from 'mcp-test-suite';

const testSuite = new MCPTestSuite({
  llmProvider: LLMProvider.CLAUDE,
  mcpServerUrl: 'http://localhost:3000',
  apiKeys: { claude: 'sk-...' }
});

const results = await testSuite.runTests(['prompt1', 'prompt2']);
```

### As CLI Tool
```bash
npx mcp-test-suite --llm claude --config ./config.json --prompts ./test-prompts/
```

### Configuration Format
- JSON/YAML configuration files for:
  - API credentials (Claude, Gemini, ChatGPT, GPT-4)
  - MCP server connection details
  - Test parameters and thresholds
  - Docker environment settings
  - LLM-specific settings (model versions, parameters)

### File Structure
```
mcp-test-suite/
├── src/
│   ├── lib/                    # Library core (exportable)
│   │   ├── clients/           # Thin client architecture
│   │   │   ├── base/          # Base conversation client
│   │   │   ├── providers/     # LLM provider plugins
│   │   │   └── session/       # Session & state management
│   │   ├── mcp/              # MCP server integration
│   │   ├── scoring/          # Evaluation and scoring logic
│   │   ├── testing/          # Test execution engine
│   │   └── reporting/        # Report generation
│   ├── cli/                   # CLI interface
│   └── index.ts              # Library exports
├── config/                   # Configuration files
├── test-prompts/            # Test prompt definitions
├── results/                 # Generated reports and benchmarks
├── tests/                   # Unit tests
├── examples/                # Usage examples
└── package.json            # Library configuration
```

### Data Formats
- Test results: JSON with structured metrics
- Benchmarks: CSV/JSON for easy analysis
- Logs: Structured JSON for MCP tool correlation

## Success Criteria
- Successfully test all AI models against all test prompts
- Generate accurate, comparable metrics across models
- Detect data hallucinations reliably
- Provide actionable insights for MCP server improvements
- Maintain correlation with MCP tool logging for debugging

## Future Considerations
- Multi-step reasoning task support
- Real-time monitoring capabilities
- Concurrent testing across models
- Extended business scenario coverage
- Performance optimization recommendations

---

**Remember**: Test each phase thoroughly before proceeding. Update this specification document as you implement each phase to reflect any necessary changes or discoveries.
