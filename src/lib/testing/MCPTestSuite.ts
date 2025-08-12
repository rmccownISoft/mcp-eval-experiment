/**
 * MCP Test Suite - Core Test Execution Engine
 * Phase 3: Full implementation with Claude integration
 */

import { TestConfig, TestResult, TestSuiteResult, LLMProvider, LLMProviderError } from '../types.js';
import { ConfigManager } from '../config/ConfigManager.js';
import { MCPClient } from '../mcp/MCPClient.js';
import { ClaudeProvider } from '../clients/providers/ClaudeProvider.js';
import { TestOrchestrator, TestCase } from '../orchestrator/TestOrchestrator.js';
import { allPhase3TestCases, getTestCaseById, getTestCasesByCategory } from '../test-cases/phase3-test-cases.js';

export class MCPTestSuite {
  private config: TestConfig;
  private configManager: ConfigManager;
  private mcpClient?: MCPClient;
  private claudeProvider?: ClaudeProvider;
  private orchestrator?: TestOrchestrator;

  constructor(config: TestConfig | ConfigManager) {
    if (config instanceof ConfigManager) {
      this.configManager = config;
      this.config = config.getConfig();
    } else {
      this.configManager = new ConfigManager(config);
      this.config = this.configManager.getConfig();
    }
  }

  /**
   * Initialize the test suite components
   */
  private async initializeComponents(): Promise<void> {
    // Initialize MCP client
    this.mcpClient = new MCPClient(this.config.mcpServer);
    await this.mcpClient.connect();

    // Initialize Claude provider
    if (this.config.llmProvider === LLMProvider.CLAUDE) {
      if (!this.config.apiKeys.claude) {
        throw new LLMProviderError('Claude API key not configured');
      }

      this.claudeProvider = new ClaudeProvider({
        model: this.config.llmConfig?.model || 'claude-3-5-sonnet-20241022',
        temperature: this.config.llmConfig?.temperature || 0.1,
        maxTokens: this.config.llmConfig?.maxTokens || 4096,
        timeout: this.config.llmConfig?.timeout || 30000
      });

      await this.claudeProvider.initialize(
        this.config.llmConfig || { provider: LLMProvider.CLAUDE },
        this.config.apiKeys.claude
      );

      // Initialize orchestrator
      this.orchestrator = new TestOrchestrator(this.mcpClient, this.claudeProvider);
      await this.orchestrator.initialize();
    } else {
      throw new LLMProviderError(`LLM provider ${this.config.llmProvider} not yet implemented in Phase 3`);
    }
  }

