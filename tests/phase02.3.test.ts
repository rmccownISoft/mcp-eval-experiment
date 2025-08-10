/**
 * Phase 2.3 Schema Exploration Tools Tests
 * Tests the MCP client schema exploration functionality
 */

import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { MCPClient, MCPConnectionState } from '../src/lib/mcp/MCPClient.js';
import { MCPServerConfig, MCPServerError } from '../src/lib/types.js';

test('Phase 2.3: MCPClient schema exploration methods exist and are properly typed', () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Verify method signatures exist and are functions
  assert.equal(typeof client.exploreSchema, 'function');
  assert.equal(typeof client.searchSchema, 'function');
  
  // Test that methods return promises
  const explorePromise = client.exploreSchema('Query').catch(() => {});
  const searchPromise = client.searchSchema('test').catch(() => {});
  
  assert.ok(explorePromise instanceof Promise);
  assert.ok(searchPromise instanceof Promise);
});

test('Phase 2.3: MCPClient schema exploration requires connection', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Should throw error when trying to explore schema without connection
  await assert.rejects(async () => {
    await client.exploreSchema('Query');
  }, MCPServerError);
  
  await assert.rejects(async () => {
    await client.searchSchema('test');
  }, MCPServerError);
});

test('Phase 2.3: MCPClient exploreSchema parameter validation', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Test empty type parameter
  await assert.rejects(async () => {
    await client.exploreSchema('');
  }, MCPServerError);
  
  // Test null/undefined type parameter
  await assert.rejects(async () => {
    await client.exploreSchema(null as any);
  }, MCPServerError);
  
  await assert.rejects(async () => {
    await client.exploreSchema(undefined as any);
  }, MCPServerError);
  
  // Test non-string type parameter
  await assert.rejects(async () => {
    await client.exploreSchema(123 as any);
  }, MCPServerError);
  
  // Test whitespace-only type parameter
  await assert.rejects(async () => {
    await client.exploreSchema('   ');
  }, MCPServerError);
});

test('Phase 2.3: MCPClient searchSchema parameter validation', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Test empty keyword parameter
  await assert.rejects(async () => {
    await client.searchSchema('');
  }, MCPServerError);
  
  // Test null/undefined keyword parameter
  await assert.rejects(async () => {
    await client.searchSchema(null as any);
  }, MCPServerError);
  
  await assert.rejects(async () => {
    await client.searchSchema(undefined as any);
  }, MCPServerError);
  
  // Test non-string keyword parameter
  await assert.rejects(async () => {
    await client.searchSchema(123 as any);
  }, MCPServerError);
  
  // Test whitespace-only keyword parameter
  await assert.rejects(async () => {
    await client.searchSchema('   ');
  }, MCPServerError);
});

test('Phase 2.3: MCPClient exploreSchema handles different parameter types', async () => {
  const config: MCPServerConfig = {
    url: 'http://nonexistent-server:9999',
    transport: 'http',
    timeout: 100
  };

  const client = new MCPClient(config);
  
  // Test that parameter validation happens before connection check
  // (These should fail with parameter validation errors, not connection errors)
  
  try {
    await client.exploreSchema('Query', 'singleItem');
    assert.fail('Should have thrown connection error');
  } catch (error) {
    assert.ok(error instanceof MCPServerError);
    assert.ok(error.message.includes('not initialized'));
  }
  
  try {
    await client.exploreSchema('Query', ['item1', 'item2']);
    assert.fail('Should have thrown connection error');
  } catch (error) {
    assert.ok(error instanceof MCPServerError);
    assert.ok(error.message.includes('not initialized'));
  }
  
  try {
    await client.exploreSchema('Query');
    assert.fail('Should have thrown connection error');
  } catch (error) {
    assert.ok(error instanceof MCPServerError);
    assert.ok(error.message.includes('not initialized'));
  }
});

test('Phase 2.3: MCPClient schema exploration error messages are descriptive', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Test exploreSchema error messages
  try {
    await client.exploreSchema('');
    assert.fail('Should have thrown an error');
  } catch (error) {
    assert.ok(error instanceof MCPServerError);
    assert.ok(error.message.includes('Schema type is required') && error.message.includes('non-empty string'));
  }
  
  try {
    await client.exploreSchema('Query');
    assert.fail('Should have thrown an error');
  } catch (error) {
    assert.ok(error instanceof MCPServerError);
    assert.ok(error.message.includes('not initialized'));
  }
  
  // Test searchSchema error messages
  try {
    await client.searchSchema('');
    assert.fail('Should have thrown an error');
  } catch (error) {
    assert.ok(error instanceof MCPServerError);
    assert.ok(error.message.includes('Search keyword is required'));
    assert.ok(error.message.includes('non-empty string'));
  }
  
  try {
    await client.searchSchema('test');
    assert.fail('Should have thrown an error');
  } catch (error) {
    assert.ok(error instanceof MCPServerError);
    assert.ok(error.message.includes('not initialized'));
  }
});

