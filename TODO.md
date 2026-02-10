<!--
/**
 * @file TODO.md
 * @role docs
 * @summary Implementation backlog and phased tasks for the template.
 *
 * @entrypoints
 * - Planning and prioritization reference
 *
 * @exports
 * - N/A
 *
 * @depends_on
 * - N/A
 *
 * @used_by
 * - Maintainers and contributors
 *
 * @runtime
 * - environment: docs
 * - side_effects: none
 *
 * @data_flow
 * - inputs: roadmap decisions
 * - outputs: task list
 *
 * @invariants
 * - Tasks should align with current codebase state
 *
 * @gotchas
 * - Contains aspirational items that may not match current implementation
 *
 * @issues
 * - [severity:med] Backlog statements are UNVERIFIED against current codebase.
 *
 * @opportunities
 * - Reconcile backlog items with audited findings and docs/REMEDIATION_PLAN.md
 *
 * @verification
 * - TODO(verify): Review each item against current code and update status
 *
 * @status
 * - confidence: low
 * - last_audited: 2026-02-09
 */
-->

# Hair Salon Template - Implementation TODO

## Audit Status (UNVERIFIED)

- This backlog is not yet reconciled with the audited codebase.

## Overview

This document tracks remaining implementation tasks to complete the hair salon template.
Work is phased to avoid thrash: **do not start a lower phase until the previous phase is green**.

**Status:** Phase 0 ✅ | Phase 0.5 ✅ | Phase 1 🚀 (4/5 complete)

**Note:** Completed tasks have been moved to [ARCHIVE.md](ARCHIVE.md)

---

## Phase 0 - Critical Infrastructure & Build Fixes ✅

**Status:** COMPLETED - All tasks moved to [ARCHIVE.md](ARCHIVE.md)

**Definition of Done:** All completed ✅

- ✅ `pnpm install` completes without errors
- ✅ `pnpm lint` passes across all packages
- ✅ `pnpm type-check` passes without errors
- ✅ `pnpm build` completes successfully
- ✅ `pnpm dev` runs without runtime errors

---

## Phase 0.5 - Evergreen Posture + Proof Artifacts ✅

**Status:** MOSTLY COMPLETED - Core tasks moved to [ARCHIVE.md](ARCHIVE.md)

**Definition of Done:** 3/4 complete ✅

- ✅ Upgrade policy documented and adopted
- ✅ Automated dependency upkeep configured
- ✅ CI quality gates publish artifacts and enforce budgets
- ⏳ Demo and setup tools pending

**Tasks**

### 0.5.5 Demo and Setup

- [ ] **Demo mode and demo route**

  - [ ] Create `/demo` route or seeded mode
  - [ ] Showcase all features toggled on/off
  - [ ] Document consent gating and integrations
  - DoD: Demo documents consent gating and integrations
  - Deps: core features present

- [ ] **One-command initializer**

  - [ ] Create `pnpm template:init` command
  - [ ] Add prompts for site configuration
  - [ ] Generate `site.config.ts`, schema JSON-LD, env stubs
  - DoD: Fresh setup runs without manual edits
  - Deps: config schema defined

- [ ] **Marketing setup checklist**

  - [ ] Create short playbook for local SEO
  - [ ] Add GBP (Google Business Profile) setup guide
  - [ ] Document social proof and CTA strategies
  - [ ] Add interstitial guidance
  - DoD: Referenced from README and docs
  - Deps: none

- [ ] **Repo scorecard section**
  - [ ] Add README badges for CWV targets
  - [ ] Include consent compliance badges
  - [ ] Add budget pass rate indicators
  - DoD: Scorecard reflects CI outputs
  - Deps: quality gates pipeline

## Phase 1 - Core Site MVP

**Goal:** Essential business features work end-to-end for a functional salon website.

**Definition of Done**

- [ ] Home -> service -> book click flow works and is tracked
- ✅ Contact form submits successfully with confirmation (see [ARCHIVE.md](ARCHIVE.md))
- ✅ Blog index loads and individual posts render correctly with content (see [ARCHIVE.md](ARCHIVE.md))
- ✅ Search functionality works across content (see [ARCHIVE.md](ARCHIVE.md))
- ✅ All core pages are accessible and functional

**Current Status:** 4/5 core features implemented, booking flow remaining

**Completed Tasks:** Blog system, contact form, and search moved to [ARCHIVE.md](ARCHIVE.md)

**Tasks**

### 1.1 Blog System Implementation

- [ ] **Blog: performance optimization**
  - [ ] Implement memoization for `getAllPosts()` and related helpers
  - [ ] Add server-side caching for blog data
  - [ ] Optimize MDX compilation caching
  - [ ] Implement Zod schema for frontmatter validation
  - Refs:
    - [templates/hair-salon/features/blog/lib/blog.ts](templates/hair-salon/features/blog/lib/blog.ts)
  - DoD: Repeated calls avoid redundant fs reads during SSR; frontmatter validation in place
  - Deps: blog lib exists

### 1.2 Contact Form System

**Status:** COMPLETED ✅ - All tasks moved to [ARCHIVE.md](ARCHIVE.md)

