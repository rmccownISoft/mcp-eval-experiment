/**
 * Configuration loader for MCP Client Demo
 * Handles loading configuration from YAML files, command line arguments, and environment variables
 */

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { parse as parseYaml } from 'yaml';
import { DemoConfig, DemoCliOptions } from '../types/demo-config.js';
import { MCPServerConfig } from '../mcp/MCPClient.js';
import { ConfigurationError } from '../types.js';

export class DemoConfigLoader {
  /**
   * Load configuration from file, CLI options, and environment variables
   * Priority: CLI options > file > environment > defaults
   */
  public static loadConfig(options?: {
    configFile?: string;
    cliOptions?: DemoCliOptions;
    useEnvironment?: boolean;
  }): DemoConfig {
    const { configFile, cliOptions, useEnvironment = true } = options || {};

    try {
      // Start with defaults
      let config = this.getDefaultConfig();

      // Override with environment variables if enabled
      if (useEnvironment) {
        config = this.mergeWithEnvironment(config);
      }

      // Override with file config if provided
      if (configFile) {
        const fileConfig = this.loadFromFile(configFile);
        config = this.mergeConfigs(config, fileConfig);
      }

      // Override with CLI options if provided
      if (cliOptions) {
        config = this.mergeWithCliOptions(config, cliOptions);
      }

      this.validateConfig(config);
      return config;
    } catch (error) {
      if (error instanceof ConfigurationError) {
        throw error;
      }
      throw new ConfigurationError(`Failed to load demo configuration: ${error}`);
    }
  }

  /**
   * Load configuration from YAML file
   */
  private static loadFromFile(filePath: string): Partial<DemoConfig> {
    const resolvedPath = resolve(filePath);
    
    if (!existsSync(resolvedPath)) {
      throw new ConfigurationError(`Configuration file not found: ${resolvedPath}`);
    }

    try {
      const fileContent = readFileSync(resolvedPath, 'utf-8');
      
      if (filePath.endsWith('.yaml') || filePath.endsWith('.yml')) {
        return parseYaml(fileContent) as Partial<DemoConfig>;
      } else if (filePath.endsWith('.json')) {
        return JSON.parse(fileContent) as Partial<DemoConfig>;
      } else {
        throw new ConfigurationError('Unsupported configuration file format. Use .yaml, .yml, or .json');
      }
    } catch (error) {
      if (error instanceof ConfigurationError) {
        throw error;
      }
      throw new ConfigurationError(`Failed to parse configuration file: ${error}`);
    }
  }

  /**
   * Get default configuration
   */
  private static getDefaultConfig(): DemoConfig {
    return {
      mcpServer: {
        transport: 'http',
        url: 'http://localhost:3000',
        port: 3000,
        timeout: 30000,
        env: {
          HOST_ADDR: 'https://ai.itrackenterprise.com/graphql'
        },
        username: 'ai',
        password: 'demo',
        storeId: 1
      },
      demo: {
        runMainDemo: true,
        runErrorHandling: true,
        runConfigurationOptions: true,
        verbose: false,
        showToolHistory: true,
        checkServerRunning: true,
        serverCheckTimeout: 5000
      },
      output: {
        logLevel: 'info',
        colorOutput: true,
        timestampLogs: false
      }
    };
  }

