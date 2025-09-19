# Example Workflows

This directory contains example workflow configurations for common use cases.

*Examples will be added during Phase 1 development*

## Planned Examples

- `code-review.json` - Code review workflow with security analysis
- `architecture-review.json` - System architecture analysis
- `simple.json` - Minimal single-agent example
- `parallel-workflow.json` - Parallel agent processing example

## Usage

```bash
# Validate an example configuration
agents-cli validate --config examples/code-review.json

# Run an example workflow
agents-cli run --config examples/code-review.json --input "Review this code"
```

## Creating Custom Workflows

See [Configuration Reference](../docs/api/configuration-schema.md) for detailed documentation on creating custom workflows.