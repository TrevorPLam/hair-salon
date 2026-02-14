# Middleware Pattern

## Problem It Solves

Inline middleware in route handlers creates code duplication, makes testing difficult, and violates single responsibility. The middleware factory pattern provides reusable, composable request processing.

## When to Use

- Authentication/authorization logic
- Request validation and sanitization
- Rate limiting and security checks
- Logging and monitoring
- CORS and CSP headers

## When NOT to Use

- For business logic specific to a single route
- For simple one-off transformations
- When Next.js built-in middleware suffices

## Required Constraints

1. **Location**: All middleware in `lib/middleware/`
2. **Factory Pattern**: Must export a factory function
3. **Type Safety**: Must use Next.js middleware types
4. **Error Handling**: Must handle errors gracefully
5. **Testing**: Must be unit testable in isolation

## Example Implementation

```typescript
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
      // Verify JWT token
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
```

## Usage in API Routes

```typescript
// pages/api/appointments.ts
import { createRateLimitMiddleware, createAuthMiddleware, createValidationMiddleware } from '@/lib/middleware'
import { z } from 'zod'

const AppointmentSchema = z.object({
  serviceId: z.string(),
  dateTime: z.string().datetime(),
  customerInfo: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
  }),
})

export default async function handler(req: NextRequest) {
  // Apply middleware
  const rateLimit = createRateLimitMiddleware({ windowMs: 60000, maxRequests: 10 })
  const auth = createAuthMiddleware({ required: true })
  const validate = createValidationMiddleware(AppointmentSchema)

  const rateLimitResult = rateLimit(req)
  if (rateLimitResult) return rateLimitResult

  const authResult = auth(req)
  if (authResult) return authResult

  const validationResult = validate(req)
  if (validationResult) return validationResult

  // Business logic here
  const userId = req.headers.get('x-user-id')
  // ... process appointment
}
```

## Anti-Pattern Example

```typescript
// ❌ WRONG - Inline middleware in route handler
export default async function handler(req: NextRequest) {
  // Rate limiting mixed with business logic
  const ip = req.ip
  const requests = global.rateLimit?.get(ip) || 0
  
  if (requests > 10) {
    return res.status(429).json({ error: 'Too many requests' })
  }
  
  // Authentication mixed with business logic
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) {
    return res.status(401).json({ error: 'No token' })
  }
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!)
    // ... business logic continues
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
```

## Testing Requirements

1. **Unit Tests**: Test each middleware function in isolation
2. **Integration Tests**: Test middleware composition
3. **Edge Cases**: Test error conditions and boundary values
4. **Performance Tests**: Ensure minimal overhead

```typescript
import { createRateLimitMiddleware } from '../middleware'

describe('RateLimitMiddleware', () => {
  it('should allow requests within limit', () => {
    const middleware = createRateLimitMiddleware({ windowMs: 60000, maxRequests: 5 })
    const request = { ip: '127.0.0.1' } as NextRequest
    
    for (let i = 0; i < 5; i++) {
      const result = middleware(request)
      expect(result?.status).not.toBe(429)
    }
  })
  
  it('should block requests exceeding limit', () => {
    const middleware = createRateLimitMiddleware({ windowMs: 60000, maxRequests: 2 })
    const request = { ip: '127.0.0.1' } as NextRequest
    
    middleware(request)
    middleware(request)
    const result = middleware(request)
    
    expect(result?.status).toBe(429)
  })
})
```

## Performance Implications

- **Memory**: Minimal overhead for tracking state
- **CPU**: Validation adds < 1ms per request
- **Network**: No additional network calls

## Security Implications

- **Rate Limiting**: Prevents brute force attacks
- **Input Validation**: Prevents injection attacks
- **Authentication**: Ensures proper access control

## Related Patterns

- [Integration Adapter Pattern](./integration-adapter-pattern.md) - For external service calls
- [API Route Pattern](./api-route-pattern.md) - For route structure
- [Factory Pattern](./factory-pattern.md) - For middleware creation
