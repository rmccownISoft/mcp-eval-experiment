/**
 * Gemini LLM Provider
 * Phase 1: Basic structure and interface definition
 */

import { ILLMProvider, LLMResponse, ProviderInfo } from './types.js';
import { ConversationMessage, ConversationState, LLMConfig } from '../../types.js';

export class GeminiProvider implements ILLMProvider {
  private config?: LLMConfig;
  private apiKey?: string;

  async initialize(config: LLMConfig, apiKey: string): Promise<void> {
    this.config = config;
    this.apiKey = apiKey;
    console.log('⚠️  Gemini provider not yet implemented (Phase 1 - Foundation only)');
  }

  async sendMessage(message: string, conversationState?: ConversationState): Promise<LLMResponse> {
    console.log('⚠️  Gemini message sending not yet implemented (Phase 1 - Foundation only)');
    return {
      content: 'Mock Gemini response',
      tokenUsage: { input: 0, output: 0, total: 0 },
      latency: 0
    };
  }

  async sendConversation(messages: ConversationMessage[]): Promise<LLMResponse> {
    console.log('⚠️  Gemini conversation not yet implemented (Phase 1 - Foundation only)');
    return {
      content: 'Mock Gemini conversation response',
      tokenUsage: { input: 0, output: 0, total: 0 },
      latency: 0
    };
  }

  getProviderInfo(): ProviderInfo {
    return {
      name: 'Gemini',
      version: '1.0.0',
      supportedModels: ['gemini-pro', 'gemini-pro-vision'],
      maxTokens: 30720,
      supportsStreaming: true,
      supportsTools: true
    };
  }

  isConfigured(): boolean {
    return !!(this.config && this.apiKey);
  }
}
