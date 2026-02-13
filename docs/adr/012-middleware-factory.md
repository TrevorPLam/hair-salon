# ADR-012: Shared Middleware Factory for CSP, Security Headers, and CVE Mitigation

## Status

Accepted

## Context

- Templates (hair-salon, plumber) each had duplicated middleware logic for CSP nonce, Content-Security-Policy, and security headers (X-Frame-Options, etc.).
- Next.js CVE-2025-29927 allows clients to spoof the `x-middleware-subrequest` header to bypass middleware (auth, security headers). Mitigation requires stripping this header at the edge.
- We need a single, testable implementation that applies CSP, security headers, optional CSRF allowlisting, and the CVE fix so both templates and future apps can consume it from `@repo/infra`.

## Decision

- Introduce a **middleware factory** in `packages/infra`: `createMiddleware(options)` that returns a Next.js middleware function.
- The factory:
  1. **Strips `x-middleware-subrequest`** from incoming request headers before calling `NextResponse.next()`, so it cannot be spoofed (CVE-2025-29927).
  2. Applies **nonce-based CSP** and **security headers** (via existing infra CSP and security-headers modules).
  3. Supports an optional **`allowedOrigins`** option for edge CSRF: when set, requests with an `Origin` header are allowed only if the origin is in the list; otherwise the middleware returns 403.
- Templates keep their own `config.matcher` and export `middleware = createMiddleware({})` (or with options). No change to Next.js matcher semantics.
- Middleware is exported from `@repo/infra`; templates depend on `@repo/infra` and use the factory in `middleware.ts`.

## Consequences

### Positive

- Single source of truth for CSP and security headers in middleware; fixes and improvements apply to all templates.
- CVE-2025-29927 is mitigated by design for any app using the factory.
- Optional `allowedOrigins` provides defense-in-depth for CSRF at the edge without changing Server Action validation.
- Factory is unit-tested (header stripping, allowedOrigins, CSP/headers presence).

### Negative

- Templates must depend on `@repo/infra` and use the factory; custom middleware logic must be composed or extended outside the factory (e.g. by wrapping the returned function).

## References

- CVE-2025-29927: Next.js middleware authorization bypass via `x-middleware-subrequest`.
- Task: TODO.md § 1.1.7 (Create middleware factory).
- Implementation: `packages/infra/middleware/create-middleware.ts`, `packages/infra/__tests__/create-middleware.test.ts`.

---

**Date:** 2026-02-13