  /**
   * Run all tests in the test suite
   */
  public async runTests(testIds?: string[]): Promise<TestSuiteResult> {
    const suiteId = `suite-${Date.now()}`;
    const startTime = new Date();

    console.log(`🚀 Starting MCP Test Suite: ${suiteId}`);
    console.log(`📊 LLM Provider: ${this.config.llmProvider}`);
    console.log(`🔗 MCP Server: ${this.config.mcpServer.transport}://${this.config.mcpServer.url || 'localhost'}:${this.config.mcpServer.port || 3000}`);

    try {
      // Initialize components
      await this.initializeComponents();

      // Determine which tests to run
      let testCases: TestCase[];
      if (testIds && testIds.length > 0) {
        testCases = testIds.map(id => getTestCaseById(id)).filter(Boolean) as TestCase[];
        if (testCases.length !== testIds.length) {
          const missing = testIds.filter(id => !getTestCaseById(id));
          console.warn(`⚠️  Warning: Test cases not found: ${missing.join(', ')}`);
        }
      } else {
        testCases = allPhase3TestCases;
      }

      console.log(`📋 Running ${testCases.length} test cases`);

      // Execute tests
      const results: TestResult[] = [];
      let successfulTests = 0;
      let failedTests = 0;

      for (const testCase of testCases) {
        console.log(`\n🧪 Running test: ${testCase.name} (${testCase.id})`);
        
        try {
          const result = await this.orchestrator!.executeTest(testCase);
          results.push(result);
          
          if (result.success) {
            successfulTests++;
            console.log(`✅ Test passed: ${testCase.name}`);
          } else {
            failedTests++;
            console.log(`❌ Test failed: ${testCase.name} - ${result.error || 'Unknown error'}`);
          }
        } catch (error) {
          failedTests++;
          const errorMessage = error instanceof Error ? error.message : String(error);
          console.log(`💥 Test crashed: ${testCase.name} - ${errorMessage}`);
          
          // Create error result
          results.push({
            testId: testCase.id,
            testName: testCase.name,
            llmProvider: this.config.llmProvider,
            startTime: new Date(),
            endTime: new Date(),
            success: false,
            conversation: {
              messages: [],
              sessionId: `error-${Date.now()}`,
              startTime: new Date(),
              lastActivity: new Date()
            },
            toolCalls: [],
            metrics: {
              toolCallCount: 0,
              totalLatency: 0,
              tokenUsage: { input: 0, output: 0, total: 0 },
              errorCount: 1,
              hallucinationDetected: false
            },
            finalResponse: '',
            error: errorMessage
          });
        }
      }

      const endTime = new Date();

      // Calculate aggregate metrics
      const aggregateMetrics = this.calculateAggregateMetrics(results);

      const suiteResult: TestSuiteResult = {
        suiteId,
        llmProvider: this.config.llmProvider,
        startTime,
        endTime,
        totalTests: testCases.length,
        successfulTests,
        failedTests,
        results,
        aggregateMetrics
      };

      console.log(`\n📊 Test Suite Complete:`);
      console.log(`   Total Tests: ${suiteResult.totalTests}`);
      console.log(`   Successful: ${suiteResult.successfulTests}`);
      console.log(`   Failed: ${suiteResult.failedTests}`);
      console.log(`   Success Rate: ${((successfulTests / testCases.length) * 100).toFixed(1)}%`);
      console.log(`   Average Tool Calls: ${aggregateMetrics.averageToolCalls.toFixed(1)}`);
      console.log(`   Average Latency: ${aggregateMetrics.averageLatency.toFixed(0)}ms`);

      return suiteResult;

    } catch (error) {
      const endTime = new Date();
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      console.error(`💥 Test suite initialization failed: ${errorMessage}`);

      return {
        suiteId,
        llmProvider: this.config.llmProvider,
        startTime,
        endTime,
        totalTests: 0,
        successfulTests: 0,
        failedTests: 0,
        results: [],
        aggregateMetrics: {
          averageToolCalls: 0,
          averageLatency: 0,
          totalTokenUsage: { input: 0, output: 0, total: 0 },
          averageAccuracy: 0,
          hallucinationRate: 0
        }
      };
    } finally {
      // Cleanup
      await this.cleanup();
    }
  }

  /**
   * Run a single test
   */
  public async runSingleTest(testId: string): Promise<TestResult> {
    console.log(`🧪 Running single test: ${testId}`);
    
    const testCase = getTestCaseById(testId);
    if (!testCase) {
      throw new Error(`Test case not found: ${testId}`);
    }

    try {
      // Initialize components
      await this.initializeComponents();

      // Execute the test
      const result = await this.orchestrator!.executeTest(testCase);
      
      if (result.success) {
        console.log(`✅ Test passed: ${testCase.name}`);
      } else {
        console.log(`❌ Test failed: ${testCase.name} - ${result.error || 'Unknown error'}`);
      }

      return result;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.log(`💥 Test crashed: ${testCase.name} - ${errorMessage}`);
      
      return {
        testId: testCase.id,
        testName: testCase.name,
        llmProvider: this.config.llmProvider,
        startTime: new Date(),
        endTime: new Date(),
        success: false,
        conversation: {
          messages: [],
          sessionId: `error-${Date.now()}`,
          startTime: new Date(),
          lastActivity: new Date()
        },
        toolCalls: [],
        metrics: {
          toolCallCount: 0,
          totalLatency: 0,
          tokenUsage: { input: 0, output: 0, total: 0 },
          errorCount: 1,
          hallucinationDetected: false
        },
        finalResponse: '',
        error: errorMessage
      };
    } finally {
      // Cleanup
      await this.cleanup();
    }
  }

