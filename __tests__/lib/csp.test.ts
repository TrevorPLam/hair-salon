import { describe, expect, it } from 'vitest'
import {
  buildContentSecurityPolicy,
  createCspNonce,
} from '@/lib/csp'

function getScriptDirective(csp: string): string | undefined {
  return csp.split('; ').find((directive) => directive.startsWith('script-src'))
}

describe('createCspNonce', () => {
  it('creates a base64 nonce', () => {
    const nonce = createCspNonce()

    expect(nonce.length).toBeGreaterThan(0)
    expect(nonce).toMatch(/^[A-Za-z0-9+/]+=*$/)
  })

  it('throws when crypto is unavailable', () => {
    const originalCrypto = globalThis.crypto

    Object.defineProperty(globalThis, 'crypto', {
      value: undefined,
      configurable: true,
    })

    try {
      expect(() => createCspNonce()).toThrow('Crypto.getRandomValues')
    } finally {
      Object.defineProperty(globalThis, 'crypto', {
        value: originalCrypto,
        configurable: true,
      })
    }
  })
})

describe('buildContentSecurityPolicy', () => {
  it('includes nonce and GA4 domains in production', () => {
    const nonce = 'prod-nonce'
    const csp = buildContentSecurityPolicy({ nonce, isDevelopment: false })
    const scriptDirective = getScriptDirective(csp)

    expect(scriptDirective).toBe(
      "script-src 'self' 'nonce-prod-nonce' https://www.googletagmanager.com"
    )
    expect(csp).toContain('https://www.google-analytics.com')
  })

  it('adds unsafe-eval in development', () => {
    const csp = buildContentSecurityPolicy({ nonce: 'dev-nonce', isDevelopment: true })
    const scriptDirective = getScriptDirective(csp)

    expect(scriptDirective).toContain("'unsafe-eval'")
  })

  it('handles large nonce values', () => {
    const nonce = 'a'.repeat(256)
    const csp = buildContentSecurityPolicy({ nonce, isDevelopment: false })
    const scriptDirective = getScriptDirective(csp)

    expect(scriptDirective).toContain(`'nonce-${nonce}'`)
  })

  it('throws on empty nonce', () => {
    expect(() =>
      buildContentSecurityPolicy({ nonce: '', isDevelopment: false })
    ).toThrow('CSP nonce must be a non-empty string.')
  })
})
