/**
 * Phase 1 Foundation Tests
 * Tests the basic library structure and configuration system
 */

import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { MCPTestSuite, LLMProvider, ConfigManager, loadConfig } from '../src/index.js';

test('Phase 1: Library exports are available', () => {
  assert.ok(MCPTestSuite, 'MCPTestSuite should be exported');
  assert.ok(LLMProvider, 'LLMProvider should be exported');
  assert.ok(ConfigManager, 'ConfigManager should be exported');
  assert.ok(loadConfig, 'loadConfig should be exported');
});

test('Phase 1: LLMProvider enum has correct values', () => {
  assert.equal(LLMProvider.CLAUDE, 'claude');
  assert.equal(LLMProvider.GEMINI, 'gemini');
  assert.equal(LLMProvider.CHATGPT, 'chatgpt');
});

test('Phase 1: ConfigManager can be created with minimal config', () => {
  const config = new ConfigManager({
    llmProvider: LLMProvider.CLAUDE,
    mcpServer: { url: 'http://localhost:3000' },
    apiKeys: { claude: 'test-key' }
  });
  
  const testConfig = config.getConfig();
  assert.equal(testConfig.llmProvider, LLMProvider.CLAUDE);
  assert.equal(testConfig.mcpServer.url, 'http://localhost:3000');
  assert.equal(testConfig.apiKeys.claude, 'test-key');
});

test('Phase 1: ConfigManager validates required fields', () => {
  assert.throws(() => {
    new ConfigManager({
      llmProvider: LLMProvider.CLAUDE,
      mcpServer: { url: 'http://localhost:3000' },
      apiKeys: {} // Missing required API key
    });
  }, /Missing API key for claude/);
});

test('Phase 1: MCPTestSuite can be initialized', () => {
  const testSuite = new MCPTestSuite({
    llmProvider: LLMProvider.CLAUDE,
    mcpServer: { url: 'http://localhost:3000' },
    apiKeys: { claude: 'test-key' }
  });
  
  const config = testSuite.getConfig();
  assert.equal(config.llmProvider, LLMProvider.CLAUDE);
});

test('Phase 1: MCPTestSuite environment validation works', async () => {
  const testSuite = new MCPTestSuite({
    llmProvider: LLMProvider.CLAUDE,
    mcpServer: { url: 'http://localhost:3000' },
    apiKeys: { claude: 'test-key' }
  });
  
  const validation = await testSuite.validateEnvironment();
  assert.equal(typeof validation.valid, 'boolean');
  assert.ok(Array.isArray(validation.issues));
});

test('Phase 1: MCPTestSuite can run tests (stub implementation)', async () => {
  const testSuite = new MCPTestSuite({
    llmProvider: LLMProvider.CLAUDE,
    mcpServer: { url: 'http://localhost:3000' },
    apiKeys: { claude: 'test-key' }
  });
  
  const results = await testSuite.runTests();
  assert.ok(results.suiteId);
  assert.equal(results.llmProvider, LLMProvider.CLAUDE);
  assert.equal(typeof results.totalTests, 'number');
  assert.ok(Array.isArray(results.results));
});

test('Phase 1: loadConfig function works', () => {
  const configManager = loadConfig({
    config: {
      llmProvider: LLMProvider.GEMINI,
      mcpServer: { url: 'http://localhost:3000' },
      apiKeys: { gemini: 'test-key' }
    },
    useEnvironment: false
  });
  
  const config = configManager.getConfig();
  assert.equal(config.llmProvider, LLMProvider.GEMINI);
});
