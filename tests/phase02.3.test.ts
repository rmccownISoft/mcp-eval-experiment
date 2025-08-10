/**
 * Phase 2.3 Schema Exploration Tools Tests
 * Updated for the refactored MCP client based on actual server specification
 */

import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { MCPClient, MCPServerError, type MCPServerConfig, type SchemaType } from '../src/lib/mcp/MCPClient.js';

test('Phase 2.3: MCPClient schema exploration methods exist and are properly typed', () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Verify method signatures
  assert.equal(typeof client.exploreSchema, 'function');
  assert.equal(typeof client.searchSchema, 'function');
  
  // Test method calls (should fail due to no connection, but validates signatures)
  const explorePromise = client.exploreSchema('type').catch(() => {});
  const searchPromise = client.searchSchema('test').catch(() => {});
  
  assert.ok(explorePromise instanceof Promise);
  assert.ok(searchPromise instanceof Promise);
});

test('Phase 2.3: MCPClient schema methods require connection', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // All schema methods should throw error when not connected
  await assert.rejects(async () => {
    await client.exploreSchema('type');
  }, MCPServerError);
  
  await assert.rejects(async () => {
    await client.searchSchema('test');
  }, MCPServerError);
});

test('Phase 2.3: MCPClient exploreSchema validates schema type parameter', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Test invalid schema types (should fail validation before connection check)
  await assert.rejects(async () => {
    await client.exploreSchema('invalid' as SchemaType);
  }, MCPServerError);
  
  await assert.rejects(async () => {
    await client.exploreSchema('' as SchemaType);
  }, MCPServerError);
  
  await assert.rejects(async () => {
    await client.exploreSchema('   ' as SchemaType);
  }, MCPServerError);
});

test('Phase 2.3: MCPClient exploreSchema accepts valid schema types', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Valid schema types should pass validation (but fail on connection)
  const validTypes: SchemaType[] = ['enum', 'type', 'union', 'input', 'scalar', 'interface'];
  
  for (const type of validTypes) {
    await assert.rejects(async () => {
      await client.exploreSchema(type);
    }, (error: any) => {
      // Should be connection error, not validation error
      return error instanceof MCPServerError && 
             error.message.includes('not initialized');
    });
  }
});

test('Phase 2.3: MCPClient exploreSchema supports items parameter', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Test with single item (should fail on connection, not validation)
  await assert.rejects(async () => {
    await client.exploreSchema('type', 'singleItem');
  }, (error: any) => error instanceof MCPServerError && error.message.includes('not initialized'));
  
  // Test with multiple items (should fail on connection, not validation)
  await assert.rejects(async () => {
    await client.exploreSchema('type', ['item1', 'item2']);
  }, (error: any) => error instanceof MCPServerError && error.message.includes('not initialized'));
  
  // Test without items parameter (should fail on connection, not validation)
  await assert.rejects(async () => {
    await client.exploreSchema('type');
  }, (error: any) => error instanceof MCPServerError && error.message.includes('not initialized'));
});

test('Phase 2.3: MCPClient searchSchema validates keyword parameter', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Test empty keyword (should fail validation before connection check)
  await assert.rejects(async () => {
    await client.searchSchema('');
  }, MCPServerError);
  
  await assert.rejects(async () => {
    await client.searchSchema('   ');
  }, MCPServerError);
  
  // Test keyword too long (should fail validation before connection check)
  const longKeyword = 'a'.repeat(101);
  await assert.rejects(async () => {
    await client.searchSchema(longKeyword);
  }, MCPServerError);
});

test('Phase 2.3: MCPClient searchSchema accepts valid keywords', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Valid keywords should pass validation (but fail on connection)
  await assert.rejects(async () => {
    await client.searchSchema('Customer');
  }, (error: any) => {
    return error instanceof MCPServerError && 
           error.message.includes('not initialized');
  });
  
  // Test keyword at max length
  const maxKeyword = 'a'.repeat(100);
  await assert.rejects(async () => {
    await client.searchSchema(maxKeyword);
  }, (error: any) => {
    return error instanceof MCPServerError && 
           error.message.includes('not initialized');
  });
});

