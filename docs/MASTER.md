# Documentation Master Reference

Date: 2026-02-09

This document consolidates current documentation content from the /docs directory.
Open tasks, issues, and recommendations from the docs have been moved to TODO.md.

## Architecture Map

Status: INCOMPLETE. Populate as files are audited.

### High-Level Components

- App shell
  - Root layout renders global metadata, CSP nonce JSON-LD, and shared UI wrappers in [apps/web/app/layout.tsx](apps/web/app/layout.tsx).
- Home route
  - Homepage composes hero and marketing sections in [apps/web/app/page.tsx](apps/web/app/page.tsx).
- About route
  - About page highlights story, values, and CTAs in [apps/web/app/about/page.tsx](apps/web/app/about/page.tsx).
- Blog routes
  - Blog index and categories live in [apps/web/app/blog/page.tsx](apps/web/app/blog/page.tsx).
  - Blog post detail rendering lives in [apps/web/app/blog/[slug]/page.tsx](apps/web/app/blog/[slug]/page.tsx).
- Booking route
  - Booking request form UI in [apps/web/app/book/page.tsx](apps/web/app/book/page.tsx).
- Contact route
  - Contact form and salon info in [apps/web/app/contact/page.tsx](apps/web/app/contact/page.tsx).
- Gallery route
  - Portfolio gallery grid in [apps/web/app/gallery/page.tsx](apps/web/app/gallery/page.tsx).
- Pricing route
  - Service pricing and FAQs in [apps/web/app/pricing/page.tsx](apps/web/app/pricing/page.tsx).
- Privacy route
  - Privacy policy content in [apps/web/app/privacy/page.tsx](apps/web/app/privacy/page.tsx).
- Search route
  - Search experience in [apps/web/app/search/page.tsx](apps/web/app/search/page.tsx).
- Services routes
  - Services overview in [apps/web/app/services/page.tsx](apps/web/app/services/page.tsx).
  - Coloring detail in [apps/web/app/services/coloring/page.tsx](apps/web/app/services/coloring/page.tsx).
  - Haircuts detail in [apps/web/app/services/haircuts/page.tsx](apps/web/app/services/haircuts/page.tsx).
  - Special occasions detail in [apps/web/app/services/special-occasions/page.tsx](apps/web/app/services/special-occasions/page.tsx).
  - Treatments detail in [apps/web/app/services/treatments/page.tsx](apps/web/app/services/treatments/page.tsx).
- Team route
  - Team bios and CTA in [apps/web/app/team/page.tsx](apps/web/app/team/page.tsx).
- Terms route
  - Terms of Service content in [apps/web/app/terms/page.tsx](apps/web/app/terms/page.tsx).
- Client providers
  - Global error boundary and breadcrumbs live in [apps/web/app/providers.tsx](apps/web/app/providers.tsx).
- Error and loading UI
  - 404 experience in [apps/web/app/not-found.tsx](apps/web/app/not-found.tsx).
  - Suspense loading UI in [apps/web/app/loading.tsx](apps/web/app/loading.tsx).
- Metadata routes
  - robots.txt is generated in [apps/web/app/robots.ts](apps/web/app/robots.ts).
  - sitemap.xml is generated in [apps/web/app/sitemap.ts](apps/web/app/sitemap.ts).
- Open Graph route
  - Open Graph images are rendered in [apps/web/app/api/og/route.tsx](apps/web/app/api/og/route.tsx).
- Middleware and security
  - CSP nonce injection, security headers, and request context are managed in [apps/web/middleware.ts](apps/web/middleware.ts).
- Shared UI components
  - Global navigation, footer, and hero content are built from [apps/web/components/Navigation.tsx](apps/web/components/Navigation.tsx), [apps/web/components/Footer.tsx](apps/web/components/Footer.tsx), and [apps/web/components/Hero.tsx](apps/web/components/Hero.tsx).
  - Consent gating UI is handled in [apps/web/components/AnalyticsConsentBanner.tsx](apps/web/components/AnalyticsConsentBanner.tsx).
