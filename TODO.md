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

**Status:** Configuration ✅ | Build 🔴 | Development 🚀

---

## Phase 0 - Get to Green (Build/Lint/Dev)

**Goal:** `pnpm lint`, `pnpm type-check`, `pnpm build`, `pnpm dev` all pass.

**Definition of Done**

- [ ] `pnpm lint` passes
- [ ] `pnpm type-check` passes
- [ ] `pnpm build` passes
- [ ] `pnpm dev` runs without runtime errors

**Tasks**

- [ ] Module alias + re-export audit
- Deliverables: fix barrel exports in `features/*/index.ts`, fix `lib/*` exports, update alias paths
- DoD: no `Module not found` errors for `@/lib/*`, `@/features/*`, `@/components/*`
- Deps: none

- [ ] Dependency install + verify
- Deliverables: add MDX + forms deps to `apps/web/package.json`, lockfile updated
- DoD: build passes and a sample MDX file renders in dev
- Deps: none

- [ ] ESLint config resolution
- Deliverables: `@repo/eslint-config` resolves from all packages
- DoD: `pnpm lint` passes in a clean install
- Deps: none

- [ ] Tailwind tokens + SearchDialog palette
- Deliverables: Tailwind tokens for `bg-off-white` and palette updates
- DoD: no missing class warnings; UI only changes where intended
- Deps: none

- [ ] Consent persistence smoke test
- Deliverables: consent cookie/localStorage keys documented and used
- DoD: refresh preserves toggles; SSR reads correct state
- Deps: existing analytics consent module

- [ ] Component fixups
- Deliverables: InstallPrompt Button import, Navigation null checks, Gallery Button variant, Book page Select options
- DoD: `pnpm dev` runs without runtime errors on these pages
- Deps: none

- [ ] Type hygiene cleanup
- Deliverables: remove unused `requestId`, fix implicit `any` types
- DoD: `pnpm type-check` passes without new errors
- Deps: none

---

## Phase 0.5 - Evergreen Posture + Proof Artifacts

**Goal:** Establish evergreen maintenance, golden-path setup, and quality gates.

**Definition of Done**

- [ ] Upgrade policy documented and adopted
- [ ] Automated dependency upkeep configured
- [ ] CI quality gates publish artifacts and enforce budgets

**Tasks**

- [ ] Evergreen version policy
- Deliverables: policy doc for Next/React/Turbo patches, Node 24 recommended engine, upgrade path to next major
- DoD: policy referenced in README and requirements/design docs
- Deps: none

- [ ] Automated dependency upkeep
- Deliverables: Renovate config, patch auto-merge, minor upgrade gates
- DoD: CI green on a sample dependency update PR
- Deps: evergreen policy

- [ ] SBOM + dependency scanning
- Deliverables: SBOM generation step, dependency audit task, artifacts upload
- DoD: CI publishes SBOM and fails on critical vulns
- Deps: CI baseline

- [ ] Quality gates pipeline
- Deliverables: lint/type/test, Lighthouse CI on key routes (95+ targets), bundle size budgets (strict), a11y checks (95+), secret scan
- DoD: PRs fail when budgets or checks fail; artifacts stored
- Deps: CI baseline

- [ ] Consent gating E2E tests
- Deliverables: e2e tests for consent denied -> no scripts; consent granted -> only enabled scripts
- DoD: tests enforced in CI
- Deps: integration platform layer

- [ ] Demo mode / demo route
- Deliverables: `/demo` or seeded mode showcasing all features toggled on/off
- DoD: demo documents consent gating and integrations
- Deps: core features present

- [ ] One-command initializer
- Deliverables: `pnpm template:init` prompts and generates `site.config.ts`, schema JSON-LD, env stubs
- DoD: fresh setup runs without manual edits
- Deps: config schema defined

