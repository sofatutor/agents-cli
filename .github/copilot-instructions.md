# GitHub Copilot Instructions

## Project Overview

Agents CLI is a multi-agent workflow engine for agentic IDEs built with TypeScript. The project enables IDEs to dynamically create and execute sophisticated multi-agent workflows through JSON configuration. It uses the OpenAI Agents SDK and provides both CLI and MCP (Model Context Protocol) server interfaces.

## Current Status

**Phase 1 Development** - Building foundation and core functionality:
- Basic project structure with TypeScript
- Configuration system with JSON schemas
- MCP server implementation for IDE integration
- OpenAI Agents SDK integration
- Security framework with sandboxing

## Architecture

### Core Components
- **CLI Interface**: Command-line tool using Commander.js
- **MCP Server**: Model Context Protocol server for IDE integration
- **Configuration System**: JSON-based agent and workflow definitions with Zod validation
- **Security Layer**: Tool execution sandboxing and access controls
- **Agent Engine**: OpenAI Agents SDK integration for workflow execution

### Directory Structure
```
src/
├── cli/          # Command-line interface implementation
├── config/       # Configuration loading and validation
├── agents/       # Agent creation and management
├── mcp/          # Model Context Protocol server
└── workflows/    # Workflow execution engine
```

## Coding Standards

### TypeScript Guidelines
- Use strict TypeScript configuration with comprehensive type checking
- Prefer interfaces over type aliases for object shapes
- Use Zod for runtime validation and schema definition
- Include comprehensive JSDoc comments for public APIs
- Export types and interfaces from barrel exports (index.ts files)

### Code Style
- Use ESLint + Prettier for consistent formatting
- Prefer async/await over Promise chains
- Use descriptive variable and function names
- Include error handling for all async operations
- Follow functional programming patterns where appropriate

### Security Requirements
- Never log or expose API keys or sensitive credentials
- Implement proper input validation for all user inputs
- Use sandboxing for tool execution
- Validate file system access restrictions
- Include audit logging for security-sensitive operations

## Key Libraries and Frameworks

### Core Dependencies
- **OpenAI Agents SDK**: Agent creation and orchestration
- **Commander.js**: CLI framework and command parsing
- **Zod**: Schema validation and type inference
- **Model Context Protocol**: IDE integration protocol

### Development Tools
- **TypeScript**: Primary language with strict configuration
- **Jest**: Testing framework with comprehensive coverage
- **ESLint + Prettier**: Code quality and formatting
- **GitHub Actions**: CI/CD pipeline

## Development Patterns

### Configuration Loading
```typescript
// Use Zod schemas for validation
const AgentConfigSchema = z.object({
  name: z.string(),
  instructions: z.string(),
  model: z.string(),
  tools: z.array(z.string())
});

// Validate and parse configuration
const config = AgentConfigSchema.parse(userInput);
```

### Error Handling
```typescript
// Use Result pattern or proper error types
try {
  const result = await riskyOperation();
  return { success: true, data: result };
} catch (error) {
  logger.error('Operation failed', { error });
  return { success: false, error: error.message };
}
```

### MCP Tool Registration
```typescript
// Implement MCP tools with proper typing
interface MCPTool {
  name: string;
  description: string;
  inputSchema: z.ZodSchema;
  handler: (input: unknown) => Promise<unknown>;
}
```

## Testing Strategy

### Test Categories
- **Unit Tests**: Individual components and functions
- **Integration Tests**: CLI → MCP → SDK → Agent workflows
- **Security Tests**: Sandbox effectiveness and credential protection
- **Performance Tests**: Startup time (<2s) and execution time (<30s)

### Test Structure
```typescript
describe('ComponentName', () => {
  beforeEach(() => {
    // Setup test environment
  });

  it('should handle expected case', async () => {
    // Test implementation
  });

  it('should handle error cases gracefully', async () => {
    // Error scenario testing
  });
});
```

## Build and Validation Commands

```bash
# Development setup
npm install
npm run dev

# Code quality
npm run lint
npm run typecheck
npm test

# Build for production
npm run build
```

## IDE Integration Notes

The project is designed to work with:
- **Cursor**: Primary IDE with MCP protocol support
- **VS Code**: MCP extension integration
- **Claude Code**: CLI integration for workflow execution

When implementing MCP server functionality, ensure compatibility with IDE expectations for tool registration, result formatting, and error handling.

## Security Considerations

- All tool execution must go through security validation
- API keys should be loaded from environment variables only
- File system access must respect configured security policies
- Network requests should be validated and logged
- Never commit secrets or API keys to the repository

## Phase 1 Priorities

Focus development on:
1. **CLI Foundation**: Basic command structure and configuration loading
2. **MCP Server**: Core protocol implementation with tool registration
3. **Single Agent Execution**: Basic OpenAI SDK integration
4. **Security Framework**: Safe tool execution with proper sandboxing
5. **Testing Infrastructure**: Comprehensive test coverage

Defer advanced multi-agent workflows, complex orchestration patterns, and performance optimizations to later phases.