- Feature modules
  - Analytics consent and tracking live in [apps/web/features/analytics/lib/analytics-consent.ts](apps/web/features/analytics/lib/analytics-consent.ts) and [apps/web/features/analytics/lib/analytics.ts](apps/web/features/analytics/lib/analytics.ts).
  - Blog data and rendering helpers live in [apps/web/features/blog/lib/blog.ts](apps/web/features/blog/lib/blog.ts) and [apps/web/features/blog/components/BlogPostContent.tsx](apps/web/features/blog/components/BlogPostContent.tsx).
  - Contact form UI and schema live in [apps/web/features/contact/components/ContactForm.tsx](apps/web/features/contact/components/ContactForm.tsx) and [apps/web/features/contact/lib/contact-form-schema.ts](apps/web/features/contact/lib/contact-form-schema.ts).
  - HubSpot integration is built in [apps/web/features/hubspot/lib/hubspot-client.ts](apps/web/features/hubspot/lib/hubspot-client.ts).
  - Search UI is composed in [apps/web/features/search/components/SearchDialog.tsx](apps/web/features/search/components/SearchDialog.tsx) and [apps/web/features/search/components/SearchPage.tsx](apps/web/features/search/components/SearchPage.tsx).
  - Services layout components live in [apps/web/features/services/components/ServiceDetailLayout.tsx](apps/web/features/services/components/ServiceDetailLayout.tsx).
  - Supabase lead capture lives in [apps/web/features/supabase/lib/supabase-leads.ts](apps/web/features/supabase/lib/supabase-leads.ts).
- Shared server utilities
  - Env validation is handled in [apps/web/lib/env.ts](apps/web/lib/env.ts) and [apps/web/lib/env.public.ts](apps/web/lib/env.public.ts).
  - CSP helpers live in [apps/web/lib/csp.ts](apps/web/lib/csp.ts) with security headers in [apps/web/lib/security-headers.ts](apps/web/lib/security-headers.ts).
  - Server actions orchestrate submissions in [apps/web/lib/actions/submit.ts](apps/web/lib/actions/submit.ts).
  - Rate limiting helpers live in [apps/web/lib/rate-limit.ts](apps/web/lib/rate-limit.ts).

## Route Catalog

Status: INCOMPLETE. Populate as routes are audited.

### Routes

- Global layout
  - App shell and metadata: [apps/web/app/layout.tsx](apps/web/app/layout.tsx)
- /
  - Home page: [apps/web/app/page.tsx](apps/web/app/page.tsx)
- /about
  - About page: [apps/web/app/about/page.tsx](apps/web/app/about/page.tsx)
- Not found
  - 404 page: [apps/web/app/not-found.tsx](apps/web/app/not-found.tsx)
- Loading state
  - Global loading UI: [apps/web/app/loading.tsx](apps/web/app/loading.tsx)
- /robots.txt
  - Robots metadata: [apps/web/app/robots.ts](apps/web/app/robots.ts)
- /sitemap.xml
  - Sitemap metadata: [apps/web/app/sitemap.ts](apps/web/app/sitemap.ts)
- /api/og
  - Open Graph image generation: [apps/web/app/api/og/route.tsx](apps/web/app/api/og/route.tsx)
- /blog
  - Blog index: [apps/web/app/blog/page.tsx](apps/web/app/blog/page.tsx)
- /blog/[slug]
  - Blog post detail: [apps/web/app/blog/[slug]/page.tsx](apps/web/app/blog/[slug]/page.tsx)
- /book
  - Booking request: [apps/web/app/book/page.tsx](apps/web/app/book/page.tsx)
- /contact
  - Contact page: [apps/web/app/contact/page.tsx](apps/web/app/contact/page.tsx)
- /gallery
  - Gallery page: [apps/web/app/gallery/page.tsx](apps/web/app/gallery/page.tsx)
- /pricing
  - Pricing page: [apps/web/app/pricing/page.tsx](apps/web/app/pricing/page.tsx)
- /privacy
  - Privacy policy: [apps/web/app/privacy/page.tsx](apps/web/app/privacy/page.tsx)
- /search
  - Search page: [apps/web/app/search/page.tsx](apps/web/app/search/page.tsx)
- /services
  - Services overview: [apps/web/app/services/page.tsx](apps/web/app/services/page.tsx)
- /services/coloring
  - Coloring service detail: [apps/web/app/services/coloring/page.tsx](apps/web/app/services/coloring/page.tsx)
- /services/haircuts
  - Haircuts service detail: [apps/web/app/services/haircuts/page.tsx](apps/web/app/services/haircuts/page.tsx)
