# Codebase Analysis

> **Generated:** 2026-02-13 — derived from direct inspection of every directory, file, config, and source module. Not based on prior documentation.

---

## 1. Repository Identity

| Field                      | Value                                                                                                                       |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Root package name**      | `marketing-website-templates`                                                                                               |
| **Version**                | 1.0.0                                                                                                                       |
| **Description**            | Multi-industry marketing website template system — monorepo for creating and managing client websites across all industries |
| **Package manager**        | pnpm 10.29.2                                                                                                                |
| **Node engine**            | ≥ 24.0.0                                                                                                                    |
| **Monorepo orchestration** | Turborepo 2.2.3                                                                                                             |
| **Language**               | TypeScript 5.7.2                                                                                                            |
| **Private**                | Yes — not published to npm                                                                                                  |

---

## 2. Monorepo Structure

```
/                           ← root: workspace config, CI, testing
├── packages/
│   ├── config/             ← shared configs (Tailwind preset, ESLint, TypeScript)
│   │   ├── tailwind-preset.js
│   │   ├── eslint-config/  ← @repo/eslint-config
│   │   └── typescript-config/ ← @repo/typescript-config
│   ├── ui/                 ← @repo/ui — shared React component library
│   └── utils/              ← @repo/utils — shared utilities (cn)
├── templates/
│   ├── shared/             ← @repo/shared — shared TypeScript types (SiteConfig)
│   ├── hair-salon/         ← @templates/hair-salon — fully built Next.js 15 template
│   └── plumber/            ← @templates/plumber — structural clone of hair-salon (partially differentiated)
├── clients/                ← empty directory with README (no client sites yet)
└── docs/                   ← documentation (much of it aspirational/outdated)
```

### Workspace packages (pnpm-workspace.yaml)

```yaml
packages:
  - 'packages/*'
  - 'packages/config/*'
  - 'templates/*'
  - 'clients/*'
```

---

## 3. Root Configuration

### Turbo Tasks

| Task                      | Depends On    | Outputs                           | Caching         |
| ------------------------- | ------------- | --------------------------------- | --------------- |
| `build`                   | `^build`      | `.next/**`, `dist/**`, `build/**` | ✅              |
| `dev`                     | —             | —                                 | ❌ (persistent) |
| `lint`                    | `^lint`       | —                                 | ✅              |
| `type-check`              | `^type-check` | —                                 | ✅              |
| `test`                    | `^build`      | `coverage/**`                     | ✅              |
| `format` / `format:check` | —             | —                                 | ❌              |

### TypeScript

- **tsconfig.base.json**: Strict ES2022, bundler module resolution, `jsx: preserve`, all strict flags enabled (`noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`, etc.)
- **tsconfig.json**: Extends base, adds `composite: true`, excludes `node_modules`, `dist`, `.next`, test files.

### Jest (root)

- Environment: `node`
- Transform: `ts-jest`
- Module aliases: `@repo/ui`, `@repo/utils`, `@repo/shared/*`, `@/*` → `templates/hair-salon/*`
- Coverage collected from: `templates/hair-salon/{lib,components,features}/**`, `packages/ui/src/**`, `packages/utils/src/**`
- Setup: `jest.setup.js` (loads `@testing-library/jest-dom`, suppresses console noise)
- Helpers: `jest.helpers.ts` (exports `createTestEnv`, `mockEnv`, `waitFor`, `assertThrows`)

### Docker

- `docker-compose.yml`: Single `web` service building `templates/hair-salon/Dockerfile`, port 3100, dev mode.

### Renovate

- Configured for automated dependency updates with auto-merge for patches, approval for minor, manual review for major.

---

## 4. Packages

### 4.1 `@repo/utils` — Shared Utilities

| File           | Export                                | Purpose                                                     |
| -------------- | ------------------------------------- | ----------------------------------------------------------- |
| `src/cn.ts`    | `cn(...inputs: ClassValue[]): string` | Merges Tailwind CSS classes using `clsx` + `tailwind-merge` |
| `src/index.ts` | Re-exports `cn`                       | Barrel                                                      |

**Dependencies:** `clsx` 2.1.1, `tailwind-merge` 2.6.1

### 4.2 `@repo/ui` — Shared Component Library

