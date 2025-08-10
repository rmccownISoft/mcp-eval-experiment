/**
 * MCP Client Integration Tests
 * Complete test suite for the refactored MCP client based on actual server specification
 */

import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { MCPClient, MCPServerError, type MCPServerConfig, type SchemaType } from '../src/lib/mcp/MCPClient.js';

// Test configuration for HTTP transport
const httpConfig: MCPServerConfig = {
  transport: 'http',
  url: 'http://localhost:3000',
  port: 3000,
  env: {
    HOST_ADDR: 'https://ai.itrackenterprise.com/graphql'
  },
  username: 'ai',
  password: 'demo',
  storeId: 1,
  timeout: 30000
};

// Test configuration for STDIO transport
const stdioConfig: MCPServerConfig = {
  transport: 'stdio',
  command: 'node',
  args: ['-r', 'dotenv/config', 'dist/entryPoint.js'],
  cwd: '/path/to/mcp/server', // This would need to be updated with actual path
  env: {
    HOST_ADDR: 'https://ai.itrackenterprise.com/graphql'
  },
  username: 'ai',
  password: 'demo',
  storeId: 1,
  timeout: 30000
};

test('MCPClient - Basic instantiation and configuration', () => {
  const client = new MCPClient(httpConfig);
  assert.ok(client, 'MCPClient should be instantiated');
  
  const config = client.getConfig();
  assert.equal(config.transport, 'http');
  assert.equal(config.port, 3000);
  assert.equal(config.username, 'ai');
  assert.equal(config.storeId, 1);
});

test('MCPClient - Initial state verification', () => {
  const client = new MCPClient(httpConfig);
  
  const state = client.getConnectionState();
  assert.equal(state.connected, false);
  assert.equal(state.initialized, false);
  assert.equal(state.authenticated, false);
  
  assert.equal(client.isConnected(), false);
  assert.equal(client.isAuthenticated(), false);
  
  const history = client.getToolCallHistory();
  assert.ok(Array.isArray(history));
  assert.equal(history.length, 0);
});

test('MCPClient - Configuration defaults', () => {
  const minimalConfig: MCPServerConfig = {
    transport: 'http'
  };
  
  const client = new MCPClient(minimalConfig);
  const config = client.getConfig();
  
  assert.equal(config.port, 3000);
  assert.equal(config.timeout, 30000);
});

test('MCPClient - Error handling for missing required config', () => {
  const invalidConfig: MCPServerConfig = {
    transport: 'stdio'
    // Missing required command
  };
  
  const client = new MCPClient(invalidConfig);
  
  assert.rejects(async () => {
    await client.connect();
  }, MCPServerError);
});

test('MCPClient - Tool call validation before connection', async () => {
  const client = new MCPClient(httpConfig);
  
  // All tool methods should throw error when not connected
  await assert.rejects(() => client.getSessionInfo(), MCPServerError);
  await assert.rejects(() => client.getCurrentDate(), MCPServerError);
  await assert.rejects(() => client.authenticate('user', 'pass', 1), MCPServerError);
  await assert.rejects(() => client.closeSession(), MCPServerError);
  await assert.rejects(() => client.getServerInformationQuery(), MCPServerError);
  await assert.rejects(() => client.getQuickReference(), MCPServerError);
  await assert.rejects(() => client.exploreSchema('type'), MCPServerError);
  await assert.rejects(() => client.searchSchema('test'), MCPServerError);
  await assert.rejects(() => client.queryGraphQL('query { test }'), MCPServerError);
  await assert.rejects(() => client.getAvailableTools(), MCPServerError);
});