- /services/special-occasions
  - Special occasions detail: [apps/web/app/services/special-occasions/page.tsx](apps/web/app/services/special-occasions/page.tsx)
- /services/treatments
  - Treatments detail: [apps/web/app/services/treatments/page.tsx](apps/web/app/services/treatments/page.tsx)
- /team
  - Team page: [apps/web/app/team/page.tsx](apps/web/app/team/page.tsx)
- /terms
  - Terms of Service: [apps/web/app/terms/page.tsx](apps/web/app/terms/page.tsx)

## Baseline Snapshot

Date: 2026-02-09

### Versions and Enforcement

- Node
  - engines: >=20.0.0 in package.json
  - CI: actions/setup-node uses 20.x in .github/workflows/ci.yml
  - Docker: node:20-alpine in apps/web/Dockerfile
- pnpm
  - packageManager: pnpm@10.29.2 in package.json
  - CI: pnpm/action-setup uses 10.29.2 in .github/workflows/ci.yml
  - Config: .pnpmrc sets prefer-frozen-lockfile=true
- Turbo
  - devDependency: turbo 2.2.3 in package.json

### Workspace Graph

- Root workspaces: apps/_ and packages/_ in package.json
- pnpm-workspace.yaml matches apps/_ and packages/_

### Turbo Pipeline and Cache Behavior

From turbo.json:

- build: dependsOn ^build; outputs .next/** (excluding .next/cache), dist/**, build/\*\*
- dev: cache=false, persistent=true
- lint: dependsOn ^lint
- type-check: dependsOn ^type-check
- test: dependsOn ^build; outputs coverage/**; inputs src/**/\*.ts(x), **/**tests**/**, jest.config.js
- format and format:check: cache=false

### Next.js Entry Points and Runtime Mode

- App router: apps/web/app/\* (layout.tsx, page.tsx, route files)
- Middleware: apps/web/middleware.ts
- Metadata routes: apps/web/app/robots.ts, apps/web/app/sitemap.ts
- Runtime modes (by file intent, verify at runtime):
  - Server components: apps/web/app/layout.tsx, apps/web/app/page.tsx
  - Edge middleware: apps/web/middleware.ts (Next.js middleware)

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

1. Update the server action in apps/web/lib/actions to route leads.
2. Keep the same payload shape for contact form data to avoid UI changes.

### Customization Checklist

- Update organization details in apps/web/lib/constants.ts
- Replace logos and social links in apps/web/components/Navigation.tsx and apps/web/components/Footer.tsx
- Update images in apps/web/public
- Review sitemap entries in apps/web/app/sitemap.ts
- Review SEO metadata in apps/web/app/layout.tsx

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
- apps/web/app/layout.tsx
  - Role: Next.js root layout shell and metadata
- apps/web/app/page.tsx
  - Role: home page composition
- apps/web/app/providers.tsx
  - Role: client providers wrapper and error boundary
- apps/web/app/loading.tsx
  - Role: global loading UI for route segments
- apps/web/app/not-found.tsx
  - Role: custom 404 UI
- apps/web/app/robots.ts
  - Role: robots.txt metadata route
- apps/web/app/sitemap.ts
  - Role: sitemap.xml metadata route
- apps/web/app/api/og/route.tsx
  - Role: Open Graph image generation route
- apps/web/app/about/page.tsx
  - Role: about page story, values, and CTAs
- apps/web/app/blog/page.tsx
  - Role: blog index and category filters
- apps/web/app/blog/[slug]/page.tsx
  - Role: blog post detail view
- apps/web/app/book/page.tsx
  - Role: booking request page
- apps/web/app/contact/page.tsx
  - Role: contact form and salon info
- apps/web/app/gallery/page.tsx
  - Role: gallery grid and portfolio filters
- apps/web/app/pricing/page.tsx
  - Role: pricing menu and FAQs
- apps/web/app/privacy/page.tsx
  - Role: privacy policy
- apps/web/app/search/page.tsx
  - Role: site search experience
- apps/web/app/services/page.tsx
  - Role: services overview
- apps/web/app/services/coloring/page.tsx
  - Role: service detail - coloring
- apps/web/app/services/haircuts/page.tsx
  - Role: service detail - haircuts
- apps/web/app/services/special-occasions/page.tsx
  - Role: service detail - special occasions
- apps/web/app/services/treatments/page.tsx
  - Role: service detail - treatments
