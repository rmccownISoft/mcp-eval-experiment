/**
 * Phase 2.1 HTTP Transport & MCP Protocol Foundation Tests
 * Updated for the refactored MCP client based on actual server specification
 */

import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { MCPClient, MCPServerError, type MCPServerConfig } from '../src/lib/mcp/MCPClient.js';

test('Phase 2.1: MCPClient can be instantiated with HTTP transport config', () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http',
    timeout: 30000
  };

  const client = new MCPClient(config);
  assert.ok(client, 'MCPClient should be instantiated');
  
  const clientConfig = client.getConfig();
  assert.equal(clientConfig.url, 'http://localhost:3000');
  assert.equal(clientConfig.transport, 'http');
  assert.equal(clientConfig.timeout, 30000);
});

test('Phase 2.1: MCPClient can be instantiated with stdio transport config', () => {
  const config: MCPServerConfig = {
    transport: 'stdio',
    command: 'node',
    args: ['server.js']
  };

  const client = new MCPClient(config);
  assert.ok(client, 'MCPClient should be instantiated');
  
  const clientConfig = client.getConfig();
  assert.equal(clientConfig.transport, 'stdio');
  assert.equal(clientConfig.command, 'node');
  assert.deepEqual(clientConfig.args, ['server.js']);
});

test('Phase 2.1: MCPClient requires command for stdio transport', () => {
  const config: MCPServerConfig = {
    transport: 'stdio'
    // Missing command
  };

  const client = new MCPClient(config);
  
  // Should throw error when trying to connect without command
  assert.rejects(async () => {
    await client.connect();
  }, MCPServerError);
});

test('Phase 2.1: MCPClient rejects unsupported transport types', () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'sse' as any, // Force unsupported transport
    timeout: 30000
  };

  const client = new MCPClient(config);
  
  // Should throw error when trying to connect with unsupported transport
  assert.rejects(async () => {
    await client.connect();
  }, MCPServerError);
});

test('Phase 2.1: MCPClient initial connection state is disconnected', () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  const connectionState = client.getConnectionState();
  
  assert.equal(connectionState.connected, false);
  assert.equal(connectionState.initialized, false);
  assert.equal(client.isConnected(), false);
});

test('Phase 2.1: MCPClient tool call history starts empty', () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  const history = client.getToolCallHistory();
  
  assert.ok(Array.isArray(history));
  assert.equal(history.length, 0);
});

test('Phase 2.1: MCPClient can clear tool call history', () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // History should start empty
  assert.equal(client.getToolCallHistory().length, 0);
  
  // Clear should work even when empty
  client.clearToolCallHistory();
  assert.equal(client.getToolCallHistory().length, 0);
});

test('Phase 2.1: MCPClient throws error when calling tools before connection', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Should throw error when trying to call tools without connection
  await assert.rejects(async () => {
    await client.getSessionInfo();
  }, MCPServerError);
  
  await assert.rejects(async () => {
    await client.getAvailableTools();
  }, MCPServerError);
});

test('Phase 2.1: MCPClient connection state interface is properly typed', () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  const connectionState = client.getConnectionState();
  
  // Verify all required properties exist
  assert.equal(typeof connectionState.connected, 'boolean');
  assert.equal(typeof connectionState.initialized, 'boolean');
  assert.equal(typeof connectionState.authenticated, 'boolean');
  
  // Optional properties should be undefined initially
  assert.equal(connectionState.serverInfo, undefined);
  assert.equal(connectionState.capabilities, undefined);
  assert.equal(connectionState.availableTools, undefined);
});

test('Phase 2.1: MCPClient handles network timeouts and errors gracefully', async () => {
  const config: MCPServerConfig = {
    url: 'http://nonexistent-server:9999',
    transport: 'http',
    timeout: 1000 // Short timeout for testing
  };

  const client = new MCPClient(config);
  
  // Should handle connection failures gracefully
  await assert.rejects(async () => {
    await client.connect();
  }, MCPServerError);
  
  // Connection state should reflect failure
  const connectionState = client.getConnectionState();
  assert.equal(connectionState.connected, false);
  assert.equal(connectionState.initialized, false);
});

test('Phase 2.1: MCPClient disconnect works even when not connected', async () => {
  const config: MCPServerConfig = {
    url: 'http://localhost:3000',
    transport: 'http'
  };

  const client = new MCPClient(config);
  
  // Should not throw error when disconnecting without connection
  await assert.doesNotReject(async () => {
    await client.disconnect();
  });
  
  // State should remain disconnected
  assert.equal(client.isConnected(), false);
});
