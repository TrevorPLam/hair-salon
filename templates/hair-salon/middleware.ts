/**
 * @file templates/hair-salon/middleware.ts
 * @role runtime
 * @summary Middleware applying CSP nonce and security headers.
 *
 * @entrypoints
 * - middleware
 * - config
 *
 * @exports
 * - middleware
 * - config
 *
 * @depends_on
 * - External: next/server (NextRequest, NextResponse)
 * - Internal: @/lib/csp
 * - Internal: @/lib/security-headers
 *
 * @used_by
 * - Next.js edge middleware pipeline
 *
 * @runtime
 * - environment: edge
 * - side_effects: response header mutation
 *
 * @issues
 * - [severity:low] None observed in-file.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { buildContentSecurityPolicy, CSP_NONCE_HEADER, createCspNonce } from '@/lib/csp';
import { getSecurityHeaders } from '@/lib/security-headers';

export function middleware(request: NextRequest) {
  const nonce = createCspNonce();
  const isDevelopment = process.env.NODE_ENV !== 'production';
  const csp = buildContentSecurityPolicy({ nonce, isDevelopment });

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(CSP_NONCE_HEADER, nonce);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set('Content-Security-Policy', csp);

  const securityHeaders = getSecurityHeaders(isDevelopment ? 'development' : 'production');
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon-192.png|icon-512.png|apple-touch-icon.png).*)',
  ],
};
