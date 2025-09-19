#!/usr/bin/env node

/**
 * Main CLI entry point
 */

import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
  .name('agents-cli')
  .description('Multi-agent workflow engine for agentic IDEs')
  .version('0.1.0');

program
  .command('run')
  .description('Execute an agent workflow')
  .option('-c, --config <file>', 'Configuration file path')
  .option('-i, --input <text>', 'Input text for the workflow')
  .action((options) => {
    console.log(chalk.blue('🤖 Agents CLI - Run command'));
    console.log('Options:', options);
    console.log(chalk.yellow('⚠️  Implementation coming in Phase 1.2+'));
  });

program
  .command('validate')
  .description('Validate a configuration file')
  .argument('<config>', 'Configuration file to validate')
  .action((config) => {
    console.log(chalk.blue('✅ Agents CLI - Validate command'));
    console.log('Config file:', config);
    console.log(chalk.yellow('⚠️  Implementation coming in Phase 1.2+'));
  });

program
  .command('serve')
  .description('Start MCP server mode')
  .option('-p, --port <number>', 'Port to listen on', '3000')
  .action((options) => {
    console.log(chalk.blue('🚀 Agents CLI - Serve command'));
    console.log('Port:', options.port);
    console.log(chalk.yellow('⚠️  Implementation coming in Phase 1.2+'));
  });

// Export for testing
export { program };

// Run if called directly
if (require.main === module) {
  program.parse();
}
