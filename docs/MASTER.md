# Documentation Master Reference

Date: 2026-02-10

This document consolidates current documentation content from the /docs directory.
Open tasks, issues, and recommendations from the docs have been moved to TODO.md.

**Note:** This repository has been restructured to support multiple templates and clients. The original `templates/hair-salon` has been migrated to `templates/hair-salon`. All references below have been updated accordingly.

## Architecture Map

Status: INCOMPLETE. Populate as files are audited.

### High-Level Components

- App shell
  - Root layout renders global metadata, CSP nonce JSON-LD, and shared UI wrappers in [templates/hair-salon/app/layout.tsx](templates/hair-salon/app/layout.tsx).
- Home route
  - Homepage composes hero and marketing sections in [templates/hair-salon/app/page.tsx](templates/hair-salon/app/page.tsx).
- About route
  - About page highlights story, values, and CTAs in [templates/hair-salon/app/about/page.tsx](templates/hair-salon/app/about/page.tsx).
- Blog routes
  - Blog index and categories live in [templates/hair-salon/app/blog/page.tsx](templates/hair-salon/app/blog/page.tsx).
  - Blog post detail rendering lives in [templates/hair-salon/app/blog/[slug]/page.tsx](templates/hair-salon/app/blog/[slug]/page.tsx).
- Booking route
  - Booking request form UI in [templates/hair-salon/app/book/page.tsx](templates/hair-salon/app/book/page.tsx).
- Contact route
  - Contact form and salon info in [templates/hair-salon/app/contact/page.tsx](templates/hair-salon/app/contact/page.tsx).
- Gallery route
  - Portfolio gallery grid in [templates/hair-salon/app/gallery/page.tsx](templates/hair-salon/app/gallery/page.tsx).
- Pricing route
  - Service pricing and FAQs in [templates/hair-salon/app/pricing/page.tsx](templates/hair-salon/app/pricing/page.tsx).
- Privacy route
  - Privacy policy content in [templates/hair-salon/app/privacy/page.tsx](templates/hair-salon/app/privacy/page.tsx).
- Search route
  - Search experience in [templates/hair-salon/app/search/page.tsx](templates/hair-salon/app/search/page.tsx).
- Services routes
  - Services overview in [templates/hair-salon/app/services/page.tsx](templates/hair-salon/app/services/page.tsx).
  - Coloring detail in [templates/hair-salon/app/services/coloring/page.tsx](templates/hair-salon/app/services/coloring/page.tsx).
  - Haircuts detail in [templates/hair-salon/app/services/haircuts/page.tsx](templates/hair-salon/app/services/haircuts/page.tsx).
  - Special occasions detail in [templates/hair-salon/app/services/special-occasions/page.tsx](templates/hair-salon/app/services/special-occasions/page.tsx).
  - Treatments detail in [templates/hair-salon/app/services/treatments/page.tsx](templates/hair-salon/app/services/treatments/page.tsx).
- Team route
  - Team bios and CTA in [templates/hair-salon/app/team/page.tsx](templates/hair-salon/app/team/page.tsx).
- Terms route
  - Terms of Service content in [templates/hair-salon/app/terms/page.tsx](templates/hair-salon/app/terms/page.tsx).
- Client providers
  - Global error boundary and breadcrumbs live in [templates/hair-salon/app/providers.tsx](templates/hair-salon/app/providers.tsx).
- Error and loading UI
  - 404 experience in [templates/hair-salon/app/not-found.tsx](templates/hair-salon/app/not-found.tsx).
  - Suspense loading UI in [templates/hair-salon/app/loading.tsx](templates/hair-salon/app/loading.tsx).
- Metadata routes
  - robots.txt is generated in [templates/hair-salon/app/robots.ts](templates/hair-salon/app/robots.ts).
  - sitemap.xml is generated in [templates/hair-salon/app/sitemap.ts](templates/hair-salon/app/sitemap.ts).
- Open Graph route
  - Open Graph images are rendered in [templates/hair-salon/app/api/og/route.tsx](templates/hair-salon/app/api/og/route.tsx).
- Middleware and security
  - CSP nonce injection, security headers, and request context are managed in [templates/hair-salon/middleware.ts](templates/hair-salon/middleware.ts).
- Shared UI components
  - Global navigation, footer, and hero content are built from [templates/hair-salon/components/Navigation.tsx](templates/hair-salon/components/Navigation.tsx), [templates/hair-salon/components/Footer.tsx](templates/hair-salon/components/Footer.tsx), and [templates/hair-salon/components/Hero.tsx](templates/hair-salon/components/Hero.tsx).
  - Consent gating UI is handled in [templates/hair-salon/components/AnalyticsConsentBanner.tsx](templates/hair-salon/components/AnalyticsConsentBanner.tsx).
- Feature modules
  - Analytics consent and tracking live in [templates/hair-salon/features/analytics/lib/analytics-consent.ts](templates/hair-salon/features/analytics/lib/analytics-consent.ts) and [templates/hair-salon/features/analytics/lib/analytics.ts](templates/hair-salon/features/analytics/lib/analytics.ts).
  - Blog data and rendering helpers live in [templates/hair-salon/features/blog/lib/blog.ts](templates/hair-salon/features/blog/lib/blog.ts) and [templates/hair-salon/features/blog/components/BlogPostContent.tsx](templates/hair-salon/features/blog/components/BlogPostContent.tsx).
  - Contact form UI and schema live in [templates/hair-salon/features/contact/components/ContactForm.tsx](templates/hair-salon/features/contact/components/ContactForm.tsx) and [templates/hair-salon/features/contact/lib/contact-form-schema.ts](templates/hair-salon/features/contact/lib/contact-form-schema.ts).
  - HubSpot integration is built in [templates/hair-salon/features/hubspot/lib/hubspot-client.ts](templates/hair-salon/features/hubspot/lib/hubspot-client.ts).
  - Search UI is composed in [templates/hair-salon/features/search/components/SearchDialog.tsx](templates/hair-salon/features/search/components/SearchDialog.tsx) and [templates/hair-salon/features/search/components/SearchPage.tsx](templates/hair-salon/features/search/components/SearchPage.tsx).
  - Services layout components live in [templates/hair-salon/features/services/components/ServiceDetailLayout.tsx](templates/hair-salon/features/services/components/ServiceDetailLayout.tsx).
  - Supabase lead capture lives in [templates/hair-salon/features/supabase/lib/supabase-leads.ts](templates/hair-salon/features/supabase/lib/supabase-leads.ts).
