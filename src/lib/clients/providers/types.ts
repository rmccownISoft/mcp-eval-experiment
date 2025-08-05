/**
 * LLM Provider Types and Interfaces
 * Defines the contract for LLM provider implementations
 */

import { ConversationMessage, ConversationState, LLMConfig } from '../../types.js';

/**
 * Base interface for all LLM providers
 */
export interface ILLMProvider {
  /**
   * Initialize the provider with configuration
   */
  initialize(config: LLMConfig, apiKey: string): Promise<void>;

  /**
   * Send a message and get a response
   */
  sendMessage(message: string, conversationState?: ConversationState): Promise<LLMResponse>;

  /**
   * Send multiple messages in a conversation
   */
  sendConversation(messages: ConversationMessage[]): Promise<LLMResponse>;

  /**
   * Get provider-specific information
   */
  getProviderInfo(): ProviderInfo;

  /**
   * Check if the provider is properly configured
   */
  isConfigured(): boolean;
}

/**
 * Response from an LLM provider
 */
export interface LLMResponse {
  content: string;
  tokenUsage: {
    input: number;
    output: number;
    total: number;
  };
  latency: number;
  model?: string;
  finishReason?: string;
  metadata?: Record<string, any>;
}

/**
 * Provider information
 */
export interface ProviderInfo {
  name: string;
  version: string;
  supportedModels: string[];
  maxTokens: number;
  supportsStreaming: boolean;
  supportsTools: boolean;
}

/**
 * Provider-specific configuration options
 */
export interface ProviderOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  timeout?: number;
  retries?: number;
}