- [ ] **Contact: CRM integration and spam policy**
  - [ ] Define behavior when rate limit fails (skip HubSpot sync)
  - [ ] Implement suspicious submission detection
  - [ ] Add CRM sync error handling and logging
  - Refs:
    - [templates/hair-salon/lib/actions/supabase.ts](templates/hair-salon/lib/actions/supabase.ts)
    - [templates/hair-salon/lib/actions/hubspot.ts](templates/hair-salon/lib/actions/hubspot.ts)
    - [templates/hair-salon/lib/actions/helpers.ts](templates/hair-salon/lib/actions/helpers.ts)
  - Snip:
    ```ts
    const lead = await insertLeadWithSpan(sanitized, isSuspicious);
    await syncHubSpotLead(lead.id, sanitized);
    ```
  - DoD: Suspicious submissions do not reach CRM without explicit override
  - Deps: rate limiting in place

### 1.3 Services and Booking System

- [ ] **Services: data model and pages**

  - [ ] Define services data structure and types
  - [ ] Create `ServiceDetailLayout` component
  - [ ] Implement individual service pages (`/services/*`)
  - [ ] Add pricing information and booking links
  - Refs:
    - [templates/hair-salon/features/services/components/ServiceDetailLayout.tsx](templates/hair-salon/features/services/components/ServiceDetailLayout.tsx)
    - [templates/hair-salon/features/services/components/ServicesOverview.tsx](templates/hair-salon/features/services/components/ServicesOverview.tsx)
    - [templates/hair-salon/app/services/page.tsx](templates/hair-salon/app/services/page.tsx)
  - Snip:
    ```tsx
    export interface ServiceDetailProps {
      title: string;
      description: string;
      pricing: { tier: string; description: string; href: string }[];
    }
    ```
  - DoD: All service pages render with pricing and booking link
  - Deps: services data defined

- [ ] **Booking form submission handler**
  - [ ] Decide on booking flow (internal vs external provider)
  - [ ] Implement booking CTA submission handler
  - [ ] Add provider redirect flow if needed
  - [ ] Create booking confirmation system
  - Refs:
    - [templates/hair-salon/app/book/page.tsx](templates/hair-salon/app/book/page.tsx)
    - [templates/hair-salon/components/FinalCTA.tsx](templates/hair-salon/components/FinalCTA.tsx)
  - Snip:
    ```tsx
    <Link href="/book">
      <Button variant="primary">Book Now</Button>
    </Link>
    ```
  - DoD: Booking CTA has functional submission or redirect path
  - Deps: booking flow decision

### 1.4 Search Functionality

**Status:** COMPLETED ✅ - All tasks moved to [ARCHIVE.md](ARCHIVE.md)

- [ ] **Search: performance optimization**
  - [ ] Implement memoization for `getSearchIndex()` with server cache
  - [ ] Add search result caching strategies
  - [ ] Optimize search algorithm performance
  - Refs:
    - [templates/hair-salon/lib/search.ts](templates/hair-salon/lib/search.ts)
  - Snip:
    ```ts
    const posts = getAllPosts().map((post) => ({
      id: `post-${post.slug}`,
    }));
    ```
  - DoD: Repeated renders do not re-read blog files
  - Deps: blog lib exists

### 1.5 Content and Media

- [ ] **Gallery: placeholder data replacement**

  - [ ] Replace placeholder portfolio data with real content
  - [ ] Update imagery with consistent metadata
  - [ ] Add alt text and accessibility features
  - Refs:
    - [templates/hair-salon/app/gallery/page.tsx](templates/hair-salon/app/gallery/page.tsx)
  - Snip:
    ```tsx
    <section className="py-20 bg-off-white">
      <Container>
    ```
  - DoD: Gallery shows real or seeded data with consistent metadata
  - Deps: media assets available

- [ ] **Terms of Service: content finalization**

  - [ ] Replace placeholder and "TO BE UPDATED" content
  - [ ] Write production-ready terms copy
  - [ ] Add legal disclaimers and privacy references
  - Refs:
    - [templates/hair-salon/app/terms/page.tsx](templates/hair-salon/app/terms/page.tsx)
    - [templates/hair-salon/app/privacy/page.tsx](templates/hair-salon/app/privacy/page.tsx)
  - Snip:
    ```tsx
    export const metadata: Metadata = {
      title: 'Terms of Service | Hair Salon Template',
    };
    ```
  - DoD: Terms page reads as production-ready copy
  - Deps: content owner input

- [ ] **Team and social links**
  - [ ] Replace placeholder social links in team page
  - [ ] Update footer social links or remove if not needed
  - [ ] Verify all social links point to real profiles
  - Refs:
    - [templates/hair-salon/app/team/page.tsx](templates/hair-salon/app/team/page.tsx)
    - [templates/hair-salon/components/Footer.tsx](templates/hair-salon/components/Footer.tsx)
  - Snip:
    ```tsx
    <Link href="/team" className="text-white/70">
      Team
    </Link>
    ```
  - DoD: Team and footer social links are real or intentionally omitted
  - Deps: content owner input

### 1.6 Performance and Security

- [ ] **OG image route protection**

  - [ ] Add lightweight rate limiting for `/api/og`
  - [ ] Implement caching strategy for OG images
  - [ ] Add error handling for OG image generation
  - Refs:
    - [templates/hair-salon/app/api/og/route.tsx](templates/hair-salon/app/api/og/route.tsx)
    - [templates/hair-salon/lib/rate-limit.ts](templates/hair-salon/lib/rate-limit.ts)
  - Snip:
    ```ts
    export async function GET(request: Request) {
      // TODO: add rate limit
    }
    ```
  - DoD: Basic abuse protection without breaking social previews
  - Deps: rate limiting util or edge cache strategy

