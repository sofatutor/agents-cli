---
layout: default
title: Installation Guide
description: How to install and set up Agents CLI
---

# Installation Guide

*Coming Soon - Available after Phase 1 completion*

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- OpenAI API key

## Installation Methods

### npm (Recommended)
```bash
# Global installation
npm install -g agents-cli

# Project-specific installation
npm install agents-cli
```

### From Source
```bash
git clone https://github.com/your-username/agents-cli.git
cd agents-cli
npm install
npm run build
npm link
```

## Initial Setup

1. **Configure API Keys**
   ```bash
   export OPENAI_API_KEY="your-api-key"
   ```

2. **Verify Installation**
   ```bash
   agents-cli --version
   agents-cli --help
   ```

3. **Test with Example**
   ```bash
   agents-cli validate --config examples/simple.json
   ```

## IDE Integration

See [IDE Integration Guide](../guides/ide-integration.md) for IDE-specific setup instructions.

## Next Steps

- [Quick Start Guide](quick-start.md)
- [Configuration Guide](configuration.md)
- [Example Workflows](../examples/)