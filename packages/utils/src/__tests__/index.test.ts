/**
 * Smoke tests for @repo/utils exports.
 *
 * Verifies that all public exports are accessible and callable.
 */

import { cn } from '../index'

describe('@repo/utils exports', () => {
  test('cn() is a function', () => {
    expect(typeof cn).toBe('function')
  })

  test('cn() with single class', () => {
    expect(cn('px-4')).toBe('px-4')
  })

  test('cn() merges clsx and tailwind-merge', () => {
    // clsx: conditional classes
    // tailwind-merge: resolves conflicts (px-4 overrides px-2)
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  test('cn() with conditional classes', () => {
    const isActive = true
    const result = cn('base', isActive && 'active')
    expect(result).toBe('base active')
  })

  test('cn() removes falsy values', () => {
    const result = cn('a', false && 'b', undefined, 'c')
    expect(result).toBe('a c')
  })
})
