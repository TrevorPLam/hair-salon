# Security Policy

## Supported Versions

Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to: security@ydFirms.com

### What to Include
- Type of vulnerability
- Full paths of affected source files
- Location of affected code (tag/branch/commit)
- Step-by-step instructions to reproduce
- Proof-of-concept or exploit code (if possible)
- Impact assessment

### Response Timeline
- **Initial response**: Within 48 hours
- **Status update**: Within 7 days
- **Fix timeline**: Depends on severity

### Process
1. You report the vulnerability
2. We confirm receipt within 48 hours
3. We assess severity and impact
4. We develop and test a fix
5. We release a patch
6. We publicly disclose (with your consent)

## Security Best Practices

When contributing:
- [ ] Never commit secrets or API keys
- [ ] Use environment variables for sensitive config
- [ ] Keep dependencies up to date
- [ ] Validate and sanitize all user input
- [ ] Run security linters before submitting PRs

## Automated Security

This project uses:
- Dependabot for dependency updates
- ESLint security plugin for static analysis
- Pre-commit hooks for secret detection

---

## Security Features

### CSRF Protection

**Status:** Protected via Next.js Server Actions

This application uses Next.js 14 Server Actions for all form submissions, which provides built-in CSRF protection:

#### How It Works
1. **Origin Checking:** Next.js automatically validates the `Origin` and `Referer` headers on POST requests to Server Actions
2. **Same-Origin Policy:** Server Actions can only be invoked from the same origin by default
3. **No Explicit Tokens Required:** The framework handles CSRF protection at the transport layer

#### Implementation Details
- Contact form uses Server Actions defined in `lib/actions.ts`
- Forms are submitted using the `action` prop, not traditional POST requests
- Next.js middleware enforces security headers (see below)

#### Cookie Configuration
- **SameSite:** Cookies use default Next.js behavior (Lax for session cookies)
- **Secure flag:** Automatically enabled in production (HTTPS)
- **HttpOnly:** Session cookies are HttpOnly by default

#### Limitations & Future Enhancements
- Current implementation relies on framework-level protection
- For enhanced security in high-risk environments, consider:
  - Explicit CSRF tokens for additional defense-in-depth
  - Custom token validation for API routes (if added)
  - Double-submit cookie pattern for non-Server Action endpoints

**References:**
- Implementation: `lib/actions.ts` (Server Actions)
- Security headers: `middleware.ts`
- Decision rationale: See [DECISIONS.md - ADR-006](DECISIONS.md)

---

### Rate Limiting

**Status:** Basic in-memory rate limiting (MVP)

The contact form includes rate limiting to prevent abuse:

#### Current Implementation
- **Mechanism:** In-memory Map tracking submissions by email
- **Limit:** 3 submissions per hour per email address
- **Scope:** Single server instance only
- **Storage:** Volatile (resets on server restart)

#### Configuration
```typescript
// lib/actions.ts
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
// Limit: 3 submissions per hour
```

#### Limitations
- ⚠️ **Not suitable for production at scale**
- Does not persist across server restarts
- Does not work across multiple instances (serverless/edge)
- Can be bypassed by changing email addresses
- No IP-based limiting

#### Production Recommendations
For production deployment, implement persistent rate limiting:

1. **Upstash Redis:** Serverless Redis with built-in rate limiting
2. **Vercel KV:** Edge-compatible key-value store
3. **Arcjet:** Purpose-built rate limiting and bot protection
4. **Cloudflare Rate Limiting:** Built into Cloudflare Pages

**Migration path:** See [DECISIONS.md - ADR-007](DECISIONS.md) and [TODO.md - T-016](TODO.md)

**Implementation:** `lib/actions.ts` lines 21-48

---

### Security Headers

**Status:** Comprehensive headers via middleware

All pages are served with security headers configured in `middleware.ts`:

#### Headers Applied

| Header | Value | Purpose |
|--------|-------|---------|
| `Content-Security-Policy` | Restrictive CSP | Prevents XSS and injection attacks |
| `X-Frame-Options` | `DENY` | Prevents clickjacking |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME sniffing |
| `X-XSS-Protection` | `1; mode=block` | Legacy XSS protection |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Controls referrer information |
| `Permissions-Policy` | Restrictive | Disables unnecessary browser features |
| `Strict-Transport-Security` | `max-age=31536000` | Enforces HTTPS (production only) |