  /**
   * Run tests by category
   */
  public async runTestsByCategory(category: string): Promise<TestSuiteResult> {
    const testCases = getTestCasesByCategory(category);
    if (testCases.length === 0) {
      throw new Error(`No test cases found for category: ${category}`);
    }

    const testIds = testCases.map(tc => tc.id);
    return this.runTests(testIds);
  }

  /**
   * Get current configuration
   */
  public getConfig(): TestConfig {
    return { ...this.config };
  }

  /**
   * Update configuration
   */
  public updateConfig(updates: Partial<TestConfig>): void {
    this.configManager.updateConfig(updates);
    this.config = this.configManager.getConfig();
  }

  /**
   * Validate test environment
   */
  public async validateEnvironment(): Promise<{ valid: boolean; issues: string[] }> {
    const issues: string[] = [];

    // Check configuration
    try {
      this.configManager.getConfig();
    } catch (error) {
      issues.push(`Configuration invalid: ${error}`);
    }

    // Check API keys
    if (this.config.llmProvider === LLMProvider.CLAUDE && !this.config.apiKeys.claude) {
      issues.push('Claude API key not configured');
    }

    // Test MCP server connectivity
    try {
      const testClient = new MCPClient(this.config.mcpServer);
      await testClient.connect();
      const isConnected = testClient.isConnected();
      await testClient.disconnect();
      
      if (!isConnected) {
        issues.push('MCP server connection failed');
      }
    } catch (error) {
      issues.push(`MCP server connection error: ${error instanceof Error ? error.message : String(error)}`);
    }

    // Test Claude API if configured
    if (this.config.llmProvider === LLMProvider.CLAUDE && this.config.apiKeys.claude) {
      try {
        const testProvider = new ClaudeProvider();
        await testProvider.initialize(
          { provider: LLMProvider.CLAUDE },
          this.config.apiKeys.claude
        );
      } catch (error) {
        issues.push(`Claude API validation failed: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    return {
      valid: issues.length === 0,
      issues
    };
  }

  /**
   * Calculate aggregate metrics from test results
   */
  private calculateAggregateMetrics(results: TestResult[]): TestSuiteResult['aggregateMetrics'] {
    if (results.length === 0) {
      return {
        averageToolCalls: 0,
        averageLatency: 0,
        totalTokenUsage: { input: 0, output: 0, total: 0 },
        averageAccuracy: 0,
        hallucinationRate: 0
      };
    }

    const totalToolCalls = results.reduce((sum, r) => sum + r.metrics.toolCallCount, 0);
    const totalLatency = results.reduce((sum, r) => sum + r.metrics.totalLatency, 0);
    const totalTokenUsage = results.reduce(
      (sum, r) => ({
        input: sum.input + r.metrics.tokenUsage.input,
        output: sum.output + r.metrics.tokenUsage.output,
        total: sum.total + r.metrics.tokenUsage.total
      }),
      { input: 0, output: 0, total: 0 }
    );

    const accuracyScores = results
      .map(r => r.metrics.accuracyScore)
      .filter(score => score !== undefined) as number[];
    const averageAccuracy = accuracyScores.length > 0 
      ? accuracyScores.reduce((sum, score) => sum + score, 0) / accuracyScores.length 
      : 0;

    const hallucinationCount = results.filter(r => r.metrics.hallucinationDetected).length;
    const hallucinationRate = (hallucinationCount / results.length) * 100;

    return {
      averageToolCalls: totalToolCalls / results.length,
      averageLatency: totalLatency / results.length,
      totalTokenUsage,
      averageAccuracy,
      hallucinationRate
    };
  }

  /**
   * Cleanup resources
   */
  private async cleanup(): Promise<void> {
    try {
      if (this.mcpClient) {
        await this.mcpClient.disconnect();
      }
    } catch (error) {
      console.warn('Warning during cleanup:', error);
    }
  }

  /**
   * Get available test cases
   */
  public getAvailableTestCases(): TestCase[] {
    return [...allPhase3TestCases];
  }

  /**
   * Get test case by ID
   */
  public getTestCase(testId: string): TestCase | undefined {
    return getTestCaseById(testId);
  }
}