test('Phase 2.3: MCPClient schema methods integrate with tool call tracking', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Clear history
  client.clearToolCallHistory();
  assert.equal(client.getToolCallHistory().length, 0);
  
  // Tool calls that fail due to connection issues (not validation) should be tracked
  // Validation errors are thrown before tool calls are made, so they won't be tracked
  // This is the correct behavior - only actual MCP tool calls should be tracked
  
  // Verify that validation errors don't create tool call entries
  try {
    await client.exploreSchema('invalid' as SchemaType);
  } catch (error) {
    // Expected validation error
  }
  
  try {
    await client.searchSchema('');
  } catch (error) {
    // Expected validation error
  }
  
  // Validation errors should not be tracked as tool calls
  const history = client.getToolCallHistory();
  assert.equal(history.length, 0, 'Validation errors should not create tool call entries');
});

test('Phase 2.3: MCPClient schema methods handle parameter trimming', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Whitespace should be trimmed from search keywords
  await assert.rejects(async () => {
    await client.searchSchema('  Customer  ');
  }, (error: any) => {
    // Should fail on connection, not validation (meaning trimming worked)
    return error instanceof MCPServerError && 
           error.message.includes('not initialized');
  });
});

test('Phase 2.3: MCPClient schema methods integrate with connection state', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Verify initial connection state
  assert.equal(client.isConnected(), false);
  
  // Schema methods should check connection state
  await assert.rejects(async () => {
    await client.exploreSchema('type');
  }, (error: any) => {
    return error instanceof MCPServerError && 
           error.message.includes('not initialized');
  });
  
  // Connection state should remain unchanged
  assert.equal(client.isConnected(), false);
});

test('Phase 2.3: MCPClient schema method return types are properly typed', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Verify return types (TypeScript compilation test)
  const explorePromise1: Promise<string> = client.exploreSchema('type').catch(() => '');
  const explorePromise2: Promise<string> = client.exploreSchema('type', 'singleItem').catch(() => '');
  const explorePromise3: Promise<string> = client.exploreSchema('type', ['item1', 'item2']).catch(() => '');
  const searchPromise: Promise<any> = client.searchSchema('test').catch(() => {});
  
  assert.ok(explorePromise1 instanceof Promise);
  assert.ok(explorePromise2 instanceof Promise);
  assert.ok(explorePromise3 instanceof Promise);
  assert.ok(searchPromise instanceof Promise);
});

test('Phase 2.3: MCPClient schema methods provide descriptive error messages', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Test descriptive error for invalid schema type
  try {
    await client.exploreSchema('invalid' as SchemaType);
    assert.fail('Should have thrown an error');
  } catch (error) {
    assert.ok(error instanceof MCPServerError);
    assert.ok(error.message.includes('Invalid schema type'));
    assert.ok(error.message.includes('enum, type, union, input, scalar, interface'));
  }
  
  // Test descriptive error for empty search keyword
  try {
    await client.searchSchema('');
    assert.fail('Should have thrown an error');
  } catch (error) {
    assert.ok(error instanceof MCPServerError);
    assert.ok(error.message.includes('cannot be empty'));
  }
  
  // Test descriptive error for keyword too long
  try {
    await client.searchSchema('a'.repeat(101));
    assert.fail('Should have thrown an error');
  } catch (error) {
    assert.ok(error instanceof MCPServerError);
    assert.ok(error.message.includes('cannot exceed 100 characters'));
  }
});

test('Phase 2.3: MCPClient schema methods support all required parameter combinations', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // All these should pass validation and fail only on connection
  const testCases = [
    () => client.exploreSchema('type'),
    () => client.exploreSchema('enum', 'SingleItem'),
    () => client.exploreSchema('input', ['item1', 'item2']),
    () => client.searchSchema('Customer'),
    () => client.searchSchema('a'.repeat(100)) // Max length
  ];
  
  for (const testCase of testCases) {
    await assert.rejects(testCase, (error: any) => {
      return error instanceof MCPServerError && 
             error.message.includes('not initialized');
    });
  }
});