- apps/web/app/team/page.tsx
  - Role: team bios and CTA
- apps/web/app/terms/page.tsx
  - Role: terms of service
- apps/web/eslint.config.mjs
  - Role: app-specific ESLint configuration
- apps/web/middleware.ts
  - Role: CSP nonce injection, security headers, and request context
- apps/web/next.config.js
  - Role: Next.js config (images, headers, and build options)
- apps/web/postcss.config.js
  - Role: PostCSS plugins for Tailwind and autoprefixer
- apps/web/tailwind.config.js
  - Role: Tailwind design tokens and content globs
- apps/web/components/AnalyticsConsentBanner.tsx
  - Role: consent gating UI for analytics activation
- apps/web/components/Breadcrumbs.tsx
  - Role: navigation breadcrumbs for interior pages
- apps/web/components/ErrorBoundary.tsx
  - Role: client error boundary wrapper
- apps/web/components/FinalCTA.tsx
  - Role: final CTA marketing block
- apps/web/components/Footer.tsx
  - Role: site footer navigation and contact info
- apps/web/components/Hero.tsx
  - Role: homepage hero section
- apps/web/components/InstallPrompt.tsx
  - Role: PWA install prompt handler
- apps/web/components/Navigation.tsx
  - Role: global navigation bar
- apps/web/components/SkipToContent.tsx
  - Role: accessibility skip link
- apps/web/components/SocialProof.tsx
  - Role: testimonials and ratings block
- apps/web/components/ValueProps.tsx
  - Role: value proposition marketing grid
- apps/web/features/analytics/index.ts
  - Role: analytics feature exports
- apps/web/features/analytics/lib/analytics-consent.ts
  - Role: consent storage and evaluation helpers
- apps/web/features/analytics/lib/analytics.ts
  - Role: analytics initialization and tracking helpers
- apps/web/features/blog/index.ts
  - Role: blog feature exports
- apps/web/features/blog/components/BlogPostContent.tsx
  - Role: blog post content renderer
- apps/web/features/blog/lib/blog-images.ts
  - Role: blog image lookup helpers
- apps/web/features/blog/lib/blog.ts
  - Role: blog post data access helpers
- apps/web/features/contact/index.ts
  - Role: contact feature exports
- apps/web/features/contact/components/ContactForm.tsx
  - Role: contact form UI and validation wiring
- apps/web/features/contact/lib/contact-form-schema.ts
  - Role: contact form schema and validation rules
- apps/web/features/hubspot/index.ts
  - Role: hubspot integration exports
- apps/web/features/hubspot/lib/hubspot-client.ts
  - Role: HubSpot API client helper
- apps/web/features/search/index.ts
  - Role: search feature exports
- apps/web/features/search/components/SearchDialog.tsx
  - Role: site-wide search dialog UI
- apps/web/features/search/components/SearchPage.tsx
  - Role: search page results UI
- apps/web/features/services/index.ts
  - Role: services feature exports
- apps/web/features/services/components/ServiceDetailLayout.tsx
  - Role: service detail layout wrapper
- apps/web/features/services/components/ServicesOverview.tsx
  - Role: services overview content block
- apps/web/features/supabase/index.ts
  - Role: Supabase integration exports
- apps/web/features/supabase/lib/supabase-leads.ts
  - Role: Supabase lead capture helper
- apps/web/lib/actions.ts
  - Role: exported server actions
- apps/web/lib/constants.ts
  - Role: site constants and defaults
- apps/web/lib/csp.ts
  - Role: CSP nonce and security policy helpers
- apps/web/lib/env.public.ts
  - Role: public env schema and validation
- apps/web/lib/env.ts
  - Role: server env schema and validation
- apps/web/lib/logger.ts
  - Role: logging utilities with Sentry hooks
- apps/web/lib/rate-limit.ts
  - Role: Upstash rate limiting helpers
- apps/web/lib/request-context.server.ts
  - Role: per-request context storage (server)
- apps/web/lib/request-context.ts
  - Role: per-request context helpers
- apps/web/lib/request-validation.ts
  - Role: form validation and request shaping helpers
- apps/web/lib/sanitize.ts
  - Role: input sanitization helpers
- apps/web/lib/search.ts
  - Role: search index helpers
- apps/web/lib/security-headers.ts
  - Role: security header definitions
