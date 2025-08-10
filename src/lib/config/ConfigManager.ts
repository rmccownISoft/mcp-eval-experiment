/**
 * Configuration Manager for MCP Test Suite
 * Handles loading, validation, and management of configuration settings
 * Supports both JSON and YAML configuration files
 */

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { parse as parseYaml } from 'yaml';
import { TestConfig, ConfigurationError, LLMProvider } from '../types.js';

export class ConfigManager {
  private config: TestConfig;
  private configPath?: string;

  constructor(config?: Partial<TestConfig>, configPath?: string) {
    if (configPath !== undefined) {
      this.configPath = configPath;
    }
    this.config = this.mergeWithDefaults(config || {});
    this.validateConfig();
  }

  /**
   * Get the current configuration
   */
  public getConfig(): TestConfig {
    return { ...this.config };
  }

  /**
   * Update configuration with new values
   */
  public updateConfig(updates: Partial<TestConfig>): void {
    // Deep merge for nested objects
    const updatedConfig = {
      ...this.config,
      ...updates,
      apiKeys: { ...this.config.apiKeys, ...updates.apiKeys },
      mcpServer: { ...this.config.mcpServer, ...updates.mcpServer },
      docker: { ...this.config.docker, ...updates.docker },
      llmConfig: { ...this.config.llmConfig, ...updates.llmConfig }
    };

    // Ensure llmConfig.provider matches llmProvider if llmProvider was updated
    if (updates.llmProvider && updatedConfig.llmConfig) {
      updatedConfig.llmConfig.provider = updates.llmProvider;
    }

    this.config = updatedConfig;
    this.validateConfig();
  }

  /**
   * Load configuration from file (supports JSON and YAML)
   */
  public static fromFile(filePath: string): ConfigManager {
    const resolvedPath = resolve(filePath);
    
    if (!existsSync(resolvedPath)) {
      throw new ConfigurationError(`Configuration file not found: ${resolvedPath}`);
    }

    try {
      const fileContent = readFileSync(resolvedPath, 'utf-8');
      let config: Partial<TestConfig>;

      if (filePath.endsWith('.json')) {
        config = JSON.parse(fileContent);
      } else if (filePath.endsWith('.yaml') || filePath.endsWith('.yml')) {
        config = parseYaml(fileContent);
      } else {
        throw new ConfigurationError('Unsupported configuration file format. Use .json, .yaml, or .yml');
      }

      return new ConfigManager(config, resolvedPath);
    } catch (error) {
      if (error instanceof ConfigurationError) {
        throw error;
      }
      throw new ConfigurationError(`Failed to parse configuration file: ${error}`);
    }
  }

  /**
   * Create configuration from environment variables
   */
  public static fromEnvironment(): ConfigManager {
    const config: Partial<TestConfig> = {};

    // LLM Provider
    if (process.env.MCP_LLM_PROVIDER) {
      const provider = process.env.MCP_LLM_PROVIDER.toLowerCase();
      if (Object.values(LLMProvider).includes(provider as LLMProvider)) {
        config.llmProvider = provider as LLMProvider;
      }
    }

    // API Keys
    const apiKeys: Partial<TestConfig['apiKeys']> = {};
    if (process.env.CLAUDE_API_KEY) apiKeys.claude = process.env.CLAUDE_API_KEY;
    if (process.env.GEMINI_API_KEY) apiKeys.gemini = process.env.GEMINI_API_KEY;
    if (process.env.OPENAI_API_KEY) apiKeys.chatgpt = process.env.OPENAI_API_KEY;
    const gpt4Key = process.env.GPT4_API_KEY || process.env.OPENAI_API_KEY;
    if (gpt4Key) {
      apiKeys.gpt4 = gpt4Key;
    }
    config.apiKeys = apiKeys;

    // MCP Server
    if (process.env.MCP_SERVER_URL) {
      const mcpServer: TestConfig['mcpServer'] = {
        url: process.env.MCP_SERVER_URL,
        transport: 'http'
      };
      if (process.env.MCP_USERNAME) mcpServer.username = process.env.MCP_USERNAME;
      if (process.env.MCP_PASSWORD) mcpServer.password = process.env.MCP_PASSWORD;
      if (process.env.MCP_STORE_ID) mcpServer.storeId = parseInt(process.env.MCP_STORE_ID);
      config.mcpServer = mcpServer;
    }

    // Docker
    if (process.env.DOCKER_CONTAINER_NAME || process.env.DOCKER_PORT) {
      const docker: Partial<TestConfig['docker']> = {};
      if (process.env.DOCKER_CONTAINER_NAME) docker.containerName = process.env.DOCKER_CONTAINER_NAME;
      if (process.env.DOCKER_PORT) docker.port = parseInt(process.env.DOCKER_PORT);
      if (process.env.DOCKER_HEALTH_URL) docker.healthCheckUrl = process.env.DOCKER_HEALTH_URL;
      config.docker = docker;
    }

    // Other settings
    if (process.env.MCP_OUTPUT_DIR) {
      config.outputDir = process.env.MCP_OUTPUT_DIR;
    }

    if (process.env.MCP_VERBOSE) {
      config.verbose = process.env.MCP_VERBOSE.toLowerCase() === 'true';
    }

    return new ConfigManager(config);
  }

