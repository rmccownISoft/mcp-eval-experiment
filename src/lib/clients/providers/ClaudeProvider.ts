/**
 * Claude LLM Provider - Phase 3 Implementation
 * Full Anthropic API integration with tool calling support
 */

import { ILLMProvider, LLMResponse, ProviderInfo, ProviderOptions } from './types.js';
import { ConversationMessage, ConversationState, LLMConfig, LLMProviderError } from '../../types.js';

// Anthropic API types
interface AnthropicMessage {
  role: 'user' | 'assistant';
  content: string | Array<{
    type: 'text' | 'tool_use' | 'tool_result';
    text?: string;
    id?: string;
    name?: string;
    input?: any;
    content?: string;
    tool_use_id?: string;
    is_error?: boolean;
  }>;
}

interface AnthropicTool {
  name: string;
  description: string;
  input_schema: {
    type: 'object';
    properties: Record<string, any>;
    required?: string[];
  };
}

interface AnthropicResponse {
  id: string;
  type: 'message';
  role: 'assistant';
  content: Array<{
    type: 'text' | 'tool_use';
    text?: string;
    id?: string;
    name?: string;
    input?: any;
  }>;
  model: string;
  stop_reason: string;
  stop_sequence: null;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

interface ClaudeToolCall {
  id: string;
  name: string;
  input: any;
}

export interface ClaudeConfig extends ProviderOptions {
  model?: string;
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
}

export class ClaudeProvider implements ILLMProvider {
  private config?: LLMConfig;
  private apiKey?: string;
  private claudeConfig: ClaudeConfig;
  private baseUrl = 'https://api.anthropic.com/v1';
  private availableTools: AnthropicTool[] = [];

  constructor(claudeConfig: ClaudeConfig = {}) {
    this.claudeConfig = {
      model: 'claude-3-5-sonnet-20241022',
      maxTokens: 4096,
      temperature: 0.1,
      timeout: 30000,
      retries: 3,
      ...claudeConfig
    };
  }

