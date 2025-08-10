/**
 * Core type definitions for the MCP Test Suite
 */

// Import and re-export MCP Client types
import type { SchemaType, MCPServerConfig, MCPConnectionState, MCPToolCall } from './mcp/MCPClient.js';
import { MCPServerError } from './mcp/MCPClient.js';

export type { SchemaType, MCPServerConfig, MCPConnectionState, MCPToolCall };
export { MCPServerError };

// LLM Provider Types
export enum LLMProvider {
  CLAUDE = 'claude',
  GEMINI = 'gemini',
  CHATGPT = 'chatgpt'
}

// Configuration Types
export interface APIKeys {
  claude?: string;
  gemini?: string;
  chatgpt?: string;
  gpt4?: string; // For evaluation
}

export interface LLMConfig {
  provider: LLMProvider;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  timeout?: number;
}

export interface DockerConfig {
  containerName?: string;
  port?: number;
  healthCheckUrl?: string;
}

export interface TestConfig {
  llmProvider: LLMProvider;
  mcpServer: MCPServerConfig;
  apiKeys: APIKeys;
  llmConfig?: LLMConfig;
  docker?: DockerConfig;
  testPrompts?: string[];
  outputDir?: string;
  verbose?: boolean;
}

// Test Execution Types
export interface TestPrompt {
  id: string;
  name: string;
  description: string;
  prompt: string;
  expectedTools?: string[];
  complexity: 'simple' | 'medium' | 'complex';
  category: string;
}

export interface ConversationMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  tokenCount?: number;
}

export interface ConversationState {
  messages: ConversationMessage[];
  sessionId: string;
  startTime: Date;
  lastActivity: Date;
  metadata?: Record<string, any>;
}

// Test Metrics
export interface TestMetrics {
  toolCallCount: number;
  totalLatency: number;
  tokenUsage: {
    input: number;
    output: number;
    total: number;
  };
  errorCount: number;
  reasoningScore?: number;
  accuracyScore?: number;
  hallucinationDetected: boolean;
}

// Test Results
export interface TestResult {
  testId: string;
  testName: string;
  llmProvider: LLMProvider;
  startTime: Date;
  endTime: Date;
  success: boolean;
  conversation: ConversationState;
  toolCalls: MCPToolCall[];
  metrics: TestMetrics;
  finalResponse: string;
  rawGraphQLData?: any;
  evaluationScore?: number;
  error?: string;
}

export interface TestSuiteResult {
  suiteId: string;
  llmProvider: LLMProvider;
  startTime: Date;
  endTime: Date;
  totalTests: number;
  successfulTests: number;
  failedTests: number;
  results: TestResult[];
  aggregateMetrics: {
    averageToolCalls: number;
    averageLatency: number;
    totalTokenUsage: TestMetrics['tokenUsage'];
    averageAccuracy: number;
    hallucinationRate: number;
  };
}

// Scoring Types
export interface ScoringCriteria {
  toolEfficiency: number; // Weight for tool call count
  latency: number; // Weight for response time
  accuracy: number; // Weight for data accuracy
  reasoning: number; // Weight for reasoning quality
}

export interface EvaluationPrompt {
  systemPrompt: string;
  evaluationCriteria: string[];
  scoringRubric: Record<string, string>;
}

// Reporting Types
export interface ReportConfig {
  format: 'json' | 'csv' | 'html';
  includeRawData: boolean;
  includeConversations: boolean;
  outputPath: string;
}

export interface BenchmarkData {
  timestamp: Date;
  llmProvider: LLMProvider;
  testSuiteId: string;
  metrics: TestSuiteResult['aggregateMetrics'];
  individualResults: Pick<TestResult, 'testId' | 'metrics' | 'success'>[];
}

// Error Types
export class MCPTestError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'MCPTestError';
  }
}

export class ConfigurationError extends MCPTestError {
  constructor(message: string, details?: any) {
    super(message, 'CONFIG_ERROR', details);
    this.name = 'ConfigurationError';
  }
}

export class LLMProviderError extends MCPTestError {
  constructor(message: string, details?: any) {
    super(message, 'LLM_PROVIDER_ERROR', details);
    this.name = 'LLMProviderError';
  }
}
