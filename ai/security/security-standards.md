# Security Standards

## Security Baseline

This document defines the security requirements and standards for the hair salon application. All development must adhere to these standards to ensure application security and data protection.

---

@ai-security This file defines the security requirements and standards for the hair salon application, including CSP baseline, input validation, XSS/CSRF prevention, and data protection requirements.

## CSP Baseline

### Content Security Policy

```typescript
// Default CSP for all pages
const CSP_DIRECTIVES = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'", // Only for critical inline scripts
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'", // Required for Tailwind CSS
  ],
  'img-src': ["'self'", 'data:', 'https:'],
  'font-src': ["'self'"],
  'connect-src': ["'self'", 'https://api.stripe.com', 'https://api.resend.com'],
  'frame-src': ["'none'"],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],
  'upgrade-insecure-requests': [],
};
```

### CSP Implementation

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add CSP headers
  const csp = Object.entries(CSP_DIRECTIVES)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ');

  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}
```

## Allowed Headers

### Request Headers

- `Content-Type`: Application/json, multipart/form-data
- `Authorization`: Bearer tokens for API authentication
- `X-Requested-With`: XMLHttpRequest identifier
- `Accept`: Content negotiation

### Response Headers

- `Content-Type`: Proper MIME types
- `Cache-Control`: Appropriate caching directives
- `Strict-Transport-Security`: HTTPS enforcement
- `Content-Security-Policy`: CSP directives
- `X-Content-Type-Options`: MIME type sniffing protection

### Header Validation

```typescript
// Header validation middleware
export function validateHeaders(request: NextRequest) {
  const contentType = request.headers.get('content-type');
  const userAgent = request.headers.get('user-agent');

  // Validate content type for POST/PUT requests
  if (['POST', 'PUT'].includes(request.method)) {
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 415 });
    }
  }

  // Log suspicious user agents
  if (userAgent && SUSPICIOUS_UA_PATTERNS.some((pattern) => pattern.test(userAgent))) {
    console.warn('Suspicious user agent detected:', userAgent);
  }
}
```

## Input Validation Requirements

### Validation Layers

1. **Client-side**: UI validation for immediate feedback
2. **Server-side**: Zod schema validation for security
3. **Database**: Parameterized queries for injection prevention

### Zod Validation Schemas

```typescript
import { z } from 'zod';

// User registration validation
const UserRegistrationSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name too long')
    .regex(/^[a-zA-Z\s'-]+$/, 'Invalid characters in name'),
  email: z.string().email('Invalid email format').max(254, 'Email too long'),
  password: z
    .string()
    .min(8, 'Password too short')
    .max(128, 'Password too long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain uppercase, lowercase, number, and special character'
    ),
  phone: z
    .string()
    .regex(/^\+?[\d\s-()]+$/, 'Invalid phone format')
    .optional(),
});

// Appointment booking validation
const AppointmentSchema = z.object({
  serviceId: z.string().uuid('Invalid service ID'),
  dateTime: z
    .string()
    .datetime('Invalid date format')
    .refine((date) => new Date(date) > new Date(), 'Date must be in future'),
  customerInfo: z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    phone: z
      .string()
      .regex(/^\+?[\d\s-()]+$/)
      .optional(),
  }),
  notes: z.string().max(500).optional(),
});
```

### Input Sanitization

```typescript
import DOMPurify from 'isomorphic-dompurify';

// HTML content sanitization
export function sanitizeHTML(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['class'],
    KEEP_CONTENT: true,
  });
}

// SQL injection prevention
export function sanitizeSQLInput(input: string): string {
  return input.replace(/['"\\;]/g, '');
}
```

## XSS Prevention Rules

### Content Rendering

- All user-generated content must be sanitized
- Use React's built-in XSS protection
- Avoid dangerouslySetInnerHTML when possible
- Validate and sanitize all file uploads

### Safe Rendering Examples

```typescript
// ✅ Safe - React automatically escapes
export function UserContent({ content }: { content: string }) {
  return <p>{content}</p>
}

// ❌ Dangerous - Potential XSS
export function UserContentDangerous({ content }: { content: string }) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />
}

// ✅ Safe - With sanitization
export function SafeHTML({ content }: { content: string }) {
  const sanitized = sanitizeHTML(content)
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />
}
```

### File Upload Security

```typescript
// File upload validation
export function validateFileUpload(file: File) {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File too large');
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type');
  }

  // Scan for malware (integration with security service)
  return scanFile(file);
}
```

## CSRF Policy

### CSRF Protection Implementation

```typescript
// CSRF token generation
import { randomBytes } from 'crypto';

