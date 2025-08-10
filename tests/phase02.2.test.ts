/**
 * Phase 2.2 Authentication & Session Management Tests
 * Updated for the refactored MCP client based on actual server specification
 */

import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { MCPClient, MCPServerError, type MCPServerConfig } from '../src/lib/mcp/MCPClient.js';

test('Phase 2.2: MCPClient initial authentication state is false', () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  assert.equal(client.isAuthenticated(), false);
});

test('Phase 2.2: MCPClient authentication methods require connection', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // All authentication methods should throw error when not connected
  await assert.rejects(async () => {
    await client.authenticate('testuser', 'testpass', 1);
  }, MCPServerError);
});

test('Phase 2.2: MCPClient authentication methods are properly typed', () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Verify method signatures
  assert.equal(typeof client.authenticate, 'function');
  assert.equal(typeof client.getSessionInfo, 'function');
  assert.equal(typeof client.closeSession, 'function');
  assert.equal(typeof client.isAuthenticated, 'function');
  assert.equal(typeof client.getCurrentSession, 'function');
});

test('Phase 2.2: MCPClient authentication state updates on disconnect', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Initial state
  assert.equal(client.isAuthenticated(), false);
  
  // Disconnect should reset authentication state
  await client.disconnect();
  assert.equal(client.isAuthenticated(), false);
});

test('Phase 2.2: MCPClient authentication parameter validation', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Test invalid storeId types (should fail before connection check)
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

test('Phase 2.2: MCPClient session management state tracking', () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Initial session state
  assert.equal(client.getCurrentSession(), undefined);
  assert.equal(client.getSessionId(), undefined);
  
  const state = client.getConnectionState();
  assert.equal(state.sessionInfo, undefined);
  assert.equal(state.sessionId, undefined);
  assert.equal(state.authenticated, false);
});

test('Phase 2.2: MCPClient authentication state consistency', () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Authentication state should be consistent across access methods
  const isAuth1 = client.isAuthenticated();
  const state = client.getConnectionState();
  const isAuth2 = state.authenticated;
  
  assert.equal(isAuth1, isAuth2);
  assert.equal(typeof isAuth1, 'boolean');
});

test('Phase 2.2: MCPClient configuration preserves authentication credentials', () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http',
    username: 'testuser',
    password: 'testpass',
    storeId: 1
  };

  const client = new MCPClient(config);
  const retrievedConfig = client.getConfig();
  
  assert.equal(retrievedConfig.username, 'testuser');
  assert.equal(retrievedConfig.password, 'testpass');
  assert.equal(retrievedConfig.storeId, 1);
});

test('Phase 2.2: MCPClient connection lifecycle manages authentication state', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Initial state
  assert.equal(client.isAuthenticated(), false);
  
  // After disconnect, authentication should be false
  await client.disconnect();
  assert.equal(client.isAuthenticated(), false);
  
  const state = client.getConnectionState();
  assert.equal(state.authenticated, false);
  assert.equal(state.connected, false);
  assert.equal(state.initialized, false);
});

test('Phase 2.2: MCPClient session information handling', () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Session methods should exist and return appropriate types
  const session = client.getCurrentSession();
  const sessionId = client.getSessionId();
  
  assert.equal(session, undefined); // Initially undefined
  assert.equal(sessionId, undefined); // Initially undefined
});

test('Phase 2.2: MCPClient authentication error recovery', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Authentication should fail gracefully when not connected
  try {
    await client.authenticate('user', 'pass', 1);
    assert.fail('Should have thrown an error');
  } catch (error) {
    assert.ok(error instanceof MCPServerError);
    assert.ok(error.message.includes('not initialized'));
  }
  
  // State should remain consistent after error
  assert.equal(client.isAuthenticated(), false);
  const state = client.getConnectionState();
  assert.equal(state.authenticated, false);
});