#### Content Security Policy Details
```
default-src 'self'
script-src 'self' 'unsafe-eval' 'unsafe-inline'  # Required for Next.js
style-src 'self' 'unsafe-inline'                 # Required for Tailwind
img-src 'self' data: https:
font-src 'self' data:
connect-src 'self'
frame-ancestors 'none'
```

**Notes:**
- `'unsafe-inline'` is required for Next.js runtime and Tailwind CSS
- `'unsafe-eval'` is required for Next.js development mode
- Consider tightening CSP in the future with nonces or hashes

**Implementation:** `middleware.ts` lines 4-49

---

### Input Validation & Sanitization

**Status:** Multi-layer validation

All user input goes through multiple validation layers:

#### 1. Schema Validation (Zod)
```typescript
// lib/actions.ts
export const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  message: z.string().min(10).max(5000),
  // ... additional fields
})
```

#### 2. HTML Escaping
All user input is HTML-escaped before rendering:
- Function: `escapeHtml()` in `lib/sanitize.ts`
- Applied to: name, email, company, phone, etc.

#### 3. Email Header Injection Prevention
Email subjects are sanitized to prevent header injection:
- Function: `sanitizeEmailSubject()` in `lib/sanitize.ts`
- Removes: newlines, carriage returns, null bytes

#### 4. Text-to-HTML Conversion
Message content is safely converted to HTML paragraphs:
- Function: `textToHtmlParagraphs()` in `lib/sanitize.ts`
- Escapes HTML, preserves line breaks

**Implementation:** `lib/actions.ts` (validation), `lib/sanitize.ts` (sanitization)

---

### Secrets Management

**Status:** Environment variables only

No secrets are committed to the repository:

#### Development
- Example file: `env.example` (no actual secrets)
- Local config: `.env.local` (gitignored)
- Required variables documented in README.md

#### Production
- Secrets stored in deployment platform (Cloudflare/Vercel)
- No secrets in client-side code (no `NEXT_PUBLIC_` prefix for secrets)
- API keys server-side only

#### Environment Variables

**Server-side only (secure):**
- `RESEND_API_KEY` - Email service API key
- `CONTACT_EMAIL` - Destination for contact form emails
- `SENTRY_DSN` - Error tracking (optional)

**Client-side (public):**
- `NEXT_PUBLIC_SITE_URL` - Public site URL
- `NEXT_PUBLIC_SITE_NAME` - Site name

**Verification:** Build bundle and ensure no `RESEND_API_KEY` in client JS

---

### Dependencies & Supply Chain

**Status:** Automated monitoring

#### Dependency Management
- `npm audit` run regularly
- Dependabot enabled for security updates
- Dependencies pinned with caret ranges (`^`)
- Security-critical deps reviewed before updates

#### Recent Security Fixes
- ✅ Updated `eslint-config-next` to fix glob vulnerabilities (2026-01-03)
- ✅ Fixed Zod v4 API compatibility (2026-01-03)

**Policy:** See [DEPENDENCY_HEALTH.md](DEPENDENCY_HEALTH.md)

---

### Error Handling & Logging

**Status:** Structured logging with PII redaction

#### Logging Practices
- Structured logs via `lib/logger.ts`
- No sensitive data in logs
- Error contexts sanitized
- Production logs minimal

#### Sentry Configuration
```typescript
// Session replay settings
maskAllText: true        // Masks all text in replays
blockAllMedia: true      // Blocks images/videos
```

**Note:** Future enhancement T-001 will add explicit PII redaction in `beforeSend` hooks

**Implementation:** `lib/logger.ts`, `sentry.*.config.ts`

---

## Security Roadmap

### Completed ✅
- [x] T-011: Fix Zod v4 API compatibility
- [x] T-012: Fix ESLint unused parameter warnings
- [x] T-013: Update eslint-config-next (security vulnerabilities)

### In Progress / Planned
- [ ] T-004: CSRF documentation (this document) - **IN PROGRESS**
- [ ] T-007: Rate limiting documentation and production plan
- [ ] T-016: Implement distributed rate limiting for production
- [ ] T-001: Enhance Sentry PII redaction (P2)
- [ ] T-002: Add request body sanitization to logger (P2)
- [ ] T-009: Add HTTP body size limits (P2)

**Full backlog:** [TODO.md](TODO.md)
