/**
 * Basic Usage Example for MCP Test Suite
 * Phase 1: Demonstrates library structure and API
 */

import { MCPTestSuite, LLMProvider, loadConfig } from '../src/index';

async function basicExample() {
  console.log('🚀 MCP Test Suite - Basic Usage Example\n');

  try {
    // Example 1: Using configuration object
    console.log('📋 Example 1: Direct configuration');
    const testSuite1 = new MCPTestSuite({
      llmProvider: LLMProvider.CLAUDE,
      mcpServer: {
        url: 'http://localhost:3000',
        username: 'test_user',
        password: 'test_password',
        storeId: 'store_001'
      },
      apiKeys: {
        claude: 'sk-ant-api03-your-key-here'
      },
      outputDir: './results',
      verbose: true
    });

    console.log('✅ Test suite initialized with direct configuration\n');

    // Example 2: Using configuration file
    console.log('📋 Example 2: Configuration from file');
    const configManager = loadConfig({
      configFile: './config/example.yaml',
      useEnvironment: true
    });

    const testSuite2 = new MCPTestSuite(configManager);
    console.log('✅ Test suite initialized from configuration file\n');

    // Example 3: Environment validation
    console.log('📋 Example 3: Environment validation');
    const validation = await testSuite1.validateEnvironment();
    console.log(`Environment valid: ${validation.valid}`);
    if (validation.issues.length > 0) {
      console.log('Issues found:', validation.issues);
    }
    console.log();

    // Example 4: Running tests (Phase 1 - stub implementation)
    console.log('📋 Example 4: Running test suite');
    const results = await testSuite1.runTests();
    console.log(`Test suite completed: ${results.suiteId}`);
    console.log(`Total tests: ${results.totalTests}`);
    console.log(`Successful: ${results.successfulTests}`);
    console.log(`Failed: ${results.failedTests}`);
    console.log();

    console.log('✅ Basic usage example completed successfully!');

  } catch (error) {
    console.error('❌ Error in basic usage example:');
    console.error(error instanceof Error ? error.message : String(error));
  }
}

// Run the example if this file is executed directly
if (require.main === module) {
  basicExample().catch(console.error);
}

export { basicExample };
