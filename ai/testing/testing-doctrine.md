# Testing Doctrine

## Testing Philosophy

This document defines the testing requirements and standards for the hair salon application. Comprehensive testing ensures code quality, prevents regressions, and maintains user experience standards.

---

@ai-testing This file defines the testing doctrine and requirements for the hair salon application, including coverage targets, testing patterns, and quality assurance standards.

## Coverage Targets

### Overall Coverage Requirements

- **Unit Tests**: 90% line coverage minimum
- **Integration Tests**: 80% line coverage minimum
- **E2E Tests**: Cover all critical user journeys
- **Security Tests**: 100% of security logic

### Coverage by Module Type

- **Business Logic**: 95% coverage
- **API Routes**: 90% coverage
- **Components**: 85% coverage
- **Utilities**: 100% coverage
- **Middleware**: 95% coverage

## What Must Be Unit Tested

### Business Logic

- All utility functions
- Data transformation functions
- Validation schemas
- Calculation functions
- Format functions

```typescript
// Example: Utility function test
import { formatPhoneNumber } from '@/lib/utils/phone';

describe('formatPhoneNumber', () => {
  it('should format US phone numbers correctly', () => {
    expect(formatPhoneNumber('1234567890')).toBe('(123) 456-7890');
    expect(formatPhoneNumber('(123) 456-7890')).toBe('(123) 456-7890');
    expect(formatPhoneNumber('123-456-7890')).toBe('(123) 456-7890');
  });

  it('should handle international numbers', () => {
    expect(formatPhoneNumber('+44 20 7123 4567')).toBe('+44 20 7123 4567');
  });

  it('should return empty string for invalid input', () => {
    expect(formatPhoneNumber('')).toBe('');
    expect(formatPhoneNumber('abc')).toBe('');
  });
});
```

### Environment Schema

- All Zod validation schemas
- Environment variable parsing
- Default value handling
- Error scenarios

```typescript
// Example: Environment schema test
import { envSchema } from '@/lib/env';

describe('Environment Schema', () => {
  it('should validate valid environment variables', () => {
    const validEnv = {
      NODE_ENV: 'production',
      DATABASE_URL: 'postgresql://localhost:5432/test',
      JWT_SECRET: 'secret-key',
    };

    expect(() => envSchema.parse(validEnv)).not.toThrow();
  });

  it('should reject invalid database URL', () => {
    const invalidEnv = {
      NODE_ENV: 'production',
      DATABASE_URL: 'invalid-url',
      JWT_SECRET: 'secret-key',
    };

    expect(() => envSchema.parse(invalidEnv)).toThrow();
  });
});
```

### Middleware

- Authentication middleware
- Rate limiting middleware
- Validation middleware
- Error handling middleware

```typescript
// Example: Middleware test
import { createAuthMiddleware } from '@/lib/middleware/auth';
import { NextRequest } from 'next/server';

describe('Auth Middleware', () => {
  it('should allow requests with valid token', async () => {
    const middleware = createAuthMiddleware({ required: true });
    const request = {
      headers: {
        get: jest.fn().mockReturnValue('Bearer valid-token'),
      },
    } as unknown as NextRequest;

    const result = await middleware(request);
    expect(result?.status).not.toBe(401);
  });

  it('should reject requests without token', async () => {
    const middleware = createAuthMiddleware({ required: true });
    const request = {
      headers: {
        get: jest.fn().mockReturnValue(null),
      },
    } as unknown as NextRequest;

    const result = await middleware(request);
    expect(result?.status).toBe(401);
  });
});
```

## What Must Be Integration Tested

### API Routes

- All HTTP methods (GET, POST, PUT, DELETE)
- Request/response validation
- Error handling
- Database interactions

```typescript
// Example: API route integration test
import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/appointments';

describe('/api/appointments', () => {
  it('should create appointment with valid data', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        serviceId: '123e4567-e89b-12d3-a456-426614174000',
        dateTime: '2024-01-15T10:00:00Z',
        customerInfo: {
          name: 'John Doe',
          email: 'john@example.com',
        },
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(JSON.parse(res._getData())).toHaveProperty('success', true);
  });

  it('should reject invalid data', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        serviceId: 'invalid-uuid',
        dateTime: 'invalid-date',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toHaveProperty('success', false);
  });
});
```

### Database Operations

- CRUD operations
- Data validation
- Transaction handling
- Error scenarios

### External Integrations

- Third-party API calls
- Payment processing
- Email sending
- Analytics tracking

## What Never Requires Tests

### Trivial Code

- Simple prop passing
- Basic JSX rendering
- Static content
- Configuration objects

