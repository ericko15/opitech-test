import { describe, it, expect } from 'vitest';
import { env } from './env';

describe('env', () => {
  it('should have apiBaseUrl defined', () => {
    expect(env.apiBaseUrl).toBeDefined();
    expect(typeof env.apiBaseUrl).toBe('string');
  });

  it('should use default value when env not set', () => {
    expect(env.apiBaseUrl).toBe('https://dummyjson.com');
  });
});
