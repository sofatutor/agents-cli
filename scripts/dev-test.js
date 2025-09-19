#!/usr/bin/env node

/**
 * Development utility to test CLI functionality
 */

import { execSync } from 'child_process';
import chalk from 'chalk';

console.log(chalk.blue('🔧 CLI Development Test'));

try {
  // Test build
  console.log(chalk.yellow('\n📦 Building project...'));
  execSync('npm run build', { stdio: 'inherit' });

  // Test CLI commands
  console.log(chalk.yellow('\n🤖 Testing CLI commands...'));
  
  console.log('\n1. Testing help command:');
  execSync('node dist/cli/cli.js --help', { stdio: 'inherit' });

  console.log('\n2. Testing validate command:');
  execSync('node dist/cli/cli.js validate examples/simple.json', { stdio: 'inherit' });

  console.log('\n3. Testing run command:');
  execSync('node dist/cli/cli.js run --config examples/simple.json --input "Hello world"', { stdio: 'inherit' });

  console.log(chalk.green('\n✅ CLI development test completed successfully!'));
} catch (error) {
  console.error(chalk.red('\n❌ CLI development test failed:'), error.message);
  process.exit(1);
}