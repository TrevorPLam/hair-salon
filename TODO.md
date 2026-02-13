# Marketing Monorepo — Executable Task List for AI Agents

> **Principle**: Share infrastructure, not design. Each phase builds on the previous. Do not skip ahead.  
> **Last updated**: 2026-02-13
>
> **Format**: Each task is markable `- [ ]`. Main tasks contain subtasks. Every task declares: **Paths**, **Depends on**, **Verify** (tests to create or commands to run).

---

## Phase 1 — Extract & Share Infrastructure

**Depends on**: none | **Verify phase**: `pnpm build` (both templates), `pnpm test` (both templates)

### 1.1 Create `packages/infra/` — Security & Middleware

**Depends on**: none (blocking) | **Paths**: `packages/infra/**`, `templates/hair-salon/lib/**`, `templates/hair-salon/middleware.ts`

- [x] **1.1.1** Create `packages/infra` package

  - **Path**: `packages/infra/package.json`
  - **Verify**: Add to `pnpm-workspace.yaml` if needed; run `pnpm install`
  - [x] **1.1.1a** Create `package.json` with name `@repo/infra`
  - [x] **1.1.1b** Add `packages/infra` to workspace in `pnpm-workspace.yaml`

- [x] **1.1.2** Extract and migrate CSP module

  - **Path**: `packages/infra/security/csp.ts`
  - **Source**: `templates/hair-salon/lib/csp.ts`
  - **Depends on**: 1.1.1
  - **Verify**: Create `packages/infra/__tests__/csp.test.ts` — test `createCspNonce()` returns non-empty base64; test `buildContentSecurityPolicy()` includes `strict-dynamic` in prod
  - [x] **1.1.2a** Copy CSP logic to `packages/infra/security/csp.ts`
  - [x] **1.1.2b** Add nonce-based CSP with `strict-dynamic`; remove `unsafe-inline`/`unsafe-eval` in production
  - [x] **1.1.2c** Add CSP violation reporting (`report-uri` or `report-to`)

- [x] **1.1.3** Extract security headers

  - **Path**: `packages/infra/security/security-headers.ts`
  - **Source**: `templates/hair-salon/lib/security-headers.ts`
  - **Depends on**: 1.1.1
  - **Verify**: Unit test — `getSecurityHeaders('production')` returns `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`
  - [x] **1.1.3a** Extract to `packages/infra/security/security-headers.ts`
  - [x] **1.1.3b** Add `Permissions-Policy` (camera, microphone, geolocation)

- [x] **1.1.4** Extract sanitize module

  - **Path**: `packages/infra/security/sanitize.ts`
  - **Source**: `templates/hair-salon/lib/sanitize.ts`
  - **Depends on**: 1.1.1
  - **Verify**: Move `templates/hair-salon/lib/__tests__/sanitize.test.ts` → `packages/infra/__tests__/sanitize.test.ts`; tests pass
  - [x] **1.1.4a** Move `templates/hair-salon/lib/__tests__/sanitize.test.ts` → `packages/infra/__tests__/sanitize.test.ts`
  - [x] **1.1.4b** Tests pass

- [x] **1.1.5** Extract and enhance rate-limit module

  - **Path**: `packages/infra/security/rate-limit.ts`
  - **Source**: `templates/hair-salon/lib/rate-limit.ts`
  - **Depends on**: 1.1.1
  - **Verify**: Unit tests — sliding window, IP/user/email limiting, per-route presets
  - [x] **1.1.5a** Extract to `packages/infra/security/rate-limit.ts`
  - [x] **1.1.5b** Implement sliding window via `Ratelimit.slidingWindow()`
  - [x] **1.1.5c** Export `limitByIp(prefix)` for Server Actions (IP from `headers()`)
  - [x] **1.1.5d** Export `limitByUserId(prefix, userId)` for authenticated
  - [x] **1.1.5e** Add per-route presets (stricter for contact/booking)

- [x] **1.1.6** Extract request-validation

  - **Path**: `packages/infra/security/request-validation.ts`
  - **Source**: `templates/hair-salon/lib/request-validation.ts`
  - **Depends on**: 1.1.1
  - **Verify**: Import from `@repo/infra` in one template; type-check passes
  - [x] **1.1.6a** Extract to `packages/infra/security/request-validation.ts` with 2026 security best practices
  - [x] **1.1.6b** Enhanced with OWASP 2026 CSRF protection, IP validation, and comprehensive logging
  - [x] **1.1.6c** Created comprehensive test suite with Jest compatibility
  - [x] **1.1.6d** Updated both templates to use `@repo/infra/security/request-validation`
  - [x] **1.1.6e** Added TypeScript path mappings for proper module resolution

- [x] **1.1.7** Create middleware factory

  - **Path**: `packages/infra/middleware/create-middleware.ts`
  - **Source**: `templates/hair-salon/middleware.ts`
  - **Depends on**: 1.1.2, 1.1.3
  - **Verify**: Template `middleware.ts` calls `createMiddleware(options)`; run `pnpm dev` for hair-salon; CSP and security headers present in response
  - [x] **1.1.7a** Create `createMiddleware(options)` factory
  - [x] **1.1.7b** **CRITICAL**: Strip `x-middleware-subrequest` header in factory (CVE mitigation)
  - [x] **1.1.7c** Add `allowedOrigins` option for CSRF