  /**
   * Merge configuration with environment variables
   */
  private static mergeWithEnvironment(config: DemoConfig): DemoConfig {
    const envConfig: Partial<DemoConfig> = {};

    // MCP Server environment variables
    if (process.env.MCP_SERVER_URL) {
      envConfig.mcpServer = {
        ...config.mcpServer,
        url: process.env.MCP_SERVER_URL
      };
    }

    if (process.env.MCP_SERVER_PORT) {
      envConfig.mcpServer = {
        ...envConfig.mcpServer || config.mcpServer,
        port: parseInt(process.env.MCP_SERVER_PORT)
      };
    }

    if (process.env.MCP_SERVER_TRANSPORT) {
      const transport = process.env.MCP_SERVER_TRANSPORT.toLowerCase();
      if (transport === 'http' || transport === 'stdio') {
        envConfig.mcpServer = {
          ...envConfig.mcpServer || config.mcpServer,
          transport: transport as 'http' | 'stdio'
        };
      }
    }

    if (process.env.MCP_USERNAME) {
      envConfig.mcpServer = {
        ...envConfig.mcpServer || config.mcpServer,
        username: process.env.MCP_USERNAME
      };
    }

    if (process.env.MCP_PASSWORD) {
      envConfig.mcpServer = {
        ...envConfig.mcpServer || config.mcpServer,
        password: process.env.MCP_PASSWORD
      };
    }

    if (process.env.MCP_STORE_ID) {
      envConfig.mcpServer = {
        ...envConfig.mcpServer || config.mcpServer,
        storeId: parseInt(process.env.MCP_STORE_ID)
      };
    }

    if (process.env.HOST_ADDR) {
      envConfig.mcpServer = {
        ...envConfig.mcpServer || config.mcpServer,
        env: {
          ...config.mcpServer.env,
          HOST_ADDR: process.env.HOST_ADDR
        }
      };
    }

    // Demo environment variables
    if (process.env.MCP_DEMO_VERBOSE) {
      envConfig.demo = {
        ...config.demo,
        verbose: process.env.MCP_DEMO_VERBOSE.toLowerCase() === 'true'
      };
    }

    if (process.env.MCP_LOG_LEVEL) {
      const logLevel = process.env.MCP_LOG_LEVEL.toLowerCase();
      if (['debug', 'info', 'warn', 'error'].includes(logLevel)) {
        envConfig.output = {
          ...config.output,
          logLevel: logLevel as 'debug' | 'info' | 'warn' | 'error'
        };
      }
    }

    return this.mergeConfigs(config, envConfig);
  }

  /**
   * Merge configuration with CLI options
   */
  private static mergeWithCliOptions(config: DemoConfig, cliOptions: DemoCliOptions): DemoConfig {
    const cliConfig: Partial<DemoConfig> = {};

    // MCP Server CLI options
    const mcpServerOverrides: Partial<MCPServerConfig> = {};
    
    if (cliOptions.transport) {
      mcpServerOverrides.transport = cliOptions.transport;
    }
    if (cliOptions.url) {
      mcpServerOverrides.url = cliOptions.url;
    }
    if (cliOptions.port) {
      mcpServerOverrides.port = cliOptions.port;
    }
    if (cliOptions.username) {
      mcpServerOverrides.username = cliOptions.username;
    }
    if (cliOptions.password) {
      mcpServerOverrides.password = cliOptions.password;
    }
    if (cliOptions.storeId) {
      mcpServerOverrides.storeId = cliOptions.storeId;
    }
    if (cliOptions.timeout) {
      mcpServerOverrides.timeout = cliOptions.timeout;
    }

    if (Object.keys(mcpServerOverrides).length > 0) {
      cliConfig.mcpServer = {
        ...config.mcpServer,
        ...mcpServerOverrides
      };
    }

    // Demo CLI options
    const demoOverrides: Partial<DemoConfig['demo']> = {};
    
    if (cliOptions.verbose !== undefined) {
      demoOverrides.verbose = cliOptions.verbose;
    }
    if (cliOptions.skipErrorHandling !== undefined) {
      demoOverrides.runErrorHandling = !cliOptions.skipErrorHandling;
    }
    if (cliOptions.skipConfigDemo !== undefined) {
      demoOverrides.runConfigurationOptions = !cliOptions.skipConfigDemo;
    }

    if (Object.keys(demoOverrides).length > 0) {
      cliConfig.demo = {
        ...config.demo,
        ...demoOverrides
      };
    }

    return this.mergeConfigs(config, cliConfig);
  }

