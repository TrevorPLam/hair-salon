# Integration Adapter Pattern

## Problem It Solves

Direct third-party SDK imports create tight coupling, make testing difficult, and violate architectural boundaries. The adapter pattern provides a clean interface between our application and external services.

---

@ai-pattern This file defines the integration adapter pattern for third-party service integrations, providing a clean interface between the application and external services.

## When to Use

- Integrating with any third-party service (payment, email, analytics, CRM)
- Wrapping external APIs that may change
- When you need to mock external services for testing
- When multiple services provide similar functionality

## When NOT to Use

- For internal application services (use dependency injection)
- For simple utility functions
- When the external service is already abstracted (e.g., Next.js built-ins)

## Required Constraints

1. **Location**: All adapters must be in `features/[service]/adapters/`
2. **Interface**: Must implement a TypeScript interface
3. **Validation**: All inputs validated with Zod before external calls
4. **Error Handling**: Must wrap external errors in application errors
5. **Testing**: Must be fully mockable with dependency injection

## Example Implementation

```typescript
/**
 * @ai-pattern Integration Adapter
 * @ai-security Input Validated
 * @ai-performance Server Only
 * @ai-tests Required
 * @ai-reference /ai/patterns/integration-adapter-pattern.md
 */

import { z } from 'zod';

// Interface definition
export interface EmailAdapter {
  sendEmail(data: EmailData): Promise<EmailResult>;
}

// Input validation schema
const EmailDataSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1).max(100),
  html: z.string().max(50000),
  from: z.string().email().optional(),
});

export type EmailData = z.infer<typeof EmailDataSchema>;

// Result schema
const EmailResultSchema = z.object({
  success: z.boolean(),
  messageId: z.string().optional(),
  error: z.string().optional(),
});

export type EmailResult = z.infer<typeof EmailResultSchema>;

// Resend adapter implementation
export class ResendAdapter implements EmailAdapter {
  private resend: any;

  constructor(apiKey: string) {
    this.resend = new (require('resend'))(apiKey);
  }

  async sendEmail(data: EmailData): Promise<EmailResult> {
    // Validate input
    const validatedData = EmailDataSchema.parse(data);

    try {
      const result = await this.resend.emails.send({
        to: validatedData.to,
        subject: validatedData.subject,
        html: validatedData.html,
        from: validatedData.from || process.env.DEFAULT_FROM_EMAIL,
      });

      return EmailResultSchema.parse({
        success: true,
        messageId: result.id,
      });
    } catch (error) {
      return EmailResultSchema.parse({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}

// Factory function for dependency injection
export function createEmailAdapter(provider: 'resend' | 'sendgrid'): EmailAdapter {
  switch (provider) {
    case 'resend':
      return new ResendAdapter(process.env.RESEND_API_KEY!);
    case 'sendgrid':
      return new SendGridAdapter(process.env.SENDGRID_API_KEY!);
    default:
      throw new Error(`Unsupported email provider: ${provider}`);
  }
}
```

## Anti-Pattern Example

```typescript
// ❌ WRONG - Direct SDK import in component
import { Resend } from 'resend';

export default function EmailForm() {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const handleSubmit = async (data: FormData) => {
    // No validation, no error handling, tight coupling
    await resend.emails.send({
      to: data.get('email'),
      subject: data.get('subject'),
      html: data.get('message'),
    });
  };
}
```

## Testing Requirements

1. **Unit Tests**: Test adapter with mocked external service
2. **Integration Tests**: Test with real external service in staging
3. **Error Scenarios**: Test all error paths and edge cases
4. **Validation Tests**: Test input validation thoroughly

```typescript
// Example test
import { createEmailAdapter } from '../adapters/email-adapter';

describe('EmailAdapter', () => {
  it('should validate input data', async () => {
    const adapter = createEmailAdapter('resend');

    await expect(
      adapter.sendEmail({ to: 'invalid-email', subject: '', html: '' })
    ).rejects.toThrow();
  });

  it('should handle external service errors', async () => {
    const adapter = createEmailAdapter('resend');
    // Mock external service to throw error
    jest.spyOn(adapter['resend'].emails, 'send').mockRejectedValue(new Error('API Error'));

    const result = await adapter.sendEmail({
      to: 'test@example.com',
      subject: 'Test',
      html: '<p>Test</p>',
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe('API Error');
  });
});
```

## Performance Implications

- **Memory**: Adapters add minimal memory overhead
- **Network**: No additional network calls, just wraps existing ones
- **CPU**: Input validation adds small CPU cost (< 1ms per request)

## Security Implications

- **Input Validation**: All inputs validated before external calls
- **Secret Management**: API keys managed at adapter level
- **Error Exposure**: External errors wrapped to prevent information leakage

## Related Patterns

- [Middleware Pattern](./middleware-pattern.md) - For request/response processing
- [API Route Pattern](./api-route-pattern.md) - For endpoint implementation
- [Factory Pattern](./factory-pattern.md) - For adapter creation
