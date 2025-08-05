/**
 * MCP Test Suite - Main Library Export
 * 
 * A comprehensive TypeScript test suite to evaluate GraphQL-API MCP server 
 * effectiveness for AI agents.
 */

// Core library exports
export { MCPTestSuite } from './lib/testing/MCPTestSuite.js';
export { LLMProvider, TestConfig, TestResult, TestMetrics } from './lib/types.js';

// Configuration exports
export { ConfigManager } from './lib/config/ConfigManager.js';
export { loadConfig } from './lib/config/loader.js';

// Client exports
export { ConversationClient } from './lib/clients/base/ConversationClient.js';
export { ClaudeProvider } from './lib/clients/providers/ClaudeProvider.js';
export { GeminiProvider } from './lib/clients/providers/GeminiProvider.js';
export { ChatGPTProvider } from './lib/clients/providers/ChatGPTProvider.js';

// MCP integration exports
export { MCPClient } from './lib/mcp/MCPClient.js';

// Scoring exports
export { ScoringEngine } from './lib/scoring/ScoringEngine.js';

// Reporting exports
export { ReportGenerator } from './lib/reporting/ReportGenerator.js';

// Re-export types for convenience
export * from './lib/types.js';
