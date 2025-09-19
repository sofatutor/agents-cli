/**
 * Custom error classes
 */

export class AgentsCliError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AgentsCliError';
  }
}

export class ConfigurationError extends AgentsCliError {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

export class ExecutionError extends AgentsCliError {
  constructor(message: string) {
    super(message);
    this.name = 'ExecutionError';
  }
}
