---
layout: default
title: Agents CLI - Multi-Agent Workflows for IDEs
description: Open source workflow engine enabling agentic IDEs to execute sophisticated multi-agent workflows
---

# Agents CLI

**Multi-agent workflow engine for agentic IDEs using OpenAI Agents SDK**

[![CI](https://github.com/sofatutor/agents-cli/workflows/CI/badge.svg)](https://github.com/sofatutor/agents-cli/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Documentation](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://sofatutor.github.io/agents-cli)

## 🚀 What is Agents CLI?

Agents CLI transforms your IDE into a **multi-layered multi-agent orchestration platform**. Beyond simple AI assistance, it enables the creation of complex agent ecosystems where specialized AI agents collaborate, coordinate, and evolve together to solve sophisticated problems.

**Think of it as turning your development environment into a living, breathing AI organization** - where each agent has specific expertise, agents can dynamically spawn other agents, and the collective intelligence emerges from their interactions.

## 📋 Current Status: Phase 1 Development

We're currently implementing the foundation and core MCP functionality.
[View detailed progress →](contributing/phase-roadmap)

## 🧠 Multi-Agent System Capabilities

### 🏗️ **Hierarchical Agent Networks**
Create layered agent architectures where manager agents coordinate specialist teams, enabling complex problem decomposition and parallel processing.

### 🔄 **Emergent Intelligence Patterns**
- **Peer-to-peer collaboration**: Agents that debate, fact-check, and improve each other's work
- **Swarm intelligence**: Multiple agents working on different aspects simultaneously
- **Self-organizing workflows**: Agents that dynamically restructure based on task complexity
- **Collective learning**: Agent networks that improve through shared experiences

### 🌐 **Real-World Applications**

**🔍 Research & Analysis Network**
```
Research Coordinator → [Web Researcher, Academic Researcher, Market Analyst]
                    ↓
Data Synthesizer → [Fact Checker, Citation Validator, Summary Generator]
                ↓
Report Generator → [Technical Writer, Visual Designer, Quality Reviewer]
```

**🏢 Enterprise Software Development**
```
Project Manager Agent → [Requirements Analyst, Solution Architect]
                     ↓
Development Orchestrator → [Backend Dev, Frontend Dev, DevOps, Tester]
                        ↓
Code Quality Network → [Security Auditor, Performance Optimizer, Documentation Generator]
```

**🎓 Educational Content Creation**
```
Learning Objectives Designer → [Subject Matter Expert, Pedagogical Specialist]
                            ↓
Content Production Team → [Writer, Interactive Designer, Assessment Creator]
                       ↓
Quality Assurance Network → [Accessibility Checker, Learning Effectiveness Validator]
```

## 🎯 Core Technical Features

- **Multi-Layer Orchestration**: Hierarchical and peer-to-peer agent coordination
- **Dynamic Agent Spawning**: Agents can create specialized sub-agents on demand
- **Emergent Behavior Monitoring**: Track how agent interactions create unexpected solutions
- **Cross-Agent Memory**: Shared knowledge bases and learning from collective experiences
- **Adaptive Workflows**: Self-modifying processes based on success patterns
- **Real-time Collaboration**: Live agent-to-agent communication and handoffs

## 🔗 Quick Links

- [Installation Guide](getting-started/installation) *(Coming Soon)*
- [IDE Integration](guides/ide-integration)
- [Configuration Reference](api/configuration-schema)
- [Example Workflows](examples/)
- [Contributing Guide](contributing/development-setup)

## ⚡ Emergent Properties in Action

When multiple specialized agents interact, something remarkable happens - **emergent intelligence** that exceeds the sum of its parts:

### 🌟 **Example: Self-Improving Code Review Network**

```bash
# Simple command that triggers complex multi-agent behavior
agents-cli run --config networks/code-review-network.json \
  --input "Optimize this codebase for production"
```

**What happens behind the scenes:**
1. **Analysis Agent** identifies performance bottlenecks
2. **Security Agent** discovers potential vulnerabilities
3. **Architecture Agent** suggests structural improvements
4. **Learning Agent** notices patterns from previous reviews
5. **Coordinator Agent** synthesizes insights and creates optimization plan
6. **Implementation Agents** execute changes in parallel
7. **Validation Network** tests, benchmarks, and validates changes

**The Emergent Magic:** The network discovers optimization strategies that no single agent would have found, learns from each review to improve future performance, and adapts its approach based on codebase characteristics.

### 🚀 **Advanced Multi-Layer Example**

```bash
# Deploy a complete AI-powered development team
agents-cli network deploy --config networks/dev-team.json
agents-cli network scale --agents 50 --auto-spawn
```

This creates a **living development ecosystem** where:
- Agents form temporary collaboration groups for specific features
- Senior agents mentor junior agents, improving the overall skill level
- The network self-organizes based on project complexity and deadlines
- Emergent patterns like "design patterns" evolve naturally from agent interactions
- The system develops its own "culture" and coding standards through collective behavior

## 🏗️ Quick Start Examples

```bash
# Simple single-agent task
agents-cli run --config examples/code-review.json \
  --input "Review this pull request" \
  --files "src/**/*.ts"

# Multi-agent network orchestration
agents-cli network start --config networks/research-collective.json

# IDE integration with real-time agent collaboration
agents-cli serve --port 3000 --enable-network-mode
```

## 🤝 Contributing

We welcome contributions! This is an open source project under MIT license.

- [Development Setup](contributing/development-setup)
- [Architecture Overview](contributing/architecture)
- [Phase Task Breakdown](contributing/phase-roadmap)

## 📄 License

MIT License - see [LICENSE](https://github.com/sofatutor/agents-cli/blob/main/LICENSE)