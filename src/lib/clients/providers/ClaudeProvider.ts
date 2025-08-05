/**
 * Claude LLM Provider
 * Phase 1: Basic structure and interface definition
 */

import { ILLMProvider, LLMResponse, ProviderInfo } from './types.js';
import { ConversationMessage, ConversationState, LLMConfig } from '../../types.js';

export class ClaudeProvider implements ILLMProvider {
  private config?: LLMConfig;
  private apiKey?: string;

  async initialize(config: LLMConfig, apiKey: string): Promise<void> {
    this.config = config;
    this.apiKey = apiKey;
    console.log('⚠️  Claude provider not yet implemented (Phase 1 - Foundation only)');
  }

  async sendMessage(message: string, conversationState?: ConversationState): Promise<LLMResponse> {
    console.log('⚠️  Claude message sending not yet implemented (Phase 1 - Foundation only)');
    return {
      content: 'Mock Claude response',
      tokenUsage: { input: 0, output: 0, total: 0 },
      latency: 0
    };
  }

  async sendConversation(messages: ConversationMessage[]): Promise<LLMResponse> {
    console.log('⚠️  Claude conversation not yet implemented (Phase 1 - Foundation only)');
    return {
      content: 'Mock Claude conversation response',
      tokenUsage: { input: 0, output: 0, total: 0 },
      latency: 0
    };
  }

  getProviderInfo(): ProviderInfo {
    return {
      name: 'Claude',
      version: '1.0.0',
      supportedModels: ['claude-3-sonnet', 'claude-3-haiku'],
      maxTokens: 200000,
      supportsStreaming: true,
      supportsTools: true
    };
  }

  isConfigured(): boolean {
    return !!(this.config && this.apiKey);
  }
}