- [x] **1.1.8** Extract logger

  - **Path**: `packages/infra/logger/index.ts`
  - **Source**: `templates/hair-salon/lib/logger.ts`
  - **Depends on**: 1.1.1
  - **Verify**: Production mode logs JSON format (Vercel Log Drain compatible)
  - [x] **1.1.8a** Extracted to `packages/infra/logger`; client-safe logger in `logger/client.ts` for client components
  - [x] **1.1.8b** Unit test for JSON format in production mode

- [x] **1.1.9** Extract request-context

  - **Path**: `packages/infra/context/request-context.ts`, `packages/infra/context/request-context.server.ts`
  - **Source**: `templates/hair-salon/lib/request-context.ts`, `lib/request-context.server.ts`
  - **Depends on**: 1.1.1
  - **Verify**: Import in one template; request ID available in logs
  - [x] **1.1.9a** Stub (request-context.ts) and server (request-context.server.ts) extracted

- [x] **1.1.10** Extract Sentry modules

  - **Path**: `packages/infra/sentry/client.ts`, `server.ts`, `sanitize.ts`
  - **Source**: `templates/hair-salon/lib/sentry-client.ts`, `sentry-server.ts`, `sentry-sanitize.ts`
  - **Depends on**: 1.1.1
  - **Verify**: Sentry initialization works in hair-salon dev
  - [x] **1.1.10a** Client in `sentry/client.ts` (client barrel only), server and sanitize in main barrel

- [x] **1.1.11** Create barrel exports

  - **Path**: `packages/infra/index.ts`, `packages/infra/index.client.ts`
  - **Depends on**: 1.1.2–1.1.10
  - **Verify**: `import { createCspNonce } from '@repo/infra'` works; client barrel excludes server-only code
  - [x] **1.1.11a** Export map includes `./context/request-context` and `./context/request-context.server`

- [x] **1.1.12** Migrate hair-salon to `@repo/infra`

  - **Paths**: `templates/hair-salon/**/*.ts`, `templates/hair-salon/middleware.ts`
  - **Depends on**: 1.1.11
  - **Verify**: `pnpm build` (hair-salon), `pnpm test`, no imports from `@/lib/` for extracted modules
  - [x] **1.1.12a** All extracted modules now imported from `@repo/infra` or `@repo/infra/client`

- [x] **1.1.13** Migrate plumber to `@repo/infra`

  - **Paths**: `templates/plumber/**/*.ts`, `templates/plumber/middleware.ts`
  - **Depends on**: 1.1.12
  - **Verify**: `pnpm build` (plumber), `pnpm test`
  - [x] **1.1.13a** Plumber uses `createMiddleware` and all infra imports; build and test pass

- [x] **1.1.14** Delete duplicated lib files from templates
  - **Paths**: `templates/hair-salon/lib/`, `templates/plumber/lib/`
  - **Depends on**: 1.1.13
  - **Verify**: No duplicate csp, security-headers, sanitize, rate-limit, request-validation, logger, request-context, sentry-\*; `pnpm build` and `pnpm test` pass for both
  - [x] **1.1.14a** Removed duplicate files; template sanitize tests updated to use `@repo/infra`

---

### 1.2 Create `packages/infra/env/` — Env Validation

**Depends on**: 1.1.1 | **Paths**: `packages/infra/env/**`, `templates/*/lib/env.ts`

- [ ] **1.2.1** Create base env schema

  - **Path**: `packages/infra/env/schemas/base.ts`
  - **Verify**: Zod schema with `NODE_ENV`, `SITE_URL`, `SITE_NAME`, `ANALYTICS_ID`; use `z.coerce`/`.transform()` where needed

- [ ] **1.2.2** Create rate-limit env schema

  - **Path**: `packages/infra/env/schemas/rate-limit.ts`
  - **Verify**: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (optional)

- [ ] **1.2.3** Create supabase, hubspot, booking, sentry env schemas

  - **Paths**: `packages/infra/env/schemas/supabase.ts`, `hubspot.ts`, `booking.ts`, `sentry.ts`
  - **Verify**: Each schema validates; compose via `.merge()`

- [ ] **1.2.4** Create public env schema

  - **Path**: `packages/infra/env/schemas/public.ts`
  - **Verify**: `NEXT_PUBLIC_*` vars only; safe for client

- [ ] **1.2.5** Create validate and compose helpers

  - **Path**: `packages/infra/env/validate.ts`, `packages/infra/env/types.ts`
  - **Verify**: `z.infer<typeof schema>` for types; fail early with descriptive Zod errors

- [ ] **1.2.6** Update templates to use composable env
  - **Paths**: `templates/hair-salon/lib/env.ts`, `templates/plumber/lib/env.ts`
  - **Depends on**: 1.2.1–1.2.5
  - **Verify**: `pnpm dev` and `pnpm build` for both; env validation runs at startup

---

### 1.3 Create `packages/integrations/supabase/`

**Depends on**: 1.1.1 | **Paths**: `packages/integrations/supabase/**`, `templates/hair-salon/features/supabase/**`

- [ ] **1.3.1** Create package

  - **Path**: `packages/integrations/supabase/package.json`
  - **Verify**: `pnpm install`; package builds

- [ ] **1.3.2** Move supabase-leads and client

  - **Paths**: `packages/integrations/supabase/leads.ts`, `client.ts`
  - **Source**: `templates/hair-salon/features/supabase/lib/`
  - **Verify**: Import from `@repo/integrations-supabase` in submit action; lead insert works (or mocked)

- [ ] **1.3.3** Export types

  - **Path**: `packages/integrations/supabase/types.ts`
  - **Verify**: `SupabaseLeadRow` etc. exported

