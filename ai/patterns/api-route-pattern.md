# API Route Pattern

## Problem It Solves

Inconsistent API route structure leads to security vulnerabilities, poor error handling, and difficult maintenance. This pattern provides a standardized, secure, and testable approach to API routes.

## When to Use

- All API routes in the application
- When handling CRUD operations
- When integrating with external services
- When implementing business logic endpoints

## When NOT to Use

- For static page routes (use pages or app router)
- For simple redirects (use Next.js redirects)
- For middleware-only functionality

## Required Constraints

1. **Validation**: All inputs validated with Zod schemas
2. **Error Handling**: Consistent error response format
3. **HTTP Methods**: Proper method handling and validation
4. **Security**: Rate limiting and authentication where required
5. **Testing**: Full test coverage for all endpoints

## Example Implementation

```typescript
/**
 * @ai-pattern API Route
 * @ai-security Input Validated
 * @ai-performance Server Only
 * @ai-tests Required
 * @ai-reference /ai/patterns/api-route-pattern.md
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createRateLimitMiddleware, createAuthMiddleware } from '@/lib/middleware'
import { createAppointmentAdapter } from '@/features/appointments/adapters'

// Input validation schemas
const CreateAppointmentSchema = z.object({
  serviceId: z.string().uuid(),
  dateTime: z.string().datetime(),
  customerInfo: z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    phone: z.string().regex(/^\+?[\d\s-()]+$/).optional(),
  }),
  notes: z.string().max(500).optional(),
})

const UpdateAppointmentSchema = CreateAppointmentSchema.partial()

const QueryAppointmentSchema = z.object({
  id: z.string().uuid().optional(),
  status: z.enum(['pending', 'confirmed', 'cancelled']).optional(),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
})

// Response schemas
const AppointmentResponseSchema = z.object({
  id: z.string().uuid(),
  serviceId: z.string().uuid(),
  dateTime: z.string().datetime(),
  status: z.enum(['pending', 'confirmed', 'cancelled']),
  customerInfo: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string().nullable(),
  }),
  notes: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

const ErrorResponseSchema = z.object({
  error: z.string(),
  details: z.any().optional(),
  code: z.string().optional(),
})

// Middleware
const rateLimit = createRateLimitMiddleware({ windowMs: 60000, maxRequests: 10 })
const auth = createAuthMiddleware({ required: true })

// Adapter
const appointmentAdapter = createAppointmentAdapter()

// HTTP method handlers
async function handleGet(request: NextRequest) {
  try {
    const query = Object.fromEntries(new URL(request.url).searchParams)
    const validatedQuery = QueryAppointmentSchema.parse(query)
    
    const appointments = await appointmentAdapter.getAppointments(validatedQuery)
    
    return NextResponse.json({
      success: true,
      data: appointments,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid query parameters',
          details: error.errors,
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch appointments',
      },
      { status: 500 }
    )
  }
}

async function handlePost(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedBody = CreateAppointmentSchema.parse(body)
    
    const appointment = await appointmentAdapter.createAppointment(validatedBody)
    
    return NextResponse.json(
      {
        success: true,
        data: appointment,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request body',
          details: error.errors,
        },
        { status: 400 }
      )
    }
    
    if (error instanceof Error && error.message.includes('already exists')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Appointment slot already booked',
        },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create appointment',
      },
      { status: 500 }
    )
  }
}

async function handlePut(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/').pop()
    
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Appointment ID required',
        },
        { status: 400 }
      )
    }
    
    const body = await request.json()
    const validatedBody = UpdateAppointmentSchema.parse(body)
    
    const appointment = await appointmentAdapter.updateAppointment(id, validatedBody)
    
    if (!appointment) {
      return NextResponse.json(
        {
          success: false,
          error: 'Appointment not found',
        },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: appointment,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request body',
          details: error.errors,
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update appointment',
      },
      { status: 500 }
    )
  }
}

async function handleDelete(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/').pop()
    
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Appointment ID required',
        },
        { status: 400 }
      )
    }
    
    const deleted = await appointmentAdapter.deleteAppointment(id)
    
    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          error: 'Appointment not found',
        },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Appointment deleted successfully',
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete appointment',
      },
      { status: 500 }
    )
  }
}

// Main handler with middleware
export default async function handler(request: NextRequest) {
  // Apply middleware
  const rateLimitResult = rateLimit(request)
  if (rateLimitResult) return rateLimitResult
  
  const authResult = auth(request)
  if (authResult) return authResult
  
  // Route to appropriate handler
  switch (request.method) {
    case 'GET':
      return handleGet(request)
    case 'POST':
      return handlePost(request)
    case 'PUT':
      return handlePut(request)
    case 'DELETE':
      return handleDelete(request)
    default:
      return NextResponse.json(
        {
          success: false,
          error: 'Method not allowed',
        },
        { status: 405 }
      )
  }
}

// Export for testing
export {
  handleGet,
  handlePost,
  handlePut,
  handleDelete,
  CreateAppointmentSchema,
  UpdateAppointmentSchema,
  QueryAppointmentSchema,
}
```

## Anti-Pattern Example

```typescript
// ❌ WRONG - No validation, no error handling, inconsistent responses
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { serviceId, dateTime, customerInfo } = req.body
    
    // No validation
    const appointment = await db.appointment.create({
      data: { serviceId, dateTime, customerInfo }
    })
    
    // Inconsistent response format
    res.status(200).json(appointment)
  }
  
  if (req.method === 'GET') {
    const appointments = await db.appointment.findMany()
    res.json(appointments) // Different response format
  }
}
```

## Testing Requirements

1. **Unit Tests**: Test each HTTP method handler
2. **Validation Tests**: Test all validation scenarios
3. **Error Tests**: Test all error paths
4. **Integration Tests**: Test with real database

```typescript
import handler, { handlePost, CreateAppointmentSchema } from '../appointments'

describe('Appointment API', () => {
  describe('POST /api/appointments', () => {
    it('should create appointment with valid data', async () => {
      const request = {
        method: 'POST',
        json: async () => ({
          serviceId: '123e4567-e89b-12d3-a456-426614174000',
          dateTime: '2024-01-15T10:00:00Z',
          customerInfo: {
            name: 'John Doe',
            email: 'john@example.com',
          },
        }),
      } as NextRequest
      
      const response = await handlePost(request)
      const data = await response.json()
      
      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.data).toHaveProperty('id')
    })
    
    it('should reject invalid data', async () => {
      const request = {
        method: 'POST',
        json: async () => ({
          serviceId: 'invalid-uuid',
          dateTime: 'invalid-date',
          customerInfo: {
            name: '',
            email: 'invalid-email',
          },
        }),
      } as NextRequest
      
      const response = await handlePost(request)
      const data = await response.json()
      
      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Invalid request body')
    })
  })
})
```

## Performance Implications

- **Validation**: Zod validation adds < 1ms overhead
- **Database**: Use proper indexing for queries
- **Memory**: Minimal memory footprint

## Security Implications

- **Input Validation**: Prevents injection attacks
- **Rate Limiting**: Prevents abuse
- **Authentication**: Ensures proper access control
- **Error Messages**: Don't leak sensitive information

## Related Patterns

- [Integration Adapter Pattern](./integration-adapter-pattern.md) - For database operations
- [Middleware Pattern](./middleware-pattern.md) - For request processing
- [Validation Pattern](./validation-pattern.md) - For input validation