  /**
   * Deep merge two configuration objects
   */
  private static mergeConfigs(base: DemoConfig, override: Partial<DemoConfig>): DemoConfig {
    return {
      mcpServer: {
        ...base.mcpServer,
        ...override.mcpServer,
        env: {
          ...base.mcpServer.env,
          ...override.mcpServer?.env
        }
      },
      demo: {
        ...base.demo,
        ...override.demo
      },
      output: {
        ...base.output,
        ...override.output
      }
    };
  }

  /**
   * Validate the configuration
   */
  private static validateConfig(config: DemoConfig): void {
    const errors: string[] = [];

    // Validate MCP Server config
    if (!config.mcpServer.url) {
      errors.push('MCP server URL is required');
    } else {
      try {
        new URL(config.mcpServer.url);
      } catch {
        errors.push(`Invalid MCP server URL: ${config.mcpServer.url}`);
      }
    }

    if (config.mcpServer.transport !== 'http' && config.mcpServer.transport !== 'stdio') {
      errors.push(`Invalid transport type: ${config.mcpServer.transport}`);
    }

    if (config.mcpServer.port && (config.mcpServer.port < 1 || config.mcpServer.port > 65535)) {
      errors.push(`Invalid port number: ${config.mcpServer.port}`);
    }

    if (config.mcpServer.timeout && config.mcpServer.timeout < 1000) {
      errors.push('Timeout must be at least 1000ms');
    }

    // Validate demo config
    if (config.demo.serverCheckTimeout && config.demo.serverCheckTimeout < 1000) {
      errors.push('Server check timeout must be at least 1000ms');
    }

    // Validate output config
    if (!['debug', 'info', 'warn', 'error'].includes(config.output.logLevel)) {
      errors.push(`Invalid log level: ${config.output.logLevel}`);
    }

    if (errors.length > 0) {
      throw new ConfigurationError(`Demo configuration validation failed:\n${errors.join('\n')}`);
    }
  }

  /**
   * Print help information for CLI usage
   */
  public static printHelp(): void {
    console.log(`
MCP Client Demo - Configuration Options

Usage:
  node examples/mcp-client-demo.js [options]

Configuration File:
  -c, --config <path>         Path to YAML/JSON configuration file
                              (default: config/mcp-client-demo.yaml)

MCP Server Options:
  --transport <type>          Transport type: http or stdio (default: http)
  --url <url>                 MCP server URL (default: http://localhost:3000)
  --port <port>               MCP server port (default: 3000)
  --username <username>       Authentication username (default: ai)
  --password <password>       Authentication password (default: demo)
  --store-id <id>             Store ID for authentication (default: 1)
  --timeout <ms>              Request timeout in milliseconds (default: 30000)

Demo Options:
  -v, --verbose               Enable verbose logging
  --skip-error-handling       Skip error handling demonstration
  --skip-config-demo          Skip configuration options demonstration
  -h, --help                  Show this help message

Environment Variables:
  MCP_SERVER_URL              MCP server URL
  MCP_SERVER_PORT             MCP server port
  MCP_SERVER_TRANSPORT        Transport type (http or stdio)
  MCP_USERNAME                Authentication username
  MCP_PASSWORD                Authentication password
  MCP_STORE_ID                Store ID for authentication
  HOST_ADDR                   GraphQL endpoint URL
  MCP_DEMO_VERBOSE            Enable verbose logging (true/false)
  MCP_LOG_LEVEL               Log level (debug, info, warn, error)

Examples:
  # Use default configuration
  node examples/mcp-client-demo.js

  # Use custom configuration file
  node examples/mcp-client-demo.js --config ./my-config.yaml

  # Override specific options
  node examples/mcp-client-demo.js --verbose --port 3001

  # Use environment variables
  MCP_SERVER_URL=http://localhost:3001 MCP_DEMO_VERBOSE=true node examples/mcp-client-demo.js
`);
  }
}
