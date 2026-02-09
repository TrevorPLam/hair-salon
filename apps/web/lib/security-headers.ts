/**
 * @file apps/web/lib/security-headers.ts
 * @role runtime
 * @summary OWASP-inspired security headers configuration.
 *
 * @entrypoints
 * - securityHeaders
 * - getSecurityHeaders
 *
 * @exports
 * - securityHeaders
 * - getSecurityHeaders
 *
 * @depends_on
 * - None
 *
 * @used_by
 * - apps/web/middleware.ts
 *
 * @runtime
 * - environment: server/edge
 * - side_effects: none
 *
 * @invariants
 * - HSTS should only be enabled in production
 *
 * @issues
 * - [severity:low] None observed in-file.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

export const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': ['camera=()', 'microphone=()', 'geolocation=()', 'interest-cohort=()'].join(
    ', '
  ),

  ...(process.env.NODE_ENV === 'production' && {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  }),

  'X-DNS-Prefetch-Control': 'on',
  'X-Download-Options': 'noopen',
  'X-Permitted-Cross-Domain-Policies': 'none',
} as Record<string, string>;

export function getSecurityHeaders(env: 'development' | 'production' = 'production') {
  const headers = { ...securityHeaders };

  return headers;
}