- [ ] **1.3.4** Update templates and delete duplicated feature
  - **Paths**: `templates/*/lib/actions/submit.ts`, `templates/*/features/supabase/`
  - **Verify**: `pnpm build` both; no `features/supabase` dir in templates

---

### 1.4 Create `packages/integrations/hubspot/`

**Depends on**: 1.1.1 | **Paths**: `packages/integrations/hubspot/**`, `templates/hair-salon/features/hubspot/**`, `templates/hair-salon/lib/actions/hubspot.ts`

- [ ] **1.4.1** Create package

  - **Path**: `packages/integrations/hubspot/package.json`
  - **Verify**: `pnpm install`; package builds

- [ ] **1.4.2** Move hubspot-client and sync logic

  - **Paths**: `packages/integrations/hubspot/client.ts`, `sync.ts`
  - **Source**: `templates/hair-salon/features/hubspot/`, `lib/actions/hubspot.ts`
  - **Verify**: Retry/upsert logic preserved

- [ ] **1.4.3** Export types and update templates
  - **Path**: `packages/integrations/hubspot/types.ts`
  - **Verify**: `pnpm build` both; delete `features/hubspot` from templates

---

### 1.5 Create `packages/integrations/booking-providers/`

**Depends on**: 1.1.1 | **Paths**: `packages/integrations/booking-providers/**`, `templates/hair-salon/features/booking/lib/booking-providers.ts`

- [ ] **1.5.1** Create package and move providers

  - **Paths**: `packages/integrations/booking-providers/package.json`, `providers.ts`, `factory.ts`
  - **Source**: `templates/hair-salon/features/booking/lib/booking-providers.ts`
  - **Verify**: `MindbodyProvider`, `VagaroProvider`, `SquareProvider`, `BookingProviders` factory

- [ ] **1.5.2** Add Cal.com adapter

  - **Path**: `packages/integrations/booking-providers/cal-com.ts`
  - **Verify**: Cal.com provider implements same interface

- [ ] **1.5.3** Update hair-salon and delete duplicated code
  - **Paths**: `templates/hair-salon/features/booking/`
  - **Verify**: `pnpm build` hair-salon; booking flow works or mocked

---

### 1.6 Create `packages/integrations/analytics/`

**Depends on**: 1.1.1 | **Paths**: `packages/integrations/analytics/**`, `templates/hair-salon/features/analytics/**`

- [ ] **1.6.1** Create package and move analytics logic

  - **Paths**: `packages/integrations/analytics/package.json`, `tracking.ts`, `consent.ts`, `vercel.ts`
  - **Source**: `templates/hair-salon/features/analytics/`
  - **Verify**: Consent management (GDPR/CCPA); Vercel Web Analytics + Speed Insights helpers

- [ ] **1.6.2** Update templates and delete duplicated feature
  - **Paths**: `templates/*/`
  - **Verify**: `pnpm build` both; no `features/analytics` in templates

---

### 1.7 Extract Shared Feature Packages

**Depends on**: 1.3, 1.4, 1.5, 1.6

#### 1.7.1 `packages/features/contact/`

- [ ] **1.7.1.1** Create package

  - **Path**: `packages/features/contact/package.json`
  - **Verify**: `pnpm install`

- [ ] **1.7.1.2** Move schema and ContactForm

  - **Paths**: `packages/features/contact/schema.ts`, `ContactForm.tsx`
  - **Source**: `templates/hair-salon/features/contact/`, `lib/actions/submit.ts` + helpers
  - **Verify**: Schema validates; form renders

- [ ] **1.7.1.3** Move server actions (compose integrations + rate-limit)

  - **Path**: `packages/features/contact/actions.ts`
  - **Verify**: Rate limit applied; Supabase + HubSpot used

- [ ] **1.7.1.4** Update both templates
  - **Paths**: `templates/hair-salon/**`, `templates/plumber/**`
  - **Verify**: `pnpm build` both; contact form submits

#### 1.7.2 `packages/features/booking/`

- [ ] **1.7.2.1** Create package; move schema, BookingForm, actions

  - **Paths**: `packages/features/booking/package.json`, `schema.ts`, `BookingForm.tsx`, `actions.ts`
  - **Source**: `templates/hair-salon/features/booking/`
  - **Verify**: Composes `@repo/integrations-booking-providers`

- [ ] **1.7.2.2** Update hair-salon
  - **Paths**: `templates/hair-salon/**`
  - **Verify**: `pnpm build`; booking flow works

#### 1.7.3 `packages/features/blog/`

- [ ] **1.7.3.1** Create package; move MDX utilities, BlogPostCard

  - **Paths**: `packages/features/blog/package.json`, `mdx.ts`, `BlogPostCard.tsx`
  - **Source**: `templates/hair-salon/features/blog/`
  - **Verify**: Move `features/blog/__tests__/blog.test.ts` → `packages/features/blog/__tests__/blog.test.ts`; tests pass

- [ ] **1.7.3.2** Update both templates; keep content in `templates/*/content/blog/`
  - **Verify**: `pnpm build` both; blog pages render

#### 1.7.4 `packages/features/search/`

- [ ] **1.7.4.1** Create package; move index builder, SearchOverlay, SearchResults
  - **Paths**: `packages/features/search/package.json`, `index.ts`, `SearchOverlay.tsx`, `SearchResults.tsx`
  - **Source**: `templates/hair-salon/features/search/`, `lib/search.ts`
  - **Verify**: Move search tests if any; `pnpm build` both

#### 1.7.5 `packages/features/gallery/` (NEW)