8 React components, all themeable via CSS custom properties:

| Component   | Type       | Props Exported                    |
| ----------- | ---------- | --------------------------------- |
| `Container` | Layout     | `ContainerProps`                  |
| `Section`   | Layout     | `SectionProps`                    |
| `Button`    | Primitive  | `ButtonProps`                     |
| `Card`      | Primitive  | `CardProps`                       |
| `Input`     | Form       | `InputProps`                      |
| `Select`    | Form       | `SelectProps`, `SelectOption`     |
| `Textarea`  | Form       | `TextareaProps`                   |
| `Accordion` | Disclosure | `AccordionProps`, `AccordionItem` |

**Dependencies:** `@repo/utils` (workspace), React 19 (peer)

### 4.3 `@repo/config` — Shared Configs

#### Tailwind Preset (`tailwind-preset.js`)

Maps semantic utility classes (`bg-primary`, `text-foreground`, etc.) to CSS custom properties. Each site defines its palette in `globals.css`; components remain unchanged.

**Tokens:** background, foreground, primary, secondary, muted, accent, card, destructive, border, input, ring + `borderRadius` + `fontFamily` (heading, body).

#### ESLint Config (`@repo/eslint-config`)

- `"."` → Base JS config (ES2022, `no-console: off`)
- `"./next"` → Next.js config (core-web-vitals + typescript rules)

#### TypeScript Config (`@repo/typescript-config`)

- `base.json` — Strict ES2022 + DOM, bundler resolution
- `react.json` — Extends base, adds `jsx: preserve`
- `node.json` — Extends base, switches to `NodeNext` resolution

### 4.4 `@repo/shared` — Shared Types

**Actual contents (2 source files):**

| File                   | Exports                                                                                                                                                                                                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `types/site-config.ts` | `SiteConfig`, `ConversionFlowType`, `BookingFlowConfig`, `ContactFlowConfig`, `QuoteFlowConfig`, `DispatchFlowConfig`, `ConversionFlowConfig`, `NavLink`, `SocialLink`, `FooterColumn`, `FooterConfig`, `BusinessHours`, `ContactInfo`, `SeoDefaults`, `ThemeColors` |
| `types/index.ts`       | Re-exports all from `site-config.ts`                                                                                                                                                                                                                                 |

**No runtime code.** The README describes an aspirational structure (shared components, features, hooks, lib, styles) — those directories **do not exist**. Only type definitions are shared today.

---

## 5. Templates

### 5.1 `@templates/hair-salon` — Hair Salon Website (FULLY BUILT)

**Framework:** Next.js 15.2.9 (App Router) + React 19 + Tailwind 3.4.17

**Port:** 3100

#### Key Dependencies

| Category     | Packages                                                                                                              |
| ------------ | --------------------------------------------------------------------------------------------------------------------- |
| Forms        | `react-hook-form` 7.55.0, `@hookform/resolvers` 3.9.1, `zod` 3.22.4                                                   |
| Blog/MDX     | `next-mdx-remote` 5.0.0, `gray-matter` 4.0.3, `reading-time` 1.5.0, `rehype-pretty-code`, `rehype-slug`, `remark-gfm` |
| UI           | `lucide-react` 0.344.0, `sonner` ^2.0.7                                                                               |
| Security/Ops | `@sentry/nextjs` 8.0.0, `@upstash/ratelimit` 2.0.5, `@upstash/redis` 1.34.3                                           |
| Dates        | `date-fns` ^4.1.0                                                                                                     |
| Workspace    | `@repo/ui`, `@repo/utils`, `@repo/shared`                                                                             |

#### Site Configuration

| Property        | Value                                                                 |
| --------------- | --------------------------------------------------------------------- |
| ID              | `hair-salon`                                                          |
| Name            | `Hair Salon Template`                                                 |
| Tagline         | `Professional hair care that makes you shine.`                        |
| Theme           | Teal primary (`174 85% 33%`), dark charcoal secondary (`220 20% 14%`) |
| Schema Type     | `HairSalon`                                                           |
| Conversion Flow | `booking` — 5 service categories, 3 time slots, 90-day advance        |
| Nav Links       | Services, Pricing, Gallery, Team, About, Blog                         |
| Fonts           | Inter + IBM Plex Sans                                                 |

