# Test Patterns

## Common Test Patterns

This document provides reusable test patterns and examples for common testing scenarios in the hair salon application.

## Unit Test Patterns

### Utility Function Tests
```typescript
// utils/format-currency.test.ts
import { formatCurrency } from './format-currency'

describe('formatCurrency', () => {
  it('should format positive numbers correctly', () => {
    expect(formatCurrency(50)).toBe('$50.00')
    expect(formatCurrency(50.5)).toBe('$50.50')
    expect(formatCurrency(50.99)).toBe('$50.99')
  })
  
  it('should format zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })
  
  it('should handle negative numbers', () => {
    expect(formatCurrency(-10)).toBe('-$10.00')
  })
  
  it('should handle null/undefined', () => {
    expect(formatCurrency(null)).toBe('$0.00')
    expect(formatCurrency(undefined)).toBe('$0.00')
  })
})
```

### Validation Schema Tests
```typescript
// schemas/appointment-schema.test.ts
import { z } from 'zod'
import { appointmentSchema } from './appointment-schema'

describe('Appointment Schema', () => {
  const validData = {
    serviceId: '123e4567-e89b-12d3-a456-426614174000',
    dateTime: '2024-01-15T10:00:00Z',
    customerInfo: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1-555-0123',
    },
  }
  
  it('should accept valid appointment data', () => {
    expect(() => appointmentSchema.parse(validData)).not.toThrow()
  })
  
  it('should reject invalid service ID', () => {
    const invalidData = { ...validData, serviceId: 'invalid-uuid' }
    expect(() => appointmentSchema.parse(invalidData)).toThrow(z.ZodError)
  })
  
  it('should reject past dates', () => {
    const invalidData = { ...validData, dateTime: '2020-01-15T10:00:00Z' }
    expect(() => appointmentSchema.parse(invalidData)).toThrow(z.ZodError)
  })
  
  it('should reject invalid email', () => {
    const invalidData = {
      ...validData,
      customerInfo: { ...validData.customerInfo, email: 'invalid-email' }
    }
    expect(() => appointmentSchema.parse(invalidData)).toThrow(z.ZodError)
  })
})
```

### React Component Tests
```typescript
// components/AppointmentCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { AppointmentCard } from './AppointmentCard'

const mockAppointment = {
  id: '123',
  service: { name: 'Haircut', price: 50 },
  dateTime: '2024-01-15T10:00:00Z',
  status: 'pending',
  customer: { name: 'John Doe' },
}

describe('AppointmentCard', () => {
  it('should render appointment information', () => {
    render(<AppointmentCard appointment={mockAppointment} />)
    
    expect(screen.getByText('Haircut')).toBeInTheDocument()
    expect(screen.getByText('$50.00')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('pending')).toBeInTheDocument()
  })
  
  it('should call onCancel when cancel button clicked', () => {
    const onCancel = jest.fn()
    render(<AppointmentCard appointment={mockAppointment} onCancel={onCancel} />)
    
    fireEvent.click(screen.getByText('Cancel'))
    expect(onCancel).toHaveBeenCalledWith('123')
  })
  
  it('should not show cancel button for completed appointments', () => {
    const completedAppointment = { ...mockAppointment, status: 'completed' }
    render(<AppointmentCard appointment={completedAppointment} />)
    
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument()
  })
})
```

## Integration Test Patterns

### API Route Tests
```typescript
// pages/api/appointments.test.ts
import { createMocks } from 'node-mocks-http'
import handler from './appointments'
import { appointmentAdapter } from '@/features/appointments/adapters'

jest.mock('@/features/appointments/adapters')

describe('/api/appointments', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  
  describe('POST /api/appointments', () => {
    it('should create appointment with valid data', async () => {
      const appointmentData = {
        serviceId: '123e4567-e89b-12d3-a456-426614174000',
        dateTime: '2024-01-15T10:00:00Z',
        customerInfo: {
          name: 'John Doe',
          email: 'john@example.com',
        },
      }
      
      const mockAppointment = { id: '456', ...appointmentData }
      ;(appointmentAdapter.createAppointment as jest.Mock).mockResolvedValue(mockAppointment)
      
      const { req, res } = createMocks({
        method: 'POST',
        body: appointmentData,
      })
      
      await handler(req, res)
      
      expect(res._getStatusCode()).toBe(201)
      expect(JSON.parse(res._getData())).toEqual({
        success: true,
        data: mockAppointment,
      })
      expect(appointmentAdapter.createAppointment).toHaveBeenCalledWith(appointmentData)
    })
    
    it('should return validation error for invalid data', async () => {
      const invalidData = {
        serviceId: 'invalid-uuid',
        dateTime: 'invalid-date',
      }
      
      const { req, res } = createMocks({
        method: 'POST',
        body: invalidData,
      })
      
      await handler(req, res)
      
      expect(res._getStatusCode()).toBe(400)
      expect(JSON.parse(res._getData())).toHaveProperty('success', false)
    })
    
    it('should handle database errors', async () => {
      const appointmentData = {
        serviceId: '123e4567-e89b-12d3-a456-426614174000',
        dateTime: '2024-01-15T10:00:00Z',
        customerInfo: { name: 'John Doe', email: 'john@example.com' },
      }
      
      ;(appointmentAdapter.createAppointment as jest.Mock).mockRejectedValue(
        new Error('Database error')
      )
      
      const { req, res } = createMocks({
        method: 'POST',
        body: appointmentData,
      })
      
      await handler(req, res)
      
      expect(res._getStatusCode()).toBe(500)
      expect(JSON.parse(res._getData())).toHaveProperty('success', false)
    })
  })
})
```