- [ ] **1.7.5.1** Create package

  - **Path**: `packages/features/gallery/package.json`
  - **Verify**: `pnpm install`

- [ ] **1.7.5.2** Implement layout components
  - **Paths**: `packages/features/gallery/MasonryGrid.tsx`, `UniformGrid.tsx`, `Lightbox.tsx`, `GalleryCarousel.tsx`, `FilterBar.tsx`, `BeforeAfterSlider.tsx`, `GalleryItem.tsx`
  - **Verify**: Unit test for at least one component (e.g. Lightbox opens/closes)

#### 1.7.6 `packages/features/team/` (NEW)

- [ ] **1.7.6.1** Create package; implement TeamGrid, TeamCarousel, PersonProfile, Avatar
  - **Paths**: `packages/features/team/package.json`, `TeamGrid.tsx`, `TeamCarousel.tsx`, `PersonProfile.tsx`, `Avatar.tsx`
  - **Verify**: Component renders with sample data

#### 1.7.7 `packages/features/reviews/` (NEW)

- [ ] **1.7.7.1** Create package; implement ReviewCard, ReviewCarousel, StarRating, AggregateRating, JSON-LD
  - **Paths**: `packages/features/reviews/package.json`, `ReviewCard.tsx`, `ReviewCarousel.tsx`, `StarRating.tsx`, `AggregateRating.tsx`, `schema.ts`, `aggregate.ts`
  - **Verify**: `AggregateRating` JSON-LD validates in Rich Results Test

---

### 1.8 Clean Up Templates Post-Extraction

**Depends on**: 1.1–1.7 complete

- [ ] **1.8.1** Remove extracted features and lib from templates

  - **Paths**: `templates/hair-salon/features/`, `templates/hair-salon/lib/`, `templates/plumber/features/`, `templates/plumber/lib/`
  - **Verify**: Only `app/`, `components/`, `content/`, `site.config.ts`, `middleware.ts`, `globals.css`, configs remain

- [ ] **1.8.2** Full verification
  - **Verify**: `pnpm build` (both), `pnpm test` (both), `pnpm type-check` (both)

---

### 1.9 Address Codebase Analysis Issues

**Depends on**: none (parallel to 1.2–1.8) | **Reference**: [CODEBASE_ANALYSIS.md](./CODEBASE_ANALYSIS.md) §9

- [ ] **1.9.1** Plumber content — /about

  - **Path**: `templates/plumber/app/about/page.tsx`
  - **Verify**: Content is plumber-specific (company story, values, stats); no "haircut" references

- [ ] **1.9.2** Plumber content — /services/\*

  - **Paths**: `templates/plumber/app/services/page.tsx`, `templates/plumber/app/services/[slug]/page.tsx`
  - **Verify**: Services: residential-repair, commercial-service, emergency-response, maintenance-plan

- [ ] **1.9.3** Plumber content — /pricing, /team, /gallery, /book

  - **Paths**: `templates/plumber/app/pricing/page.tsx`, `team/page.tsx`, `gallery/page.tsx`, `book/page.tsx`
  - **Verify**: Plumber pricing, staff, work photos, quote/booking copy

- [ ] **1.9.4** Plumber content — Blog and SEO

  - **Paths**: `templates/plumber/content/blog/`, `templates/plumber/app/layout.tsx`
  - **Verify**: Plumber topics or redirect; layout keywords for plumber

- [ ] **1.9.5** Public assets — hair-salon

  - **Path**: `templates/hair-salon/public/`
  - **Verify**: Add or document: `manifest.json`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `logo.png`, `images/hero-salon.svg`

- [ ] **1.9.6** Public assets — plumber

  - **Path**: `templates/plumber/public/`
  - **Verify**: Plumber equivalents

- [ ] **1.9.7** Port conflict

  - **Path**: `templates/plumber/package.json`
  - **Verify**: `"dev": "next dev -p 3101"`; both templates run simultaneously without conflict

- [ ] **1.9.8** Jest moduleNameMapper for plumber

  - **Path**: `jest.config.js` or `templates/plumber/jest.config.js`
  - **Verify**: Plumber tests resolve `@/*` to `templates/plumber/*`

- [ ] **1.9.9** Docker — add plumber or document

  - **Path**: `docker-compose.yml`
  - **Verify**: Plumber service on 3101 or README documents single-template Docker

- [ ] **1.9.10** @repo/ui unit tests

  - **Paths**: `packages/ui/src/Button/__tests__/Button.test.tsx`, etc.
  - **Verify**: Unit tests for Button, Card, Container, Section, Input, Select, Textarea, Accordion; `pnpm test` passes

- [ ] **1.9.11** Documentation alignment
  - **Path**: `docs/`
  - **Verify**: Docs reflect current state; mark "planned" vs "done" where aspirational

---

## Phase 2 — Expand UI Primitives & Compositions

**Depends on**: Phase 1 (or at least 1.1) | **Paths**: `packages/ui/**`

### 2.1 Audit Current Primitives

- [ ] **2.1.1** Review 8 existing components

  - **Paths**: `packages/ui/src/`
  - **Verify**: Document in `packages/ui/README.md` — Button, Card, Container, Section, Input, Select, Textarea, Accordion

- [ ] **2.1.2** Document gaps vs catalog

  - **Path**: `packages/ui/README.md`
  - **Verify**: List missing primitives needed for catalog patterns

- [ ] **2.1.3** Evaluate Radix UI adoption
  - **Verify**: Decision doc — use Radix as headless a11y layer under styled components?