- [ ] Marketing setup checklist
- Deliverables: short playbook for local SEO, GBP, social proof, CTAs, interstitial guidance
- DoD: referenced from README and docs
- Deps: none

- [ ] Repo scorecard section
- Deliverables: README badges for CWV targets, consent compliance, budget pass rate
- DoD: scorecard reflects CI outputs
- Deps: quality gates pipeline

## Phase 1 - Core Site MVP

**Goal:** Blog + Services + Contact + Search + Book page work end-to-end.

**Definition of Done**

- [ ] Home -> service -> book click works and is tracked
- [ ] Contact form submits successfully with confirmation
- [ ] Blog index loads and a post renders

**Tasks**

- [ ] Blog: MDX parsing
- Deliverables: `apps/web/features/blog/lib/*`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`
- DoD: `/blog` renders 3 sample posts; one post renders code blocks
- Deps: MDX deps installed

- [ ] Blog: metadata types + validation
- Deliverables: blog frontmatter types and validation in blog lib
- DoD: invalid frontmatter fails fast in dev
- Deps: blog lib exists

- [ ] Contact form: schema + UI
- Deliverables: `features/contact/lib/contact-form-schema.ts`, `ContactForm` updates
- DoD: client-side validation works with clear error states
- Deps: react-hook-form + resolver deps installed

- [ ] Contact form: submission + spam baseline
- Deliverables: server action or route handler; rate limit or honeypot
- DoD: submit success and error paths display correctly
- Deps: contact schema exists

- [ ] Services: data model + pages
- Deliverables: services data, `ServiceDetailLayout`, `/services/*` pages
- DoD: all service pages render with pricing and booking link
- Deps: services data defined

- [ ] Search: index + UX
- Deliverables: search index includes blog + services; search dialog hotkey
- DoD: Ctrl/Cmd+K opens dialog; results include blog and services
- Deps: blog and services pages exist

- [ ] Book page: MVP flow
- Deliverables: booking CTA, service and stylist selection placeholders
- DoD: booking CTA routes correctly; selection UI renders
- Deps: services + team data available

- [ ] Seed data
- Deliverables: sample services, stylists, blog posts
- DoD: local dev uses real data with no empty states
- Deps: models exist

---

## Phase 2 - Integration Platform Layer (Default-Off)

**Goal:** Add integrations without ad-hoc scripts, all default-off, consent gated.

**Deliverables**

- [ ] Integration registry + schema validation
- Deliverables: `integrations.config.ts`, Zod registry schema, per-provider schemas
- DoD: enabled providers without required keys fail fast
- Deps: Zod available

- [ ] Event taxonomy + event bus
- Deliverables: canonical event list (book_click, lead_submit, call_click, directions_click, gallery_open)
- DoD: client emit + server emit wrappers sanitize payloads
- Deps: none

- [ ] Consent model + helpers
- Deliverables: cookie format, server read helper, client hook, banner wiring
- DoD: unknown/granted/denied tracked per category
- Deps: existing consent banner and analytics module

- [ ] Script loader
- Deliverables: `loadClientScript(id, src, rule)` with dedupe, timeout, error logging
- DoD: scripts load only after consent and per load rule
- Deps: consent model

- [ ] Provider adapter pattern
- Deliverables: provider declarations include consent category, load rule, CSP domains, event subscriptions
- DoD: enabling a provider requires no ad-hoc script tags
- Deps: registry + loader

- [ ] CSP allowlist builder
- Deliverables: CSP domain sets for script/img/connect/frame sources
- DoD: CSP updates only for enabled integrations
- Deps: provider adapter pattern

- [ ] Verification tests
- Deliverables: E2E consent off -> no tags; consent on -> only enabled tags
- DoD: tests pass in CI-like run
- Deps: event bus + script loader

**Definition of Done**

- [ ] Consent off -> no analytics/marketing scripts load
- [ ] Consent on -> only enabled scripts load
- [ ] No PII in event payloads

**Guardrails**

- [ ] All integrations must be disabled by default
- [ ] All marketing/analytics scripts must be consent gated
- [ ] Scripts must be lazy or interaction-loaded unless critical

---

## Phase 2.5 - Platform Data Layer (DB, RLS, Storage, Jobs)

**Goal:** Data and security foundations exist before marketing UI builds.

**Tasks**

- [ ] DB migrations + indexes
- Deliverables: SQL or migration scripts for reviews, testimonials, transformations, badges, certifications
- DoD: migrations apply cleanly; indexes cover common queries
- Deps: data models finalized

- [ ] RLS policies
- Deliverables: policies for public read (approved) and admin write
- DoD: public cannot write; admins can manage content
- Deps: migrations applied

- [ ] Storage bucket policies
- Deliverables: buckets for media, signed URL strategy for private assets
- DoD: public assets readable; consent docs private
- Deps: migrations applied

- [ ] Admin role model
- Deliverables: role claims or admins table; route middleware guard
- DoD: admin routes protected in dev and prod
- Deps: auth strategy defined

- [ ] Background job runner
- Deliverables: cron strategy for review sync, optional Instagram sync, cleanup job for revoked media
- DoD: jobs run without blocking page render
- Deps: data tables and storage buckets

---

## Phase 3 - Marketing Enhancements

**Goal:** Social proof, portfolio, trust indicators, and conversion elements built on the platform layer.

### 3.1 Social Proof (Reviews/Testimonial Model)

- [ ] Model decision and schema
- Deliverables: review schema + testimonial schema referencing reviewId
- DoD: one source of truth for ratings and counts
- Deps: data layer ready

- [ ] Testimonial display MVP
- Deliverables: carousel/grid, verified badge modes, aggregate rating component
- DoD: homepage shows ratings and a rotating testimonial block
- Deps: schema and seed data

- [ ] Video testimonials
- Deliverables: thumbnail + click-to-load player
- DoD: no iframe loads until interaction
- Deps: testimonial UI exists

### 3.2 Portfolio (Before/After)

- [ ] Transformation model + permissions
- Deliverables: transformation schema with permission scope and revocation
- DoD: permission fields stored and enforceable
- Deps: data layer ready

- [ ] Portfolio MVP slice
- Deliverables: gallery with filters, lightbox, keyboard support
- DoD: gallery shows 12 items; modal accessible
- Deps: transformation data seeded

- [ ] Performance rules
- Deliverables: thumbnails for grids, lazy-load full res in modal
- DoD: no above-the-fold grids of full-size images
- Deps: gallery MVP

- [ ] Instagram feed adapter
- Deliverables: manual CMS default with optional API sync job
- DoD: feed renders from manual data with fallback copy
- Deps: data layer ready

### 3.3 Trust Indicators

- [ ] Trust models
- Deliverables: trust badge + certification schemas with verification URLs
- DoD: links point to issuer verification pages
- Deps: data layer ready

- [ ] Trust UI
- Deliverables: badge grid + certification cards
- DoD: displayed on homepage and service pages
- Deps: trust models seeded

- [ ] Guarantee + longevity
- Deliverables: satisfaction and longevity copy with source fields
- DoD: only data-backed claims render
- Deps: business data source

### 3.4 Conversion Elements (Truthful + Non-Intrusive)

- [ ] Sticky booking CTA
- Deliverables: sticky button with safe mobile spacing
- DoD: no overlap with mobile nav or footer
- Deps: booking link defined

- [ ] CTA component + tracking
- Deliverables: CTA component wired to event bus
- DoD: click emits canonical event without PII
- Deps: event bus

- [ ] Urgency and activity rules
- Deliverables: system-sourced checks + neutral fallback copy
- DoD: no fabricated numbers displayed
- Deps: booking/CRM data source

- [ ] Lead capture banner
- Deliverables: inline/bottom banner variant
- DoD: banner used on mobile; non-intrusive
- Deps: contact endpoint

- [ ] Exit intent experiment
- Deliverables: desktop-only experiment flag
- DoD: disabled by default; no mobile interstitials
- Deps: analytics events

---

## Phase 4 - Admin UI + Content Ops

**Goal:** Non-devs can manage content safely.

**Tasks**

- [ ] Admin routes + auth
- Deliverables: admin dashboard routes, route protection middleware
- DoD: non-admins cannot access admin pages
- Deps: admin role model

- [ ] Upload tooling
- Deliverables: admin upload UI, validation, optimization, thumbnails
- DoD: upload produces optimized assets + thumbnails
- Deps: storage buckets ready

- [ ] Moderation workflow
- Deliverables: pending/approved/rejected status UI and filters
- DoD: only approved content renders publicly
- Deps: review/testimonial schemas

- [ ] Audit log
- Deliverables: lightweight audit table and admin activity log view
- DoD: admin actions recorded and viewable
- Deps: admin routes

- [ ] Media takedown tooling
- Deliverables: revoke + purge flow for consented media
- DoD: revoked assets removed from UI and CDN
- Deps: storage buckets + revocation fields

---

## Phase 5 - Major Integrations (Tiered)

### Tier 1 (Highest ROI, Lowest Complexity)

- [ ] GA4 baseline + event taxonomy mapping
- Deliverables: GA4 tag wired to event bus and consent
- DoD: events visible in GA4 debug view
- Deps: integration platform layer

- [ ] GTM optional
- Deliverables: GTM loader with consent gating
- DoD: GTM loads only when enabled
- Deps: script loader

- [ ] Google Ads conversion (client)
- Deliverables: conversion tag mapping to events
- DoD: conversion fires on lead submit or booking click
- Deps: event taxonomy

- [ ] Meta Pixel (client)
- Deliverables: pixel tag with consent gating
- DoD: pixel fires only on consent
- Deps: script loader

- [ ] Turnstile on forms
- Deliverables: Turnstile widget + server verification
- DoD: form rejects invalid tokens
- Deps: form endpoints

- [ ] Booking providers (deep links + embeds)
- Deliverables: provider adapter + link/embed templates
- DoD: booking CTA opens correct provider link
- Deps: integration registry

### Tier 2

- [ ] Meta CAPI (server) with `event_id` dedup
- Deliverables: server event endpoint + deduped payloads
- DoD: test events show in Meta test console
- Deps: event bus

- [ ] Stripe payment links + webhooks
- Deliverables: payment link config + webhook handler
- DoD: webhook verified and logged
- Deps: server env secrets

- [ ] Email routing adapters
- Deliverables: server adapters for Mailchimp/Brevo/etc.
- DoD: lead submit routes to selected provider
- Deps: lead schema

### Tier 3

- [ ] Review aggregation jobs
- Deliverables: scheduled review sync; Google required, Facebook best-effort
- DoD: reviews update without blocking page render
- Deps: background job runner

- [ ] CMS adapters
- Deliverables: optional adapters for Sanity/Contentful/Strapi/Payload
- DoD: content reads from selected CMS when enabled
- Deps: integration registry

- [ ] Advanced chat widgets / session replay
- Deliverables: chat and replay tags gated by marketing consent
- DoD: no scripts load without consent
- Deps: script loader

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
- Dependency install + verify
- ESLint config resolution
- Tailwind tokens + SearchDialog palette
- Consent persistence smoke test
- Component fixups
- Type hygiene cleanup
- Blog: MDX parsing
- Blog: metadata types + validation
- Contact form: schema + UI
- Contact form: submission + spam baseline
- Services: data model + pages
- Search: index + UX
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

**Last Updated:** February 9, 2026  
**Documentation Pass Completed:** February 9, 2026 - 78 files documented with comprehensive metaheaders
**Estimated Completion:** 2-4 weeks (depending on scope and team size)
