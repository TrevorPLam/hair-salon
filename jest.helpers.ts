/**
 * @file jest.helpers.ts
 * @role test
 * @summary Shared Jest test utilities for environment and async assertions.
 *
 * @entrypoints
 * - Imported by test files under __tests__
 *
 * @exports
 * - createTestEnv
 * - mockEnv
 * - waitFor
 * - assertThrows
 *
 * @depends_on
 * - External: process.env
 *
 * @used_by
 * - Jest test suites across apps and packages
 *
 * @runtime
 * - environment: test
 * - side_effects: mutates process.env in mockEnv
 *
 * @data_flow
 * - inputs: env overrides, predicates, functions under test
 * - outputs: env snapshots, assertion outcomes
 *
 * @invariants
 * - mockEnv returns cleanup to restore prior env state
 *
 * @gotchas
 * - mockEnv must be cleaned up to avoid cross-test leaks
 *
 * @issues
 * - [severity:low] None observed in-file.
 *
 * @opportunities
 * - Add helper for restoring multiple env vars at once
 *
 * @verification
 * - Run: pnpm test and confirm env helpers isolate state
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

/**
 * Create a test environment variable set for validation testing.
 *
 * @param overrides - Partial env vars to override defaults
 * @returns Full env var object
 */
export function createTestEnv(overrides: Partial<Record<string, string>> = {}) {
  return {
    NODE_ENV: 'test',
    NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
    NEXT_PUBLIC_SITE_NAME: 'Test Salon',
    SUPABASE_URL: 'https://test.supabase.co',
    SUPABASE_SERVICE_ROLE_KEY: 'test-key-123abc',
    HUBSPOT_PRIVATE_APP_TOKEN: 'pat-test-123',
    ...overrides,
  };
}

/**
 * Mock an environment variable for a test.
 *
 * Usage:
 * ```typescript
 * mockEnv('NODE_ENV', 'production')
 * ```
 *
 * @param key - Env var name
 * @param value - Env var value
 * @returns Cleanup function
 */
export function mockEnv(key: string, value: string | undefined) {
  const original = process.env[key];
  if (value === undefined) {
    delete process.env[key];
  } else {
    process.env[key] = value;
  }
  return () => {
    if (original === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = original;
    }
  };
}

/**
 * Wait for an async operation with timeout.
 *
 * @param condition - Function that returns boolean when ready
 * @param timeout - Max ms to wait (default 5000)
 * @returns Promise that resolves when condition is true
 */
export async function waitFor(condition: () => boolean, timeout = 5000): Promise<void> {
  const startTime = Date.now();
  while (!condition()) {
    if (Date.now() - startTime > timeout) {
      throw new Error(`waitFor timeout after ${timeout}ms`);
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

/**
 * Assert that a function throws an error with specific message.
 *
 * Usage:
 * ```typescript
 * await assertThrows(() => myFunc(), 'Expected error message')
 * ```
 *
 * @param fn - Function to call (can be async)
 * @param expectedMessage - Expected error message (substring match)
 */
export async function assertThrows(fn: () => unknown, expectedMessage?: string) {
  let threw = false;
  let error: Error | undefined;

  try {
    const result = fn();
    if (result instanceof Promise) {
      await result;
    }
  } catch (e) {
    threw = true;
    error = e instanceof Error ? e : new Error(String(e));
  }

  if (!threw) {
    throw new Error('Expected function to throw');
  }

  if (expectedMessage && !error?.message.includes(expectedMessage)) {
    throw new Error(
      `Expected error message to include "${expectedMessage}", got "${error?.message}"`
    );
  }
}