- apps/web/lib/sentry-client.ts
  - Role: Sentry browser initialization
- apps/web/lib/sentry-sanitize.ts
  - Role: Sentry data scrubbing helpers
- apps/web/lib/sentry-server.ts
  - Role: Sentry server initialization
- apps/web/lib/utils.ts
  - Role: utility helpers
- apps/web/lib/actions/helpers.ts
  - Role: server action helpers
- apps/web/lib/actions/hubspot.ts
  - Role: HubSpot submission action
- apps/web/lib/actions/submit.ts
  - Role: contact form submission orchestrator
- apps/web/lib/actions/supabase.ts
  - Role: Supabase submission action
- apps/web/lib/actions/types.ts
  - Role: shared action types
- apps/web/lib/**tests**/env-setup.ts
  - Role: test env setup
- apps/web/lib/**tests**/env.test.ts
  - Role: env validation tests
- apps/web/lib/**tests**/sanitize.test.ts
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

### apps/web

| Path                          | Role    | Criticality   | Status  |
| ----------------------------- | ------- | ------------- | ------- |
| apps/web/Dockerfile           | infra   | important     | pending |
| apps/web/eslint.config.mjs    | config  | important     | done    |
| apps/web/middleware.ts        | runtime | critical path | done    |
| apps/web/next-env.d.ts        | config  | optional      | pending |
| apps/web/next.config.js       | config  | important     | done    |
| apps/web/package.json         | config  | critical path | pending |
| apps/web/package.json.bak     | docs    | optional      | pending |
| apps/web/postcss.config.js    | config  | important     | done    |
| apps/web/tailwind.config.js   | config  | important     | done    |
| apps/web/tsconfig.json        | config  | important     | pending |
| apps/web/tsconfig.tsbuildinfo | asset   | optional      | pending |

#### apps/web/app

| Path                                             | Role    | Criticality   | Status  |
| ------------------------------------------------ | ------- | ------------- | ------- |
| apps/web/app/globals.css                         | asset   | important     | pending |
| apps/web/app/layout.tsx                          | runtime | critical path | done    |
| apps/web/app/loading.tsx                         | runtime | optional      | done    |
| apps/web/app/not-found.tsx                       | runtime | important     | done    |
| apps/web/app/page.tsx                            | runtime | critical path | done    |
| apps/web/app/providers.tsx                       | runtime | important     | done    |
| apps/web/app/robots.ts                           | runtime | important     | done    |
| apps/web/app/sitemap.ts                          | runtime | important     | done    |
| apps/web/app/about/page.tsx                      | runtime | important     | done    |
| apps/web/app/api/og/route.tsx                    | runtime | important     | done    |
| apps/web/app/blog/page.tsx                       | runtime | important     | done    |
| apps/web/app/blog/[slug]/page.tsx                | runtime | important     | done    |
| apps/web/app/book/page.tsx                       | runtime | important     | done    |
| apps/web/app/contact/page.tsx                    | runtime | important     | done    |
| apps/web/app/gallery/page.tsx                    | runtime | important     | done    |
| apps/web/app/pricing/page.tsx                    | runtime | important     | done    |
| apps/web/app/privacy/page.tsx                    | runtime | important     | done    |
| apps/web/app/search/page.tsx                     | runtime | important     | done    |
| apps/web/app/services/page.tsx                   | runtime | important     | done    |
| apps/web/app/services/coloring/page.tsx          | runtime | important     | done    |
| apps/web/app/services/haircuts/page.tsx          | runtime | important     | done    |
| apps/web/app/services/special-occasions/page.tsx | runtime | important     | done    |
| apps/web/app/services/treatments/page.tsx        | runtime | important     | done    |
| apps/web/app/team/page.tsx                       | runtime | important     | done    |
| apps/web/app/terms/page.tsx                      | runtime | important     | done    |

#### apps/web/components

| Path                                           | Role    | Criticality   | Status |
| ---------------------------------------------- | ------- | ------------- | ------ |
| apps/web/components/AnalyticsConsentBanner.tsx | runtime | critical path | done   |
| apps/web/components/Breadcrumbs.tsx            | runtime | important     | done   |
| apps/web/components/ErrorBoundary.tsx          | runtime | important     | done   |
| apps/web/components/FinalCTA.tsx               | runtime | optional      | done   |
| apps/web/components/Footer.tsx                 | runtime | important     | done   |
| apps/web/components/Hero.tsx                   | runtime | important     | done   |
| apps/web/components/InstallPrompt.tsx          | runtime | optional      | done   |
| apps/web/components/Navigation.tsx             | runtime | important     | done   |
| apps/web/components/SkipToContent.tsx          | runtime | important     | done   |
| apps/web/components/SocialProof.tsx            | runtime | optional      | done   |
| apps/web/components/ValueProps.tsx             | runtime | important     | done   |

