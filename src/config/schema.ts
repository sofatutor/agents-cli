/**
 * Configuration schema types
 * Implementation planned for Phase 1.2 (Schema Design & Validation)
 */

export interface AgentConfig {
  name: string;
  instructions: string;
  model?: string;
  tools?: string[];
  guardrails?: string[];
  handoffs?: string[];
}

export interface WorkflowConfig {
  entry_point: string;
  pattern: 'handoff_chain' | 'parallel' | 'sequential';
  max_turns?: number;
  timeout?: number;
}

export interface Configuration {
  agents: Record<string, AgentConfig>;
  workflow: WorkflowConfig;
}
