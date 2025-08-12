/**
 * Test Orchestrator - Phase 3 Implementation
 * Coordinates between MCP client and Claude for automated testing
 */

import { MCPClient, MCPToolCall } from '../mcp/MCPClient.js';
import { ClaudeProvider } from '../clients/providers/ClaudeProvider.js';
import { ToolFormatTranslator, ClaudeTool } from '../adapters/tool-format-translator.js';
import { TestResult, TestMetrics, ConversationState, ConversationMessage, LLMProviderError } from '../types.js';

export interface TestCase {
  id: string;
  name: string;
  description: string;
  prompt: string;
  expectedTools?: string[];
  expectedCallCount?: number;
  complexity: 'simple' | 'medium' | 'complex';
  category: string;
  setup?: {
    ensureLoggedIn?: boolean;
    ensureLoggedOut?: boolean;
  };
  expectedParameters?: Record<string, any>;
  timeout?: number;
}

export interface TestExecutionContext {
  testCase: TestCase;
  mcpClient: MCPClient;
  claudeProvider: ClaudeProvider;
  availableTools: ClaudeTool[];
  conversation: ConversationState;
  startTime: Date;
}

export interface ToolExecutionResult {
  toolCall: {
    id: string;
    name: string;
    input: any;
  };
  result: any;
  success: boolean;
  error?: string;
  duration: number;
}

export class TestOrchestrator {
  private mcpClient: MCPClient;
  private claudeProvider: ClaudeProvider;
  private availableTools: ClaudeTool[] = [];
  private systemPrompt: string = '';

  constructor(mcpClient: MCPClient, claudeProvider: ClaudeProvider) {
    this.mcpClient = mcpClient;
    this.claudeProvider = claudeProvider;
  }

  /**
   * Initialize the orchestrator
   */
  async initialize(): Promise<void> {
    // Ensure MCP client is connected
    if (!this.mcpClient.isConnected()) {
      throw new Error('MCP client must be connected before initializing orchestrator');
    }

    // Get available tools and convert to Claude format
    await this.refreshAvailableTools();

    // Set up Claude with tools and system prompt
    this.claudeProvider.setAvailableTools(this.availableTools);
    this.systemPrompt = ToolFormatTranslator.getSystemPromptWithTools(this.availableTools);
    this.claudeProvider.updateConfig({ systemPrompt: this.systemPrompt });
  }