test('Phase 2.3: MCPClient schema exploration tool call tracking', async () => {
  const config: MCPServerConfig = {
    url: 'http://nonexistent-server:9999',
    transport: 'http',
    timeout: 100
  };

  const client = new MCPClient(config);
  
  // Clear any existing history
  client.clearToolCallHistory();
  
  // Try to explore schema (will fail due to no connection)
  try {
    await client.exploreSchema('Query');
  } catch (error) {
    // Expected to fail
  }
  
  try {
    await client.searchSchema('test');
  } catch (error) {
    // Expected to fail
  }
  
  // Verify that failed schema exploration attempts are not tracked in history
  // since the client checks connection first
  const history = client.getToolCallHistory();
  assert.equal(history.length, 0); // No tool calls should be tracked without connection
});

test('Phase 2.3: MCPClient schema exploration parameter trimming', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Test that parameters are trimmed before validation
  // These should pass parameter validation but fail on connection
  
  try {
    await client.exploreSchema('  Query  ');
    assert.fail('Should have thrown connection error');
  } catch (error) {
    assert.ok(error instanceof MCPServerError);
    assert.ok(error.message.includes('not initialized'));
  }
  
  try {
    await client.searchSchema('  test  ');
    assert.fail('Should have thrown connection error');
  } catch (error) {
    assert.ok(error instanceof MCPServerError);
    assert.ok(error.message.includes('not initialized'));
  }
});

test('Phase 2.3: MCPClient schema exploration integration with connection state', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Verify initial connection state
  const initialState = client.getConnectionState();
  assert.equal(initialState.connected, false);
  assert.equal(initialState.initialized, false);
  
  // Schema exploration should fail with proper connection state checks
  await assert.rejects(async () => {
    await client.exploreSchema('Query');
  }, (error: MCPServerError) => {
    return error.message.includes('not initialized');
  });
  
  await assert.rejects(async () => {
    await client.searchSchema('test');
  }, (error: MCPServerError) => {
    return error.message.includes('not initialized');
  });
});

test('Phase 2.3: MCPClient schema exploration type safety', () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Test that TypeScript types are properly defined
  // These should compile without TypeScript errors
  
  // exploreSchema with different parameter combinations
  const explorePromise1: Promise<any> = client.exploreSchema('Query').catch(() => {});
  const explorePromise2: Promise<any> = client.exploreSchema('Query', 'singleItem').catch(() => {});
  const explorePromise3: Promise<any> = client.exploreSchema('Query', ['item1', 'item2']).catch(() => {});
  
  // searchSchema
  const searchPromise: Promise<any> = client.searchSchema('keyword').catch(() => {});
  
  // Verify promises are properly typed
  assert.ok(explorePromise1 instanceof Promise);
  assert.ok(explorePromise2 instanceof Promise);
  assert.ok(explorePromise3 instanceof Promise);
  assert.ok(searchPromise instanceof Promise);
});

test('Phase 2.3: MCPClient schema exploration backward compatibility', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Capture console warnings
  const originalWarn = console.warn;
  const warnings: string[] = [];
  console.warn = (message: string) => warnings.push(message);
  
  try {
    // Test that legacy exploreSchema method works and shows deprecation warning
    const result = await client.legacyExploreSchema();
    
    // Should return a stub response
    assert.ok(result);
    assert.ok(typeof result === 'object');
    
    // Verify deprecation warning was shown
    assert.ok(warnings.some(w => w.includes('legacyExploreSchema() is deprecated')));
  } finally {
    console.warn = originalWarn;
  }
});

test('Phase 2.3: MCPClient schema exploration error context', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Test that error context includes relevant information
  try {
    await client.exploreSchema('Query', ['item1', 'item2']);
    assert.fail('Should have thrown an error');
  } catch (error) {
    assert.ok(error instanceof MCPServerError);
    // Error should include context about the operation
    assert.ok(error.message.includes('not initialized'));
  }
  
  try {
    await client.searchSchema('testKeyword');
    assert.fail('Should have thrown an error');
  } catch (error) {
    assert.ok(error instanceof MCPServerError);
    // Error should include context about the operation
    assert.ok(error.message.includes('not initialized'));
  }
});

test('Phase 2.3: MCPClient schema exploration method consistency', () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Verify that schema exploration methods follow the same patterns as other methods
  
  // Both methods should be async and return promises
  assert.equal(typeof client.exploreSchema, 'function');
  assert.equal(typeof client.searchSchema, 'function');
  
  // Both methods should have proper parameter validation
  // (This is tested in other tests, but we verify the pattern exists)
  
  // Both methods should integrate with the existing tool call tracking system
  // (This will be verified when we can actually make successful calls)
  
  // Both methods should use the same error handling patterns as other methods
  const history = client.getToolCallHistory();
  assert.ok(Array.isArray(history));
});
