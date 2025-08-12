/**
 * Phase 3 Demo - Claude Integration with MCP Server
 * Demonstrates how to use the MCP Test Suite with Claude for automated testing
 */

import {
  MCPTestSuite,
  LLMProvider,
  TestConfig,
  createTestSuite,
  getTestCasesByCategory,
  basicToolTests
} from '../src/index.js';

async function runPhase3Demo() {
  console.log('🚀 MCP Test Suite - Phase 3 Demo');
  console.log('📋 Testing Claude integration with MCP server tools\n');

  // Configuration for the test suite
  const config: TestConfig = {
    llmProvider: LLMProvider.CLAUDE,
    mcpServer: {
      transport: 'http',
      url: 'http://localhost',
      port: 3000,
      timeout: 30000,
      // Test credentials for the enterprise API
      username: 'ai',
      password: 'demo',
      storeId: 1
    },
    apiKeys: {
      claude: process.env.ANTHROPIC_API_KEY || 'your-claude-api-key-here'
    },
    llmConfig: {
      provider: LLMProvider.CLAUDE,
      model: 'claude-3-5-sonnet-20241022',
      temperature: 0.1,
      maxTokens: 4096,
      timeout: 30000
    },
    outputDir: './test-results',
    verbose: true
  };

  try {
    // Create test suite instance
    const testSuite = createTestSuite(config);

    console.log('🔍 Validating test environment...');
    const validation = await testSuite.validateEnvironment();
    
    if (!validation.valid) {
      console.error('❌ Environment validation failed:');
      validation.issues.forEach(issue => console.error(`   - ${issue}`));
      return;
    }
    console.log('✅ Environment validation passed\n');

    // Example 1: Run basic tool tests
    console.log('📊 Example 1: Running basic tool tests');
    const basicTestIds = basicToolTests.map(test => test.id);
    const basicResults = await testSuite.runTests(basicTestIds);
    
    console.log(`\n📈 Basic Tests Results:`);
    console.log(`   Success Rate: ${((basicResults.successfulTests / basicResults.totalTests) * 100).toFixed(1)}%`);
    console.log(`   Average Tool Calls: ${basicResults.aggregateMetrics.averageToolCalls.toFixed(1)}`);
    console.log(`   Average Latency: ${basicResults.aggregateMetrics.averageLatency.toFixed(0)}ms\n`);

    // Example 2: Run authentication tests
    console.log('🔐 Example 2: Running authentication workflow tests');
    const authResults = await testSuite.runTestsByCategory('authentication');
    
    console.log(`\n🔑 Authentication Tests Results:`);
    console.log(`   Success Rate: ${((authResults.successfulTests / authResults.totalTests) * 100).toFixed(1)}%`);
    console.log(`   Tests Passed: ${authResults.successfulTests}/${authResults.totalTests}\n`);

    // Example 3: Run a single specific test
    console.log('🧪 Example 3: Running single test - Get Current Date');
    const singleResult = await testSuite.runSingleTest('basic-get-date');
    
    console.log(`\n📅 Single Test Result:`);
    console.log(`   Test: ${singleResult.testName}`);
    console.log(`   Success: ${singleResult.success ? '✅' : '❌'}`);
    console.log(`   Tool Calls: ${singleResult.metrics.toolCallCount}`);
    console.log(`   Response: ${singleResult.finalResponse.substring(0, 100)}...`);

    // Example 4: Show available test cases
    console.log('\n📋 Available Test Categories:');
    const availableTests = testSuite.getAvailableTestCases();
    const categories = [...new Set(availableTests.map(test => test.category))];
    
    categories.forEach(category => {
      const categoryTests = getTestCasesByCategory(category);
      console.log(`   ${category}: ${categoryTests.length} tests`);
    });

    console.log('\n🎉 Phase 3 Demo completed successfully!');
    console.log('\n💡 Next Steps:');
    console.log('   - Configure your Claude API key in environment variables');
    console.log('   - Ensure the MCP server is running on localhost:3000');
    console.log('   - Run more comprehensive test suites');
    console.log('   - Explore complex workflow tests');

  } catch (error) {
    console.error('💥 Demo failed:', error);
    
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      
      // Provide helpful troubleshooting tips
      if (error.message.includes('API key')) {
        console.log('\n💡 Tip: Set your Claude API key:');
        console.log('   export ANTHROPIC_API_KEY=your-api-key-here');
      }
      
      if (error.message.includes('connection')) {
        console.log('\n💡 Tip: Ensure MCP server is running:');
        console.log('   Check that the enterprise-api-mcp-server is running on port 3000');
      }
    }
  }
}

// Run the demo if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runPhase3Demo().catch(console.error);
}

export { runPhase3Demo };
