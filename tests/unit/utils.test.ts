/**
 * Utility tests
 */

import { Logger } from '@/utils/logger';
import {
  AgentsCliError,
  ConfigurationError,
  ExecutionError,
} from '@/utils/errors';
import { isValidUrl, sleep } from '@/utils/helpers';

describe('Logger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should log info messages', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();
    Logger.info('test message');
    expect(spy).toHaveBeenCalledWith('[INFO] test message');
  });

  it('should log warning messages', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    Logger.warn('test warning');
    expect(spy).toHaveBeenCalledWith('[WARN] test warning');
  });

  it('should log error messages', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    Logger.error('test error');
    expect(spy).toHaveBeenCalledWith('[ERROR] test error');
  });
});

describe('Errors', () => {
  it('should create AgentsCliError', () => {
    const error = new AgentsCliError('test error');
    expect(error.name).toBe('AgentsCliError');
    expect(error.message).toBe('test error');
  });

  it('should create ConfigurationError', () => {
    const error = new ConfigurationError('config error');
    expect(error.name).toBe('ConfigurationError');
    expect(error.message).toBe('config error');
  });

  it('should create ExecutionError', () => {
    const error = new ExecutionError('execution error');
    expect(error.name).toBe('ExecutionError');
    expect(error.message).toBe('execution error');
  });
});

describe('Helpers', () => {
  it('should validate URLs correctly', () => {
    expect(isValidUrl('https://example.com')).toBe(true);
    expect(isValidUrl('http://localhost:3000')).toBe(true);
    expect(isValidUrl('invalid-url')).toBe(false);
    expect(isValidUrl('')).toBe(false);
  });

  it('should sleep for specified duration', async () => {
    const start = Date.now();
    await sleep(100);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(90); // Allow some variance
  });
});
