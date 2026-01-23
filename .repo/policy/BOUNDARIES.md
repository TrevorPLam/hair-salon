# Module Boundaries

**File**: `.repo/policy/BOUNDARIES.md`

This file defines module boundaries. Boundaries are enforced.

> **Related**: See `.repo/policy/PRINCIPLES.md` Principle 13 (Respect Boundaries by Default) and Principle 14 (Localize Complexity).

## Model
nextjs_app_router

## Directory Structure
- **app/** — Next.js App Router pages, layouts, and API routes
- **components/** — Reusable React components
- **lib/** — Shared utilities and business logic
- **__tests__/** — Unit and integration tests
- **tests/e2e/** — End-to-end tests

## Default Allowed Import Direction (Plain English)
- Components may import from `lib/` utilities
- App routes may import from `components/` and `lib/`
- Tests may import from any source code directory
- `lib/` should not import from `app/` or `components/` (utilities are shared)

Machine form:
app → components → lib
components → lib
tests → (any source)

## Cross-Directory Rule
- Avoid circular dependencies
- Keep `lib/` utilities independent and reusable
- Components should be self-contained when possible

## Enforcement Method
manual_review
Meaning: Boundaries are enforced through code review and architectural decisions. No automatic static checker for Next.js App Router structure.

## Exceptions
- Small exception: allowed only with explicit Task Packet justification + filepaths.
- Large exception: requires ADR.
All exceptions must be documented in PR narration.

## Violation Severity
waiver_plus_auto_task
Meaning: if boundaries are violated:
- PR is blocked unless fixed or waived
- if waived, an auto-task is created in TODOs with remediation plan

## Boundary Visibility
inline_comments_plus_summary
Meaning: boundary-related decisions must be visible in code comments where relevant and summarized in PR narration (see Principle 17: PR Narration).

## Practical Examples (Plain English)
Allowed:
- `app/about/page.tsx` imports from `components/Button.tsx`
- `components/ContactForm.tsx` imports from `lib/validation.ts`
- `app/api/contact/route.ts` imports from `lib/email.ts`

Not Allowed (without justification):
- `lib/utils.ts` imports from `app/about/page.tsx` (lib should be independent)
- Circular dependencies between components

## Next.js App Router Specifics
- Use Server Components by default
- Use `'use client'` directive only when needed (interactivity, hooks, browser APIs)
- Keep API routes in `app/api/` directory
- Use middleware.ts for cross-cutting concerns (security headers, etc.)

---
**Canonical reference:** This document defines boundaries for Next.js App Router structure. Adapt as needed for your specific architecture.
