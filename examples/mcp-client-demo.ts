/**
 * MCP Client Demo
 * Demonstrates how to use the refactored MCP client with the Enterprise API MCP Server
 */

import { MCPClient, type MCPServerConfig } from '../src/lib/mcp/MCPClient.js';

// Configuration for HTTP transport (streamable HTTP)
const config: MCPServerConfig = {
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

// Alternative configuration for STDIO transport
const stdioConfig: MCPServerConfig = {
  transport: 'stdio',
  command: 'node',
  args: ['-r', 'dotenv/config', 'dist/entryPoint.js'],
  cwd: '/path/to/enterprise-api-mcp-server', // Update with actual path
  env: {
    HOST_ADDR: 'https://ai.itrackenterprise.com/graphql'
  },
  username: 'ai',
  password: 'demo',
  storeId: 1,
  timeout: 30000
};

async function demonstrateMCPClient() {
  const client = new MCPClient(config);
  
  try {
    console.log('🔌 Connecting to MCP server...');
    const connected = await client.connect();
    
    if (!connected) {
      console.error('❌ Failed to connect to MCP server');
      return;
    }
    
    console.log('✅ Connected successfully!');
    
    // Get connection state
    const state = client.getConnectionState();
    console.log('📊 Connection State:', {
      connected: state.connected,
      initialized: state.initialized,
      authenticated: state.authenticated,
      serverInfo: state.serverInfo
    });
    
    // Discover available tools
    console.log('\n🔍 Discovering available tools...');
    const tools = await client.getAvailableTools();
    console.log('🛠️  Available tools:', tools);
    
    // Get session information
    console.log('\n📋 Getting session information...');
    const sessionInfo = await client.getSessionInfo();
    console.log('🆔 Session Info:', sessionInfo);
    
    // Get current date
    console.log('\n📅 Getting current date...');
    const currentDate = await client.getCurrentDate();
    console.log('📆 Current Date:', currentDate);
    
    // Authenticate
    console.log('\n🔐 Authenticating...');
    const authSuccess = await client.authenticate('ai', 'demo', 1);
    console.log('🔑 Authentication:', authSuccess ? 'SUCCESS' : 'FAILED');
    
    if (authSuccess) {
      // Get session info after authentication
      console.log('\n📋 Getting session info after authentication...');
      const authSessionInfo = await client.getSessionInfo();
      console.log('🆔 Authenticated Session Info:', authSessionInfo);
      
      // Get server information
      console.log('\n🖥️  Getting server information...');
      const serverInfo = await client.getServerInformationQuery();
      console.log('📊 Server Info:', serverInfo);
      
      // Get quick reference
      console.log('\n📖 Getting quick reference guide...');
      const quickRef = await client.getQuickReference();
      console.log('📚 Quick Reference (first 200 chars):', quickRef.substring(0, 200) + '...');
      
      // Explore schema
      console.log('\n🔍 Exploring GraphQL schema...');
      const schemaTypes = await client.exploreSchema('type');
      console.log('📋 Schema Types (first 300 chars):', schemaTypes.substring(0, 300) + '...');
      
      // Search schema
      console.log('\n🔎 Searching schema for "Customer"...');
      const searchResults = await client.searchSchema('Customer');
      console.log('🔍 Search Results:', searchResults);
      
      // Execute GraphQL query
      console.log('\n📊 Executing GraphQL query...');
      const queryResult = await client.queryGraphQL(`
        query {
          storesForLogin {
            id
            name
          }
        }
      `);
      console.log('📈 Query Result:', queryResult);
      
      // Execute GraphQL query with variables
      console.log('\n📊 Executing GraphQL query with variables...');
      try {
        const queryWithVars = await client.queryGraphQL(
          `query GetStore($storeId: Int!) {
            store(id: $storeId) {
              id
              name
            }
          }`,
          JSON.stringify({ storeId: 1 })
        );
        console.log('📈 Query with Variables Result:', queryWithVars);
      } catch (error) {
        console.log('⚠️  Query with variables failed (expected if schema doesn\'t support it):', error.message);
      }
      
      // Close session
      console.log('\n🔒 Closing session...');
      const closeResult = await client.closeSession();
      console.log('🚪 Session Closed:', closeResult);
    }
    
    // Get tool call history
    console.log('\n📊 Tool Call History:');
    const history = client.getToolCallHistory();
    history.forEach((call, index) => {
      console.log(`${index + 1}. ${call.toolName} - ${call.success ? '✅' : '❌'} (${call.duration}ms)`);
    });
    
    console.log('\n📈 Total tool calls:', history.length);
    console.log('⚡ Average latency:', Math.round(history.reduce((sum, call) => sum + call.duration, 0) / history.length) + 'ms');
    
  } catch (error) {
    console.error('❌ Error during demo:', error);
    
    if (error.details) {
      console.error('🔍 Error details:', error.details);
    }
  } finally {
    // Always disconnect
    console.log('\n🔌 Disconnecting...');
    await client.disconnect();
    console.log('👋 Disconnected successfully!');
  }
}

async function demonstrateErrorHandling() {
  console.log('\n🧪 Demonstrating error handling...');
  
  const client = new MCPClient(config);
  
  try {
    // Try to use tools without connecting
    console.log('❌ Trying to call tools without connection...');
    await client.getSessionInfo();
  } catch (error) {
    console.log('✅ Caught expected error:', error.message);
  }
  
  try {
    // Try invalid schema type
    await client.connect();
    console.log('❌ Trying invalid schema type...');
    await client.exploreSchema('invalid' as any);
  } catch (error) {
    console.log('✅ Caught expected error:', error.message);
  } finally {
    await client.disconnect();
  }
  
  try {
    // Try invalid authentication parameters
    await client.connect();
    console.log('❌ Trying invalid authentication parameters...');
    await client.authenticate('user', 'pass', 'invalid' as any);
  } catch (error) {
    console.log('✅ Caught expected error:', error.message);
  } finally {
    await client.disconnect();
  }
  
  try {
    // Try blocked mutation
    await client.connect();
    await client.authenticate('ai', 'demo', 1);
    console.log('❌ Trying blocked mutation...');
    await client.queryGraphQL('mutation { deleteEverything }');
  } catch (error) {
    console.log('✅ Caught expected error:', error.message);
  } finally {
    await client.disconnect();
  }
}

async function demonstrateConfigurationOptions() {
  console.log('\n⚙️  Demonstrating configuration options...');
  
  // HTTP configuration
  const httpConfig: MCPServerConfig = {
    transport: 'http',
    url: 'http://localhost:3000',
    port: 3000,
    env: {
      HOST_ADDR: 'https://ai.itrackenterprise.com/graphql',
      DEBUG_LOG: 'true'
    },
    timeout: 15000
  };
  
  console.log('🌐 HTTP Config:', httpConfig);
  
  // STDIO configuration
  const stdioConfigDemo: MCPServerConfig = {
    transport: 'stdio',
    command: 'node',
    args: ['-r', 'dotenv/config', 'dist/entryPoint.js'],
    cwd: '/path/to/server',
    env: {
      HOST_ADDR: 'https://ai.itrackenterprise.com/graphql',
      API_KEY: 'optional-api-key',
      DEBUG_LOG: 'true'
    },
    timeout: 30000
  };
  
  console.log('💻 STDIO Config:', stdioConfigDemo);
  
  // Minimal configuration with defaults
  const minimalConfig: MCPServerConfig = {
    transport: 'http'
  };
  
  const client = new MCPClient(minimalConfig);
  const resolvedConfig = client.getConfig();
  console.log('🎯 Minimal config with defaults:', resolvedConfig);
}

// Main execution
async function main() {
  console.log('🚀 MCP Client Demo Starting...\n');
  
  // Check if server is likely running
  console.log('ℹ️  Make sure your MCP server is running on localhost:3000');
  console.log('ℹ️  Server command: node -r dotenv/config dist/entryPoint.js');
  console.log('ℹ️  Required environment: HOST_ADDR=https://ai.itrackenterprise.com/graphql\n');
  
  try {
    await demonstrateMCPClient();
    await demonstrateErrorHandling();
    await demonstrateConfigurationOptions();
    
    console.log('\n🎉 Demo completed successfully!');
  } catch (error) {
    console.error('\n💥 Demo failed:', error);
    process.exit(1);
  }
}

// Run the demo
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { demonstrateMCPClient, demonstrateErrorHandling, demonstrateConfigurationOptions };
