# MCP Client Demo

This directory contains examples demonstrating how to use the MCP (Model Context Protocol) client with external configuration support.

## MCP Client Demo (`mcp-client-demo.ts`)

The main demo file has been refactored to support external configuration via YAML files, command line arguments, and environment variables, removing all hardcoded configuration values.

### Configuration Priority

Configuration is loaded in the following priority order (highest to lowest):
1. Command line arguments
2. Configuration file (YAML/JSON)
3. Environment variables
4. Default values

### Usage

#### Basic Usage

```bash
# Use default configuration file (config/mcp-client-demo.yaml)
node examples/mcp-client-demo.js

# Use custom configuration file
node examples/mcp-client-demo.js --config ./my-config.yaml

# Show help
node examples/mcp-client-demo.js --help
```

#### Command Line Options

```bash
# MCP Server Configuration
--transport http|stdio       # Transport type (default: http)
--url <url>                  # MCP server URL (default: http://localhost:3000)
--port <port>                # MCP server port (default: 3000)
--username <username>        # Authentication username (default: ai)
--password <password>        # Authentication password (default: demo)
--store-id <id>              # Store ID for authentication (default: 1)
--timeout <ms>               # Request timeout in milliseconds (default: 30000)

# Demo Options
-v, --verbose                # Enable verbose logging
--skip-error-handling        # Skip error handling demonstration
--skip-config-demo           # Skip configuration options demonstration
-c, --config <path>          # Path to configuration file
-h, --help                   # Show help message
```

#### Environment Variables

```bash
# MCP Server Configuration
export MCP_SERVER_URL=http://localhost:3000
export MCP_SERVER_PORT=3000
export MCP_SERVER_TRANSPORT=http
export MCP_USERNAME=ai
export MCP_PASSWORD=demo
export MCP_STORE_ID=1
export HOST_ADDR=https://ai.itrackenterprise.com/graphql

# Demo Configuration
export MCP_DEMO_VERBOSE=true
export MCP_LOG_LEVEL=debug
```

### Configuration File Format

The demo uses YAML configuration files. Here's the structure:

```yaml
# MCP Server Configuration
mcpServer:
  transport: http  # or stdio
  url: http://localhost:3000
  port: 3000
  timeout: 30000
  env:
    HOST_ADDR: https://ai.itrackenterprise.com/graphql
  # Authentication credentials
  username: ai
  password: demo
  storeId: 1

# Demo Configuration
demo:
  runMainDemo: true
  runErrorHandling: true
  runConfigurationOptions: true
  verbose: true
  showToolHistory: true
  checkServerRunning: true
  serverCheckTimeout: 5000

# Output Configuration
output:
  logLevel: info  # debug, info, warn, error
  colorOutput: true
  timestampLogs: true
```

#### STDIO Transport Configuration

For STDIO transport, use this configuration:

```yaml
mcpServer:
  transport: stdio
  command: node
  args: ['-r', 'dotenv/config', 'dist/entryPoint.js']
  cwd: /path/to/enterprise-api-mcp-server  # Update with actual path
  timeout: 30000
  env:
    HOST_ADDR: https://ai.itrackenterprise.com/graphql
  username: ai
  password: demo
  storeId: 1
```

### Examples

#### Example 1: Basic Usage with Default Config

```bash
node examples/mcp-client-demo.js
```

This will:
- Look for `config/mcp-client-demo.yaml`
- Use environment variables if available
- Fall back to defaults

#### Example 2: Custom Configuration File

```bash
node examples/mcp-client-demo.js --config ./production-config.yaml
```

#### Example 3: Override Specific Options

```bash
node examples/mcp-client-demo.js --verbose --port 3001 --username myuser
```

#### Example 4: Environment Variables Only

```bash
MCP_SERVER_URL=http://localhost:3001 \
MCP_DEMO_VERBOSE=true \
MCP_LOG_LEVEL=debug \
node examples/mcp-client-demo.js
```

#### Example 5: Skip Certain Demo Sections

```bash
node examples/mcp-client-demo.js --skip-error-handling --skip-config-demo
```

### Features

- **External Configuration**: No hardcoded values in the code
- **Multiple Configuration Sources**: YAML files, CLI args, environment variables
- **Flexible Logging**: Configurable log levels, colors, and timestamps
- **Selective Demo Execution**: Enable/disable different demo sections
- **Comprehensive Help**: Built-in help system with examples
- **Validation**: Configuration validation with helpful error messages

### Configuration Files

- `config/mcp-client-demo.yaml` - Default configuration file
- Custom configuration files can be specified with `--config` option
- Supports both YAML (`.yaml`, `.yml`) and JSON (`.json`) formats

### Dependencies

The demo requires the following modules:
- `yaml` - For YAML configuration file parsing
- `fs` - For file system operations
- `path` - For path resolution

All dependencies are already included in the project's `package.json`.
