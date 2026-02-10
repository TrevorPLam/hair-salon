/**
 * @file packages/utils/src/__tests__/index.test.ts
 * @role test
 * @summary Smoke tests for @repo/utils exports.
 *
 * @entrypoints
 * - Jest test suite
 *
 * @exports
 * - None
 *
 * @depends_on
 * - Jest
 * - Internal: ../index
 *
 * @used_by
 * - Test runner
 *
 * @runtime
 * - environment: test
 * - side_effects: none
 *
 * @issues
 * - [severity:low] None observed in-file.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

import { cn } from '../index';

describe('@repo/utils exports', () => {
  test('cn() is a function', () => {
    expect(typeof cn).toBe('function');
  });

  test('cn() with single class', () => {
    expect(cn('px-4')).toBe('px-4');
  });

  test('cn() merges clsx and tailwind-merge', () => {
    // clsx: conditional classes
    // tailwind-merge: resolves conflicts (px-4 overrides px-2)
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  test('cn() with conditional classes', () => {
    const isActive = true;
    const result = cn('base', isActive && 'active');
    expect(result).toBe('base active');
  });

  test('cn() removes falsy values', () => {
    const result = cn('a', false && 'b', undefined, 'c');
    expect(result).toBe('a c');
  });
});