- Shared server utilities
  - Env validation is handled in [templates/hair-salon/lib/env.ts](templates/hair-salon/lib/env.ts) and [templates/hair-salon/lib/env.public.ts](templates/hair-salon/lib/env.public.ts).
  - CSP helpers live in [templates/hair-salon/lib/csp.ts](templates/hair-salon/lib/csp.ts) with security headers in [templates/hair-salon/lib/security-headers.ts](templates/hair-salon/lib/security-headers.ts).
  - Server actions orchestrate submissions in [templates/hair-salon/lib/actions/submit.ts](templates/hair-salon/lib/actions/submit.ts).
  - Rate limiting helpers live in [templates/hair-salon/lib/rate-limit.ts](templates/hair-salon/lib/rate-limit.ts).

## Route Catalog

Status: INCOMPLETE. Populate as routes are audited.

### Routes

- Global layout
  - App shell and metadata: [templates/hair-salon/app/layout.tsx](templates/hair-salon/app/layout.tsx)
- /
  - Home page: [templates/hair-salon/app/page.tsx](templates/hair-salon/app/page.tsx)
- /about
  - About page: [templates/hair-salon/app/about/page.tsx](templates/hair-salon/app/about/page.tsx)
- Not found
  - 404 page: [templates/hair-salon/app/not-found.tsx](templates/hair-salon/app/not-found.tsx)
- Loading state
  - Global loading UI: [templates/hair-salon/app/loading.tsx](templates/hair-salon/app/loading.tsx)
- /robots.txt
  - Robots metadata: [templates/hair-salon/app/robots.ts](templates/hair-salon/app/robots.ts)
- /sitemap.xml
  - Sitemap metadata: [templates/hair-salon/app/sitemap.ts](templates/hair-salon/app/sitemap.ts)
- /api/og
  - Open Graph image generation: [templates/hair-salon/app/api/og/route.tsx](templates/hair-salon/app/api/og/route.tsx)
- /blog
  - Blog index: [templates/hair-salon/app/blog/page.tsx](templates/hair-salon/app/blog/page.tsx)
- /blog/[slug]
  - Blog post detail: [templates/hair-salon/app/blog/[slug]/page.tsx](templates/hair-salon/app/blog/[slug]/page.tsx)
- /book
  - Booking request: [templates/hair-salon/app/book/page.tsx](templates/hair-salon/app/book/page.tsx)
- /contact
  - Contact page: [templates/hair-salon/app/contact/page.tsx](templates/hair-salon/app/contact/page.tsx)
- /gallery
  - Gallery page: [templates/hair-salon/app/gallery/page.tsx](templates/hair-salon/app/gallery/page.tsx)
- /pricing
  - Pricing page: [templates/hair-salon/app/pricing/page.tsx](templates/hair-salon/app/pricing/page.tsx)
- /privacy
  - Privacy policy: [templates/hair-salon/app/privacy/page.tsx](templates/hair-salon/app/privacy/page.tsx)
- /search
  - Search page: [templates/hair-salon/app/search/page.tsx](templates/hair-salon/app/search/page.tsx)
- /services
  - Services overview: [templates/hair-salon/app/services/page.tsx](templates/hair-salon/app/services/page.tsx)
- /services/coloring
  - Coloring service detail: [templates/hair-salon/app/services/coloring/page.tsx](templates/hair-salon/app/services/coloring/page.tsx)
- /services/haircuts
  - Haircuts service detail: [templates/hair-salon/app/services/haircuts/page.tsx](templates/hair-salon/app/services/haircuts/page.tsx)
- /services/special-occasions
  - Special occasions detail: [templates/hair-salon/app/services/special-occasions/page.tsx](templates/hair-salon/app/services/special-occasions/page.tsx)
- /services/treatments
  - Treatments detail: [templates/hair-salon/app/services/treatments/page.tsx](templates/hair-salon/app/services/treatments/page.tsx)
- /team
  - Team page: [templates/hair-salon/app/team/page.tsx](templates/hair-salon/app/team/page.tsx)
- /terms
  - Terms of Service: [templates/hair-salon/app/terms/page.tsx](templates/hair-salon/app/terms/page.tsx)

## Baseline Snapshot

Date: 2026-02-10

### Versions and Enforcement

- Node
  - engines: >=24.0.0 in package.json (updated from >=20.0.0)
  - CI: actions/setup-node uses 20.x in .github/workflows/ci.yml
  - Docker: node:20-alpine in templates/hair-salon/Dockerfile
- pnpm
  - packageManager: pnpm@10.29.2 in package.json
  - CI: pnpm/action-setup uses 10.29.2 in .github/workflows/ci.yml
  - Config: .pnpmrc sets prefer-frozen-lockfile=true
- Turbo
  - devDependency: turbo 2.2.3 in package.json

### Workspace Graph