#### Routes (17 pages + 1 API + 2 SEO)

| Route                         | Description                                                            |
| ----------------------------- | ---------------------------------------------------------------------- |
| `/`                           | Landing: Hero → ValueProps → ServicesOverview → SocialProof → FinalCTA |
| `/about`                      | Company story, values, stats                                           |
| `/services`                   | Service category cards                                                 |
| `/services/haircuts`          | Haircuts detail page                                                   |
| `/services/coloring`          | Coloring detail page                                                   |
| `/services/treatments`        | Treatments detail page                                                 |
| `/services/special-occasions` | Special occasions detail page                                          |
| `/pricing`                    | Pricing packages/tiers                                                 |
| `/gallery`                    | Photo portfolio                                                        |
| `/team`                       | Staff bios                                                             |
| `/blog`                       | Blog listing with category filter                                      |
| `/blog/[slug]`                | Individual MDX blog post                                               |
| `/book`                       | Booking form + sidebar info                                            |
| `/contact`                    | Contact form                                                           |
| `/search`                     | Full-text search results                                               |
| `/privacy`                    | Privacy policy                                                         |
| `/terms`                      | Terms of service                                                       |
| `/api/og`                     | Edge OG image generator                                                |
| `/sitemap.xml`                | Dynamic sitemap                                                        |
| `/robots.txt`                 | Robots directives                                                      |

#### Components (11 files in `components/`)

| Component                    | Type   | Purpose                                                     |
| ---------------------------- | ------ | ----------------------------------------------------------- |
| `Hero.tsx`                   | Server | Landing hero with headline + CTA buttons                    |
| `Navigation.tsx`             | Client | Sticky nav, mobile hamburger, search dialog, "Book Now" CTA |
| `Footer.tsx`                 | Server | Multi-column footer from config                             |
| `ValueProps.tsx`             | Server | 3 value propositions                                        |
| `SocialProof.tsx`            | Server | Testimonials + metrics (memoized)                           |
| `FinalCTA.tsx`               | Server | Bottom conversion section (memoized)                        |
| `Breadcrumbs.tsx`            | Client | Auto-generated breadcrumbs + JSON-LD                        |
| `ErrorBoundary.tsx`          | Client | Error boundary with Sentry + recovery                       |
| `SkipToContent.tsx`          | Server | Accessibility skip link                                     |
| `AnalyticsConsentBanner.tsx` | Client | GDPR consent, conditional GA4 loading                       |
| `InstallPrompt.tsx`          | Client | PWA install prompt                                          |

#### Feature Modules (6 domains in `features/`)

**Booking** (`features/booking/`)

- `BookingForm.tsx` — Multi-field form with react-hook-form + Zod, honeypot bot detection, toast notifications
- `booking-schema.ts` — Zod schema (phone regex, service enum, date validation 1–90 days ahead)
- `booking-actions.ts` — Server action: validate → rate-limit → store (in-memory demo) → confirmation number
- `booking-providers.ts` — Extensible external booking provider system

**Blog** (`features/blog/`)

- `blog.ts` — MDX file reader with gray-matter + Zod frontmatter validation + reading time, cached with `React.cache()`
- `blog-images.ts` — Blog image utilities
- `BlogPostContent.tsx` — MDX renderer
- `__tests__/blog.test.ts` — Unit tests

**Contact** (`features/contact/`)

- `ContactForm.tsx` — Full contact form with Sentry tracing, analytics tracking, honeypot
- `contact-form-schema.ts` — Zod schema

**Search** (`features/search/`)

- `SearchDialog.tsx` — Modal dialog (`Cmd/Ctrl+K`), client-side substring search
- `SearchPage.tsx` — Full-page search at `/search`

**Analytics** (`features/analytics/`)

- `analytics.ts` — Consent-aware event tracking (GA4 + Plausible)
- `analytics-consent.ts` — Consent state via localStorage

**Integrations** (`features/hubspot/` + `features/supabase/`)

- HubSpot CRM sync (contact search, upsert with idempotency)
- Supabase lead storage (insert/update via REST API)

**Services** (`features/services/`)