  async initialize(config: LLMConfig, apiKey: string): Promise<void> {
    if (!apiKey || !apiKey.startsWith('sk-ant-')) {
      throw new LLMProviderError('Invalid Anthropic API key. Must start with "sk-ant-"');
    }

    this.config = config;
    this.apiKey = apiKey;

    // Test API connection
    try {
      await this.testConnection();
    } catch (error) {
      throw new LLMProviderError(
        `Failed to initialize Claude provider: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  async sendMessage(message: string, conversationState?: ConversationState): Promise<LLMResponse> {
    if (!this.isConfigured()) {
      throw new LLMProviderError('Claude provider not initialized');
    }

    const startTime = Date.now();

    try {
      const messages: AnthropicMessage[] = [];

      // Add conversation history if provided
      if (conversationState?.messages) {
        for (const msg of conversationState.messages) {
          if (msg.role !== 'system') {
            messages.push({
              role: msg.role as 'user' | 'assistant',
              content: msg.content
            });
          }
        }
      }

      // Add current message
      messages.push({
        role: 'user',
        content: message
      });

      const response = await this.callAnthropicAPI(messages);
      const latency = Date.now() - startTime;

      return {
        content: this.extractTextContent(response),
        tokenUsage: {
          input: response.usage.input_tokens,
          output: response.usage.output_tokens,
          total: response.usage.input_tokens + response.usage.output_tokens
        },
        latency,
        model: response.model,
        finishReason: response.stop_reason,
        metadata: {
          id: response.id,
          toolCalls: this.extractToolCalls(response)
        }
      };
    } catch (error) {
      const latency = Date.now() - startTime;
      throw new LLMProviderError(
        `Claude API call failed: ${error instanceof Error ? error.message : String(error)}`,
        { latency, originalError: error }
      );
    }
  }

  async sendConversation(messages: ConversationMessage[]): Promise<LLMResponse> {
    if (!this.isConfigured()) {
      throw new LLMProviderError('Claude provider not initialized');
    }

    const startTime = Date.now();

    try {
      const anthropicMessages: AnthropicMessage[] = messages
        .filter(msg => msg.role !== 'system')
        .map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        }));

      const response = await this.callAnthropicAPI(anthropicMessages);
      const latency = Date.now() - startTime;

      return {
        content: this.extractTextContent(response),
        tokenUsage: {
          input: response.usage.input_tokens,
          output: response.usage.output_tokens,
          total: response.usage.input_tokens + response.usage.output_tokens
        },
        latency,
        model: response.model,
        finishReason: response.stop_reason,
        metadata: {
          id: response.id,
          toolCalls: this.extractToolCalls(response)
        }
      };
    } catch (error) {
      const latency = Date.now() - startTime;
      throw new LLMProviderError(
        `Claude conversation failed: ${error instanceof Error ? error.message : String(error)}`,
        { latency, originalError: error }
      );
    }
  }

  /**
   * Send message with tool support
   */
  async sendMessageWithTools(
    message: string, 
    tools: AnthropicTool[], 
    conversationHistory: AnthropicMessage[] = []
  ): Promise<LLMResponse & { toolCalls: ClaudeToolCall[] }> {
    if (!this.isConfigured()) {
      throw new LLMProviderError('Claude provider not initialized');
    }

    const startTime = Date.now();

    try {
      const messages: AnthropicMessage[] = [
        ...conversationHistory,
        {
          role: 'user',
          content: message
        }
      ];

      const response = await this.callAnthropicAPI(messages, tools);
      const latency = Date.now() - startTime;
      const toolCalls = this.extractToolCalls(response);

      return {
        content: this.extractTextContent(response),
        tokenUsage: {
          input: response.usage.input_tokens,
          output: response.usage.output_tokens,
          total: response.usage.input_tokens + response.usage.output_tokens
        },
        latency,
        model: response.model,
        finishReason: response.stop_reason,
        toolCalls,
        metadata: {
          id: response.id,
          toolCalls
        }
      };
    } catch (error) {
      const latency = Date.now() - startTime;
      throw new LLMProviderError(
        `Claude tool call failed: ${error instanceof Error ? error.message : String(error)}`,
        { latency, originalError: error }
      );
    }
  }

  /**
   * Continue conversation with tool results
   */
  async continueWithToolResults(
    conversationHistory: AnthropicMessage[],
    toolResults: Array<{ tool_use_id: string; content: string; is_error?: boolean }>
  ): Promise<LLMResponse> {
    if (!this.isConfigured()) {
      throw new LLMProviderError('Claude provider not initialized');
    }

    const startTime = Date.now();

    try {
      // Add tool results to conversation
      const messages: AnthropicMessage[] = [
        ...conversationHistory,
        {
          role: 'user',
          content: toolResults.map(result => ({
            type: 'tool_result' as const,
            tool_use_id: result.tool_use_id,
            content: result.content,
            is_error: result.is_error || false
          }))
        }
      ];

      const response = await this.callAnthropicAPI(messages, this.availableTools);
      const latency = Date.now() - startTime;

      return {
        content: this.extractTextContent(response),
        tokenUsage: {
          input: response.usage.input_tokens,
          output: response.usage.output_tokens,
          total: response.usage.input_tokens + response.usage.output_tokens
        },
        latency,
        model: response.model,
        finishReason: response.stop_reason,
        metadata: {
          id: response.id,
          toolCalls: this.extractToolCalls(response)
        }
      };
    } catch (error) {
      const latency = Date.now() - startTime;
      throw new LLMProviderError(
        `Claude tool result continuation failed: ${error instanceof Error ? error.message : String(error)}`,
        { latency, originalError: error }
      );
    }
  }

  /**
   * Set available tools for this provider instance
   */
  setAvailableTools(tools: AnthropicTool[]): void {
    this.availableTools = tools;
  }

  /**
   * Get currently available tools
   */
  getAvailableTools(): AnthropicTool[] {
    return [...this.availableTools];
  }

  getProviderInfo(): ProviderInfo {
    return {
      name: 'Claude',
      version: '3.0.0',
      supportedModels: [
        'claude-3-5-sonnet-20241022',
        'claude-3-5-haiku-20241022',
        'claude-3-opus-20240229',
        'claude-3-sonnet-20240229',
        'claude-3-haiku-20240307'
      ],
      maxTokens: 200000,
      supportsStreaming: false, // Not implemented in this phase
      supportsTools: true
    };
  }

  isConfigured(): boolean {
    return !!(this.config && this.apiKey);
  }

  /**
   * Test API connection
   */
  private async testConnection(): Promise<void> {
    const testMessages: AnthropicMessage[] = [{
      role: 'user',
      content: 'Hello'
    }];

    await this.callAnthropicAPI(testMessages);
  }

  /**
   * Make API call to Anthropic
   */
  private async callAnthropicAPI(
    messages: AnthropicMessage[], 
    tools?: AnthropicTool[]
  ): Promise<AnthropicResponse> {
    if (!this.apiKey) {
      throw new LLMProviderError('API key not configured');
    }

    const requestBody: any = {
      model: this.claudeConfig.model,
      max_tokens: this.claudeConfig.maxTokens,
      temperature: this.claudeConfig.temperature,
      messages
    };

    // Add system prompt if configured
    if (this.claudeConfig.systemPrompt) {
      requestBody.system = this.claudeConfig.systemPrompt;
    }

    // Add tools if provided
    if (tools && tools.length > 0) {
      requestBody.tools = tools;
    }

    const response = await fetch(`${this.baseUrl}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new LLMProviderError(
        `Anthropic API error: ${response.status} ${response.statusText}`,
        { status: response.status, errorData }
      );
    }

    return await response.json();
  }

  /**
   * Extract text content from response
   */
  private extractTextContent(response: AnthropicResponse): string {
    const textBlocks = response.content.filter(block => block.type === 'text');
    return textBlocks.map(block => block.text).join('\n').trim();
  }

  /**
   * Extract tool calls from response
   */
  private extractToolCalls(response: AnthropicResponse): ClaudeToolCall[] {
    const toolBlocks = response.content.filter(block => block.type === 'tool_use');
    return toolBlocks.map(block => ({
      id: block.id!,
      name: block.name!,
      input: block.input
    }));
  }

  /**
   * Update configuration
   */
  updateConfig(updates: Partial<ClaudeConfig>): void {
    this.claudeConfig = { ...this.claudeConfig, ...updates };
  }

  /**
   * Get current configuration
   */
  getConfig(): ClaudeConfig {
    return { ...this.claudeConfig };
  }
}