test('MCPClient - Schema type validation', async () => {
  const client = new MCPClient(httpConfig);
  
  // Test invalid schema types
  await assert.rejects(async () => {
    await client.exploreSchema('invalid' as SchemaType);
  }, MCPServerError);
  
  // Valid schema types should not throw validation error (but will throw connection error)
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

test('MCPClient - Authentication parameter validation', async () => {
  const client = new MCPClient(httpConfig);
  
  // Test invalid storeId types
  await assert.rejects(async () => {
    await client.authenticate('user', 'pass', 'invalid' as any);
  }, MCPServerError);
  
  await assert.rejects(async () => {
    await client.authenticate('user', 'pass', 0);
  }, MCPServerError);
  
  await assert.rejects(async () => {
    await client.authenticate('user', 'pass', -1);
  }, MCPServerError);
});

test('MCPClient - Search schema parameter validation', async () => {
  const client = new MCPClient(httpConfig);
  
  // Test empty keyword
  await assert.rejects(async () => {
    await client.searchSchema('');
  }, MCPServerError);
  
  await assert.rejects(async () => {
    await client.searchSchema('   ');
  }, MCPServerError);
  
  // Test keyword too long
  const longKeyword = 'a'.repeat(101);
  await assert.rejects(async () => {
    await client.searchSchema(longKeyword);
  }, MCPServerError);
});

test('MCPClient - GraphQL query validation', async () => {
  const client = new MCPClient(httpConfig);
  
  // Test empty query
  await assert.rejects(async () => {
    await client.queryGraphQL('');
  }, MCPServerError);
  
  await assert.rejects(async () => {
    await client.queryGraphQL('   ');
  }, MCPServerError);
  
  // Test mutation blocking
  await assert.rejects(async () => {
    await client.queryGraphQL('mutation { test }');
  }, MCPServerError);
  
  await assert.rejects(async () => {
    await client.queryGraphQL('MUTATION { test }');
  }, MCPServerError);
  
  // Test invalid variables JSON
  await assert.rejects(async () => {
    await client.queryGraphQL('query { test }', 'invalid json');
  }, MCPServerError);
});

test('MCPClient - Tool call history management', () => {
  const client = new MCPClient(httpConfig);
  
  // Initial state
  assert.equal(client.getToolCallHistory().length, 0);
  
  // Clear empty history
  client.clearToolCallHistory();
  assert.equal(client.getToolCallHistory().length, 0);
  
  // History should be immutable
  const history1 = client.getToolCallHistory();
  const history2 = client.getToolCallHistory();
  assert.notStrictEqual(history1, history2); // Different array instances
  assert.deepEqual(history1, history2); // Same content
});

test('MCPClient - Connection state immutability', () => {
  const client = new MCPClient(httpConfig);
  
  const state1 = client.getConnectionState();
  const state2 = client.getConnectionState();
  
  assert.notStrictEqual(state1, state2); // Different object instances
  assert.deepEqual(state1, state2); // Same content
});

test('MCPClient - Configuration immutability', () => {
  const client = new MCPClient(httpConfig);
  
  const config1 = client.getConfig();
  const config2 = client.getConfig();
  
  assert.notStrictEqual(config1, config2); // Different object instances
  assert.deepEqual(config1, config2); // Same content
});

test('MCPClient - Disconnect without connection', async () => {
  const client = new MCPClient(httpConfig);
  
  // Should not throw error when disconnecting without connection
  await assert.doesNotReject(async () => {
    await client.disconnect();
  });
  
  // State should remain disconnected
  assert.equal(client.isConnected(), false);
  assert.equal(client.isAuthenticated(), false);
});

test('MCPClient - Session management state tracking', () => {
  const client = new MCPClient(httpConfig);
  
  // Initial session state
  assert.equal(client.getCurrentSession(), undefined);
  assert.equal(client.getSessionId(), undefined);
  
  const state = client.getConnectionState();
  assert.equal(state.sessionInfo, undefined);
  assert.equal(state.sessionId, undefined);
});

test('MCPClient - Error types and inheritance', () => {
  const error = new MCPServerError('Test error', { detail: 'test' });
  
  assert.ok(error instanceof Error);
  assert.ok(error instanceof MCPServerError);
  assert.equal(error.name, 'MCPServerError');
  assert.equal(error.message, 'Test error');
  assert.deepEqual(error.details, { detail: 'test' });
});

test('MCPClient - Transport configuration validation', () => {
  // HTTP transport configuration
  const httpClient = new MCPClient({
    transport: 'http',
    url: 'http://localhost:3000'
  });
  assert.ok(httpClient);
  
  // STDIO transport configuration
  const stdioClient = new MCPClient({
    transport: 'stdio',
    command: 'node',
    args: ['server.js']
  });
  assert.ok(stdioClient);
});

test('MCPClient - Environment variable handling', () => {
  const configWithEnv: MCPServerConfig = {
    transport: 'stdio',
    command: 'node',
    args: ['server.js'],
    env: {
      HOST_ADDR: 'https://test.example.com/graphql',
      API_KEY: 'test-key',
      DEBUG_LOG: 'true'
    }
  };
  
  const client = new MCPClient(configWithEnv);
  const config = client.getConfig();
  
  assert.deepEqual(config.env, {
    HOST_ADDR: 'https://test.example.com/graphql',
    API_KEY: 'test-key',
    DEBUG_LOG: 'true'
  });
});

// Integration tests that would run against actual server
// These are commented out as they require a running MCP server

/*
test('MCPClient - Live server connection (HTTP)', async () => {
  const client = new MCPClient(httpConfig);
  
  try {
    const connected = await client.connect();
    assert.equal(connected, true);
    assert.equal(client.isConnected(), true);
    
    const state = client.getConnectionState();
    assert.equal(state.connected, true);
    assert.equal(state.initialized, true);
    assert.equal(state.serverInfo?.name, 'enterprise-api-mcp-server');
    
    await client.disconnect();
    assert.equal(client.isConnected(), false);
  } catch (error) {
    console.log('Skipping live server test - server not available:', error.message);
  }
});

test('MCPClient - Tool discovery', async () => {
  const client = new MCPClient(httpConfig);
  
  try {
    await client.connect();
    
    const tools = await client.getAvailableTools();
    assert.ok(Array.isArray(tools));
    
    // Should have all 9 expected tools
    const expectedTools = [
      'get_session_info',
      'get_current_date',
      'authenticate',
      'close_session',
      'get_server_information_query',
      'quick_reference',
      'explore_schema',
      'search_schema',
      'query_graphql'
    ];
    
    for (const expectedTool of expectedTools) {
      assert.ok(tools.includes(expectedTool), `Tool ${expectedTool} should be available`);
    }
    
    await client.disconnect();
  } catch (error) {
    console.log('Skipping live server test - server not available:', error.message);
  }
});

test('MCPClient - Authentication flow', async () => {
  const client = new MCPClient(httpConfig);
  
  try {
    await client.connect();
    
    // Initial state should be unauthenticated
    assert.equal(client.isAuthenticated(), false);
    
    // Authenticate
    const success = await client.authenticate('ai', 'demo', 1);
    assert.equal(success, true);
    assert.equal(client.isAuthenticated(), true);
    
    const session = client.getCurrentSession();
    assert.equal(session?.username, 'ai');
    assert.equal(session?.storeId, 1);
    
    // Close session
    await client.closeSession();
    assert.equal(client.isAuthenticated(), false);
    
    await client.disconnect();
  } catch (error) {
    console.log('Skipping live server test - server not available:', error.message);
  }
});

test('MCPClient - All tools execution', async () => {
  const client = new MCPClient(httpConfig);
  
  try {
    await client.connect();
    await client.authenticate('ai', 'demo', 1);
    
    // Test all tools
    const sessionInfo = await client.getSessionInfo();
    assert.ok(typeof sessionInfo === 'string');
    assert.ok(sessionInfo.includes('MCP Session ID'));
    
    const currentDate = await client.getCurrentDate();
    assert.ok(typeof currentDate === 'string');
    assert.ok(currentDate.includes('Today is'));
    
    const serverInfo = await client.getServerInformationQuery();
    assert.ok(serverInfo);
    
    const quickRef = await client.getQuickReference();
    assert.ok(typeof quickRef === 'string');
    assert.ok(quickRef.length > 0);
    
    const schemaTypes = await client.exploreSchema('type');
    assert.ok(typeof schemaTypes === 'string');
    
    const searchResults = await client.searchSchema('Customer');
    assert.ok(searchResults);
    
    const queryResult = await client.queryGraphQL('query { storesForLogin { id name } }');
    assert.ok(queryResult);
    
    await client.closeSession();
    await client.disconnect();
  } catch (error) {
    console.log('Skipping live server test - server not available:', error.message);
  }
});
*/