- `ServicesOverview.tsx` — Service category card grid
- `ServiceDetailLayout.tsx` — Shared layout for service detail pages

#### Lib Utilities (26 files in `lib/`)

| Category          | Files                                                                                                                        | Purpose                                                                                        |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Actions**       | `actions.ts`, `actions/submit.ts`, `actions/helpers.ts`, `actions/supabase.ts`, `actions/hubspot.ts`, `actions/types.ts`     | Server action pipeline: validate → rate-limit → sanitize → Supabase insert → HubSpot sync      |
| **Security**      | `csp.ts`, `security-headers.ts`, `sanitize.ts`, `rate-limit.ts`, `request-validation.ts`                                     | CSP nonce + policy, HTTP headers, HTML escaping, Upstash/in-memory rate limiter, IP validation |
| **Environment**   | `env.ts`, `env.public.ts`                                                                                                    | Server + public env validation with Zod                                                        |
| **Observability** | `logger.ts`, `sentry-client.ts`, `sentry-server.ts`, `sentry-sanitize.ts`, `request-context.ts`, `request-context.server.ts` | Structured JSON logging, Sentry integration, PII redaction, request ID correlation             |
| **Utilities**     | `utils.ts`, `search.ts`, `constants.ts`                                                                                      | `cn()`, search index builder, app constants                                                    |
| **Tests**         | `__tests__/sanitize.test.ts`, `__tests__/search.test.ts`, `__tests__/env.test.ts`                                            | Unit tests                                                                                     |

#### Content

5 MDX blog posts in `content/blog/`:

- `hair-color-maintenance-guide.mdx`
- `latest-hairstyle-trends-2024.mdx`
- `mens-grooming-evolution.mdx`
- `summer-hair-care-tips.mdx`
- `wedding-hairstyle-inspiration.mdx`

#### Public Assets

The `public/` directory is **empty**. The layout references `/manifest.json`, `/apple-touch-icon.png`, `/icon-192.png`, `/icon-512.png`, `/logo.png`, `/images/hero-salon.svg` — these are expected per-deployment.

#### Middleware

Runs on every non-static request:

1. Generates a CSP nonce (16 random bytes, base64)
2. Sets `Content-Security-Policy` header (script-src with nonce, `unsafe-eval` in dev)
3. Applies security headers (X-Frame-Options DENY, HSTS in prod, Permissions-Policy)
4. Passes nonce to layout via `x-csp-nonce` request header

---

### 5.2 `@templates/plumber` — Plumber Website (STRUCTURAL CLONE)

**Identical to hair-salon in:**

- All 22 dependencies and their versions
- All 25 route files and paths
- All 11 component files
- All 8 feature modules and their files
- All 26 lib utility files
- `next.config.js`, `tsconfig.json`, `middleware.ts`

**Differentiated in:**

- `site.config.ts` — different id (`plumber`), name, tagline, theme (blue `210 80% 45%`), conversion flow (`quote` vs `booking`), nav links (no Gallery), service categories (residential-repair, commercial-service, emergency-response, maintenance-plan), contact info, business hours
- `globals.css` — different CSS variable values (blue color palette)

**NOT differentiated (still contains hair-salon content):**

- `/about` page — still says "haircut"
- `/services/*` pages — still list haircuts, coloring, treatments, special occasions
- `/pricing` page — still shows hair salon pricing
- `/team` page — still shows stylists, not plumbers
- `/gallery` page — still references hair photos
- `/book` page — still uses hair salon booking copy
- All 5 blog posts — all hair-care topics
- SEO metadata — layout keywords still say "hair salon"

> **The plumber template is a structural fork.** Config and theming are customized; page content and data are not. It needs significant content differentiation to represent a plumber business.

---

## 6. Dependency Graph

```
@repo/config (tailwind-preset, eslint-config, typescript-config)
    ↓ consumed by all templates via config files

@repo/utils (cn)
    ↑ depends on: clsx, tailwind-merge
    ↓ consumed by @repo/ui

@repo/ui (8 React components)
    ↑ depends on: @repo/utils, react (peer)
    ↓ consumed by templates

@repo/shared (SiteConfig types)
    ↓ consumed by templates via site.config.ts

@templates/hair-salon
    ↑ depends on: @repo/ui, @repo/utils, @repo/shared, next, react, zod, etc.

@templates/plumber
    ↑ depends on: @repo/ui, @repo/utils, @repo/shared, next, react, zod, etc.
    ↑ structurally cloned from hair-salon
```