  /**
   * Merge provided config with defaults
   */
  private mergeWithDefaults(config: Partial<TestConfig>): TestConfig {
    const llmProvider = config.llmProvider || LLMProvider.CLAUDE;
    
    const defaults: TestConfig = {
      llmProvider,
      mcpServer: {
        url: 'http://localhost:3000',
        transport: 'http'
      },
      apiKeys: {},
      llmConfig: {
        provider: llmProvider,
        temperature: 0.1,
        maxTokens: 4000,
        timeout: 30000
      },
      docker: {
        containerName: 'mcp-graphql-server',
        port: 3000,
        healthCheckUrl: 'http://localhost:3000/health'
      },
      testPrompts: [],
      outputDir: './results',
      verbose: false
    };

    // Merge llmConfig properly to ensure provider is always set
    const mergedLlmConfig = {
      ...defaults.llmConfig,
      ...config.llmConfig,
      provider: config.llmConfig?.provider || llmProvider
    };

    return {
      ...defaults,
      ...config,
      llmConfig: mergedLlmConfig,
      docker: { ...defaults.docker, ...config.docker },
      mcpServer: { ...defaults.mcpServer, ...config.mcpServer }
    };
  }

  /**
   * Validate the configuration
   */
  private validateConfig(): void {
    const errors: string[] = [];

    // Validate LLM Provider
    if (!Object.values(LLMProvider).includes(this.config.llmProvider)) {
      errors.push(`Invalid LLM provider: ${this.config.llmProvider}`);
    }

    // Validate API Keys
    const requiredKey = this.getRequiredApiKey(this.config.llmProvider);
    if (!this.config.apiKeys[requiredKey]) {
      errors.push(`Missing API key for ${this.config.llmProvider}: ${requiredKey}`);
    }

    // Validate MCP Server URL
    if (!this.config.mcpServer.url) {
      errors.push('MCP server URL is required');
    } else {
      try {
        new URL(this.config.mcpServer.url);
      } catch {
        errors.push(`Invalid MCP server URL: ${this.config.mcpServer.url}`);
      }
    }

    // Validate output directory
    if (!this.config.outputDir) {
      errors.push('Output directory is required');
    }

    // Validate LLM config
    if (this.config.llmConfig) {
      if (this.config.llmConfig.temperature !== undefined) {
        if (this.config.llmConfig.temperature < 0 || this.config.llmConfig.temperature > 2) {
          errors.push('Temperature must be between 0 and 2');
        }
      }

      if (this.config.llmConfig.maxTokens !== undefined) {
        if (this.config.llmConfig.maxTokens < 1 || this.config.llmConfig.maxTokens > 100000) {
          errors.push('Max tokens must be between 1 and 100000');
        }
      }

      if (this.config.llmConfig.timeout !== undefined) {
        if (this.config.llmConfig.timeout < 1000) {
          errors.push('Timeout must be at least 1000ms');
        }
      }
    }

    if (errors.length > 0) {
      throw new ConfigurationError(`Configuration validation failed:\n${errors.join('\n')}`);
    }
  }

  /**
   * Get the required API key name for a given LLM provider
   */
  private getRequiredApiKey(provider: LLMProvider): keyof TestConfig['apiKeys'] {
    switch (provider) {
      case LLMProvider.CLAUDE:
        return 'claude';
      case LLMProvider.GEMINI:
        return 'gemini';
      case LLMProvider.CHATGPT:
        return 'chatgpt';
      default:
        throw new ConfigurationError(`Unknown LLM provider: ${provider}`);
    }
  }

  /**
   * Get configuration summary for logging
   */
  public getSummary(): Record<string, any> {
    return {
      llmProvider: this.config.llmProvider,
      mcpServerUrl: this.config.mcpServer.url,
      hasApiKeys: Object.keys(this.config.apiKeys).filter(key => 
        this.config.apiKeys[key as keyof typeof this.config.apiKeys]
      ),
      outputDir: this.config.outputDir,
      verbose: this.config.verbose,
      configPath: this.configPath
    };
  }
}
