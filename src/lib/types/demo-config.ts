/**
 * Configuration types for MCP Client Demo
 */

import { MCPServerConfig } from '../mcp/MCPClient.js';

export interface DemoConfig {
  mcpServer: MCPServerConfig;
  demo: {
    runMainDemo: boolean;
    runErrorHandling: boolean;
    runConfigurationOptions: boolean;
    verbose: boolean;
    showToolHistory: boolean;
    checkServerRunning: boolean;
    serverCheckTimeout: number;
  };
  output: {
    logLevel: 'debug' | 'info' | 'warn' | 'error';
    colorOutput: boolean;
    timestampLogs: boolean;
  };
}

export interface DemoCliOptions {
  config?: string;
  transport?: 'http' | 'stdio';
  url?: string;
  port?: number;
  username?: string;
  password?: string;
  storeId?: number;
  timeout?: number;
  verbose?: boolean;
  skipErrorHandling?: boolean;
  skipConfigDemo?: boolean;
  help?: boolean;
}
