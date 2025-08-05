/**
 * ChatGPT LLM Provider
 * Phase 1: Basic structure and interface definition
 */

import { ILLMProvider, LLMResponse, ProviderInfo } from './types.js';
import { ConversationMessage, ConversationState, LLMConfig } from '../../types.js';

export class ChatGPTProvider implements ILLMProvider {
  private config?: LLMConfig;
  private apiKey?: string;

  async initialize(config: LLMConfig, apiKey: string): Promise<void> {
    this.config = config;
    this.apiKey = apiKey;
    console.log('⚠️  ChatGPT provider not yet implemented (Phase 1 - Foundation only)');
  }

  async sendMessage(message: string, conversationState?: ConversationState): Promise<LLMResponse> {
    console.log('⚠️  ChatGPT message sending not yet implemented (Phase 1 - Foundation only)');
    return {
      content: 'Mock ChatGPT response',
      tokenUsage: { input: 0, output: 0, total: 0 },
      latency: 0
    };
  }

  async sendConversation(messages: ConversationMessage[]): Promise<LLMResponse> {
    console.log('⚠️  ChatGPT conversation not yet implemented (Phase 1 - Foundation only)');
    return {
      content: 'Mock ChatGPT conversation response',
      tokenUsage: { input: 0, output: 0, total: 0 },
      latency: 0
    };
  }

  getProviderInfo(): ProviderInfo {
    return {
      name: 'ChatGPT',
      version: '1.0.0',
      supportedModels: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
      maxTokens: 128000,
      supportsStreaming: true,
      supportsTools: true
    };
  }

  isConfigured(): boolean {
    return !!(this.config && this.apiKey);
  }
}