#### apps/web/features

| Path                                                          | Role    | Criticality   | Status |
| ------------------------------------------------------------- | ------- | ------------- | ------ |
| apps/web/features/analytics/index.ts                          | runtime | important     | done   |
| apps/web/features/analytics/lib/analytics-consent.ts          | runtime | critical path | done   |
| apps/web/features/analytics/lib/analytics.ts                  | runtime | critical path | done   |
| apps/web/features/blog/index.ts                               | runtime | important     | done   |
| apps/web/features/blog/components/BlogPostContent.tsx         | runtime | important     | done   |
| apps/web/features/blog/lib/blog-images.ts                     | runtime | important     | done   |
| apps/web/features/blog/lib/blog.ts                            | runtime | important     | done   |
| apps/web/features/contact/index.ts                            | runtime | important     | done   |
| apps/web/features/contact/components/ContactForm.tsx          | runtime | important     | done   |
| apps/web/features/contact/lib/contact-form-schema.ts          | runtime | important     | done   |
| apps/web/features/hubspot/index.ts                            | runtime | important     | done   |
| apps/web/features/hubspot/lib/hubspot-client.ts               | runtime | important     | done   |
| apps/web/features/search/index.ts                             | runtime | important     | done   |
| apps/web/features/search/components/SearchDialog.tsx          | runtime | important     | done   |
| apps/web/features/search/components/SearchPage.tsx            | runtime | important     | done   |
| apps/web/features/services/index.ts                           | runtime | important     | done   |
| apps/web/features/services/components/ServiceDetailLayout.tsx | runtime | important     | done   |
| apps/web/features/services/components/ServicesOverview.tsx    | runtime | important     | done   |
| apps/web/features/supabase/index.ts                           | runtime | important     | done   |
| apps/web/features/supabase/lib/supabase-leads.ts              | runtime | important     | done   |

#### apps/web/lib

| Path                                    | Role    | Criticality   | Status |
| --------------------------------------- | ------- | ------------- | ------ |
| apps/web/lib/actions.ts                 | runtime | important     | done   |
| apps/web/lib/constants.ts               | runtime | important     | done   |
| apps/web/lib/csp.ts                     | runtime | critical path | done   |
| apps/web/lib/env.public.ts              | runtime | critical path | done   |
| apps/web/lib/env.ts                     | runtime | critical path | done   |
| apps/web/lib/logger.ts                  | runtime | important     | done   |
| apps/web/lib/rate-limit.ts              | runtime | important     | done   |
| apps/web/lib/request-context.server.ts  | runtime | important     | done   |
| apps/web/lib/request-context.ts         | runtime | important     | done   |
| apps/web/lib/request-validation.ts      | runtime | important     | done   |
| apps/web/lib/sanitize.ts                | runtime | important     | done   |
| apps/web/lib/search.ts                  | runtime | important     | done   |
| apps/web/lib/security-headers.ts        | runtime | important     | done   |
| apps/web/lib/sentry-client.ts           | runtime | important     | done   |
| apps/web/lib/sentry-sanitize.ts         | runtime | important     | done   |
| apps/web/lib/sentry-server.ts           | runtime | important     | done   |
| apps/web/lib/utils.ts                   | runtime | important     | done   |
| apps/web/lib/actions/helpers.ts         | runtime | important     | done   |
| apps/web/lib/actions/hubspot.ts         | runtime | important     | done   |
| apps/web/lib/actions/submit.ts          | runtime | important     | done   |
| apps/web/lib/actions/supabase.ts        | runtime | important     | done   |
| apps/web/lib/actions/types.ts           | runtime | important     | done   |
| apps/web/lib/**tests**/env-setup.ts     | test    | optional      | done   |
| apps/web/lib/**tests**/env.test.ts      | test    | important     | done   |
| apps/web/lib/**tests**/sanitize.test.ts | test    | important     | done   |

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
