/**
 * MCP Client Demo
 * Demonstrates how to use the refactored MCP client with the Enterprise API MCP Server
 * Now supports external configuration via YAML files, command line arguments, and environment variables
 */

import { MCPClient, type MCPServerConfig } from '../src/lib/mcp/MCPClient.js';
import { DemoConfigLoader } from '../src/lib/config/demo-config-loader.js';
import { DemoConfig, DemoCliOptions } from '../src/lib/types/demo-config.js';
import { existsSync } from 'fs';
import { resolve } from 'path';

/**
 * Parse command line arguments
 */
function parseCliArguments(): DemoCliOptions {
  const args = process.argv.slice(2);
  const options: DemoCliOptions = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const nextArg = args[i + 1];

    switch (arg) {
      case '-c':
      case '--config':
        if (nextArg && !nextArg.startsWith('-')) {
          options.config = nextArg;
          i++;
        }
        break;
      case '--transport':
        if (nextArg && (nextArg === 'http' || nextArg === 'stdio')) {
          options.transport = nextArg;
          i++;
        }
        break;
      case '--url':
        if (nextArg && !nextArg.startsWith('-')) {
          options.url = nextArg;
          i++;
        }
        break;
      case '--port':
        if (nextArg && !nextArg.startsWith('-')) {
          const port = parseInt(nextArg);
          if (!isNaN(port)) {
            options.port = port;
            i++;
          }
        }
        break;
      case '--username':
        if (nextArg && !nextArg.startsWith('-')) {
          options.username = nextArg;
          i++;
        }
        break;
      case '--password':
        if (nextArg && !nextArg.startsWith('-')) {
          options.password = nextArg;
          i++;
        }
        break;
      case '--store-id':
        if (nextArg && !nextArg.startsWith('-')) {
          const storeId = parseInt(nextArg);
          if (!isNaN(storeId)) {
            options.storeId = storeId;
            i++;
          }
        }
        break;
      case '--timeout':
        if (nextArg && !nextArg.startsWith('-')) {
          const timeout = parseInt(nextArg);
          if (!isNaN(timeout)) {
            options.timeout = timeout;
            i++;
          }
        }
        break;
      case '-v':
      case '--verbose':
        options.verbose = true;
        break;
      case '--skip-error-handling':
        options.skipErrorHandling = true;
        break;
      case '--skip-config-demo':
        options.skipConfigDemo = true;
        break;
      case '-h':
      case '--help':
        options.help = true;
        break;
    }
  }

  return options;
}

/**
 * Load configuration from file, CLI, and environment
 */
function loadDemoConfiguration(): DemoConfig {
  const cliOptions = parseCliArguments();

  // Show help if requested
  if (cliOptions.help) {
    DemoConfigLoader.printHelp();
    process.exit(0);
  }

  // Determine config file path
  let configFile = cliOptions.config;
  if (!configFile) {
    // Try default config file
    const defaultConfigPath = resolve('config/mcp-client-demo.yaml');
    if (existsSync(defaultConfigPath)) {
      configFile = defaultConfigPath;
    }
  }

  try {
    return DemoConfigLoader.loadConfig({
      configFile,
      cliOptions,
      useEnvironment: true
    });
  } catch (error) {
    console.error('❌ Configuration Error:', error instanceof Error ? error.message : String(error));
    console.log('\nUse --help for configuration options.');
    process.exit(1);
  }
}

/**
 * Create a logger based on configuration
 */
function createLogger(config: DemoConfig) {
  const { logLevel, colorOutput, timestampLogs } = config.output;
  const { verbose } = config.demo;

  const colors = colorOutput ? {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
  } : {
    reset: '', red: '', green: '', yellow: '', blue: '', magenta: '', cyan: '', white: ''
  };

  const getTimestamp = () => timestampLogs ? `[${new Date().toISOString()}] ` : '';

  return {
    debug: (message: string, ...args: any[]) => {
      if (logLevel === 'debug' || verbose) {
        console.log(`${getTimestamp()}${colors.cyan}🔍 ${message}${colors.reset}`, ...args);
      }
    },
    info: (message: string, ...args: any[]) => {
      if (['debug', 'info'].includes(logLevel) || verbose) {
        console.log(`${getTimestamp()}${colors.blue}ℹ️  ${message}${colors.reset}`, ...args);
      }
    },
    warn: (message: string, ...args: any[]) => {
      if (['debug', 'info', 'warn'].includes(logLevel)) {
        console.warn(`${getTimestamp()}${colors.yellow}⚠️  ${message}${colors.reset}`, ...args);
      }
    },
    error: (message: string, ...args: any[]) => {
      console.error(`${getTimestamp()}${colors.red}❌ ${message}${colors.reset}`, ...args);
    },
    success: (message: string, ...args: any[]) => {
      console.log(`${getTimestamp()}${colors.green}✅ ${message}${colors.reset}`, ...args);
    },
    log: (message: string, ...args: any[]) => {
      console.log(`${getTimestamp()}${message}`, ...args);
    }
  };
}