export function generateCSRFToken(): string {
  return randomBytes(32).toString('hex');
}

// CSRF validation middleware
export function validateCSRF(request: NextRequest) {
  if (['POST', 'PUT', 'DELETE'].includes(request.method)) {
    const token = request.headers.get('x-csrf-token');
    const sessionToken = request.cookies.get('csrf-token')?.value;

    if (!token || !sessionToken || token !== sessionToken) {
      return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
    }
  }
}
```

### SameSite Cookies

```typescript
// Secure cookie configuration
export function setSecureCookies(response: NextResponse) {
  response.cookies.set('session-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}
```

## Error Message Exposure Rules

### Safe Error Handling

```typescript
// Generic error messages for users
export function getUserSafeMessage(error: Error): string {
  const errorMap = {
    ValidationError: 'Invalid input provided',
    AuthenticationError: 'Authentication failed',
    AuthorizationError: 'Access denied',
    DatabaseError: 'Service temporarily unavailable',
    NetworkError: 'Connection error',
  };

  const errorType = error.constructor.name;
  return errorMap[errorType] || 'An error occurred';
}

// Detailed logging for developers
export function logError(error: Error, context: any) {
  console.error({
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
  });
}
```

### Error Response Format

```typescript
export function createErrorResponse(error: Error, status: number) {
  return NextResponse.json(
    {
      success: false,
      error: getUserSafeMessage(error),
      code: error.constructor.name,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}
```

## Logging Requirements

### Security Event Logging

```typescript
// Security event types
export enum SecurityEventType {
  LOGIN_ATTEMPT = 'login_attempt',
  LOGIN_SUCCESS = 'login_success',
  LOGIN_FAILURE = 'login_failure',
  PASSWORD_CHANGE = 'password_change',
  DATA_ACCESS = 'data_access',
  SUSPICIOUS_ACTIVITY = 'suspicious_activity',
}

// Security logging function
export function logSecurityEvent(type: SecurityEventType, userId?: string, details?: any) {
  const event = {
    type,
    userId,
    details,
    ip: details?.ip,
    userAgent: details?.userAgent,
    timestamp: new Date().toISOString(),
  };

  // Log to secure logging service
  secureLogger.log(event);

  // Alert on high-risk events
  if (HIGH_RISK_EVENTS.includes(type)) {
    alertSecurityTeam(event);
  }
}
```

### Log Retention and Privacy

- Retain security logs for 90 days
- Anonymize PII in logs after 30 days
- Encrypt logs at rest and in transit
- Regular log rotation and cleanup

## Secrets Policy

### Environment Variables

```typescript
// Secure environment variable access
export function getSecret(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

// Secret validation
export function validateSecrets() {
  const requiredSecrets = ['DATABASE_URL', 'JWT_SECRET', 'STRIPE_SECRET_KEY', 'RESEND_API_KEY'];

  const missing = requiredSecrets.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing secrets: ${missing.join(', ')}`);
  }
}
```

### Secret Management Rules

- Never commit secrets to version control
- Use environment-specific secret management
- Rotate secrets regularly (90 days)
- Use strong, randomly generated secrets
- Implement secret scanning in CI/CD

## Security Testing Requirements

### Automated Security Testing

```yaml
# .github/workflows/security.yml
- name: Security Audit
  run: npm audit --audit-level high

- name: Dependency Check
  run: npx audit-ci --moderate

- name: SAST Scan
  uses: github/super-linter@v4
  env:
    DEFAULT_BRANCH: main
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Security Checklist

- [ ] All inputs validated with Zod schemas
- [ ] CSP headers implemented and tested
- [ ] CSRF protection enabled
- [ ] SQL injection prevention verified
- [ ] XSS prevention measures in place
- [ ] Secure cookie configuration
- [ ] Error messages don't leak information
- [ ] Security logging implemented
- [ ] Secrets properly managed
- [ ] Regular security audits scheduled

## Incident Response

### Security Incident Process

1. **Detection**: Automated monitoring and alerts
2. **Assessment**: Impact analysis and classification
3. **Containment**: Immediate threat mitigation
4. **Eradication**: Remove root cause
5. **Recovery**: Restore normal operations
6. **Lessons Learned**: Post-incident review

### Emergency Contacts

- Security Team: security@salon.com
- Development Team: dev@salon.com
- Legal Team: legal@salon.com

This security framework ensures comprehensive protection against common web application vulnerabilities and provides clear guidelines for secure development practices.