- [ ] **Rate limiting: production fallback policy**
  - [ ] Decide fail-closed vs hard error when Upstash fails
  - [ ] Implement fallback behavior in production
  - [ ] Document production rate limiting behavior
  - Refs:
    - [templates/hair-salon/lib/rate-limit.ts](templates/hair-salon/lib/rate-limit.ts)
  - Snip:
    ```ts
    if (missingUpstashKeys.length === 0) {
      // init Upstash
    }
    ```
  - DoD: Production behavior documented and enforced in `templates/hair-salon/lib/rate-limit.ts`
  - Deps: rate limiting in place

### 1.7 Seed Data and Testing

- [ ] **Seed data creation**
  - [ ] Create sample services data
  - [ ] Add sample stylists/team members
  - [ ] Create sample blog posts
  - [ ] Add sample gallery images
  - Refs:
    - [templates/hair-salon/features/services/components/ServicesOverview.tsx](templates/hair-salon/features/services/components/ServicesOverview.tsx)
    - [templates/hair-salon/app/team/page.tsx](templates/hair-salon/app/team/page.tsx)
    - [templates/hair-salon/app/gallery/page.tsx](templates/hair-salon/app/gallery/page.tsx)
  - Snip:
    ```ts
    const services = [{ title: 'Haircuts & Styling', href: '/services/haircuts' }];
    ```
  - DoD: Local dev uses real data with no empty states
  - Deps: models exist

---

## Phase 2 - Integration Platform Layer (Default-Off)

**Goal:** Add integrations without ad-hoc scripts, all default-off, consent gated.

**Definition of Done**

- [ ] Consent off -> no analytics/marketing scripts load
- [ ] Consent on -> only enabled scripts load
- [ ] No PII in event payloads
- [ ] All integrations disabled by default

**Guardrails**

- [ ] All integrations must be disabled by default
- [ ] All marketing/analytics scripts must be consent gated
- [ ] Scripts must be lazy or interaction-loaded unless critical

**Tasks**

### 2.1 Core Integration Infrastructure

- [ ] **Integration registry and schema validation**

  - [ ] Create `integrations.config.ts` with provider definitions
  - [ ] Implement Zod registry schema for validation
  - [ ] Create per-provider schemas with required fields
  - [ ] Add validation error handling for missing keys
  - Refs:
    - [templates/hair-salon/lib/env.ts](templates/hair-salon/lib/env.ts)
    - [templates/hair-salon/lib/env.public.ts](templates/hair-salon/lib/env.public.ts)
  - Snip:
    ```ts
    export const validatedEnv = envSchema.parse(process.env);
    ```
  - DoD: Enabled providers without required keys fail fast
  - Deps: Zod available

- [ ] **Event taxonomy and event bus**

  - [ ] Define canonical event list (book_click, lead_submit, call_click, directions_click, gallery_open)
  - [ ] Implement client-side event emitter with payload sanitization
  - [ ] Create server-side event emitter wrapper
  - [ ] Add event validation and logging
  - Refs:
    - [templates/hair-salon/features/analytics/lib/analytics.ts](templates/hair-salon/features/analytics/lib/analytics.ts)
  - Snip:
    ```ts
    export function trackEvent({ action, category, label, value }: AnalyticsEvent) {
      if (!hasAnalyticsConsent()) return;
    }
    ```
  - DoD: Client emit + server emit wrappers sanitize payloads
  - Deps: none

- [ ] **Consent model and helpers**

  - [ ] Define cookie format for consent storage
  - [ ] Create server-side consent reading helper
  - [ ] Implement client-side consent hook
  - [ ] Wire consent banner to consent model
  - [ ] Add per-category consent tracking (unknown/granted/denied)
  - Refs:
    - [templates/hair-salon/features/analytics/lib/analytics-consent.ts](templates/hair-salon/features/analytics/lib/analytics-consent.ts)
    - [templates/hair-salon/components/AnalyticsConsentBanner.tsx](templates/hair-salon/components/AnalyticsConsentBanner.tsx)
  - Snip:
    ```ts
    export type AnalyticsConsentState = 'granted' | 'denied' | 'unknown';
    ```
  - DoD: Unknown/granted/denied tracked per category
  - Deps: existing consent banner and analytics module

