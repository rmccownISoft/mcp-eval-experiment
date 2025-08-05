/**
 * Base Conversation Client
 * Phase 1: Basic structure and interface definition
 */

import { ConversationState, ConversationMessage, LLMConfig } from '../../types.js';
import { ILLMProvider } from '../providers/types.js';

export class ConversationClient {
  private provider?: ILLMProvider;
  private config?: LLMConfig;

  constructor(provider?: ILLMProvider, config?: LLMConfig) {
    if (provider) this.provider = provider;
    if (config) this.config = config;
  }

  /**
   * Initialize conversation client
   * Phase 1: Stub implementation
   */
  public async initialize(provider: ILLMProvider, config: LLMConfig): Promise<void> {
    this.provider = provider;
    this.config = config;
    console.log('⚠️  ConversationClient initialization not yet implemented (Phase 1 - Foundation only)');
  }

  /**
   * Start a new conversation
   * Phase 1: Stub implementation
   */
  public async startConversation(): Promise<ConversationState> {
    const conversation: ConversationState = {
      messages: [],
      sessionId: `session-${Date.now()}`,
      startTime: new Date(),
      lastActivity: new Date()
    };

    console.log('⚠️  Conversation management not yet implemented (Phase 1 - Foundation only)');
    return conversation;
  }

  /**
   * Send message in conversation
   * Phase 1: Stub implementation
   */
  public async sendMessage(message: string, conversation: ConversationState): Promise<string> {
    console.log('⚠️  Message sending not yet implemented (Phase 1 - Foundation only)');
    return 'Mock response - not yet implemented';
  }
}