---

## 7. Architecture Patterns

| Pattern                   | Implementation                                                                                                                                         |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Feature-sliced design** | Each domain (booking, blog, contact, analytics, search, integrations) is self-contained under `features/` with its own components, lib, barrel exports |
| **Server Actions**        | Form submissions use Next.js `'use server'` actions: validate → rate-limit → sanitize → store → CRM sync                                               |
| **Config-driven UI**      | Navigation, footer, SEO, theme all driven by `site.config.ts` — rebranding requires editing one file                                                   |
| **CSS variable theming**  | Colors as CSS custom properties in `globals.css`, consumed via Tailwind preset tokens                                                                  |
| **Dynamic imports**       | Below-fold homepage sections (`SocialProof`, `FinalCTA`) lazy-loaded via `next/dynamic`                                                                |
| **SEO**                   | JSON-LD (Organization + WebSite + SearchAction), OpenGraph, Twitter cards, dynamic sitemap, robots.txt                                                 |
| **Security**              | CSP with nonces, HSTS, sanitization, honeypot fields, rate limiting, IP hashing (SHA-256), PII redaction                                               |
| **Observability**         | Sentry error tracking with spans/tracing, structured JSON logging, request ID correlation                                                              |
| **PWA-ready**             | Manifest link, install prompt, mobile app meta tags                                                                                                    |

---

## 8. Test Coverage

8 test files across the monorepo:

| File                                                        | Scope                              |
| ----------------------------------------------------------- | ---------------------------------- |
| `templates/hair-salon/lib/__tests__/sanitize.test.ts`       | HTML escaping + input sanitization |
| `templates/hair-salon/lib/__tests__/search.test.ts`         | Search index construction          |
| `templates/hair-salon/lib/__tests__/env.test.ts`            | Environment variable validation    |
| `templates/hair-salon/features/blog/__tests__/blog.test.ts` | Blog post reading/parsing          |
| `templates/plumber/lib/__tests__/sanitize.test.ts`          | (duplicate of hair-salon)          |
| `templates/plumber/lib/__tests__/search.test.ts`            | (duplicate of hair-salon)          |
| `templates/plumber/lib/__tests__/env.test.ts`               | (duplicate of hair-salon)          |
| `templates/plumber/features/blog/__tests__/blog.test.ts`    | (duplicate of hair-salon)          |

No tests exist for: `@repo/ui` components, `@repo/utils`, booking actions, contact form, HubSpot/Supabase integrations.

---

## 9. Current State & Issues

### What exists and works

- Fully structured pnpm + Turborepo monorepo with proper workspace resolution
- Complete hair-salon template with 17 pages, 11 components, 6 feature modules, 26 lib files
- Shared package ecosystem (`@repo/ui`, `@repo/utils`, `@repo/config`, `@repo/shared`)
- Comprehensive security stack (CSP, rate limiting, sanitization, Sentry)
- Blog system with MDX, frontmatter validation, reading time
- Booking and contact forms with Zod validation and server actions
- Integration stubs for Supabase and HubSpot

### Issues found

1. **Plumber template is not differentiated** — all page content, service data, pricing, team bios, gallery, and blog posts are still hair-salon content
2. **`public/` directories are empty** — both templates reference assets that don't exist (manifest.json, icons, images)
3. **`clients/` is empty** — only contains a README
4. **`@repo/shared` is minimal** — only type definitions exist despite README describing shared components, features, hooks, lib, and styles
5. **No `@repo/ui` tests** — the shared component library has zero test coverage
6. **Plumber test files are duplicates** — identical to hair-salon tests, not tailored to plumber context
7. **Both templates run on port 3100** — cannot run simultaneously without conflict
8. **Documentation is largely aspirational** — many docs describe planned features, not current state
9. **Jest `moduleNameMapper` only aliases `@/*` to hair-salon** — plumber tests using `@/*` imports would resolve to hair-salon paths
10. **Docker only builds hair-salon** — no plumber Dockerfile is wired into docker-compose