- Root workspaces: templates/\*, clients/\*, packages/\*, and packages/config/\* in package.json
- pnpm-workspace.yaml matches templates/\*, clients/\*, packages/\*, and packages/config/\*

### Turbo Pipeline and Cache Behavior

From turbo.json:

- build: dependsOn ^build; outputs .next/** (excluding .next/cache), dist/**, build/\*\*
- dev: cache=false, persistent=true
- lint: dependsOn ^lint
- type-check: dependsOn ^type-check
- test: dependsOn ^build; outputs coverage/**; inputs src/**/\*.ts(x), **/**tests**/**, jest.config.js
- format and format:check: cache=false

### Next.js Entry Points and Runtime Mode

- App router: templates/hair-salon/app/\* (layout.tsx, page.tsx, route files)
- Middleware: templates/hair-salon/middleware.ts
- Metadata routes: templates/hair-salon/app/robots.ts, templates/hair-salon/app/sitemap.ts
- Runtime modes (by file intent, verify at runtime):
  - Server components: templates/hair-salon/app/layout.tsx, templates/hair-salon/app/page.tsx
  - Edge middleware: templates/hair-salon/middleware.ts (Next.js middleware)

### Pending Verification Commands (Not Executed)

- pnpm install
- pnpm lint
- pnpm type-check
- pnpm test
- pnpm test:coverage
- pnpm build
- pnpm start or docker-compose up -d

## Testing Status

Date: 2026-02-09

### Summary

No commands executed yet. All status entries are UNVERIFIED.

### Command Log

- pnpm install
  - Status: UNVERIFIED
- pnpm lint
  - Status: UNVERIFIED
- pnpm type-check
  - Status: UNVERIFIED
- pnpm test
  - Status: UNVERIFIED
- pnpm test:coverage
  - Status: UNVERIFIED
- pnpm build
  - Status: UNVERIFIED
- pnpm start or docker-compose up -d
  - Status: UNVERIFIED

### Gaps

- No verified CI run outputs captured.
- No coverage numbers recorded.

## Template Setup

This guide explains how to configure the template and connect optional integrations (booking, payments, CRM).

### Required Environment Variables

Set these on every deployment. They are validated at startup.

