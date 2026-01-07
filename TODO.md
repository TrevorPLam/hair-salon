
# TODO.md — Repository Task List

Document Type: Workflow
Last Updated: 2026-01-07
Task Truth Source: **TODO.md**

This file is the single source of truth for actionable work. If another document disagrees, the task record in this file wins (unless the Constitution overrides).

## Goals (from chat)
- Site: High-performance marketing site for “Your Dedicated Marketer”
- Hosting: Cloudflare Pages (GitHub integration)
- Standard: Diamond Standard (performance, accessibility, observability, testing)
- Keep: Sentry, PWA, Search
- Contact flow: Store lead in Supabase (server-only) + sync to HubSpot CRM
	- No email sending
	- Save suspicious submissions but flag them (suspicious = too many requests)
	- Required fields: Name, Email, Phone
	- UX: Return success even if HubSpot sync fails (best-effort)

## Task Schema (Required)
- **ID**: `T-###` (unique, sequential)
- **Priority**: `P0 | P1 | P2 | P3`
- **Type**: `SECURITY | RELEASE | DEPENDENCY | DOCS | QUALITY | BUG | FEATURE | CHORE`
- **Owner**: `AGENT | Trevor`
- **Status**: `READY | BLOCKED | IN-PROGRESS | IN-REVIEW | DONE`
- **Context**: why the task exists (1–5 bullets)
- **Acceptance Criteria**: verifiable checklist (broken into subtasks T-###.#)
- **References**: file paths and/or links inside this repo
- **Dependencies**: task IDs (if any)
- **Effort**: `XS | S | M | L | XL` (XS = < 30 min, S = < 2 hr, M = < 4 hr, L = < 1 day, XL = > 1 day)

### Priority Meaning
- **P0**: BLOCKS BUILD or causes security/data loss — fix immediately
- **P1**: High impact; do within 7 days
- **P2**: Important but not urgent; do within 30 days
- **P3**: Backlog/tech debt; do when convenient

### Ownership Rule
- **Owner: AGENT** — task can be executed by Codex/Claude Code/Copilot in-repo
- **Owner: Trevor** — requires external actions (provider dashboards, DNS, billing, approvals)

---

## 🔴 PHASE 0: Build & Deploy Blockers (P0)
> These MUST be fixed before feature work, otherwise Cloudflare deploys will fail.

### T-050: Restore green local install/build/test
Priority: P0
Type: DEPENDENCY
Owner: AGENT
Status: DONE
Context:
- In this workspace, `npm run lint` failed with `next: not found` (suggests deps not installed)
- Need a known-good baseline before Cloudflare Pages integration
Acceptance Criteria:
- [x] T-050.1: Run `npm install` successfully (no registry 403)
- [x] T-050.2: Run `npm run build` successfully
- [x] T-050.3: Run `npm run test` successfully
- [x] T-050.4: Run `npm run type-check` successfully
- [x] T-050.5: Run `npm run lint` successfully
References:
- /package.json
Dependencies: None
Effort: S

### T-051: Unblock npm registry access (if installs fail)
Priority: P0
Type: DEPENDENCY
Owner: Trevor
Status: DONE
Context:
- Earlier repo history reported `npm install` returning 403 for type packages
- Cloudflare Pages builds will also fail if registry access is blocked
- **Verification**: `npm-registry-check.mjs` passes and `npm install` works locally.
Acceptance Criteria:
- [x] T-051.1: Provide registry/proxy credentials or allowlist so `npm install` succeeds
- [x] T-051.2: Confirm `npm install` works locally and in Cloudflare Pages build logs
References:
- /scripts/npm-registry-check.mjs
- /package.json
Dependencies: None
Effort: XS

### T-052: Enable Cloudflare Pages build (GitHub integration)
Priority: P0
Type: RELEASE
Owner: AGENT
Status: DONE
Context:
- Hosting target is Cloudflare Pages via GitHub integration
- Next.js App Router requires Cloudflare-compatible build output
- **Implementation Note**: Downgraded to Next.js 15.5.2 and ESLint 9 compatible config to ensure stability with `@cloudflare/next-on-pages`.
Acceptance Criteria:
- [x] T-052.1: Add Cloudflare Pages build instructions to `/docs/DEPLOYMENT.md`
- [x] T-052.2: Configure repo for Cloudflare Pages Next.js deployment (documented + reproducible)
- [x] T-052.3: Produce a successful Cloudflare Pages preview build (no runtime errors)
References:
- /docs/DEPLOYMENT.md
- /next.config.mjs
- /middleware.ts
Dependencies: T-050
Effort: M

---

## 🟠 PHASE 1: Lead Capture Pipeline (Supabase + HubSpot) (P1)
> Replace email delivery with DB + CRM while preserving spam controls.

### T-053: Migrate contact form pipeline to Supabase (DB) + HubSpot (CRM)
Priority: P1
Type: FEATURE
Owner: AGENT
Status: BLOCKED
Context:
- Chat decision: no email; save lead to Supabase (server-only) and sync to HubSpot CRM
- Must preserve current UX contract (success/error messages) in `submitContactForm`
- Save suspicious submissions but flag them (suspicious = too many requests)
Acceptance Criteria:
- [ ] T-053.1: Update schema so Name/Email/Phone are required (keep message required)
- [ ] T-053.2: Add env validation for Supabase + HubSpot server-only secrets
- [ ] T-053.3: Insert lead into Supabase with `is_suspicious` + `suspicion_reason`
- [ ] T-053.4: Upsert HubSpot contact by email; store HubSpot IDs + sync status in Supabase
- [ ] T-053.5: If HubSpot fails, return success and mark lead `hubspot_sync_status = 'needs_sync'`
- [ ] T-053.6: Update `scripts/check-client-secrets.mjs` to forbid new secret env names
- [ ] T-053.7: Remove email-send behavior from `lib/actions.ts` and remove unused Resend config/deps
- [ ] T-053.8: Add unit test(s) for: rate-limit flagged lead saved; HubSpot failure still returns success
References:
- /lib/actions.ts
- /lib/contact-form-schema.ts
- /components/ContactForm.tsx
- /lib/env.ts
- /env.example
- /scripts/check-client-secrets.mjs
Dependencies: T-054, T-055, T-050
Effort: L

### T-054: Provision Supabase project + provide server credentials
Priority: P1
Type: RELEASE
Owner: Trevor
Status: READY
Context:
- Supabase will store leads (server-only access)
- Requires Supabase project + keys configured in Cloudflare Pages environment variables
Acceptance Criteria:
- [ ] T-054.1: Create Supabase project
- [ ] T-054.2: Provide `SUPABASE_URL`
- [ ] T-054.3: Provide `SUPABASE_SERVICE_ROLE_KEY` (server-only)
- [ ] T-054.4: Create `leads` table (or approve SQL migration plan)
References:
- /env.example
- /docs/DEPLOYMENT.md
Dependencies: None
Effort: S

### T-055: Provision HubSpot private app token + field mapping
Priority: P1
Type: RELEASE
Owner: Trevor
Status: READY
Context:
- HubSpot is the CRM target; contact records should be created/updated on submission
- Requires a private app token stored as a Cloudflare Pages server-only env var
Acceptance Criteria:
- [ ] T-055.1: Create HubSpot private app
- [ ] T-055.2: Provide `HUBSPOT_PRIVATE_APP_TOKEN` (server-only)
- [ ] T-055.3: Confirm mapping for required fields: Name, Email, Phone
References:
- /docs/DEPLOYMENT.md
- /env.example
Dependencies: None
Effort: XS

### T-056: Add input validation to OG image route
Priority: P1
Type: SECURITY
Owner: AGENT
Status: READY
Context:
- OG route accepts query params without bounds
- Diamond Standard requires defense-in-depth validation
Acceptance Criteria:
- [ ] T-056.1: Add Zod schema for query params with max lengths (title: 200, subtitle: 500)
- [ ] T-056.2: Sanitize with `escapeHtml` from `/lib/sanitize.ts`
- [ ] T-056.3: Return 400 for invalid inputs
- [ ] T-056.4: Add unit test for validation
References:
- /app/api/og/route.tsx
- /lib/sanitize.ts
Dependencies: T-050
Effort: S

---

## 🟡 PHASE 2: Diamond Standard Quality (P2)
> Accessibility, performance, observability, and testing.

### T-057: Accessibility audit (WCAG 2.1 AA)
Priority: P2
Type: QUALITY
Owner: AGENT
Status: READY
Context:
- Diamond Standard requires WCAG 2.1 AA compliance
- Need systematic checks (keyboard nav, focus states, contrast)
Acceptance Criteria:
- [ ] T-057.1: Add axe tooling and a repeatable audit script
- [ ] T-057.2: Fix any discovered a11y issues on core pages (home/services/pricing/contact)
- [ ] T-057.3: Document a11y standards in `/docs/UI_DESIGN_SYSTEM.md`
References:
- /docs/UI_DESIGN_SYSTEM.md
- /components/
- /app/
Dependencies: T-050
Effort: M

### T-058: Performance baselines + budgets (Lighthouse)
Priority: P2
Type: QUALITY
Owner: AGENT
Status: READY
Context:
- Diamond Standard requires strong Core Web Vitals
- Need baseline measurements before setting strict budgets
Acceptance Criteria:
- [ ] T-058.1: Add a local Lighthouse config and script
- [ ] T-058.2: Capture baseline metrics for mobile (home/services/pricing/contact)
- [ ] T-058.3: Define budgets as regression guards (not arbitrary hard fails)
- [ ] T-058.4: Document targets in `/docs/OBSERVABILITY.md`
References:
- /docs/OBSERVABILITY.md
- /package.json
Dependencies: T-050
Effort: M

### T-059: Strengthen Sentry (errors + performance)
Priority: P2
Type: QUALITY
Owner: AGENT
Status: READY
Context:
- Sentry is kept
- Want actionable errors and form submission visibility
Acceptance Criteria:
- [ ] T-059.1: Add granular error boundaries where appropriate
- [ ] T-059.2: Ensure production source maps are configured and safe
- [ ] T-059.3: Add performance instrumentation for contact submissions
- [ ] T-059.4: Update `/docs/SENTRY-SETUP.md` and `/docs/OBSERVABILITY.md`
References:
- /components/ErrorBoundary.tsx
- /docs/SENTRY-SETUP.md
- /docs/OBSERVABILITY.md
Dependencies: T-050
Effort: M

### T-060: E2E tests for critical user journeys
Priority: P2
Type: QUALITY
Owner: AGENT
Status: READY
Context:
- Diamond Standard requires confidence in core flows
- Contact flow is security + lead-critical; search/404 are UX-critical
Acceptance Criteria:
- [ ] T-060.1: Add E2E test for contact submission success
- [ ] T-060.2: Add E2E test for rate limiting behavior (suspicious flag path)
- [ ] T-060.3: Add E2E test for 404 page
- [ ] T-060.4: Add E2E test for search with no results
References:
- /tests/
- /components/ContactForm.tsx
Dependencies: T-053
Effort: M

### T-061: Unit test coverage threshold for critical paths
Priority: P2
Type: QUALITY
Owner: AGENT
Status: READY
Context:
- Diamond Standard expects meaningful unit coverage on critical components
Acceptance Criteria:
- [ ] T-061.1: Set coverage thresholds in `/vitest.config.ts`
- [ ] T-061.2: Add unit tests for key components (Hero, ValueProps, ServicesOverview, SocialProof)
References:
- /vitest.config.ts
- /__tests__/components/
- /components/
Dependencies: T-050
Effort: L

### T-062: Structured data for SEO (Article/Service/Breadcrumb)
Priority: P2
Type: QUALITY
Owner: AGENT
Status: READY
Context:
- Diamond Standard SEO: structured data improves rich results + clarity
Acceptance Criteria:
- [ ] T-062.1: Add Article schema to blog posts
- [ ] T-062.2: Add Service schema to service pages
- [ ] T-062.3: Add BreadcrumbList schema where breadcrumbs exist
- [ ] T-062.4: Validate via Google Rich Results Test
References:
- /app/blog/
- /app/services/
- /components/Breadcrumbs.tsx
Dependencies: T-050
Effort: M

### T-063: Image optimization audit (next/image)
Priority: P2
Type: QUALITY
Owner: AGENT
Status: READY
Context:
- Images are a common performance bottleneck
Acceptance Criteria:
- [ ] T-063.1: Convert any `<img>` tags to `next/image` where appropriate
- [ ] T-063.2: Ensure explicit sizes + lazy loading + `priority` for above-fold hero
- [ ] T-063.3: Document guidelines in `/docs/UI_DESIGN_SYSTEM.md`
References:
- /components/
- /app/
- /docs/UI_DESIGN_SYSTEM.md
Dependencies: T-050
Effort: M

### T-064: Analytics provider selection and rollout
Priority: P2
Type: QUALITY
Owner: Trevor
Status: READY
Context:
- Diamond Standard marketing site should have conversion tracking
- Provider choice required (GA4/Plausible/etc.)
Acceptance Criteria:
- [ ] T-064.1: Choose analytics provider
- [ ] T-064.2: Provide `NEXT_PUBLIC_ANALYTICS_ID` (if needed)
- [ ] T-064.3: Confirm which events/conversions to track (contact submit, CTA clicks)
References:
- /lib/analytics.ts
- /lib/env.ts
Dependencies: None
Effort: XS

---

## 🟦 PHASE 3: Release Hygiene (P2)
> Make releases repeatable and safe.

### T-065: Update deployment docs for Cloudflare Pages + secrets
Priority: P2
Type: DOCS
Owner: AGENT
Status: READY
Context:
- `/docs/DEPLOYMENT.md` is currently a template
- Needs to reflect actual Cloudflare Pages process and required env vars
Acceptance Criteria:
- [ ] T-065.1: Document Cloudflare Pages build settings (build cmd, output, Node version)
- [ ] T-065.2: Document required env vars (Supabase, HubSpot, Sentry, Upstash)
- [ ] T-065.3: Document rollback procedure
- [ ] T-065.4: Document DNS/domain setup checklist
References:
- /docs/DEPLOYMENT.md
- /env.example
Dependencies: T-052
Effort: S

