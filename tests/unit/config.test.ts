/**
 * Configuration schema tests
 */

import type {
  AgentConfig,
  WorkflowConfig,
  Configuration,
} from '@/config/schema';

describe('Configuration Schema', () => {
  it('should define AgentConfig interface', () => {
    const config: AgentConfig = {
      name: 'Test Agent',
      instructions: 'Test instructions',
      model: 'gpt-4o',
      tools: ['file_operations'],
      guardrails: ['no_destructive_operations'],
      handoffs: ['security_reviewer'],
    };

    expect(config.name).toBe('Test Agent');
    expect(config.instructions).toBe('Test instructions');
  });

  it('should define WorkflowConfig interface', () => {
    const config: WorkflowConfig = {
      entry_point: 'test_agent',
      pattern: 'handoff_chain',
      max_turns: 10,
      timeout: 300,
    };

    expect(config.entry_point).toBe('test_agent');
    expect(config.pattern).toBe('handoff_chain');
  });

  it('should define Configuration interface', () => {
    const config: Configuration = {
      agents: {
        test_agent: {
          name: 'Test Agent',
          instructions: 'Test instructions',
        },
      },
      workflow: {
        entry_point: 'test_agent',
        pattern: 'handoff_chain',
      },
    };

    expect(config.agents['test_agent']?.name).toBe('Test Agent');
    expect(config.workflow.entry_point).toBe('test_agent');
  });
});