### External Dependencies

- Third-party library functionality
- Browser APIs (mocked in integration tests)
- Node.js built-in modules

### Development Tools

- Build scripts
- Development server
- Hot reloading

## Mocking Policy

### What to Mock

- External API calls
- Database connections
- Third-party libraries
- Browser APIs

### What Not to Mock

- Business logic
- Data transformations
- Validation functions
- Component rendering

### Mocking Best Practices

```typescript
// ✅ Good: Mock external API
jest.mock('@/lib/stripe', () => ({
  createPaymentIntent: jest.fn().mockResolvedValue({ id: 'pi_123' }),
}));

// ✅ Good: Mock database
jest.mock('@/lib/db', () => ({
  appointment: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
}));

// ❌ Bad: Mock business logic
jest.mock('@/lib/utils/calculate-price', () => ({
  calculatePrice: jest.fn().mockReturnValue(100),
}));
```

## Naming Conventions

### Test Files

- Unit tests: `filename.test.ts`
- Integration tests: `filename.integration.test.ts`
- E2E tests: `filename.e2e.test.ts`

### Test Descriptions

```typescript
// ✅ Good: Clear, descriptive names
describe('Appointment Booking', () => {
  describe('when user provides valid data', () => {
    it('should create appointment successfully');
    it('should send confirmation email');
    it('should update calendar');
  });

  describe('when user provides invalid data', () => {
    it('should reject with validation error');
    it('should not charge payment');
  });
});

// ❌ Bad: Vague names
describe('Appointment', () => {
  it('works');
  it('fails');
});
```

### Test Structure

- **Arrange**: Setup test data and mocks
- **Act**: Execute the function being tested
- **Assert**: Verify the expected outcome

```typescript
// Example test structure
describe('calculateAppointmentPrice', () => {
  it('should calculate price with service and duration', () => {
    // Arrange
    const service = { basePrice: 50, duration: 60 };
    const addons = [{ name: 'Deep Conditioning', price: 20 }];

    // Act
    const result = calculateAppointmentPrice(service, addons);

    // Assert
    expect(result).toBe(70);
    expect(result).toBeGreaterThan(0);
  });
});
```

## Snapshot Usage Policy

### When to Use Snapshots

- Complex component output
- Error message formats
- Configuration objects
- API response structures

### When Not to Use Snapshots

- Simple data structures
- Dynamic content (dates, IDs)
- User-facing text (use constants instead)

### Snapshot Best Practices

```typescript
// ✅ Good: Complex component structure
it('should render appointment list correctly', () => {
  const { container } = render(<AppointmentList appointments={mockAppointments} />)
  expect(container).toMatchSnapshot()
})

// ✅ Good: Error response format
it('should return consistent error format', async () => {
  const response = await createAppointment(invalidData)
  expect(response).toMatchSnapshot({
    timestamp: expect.any(String), // Ignore dynamic values
  })
})

// ❌ Bad: Simple data structure
it('should return user data', () => {
  const user = { name: 'John', email: 'john@example.com' }
  expect(user).toMatchSnapshot() // Just test the values directly
})
```

## Test Data Management

### Test Factories

```typescript
// factories/appointment-factory.ts
import { faker } from '@faker-js/faker';

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
    status: 'pending',
    ...overrides,
  };
}

// Usage in tests
it('should handle appointment creation', () => {
  const appointment = createAppointment({ status: 'confirmed' });
  // Test logic
});
```

### Test Database

- Use separate test database
- Clean up between tests
- Use transactions for isolation
- Seed with consistent test data

## Performance Testing

### Load Testing

- API endpoints: Handle expected traffic
- Database queries: Optimize slow queries
- Frontend: Measure rendering performance

### Performance Test Example

```typescript
describe('Performance Tests', () => {
  it('should load appointments within time limit', async () => {
    const startTime = performance.now();
    await getAppointments();
    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(1000); // 1 second
  });
});
```

## Continuous Integration

### Test Pipeline

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run type checking
        run: npm run type-check

      - name: Run unit tests
        run: npm run test:unit -- --coverage

      - name: Run integration tests
        run: npm run test:integration

      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

### Quality Gates

- All tests must pass
- Coverage targets must be met
- No new linting errors
- Type checking must pass

## Test Environment

### Local Development

- Jest for unit/integration tests
- Playwright for E2E tests
- Test database (Docker)
- Mock services for external APIs

### CI/CD

- Parallel test execution
- Cached dependencies
- Artifact storage
- Coverage reporting

This testing doctrine ensures comprehensive test coverage and maintains high code quality standards across the application.
