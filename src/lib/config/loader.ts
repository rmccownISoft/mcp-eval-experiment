/**
 * Configuration loader utilities
 * Provides convenient functions for loading configuration from various sources
 */

import { ConfigManager } from './ConfigManager.js';
import { TestConfig, ConfigurationError } from '../types.js';

/**
 * Load configuration from file, environment, or provided config object
 * Priority: provided config > file > environment > defaults
 */
export function loadConfig(options?: {
  configFile?: string;
  config?: Partial<TestConfig>;
  useEnvironment?: boolean;
}): ConfigManager {
  const { configFile, config, useEnvironment = true } = options || {};

  try {
    // Start with environment variables if enabled
    let configManager: ConfigManager;
    
    if (useEnvironment) {
      configManager = ConfigManager.fromEnvironment();
    } else {
      // When not using environment, create with provided config directly if available
      // to avoid validation errors with default empty config
      if (config) {
        configManager = new ConfigManager(config);
      } else {
        configManager = new ConfigManager();
      }
    }

    // Override with file config if provided
    if (configFile) {
      const fileConfigManager = ConfigManager.fromFile(configFile);
      const fileConfig = fileConfigManager.getConfig();
      configManager.updateConfig(fileConfig);
    }

    // Override with provided config if provided (only if we didn't use it above)
    if (config && useEnvironment) {
      configManager.updateConfig(config);
    }

    return configManager;
  } catch (error) {
    if (error instanceof ConfigurationError) {
      throw error;
    }
    throw new ConfigurationError(`Failed to load configuration: ${error}`);
  }
}

/**
 * Load configuration from file only
 */
export function loadConfigFromFile(filePath: string): ConfigManager {
  return ConfigManager.fromFile(filePath);
}

/**
 * Load configuration from environment variables only
 */
export function loadConfigFromEnvironment(): ConfigManager {
  return ConfigManager.fromEnvironment();
}

/**
 * Create configuration from object only
 */
export function createConfig(config: Partial<TestConfig>): ConfigManager {
  return new ConfigManager(config);
}

/**
 * Validate configuration without creating a ConfigManager instance
 */
export function validateConfig(config: Partial<TestConfig>): { valid: boolean; errors: string[] } {
  try {
    new ConfigManager(config);
    return { valid: true, errors: [] };
  } catch (error) {
    if (error instanceof ConfigurationError) {
      const errors = error.message.split('\n').slice(1); // Remove the "Configuration validation failed:" line
      return { valid: false, errors };
    }
    return { valid: false, errors: [error instanceof Error ? error.message : String(error)] };
  }
}