async function demonstrateMCPClient(config: DemoConfig, logger: ReturnType<typeof createLogger>) {
  const client = new MCPClient(config.mcpServer);
  
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
    const authSuccess = await client.authenticate(
      config.mcpServer.username!,
      config.mcpServer.password!,
      config.mcpServer.storeId!
    );
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
          JSON.stringify({ storeId: config.mcpServer.storeId! })
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

async function demonstrateErrorHandling(config: DemoConfig, logger: ReturnType<typeof createLogger>) {
  logger.info('Demonstrating error handling...');
  
  const client = new MCPClient(config.mcpServer);
  
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
    // Try invalid GraphQL query
    await client.connect();
    await client.authenticate(
      config.mcpServer.username!,
      config.mcpServer.password!,
      config.mcpServer.storeId!
    );
    console.log('❌ Trying invalid GraphQL query...');
    await client.queryGraphQL('query { invalidField { nonExistentProperty } }');
  } catch (error) {
    console.log('✅ Caught expected error:', error.message);
  } finally {
    await client.disconnect();
  }
}

async function demonstrateConfigurationOptions(config: DemoConfig, logger: ReturnType<typeof createLogger>) {
  logger.info('Demonstrating configuration options...');
  
  // Show current loaded configuration
  logger.log('📋 Current Configuration:');
  logger.log('🌐 MCP Server Config:', JSON.stringify(config.mcpServer, null, 2));
  logger.log('🎛️  Demo Config:', JSON.stringify(config.demo, null, 2));
  logger.log('📤 Output Config:', JSON.stringify(config.output, null, 2));
  
  // Example HTTP configuration
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
  
  logger.log('🌐 Example HTTP Config:', httpConfig);
  
  // Example STDIO configuration
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
  
  logger.log('💻 Example STDIO Config:', stdioConfigDemo);
  
  // Minimal configuration with defaults
  const minimalConfig: MCPServerConfig = {
    transport: 'http'
  };
  
  const client = new MCPClient(minimalConfig);
  const resolvedConfig = client.getConfig();
  logger.log('🎯 Minimal config with defaults:', resolvedConfig);
}

// Main execution
async function main() {
  console.log('🚀 MCP Client Demo Starting...\n');
  
  // Load configuration
  const config = loadDemoConfiguration();
  const logger = createLogger(config);
  
  // Show configuration info
  logger.info(`Using MCP server: ${config.mcpServer.url}`);
  logger.info(`Transport: ${config.mcpServer.transport}`);
  if (config.demo.verbose) {
    logger.debug('Configuration loaded:', JSON.stringify(config, null, 2));
  }
  
  // Check if server is likely running
  logger.info('Make sure your MCP server is running');
  logger.info('Server command: node -r dotenv/config dist/entryPoint.js');
  logger.info(`Required environment: HOST_ADDR=${config.mcpServer.env?.HOST_ADDR || 'https://ai.itrackenterprise.com/graphql'}`);
  console.log();
  
  try {
    // Run main demo if enabled
    if (config.demo.runMainDemo) {
      await demonstrateMCPClient(config, logger);
    } else {
      logger.info('Main demo skipped (disabled in configuration)');
    }
    
    // Run error handling demo if enabled
    if (config.demo.runErrorHandling) {
      await demonstrateErrorHandling(config, logger);
    } else {
      logger.info('Error handling demo skipped (disabled in configuration)');
    }
    
    // Run configuration options demo if enabled
    if (config.demo.runConfigurationOptions) {
      await demonstrateConfigurationOptions(config, logger);
    } else {
      logger.info('Configuration options demo skipped (disabled in configuration)');
    }
    
    logger.success('Demo completed successfully!');
  } catch (error) {
    logger.error('Demo failed:', error);
    process.exit(1);
  }
}

// Run the demo when this file is executed directly
if (process.argv[1] && process.argv[1].endsWith('mcp-client-demo.js')) {
  main().catch(console.error);
}
