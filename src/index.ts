/**
 * MCP Test Suite - Main Library Export
 * 
 * A comprehensive TypeScript test suite to evaluate GraphQL-API MCP server 
 * effectiveness for AI agents.
 */

// Core library exports
export { MCPTestSuite } from './lib/testing/MCPTestSuite';
export { LLMProvider, TestConfig, TestResult, TestMetrics } from './lib/types';

// Configuration exports
export { ConfigManager } from './lib/config/ConfigManager';
export { loadConfig } from './lib/config/loader';

// Client exports
export { ConversationClient } from './lib/clients/base/ConversationClient';
export { ClaudeProvider } from './lib/clients/providers/ClaudeProvider';
export { GeminiProvider } from './lib/clients/providers/GeminiProvider';
export { ChatGPTProvider } from './lib/clients/providers/ChatGPTProvider';

// MCP integration exports
export { MCPClient } from './lib/mcp/MCPClient';

// Scoring exports
export { ScoringEngine } from './lib/scoring/ScoringEngine';

// Reporting exports
export { ReportGenerator } from './lib/reporting/ReportGenerator';

// Re-export types for convenience
export * from './lib/types';