---

### 2.2 Add Content Primitives

**Depends on**: 2.1 | **Paths**: `packages/ui/src/`

- [ ] **2.2.1** Badge — **Path**: `packages/ui/src/Badge/Badge.tsx` — **Verify**: Unit test; 24×24px min touch if interactive
- [ ] **2.2.2** Avatar — **Path**: `packages/ui/src/Avatar/Avatar.tsx` — **Verify**: Image + fallback initials; sizes
- [ ] **2.2.3** AvatarGroup — **Path**: `packages/ui/src/AvatarGroup/AvatarGroup.tsx` — **Verify**: Overlapping stack
- [ ] **2.2.4** Divider/Separator — **Path**: `packages/ui/src/Divider/Divider.tsx` — **Verify**: Horizontal/vertical
- [ ] **2.2.5** Image (Next.js wrapper) — **Path**: `packages/ui/src/Image/Image.tsx` — **Verify**: Loading states, aspect ratio, AVIF
- [ ] **2.2.6** Icon (Lucide wrapper) — **Path**: `packages/ui/src/Icon/Icon.tsx` — **Verify**: Consistent sizing
- [ ] **2.2.7** VisuallyHidden — **Path**: `packages/ui/src/VisuallyHidden/VisuallyHidden.tsx` — **Verify**: Screen reader announces; visually hidden

---

### 2.3 Add Layout Primitives

- [ ] **2.3.1** Stack — **Path**: `packages/ui/src/Stack/Stack.tsx` — **Verify**: Gap, align, justify props
- [ ] **2.3.2** Inline/HStack — **Path**: `packages/ui/src/Inline/Inline.tsx` — **Verify**: Horizontal spacing
- [ ] **2.3.3** Grid — **Path**: `packages/ui/src/Grid/Grid.tsx` — **Verify**: Responsive columns
- [ ] **2.3.4** Spacer — **Path**: `packages/ui/src/Spacer/Spacer.tsx` — **Verify**: Flexible space
- [ ] **2.3.5** AspectRatio — **Path**: `packages/ui/src/AspectRatio/AspectRatio.tsx` — **Verify**: Consistent ratio containers

---

### 2.4 Add Input Primitives

- [ ] **2.4.1** Checkbox — **Path**: `packages/ui/src/Checkbox/Checkbox.tsx` — **Verify**: Label, error, indeterminate; 24×24px touch
- [ ] **2.4.2** Radio + RadioGroup — **Path**: `packages/ui/src/Radio/` — **Verify**: Label, description; 24×24px
- [ ] **2.4.3** Switch — **Path**: `packages/ui/src/Switch/Switch.tsx` — **Verify**: Toggle; 24×24px
- [ ] **2.4.4** DatePicker, TimePicker — **Paths**: `packages/ui/src/DatePicker/`, `TimePicker/` — **Verify**: 24×24px
- [ ] **2.4.5** FileUpload — **Path**: `packages/ui/src/FileUpload/FileUpload.tsx` — **Verify**: Drag-and-drop, preview
- [ ] **2.4.6** Slider — **Path**: `packages/ui/src/Slider/Slider.tsx` — **Verify**: Single + range; 24×24px

---

### 2.5 Add Feedback Components

- [ ] **2.5.1** Toast — **Path**: `packages/ui/src/Toast/` — **Verify**: Wrap Sonner or custom; unit test
- [ ] **2.5.2** Alert — **Path**: `packages/ui/src/Alert/Alert.tsx` — **Verify**: info, warning, error, success
- [ ] **2.5.3** Modal/Dialog — **Path**: `packages/ui/src/Dialog/` — **Verify**: Radix base; focus trap
- [ ] **2.5.4** Drawer — **Path**: `packages/ui/src/Drawer/Drawer.tsx` — **Verify**: Slide-in panel
- [ ] **2.5.5** Tooltip, Popover — **Paths**: `packages/ui/src/Tooltip/`, `Popover/` — **Verify**: Accessible
- [ ] **2.5.6** Skeleton, Spinner, ProgressBar — **Paths**: `packages/ui/src/Skeleton/`, `Spinner/`, `ProgressBar/` — **Verify**: Loading states

---

### 2.6 Add Compositions

- [ ] **2.6.1** FormField — **Path**: `packages/ui/src/FormField/FormField.tsx` — **Verify**: Label + input + helper + error
- [ ] **2.6.2** FormGroup — **Path**: `packages/ui/src/FormGroup/FormGroup.tsx` — **Verify**: Group related fields
- [ ] **2.6.3** NavigationMenu — **Path**: `packages/ui/src/NavigationMenu/` — **Verify**: Radix base; mega menu support
- [ ] **2.6.4** MobileMenu — **Path**: `packages/ui/src/MobileMenu/MobileMenu.tsx` — **Verify**: Hamburger + drawer; variants
- [ ] **2.6.5** Breadcrumb — **Path**: `packages/ui/src/Breadcrumb/Breadcrumb.tsx` — **Verify**: JSON-LD BreadcrumbList output
- [ ] **2.6.6** Tabs, Pagination, Table, DescriptionList — **Paths**: `packages/ui/src/Tabs/`, etc. — **Verify**: Unit tests
- [ ] **2.6.7** PhoneInput, Map — **Paths**: `packages/ui/src/PhoneInput/`, `Map/` — **Verify**: Formatted input; map embed

---

### 2.7 Add Accessibility Helpers (WCAG 2.2 AA)

