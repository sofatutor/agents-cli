/**
 * Configuration validator
 * Implementation planned for Phase 1.2
 */

import type { Configuration } from './schema.js';

export class ConfigValidator {
  // eslint-disable-next-line no-unused-vars
  static validate(_config: Configuration): boolean {
    throw new Error('Configuration validation not yet implemented - Phase 1.2');
  }
}
