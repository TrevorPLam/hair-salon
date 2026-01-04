import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const MAX_BODY_SIZE_BYTES = 1024 * 1024 // 1MB payload limit for POST requests

export function middleware(request: NextRequest) {
  // Clone the response
  const response = NextResponse.next()

  // Block oversized payloads early to reduce DoS risk.
  if (request.method === 'POST') {
    const contentLength = request.headers.get('content-length')
    if (contentLength && Number(contentLength) > MAX_BODY_SIZE_BYTES) {
      return new NextResponse('Payload too large', { status: 413 })
    }
  }

  // Security Headers
  const headers = response.headers

  // Content Security Policy:
  // - 'unsafe-inline' is required for Next.js runtime and Tailwind style injection.
  // - 'unsafe-eval' is required for Next.js dev tooling (source maps) and some bundler eval usage.
  // TODO: Tighten CSP with nonces/hashes when feasible.
  headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join('; ')
  )

  // Prevent clickjacking in iframes.
  headers.set('X-Frame-Options', 'DENY')

  // Prevent MIME sniffing (forces declared content types).
  headers.set('X-Content-Type-Options', 'nosniff')

  // Enable XSS protection for legacy browsers.
  headers.set('X-XSS-Protection', '1; mode=block')

  // Reduce referrer leakage across origins.
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Disable unnecessary browser features (privacy hardening).
  headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  )

  // Enforce HTTPS in production (HSTS).
  if (process.env.NODE_ENV === 'production') {
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  }

  return response
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
