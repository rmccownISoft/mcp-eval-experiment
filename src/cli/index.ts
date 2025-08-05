#!/usr/bin/env node

/**
 * MCP Test Suite CLI
 * Command-line interface for running MCP server tests
 */

import { Command } from 'commander';
import { loadConfig } from '../lib/config/loader';
import { LLMProvider, TestConfig } from '../lib/types';
import { existsSync } from 'fs';
import { resolve } from 'path';

const program = new Command();

program
  .name('mcp-test-suite')
  .description('A comprehensive TypeScript test suite to evaluate GraphQL-API MCP server effectiveness for AI agents')
  .version('1.0.0');

program
  .command('run')
  .description('Run the MCP test suite')
  .option('-c, --config <path>', 'Path to configuration file (JSON or YAML)')
  .option('-l, --llm <provider>', 'LLM provider to use (claude, gemini, chatgpt)', 'claude')
  .option('-s, --server <url>', 'MCP server URL', 'http://localhost:3000')
  .option('-o, --output <dir>', 'Output directory for results', './results')
  .option('-p, --prompts <path>', 'Path to test prompts directory')
  .option('-v, --verbose', 'Enable verbose logging', false)
  .option('--docker-container <name>', 'Docker container name', 'mcp-graphql-server')
  .option('--docker-port <port>', 'Docker port', '3000')
  .action(async (options) => {
    try {
      console.log('🚀 Starting MCP Test Suite...\n');

      // Validate LLM provider
      const llmProvider = options.llm.toLowerCase();
      if (!Object.values(LLMProvider).includes(llmProvider as LLMProvider)) {
        console.error(`❌ Invalid LLM provider: ${options.llm}`);
        console.error(`   Valid options: ${Object.values(LLMProvider).join(', ')}`);
        process.exit(1);
      }

      // Load configuration
      const configOptions: Partial<TestConfig> = {
        llmProvider: llmProvider as LLMProvider,
        mcpServer: {
          url: options.server
        },
        outputDir: options.output,
        verbose: options.verbose,
        docker: {
          containerName: options.dockerContainer,
          port: parseInt(options.dockerPort)
        }
      };

      if (options.prompts) {
        configOptions.testPrompts = [options.prompts];
      }

      const configManager = loadConfig({
        configFile: options.config,
        config: configOptions
      });

      const config = configManager.getConfig();
      
      if (options.verbose) {
        console.log('📋 Configuration Summary:');
        console.log(JSON.stringify(configManager.getSummary(), null, 2));
        console.log();
      }

      console.log(`🤖 LLM Provider: ${config.llmProvider}`);
      console.log(`🔗 MCP Server: ${config.mcpServer.url}`);
      console.log(`📁 Output Directory: ${config.outputDir}`);
      console.log();

      // TODO: Initialize and run the test suite
      console.log('⚠️  Test execution not yet implemented (Phase 1 - Foundation only)');
      console.log('✅ Configuration loaded successfully!');
      
    } catch (error) {
      console.error('❌ Error running MCP Test Suite:');
      console.error(error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

program
  .command('validate')
  .description('Validate configuration without running tests')
  .option('-c, --config <path>', 'Path to configuration file (JSON or YAML)')
  .action(async (options) => {
    try {
      console.log('🔍 Validating configuration...\n');

      const configManager = loadConfig({
        configFile: options.config
      });

      const summary = configManager.getSummary();
      console.log('✅ Configuration is valid!');
      console.log('\n📋 Configuration Summary:');
      console.log(JSON.stringify(summary, null, 2));
      
    } catch (error) {
      console.error('❌ Configuration validation failed:');
      console.error(error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

program
  .command('init')
  .description('Initialize a new configuration file')
  .option('-f, --format <format>', 'Configuration file format (json, yaml)', 'yaml')
  .option('-o, --output <path>', 'Output file path', './mcp-test-config.yaml')
  .action(async (options) => {
    try {
      console.log('🔧 Initializing configuration file...\n');

      const outputPath = resolve(options.output);
      
      if (existsSync(outputPath)) {
        console.error(`❌ File already exists: ${outputPath}`);
        console.error('   Use a different path or remove the existing file.');
        process.exit(1);
      }

      // TODO: Generate sample configuration file
      console.log('⚠️  Configuration file generation not yet implemented (Phase 1 - Foundation only)');
      console.log(`📁 Target path: ${outputPath}`);
      console.log(`📄 Format: ${options.format}`);
      
    } catch (error) {
      console.error('❌ Error initializing configuration:');
      console.error(error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

program
  .command('docker')
  .description('Docker environment management')
  .option('--start', 'Start the Docker test environment')
  .option('--stop', 'Stop the Docker test environment')
  .option('--status', 'Check Docker environment status')
  .option('--container <name>', 'Docker container name', 'mcp-graphql-server')
  .action(async (options) => {
    try {
      console.log('🐳 Docker environment management...\n');

      // TODO: Implement Docker management
      console.log('⚠️  Docker management not yet implemented (Phase 1 - Foundation only)');
      console.log(`📦 Container: ${options.container}`);
      
      if (options.start) {
        console.log('🚀 Would start Docker environment');
      } else if (options.stop) {
        console.log('🛑 Would stop Docker environment');
      } else if (options.status) {
        console.log('📊 Would check Docker environment status');
      } else {
        console.log('ℹ️  Use --start, --stop, or --status flags');
      }
      
    } catch (error) {
      console.error('❌ Error managing Docker environment:');
      console.error(error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  });

// Handle unknown commands
program.on('command:*', () => {
  console.error('❌ Invalid command: %s\n', program.args.join(' '));
  program.help();
});

// Parse command line arguments
program.parse();

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
