# Security Policy

## Supported Versions

We take security seriously and provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within Agents CLI, please send an email to security@agents-cli.org. All security vulnerabilities will be promptly addressed.

**Please do not report security vulnerabilities through public GitHub issues.**

### What to Include

When reporting a vulnerability, please include:

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Any suggested fixes (if available)

### Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 1 week
- **Status Updates**: Weekly until resolved
- **Resolution**: Depending on severity and complexity

### Security Considerations

Agents CLI handles:
- OpenAI API keys and credentials
- File system access through tools
- Execution of configured workflows
- MCP server connections

We implement security measures including:
- No credential logging or storage
- Configurable access controls and guardrails
- Tool execution sandboxing
- Secure credential management practices

### Responsible Disclosure

We follow responsible disclosure practices:

1. Report received and acknowledged
2. Vulnerability investigated and confirmed
3. Fix developed and tested
4. Security advisory published
5. Fix released and users notified
6. Public disclosure after users have had time to update

Thank you for helping keep Agents CLI and its users safe!