- [ ] **2.7.1** SkipToContent — **Path**: `packages/ui/src/SkipToContent/SkipToContent.tsx` — **Verify**: Focuses `<main>` on activate
- [ ] **2.7.2** ScreenReaderOnly — **Path**: `packages/ui/src/ScreenReaderOnly/ScreenReaderOnly.tsx` — **Verify**: Visually hidden, announced
- [ ] **2.7.3** FocusTrap — **Path**: `packages/ui/src/FocusTrap/FocusTrap.tsx` — **Verify**: Modals/drawers trap focus
- [ ] **2.7.4** LiveRegion — **Path**: `packages/ui/src/LiveRegion/LiveRegion.tsx` — **Verify**: aria-live announcements
- [ ] **2.7.5** FocusNotObscured — **Path**: `packages/ui/src/FocusNotObscured/FocusNotObscured.tsx` — **Verify**: WCAG 2.4.11
- [ ] **2.7.6** Audit all components — **Verify**: Visible focus (no `outline: none`); 24×24px touch targets; drag alternatives where needed

---

### 2.8 Add Utility Components

- [ ] **2.8.1** ThemeToggle — **Path**: `packages/ui/src/ThemeToggle/ThemeToggle.tsx` — **Verify**: localStorage + prefers-color-scheme
- [ ] **2.8.2** CookieConsent — **Path**: `packages/ui/src/CookieConsent/CookieConsent.tsx` — **Verify**: Accept/Reject/Preferences
- [ ] **2.8.3** BackToTop — **Path**: `packages/ui/src/BackToTop/BackToTop.tsx` — **Verify**: Scroll to top
- [ ] **2.8.4** ShareButtons — **Path**: `packages/ui/src/ShareButtons/ShareButtons.tsx` — **Verify**: Web Share API + fallback
- [ ] **2.8.5** SEOHead — **Path**: `packages/ui/src/SEOHead/SEOHead.tsx` — **Verify**: Title, description, canonical, OG, Twitter, JSON-LD

---

### 2.9 Add Hooks

- [ ] **2.9.1** useMediaQuery — **Path**: `packages/ui/src/hooks/useMediaQuery.ts` — **Verify**: Unit test
- [ ] **2.9.2** useScrollPosition — **Path**: `packages/ui/src/hooks/useScrollPosition.ts` — **Verify**: Unit test
- [ ] **2.9.3** useDebounce — **Path**: `packages/ui/src/hooks/useDebounce.ts` — **Verify**: Unit test
- [ ] **2.9.4** useClickOutside — **Path**: `packages/ui/src/hooks/useClickOutside.ts` — **Verify**: Unit test
- [ ] **2.9.5** useKeyboard — **Path**: `packages/ui/src/hooks/useKeyboard.ts` — **Verify**: Unit test
- [ ] **2.9.6** useIntersectionObserver — **Path**: `packages/ui/src/hooks/useIntersectionObserver.ts` — **Verify**: Unit test
- [ ] **2.9.7** useReducedMotion — **Path**: `packages/ui/src/hooks/useReducedMotion.ts` — **Verify**: Respects prefers-reduced-motion
- [ ] **2.9.8** useFocusTrap — **Path**: `packages/ui/src/hooks/useFocusTrap.ts` — **Verify**: Unit test

---

### 2.10 Documentation & Testing

- [ ] **2.10.1** Add Storybook or showcase

  - **Path**: `packages/ui/` (Storybook config)
  - **Verify**: All components documented

- [ ] **2.10.2** Visual regression (Chromatic/Percy)

  - **Verify**: CI runs on PRs touching `packages/ui/`

- [ ] **2.10.3** Unit tests for all new primitives

  - **Paths**: `packages/ui/src/**/__tests__/`
  - **Verify**: `pnpm test`; coverage threshold met

- [ ] **2.10.4** eslint-plugin-jsx-a11y — zero warnings

  - **Verify**: `pnpm lint` on packages/ui; no jsx-a11y violations

- [ ] **2.10.5** Per-component exports for tree-shaking
  - **Path**: `packages/ui/package.json`
  - **Verify**: `exports` field with per-component entry points; `import { Button } from '@repo/ui/Button'` works

---

### 2.11 UI Package Versioning

- [ ] **2.11.1** Semantic versioning + CHANGELOG

  - **Path**: `packages/ui/CHANGELOG.md`
  - **Verify**: Document breaking/feature/fix

- [ ] **2.11.2** Breaking change policy

  - **Path**: `packages/ui/README.md` or CONTRIBUTING
  - **Verify**: Defined: prop removal, default change, DOM structure change

- [ ] **2.11.3** Visual regression CI
  - **Verify**: CI check on PRs touching packages/ui

---

## Phase 3 — Industry Presets & Config System

**Depends on**: Phase 1, 2

### 3.1 Extend SiteConfig Type

- [ ] **3.1.1** Add `features` boolean map

  - **Path**: `packages/shared/types/site-config.ts` or `packages/config/types/site-config.ts`
  - **Verify**: Type includes booking, contact, blog, gallery, team, reviews, search, etc.

- [ ] **3.1.2** Add `industry` union (100+ types)

  - **Path**: same as 3.1.1
  - **Verify**: hair-salon, plumber, restaurant, medical, legal, etc.

- [ ] **3.1.3** Add `seo.schemaType`, `seo.geoTarget`
  - **Path**: same
  - **Verify**: TypeScript compiles

---

### 3.2 Create Industry Presets

- [ ] **3.2.1** Create presets directory

  - **Path**: `packages/config/industry-presets/`
  - **Verify**: Directory exists