- NEXT_PUBLIC_SITE_URL - Public base URL (e.g., https://example.com)
- NEXT_PUBLIC_SITE_NAME - Public site name for metadata
- SUPABASE_URL - Supabase project URL
- SUPABASE_SERVICE_ROLE_KEY - Supabase service role key (server-only)
- HUBSPOT_PRIVATE_APP_TOKEN - HubSpot private app token (server-only)

### Production-Only Requirements

- UPSTASH_REDIS_REST_URL - Upstash Redis REST URL
- UPSTASH_REDIS_REST_TOKEN - Upstash Redis REST token

These are required in production to enforce distributed rate limiting.

### Optional Environment Variables

- NEXT_PUBLIC_ANALYTICS_ID - GA4 measurement ID (enables analytics once consent is granted)
- NEXT_PUBLIC_SENTRY_DSN - Sentry DSN for error reporting

### Booking Integrations (Optional)

Choose one provider and connect its hosted booking page or API:

- Square Appointments
- Fresha
- Vagaro
- GlossGenius
- Mindbody

Recommended approach:

1. Replace the booking CTA URLs (e.g., /book) with the provider link.
2. If using an embedded widget, add a client component that loads the script after user consent.
3. Update copy in the booking page to match the provider flow.

### Payments (Optional)

If you collect deposits or gift card payments online:

- Stripe Checkout
- Square Payments
- PayPal

Recommended approach:

1. Add a deposit option to the booking page or contact flow.
2. Use a hosted checkout URL instead of handling card data directly.

### CRM and Lead Routing (Optional)

The template supports HubSpot by default. If you use a different CRM:

1. Update the server action in templates/hair-salon/lib/actions to route leads.
2. Keep the same payload shape for contact form data to avoid UI changes.

### Customization Checklist

- Update organization details in templates/hair-salon/lib/constants.ts
- Replace logos and social links in templates/hair-salon/components/Navigation.tsx and templates/hair-salon/components/Footer.tsx
- Update images in templates/hair-salon/public
- Review sitemap entries in templates/hair-salon/app/sitemap.ts
- Review SEO metadata in templates/hair-salon/app/layout.tsx

## Integration Guardrails

This document is a concise reference for shipping integrations without breaking performance, privacy, or trust. Use it alongside the marketing-first specs.

### Non-Negotiables

- Default-off: all integrations must ship disabled until explicitly enabled.
- Consent-gated: analytics and marketing scripts must not load before consent.
- No PII: event payloads must never include emails, phone numbers, or names.
- Truthfulness: urgency and recent-activity widgets must be system-sourced or render neutral copy.

### Consent Categories

- necessary
- functional
- analytics
- marketing

Each category must track state as unknown, granted, or denied, and be persisted with cookie + local storage.

### Script Loading Rules

- on_page_load: load after page becomes interactive and consent is granted.
- on_interaction: load only after explicit user action.
- idle: load during idle time if consent is granted.

### Event Taxonomy (Canonical)

- book_click
- contact_click
- lead_submit
- gallery_open
- testimonial_engage
- review_submit
- cta_click

### Performance Budgets

- Keep third-party scripts within page budgets; lazy-load non-critical providers.
- Use thumbnails in grids and lazy-load full-resolution media in modals.
- Video embeds load on click only.

### CSP Allowlist

Each integration must declare domains for script, image, connect, and frame sources. The CSP allowlist is generated from enabled integrations only.

### Related Specs

- Marketing-first requirements: [.kiro/specs/marketing-first-enhancements/requirements.md](../.kiro/specs/marketing-first-enhancements/requirements.md)
- Marketing-first design: [.kiro/specs/marketing-first-enhancements/design.md](../.kiro/specs/marketing-first-enhancements/design.md)

## Integrations Audit

Status: INCOMPLETE. Populate as integrations are audited.

### Consent and Privacy

- Audit pending for analytics and consent flow.

## Quality Report

Status: INCOMPLETE. Findings are tracked in TODO.md.

## Remediation Plan

Status: INCOMPLETE. Populate after findings are recorded.

### Plan

- Pending prioritization once issues are identified.

## Dead Code and Unused

Status: INCOMPLETE. Findings will be added during audits.

### Findings

- None recorded yet.

## Documentation Directory

### Current Documentation

All current configuration and development documentation is in the repository root, including:

#### Configuration Audit Reports (February 2026)

- EXECUTIVE_SUMMARY.md — Top findings and action items
- CONFIG_MAP.md — Complete configuration inventory
- CONFIG_CONFLICTS.md — Conflicts, drift, and duplication analysis
- CONFIG_VERSIONS.md — Version audit and pinning policy
- CONFIG_GAPS.md — Best practices coverage
- PATCH_PLAN.md — Implementation steps for fixes
- VERIFICATION_EVIDENCE.md — Test results and current status

#### Developer Documentation

- README.md — Project overview and quick start
- CONFIG.md — Detailed configuration reference
- CONTRIBUTING.md — Development setup and guidelines
- TODO.md — Implementation roadmap
- SECURITY.md — Security policy

### Archive

The archive/ directory contains outdated documentation superseded by the comprehensive audit reports above.

## Codebase Index

Status: INCOMPLETE. Entries will be added as each file is audited.

### Index

- package.json
  - Meta: docs/file-meta/package.json.md
  - Role: root tooling and scripts for monorepo
- pnpm-workspace.yaml
  - Meta: docs/file-meta/pnpm-workspace.yaml.md
  - Role: workspace package discovery for pnpm
- turbo.json
  - Meta: docs/file-meta/turbo.json.md
  - Role: Turbo task pipeline and caching rules
- .pnpmrc
  - Meta: docs/file-meta/.pnpmrc.md
  - Role: pnpm install behavior and peer dependency enforcement
- .npmrc
  - Meta: docs/file-meta/.npmrc.md
  - Role: npm registry configuration
- .editorconfig
  - Role: editor formatting defaults
- .env.example
  - Role: environment variable template for local setup
- .eslintignore
  - Role: ESLint ignore rules
- .gitignore
  - Role: git ignore rules for generated and local files
- .markdownlint.json
  - Meta: docs/file-meta/.markdownlint.json.md
  - Role: markdownlint configuration
- .prettierignore
  - Role: Prettier ignore rules
- .prettierrc
  - Meta: docs/file-meta/.prettierrc.md
  - Role: Prettier formatting configuration
- ANALYSIS.md
  - Role: legacy analysis (UNVERIFIED)
- CONFIG.md
  - Role: configuration overview (partially verified)
- CONTRIBUTING.md
  - Role: contributor guide (partially verified)
- docker-compose.yml
  - Meta: docs/file-meta/docker-compose.yml.md
  - Role: local Docker Compose dev service
- jest.config.js
  - Role: Jest root configuration
- jest.helpers.ts
  - Role: shared Jest test utilities
- jest.setup.js
  - Role: Jest global setup
- LICENSE
  - Meta: docs/file-meta/LICENSE.md
  - Role: repository license text
- README.md
  - Role: repository overview (partially verified)
- SECURITY.md
  - Role: security policy (partial, placeholder contact)
- tasks.md
  - Role: audit task tracker
- TODO.md
  - Role: implementation backlog (unverified)
- tsconfig.base.json
  - Meta: docs/file-meta/tsconfig.base.json.md
  - Role: shared TypeScript compiler options
- tsconfig.json
  - Meta: docs/file-meta/tsconfig.json.md
  - Role: root TypeScript config
- templates/hair-salon/app/layout.tsx
  - Role: Next.js root layout shell and metadata
- templates/hair-salon/app/page.tsx
  - Role: home page composition
- templates/hair-salon/app/providers.tsx
  - Role: client providers wrapper and error boundary
- templates/hair-salon/app/loading.tsx
  - Role: global loading UI for route segments
- templates/hair-salon/app/not-found.tsx
  - Role: custom 404 UI
- templates/hair-salon/app/robots.ts
  - Role: robots.txt metadata route
- templates/hair-salon/app/sitemap.ts
  - Role: sitemap.xml metadata route
- templates/hair-salon/app/api/og/route.tsx
  - Role: Open Graph image generation route
- templates/hair-salon/app/about/page.tsx
  - Role: about page story, values, and CTAs
- templates/hair-salon/app/blog/page.tsx
  - Role: blog index and category filters
- templates/hair-salon/app/blog/[slug]/page.tsx
  - Role: blog post detail view
- templates/hair-salon/app/book/page.tsx
  - Role: booking request page
- templates/hair-salon/app/contact/page.tsx
  - Role: contact form and salon info
- templates/hair-salon/app/gallery/page.tsx
  - Role: gallery grid and portfolio filters
- templates/hair-salon/app/pricing/page.tsx
  - Role: pricing menu and FAQs
- templates/hair-salon/app/privacy/page.tsx
  - Role: privacy policy
- templates/hair-salon/app/search/page.tsx
  - Role: site search experience
- templates/hair-salon/app/services/page.tsx
  - Role: services overview
- templates/hair-salon/app/services/coloring/page.tsx
  - Role: service detail - coloring
- templates/hair-salon/app/services/haircuts/page.tsx
  - Role: service detail - haircuts
- templates/hair-salon/app/services/special-occasions/page.tsx
  - Role: service detail - special occasions
- templates/hair-salon/app/services/treatments/page.tsx
  - Role: service detail - treatments
- templates/hair-salon/app/team/page.tsx
  - Role: team bios and CTA
- templates/hair-salon/app/terms/page.tsx
  - Role: terms of service
- templates/hair-salon/eslint.config.mjs
  - Role: app-specific ESLint configuration
- templates/hair-salon/middleware.ts
  - Role: CSP nonce injection, security headers, and request context
- templates/hair-salon/next.config.js
  - Role: Next.js config (images, headers, and build options)
- templates/hair-salon/postcss.config.js
  - Role: PostCSS plugins for Tailwind and autoprefixer
- templates/hair-salon/tailwind.config.js
  - Role: Tailwind design tokens and content globs
- templates/hair-salon/components/AnalyticsConsentBanner.tsx
  - Role: consent gating UI for analytics activation
- templates/hair-salon/components/Breadcrumbs.tsx
  - Role: navigation breadcrumbs for interior pages
- templates/hair-salon/components/ErrorBoundary.tsx
  - Role: client error boundary wrapper
- templates/hair-salon/components/FinalCTA.tsx
  - Role: final CTA marketing block
- templates/hair-salon/components/Footer.tsx
  - Role: site footer navigation and contact info
- templates/hair-salon/components/Hero.tsx
  - Role: homepage hero section
- templates/hair-salon/components/InstallPrompt.tsx
  - Role: PWA install prompt handler
- templates/hair-salon/components/Navigation.tsx
  - Role: global navigation bar
- templates/hair-salon/components/SkipToContent.tsx
  - Role: accessibility skip link
- templates/hair-salon/components/SocialProof.tsx
  - Role: testimonials and ratings block
- templates/hair-salon/components/ValueProps.tsx
  - Role: value proposition marketing grid
- templates/hair-salon/features/analytics/index.ts
  - Role: analytics feature exports
- templates/hair-salon/features/analytics/lib/analytics-consent.ts
  - Role: consent storage and evaluation helpers
- templates/hair-salon/features/analytics/lib/analytics.ts
  - Role: analytics initialization and tracking helpers
- templates/hair-salon/features/blog/index.ts
  - Role: blog feature exports
- templates/hair-salon/features/blog/components/BlogPostContent.tsx
  - Role: blog post content renderer
- templates/hair-salon/features/blog/lib/blog-images.ts
  - Role: blog image lookup helpers
- templates/hair-salon/features/blog/lib/blog.ts
  - Role: blog post data access helpers
- templates/hair-salon/features/contact/index.ts
  - Role: contact feature exports
- templates/hair-salon/features/contact/components/ContactForm.tsx
  - Role: contact form UI and validation wiring
- templates/hair-salon/features/contact/lib/contact-form-schema.ts
  - Role: contact form schema and validation rules
- templates/hair-salon/features/hubspot/index.ts
  - Role: hubspot integration exports
- templates/hair-salon/features/hubspot/lib/hubspot-client.ts
  - Role: HubSpot API client helper
- templates/hair-salon/features/search/index.ts
  - Role: search feature exports
- templates/hair-salon/features/search/components/SearchDialog.tsx
  - Role: site-wide search dialog UI
- templates/hair-salon/features/search/components/SearchPage.tsx
  - Role: search page results UI
- templates/hair-salon/features/services/index.ts
  - Role: services feature exports
- templates/hair-salon/features/services/components/ServiceDetailLayout.tsx
  - Role: service detail layout wrapper
- templates/hair-salon/features/services/components/ServicesOverview.tsx
  - Role: services overview content block
- templates/hair-salon/features/supabase/index.ts
  - Role: Supabase integration exports
- templates/hair-salon/features/supabase/lib/supabase-leads.ts
  - Role: Supabase lead capture helper
- templates/hair-salon/lib/actions.ts
  - Role: exported server actions
- templates/hair-salon/lib/constants.ts
  - Role: site constants and defaults
- templates/hair-salon/lib/csp.ts
  - Role: CSP nonce and security policy helpers
- templates/hair-salon/lib/env.public.ts
  - Role: public env schema and validation
- templates/hair-salon/lib/env.ts
  - Role: server env schema and validation
- templates/hair-salon/lib/logger.ts
  - Role: logging utilities with Sentry hooks
- templates/hair-salon/lib/rate-limit.ts
  - Role: Upstash rate limiting helpers
- templates/hair-salon/lib/request-context.server.ts
  - Role: per-request context storage (server)
- templates/hair-salon/lib/request-context.ts
  - Role: per-request context helpers
- templates/hair-salon/lib/request-validation.ts
  - Role: form validation and request shaping helpers
- templates/hair-salon/lib/sanitize.ts
  - Role: input sanitization helpers
- templates/hair-salon/lib/search.ts
  - Role: search index helpers
- templates/hair-salon/lib/security-headers.ts
  - Role: security header definitions
- templates/hair-salon/lib/sentry-client.ts
  - Role: Sentry browser initialization
- templates/hair-salon/lib/sentry-sanitize.ts
  - Role: Sentry data scrubbing helpers
- templates/hair-salon/lib/sentry-server.ts
  - Role: Sentry server initialization
- templates/hair-salon/lib/utils.ts
  - Role: utility helpers
- templates/hair-salon/lib/actions/helpers.ts
  - Role: server action helpers
- templates/hair-salon/lib/actions/hubspot.ts
  - Role: HubSpot submission action
- templates/hair-salon/lib/actions/submit.ts
  - Role: contact form submission orchestrator
- templates/hair-salon/lib/actions/supabase.ts
  - Role: Supabase submission action
- templates/hair-salon/lib/actions/types.ts
  - Role: shared action types
- templates/hair-salon/lib/**tests**/env-setup.ts
  - Role: test env setup
- templates/hair-salon/lib/**tests**/env.test.ts
  - Role: env validation tests
- templates/hair-salon/lib/**tests**/sanitize.test.ts
  - Role: sanitize helper tests
- packages/config/eslint-config/library.js
  - Role: shared ESLint config for library packages
- packages/config/eslint-config/next.js
  - Role: shared ESLint config for Next.js apps
- packages/ui/eslint.config.mjs
  - Role: UI package ESLint config
- packages/ui/src/components/index.ts
  - Role: UI component exports
- packages/ui/src/components/Accordion.tsx
  - Role: accordion UI component
- packages/ui/src/components/Button.tsx
  - Role: button UI component
- packages/ui/src/components/Card.tsx
  - Role: card UI component
- packages/ui/src/components/Container.tsx
  - Role: layout container component
- packages/ui/src/components/Input.tsx
  - Role: input UI component
- packages/ui/src/components/Section.tsx
  - Role: section layout component
- packages/ui/src/components/Select.tsx
  - Role: select UI component
- packages/ui/src/components/Skeleton.tsx
  - Role: skeleton loading component
- packages/ui/src/components/Textarea.tsx
  - Role: textarea UI component
- packages/ui/src/components/**tests**/index.test.ts
  - Role: UI component tests
- packages/utils/eslint.config.mjs
  - Role: utils package ESLint config
- packages/utils/src/index.ts
  - Role: shared utility exports
- packages/utils/src/**tests**/index.test.ts
  - Role: utils package tests

## File Inventory

Status key: pending | in-progress | done

### Root

| Path                | Role   | Criticality   | Status  |
| ------------------- | ------ | ------------- | ------- |
| .editorconfig       | config | optional      | done    |
| .env.example        | config | important     | done    |
| .eslintignore       | config | optional      | done    |
| .gitignore          | config | optional      | done    |
| .markdownlint.json  | config | optional      | done    |
| .npmrc              | config | important     | done    |
| .pnpmrc             | config | important     | done    |
| .prettierignore     | config | optional      | done    |
| .prettierrc         | config | optional      | done    |
| ANALYSIS.md         | docs   | optional      | done    |
| CONFIG.md           | docs   | important     | done    |
| CONTRIBUTING.md     | docs   | important     | done    |
| docker-compose.yml  | infra  | important     | done    |
| jest.config.js      | test   | important     | done    |
| jest.helpers.ts     | test   | optional      | done    |
| jest.setup.js       | test   | important     | done    |
| LICENSE             | docs   | optional      | done    |
| package.json        | config | critical path | done    |
| pnpm-lock.yaml      | config | critical path | pending |
| pnpm-workspace.yaml | config | critical path | done    |
| README.md           | docs   | important     | done    |
| SECURITY.md         | docs   | important     | done    |
| tasks.md            | docs   | optional      | done    |
| TODO.md             | docs   | optional      | done    |
| tsconfig.base.json  | config | important     | done    |
| tsconfig.json       | config | important     | done    |
| turbo.json          | config | important     | done    |

### .githooks

| Path                    | Role   | Criticality | Status  |
| ----------------------- | ------ | ----------- | ------- |
| .githooks/INDEX.toon    | script | optional    | pending |
| .githooks/post-checkout | script | optional    | pending |
| .githooks/post-merge    | script | optional    | pending |

### .github

| Path                              | Role   | Criticality | Status  |
| --------------------------------- | ------ | ----------- | ------- |
| .github/dependabot.yml            | config | optional    | pending |
| .github/workflows/ci.yml          | ci     | important   | pending |
| .github/workflows/secret-scan.yml | ci     | important   | pending |

### .kiro

| Path                                                     | Role | Criticality | Status  |
| -------------------------------------------------------- | ---- | ----------- | ------- |
| .kiro/specs/marketing-first-enhancements/.config.kiro    | docs | optional    | pending |
| .kiro/specs/marketing-first-enhancements/design.md       | docs | optional    | pending |
| .kiro/specs/marketing-first-enhancements/requirements.md | docs | optional    | pending |
| .kiro/steering/product.md                                | docs | optional    | pending |
| .kiro/steering/structure.md                              | docs | optional    | pending |
| .kiro/steering/tech.md                                   | docs | optional    | pending |

### .vscode

| Path                    | Role   | Criticality | Status  |
| ----------------------- | ------ | ----------- | ------- |
| .vscode/extensions.json | config | optional    | pending |
| .vscode/settings.json   | config | optional    | pending |

### templates/hair-salon

| Path                                      | Role    | Criticality   | Status  |
| ----------------------------------------- | ------- | ------------- | ------- |
| templates/hair-salon/Dockerfile           | infra   | important     | pending |
| templates/hair-salon/eslint.config.mjs    | config  | important     | done    |
| templates/hair-salon/middleware.ts        | runtime | critical path | done    |
| templates/hair-salon/next-env.d.ts        | config  | optional      | pending |
| templates/hair-salon/next.config.js       | config  | important     | done    |
| templates/hair-salon/package.json         | config  | critical path | pending |
| templates/hair-salon/package.json.bak     | docs    | optional      | pending |
| templates/hair-salon/postcss.config.js    | config  | important     | done    |
| templates/hair-salon/tailwind.config.js   | config  | important     | done    |
| templates/hair-salon/tsconfig.json        | config  | important     | pending |
| templates/hair-salon/tsconfig.tsbuildinfo | asset   | optional      | pending |

#### templates/hair-salon/app

| Path                                                         | Role    | Criticality   | Status  |
| ------------------------------------------------------------ | ------- | ------------- | ------- |
| templates/hair-salon/app/globals.css                         | asset   | important     | pending |
| templates/hair-salon/app/layout.tsx                          | runtime | critical path | done    |
| templates/hair-salon/app/loading.tsx                         | runtime | optional      | done    |
| templates/hair-salon/app/not-found.tsx                       | runtime | important     | done    |
| templates/hair-salon/app/page.tsx                            | runtime | critical path | done    |
| templates/hair-salon/app/providers.tsx                       | runtime | important     | done    |
| templates/hair-salon/app/robots.ts                           | runtime | important     | done    |
| templates/hair-salon/app/sitemap.ts                          | runtime | important     | done    |
| templates/hair-salon/app/about/page.tsx                      | runtime | important     | done    |
| templates/hair-salon/app/api/og/route.tsx                    | runtime | important     | done    |
| templates/hair-salon/app/blog/page.tsx                       | runtime | important     | done    |
| templates/hair-salon/app/blog/[slug]/page.tsx                | runtime | important     | done    |
| templates/hair-salon/app/book/page.tsx                       | runtime | important     | done    |
| templates/hair-salon/app/contact/page.tsx                    | runtime | important     | done    |
| templates/hair-salon/app/gallery/page.tsx                    | runtime | important     | done    |
| templates/hair-salon/app/pricing/page.tsx                    | runtime | important     | done    |
| templates/hair-salon/app/privacy/page.tsx                    | runtime | important     | done    |
| templates/hair-salon/app/search/page.tsx                     | runtime | important     | done    |
| templates/hair-salon/app/services/page.tsx                   | runtime | important     | done    |
| templates/hair-salon/app/services/coloring/page.tsx          | runtime | important     | done    |
| templates/hair-salon/app/services/haircuts/page.tsx          | runtime | important     | done    |
| templates/hair-salon/app/services/special-occasions/page.tsx | runtime | important     | done    |
| templates/hair-salon/app/services/treatments/page.tsx        | runtime | important     | done    |
| templates/hair-salon/app/team/page.tsx                       | runtime | important     | done    |
| templates/hair-salon/app/terms/page.tsx                      | runtime | important     | done    |

#### templates/hair-salon/components

| Path                                                       | Role    | Criticality   | Status |
| ---------------------------------------------------------- | ------- | ------------- | ------ |
| templates/hair-salon/components/AnalyticsConsentBanner.tsx | runtime | critical path | done   |
| templates/hair-salon/components/Breadcrumbs.tsx            | runtime | important     | done   |
| templates/hair-salon/components/ErrorBoundary.tsx          | runtime | important     | done   |
| templates/hair-salon/components/FinalCTA.tsx               | runtime | optional      | done   |
| templates/hair-salon/components/Footer.tsx                 | runtime | important     | done   |
| templates/hair-salon/components/Hero.tsx                   | runtime | important     | done   |
| templates/hair-salon/components/InstallPrompt.tsx          | runtime | optional      | done   |
| templates/hair-salon/components/Navigation.tsx             | runtime | important     | done   |
| templates/hair-salon/components/SkipToContent.tsx          | runtime | important     | done   |
| templates/hair-salon/components/SocialProof.tsx            | runtime | optional      | done   |
| templates/hair-salon/components/ValueProps.tsx             | runtime | important     | done   |

#### templates/hair-salon/features

| Path                                                                      | Role    | Criticality   | Status |
| ------------------------------------------------------------------------- | ------- | ------------- | ------ |
| templates/hair-salon/features/analytics/index.ts                          | runtime | important     | done   |
| templates/hair-salon/features/analytics/lib/analytics-consent.ts          | runtime | critical path | done   |
| templates/hair-salon/features/analytics/lib/analytics.ts                  | runtime | critical path | done   |
| templates/hair-salon/features/blog/index.ts                               | runtime | important     | done   |
| templates/hair-salon/features/blog/components/BlogPostContent.tsx         | runtime | important     | done   |
| templates/hair-salon/features/blog/lib/blog-images.ts                     | runtime | important     | done   |
| templates/hair-salon/features/blog/lib/blog.ts                            | runtime | important     | done   |
| templates/hair-salon/features/contact/index.ts                            | runtime | important     | done   |
| templates/hair-salon/features/contact/components/ContactForm.tsx          | runtime | important     | done   |
| templates/hair-salon/features/contact/lib/contact-form-schema.ts          | runtime | important     | done   |
| templates/hair-salon/features/hubspot/index.ts                            | runtime | important     | done   |
| templates/hair-salon/features/hubspot/lib/hubspot-client.ts               | runtime | important     | done   |
| templates/hair-salon/features/search/index.ts                             | runtime | important     | done   |
| templates/hair-salon/features/search/components/SearchDialog.tsx          | runtime | important     | done   |
| templates/hair-salon/features/search/components/SearchPage.tsx            | runtime | important     | done   |
| templates/hair-salon/features/services/index.ts                           | runtime | important     | done   |
| templates/hair-salon/features/services/components/ServiceDetailLayout.tsx | runtime | important     | done   |
| templates/hair-salon/features/services/components/ServicesOverview.tsx    | runtime | important     | done   |
| templates/hair-salon/features/supabase/index.ts                           | runtime | important     | done   |
| templates/hair-salon/features/supabase/lib/supabase-leads.ts              | runtime | important     | done   |

#### templates/hair-salon/lib

| Path                                                | Role    | Criticality   | Status |
| --------------------------------------------------- | ------- | ------------- | ------ |
| templates/hair-salon/lib/actions.ts                 | runtime | important     | done   |
| templates/hair-salon/lib/constants.ts               | runtime | important     | done   |
| templates/hair-salon/lib/csp.ts                     | runtime | critical path | done   |
| templates/hair-salon/lib/env.public.ts              | runtime | critical path | done   |
| templates/hair-salon/lib/env.ts                     | runtime | critical path | done   |
| templates/hair-salon/lib/logger.ts                  | runtime | important     | done   |
| templates/hair-salon/lib/rate-limit.ts              | runtime | important     | done   |
| templates/hair-salon/lib/request-context.server.ts  | runtime | important     | done   |
| templates/hair-salon/lib/request-context.ts         | runtime | important     | done   |
| templates/hair-salon/lib/request-validation.ts      | runtime | important     | done   |
| templates/hair-salon/lib/sanitize.ts                | runtime | important     | done   |
| templates/hair-salon/lib/search.ts                  | runtime | important     | done   |
| templates/hair-salon/lib/security-headers.ts        | runtime | important     | done   |
| templates/hair-salon/lib/sentry-client.ts           | runtime | important     | done   |
| templates/hair-salon/lib/sentry-sanitize.ts         | runtime | important     | done   |
| templates/hair-salon/lib/sentry-server.ts           | runtime | important     | done   |
| templates/hair-salon/lib/utils.ts                   | runtime | important     | done   |
| templates/hair-salon/lib/actions/helpers.ts         | runtime | important     | done   |
| templates/hair-salon/lib/actions/hubspot.ts         | runtime | important     | done   |
| templates/hair-salon/lib/actions/submit.ts          | runtime | important     | done   |
| templates/hair-salon/lib/actions/supabase.ts        | runtime | important     | done   |
| templates/hair-salon/lib/actions/types.ts           | runtime | important     | done   |
| templates/hair-salon/lib/**tests**/env-setup.ts     | test    | optional      | done   |
| templates/hair-salon/lib/**tests**/env.test.ts      | test    | important     | done   |
| templates/hair-salon/lib/**tests**/sanitize.test.ts | test    | important     | done   |

## File Inventory - docs

| Path                                  | Role | Criticality | Status  |
| ------------------------------------- | ---- | ----------- | ------- |
| docs/BASELINE.md                      | docs | important   | pending |
| docs/INTEGRATION_GUARDRAILS.md        | docs | important   | pending |
| docs/README.md                        | docs | important   | pending |
| docs/TEMPLATE_SETUP.md                | docs | important   | pending |
| docs/TESTING_STATUS.md                | docs | important   | pending |
| docs/archive/CONFIG_CONFLICTS.md      | docs | optional    | pending |
| docs/archive/CONFIG_GAPS.md           | docs | optional    | pending |
| docs/archive/CONFIG_MAP.md            | docs | optional    | pending |
| docs/archive/CONFIG_VERSIONS.md       | docs | optional    | pending |
| docs/archive/CONFIGURATION_AUDIT.md   | docs | optional    | pending |
| docs/archive/EXECUTIVE_SUMMARY.md     | docs | optional    | pending |
| docs/archive/INFRASTRUCTURE.md        | docs | optional    | pending |
| docs/archive/PATCH_PLAN.md            | docs | optional    | pending |
| docs/archive/README.md                | docs | optional    | pending |
| docs/archive/VERIFICATION_EVIDENCE.md | docs | optional    | pending |

## File Inventory - packages/config

| Path                                           | Role   | Criticality | Status  |
| ---------------------------------------------- | ------ | ----------- | ------- |
| packages/config/package.json                   | config | important   | pending |
| packages/config/eslint-config/library.js       | config | important   | done    |
| packages/config/eslint-config/next.js          | config | important   | done    |
| packages/config/eslint-config/package.json     | config | important   | pending |
| packages/config/typescript-config/base.json    | config | important   | pending |
| packages/config/typescript-config/node.json    | config | important   | pending |
| packages/config/typescript-config/package.json | config | important   | pending |
| packages/config/typescript-config/react.json   | config | important   | pending |

## File Inventory - packages/ui

| Path                                               | Role    | Criticality | Status  |
| -------------------------------------------------- | ------- | ----------- | ------- |
| packages/ui/.ai-context.md                         | docs    | optional    | pending |
| packages/ui/eslint.config.mjs                      | config  | important   | done    |
| packages/ui/package.json                           | config  | important   | pending |
| packages/ui/tsconfig.json                          | config  | important   | pending |
| packages/ui/src/components/Accordion.tsx           | runtime | important   | done    |
| packages/ui/src/components/Button.tsx              | runtime | important   | done    |
| packages/ui/src/components/Card.tsx                | runtime | important   | done    |
| packages/ui/src/components/Container.tsx           | runtime | important   | done    |
| packages/ui/src/components/index.ts                | runtime | important   | done    |
| packages/ui/src/components/Input.tsx               | runtime | important   | done    |
| packages/ui/src/components/Section.tsx             | runtime | important   | done    |
| packages/ui/src/components/Select.tsx              | runtime | important   | done    |
| packages/ui/src/components/Skeleton.tsx            | runtime | important   | done    |
| packages/ui/src/components/Textarea.tsx            | runtime | important   | done    |
| packages/ui/src/components/**tests**/index.test.ts | test    | optional    | done    |

## File Inventory - packages/utils

| Path                                       | Role    | Criticality | Status  |
| ------------------------------------------ | ------- | ----------- | ------- |
| packages/utils/eslint.config.mjs           | config  | important   | done    |
| packages/utils/package.json                | config  | important   | pending |
| packages/utils/tsconfig.json               | config  | important   | pending |
| packages/utils/src/index.ts                | runtime | important   | done    |
| packages/utils/src/**tests**/index.test.ts | test    | optional    | done    |
