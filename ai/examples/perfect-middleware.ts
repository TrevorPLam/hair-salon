/**
 * @ai-pattern Middleware Pattern
 * @ai-security Input Validated
 * @ai-performance Server Only
 * @ai-tests Required
 * @ai-reference /ai/patterns/middleware-pattern.md
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Rate limiting middleware factory
export function createRateLimitMiddleware(options: {
  windowMs: number
  maxRequests: number
}) {
  const requests = new Map<string, { count: number; resetTime: number }>()

  return function rateLimit(request: NextRequest) {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const now = Date.now()
    const windowStart = now - options.windowMs

    // Clean old entries
    for (const [key, data] of requests.entries()) {
      if (data.resetTime < now) {
        requests.delete(key)
      }
    }

    // Check current requests
    const current = requests.get(ip)
    
    if (!current) {
      requests.set(ip, { count: 1, resetTime: now + options.windowMs })
      return NextResponse.next()
    }

    if (current.count >= options.maxRequests) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }

    current.count++
    return NextResponse.next()
  }
}

// Authentication middleware factory
export function createAuthMiddleware(options: {
  required?: boolean
  roles?: string[]
}) {
  return function auth(request: NextRequest) {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token && options.required) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    if (!token) {
      // Attach empty user context for optional auth
      const response = NextResponse.next()
      response.headers.set('x-user-id', 'anonymous')
      return response
    }

    try {
      // Verify JWT token (simplified for example)
      const payload = verifyJWT(token)
      
      if (options.roles && !options.roles.includes(payload.role)) {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        )
      }

      const response = NextResponse.next()
      response.headers.set('x-user-id', payload.userId)
      response.headers.set('x-user-role', payload.role)
      return response
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }
  }
}

// Request validation middleware factory
export function createValidationMiddleware<T>(schema: z.ZodSchema<T>) {
  return function validate(request: NextRequest) {
    try {
      if (request.method === 'GET') {
        const url = new URL(request.url)
        const query = Object.fromEntries(url.searchParams)
        schema.parse(query)
      } else {
        const body = request.json()
        schema.parse(body)
      }
      
      return NextResponse.next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { 
            error: 'Validation failed',
            details: error.errors
          },
          { status: 400 }
        )
      }
      
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      )
    }
  }
}

// Security headers middleware factory
export function createSecurityHeadersMiddleware(options: {
  csp?: Record<string, string[]>
  hsts?: boolean
} = {}) {
  return function securityHeaders(request: NextRequest) {
    const response = NextResponse.next()
    
    // Content Security Policy
    if (options.csp) {
      const csp = Object.entries(options.csp)
        .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
        .join('; ')
      response.headers.set('Content-Security-Policy', csp)
    }
    
    // Security headers
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    
    // HSTS
    if (options.hsts) {
      response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
    }
    
    return response
  }
}

// CORS middleware factory
export function createCorsMiddleware(options: {
  origins?: string[]
  methods?: string[]
  credentials?: boolean
} = {}) {
  return function cors(request: NextRequest) {
    const response = NextResponse.next()
    
    const origin = request.headers.get('origin')
    const allowedOrigins = options.origins || ['*']
    
    if (allowedOrigins.includes('*') || (origin && allowedOrigins.includes(origin))) {
      response.headers.set('Access-Control-Allow-Origin', origin || '*')
    }
    
    if (options.methods) {
      response.headers.set('Access-Control-Allow-Methods', options.methods.join(', '))
    }
    
    if (options.credentials) {
      response.headers.set('Access-Control-Allow-Credentials', 'true')
    }
    
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    
    return response
  }
}

// Error handling middleware factory
export function createErrorHandlingMiddleware(options: {
  logErrors?: boolean
  includeStackTrace?: boolean
} = {}) {
  return function errorHandler(request: NextRequest) {
    // This middleware would typically wrap the entire request handling
    // For simplicity, we'll just set up error handling
    const response = NextResponse.next()
    
    // Add error handling to response
    if (options.logErrors) {
      // Set up error logging
      response.headers.set('x-error-logging', 'enabled')
    }
    
    return response
  }
}

// Compose multiple middleware
export function composeMiddleware(...middleware: Function[]) {
  return async function composed(request: NextRequest) {
    for (const mw of middleware) {
      const result = await mw(request)
      if (result) return result
    }
    return NextResponse.next()
  }
}

// Helper function for JWT verification (simplified)
function verifyJWT(token: string): { userId: string; role: string } {
  // In a real implementation, this would verify the JWT signature
  // and decode the payload
  try {
    // Simplified JWT verification for example
    const payload = JSON.parse(atob(token.split('.')[1]))
    return {
      userId: payload.sub,
      role: payload.role,
    }
  } catch (error) {
    throw new Error('Invalid JWT token')
  }
}

// Example usage:
export const rateLimitMiddleware = createRateLimitMiddleware({
  windowMs: 60000, // 1 minute
  maxRequests: 10,
})

export const authMiddleware = createAuthMiddleware({
  required: true,
  roles: ['admin', 'staff'],
})

export const validationMiddleware = createValidationMiddleware(
  z.object({
    name: z.string().min(1),
    email: z.string().email(),
  })
)

export const securityMiddleware = createSecurityHeadersMiddleware({
  csp: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'"],
    'style-src': ["'self'", "'unsafe-inline'"],
  },
  hsts: true,
})

export const corsMiddleware = createCorsMiddleware({
  origins: ['https://salon.com', 'https://www.salon.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
})