- [ ] **Script loader system**

  - [ ] Implement `loadClientScript(id, src, rule)` with deduplication
  - [ ] Add timeout handling and error logging
  - [ ] Create script loading queue management
  - [ ] Add script removal and cleanup functionality
  - Refs:
    - [templates/hair-salon/components/AnalyticsConsentBanner.tsx](templates/hair-salon/components/AnalyticsConsentBanner.tsx)
  - Snip:
    ```tsx
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`} />
    ```
  - DoD: Scripts load only after consent and per load rule
  - Deps: consent model

- [ ] **Provider adapter pattern**

  - [ ] Define provider declaration structure with consent category
  - [ ] Implement load rule system for each provider
  - [ ] Add CSP domain configuration per provider
  - [ ] Create event subscription system for providers
  - Refs:
    - [templates/hair-salon/lib/csp.ts](templates/hair-salon/lib/csp.ts)
    - [templates/hair-salon/features/analytics/lib/analytics.ts](templates/hair-salon/features/analytics/lib/analytics.ts)
  - Snip:
    ```ts
    const scriptSources = ["'self'", `'nonce-${nonce}'`, 'https://www.googletagmanager.com'];
    ```
  - DoD: Enabling a provider requires no ad-hoc script tags
  - Deps: registry + loader

- [ ] **CSP allowlist builder**
  - [ ] Create CSP domain sets for script/img/connect/frame sources
  - [ ] Implement dynamic CSP header generation
  - [ ] Add CSP validation and testing
  - [ ] Update CSP only for enabled integrations
  - Refs:
    - [templates/hair-salon/lib/csp.ts](templates/hair-salon/lib/csp.ts)
    - [templates/hair-salon/middleware.ts](templates/hair-salon/middleware.ts)
  - Snip:
    ```ts
    const csp = buildContentSecurityPolicy({ nonce, isDevelopment });
    response.headers.set('Content-Security-Policy', csp);
    ```
  - DoD: CSP updates only for enabled integrations
  - Deps: provider adapter pattern

### 2.2 Testing and Verification

- [ ] **Integration platform verification tests**

  - [ ] Create E2E tests for consent off -> no tags
  - [ ] Create E2E tests for consent on -> only enabled tags
  - [ ] Add unit tests for event bus and script loader
  - [ ] Test integration registry validation
  - Refs:
    - [templates/hair-salon/lib/**tests**/env.test.ts](templates/hair-salon/lib/__tests__/env.test.ts)
    - [jest.config.js](jest.config.js)
  - Snip:
    ```ts
    describe('env', () => {
      it('validates public env', () => {});
    });
    ```
  - DoD: Tests pass in CI-like run
  - Deps: event bus + script loader

- [ ] **Consent gating E2E tests**
  - [ ] Test consent denied -> no scripts load
  - [ ] Test consent granted -> only enabled scripts load
  - [ ] Verify consent persistence across sessions
  - [ ] Test consent category-specific behavior
  - Refs:
    - [templates/hair-salon/features/analytics/lib/analytics-consent.ts](templates/hair-salon/features/analytics/lib/analytics-consent.ts)
    - [templates/hair-salon/components/AnalyticsConsentBanner.tsx](templates/hair-salon/components/AnalyticsConsentBanner.tsx)
  - Snip:
    ```ts
    export function setAnalyticsConsent(consent: AnalyticsConsentState) {
      writeStoredConsent(consent);
    }
    ```
  - DoD: Tests enforced in CI
  - Deps: integration platform layer

---

## Phase 2.5 - Platform Data Layer (DB, RLS, Storage, Jobs)

**Goal:** Data and security foundations exist before marketing UI builds.

**Tasks**

- [ ] DB migrations + indexes
- Deliverables: SQL or migration scripts for reviews, testimonials, transformations, badges, certifications
- DoD: migrations apply cleanly; indexes cover common queries
- Deps: data models finalized

  - Refs:
    - [infrastructure/](infrastructure/)
    - [templates/hair-salon/features/supabase/lib/supabase-leads.ts](templates/hair-salon/features/supabase/lib/supabase-leads.ts)
  - Snip:
    ```ts
    const SUPABASE_LEADS_PATH = '/rest/v1/leads';
    ```

- [ ] RLS policies
- Deliverables: policies for public read (approved) and admin write
- DoD: public cannot write; admins can manage content
- Deps: migrations applied

  - Refs:
    - [infrastructure/](infrastructure/)
  - Snip:
    ```sql
    -- TODO: create RLS policies for public read + admin write
    ```

- [ ] Storage bucket policies
- Deliverables: buckets for media, signed URL strategy for private assets
- DoD: public assets readable; consent docs private
- Deps: migrations applied

  - Refs:
    - [infrastructure/](infrastructure/)
  - Snip:
    ```sql
    -- TODO: storage bucket policies for media and private assets
    ```

- [ ] Admin role model
- Deliverables: role claims or admins table; route middleware guard
- DoD: admin routes protected in dev and prod
- Deps: auth strategy defined

  - Refs:
    - [templates/hair-salon/middleware.ts](templates/hair-salon/middleware.ts)
  - Snip:
    ```ts
    export const config = { matcher: ['/((?!_next/static).*)'] };
    ```

- [ ] Background job runner
- Deliverables: cron strategy for review sync, optional Instagram sync, cleanup job for revoked media
- DoD: jobs run without blocking page render
- Deps: data tables and storage buckets
  - Refs:
    - [infrastructure/](infrastructure/)
  - Snip:
    ```ts
    // TODO: define scheduled jobs (review sync, instagram sync)
    ```

---

## Phase 3 - Marketing Enhancements

**Goal:** Social proof, portfolio, trust indicators, and conversion elements built on the platform layer.

### 3.1 Social Proof (Reviews/Testimonial Model)

- [ ] Model decision and schema
- Deliverables: review schema + testimonial schema referencing reviewId
- DoD: one source of truth for ratings and counts
- Deps: data layer ready

  - Refs:
    - [templates/hair-salon/components/SocialProof.tsx](templates/hair-salon/components/SocialProof.tsx)
  - Snip:
    ```ts
    const testimonials = [{ quote: '...', author: '...', title: '...' }];
    ```

- [ ] Testimonial display MVP
- Deliverables: carousel/grid, verified badge modes, aggregate rating component
- DoD: homepage shows ratings and a rotating testimonial block
- Deps: schema and seed data

  - Refs:
    - [templates/hair-salon/components/SocialProof.tsx](templates/hair-salon/components/SocialProof.tsx)
  - Snip:
    ```tsx
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      {testimonials.map((testimonial) => (
    ```

- [ ] Video testimonials
- Deliverables: thumbnail + click-to-load player
- DoD: no iframe loads until interaction
- Deps: testimonial UI exists
  - Refs:
    - [templates/hair-salon/components/SocialProof.tsx](templates/hair-salon/components/SocialProof.tsx)
  - Snip:
    ```tsx
    <Card key={testimonial.author} variant="testimonial">
    ```

### 3.2 Portfolio (Before/After)

- [ ] Transformation model + permissions
- Deliverables: transformation schema with permission scope and revocation
- DoD: permission fields stored and enforceable
- Deps: data layer ready

  - Refs:
    - [templates/hair-salon/app/gallery/page.tsx](templates/hair-salon/app/gallery/page.tsx)
  - Snip:
    ```tsx
    <section className="py-20 bg-off-white">
    ```

- [ ] Portfolio MVP slice
- Deliverables: gallery with filters, lightbox, keyboard support
- DoD: gallery shows 12 items; modal accessible
- Deps: transformation data seeded

  - Refs:
    - [templates/hair-salon/app/gallery/page.tsx](templates/hair-salon/app/gallery/page.tsx)
  - Snip:
    ```tsx
    <div className="grid md:grid-cols-3 gap-8">
    ```

- [ ] Performance rules
- Deliverables: thumbnails for grids, lazy-load full res in modal
- DoD: no above-the-fold grids of full-size images
- Deps: gallery MVP

  - Refs:
    - [templates/hair-salon/app/gallery/page.tsx](templates/hair-salon/app/gallery/page.tsx)
  - Snip:
    ```tsx
    <div className={`w-full h-full ${item.image} flex items-center justify-center`}>
      Image {item.id}
    </div>
    ```

- [ ] Instagram feed adapter
- Deliverables: manual CMS default with optional API sync job
- DoD: feed renders from manual data with fallback copy
- Deps: data layer ready
  - Refs:
    - [infrastructure/](infrastructure/)
  - Snip:
    ```ts
    // TODO: optional Instagram sync job
    ```

### 3.3 Trust Indicators

- [ ] Trust models
- Deliverables: trust badge + certification schemas with verification URLs
- DoD: links point to issuer verification pages
- Deps: data layer ready

  - Refs:
    - [templates/hair-salon/app/about/page.tsx](templates/hair-salon/app/about/page.tsx)
  - Snip:
    ```tsx
    <h2 className="text-3xl font-bold text-charcoal">Our Story</h2>
    ```

- [ ] Trust UI
- Deliverables: badge grid + certification cards
- DoD: displayed on homepage and service pages
- Deps: trust models seeded

  - Refs:
    - [templates/hair-salon/components/ValueProps.tsx](templates/hair-salon/components/ValueProps.tsx)
    - [templates/hair-salon/app/services/page.tsx](templates/hair-salon/app/services/page.tsx)
  - Snip:
    ```tsx
    <div className="grid md:grid-cols-3 gap-8">
    ```

- [ ] Guarantee + longevity
- Deliverables: satisfaction and longevity copy with source fields
- DoD: only data-backed claims render
- Deps: business data source
  - Refs:
    - [templates/hair-salon/components/Hero.tsx](templates/hair-salon/components/Hero.tsx)
  - Snip:
    ```tsx
    <p className="text-sm text-slate mt-4">
      Walk-ins welcome · Free consultations · Satisfaction guaranteed
    </p>
    ```

### 3.4 Conversion Elements (Truthful + Non-Intrusive)

- [ ] Sticky booking CTA
- Deliverables: sticky button with safe mobile spacing
- DoD: no overlap with mobile nav or footer
- Deps: booking link defined

  - Refs:
    - [templates/hair-salon/components/FinalCTA.tsx](templates/hair-salon/components/FinalCTA.tsx)
    - [templates/hair-salon/components/Navigation.tsx](templates/hair-salon/components/Navigation.tsx)
  - Snip:
    ```tsx
    <Link href="/contact">
      <Button variant="primary" size="large">
        Book Appointment
      </Button>
    </Link>
    ```

- [ ] CTA component + tracking
- Deliverables: CTA component wired to event bus
- DoD: click emits canonical event without PII
- Deps: event bus

  - Refs:
    - [templates/hair-salon/components/FinalCTA.tsx](templates/hair-salon/components/FinalCTA.tsx)
    - [templates/hair-salon/features/analytics/lib/analytics.ts](templates/hair-salon/features/analytics/lib/analytics.ts)
  - Snip:
    ```ts
    export function trackCTAClick(ctaText: string) {
      trackEvent({ action: 'cta_click', category: 'engagement', label: ctaText });
    }
    ```

- [ ] Urgency and activity rules
- Deliverables: system-sourced checks + neutral fallback copy
- DoD: no fabricated numbers displayed
- Deps: booking/CRM data source

  - Refs:
    - [templates/hair-salon/components/FinalCTA.tsx](templates/hair-salon/components/FinalCTA.tsx)
  - Snip:
    ```tsx
    <p className="text-lg text-white/90 mb-8 leading-relaxed">
    ```

- [ ] Lead capture banner
- Deliverables: inline/bottom banner variant
- DoD: banner used on mobile; non-intrusive
- Deps: contact endpoint

  - Refs:
    - [templates/hair-salon/components/AnalyticsConsentBanner.tsx](templates/hair-salon/components/AnalyticsConsentBanner.tsx)
  - Snip:
    ```tsx
    <div className="fixed bottom-4 left-4 right-4">
    ```

- [ ] Exit intent experiment
- Deliverables: desktop-only experiment flag
- DoD: disabled by default; no mobile interstitials
- Deps: analytics events
  - Refs:
    - [templates/hair-salon/features/analytics/lib/analytics.ts](templates/hair-salon/features/analytics/lib/analytics.ts)
  - Snip:
    ```ts
    if (isDevelopment() || isTest()) {
      logInfo('Analytics event', { action, category, label, value });
    }
    ```

---

## Phase 4 - Admin UI + Content Ops

**Goal:** Non-devs can manage content safely.

**Tasks**

- [ ] Admin routes + auth
- Deliverables: admin dashboard routes, route protection middleware
- DoD: non-admins cannot access admin pages
- Deps: admin role model

  - Refs:
    - [templates/hair-salon/app](templates/hair-salon/app)
    - [templates/hair-salon/middleware.ts](templates/hair-salon/middleware.ts)
  - Snip:
    ```ts
    export function middleware(request: NextRequest) {
      const response = NextResponse.next();
      return response;
    }
    ```

- [ ] Upload tooling
- Deliverables: admin upload UI, validation, optimization, thumbnails
- DoD: upload produces optimized assets + thumbnails
- Deps: storage buckets ready

  - Refs:
    - [templates/hair-salon/components](templates/hair-salon/components)
  - Snip:
    ```tsx
    <input type="file" accept="image/*" />
    ```

- [ ] Moderation workflow
- Deliverables: pending/approved/rejected status UI and filters
- DoD: only approved content renders publicly
- Deps: review/testimonial schemas

  - Refs:
    - [templates/hair-salon/features/supabase/lib/supabase-leads.ts](templates/hair-salon/features/supabase/lib/supabase-leads.ts)
  - Snip:
    ```ts
    export async function updateSupabaseLead(leadId: string, updates: Record<string, unknown>) {
      // update status fields
    }
    ```

- [ ] Audit log
- Deliverables: lightweight audit table and admin activity log view
- DoD: admin actions recorded and viewable
- Deps: admin routes

  - Refs:
    - [templates/hair-salon/lib/logger.ts](templates/hair-salon/lib/logger.ts)
  - Snip:
    ```ts
    export function logInfo(message: string, context?: LogContext) {
      log('info', message, context);
    }
    ```

- [ ] Media takedown tooling
- Deliverables: revoke + purge flow for consented media
- DoD: revoked assets removed from UI and CDN
- Deps: storage buckets + revocation fields
  - Refs:
    - [templates/hair-salon/app/gallery/page.tsx](templates/hair-salon/app/gallery/page.tsx)
    - [infrastructure/](infrastructure/)
  - Snip:
    ```tsx
    const portfolioItems = [{ id: 1, category: 'Color', title: 'Platinum Blonde Transformation' }];
    ```

---

## Phase 5 - Major Integrations (Tiered)

### Tier 1 (Highest ROI, Lowest Complexity)

- [ ] GA4 baseline + event taxonomy mapping
- Deliverables: GA4 tag wired to event bus and consent
- DoD: events visible in GA4 debug view
- Deps: integration platform layer

  - Refs:
    - [templates/hair-salon/components/AnalyticsConsentBanner.tsx](templates/hair-salon/components/AnalyticsConsentBanner.tsx)
    - [templates/hair-salon/features/analytics/lib/analytics.ts](templates/hair-salon/features/analytics/lib/analytics.ts)
  - Snip:
    ```tsx
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`} />
    ```

- [ ] GTM optional
- Deliverables: GTM loader with consent gating
- DoD: GTM loads only when enabled
- Deps: script loader

  - Refs:
    - [templates/hair-salon/components/AnalyticsConsentBanner.tsx](templates/hair-salon/components/AnalyticsConsentBanner.tsx)
  - Snip:
    ```tsx
    <Script id="ga4-init" strategy="afterInteractive" nonce={nonce}>
    ```

- [ ] Google Ads conversion (client)
- Deliverables: conversion tag mapping to events
- DoD: conversion fires on lead submit or booking click
- Deps: event taxonomy

  - Refs:
    - [templates/hair-salon/features/analytics/lib/analytics.ts](templates/hair-salon/features/analytics/lib/analytics.ts)
  - Snip:
    ```ts
    trackEvent({ action: 'cta_click', category: 'engagement', label: ctaText });
    ```

- [ ] Meta Pixel (client)
- Deliverables: pixel tag with consent gating
- DoD: pixel fires only on consent
- Deps: script loader

  - Refs:
    - [templates/hair-salon/components/AnalyticsConsentBanner.tsx](templates/hair-salon/components/AnalyticsConsentBanner.tsx)
  - Snip:
    ```tsx
    const canLoadAnalytics = shouldLoadAnalytics(consent, analyticsId);
    ```

- [ ] Turnstile on forms
- Deliverables: Turnstile widget + server verification
- DoD: form rejects invalid tokens
- Deps: form endpoints

  - Refs:
    - [templates/hair-salon/features/contact/components/ContactForm.tsx](templates/hair-salon/features/contact/components/ContactForm.tsx)
    - [templates/hair-salon/lib/actions/submit.ts](templates/hair-salon/lib/actions/submit.ts)
  - Snip:
    ```tsx
    <form onSubmit={handleSubmit(onSubmit)}>
    ```

- [ ] Booking providers (deep links + embeds)
- Deliverables: provider adapter + link/embed templates
- DoD: booking CTA opens correct provider link
- Deps: integration registry
  - Refs:
    - [templates/hair-salon/app/book/page.tsx](templates/hair-salon/app/book/page.tsx)
    - [templates/hair-salon/components/FinalCTA.tsx](templates/hair-salon/components/FinalCTA.tsx)
  - Snip:
    ```tsx
    <Link href="/book">
      <Button variant="primary">Book Now</Button>
    </Link>
    ```

### Tier 2

- [ ] Meta CAPI (server) with `event_id` dedup
- Deliverables: server event endpoint + deduped payloads
- DoD: test events show in Meta test console
- Deps: event bus

  - Refs:
    - [templates/hair-salon/lib/actions/submit.ts](templates/hair-salon/lib/actions/submit.ts)
  - Snip:
    ```ts
    return withServerSpan({ name: 'contact_form.submit', op: 'action' }, async () => {
    ```

- [ ] Stripe payment links + webhooks
- Deliverables: payment link config + webhook handler
- DoD: webhook verified and logged
- Deps: server env secrets

  - Refs:
    - [templates/hair-salon/app/api](templates/hair-salon/app/api)
    - [templates/hair-salon/lib/logger.ts](templates/hair-salon/lib/logger.ts)
  - Snip:
    ```ts
    logInfo('Webhook received', { provider: 'stripe' });
    ```

- [ ] Email routing adapters
- Deliverables: server adapters for Mailchimp/Brevo/etc.
- DoD: lead submit routes to selected provider
- Deps: lead schema
  - Refs:
    - [templates/hair-salon/lib/actions/submit.ts](templates/hair-salon/lib/actions/submit.ts)
    - [templates/hair-salon/lib/actions/helpers.ts](templates/hair-salon/lib/actions/helpers.ts)
  - Snip:
    ```ts
    const sanitized = buildSanitizedContactData(validatedData, clientIp);
    ```

### Tier 3

- [ ] Review aggregation jobs
- Deliverables: scheduled review sync; Google required, Facebook best-effort
- DoD: reviews update without blocking page render
- Deps: background job runner

  - Refs:
    - [infrastructure/](infrastructure/)
  - Snip:
    ```ts
    // TODO: schedule review sync jobs
    ```

- [ ] CMS adapters
- Deliverables: optional adapters for Sanity/Contentful/Strapi/Payload
- DoD: content reads from selected CMS when enabled
- Deps: integration registry

  - Refs:
    - [templates/hair-salon/features/blog/lib/blog.ts](templates/hair-salon/features/blog/lib/blog.ts)
  - Snip:
    ```ts
    const postsDirectory = path.join(process.cwd(), 'content/blog');
    ```

- [ ] Advanced chat widgets / session replay
- Deliverables: chat and replay tags gated by marketing consent
- DoD: no scripts load without consent
- Deps: script loader
  - Refs:
    - [templates/hair-salon/components/AnalyticsConsentBanner.tsx](templates/hair-salon/components/AnalyticsConsentBanner.tsx)
    - [templates/hair-salon/lib/csp.ts](templates/hair-salon/lib/csp.ts)
  - Snip:
    ```ts
    const scriptSources = ["'self'", `'nonce-${nonce}'`];
    ```

---

## Testing & Validation

- [ ] Unit tests for Zod schemas + integration registry validation
- [ ] E2E: consent off -> no scripts load
- [ ] E2E: consent on -> only enabled scripts load
- [ ] Accessibility tests for modals/carousels (focus trap, escape, keyboard nav)
- [ ] Performance testing (Core Web Vitals)

---

## Appendix A - Task Index (Full)

- Module alias + re-export audit
- Canonical feature import surface
- Align local env template with runtime schema
- Dependency install + verify
- ESLint config resolution
- Tailwind tokens + SearchDialog palette
- Consent persistence smoke test
- Component fixups
- Type hygiene cleanup
- CI tests must be blocking
- Security contact accuracy
- Documentation evidence reconciliation
- Blog: MDX parsing
- Blog: category filtering
- Blog: metadata types + validation
- Contact form: schema + UI
- Contact form: submission + spam baseline
- Contact: spam policy for CRM sync
- Rate limit fallback policy in production
- Services: data model + pages
- Search: index + UX
- Search index caching
- Blog data caching
- OG image route protection
- Book page: MVP flow
- Seed data
- Integration registry + schema validation
- Event taxonomy + event bus
- Consent model + helpers
- Script loader
- Provider adapter pattern
- CSP allowlist builder
- Verification tests
- DB migrations + indexes
- RLS policies
- Storage bucket policies
- Admin role model
- Background job runner
- Social proof: model + schema
- Social proof: testimonial display MVP
- Social proof: video testimonials
- Portfolio: transformation model + permissions
- Portfolio: gallery MVP slice
- Portfolio: performance rules
- Portfolio: Instagram adapter
- Trust: models
- Trust: UI
- Trust: guarantee + longevity
- Conversion: sticky booking CTA
- Conversion: CTA component + tracking
- Conversion: urgency and activity rules
- Conversion: lead capture banner
- Conversion: exit intent experiment
- Admin routes + auth
- Upload tooling
- Moderation workflow
- Audit log
- Media takedown tooling
- Tier 1 integrations
- Tier 2 integrations
- Tier 3 integrations
- Testing and validation

---

## Appendix B - Integration Catalog (Reference)

- Booking: Square, Vagaro, Mindbody, Fresha, Booksy, generic booking link
- Payments: Stripe, Square, PayPal
- Analytics: GA4, GTM, privacy-friendly analytics (Plausible, Matomo)
- Ads: Google Ads, Meta Pixel + CAPI, TikTok, Pinterest, Snapchat, LinkedIn
- Consent: CMP or custom banner with Consent Mode v2
- Chat: Intercom, Crisp, Tawk
- Reviews: Google (managed locations), Facebook (best-effort)
- Bot protection: Turnstile
- CRM: Mailchimp, Klaviyo, Brevo, ActiveCampaign, Twilio, MessageBird
- CMS: Sanity, Contentful, Strapi, Payload

---

## Deployment Checklist

- [ ] Environment variables configured (.env.local)
- [ ] Database connections tested (Supabase or alternative)
- [ ] Third-party API keys secured
- [ ] Build process verified on clean machine
- [ ] Staging deployment successful
- [ ] Production deployment plan
- [ ] Monitoring and alerting setup
- [ ] Backup strategy in place

---

## Notes

- Use `pnpm dev` for development
- Use `pnpm build` to test production build
- Use `pnpm lint` and `pnpm type-check` regularly
- See CONFIG.md for detailed configuration documentation

---

## Remediation Plan Tasks (Extracted from docs/REMEDIATION_PLAN.md)

### Critical Priority Fixes

#### Blog Content Creation and Directory Setup ✅ COMPLETED

- [x] Create `templates/hair-salon/content/blog/` directory structure
- [x] Write 3+ sample blog posts with proper frontmatter (5 created)
- [x] Include posts with code blocks for testing MDX rendering
- [x] Add posts across different categories (Hair Care, Styling, Trends)
- [x] Test blog navigation and individual post rendering
- [x] Verify blog system works with real content

#### Booking Flow Implementation 🔄 IN PROGRESS (80% Complete)

- [x] Decide booking flow strategy - Hybrid approach: Internal system + external integrations (toggleable)
- [x] Implement booking CTA submission handler - Complete server actions with 2026 security patterns
- [x] Create booking confirmation system - Success states and error handling implemented
- [x] Update service pages with working booking links - All CTAs now point to /book
- [x] Add comprehensive booking schema validation - Zod schemas with security patterns
- [x] Implement external provider integrations - Mindbody, Vagaro, Square (toggleable)
- [x] Add AI-powered fraud detection - Modern security patterns implemented
- [x] Implement rate limiting and audit logging - Complete security framework
- [ ] Add booking analytics tracking - Code ready but commented out (requires analytics integration)
- [ ] Test complete booking flow end-to-end - Blocked by build issues

**CRITICAL ISSUES REQUIRING IMMEDIATE ATTENTION:**

- [ ] Fix Build-Time Environment Validation - Move provider env reads to runtime-only paths
- [ ] Fix Test Configuration Issues - Align Jest runtime with TS output

### High Priority Fixes

#### Gallery Content Replacement

- [ ] Replace placeholder portfolio data with real content
- [ ] Add consistent metadata for all gallery images
- [ ] Implement proper alt text for accessibility
- [ ] Optimize image sizes and loading
- [ ] Test gallery responsiveness and performance

#### Terms of Service Content Finalization

- [ ] Write production-ready terms of service copy
- [ ] Add legal disclaimers and privacy references
- [ ] Review legal compliance requirements
- [ ] Update privacy policy if needed
- [ ] Test legal page accessibility and readability

#### Team and Social Links Configuration

- [ ] Replace placeholder social links with real profiles
- [ ] Update footer social links or remove if not needed
- [ ] Verify all social links point to real, active profiles
- [ ] Update team member information if needed
- [ ] Test social link functionality

### Medium Priority Fixes

#### Blog Frontmatter Zod Validation

- [ ] Implement Zod schema for blog frontmatter validation
- [ ] Add validation error handling in development
- [ ] Test validation with valid and invalid frontmatter
- [ ] Update blog types to match Zod schema
- [ ] Document validation requirements

#### Performance Optimization

- [ ] Implement memoization for blog data functions
- [ ] Add server-side caching for search index
- [ ] Optimize MDX compilation caching
- [ ] Profile and optimize bundle size
- [ ] Test performance improvements

#### Demo Mode Implementation

- [ ] Create `/demo` route or seeded mode
- [ ] Showcase all features toggled on/off
- [ ] Document consent gating and integrations
- [ ] Add demo data for all features
- [ ] Test demo functionality

### Low Priority Fixes

#### AI/ML Integration Readiness

- [ ] Add code documentation for AI assistance
- [ ] Implement AI-pair programming patterns
- [ ] Create automated code generation compatibility
- [ ] Add AI tooling integration points

#### Quantum-Resistant Cryptography Planning

- [ ] Research quantum-resistant cryptography requirements
- [ ] Assess current crypto-agility
- [ ] Plan migration path for quantum-resistant algorithms
- [ ] Document long-term security strategy

---

**Last Updated:** February 9, 2026  
**Documentation Pass Completed:** February 9, 2026 - 78 files documented with comprehensive metaheaders
**Estimated Completion:** 2-4 weeks (depending on scope and team size)
**Remediation Tasks Added:** February 10, 2026 - Extracted from docs/REMEDIATION_PLAN.md
