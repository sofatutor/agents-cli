/**
 * MCP types
 * Implementation planned for Phase 1.4 (MCP Server Implementation)
 */

export interface MCPServerInterface {
  start(): Promise<void>;
  stop(): Promise<void>;
}
