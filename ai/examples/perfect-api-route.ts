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
  serviceId: z.string().uuid('Invalid service ID'),
  dateTime: z.string().datetime('Invalid date format'),
  customerInfo: z.object({
    name: z.string().min(1).max(100),
    email: z.string().email('Invalid email format'),
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
  success: z.boolean(),
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
