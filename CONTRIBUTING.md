# Contributing to Agents CLI

Thank you for your interest in contributing to Agents CLI! This document provides guidelines for contributing to our open source multi-agent workflow engine.

## 🚀 Getting Started

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/agents-cli.git
   cd agents-cli
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run tests**
   ```bash
   npm test
   ```

4. **Start development**
   ```bash
   npm run dev
   ```

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key for testing (use test key with low quota)

## 📋 Development Process

### Phase-Based Development

This project follows a structured phase approach:

- **[Phase 0](docs/tasks/phase0.md)**: Repository & Documentation Foundation
- **[Phase 1](docs/tasks/phase1.md)**: Core Development Foundation
- **Future Phases**: Advanced features and integrations

Follow the task breakdown in `docs/tasks/` for structured development.

### Branching Strategy

- `main`: Stable releases and production-ready code
- `feature/task-name`: Feature development branches
- `fix/issue-description`: Bug fix branches
- `docs/update-name`: Documentation updates

### Development Guidelines

1. **Security First**: All changes must consider security implications
   - No credential logging or exposure
   - Validate all inputs and configurations
   - Follow principle of least privilege for tool access

2. **Test-Driven Development**:
   - Write tests before implementing features
   - Maintain >80% code coverage
   - Include both unit and integration tests

3. **Code Quality**:
   - Follow TypeScript strict mode
   - Use ESLint and Prettier configurations
   - Write clear, self-documenting code
   - Add comprehensive JSDoc comments

4. **MCP Protocol Compliance**:
   - Follow MCP specification exactly
   - Test IDE integration scenarios
   - Maintain backward compatibility

## 🛠️ Contribution Types

### Code Contributions

- **New Features**: Implement tasks from phase documentation
- **Bug Fixes**: Address reported issues and edge cases
- **Performance**: Optimize workflow execution and tool performance
- **Integration**: Add new tool integrations and IDE support

### Documentation

- **API Documentation**: Keep inline docs and schemas updated
- **User Guides**: Create examples and integration tutorials
- **Developer Docs**: Document architecture and extension points

### Testing

- **Unit Tests**: Test individual components and functions
- **Integration Tests**: Test full workflow execution
- **Security Tests**: Validate security controls and access restrictions
- **Performance Tests**: Benchmark and validate performance requirements

## 📝 Pull Request Process

### Before Submitting

1. **Check Phase Alignment**: Ensure changes align with current phase goals
2. **Run Full Test Suite**: All tests must pass locally
3. **Security Review**: Consider security implications of changes
4. **Documentation**: Update relevant documentation

### PR Requirements

- **Clear Description**: Explain what changes and why
- **Test Coverage**: Include or update tests for changes
- **Breaking Changes**: Clearly document any breaking changes
- **Performance Impact**: Note any performance implications

### Review Process

1. **Automated Checks**: CI tests must pass
2. **Security Review**: Security-sensitive changes get extra review
3. **Architecture Review**: Structural changes reviewed by maintainers
4. **Community Feedback**: Community input welcomed on major features

## 🏗️ Architecture Guidelines

### Core Principles

- **Modularity**: Keep components loosely coupled
- **Extensibility**: Design for future tool and workflow extensions
- **Security**: Implement defense in depth
- **Performance**: Target <3s startup, <30s workflow execution

### Technology Choices

- **TypeScript**: Strict mode for type safety
- **Zod**: Runtime schema validation
- **Commander.js**: CLI framework
- **OpenAI Agents SDK**: Core agent functionality
- **Jest**: Testing framework

### Code Organization

```
src/
├── cli/           # Command-line interface
├── config/        # Configuration and schema validation
├── agents/        # Agent creation and management
├── mcp/           # MCP server implementation
├── tools/         # Built-in and custom tools
├── security/      # Security policies and sandboxing
├── workflows/     # Workflow orchestration
└── utils/         # Shared utilities
```

## 🔒 Security Guidelines

### Sensitive Data

- Never commit API keys, tokens, or credentials
- Use environment variables for configuration
- Implement proper credential redaction in logs
- Follow secure coding practices

### Tool Security

- All tools must implement access controls
- Validate all user inputs and configurations
- Implement resource limits and timeouts
- Audit tool execution and file access

## 🐛 Reporting Issues

### Bug Reports

Use our bug report template and include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node version, etc.)
- Relevant logs (with credentials redacted)

### Feature Requests

- Check existing issues and phase documentation first
- Provide clear use case and rationale
- Consider implementation complexity and phase alignment
- Include examples and potential API designs

### Security Vulnerabilities

**Do not report security issues publicly**. See [SECURITY.md](SECURITY.md) for our responsible disclosure process.

## 📚 Resources

- **[Project PRD](docs/PRD.md)**: Product requirements and vision
- **[Phase Documentation](docs/tasks/)**: Detailed implementation phases
- **[OpenAI Agents SDK](AGENTS.md)**: SDK knowledge base and examples
- **[MCP Protocol](https://spec.modelcontextprotocol.io/)**: Model Context Protocol specification

## 🤝 Community

### Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Be respectful, collaborative, and constructive in all interactions.

### Getting Help

- **GitHub Issues**: For bugs and feature discussions
- **GitHub Discussions**: For general questions and community chat
- **Documentation**: Check docs first for common questions

### Recognition

Contributors are recognized in:
- Git commit history and blame
- Release notes for significant contributions
- Community highlights for exceptional contributions

---

## 🎯 Quick Checklist for Contributors

- [ ] Read relevant phase documentation
- [ ] Set up development environment
- [ ] Write tests for changes
- [ ] Follow security best practices
- [ ] Update documentation as needed
- [ ] Test locally before submitting PR
- [ ] Use clear, descriptive commit messages

Welcome to the Agents CLI community! We're excited to work with you to build the future of agentic IDE workflows. 🚀