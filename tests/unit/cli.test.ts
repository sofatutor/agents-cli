/**
 * CLI tests
 */

import { program } from '@/cli/cli';

describe('CLI', () => {
  it('should have correct program name', () => {
    expect(program.name()).toBe('agents-cli');
  });

  it('should have correct description', () => {
    expect(program.description()).toBe(
      'Multi-agent workflow engine for agentic IDEs'
    );
  });

  it('should have correct version', () => {
    expect(program.version()).toBe('0.1.0');
  });
});
