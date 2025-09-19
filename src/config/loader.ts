/**
 * Configuration loader
 * Implementation planned for Phase 1.2
 */

import type { Configuration } from './schema.js';

export class ConfigLoader {
  // eslint-disable-next-line no-unused-vars
  static async load(_path: string): Promise<Configuration> {
    throw new Error('Configuration loading not yet implemented - Phase 1.2');
  }
}