### Database Integration Tests
```typescript
// lib/db/appointments.test.ts
import { appointmentDb } from './appointments'
import { createTestDatabase, cleanupTestDatabase } from '@/test/test-db'

describe('Appointment Database', () => {
  beforeAll(async () => {
    await createTestDatabase()
  })
  
  afterAll(async () => {
    await cleanupTestDatabase()
  })
  
  beforeEach(async () => {
    await appointmentDb.deleteMany()
  })
  
  it('should create appointment', async () => {
    const appointmentData = {
      serviceId: '123e4567-e89b-12d3-a456-426614174000',
      dateTime: new Date('2024-01-15T10:00:00Z'),
      customerInfo: { name: 'John Doe', email: 'john@example.com' },
    }
    
    const appointment = await appointmentDb.create(appointmentData)
    
    expect(appointment).toHaveProperty('id')
    expect(appointment.serviceId).toBe(appointmentData.serviceId)
    expect(appointment.customerInfo).toEqual(appointmentData.customerInfo)
  })
  
  it('should find appointments by date range', async () => {
    const startDate = new Date('2024-01-01')
    const endDate = new Date('2024-01-31')
    
    await appointmentDb.create({
      serviceId: '123',
      dateTime: new Date('2024-01-15'),
      customerInfo: { name: 'John', email: 'john@example.com' },
    })
    
    await appointmentDb.create({
      serviceId: '456',
      dateTime: new Date('2024-02-15'),
      customerInfo: { name: 'Jane', email: 'jane@example.com' },
    })
    
    const appointments = await appointmentDb.findByDateRange(startDate, endDate)
    
    expect(appointments).toHaveLength(1)
    expect(appointments[0].serviceId).toBe('123')
  })
})
```

## E2E Test Patterns

### User Journey Tests
```typescript
// e2e/appointment-booking.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Appointment Booking Flow', () => {
  test('should complete booking flow', async ({ page }) => {
    await page.goto('/')
    
    // Navigate to booking
    await page.click('text=Book Appointment')
    await expect(page).toHaveURL('/book')
    
    // Select service
    await page.selectOption('#service', 'Haircut')
    await expect(page.locator('#service')).toHaveValue('haircut')
    
    // Select date and time
    await page.click('[data-testid="calendar-day-15"]')
    await page.click('[data-testid="time-slot-10:00"]')
    
    // Fill customer information
    await page.fill('#name', 'John Doe')
    await page.fill('#email', 'john@example.com')
    await page.fill('#phone', '+1-555-0123')
    
    // Submit booking
    await page.click('button[type="submit"]')
    
    // Verify confirmation
    await expect(page.locator('[data-testid="confirmation"]')).toBeVisible()
    await expect(page.locator('text=Appointment confirmed')).toBeVisible()
    await expect(page.locator('text=John Doe')).toBeVisible()
    await expect(page.locator('text=Haircut')).toBeVisible()
  })
  
  test('should show validation errors', async ({ page }) => {
    await page.goto('/book')
    
    // Submit empty form
    await page.click('button[type="submit"]')
    
    // Check validation messages
    await expect(page.locator('text=Service is required')).toBeVisible()
    await expect(page.locator('text=Name is required')).toBeVisible()
    await expect(page.locator('text=Email is required')).toBeVisible()
  })
})
```

