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

**Phase 3 Implementation Strategy**: Based on lessons learned from Phase 2, Phase 3 will focus on single-model integration (Claude) first, rather than attempting to implement all three models simultaneously. This approach provides:
- **Faster Time to Value**: Get automated testing working with one model quickly
- **Architecture Validation**: Prove the design works before scaling to multiple models  
- **Risk Reduction**: Identify and solve integration challenges with one model before expanding
- **Foundation for Expansion**: Create solid patterns that can be replicated for other models

**Detailed Phase 3 Specification**: See `documentation/single-model-integration.md` for comprehensive implementation details, test cases, technical challenges, and success criteria for the Claude-focused approach.

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

### Phase 2: MCP Server Integration ✅ **COMPLETED**
**Status**: ✅ **COMPLETE** - Full MCP client implementation with all 9 server tools

**Completed Deliverables**:
- ✅ Complete MCP client implementation (`src/lib/mcp/MCPClient.ts`)
- ✅ All 9 Enterprise API MCP Server tools implemented and tested
- ✅ Dual transport support (STDIO and Streamable HTTP)
- ✅ Comprehensive authentication and session management
- ✅ Full schema exploration with proper type validation
- ✅ GraphQL query execution with mutation blocking
- ✅ Server error detection with `isError: true` flag handling
- ✅ Tool call tracking with performance metrics
- ✅ 68 comprehensive tests - all passing
- ✅ Complete documentation and usage examples

**Implemented MCP Tools**:
1. ✅ `get_session_info()` - Session ID and authentication status
2. ✅ `get_current_date()` - Current date in YYYY-MM-DD format
3. ✅ `authenticate(username, password, storeId)` - Login with proper number type
4. ✅ `close_session()` - Session closure and tool re-enablement
5. ✅ `get_server_information_query()` - Server schema and version info
6. ✅ `quick_reference()` - Business context guide
7. ✅ `explore_schema(type, items?)` - Schema introspection with enum validation
8. ✅ `search_schema(keyword)` - Schema search with keyword validation
9. ✅ `query_graphql(query, variables?)` - GraphQL execution with variables

**Key Technical Achievements**:
- ✅ Proper parameter types (storeId as number, SchemaType enum)
- ✅ Server-specific error handling with `isError: true` detection
- ✅ MCP response parsing with text content extraction
- ✅ Authentication state management with tool availability changes
- ✅ Session ID tracking and persistence
- ✅ Comprehensive parameter validation
- ✅ Performance metrics with latency and success tracking
- ✅ TypeScript type safety with proper interfaces

**Test Coverage**:
- ✅ **68 Tests Total** - All passing
- ✅ Integration tests (`tests/mcp-client-integration.test.ts`)
- ✅ Transport & protocol tests (`tests/phase02.1.test.ts`)
- ✅ Authentication tests (`tests/phase02.2.test.ts`)
- ✅ Schema exploration tests (`tests/phase02.3.test.ts`)
- ✅ Error handling and edge case coverage
- ✅ TypeScript compilation with no errors

**Configuration Support**:
- ✅ HTTP Transport: Streamable HTTP on port 3000 (recommended)
- ✅ STDIO Transport: Process spawning with environment variables
- ✅ Environment variables: HOST_ADDR, API_KEY, DEBUG_LOG
- ✅ Test credentials: username: 'ai', password: 'demo', storeId: 1

**Ready for Phase 3**: The MCP client is now production-ready and provides a solid foundation for AI agent integration. All server tools are functional, tested, and documented.

### Phase 3: Single Model Integration (Claude Focus)
**Deliverables**:
- **Claude Adapter**: Direct integration with Anthropic's Claude API for automated MCP tool usage
- **Test Orchestrator**: Coordinate between MCP client and Claude for seamless tool execution
- **Basic Metrics Collection**: Track tool usage patterns, accuracy, and performance for Claude
- **Test Framework Foundation**: Establish testing patterns that can be extended to other models
- **Comprehensive Test Cases**: Single-tool, multi-tool, and complex workflow test scenarios
- **Authentication State Management**: Handle tool availability changes during login/logout flows
- **Response Quality Scoring**: Evaluate Claude's tool selection, parameter accuracy, and response completeness

