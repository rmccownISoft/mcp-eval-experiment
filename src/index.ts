/**
 * MCP Test Suite - Main Library Export
 * Phase 3: Single Model Integration (Claude)
 * 
 * A comprehensive TypeScript test suite to evaluate GraphQL-API MCP server 
 * effectiveness for AI agents.
 */

// Core library exports
export { MCPTestSuite } from './lib/testing/MCPTestSuite.js';

// Configuration exports
export { ConfigManager } from './lib/config/ConfigManager.js';
export { loadConfig } from './lib/config/loader.js';

// Client exports
export { ConversationClient } from './lib/clients/base/ConversationClient.js';
export { ClaudeProvider } from './lib/clients/providers/ClaudeProvider.js';
export { GeminiProvider } from './lib/clients/providers/GeminiProvider.js';
export { ChatGPTProvider } from './lib/clients/providers/ChatGPTProvider.js';
export type { ILLMProvider, LLMResponse, ProviderInfo, ProviderOptions } from './lib/clients/providers/types.js';

// MCP integration exports
export { MCPClient } from './lib/mcp/MCPClient.js';
export type { MCPServerConfig, MCPConnectionState, MCPToolCall, SchemaType } from './lib/mcp/MCPClient.js';
export { MCPServerError } from './lib/mcp/MCPClient.js';

// Phase 3: Test Orchestration exports
export { TestOrchestrator } from './lib/orchestrator/TestOrchestrator.js';
export type { TestCase, TestExecutionContext, ToolExecutionResult } from './lib/orchestrator/TestOrchestrator.js';

// Phase 3: Tool Format Translation exports
export { ToolFormatTranslator } from './lib/adapters/tool-format-translator.js';
export type { ClaudeTool, MCPTool } from './lib/adapters/tool-format-translator.js';

// Phase 3: Test Cases exports
export {
  allPhase3TestCases,
  basicToolTests,
  authenticationTests,
  schemaExplorationTests,
  complexWorkflowTests,
  errorHandlingTests,
  performanceTests,
  testCaseCategories,
  getTestCasesByCategory,
  getTestCasesByComplexity,
  getTestCaseById,
  validateTestCase,
  getTestStatistics
} from './lib/test-cases/phase3-test-cases.js';

// Scoring exports
export { ScoringEngine } from './lib/scoring/ScoringEngine.js';

// Reporting exports
export { ReportGenerator } from './lib/reporting/ReportGenerator.js';

// Type exports
export type {
  // Core types
  TestConfig,
  TestResult,
  TestSuiteResult,
  TestMetrics,
  APIKeys,
  LLMConfig,
  DockerConfig,
  
  // Conversation types
  ConversationMessage,
  ConversationState,
  
  // Test types
  TestPrompt,
  
  // Scoring types
  ScoringCriteria,
  EvaluationPrompt,
  
  // Reporting types
  ReportConfig,
  BenchmarkData,
  
  // Error types
  MCPTestError,
  ConfigurationError,
  LLMProviderError
} from './lib/types.js';

// Re-export all types for convenience
export * from './lib/types.js';

// Version and phase information
export const VERSION = '1.0.0';
export const PHASE = 'Phase 3: Single Model Integration (Claude)';

// Import types and classes for utility functions
import { TestConfig, LLMProvider } from './lib/types.js';
import { MCPTestSuite } from './lib/testing/MCPTestSuite.js';
import { MCPClient, type MCPServerConfig } from './lib/mcp/MCPClient.js';
import { ClaudeProvider } from './lib/clients/providers/ClaudeProvider.js';

// Default configurations
export const DEFAULT_CONFIG: Partial<TestConfig> = {
  llmProvider: LLMProvider.CLAUDE,
  mcpServer: {
    transport: 'http',
    url: 'http://localhost',
    port: 3000,
    timeout: 30000
  },
  apiKeys: {},
  outputDir: './test-results',
  verbose: false
};

// Utility functions
export const createTestSuite = (config: TestConfig) => new MCPTestSuite(config);
export const createMCPClient = (config: MCPServerConfig) => new MCPClient(config);
export const createClaudeProvider = (config?: any) => new ClaudeProvider(config);
