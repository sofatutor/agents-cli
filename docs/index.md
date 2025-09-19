---
layout: default
title: Agents CLI - Multi-Agent Workflows for IDEs
description: Open source workflow engine enabling agentic IDEs to execute sophisticated multi-agent workflows
---

# Agents CLI

**Multi-agent workflow engine for agentic IDEs using OpenAI Agents SDK**

[![CI](https://github.com/your-username/agents-cli/workflows/CI/badge.svg)](https://github.com/your-username/agents-cli/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Documentation](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://your-username.github.io/agents-cli)

## 🚀 What is Agents CLI?

Agents CLI enables agentic IDEs (Cursor, VS Code, etc.) to dynamically create and execute sophisticated multi-agent workflows. Define agents, tools, and orchestration patterns through JSON configuration and receive structured outputs optimized for IDE consumption.

## 📋 Current Status: Phase 1 Development

We're currently implementing the foundation and core MCP functionality.
[View detailed progress →](contributing/phase-roadmap)

## 🎯 Key Features

- **Dual Interface**: CLI and MCP server modes for flexible integration
- **Configuration-Driven**: JSON-based agent and workflow definitions
- **Security-First**: Built-in sandboxing and access controls
- **IDE-Optimized**: Real-time streaming and structured outputs
- **Extensible**: Plugin architecture for custom tools and workflows

## 🔗 Quick Links

- [Installation Guide](getting-started/installation) *(Coming Soon)*
- [IDE Integration](guides/ide-integration)
- [Configuration Reference](api/configuration-schema)
- [Example Workflows](examples/)
- [Contributing Guide](contributing/development-setup)

## 🏗️ Example Usage

```bash
# Execute a code review workflow
agents-cli run \
  --config examples/code-review.json \
  --input "Review this pull request" \
  --files "src/**/*.ts"

# Start MCP server for IDE integration
agents-cli serve --port 3000
```

## 🤝 Contributing

We welcome contributions! This is an open source project under MIT license.

- [Development Setup](contributing/development-setup)
- [Architecture Overview](contributing/architecture)
- [Phase Task Breakdown](contributing/phase-roadmap)

## 📄 License

MIT License - see [LICENSE](https://github.com/your-username/agents-cli/blob/main/LICENSE)