**Architecture Design for Future Expansion**:
- **Model Adapter Interface**: Define standard interface that future models (Gemini, ChatGPT) can implement
- **Pluggable Architecture**: Design system to easily add new model adapters without core changes
- **Standardized Metrics**: Create metrics framework that works consistently across all future models
- **Configuration System**: Support for model-specific settings and API credentials

**Testing Criteria**:
- Claude successfully calls all 9 MCP server tools through natural language prompts
- 90%+ success rate on basic single-tool test cases
- 80%+ success rate on multi-tool workflow test cases
- Proper handling of authentication state changes and tool availability
- Metrics collection captures key performance indicators (tool calls, latency, accuracy, token usage)
- Architecture ready for Phase 4 expansion to multiple models
- Library exports work correctly for external integration

**Key Focus Areas**:
- **Tool Format Translation**: Convert MCP tool definitions to Claude's expected format
- **Context Management**: Maintain conversation context and previous tool call results
- **Error Handling**: Robust handling of API limits, tool failures, and authentication issues
- **Performance Optimization**: Minimize unnecessary tool calls and optimize response times
- **Quality Validation**: Ensure Claude correctly interprets tool outputs and provides accurate responses

### Phase 4: Multi-Model Integration & Comparison
**Deliverables**:
- **Additional Model Adapters**: Implement Gemini and ChatGPT providers using Phase 3 architecture
- **Model Comparison Engine**: Run identical test cases across all models for comparative analysis
- **Cross-Model Metrics**: Standardized scoring that enables fair comparison between models
- **Performance Benchmarking**: Comparative analysis of speed, accuracy, and efficiency across models
- **Model Selection Recommendations**: Data-driven insights on which models perform best for different task types

**Testing Criteria**:
- All three models (Claude, Gemini, ChatGPT) work through the unified interface
- Identical test cases run successfully across all models
- Comparative metrics provide meaningful insights into model strengths/weaknesses
- Model switching works seamlessly via configuration
- Performance benchmarks are consistent and reliable

### Phase 5: Advanced Test Scenarios & Prompt Execution
**Deliverables**:
- **Complex Test Scenarios**: Multi-step reasoning tasks and business workflow simulations
- **Test Prompt Library**: Comprehensive collection of test cases covering various complexity levels
- **Sequential Test Execution**: Automated execution of full test suites across all models
- **Advanced Metrics**: Semantic similarity scoring, hallucination detection, reasoning quality assessment
- **Comprehensive Logging**: Detailed traceability of tool calls, API interactions, and decision paths

**Testing Criteria**:
- Complex multi-step scenarios execute successfully across all models
- Advanced metrics provide deeper insights into model capabilities
- Test execution is fully automated and reliable
- Logging provides sufficient detail for debugging and analysis

### Phase 6: Advanced Evaluation & Reporting
**Deliverables**:
- **GPT-4 Integration**: Use GPT-4 for sophisticated response quality evaluation
- **Advanced Scoring Algorithms**: Comprehensive metrics for tool efficiency, reasoning quality, and accuracy
- **Hallucination Detection**: Automated detection of AI-generated data not present in actual API responses
- **Comparative Analysis Engine**: Statistical analysis and visualization of model performance differences
- **Comprehensive Reporting**: Detailed reports with actionable insights and recommendations

**Testing Criteria**:
- GPT-4 scoring produces consistent, reasonable results across all models
- Hallucination detection accurately identifies fabricated data
- All metrics are calculated accurately and provide meaningful insights
- Comparative analysis reveals clear model strengths and weaknesses
- Reports are comprehensive, actionable, and well-formatted

**Key Deliverables**:
- **Performance Benchmarks**: Standardized metrics for tool call efficiency, response latency, and accuracy
- **Model Recommendation Engine**: Data-driven recommendations for optimal model selection by task type
- **Quality Assurance Reports**: Detailed analysis of response accuracy and hallucination rates
- **Business Impact Analysis**: Insights into how different models perform on real-world salvage yard scenarios

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
