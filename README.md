# Agents CLI

[![CI](https://github.com/your-username/agents-cli/workflows/CI/badge.svg)](https://github.com/your-username/agents-cli/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Documentation](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://your-username.github.io/agents-cli)
[![Phase](https://img.shields.io/badge/Phase-1%20Development-orange)]()
[![OpenAI SDK](https://img.shields.io/badge/OpenAI-Agents%20SDK-green)](https://openai.github.io/openai-agents-js/)

**Multi-agent workflow engine for agentic IDEs using OpenAI Agents SDK**

> 🚧 **Status**: Phase 1 Development - Foundation and MCP core functionality
>
> 📖 **Documentation**: [your-username.github.io/agents-cli](https://your-username.github.io/agents-cli)

## What is Agents CLI?

Agents CLI enables agentic IDEs (Cursor, VS Code, etc.) to dynamically create and execute sophisticated multi-agent workflows. Define agents, tools, and orchestration patterns through JSON configuration and receive structured outputs optimized for IDE consumption.

### Key Features

- 🔄 **Dual Interface**: CLI and MCP server modes for flexible integration
- ⚙️ **Configuration-Driven**: JSON-based agent and workflow definitions
- 🔒 **Security-First**: Built-in sandboxing and access controls
- 💻 **IDE-Optimized**: Real-time streaming and structured outputs
- 🧩 **Extensible**: Plugin architecture for custom tools and workflows

## Quick Start *(Coming Soon)*

```bash
# Install globally
npm install -g agents-cli

# Execute a workflow
agents-cli run --config examples/code-review.json --input "Review this code"

# Start MCP server for IDE integration
agents-cli serve --port 3000
```

## Example Usage

### Code Review Workflow
```bash
agents-cli run \
  --config examples/code-review.json \
  --input "Review this pull request for security issues" \
  --files "src/**/*.ts" \
  --output review-results.json
```

### Architecture Analysis
```bash
agents-cli run \
  --config examples/architecture-review.json \
  --input "Analyze the system architecture" \
  --context project-root/
```

### MCP Server Mode
```bash
# Start server for IDE integration
agents-cli serve \
  --config server-config.json \
  --port 3000 \
  --protocols mcp,http
```

## Configuration Example

```json
{
  "agents": {
    "code_reviewer": {
      "name": "Senior Code Reviewer",
      "instructions": "Review code for bugs, performance, and best practices",
      "model": "gpt-4o",
      "tools": ["file_operations", "git_tools"],
      "guardrails": ["no_destructive_operations"],
      "handoffs": ["security_reviewer", "architect"]
    },
    "security_reviewer": {
      "name": "Security Expert",
      "instructions": "Focus on security vulnerabilities and best practices",
      "model": "gpt-4o",
      "tools": ["security_scanner", "file_operations"],
      "handoffs": ["code_reviewer"]
    }
  },
  "workflow": {
    "entry_point": "code_reviewer",
    "pattern": "handoff_chain",
    "max_turns": 10,
    "timeout": 300
  }
}
```

## Documentation

📖 **[Complete Documentation](https://your-username.github.io/agents-cli)**

### Quick Links
- [Installation Guide](https://your-username.github.io/agents-cli/getting-started/installation)
- [IDE Integration](https://your-username.github.io/agents-cli/guides/ide-integration)
- [Configuration Reference](https://your-username.github.io/agents-cli/api/configuration-schema)
- [Example Workflows](https://your-username.github.io/agents-cli/examples/)

### Architecture & Development
- [OpenAI Agents SDK Guide](AGENTS.md)
- [Product Requirements](docs/PRD.md)
- [Phase 0 Tasks](docs/tasks/phase0.md) - Repository foundation
- [Phase 1 Tasks](docs/tasks/phase1.md) - Core development

## Contributing

We welcome contributions! This is an open source project under MIT license.

🛠️ **Development Setup**
```bash
git clone https://github.com/your-username/agents-cli.git
cd agents-cli
npm install
npm test
npm run dev
```

📋 **Contributing Guidelines**
- [Development Setup](https://your-username.github.io/agents-cli/contributing/development-setup)
- [Architecture Overview](https://your-username.github.io/agents-cli/contributing/architecture)
- [Phase Task Breakdown](https://your-username.github.io/agents-cli/contributing/phase-roadmap)
- [Contributing Guide](CONTRIBUTING.md)

## Project Status & Roadmap

**Current Phase**: Foundation + MCP Core (Phase 1)

| Component | Status | Description |
|-----------|--------|-------------|
| ✅ Repository Setup | Complete | Open source foundation, documentation |
| 🚧 Configuration System | In Progress | JSON schema validation with Zod |
| 🚧 MCP Server | In Progress | Model Context Protocol implementation |
| ⏳ CLI Interface | Planned | Command-line workflow execution |
| ⏳ OpenAI SDK Integration | Planned | Agent creation and orchestration |
| ⏳ Security Framework | Planned | Tool sandboxing and access controls |

[View detailed progress →](https://your-username.github.io/agents-cli/contributing/phase-roadmap)

### Upcoming Phases
- **Phase 2**: Advanced tool integrations and parallel workflow patterns
- **Phase 3**: Production features, performance optimization
- **Phase 4**: Workflow templates and community ecosystem

## IDE Integration

Agents CLI integrates with various IDEs through multiple interfaces:

| IDE | Integration | Status |
|-----|-------------|--------|
| Cursor | MCP Protocol | Phase 1 |
| VS Code | MCP + Extension | Phase 1 |
| JetBrains | CLI Plugin | Phase 2 |
| GitHub Copilot | CLI + JSON | Phase 2 |

## License

MIT License - see [LICENSE](LICENSE) for details.

## Security

Security is a core focus. See our [Security Policy](SECURITY.md) for:
- Vulnerability reporting process
- Security considerations for multi-agent workflows
- Safe tool execution and credential management

## Support

- 📖 [Documentation](https://your-username.github.io/agents-cli)
- 🐛 [Report Issues](https://github.com/your-username/agents-cli/issues)
- 💬 [GitHub Discussions](https://github.com/your-username/agents-cli/discussions)
- 🤝 [Contributing Guide](CONTRIBUTING.md)

---

*Built with [OpenAI Agents SDK](https://openai.github.io/openai-agents-js/) • Optimized for agentic IDEs • Open source under MIT license*