- [ ] **3.2.2** Create hair-salon, plumber presets

  - **Paths**: `packages/config/industry-presets/hair-salon.preset.ts`, `plumber.preset.ts`
  - **Verify**: Default features, theme, nav, conversion flow, JSON-LD type

- [ ] **3.2.3** Create restaurant, medical, legal, home-services, fitness, real-estate presets
  - **Paths**: `packages/config/industry-presets/*.preset.ts`
  - **Verify**: Each preset aligns with catalog industry features

---

### 3.3 createSiteConfig() Helper

- [ ] **3.3.1** Implement createSiteConfig(preset, overrides)

  - **Path**: `packages/config/create-site-config.ts`
  - **Verify**: Deep-merge + Zod validation; returns typed SiteConfig

- [ ] **3.3.2** Unit tests for merge and validation
  - **Path**: `packages/config/__tests__/create-site-config.test.ts`
  - **Verify**: Override wins; invalid config throws Zod error

---

### 3.4 Migrate Templates to Presets

- [ ] **3.4.1** hair-salon

  - **Path**: `templates/hair-salon/site.config.ts`
  - **Verify**: `createSiteConfig(hairSalonPreset, { ... })`; build passes

- [ ] **3.4.2** plumber
  - **Path**: `templates/plumber/site.config.ts`
  - **Verify**: `createSiteConfig(plumberPreset, { ... })`; build passes

---

### 3.5 Theme Generator

- [ ] **3.5.1** OKLCH palette generation

  - **Path**: `packages/config/theme-generator/index.ts`
  - **Verify**: Input HSL → OKLCH; accessible foreground (4.5:1 contrast)

- [ ] **3.5.2** Design tokens (global → semantic → component)
  - **Path**: `packages/config/theme-generator/tokens.ts`
  - **Verify**: generateGlobalsCss(siteConfig) outputs CSS vars

---

### 3.6 SEO Config & Schema Generation

- [ ] **3.6.1** Auto sitemap, robots

  - **Path**: `packages/infra/seo/sitemap.ts`, `robots.ts`
  - **Verify**: Next.js Metadata API; routes from SiteConfig

- [ ] **3.6.2** JSON-LD generators

  - **Path**: `packages/infra/seo/schemas/`
  - **Verify**: LocalBusiness, FAQPage, Article, AggregateRating, BreadcrumbList, Service, Person; validate in Rich Results Test

- [ ] **3.6.3** Dynamic OG images
  - **Path**: `packages/infra/seo/opengraph-image.tsx` or template convention
  - **Verify**: opengraph-image.tsx generates OG image per route

---

## Phase 4 — Client Override System & First Client Sites

**Depends on**: Phase 1, 2, 3

### 4.1 Define Client Site Structure

- [ ] **4.1.1** Create CLIENT_SITE_STRUCTURE.md
  - **Path**: `docs/CLIENT_SITE_STRUCTURE.md`
  - **Verify**: Canonical `apps/client-<name>/` layout; files to copy vs write; one Vercel project per app

---

### 4.2 First Client Site (PoC)

- [ ] **4.2.1** Create apps/client-<name>/

  - **Path**: `apps/client-<name>/` (or `clients/client-<name>/` pre-rename)
  - **Depends on**: 4.1.1
  - **Verify**: Uses createSiteConfig(preset, overrides); custom sections; `pnpm build`; Lighthouse 90+ all categories

- [ ] **4.2.2** Document lessons learned
  - **Path**: `docs/CLIENT_SITE_LESSONS.md`
  - **Verify**: Captures pain points, gaps

---

### 4.3 Second Client Site (Different Industry)

- [ ] **4.3.1** Create second client in different industry
  - **Verify**: Preset system works; feature toggling; theme distinct; JSON-LD per industry

---

### 4.4 Rename & Restructure Root

- [ ] **4.4.1** Rename templates → apps
  - **Paths**: Move `templates/hair-salon` → `apps/template-hair-salon`, etc.
  - **Verify**: Update pnpm-workspace.yaml, turbo.json, all imports; `pnpm build` full monorepo

---

### 4.5 CI/CD for Multi-App Deploys

- [ ] **4.5.1** Vercel project per app

  - **Verify**: Each app has own Vercel project; Root Directory set

- [ ] **4.5.2** Turborepo filter for affected builds

  - **Verify**: `turbo run build --filter=...[HEAD^1]` builds only changed apps

- [ ] **4.5.3** GitHub Actions deploy changed apps
  - **Path**: `.github/workflows/deploy.yml`
  - **Verify**: PR → preview; merge → production for changed apps

---

### 4.6 Affected-Only CI Testing

- [ ] **4.6.1** turbo run test --filter=...[HEAD^1]

  - **Verify**: Only changed packages + dependants tested

- [ ] **4.6.2** Enable Turborepo Remote Caching
  - **Verify**: Vercel or similar; CI cache hits

---

## Phase 5 — New Industry Templates

**Depends on**: Phase 1–4

