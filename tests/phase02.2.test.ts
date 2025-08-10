/**
 * Phase 2.2 Authentication & Session Management Tests
 * Tests the MCP client authentication and session management functionality
 */

import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { MCPClient, MCPConnectionState } from '../src/lib/mcp/MCPClient.js';
import { MCPServerConfig, MCPServerError } from '../src/lib/types.js';

test('Phase 2.2: MCPClient initial authentication state is false', () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  const connectionState = client.getConnectionState();
  
  assert.equal(connectionState.authenticated, false);
  assert.equal(client.isUserAuthenticated(), false);
  assert.equal(connectionState.sessionInfo, undefined);
  assert.equal(connectionState.authenticationError, undefined);
});

test('Phase 2.2: MCPClient authentication methods require connection', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Should throw error when trying to authenticate without connection
  await assert.rejects(async () => {
    await client.authenticateUser('testuser', 'testpass', 'store1');
  }, MCPServerError);
  
  await assert.rejects(async () => {
    await client.getSessionInfo();
  }, MCPServerError);
  
  await assert.rejects(async () => {
    await client.closeSession();
  }, MCPServerError);
});

test('Phase 2.2: MCPClient authentication state is properly typed', () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  const connectionState: MCPConnectionState = client.getConnectionState();
  
  // Verify authentication-related properties exist and are properly typed
  assert.equal(typeof connectionState.authenticated, 'boolean');
  assert.equal(connectionState.sessionInfo, undefined);
  assert.equal(connectionState.authenticationError, undefined);
  
  // Test session info type when undefined
  const sessionInfo = client.getCurrentSession();
  assert.equal(sessionInfo, undefined);
});

test('Phase 2.2: MCPClient authentication state updates on disconnect', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Manually set authentication state to test disconnect behavior
  const connectionState = client.getConnectionState();
  // Note: We can't directly modify the private connectionState, but we can test
  // that disconnect properly resets all state including authentication
  
  await client.disconnect();
  
  const finalState = client.getConnectionState();
  assert.equal(finalState.connected, false);
  assert.equal(finalState.initialized, false);
  assert.equal(finalState.authenticated, false);
  assert.equal(finalState.sessionInfo, undefined);
  assert.equal(finalState.authenticationError, undefined);
});

test('Phase 2.2: MCPClient authentication state resets on connection failure', async () => {
  const config: MCPServerConfig = {
    url: 'http://nonexistent-server:9999',
    transport: 'http',
    timeout: 1000
  };

  const client = new MCPClient(config);
  
  // Should handle connection failures and reset all state including authentication
  await assert.rejects(async () => {
    await client.connect();
  }, MCPServerError);
  
  const connectionState = client.getConnectionState();
  assert.equal(connectionState.connected, false);
  assert.equal(connectionState.initialized, false);
  assert.equal(connectionState.authenticated, false);
  assert.equal(connectionState.sessionInfo, undefined);
});

test('Phase 2.2: MCPClient checkConnection resets authentication state on failure', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Test that checkConnection properly resets authentication state
  const result = await client.checkConnection();
  assert.equal(result, false);
  
  const connectionState = client.getConnectionState();
  assert.equal(connectionState.authenticated, false);
});

test('Phase 2.2: MCPClient authentication methods have proper signatures', () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Verify method signatures exist and are functions
  assert.equal(typeof client.authenticateUser, 'function');
  assert.equal(typeof client.getSessionInfo, 'function');
  assert.equal(typeof client.closeSession, 'function');
  assert.equal(typeof client.isUserAuthenticated, 'function');
  assert.equal(typeof client.getCurrentSession, 'function');
  
  // Test that methods return promises (except state checking methods)
  const authPromise = client.authenticateUser('user', 'pass', 'store').catch(() => {});
  const sessionPromise = client.getSessionInfo().catch(() => {});
  const closePromise = client.closeSession().catch(() => {});
  
  assert.ok(authPromise instanceof Promise);
  assert.ok(sessionPromise instanceof Promise);
  assert.ok(closePromise instanceof Promise);
  
  // Test that state checking methods return synchronously
  assert.equal(typeof client.isUserAuthenticated(), 'boolean');
  assert.equal(client.getCurrentSession(), undefined);
});

test('Phase 2.2: MCPClient authentication tool call tracking', async () => {
  const config: MCPServerConfig = {
    url: 'http://nonexistent-server:9999',
    transport: 'http',
    timeout: 100
  };

  const client = new MCPClient(config);
  
  // Clear any existing history
  client.clearToolCallHistory();
  
  // Try to authenticate (will fail due to no connection)
  try {
    await client.authenticateUser('testuser', 'testpass', 'store1');
  } catch (error) {
    // Expected to fail
  }
  
  // Verify that failed authentication attempts are not tracked in history
  // since the client checks connection first
  const history = client.getToolCallHistory();
  assert.equal(history.length, 0); // No tool calls should be tracked without connection
});

test('Phase 2.2: MCPClient session info type safety', () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Test that getCurrentSession returns the correct type
  const sessionInfo = client.getCurrentSession();
  
  // Should be undefined initially
  assert.equal(sessionInfo, undefined);
  
  // Type should be compatible with the interface
  if (sessionInfo) {
    // These properties should exist if sessionInfo is defined
    assert.equal(typeof sessionInfo.username, 'string');
    assert.equal(typeof sessionInfo.storeId, 'string');
    // sessionId and loginTime are optional
  }
});

test('Phase 2.2: MCPClient authentication error handling', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Test error messages are descriptive
  try {
    await client.authenticateUser('user', 'pass', 'store');
    assert.fail('Should have thrown an error');
  } catch (error) {
    assert.ok(error instanceof MCPServerError);
    assert.ok(error.message.includes('not initialized'));
  }
  
  try {
    await client.getSessionInfo();
    assert.fail('Should have thrown an error');
  } catch (error) {
    assert.ok(error instanceof MCPServerError);
    assert.ok(error.message.includes('not initialized'));
  }
  
  try {
    await client.closeSession();
    assert.fail('Should have thrown an error');
  } catch (error) {
    assert.ok(error instanceof MCPServerError);
    assert.ok(error.message.includes('not initialized'));
  }
});

test('Phase 2.2: MCPClient authentication state consistency', () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Test that authentication state is consistent across different access methods
  const connectionState = client.getConnectionState();
  const isAuthenticated = client.isUserAuthenticated();
  
  assert.equal(connectionState.authenticated, isAuthenticated);
  assert.equal(connectionState.authenticated, false);
  assert.equal(isAuthenticated, false);
});

test('Phase 2.2: MCPClient configuration includes authentication fields', () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http',
    username: 'testuser',
    password: 'testpass',
    storeId: 'store123'
  };

  const client = new MCPClient(config);
  const clientConfig = client.getConfig();
  
  // Verify authentication configuration is preserved
  assert.equal(clientConfig.username, 'testuser');
  assert.equal(clientConfig.password, 'testpass');
  assert.equal(clientConfig.storeId, 'store123');
});

test('Phase 2.2: MCPClient backward compatibility with legacy authenticate method', async () => {
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
    // Test that legacy authenticate method still works but shows deprecation warning
    await assert.rejects(async () => {
      await client.authenticate();
    }, MCPServerError);
    
    // Verify deprecation warning was shown
    assert.ok(warnings.some(w => w.includes('authenticate() is deprecated')));
  } finally {
    console.warn = originalWarn;
  }
});
