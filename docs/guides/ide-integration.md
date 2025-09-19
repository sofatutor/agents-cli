---
layout: default
title: IDE Integration Guide
description: How to integrate Agents CLI with various IDEs
---

# IDE Integration Guide

*Phase 1 Development - Documentation will be updated as features are implemented*

## Overview

Agents CLI supports integration with agentic IDEs through multiple interfaces:

- **MCP Protocol** (Recommended): Real-time integration via Model Context Protocol
- **CLI Interface**: Direct command execution from IDE plugins
- **HTTP API**: REST-based integration for custom solutions

## Supported IDEs

### Cursor (MCP Integration)
```bash
# Start MCP server for Cursor
agents-cli serve --port 3000 --protocol mcp

# Configure Cursor to connect to localhost:3000
```

### VS Code (Extension)
```bash
# Install VS Code extension (Coming Soon)
# Configure via Command Palette > Agents CLI: Setup
```

### JetBrains IDEs (Plugin)
```bash
# CLI-based integration via plugin
# Configure in Settings > Tools > Agents CLI
```

## MCP Server Setup

The Model Context Protocol provides real-time integration:

```bash
# Start MCP server
agents-cli serve --config server-config.json

# Server configuration example
{
  "server": {
    "port": 3000,
    "host": "localhost",
    "protocol": "mcp"
  },
  "security": {
    "allow_file_access": true,
    "allowed_paths": ["./src", "./docs"],
    "tools_enabled": ["file_operations", "git_tools"]
  }
}
```

## CLI Integration

For IDEs without MCP support:

```bash
# Execute workflow from IDE terminal/plugin
agents-cli run \
  --config .agents/code-review.json \
  --input "Review selected code" \
  --context-files "${SELECTED_FILES}"
```

## Configuration

Each integration method supports:
- Custom workflow definitions
- Security policies and access controls
- Tool selection and configuration
- Output formatting preferences

## Troubleshooting

Common integration issues and solutions will be documented here during Phase 1 development.

## Next Steps

- [Configuration Schema](../api/configuration-schema.md)
- [Example Workflows](../examples/)
- [Security Guidelines](../guides/security.md)