  /**
   * Refresh available tools from MCP server
   */
  async refreshAvailableTools(): Promise<void> {
    try {
      this.availableTools = await ToolFormatTranslator.getMCPToolsAsClaudeFormat(this.mcpClient);
      this.claudeProvider.setAvailableTools(this.availableTools);
    } catch (error) {
      throw new Error(`Failed to refresh available tools: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Execute a single test case
   */
  async executeTest(testCase: TestCase): Promise<TestResult> {
    const startTime = new Date();
    const conversation: ConversationState = {
      messages: [],
      sessionId: `test-${testCase.id}-${Date.now()}`,
      startTime,
      lastActivity: startTime
    };

    const context: TestExecutionContext = {
      testCase,
      mcpClient: this.mcpClient,
      claudeProvider: this.claudeProvider,
      availableTools: this.availableTools,
      conversation,
      startTime
    };

    try {
      // Setup test environment if needed
      await this.setupTestEnvironment(context);

      // Execute the test
      const result = await this.runTestConversation(context);

      // Calculate metrics
      const metrics = this.calculateTestMetrics(context, result.toolExecutions);

      // Create test result
      const testResult: TestResult = {
        testId: testCase.id,
        testName: testCase.name,
        llmProvider: 'claude' as any,
        startTime,
        endTime: new Date(),
        success: result.success,
        conversation: context.conversation,
        toolCalls: this.mcpClient.getToolCallHistory().filter(call => 
          call.timestamp >= startTime
        ),
        metrics,
        finalResponse: result.finalResponse,
        rawGraphQLData: result.rawGraphQLData,
        evaluationScore: this.calculateEvaluationScore(testCase, metrics, result.toolExecutions),
        error: result.error
      };

      return testResult;
    } catch (error) {
      const endTime = new Date();
      const errorMessage = error instanceof Error ? error.message : String(error);

      return {
        testId: testCase.id,
        testName: testCase.name,
        llmProvider: 'claude' as any,
        startTime,
        endTime,
        success: false,
        conversation: context.conversation,
        toolCalls: this.mcpClient.getToolCallHistory().filter(call => 
          call.timestamp >= startTime
        ),
        metrics: {
          toolCallCount: 0,
          totalLatency: endTime.getTime() - startTime.getTime(),
          tokenUsage: { input: 0, output: 0, total: 0 },
          errorCount: 1,
          hallucinationDetected: false
        },
        finalResponse: '',
        error: errorMessage
      };
    }
  }

  /**
   * Setup test environment based on test case requirements
   */
  private async setupTestEnvironment(context: TestExecutionContext): Promise<void> {
    const { testCase, mcpClient } = context;

    if (testCase.setup?.ensureLoggedOut) {
      // Ensure user is logged out
      if (mcpClient.isAuthenticated()) {
        await mcpClient.closeSession();
        await this.refreshAvailableTools();
      }
    }

    if (testCase.setup?.ensureLoggedIn) {
      // Ensure user is logged in with test credentials
      if (!mcpClient.isAuthenticated()) {
        await mcpClient.authenticate('ai', 'demo', 1);
        await this.refreshAvailableTools();
      }
    }
  }

  /**
   * Run the main test conversation
   */
  private async runTestConversation(context: TestExecutionContext): Promise<{
    success: boolean;
    finalResponse: string;
    toolExecutions: ToolExecutionResult[];
    rawGraphQLData?: any;
    error?: string;
  }> {
    const { testCase, claudeProvider, conversation } = context;
    const toolExecutions: ToolExecutionResult[] = [];
    let conversationHistory: any[] = [];
    let finalResponse = '';
    let rawGraphQLData: any = undefined;

    try {
      // Add system message to conversation
      this.addMessageToConversation(conversation, 'system', this.systemPrompt);

      // Send initial prompt to Claude
      const initialResponse = await claudeProvider.sendMessageWithTools(
        testCase.prompt,
        this.availableTools,
        conversationHistory
      );

      // Add user message and Claude's response to conversation
      this.addMessageToConversation(conversation, 'user', testCase.prompt);
      this.addMessageToConversation(conversation, 'assistant', initialResponse.content);

      // Update conversation history for Claude
      conversationHistory.push(
        { role: 'user', content: testCase.prompt },
        { role: 'assistant', content: initialResponse.content }
      );

      finalResponse = initialResponse.content;

      // Handle tool calls if any
      if (initialResponse.toolCalls && initialResponse.toolCalls.length > 0) {
        const toolResults = await this.executeToolCalls(context, initialResponse.toolCalls);
        toolExecutions.push(...toolResults);

        // Continue conversation with tool results
        const toolResultsForClaude = toolResults.map(result => ({
          tool_use_id: result.toolCall.id,
          content: JSON.stringify(result.result),
          is_error: !result.success
        }));

        // Add tool results to conversation history
        conversationHistory.push({
          role: 'user',
          content: toolResultsForClaude
        });

        // Get Claude's final response after tool execution
        const finalClaudeResponse = await claudeProvider.continueWithToolResults(
          conversationHistory,
          toolResultsForClaude
        );

        finalResponse = finalClaudeResponse.content;
        this.addMessageToConversation(conversation, 'assistant', finalResponse);

        // Extract raw GraphQL data if any query_graphql calls were made
        const graphqlExecutions = toolExecutions.filter(exec => exec.toolCall.name === 'query_graphql');
        if (graphqlExecutions.length > 0) {
          rawGraphQLData = graphqlExecutions.map(exec => exec.result);
        }
      }

      // Determine success based on test case expectations
      const success = this.evaluateTestSuccess(testCase, toolExecutions, finalResponse);

      return {
        success,
        finalResponse,
        toolExecutions,
        rawGraphQLData
      };
    } catch (error) {
      return {
        success: false,
        finalResponse: finalResponse || '',
        toolExecutions,
        rawGraphQLData,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  /**
   * Execute tool calls from Claude
   */
  private async executeToolCalls(
    context: TestExecutionContext,
    toolCalls: Array<{ id: string; name: string; input: any }>
  ): Promise<ToolExecutionResult[]> {
    const results: ToolExecutionResult[] = [];

    for (const toolCall of toolCalls) {
      const startTime = Date.now();
      
      try {
        let result: any;
        
        // Execute the appropriate MCP tool
        switch (toolCall.name) {
          case 'get_session_info':
            result = await context.mcpClient.getSessionInfo();
            break;
          case 'get_current_date':
            result = await context.mcpClient.getCurrentDate();
            break;
          case 'authenticate':
            result = await context.mcpClient.authenticate(
              toolCall.input.username,
              toolCall.input.password,
              toolCall.input.selectedStoreId
            );
            // Refresh tools after authentication state change
            await this.refreshAvailableTools();
            break;
          case 'close_session':
            result = await context.mcpClient.closeSession();
            // Refresh tools after session closure
            await this.refreshAvailableTools();
            break;
          case 'get_server_information_query':
            result = await context.mcpClient.getServerInformationQuery();
            break;
          case 'quick_reference':
            result = await context.mcpClient.getQuickReference();
            break;
          case 'explore_schema':
            result = await context.mcpClient.exploreSchema(
              toolCall.input.type,
              toolCall.input.items
            );
            break;
          case 'search_schema':
            result = await context.mcpClient.searchSchema(toolCall.input.keyword);
            break;
          case 'query_graphql':
            result = await context.mcpClient.queryGraphQL(
              toolCall.input.query,
              toolCall.input.variables
            );
            break;
          default:
            throw new Error(`Unknown tool: ${toolCall.name}`);
        }

        const duration = Date.now() - startTime;
        
        results.push({
          toolCall,
          result,
          success: true,
          duration
        });

        // Add tool execution to conversation
        this.addMessageToConversation(
          context.conversation,
          'assistant',
          `Tool executed: ${toolCall.name} with parameters: ${JSON.stringify(toolCall.input)}`
        );

      } catch (error) {
        const duration = Date.now() - startTime;
        const errorMessage = error instanceof Error ? error.message : String(error);
        
        results.push({
          toolCall,
          result: null,
          success: false,
          error: errorMessage,
          duration
        });

        // Add error to conversation
        this.addMessageToConversation(
          context.conversation,
          'assistant',
          `Tool execution failed: ${toolCall.name} - ${errorMessage}`
        );
      }
    }

    return results;
  }

  /**
   * Add message to conversation state
   */
  private addMessageToConversation(
    conversation: ConversationState,
    role: 'user' | 'assistant' | 'system',
    content: string
  ): void {
    const message: ConversationMessage = {
      role,
      content,
      timestamp: new Date()
    };

    conversation.messages.push(message);
    conversation.lastActivity = new Date();
  }

  /**
   * Calculate test metrics
   */
  private calculateTestMetrics(
    context: TestExecutionContext,
    toolExecutions: ToolExecutionResult[]
  ): TestMetrics {
    const { conversation } = context;
    
    const toolCallCount = toolExecutions.length;
    const successfulCalls = toolExecutions.filter(exec => exec.success).length;
    const failedCalls = toolExecutions.filter(exec => !exec.success).length;
    const totalLatency = toolExecutions.reduce((sum, exec) => sum + exec.duration, 0);

    // Calculate token usage from conversation
    const tokenUsage = {
      input: 0, // Would need to implement token counting
      output: 0,
      total: 0
    };

    return {
      toolCallCount,
      totalLatency,
      tokenUsage,
      errorCount: failedCalls,
      reasoningScore: this.calculateReasoningScore(context, toolExecutions),
      accuracyScore: this.calculateAccuracyScore(context, toolExecutions),
      hallucinationDetected: false // Would need to implement hallucination detection
    };
  }

  /**
   * Calculate reasoning score based on tool selection and sequencing
   */
  private calculateReasoningScore(
    context: TestExecutionContext,
    toolExecutions: ToolExecutionResult[]
  ): number {
    const { testCase } = context;
    let score = 100;

    // Check if expected tools were called
    if (testCase.expectedTools) {
      const calledTools = toolExecutions.map(exec => exec.toolCall.name);
      const expectedTools = testCase.expectedTools;
      
      const missingTools = expectedTools.filter(tool => !calledTools.includes(tool));
      const extraTools = calledTools.filter(tool => !expectedTools.includes(tool));
      
      // Deduct points for missing or extra tools
      score -= (missingTools.length * 20);
      score -= (extraTools.length * 10);
    }

    // Check tool call count efficiency
    if (testCase.expectedCallCount) {
      const actualCount = toolExecutions.length;
      const expectedCount = testCase.expectedCallCount;
      
      if (actualCount > expectedCount) {
        score -= ((actualCount - expectedCount) * 5);
      }
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Calculate accuracy score based on parameter correctness
   */
  private calculateAccuracyScore(
    context: TestExecutionContext,
    toolExecutions: ToolExecutionResult[]
  ): number {
    const { testCase } = context;
    let score = 100;

    // Check parameter accuracy if expected parameters are defined
    if (testCase.expectedParameters) {
      for (const execution of toolExecutions) {
        const expectedParams = testCase.expectedParameters[execution.toolCall.name];
        if (expectedParams) {
          const actualParams = execution.toolCall.input;
          
          for (const [key, expectedValue] of Object.entries(expectedParams)) {
            if (actualParams[key] !== expectedValue) {
              score -= 10;
            }
          }
        }
      }
    }

    // Deduct points for failed tool executions
    const failedExecutions = toolExecutions.filter(exec => !exec.success);
    score -= (failedExecutions.length * 15);

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Evaluate overall test success
   */
  private evaluateTestSuccess(
    testCase: TestCase,
    toolExecutions: ToolExecutionResult[],
    finalResponse: string
  ): boolean {
    // Basic success criteria
    const hasToolExecutions = toolExecutions.length > 0;
    const allToolsSucceeded = toolExecutions.every(exec => exec.success);
    const hasValidResponse = finalResponse.trim().length > 0;

    // Check expected tools if specified
    let expectedToolsMatched = true;
    if (testCase.expectedTools) {
      const calledTools = toolExecutions.map(exec => exec.toolCall.name);
      expectedToolsMatched = testCase.expectedTools.every(tool => calledTools.includes(tool));
    }

    return hasToolExecutions && allToolsSucceeded && hasValidResponse && expectedToolsMatched;
  }

  /**
   * Calculate overall evaluation score
   */
  private calculateEvaluationScore(
    testCase: TestCase,
    metrics: TestMetrics,
    toolExecutions: ToolExecutionResult[]
  ): number {
    const weights = {
      reasoning: 0.3,
      accuracy: 0.3,
      efficiency: 0.2,
      success: 0.2
    };

    const reasoningScore = metrics.reasoningScore || 0;
    const accuracyScore = metrics.accuracyScore || 0;
    const efficiencyScore = this.calculateEfficiencyScore(testCase, toolExecutions);
    const successScore = toolExecutions.every(exec => exec.success) ? 100 : 0;

    return (
      reasoningScore * weights.reasoning +
      accuracyScore * weights.accuracy +
      efficiencyScore * weights.efficiency +
      successScore * weights.success
    );
  }

  /**
   * Calculate efficiency score based on tool call count and latency
   */
  private calculateEfficiencyScore(
    testCase: TestCase,
    toolExecutions: ToolExecutionResult[]
  ): number {
    let score = 100;

    // Penalize excessive tool calls
    const toolCount = toolExecutions.length;
    if (toolCount > 5) {
      score -= ((toolCount - 5) * 10);
    }

    // Penalize slow execution
    const avgLatency = toolExecutions.reduce((sum, exec) => sum + exec.duration, 0) / toolCount;
    if (avgLatency > 5000) { // 5 seconds
      score -= 20;
    } else if (avgLatency > 2000) { // 2 seconds
      score -= 10;
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Get current available tools
   */
  getAvailableTools(): ClaudeTool[] {
    return [...this.availableTools];
  }

  /**
   * Get system prompt
   */
  getSystemPrompt(): string {
    return this.systemPrompt;
  }
}