- [ ] **5.1** template-restaurant — **Path**: `apps/template-restaurant/` — **Verify**: createSiteConfig(restaurantPreset); menu, reservations, gallery, reviews; Restaurant JSON-LD; 5+ catalog patterns
- [ ] **5.2** template-medical — **Path**: `apps/template-medical/` — **Verify**: MedicalBusiness + Physician; consultation, providers, insurance; 5+ catalog patterns
- [ ] **5.3** template-legal — **Path**: `apps/template-legal/` — **Verify**: LegalService + Attorney; practice areas, case results; 5+ catalog patterns
- [ ] **5.4** template-home-services — **Path**: `apps/template-home-services/` — **Verify**: HomeAndConstructionBusiness; quote, emergency, before/after; 5+ catalog patterns
- [ ] **5.5** template-fitness — **Path**: `apps/template-fitness/` — **Verify**: SportsActivityLocation; booking, class schedule; 5+ catalog patterns
- [ ] **5.6** template-real-estate — **Path**: `apps/template-real-estate/` — **Verify**: RealEstateAgent; listings, agents, virtual tour; 5+ catalog patterns

---

## Phase 6 — Polish & Production Readiness

**Depends on**: Phase 1–5

### 6.1 Testing Infrastructure

- [ ] **6.1.1** Unit tests for infra, features, integrations

  - **Paths**: `packages/infra/__tests__/`, `packages/features/*/__tests__/`, `packages/integrations/*/__tests__/`
  - **Verify**: `pnpm test`; coverage thresholds

- [ ] **6.1.2** Integration tests (lead capture, booking)

  - **Path**: `packages/features/contact/__tests__/integration/`, etc.
  - **Verify**: E2E or integration test for submit → Supabase/HubSpot (mocked)

- [ ] **6.1.3** E2E with Playwright

  - **Path**: `e2e/` or `apps/template-hair-salon/e2e/`
  - **Verify**: Form submit, mobile nav, keyboard nav

- [ ] **6.1.4** axe-core + Lighthouse a11y
  - **Verify**: axe in E2E; Lighthouse accessibility 100

---

### 6.2 Developer Experience

- [ ] **6.2.1** CONTRIBUTING.md — new client, feature, preset, integration

  - **Path**: `CONTRIBUTING.md`
  - **Verify**: Step-by-step instructions

- [ ] **6.2.2** pnpm dev:<app> scripts

  - **Path**: `package.json` (root)
  - **Verify**: `pnpm dev:hair-salon`, `pnpm dev:plumber` work

- [ ] **6.2.3** VS Code workspace + extensions

  - **Path**: `.vscode/extensions.json`, `settings.json`
  - **Verify**: ESLint, Tailwind, axe recommended

- [ ] **6.2.4** DevContainer or .agent/workflows

  - **Path**: `.devcontainer/` or `.agent/workflows/`
  - **Verify**: Reproducible dev env

- [ ] **6.2.5** ADR template
  - **Path**: `docs/adr/template.md`
  - **Verify**: Standard format for decisions

---

### 6.3 Performance

- [ ] **6.3.1** Tree-shaking verification

  - **Verify**: Import single component; bundle excludes others

- [ ] **6.3.2** next/dynamic for heavy components

  - **Paths**: Templates using gallery, search, booking modal
  - **Verify**: Lazy load below-fold

- [ ] **6.3.3** Core Web Vitals

  - **Verify**: LCP < 2.5s, INP < 200ms, CLS < 0.1 (Lighthouse)

- [ ] **6.3.4** RUM via Vercel Speed Insights
  - **Verify**: Real user metrics collected

---

### 6.4 Security Audit

- [ ] **6.4.1** CSP strict-dynamic in prod

  - **Verify**: No unsafe-eval, unsafe-inline in production

- [ ] **6.4.2** Rate limiting on Server Actions

  - **Verify**: Contact, booking actions rate-limited

- [ ] **6.4.3** Next.js ≥ 15.2.3, pnpm audit, CSRF allowedOrigins
  - **Verify**: `pnpm audit` clean; next version check

---

### 6.5 SEO & Discoverability Audit

- [ ] **6.5.1** JSON-LD Rich Results Test

  - **Verify**: All schema types pass for each template

- [ ] **6.5.2** Canonical, OG, Twitter, semantic HTML
  - **Verify**: All pages have canonical; OG/Twitter render; proper heading hierarchy

---

### 6.6 Dependency Hygiene

- [ ] **6.6.1** Peer deps in shared packages

  - **Verify**: React, Next.js as peerDependencies where appropriate

- [ ] **6.6.2** pnpm dedupe, depcheck/knip

  - **Verify**: No unused deps; `pnpm dedupe` run

- [ ] **6.6.3** Workspace-aware Renovate
  - **Path**: `renovate.json`
  - **Verify**: Grouped updates per workspace

---

## Phase 7 — Future Enhancements (Backlog)

**Do not build until demonstrated need.**

- [ ] **7.1** i18n — next-intl, hreflang — **Trigger**: Client needs multi-language
- [ ] **7.2** CMS — Sanity, Storyblok, Payload — **Trigger**: Client needs content editing
- [ ] **7.3** AI chatbot — **Trigger**: Client requests
- [ ] **7.4** A/B testing — **Trigger**: Data-driven optimization
- [ ] **7.5** CLI (pnpm create:client) — **Trigger**: 10+ client sites
- [ ] **7.6** Multi-tenant self-serve — **Trigger**: High-volume demand

---

## Task Format Reference (for AI Agents)

Each executable task follows this structure:

```
- [ ] **Task ID** Task title
  - **Path**: `file/or/directory/path`
  - **Source**: `source/path` (for extraction tasks)
  - **Depends on**: Task IDs or "none"
  - **Verify**: Command to run, test to create, or criterion to check
  - [ ] **Subtask** — Path: `...` — Verify: ...
```

**Verification types**:

- `pnpm build` / `pnpm test` / `pnpm type-check` / `pnpm lint`
- Create unit test at `path` testing X
- Manual check: Y
- Lighthouse score Z