### Responsive Design Tests
```typescript
// e2e/responsive.spec.ts
import { devices, test, expect } from '@playwright/test'

const devicesToTest = [
  devices['iPhone 12'],
  devices['iPad Pro'],
  devices['Desktop Chrome'],
]

test.describe('Responsive Design', () => {
  devicesToTest.forEach(device => {
    test(`should work correctly on ${device.name}`, async ({ page }) => {
      await page.setViewportSize(device.viewport)
      await page.goto('/')
      
      // Test navigation
      if (device.isMobile) {
        await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible()
        await page.click('[data-testid="mobile-menu-toggle"]')
        await expect(page.locator('[data-testid="mobile-menu-items"]')).toBeVisible()
      } else {
        await expect(page.locator('[data-testid="desktop-nav"]')).toBeVisible()
      }
      
      // Test booking flow
      await page.click('text=Book Appointment')
      await expect(page.locator('#service')).toBeVisible()
      
      if (device.isMobile) {
        await expect(page.locator('[data-testid="mobile-form"]')).toBeVisible()
      } else {
        await expect(page.locator('[data-testid="desktop-form"]')).toBeVisible()
      }
    })
  })
})
```

## Performance Test Patterns

### Load Testing
```typescript
// performance/api-load.test.ts
import { performance } from 'perf_hooks'

describe('API Load Tests', () => {
  it('should handle concurrent requests', async () => {
    const requests = Array.from({ length: 100 }, () =>
      fetch('/api/appointments')
    )
    
    const startTime = performance.now()
    const responses = await Promise.all(requests)
    const endTime = performance.now()
    
    // All requests should succeed
    responses.forEach(response => {
      expect(response.ok).toBe(true)
    })
    
    // Should complete within reasonable time
    expect(endTime - startTime).toBeLessThan(5000) // 5 seconds
  })
})
```

### Memory Leak Tests
```typescript
// performance/memory.test.ts
describe('Memory Tests', () => {
  it('should not leak memory during repeated operations', async () => {
    const initialMemory = process.memoryUsage().heapUsed
    
    // Perform many operations
    for (let i = 0; i < 1000; i++) {
      await createAppointment({
        serviceId: '123',
        dateTime: new Date(),
        customerInfo: { name: `User ${i}`, email: `user${i}@example.com` },
      })
    }
    
    // Force garbage collection if available
    if (global.gc) {
      global.gc()
    }
    
    const finalMemory = process.memoryUsage().heapUsed
    const memoryIncrease = finalMemory - initialMemory
    
    // Memory increase should be reasonable (less than 50MB)
    expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024)
  })
})
```

## Security Test Patterns

### Input Validation Tests
```typescript
// security/input-validation.test.ts
describe('Security - Input Validation', () => {
  it('should reject SQL injection attempts', async () => {
    const maliciousInput = "'; DROP TABLE appointments; --"
    
    const response = await createAppointment({
      serviceId: maliciousInput,
      customerInfo: { name: 'Test', email: 'test@example.com' },
    })
    
    expect(response.status).toBe(400)
    expect(response.data).toHaveProperty('success', false)
  })
  
  it('should reject XSS attempts', async () => {
    const xssPayload = '<script>alert("xss")</script>'
    
    const response = await createAppointment({
      serviceId: '123',
      customerInfo: { name: xssPayload, email: 'test@example.com' },
    })
    
    expect(response.status).toBe(400)
  })
})
```

### Authentication Tests
```typescript
// security/authentication.test.ts
describe('Security - Authentication', () => {
  it('should reject requests without authentication', async () => {
    const response = await fetch('/api/admin/appointments', {
      method: 'GET',
      headers: {}, // No auth header
    })
    
    expect(response.status).toBe(401)
  })
  
  it('should reject requests with invalid token', async () => {
    const response = await fetch('/api/admin/appointments', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer invalid-token',
      },
    })
    
    expect(response.status).toBe(401)
  })
})
```

## Test Utilities

### Mock Data Factory
```typescript
// test/factories/appointment-factory.ts
import { faker } from '@faker-js/faker'

export function createAppointment(overrides = {}) {
  return {
    id: faker.datatype.uuid(),
    serviceId: faker.datatype.uuid(),
    dateTime: faker.date.future().toISOString(),
    customerInfo: {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
    },
    status: faker.helpers.arrayElement(['pending', 'confirmed', 'cancelled']),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    ...overrides,
  }
}

export function createAppointments(count: number, overrides = {}) {
  return Array.from({ length: count }, () => createAppointment(overrides))
}
```

### Test Helpers
```typescript
// test/helpers/api.ts
import { createMocks } from 'node-mocks-http'

export async function makeAPIRequest(handler: any, options: {
  method?: string
  body?: any
  headers?: Record<string, string>
  query?: Record<string, string>
}) {
  const { req, res } = createMocks({
    method: options.method || 'GET',
    body: options.body,
    headers: options.headers,
    query: options.query,
  })
  
  await handler(req, res)
  
  return {
    status: res._getStatusCode(),
    data: JSON.parse(res._getData()),
    headers: res._getHeaders(),
  }
}
```

These patterns provide comprehensive testing coverage for all aspects of the application while maintaining consistency and reusability.
