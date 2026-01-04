import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Clone the response
  const response = NextResponse.next()

  // Security Headers
  const headers = response.headers

  // Content Security Policy (CSP)
  // Note: Next.js runtime requires 'unsafe-inline' for scripts/styles and 'unsafe-eval'
  // for certain tooling/dev scenarios. See SECURITY.md for rationale and hardening plan.
  headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Next.js runtime + dev tooling
      "style-src 'self' 'unsafe-inline'", // Tailwind injects styles at runtime
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self'", // Block external data exfiltration by default
      "frame-ancestors 'none'", // Disallow clickjacking via iframes
    ].join('; ')
  )

  // Prevent clickjacking in legacy browsers that don't honor CSP frame-ancestors
  headers.set('X-Frame-Options', 'DENY')

  // Prevent MIME sniffing and content-type confusion
  headers.set('X-Content-Type-Options', 'nosniff')

  // Enable XSS protection in legacy browsers (no effect in modern Chromium)
  headers.set('X-XSS-Protection', '1; mode=block')

  // Limit referrer information to origin on cross-site navigations
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Permissions policy (disable unnecessary browser features)
  headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  )

  // Strict Transport Security (HTTPS only) - enforce TLS in production
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
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
