# Architecture

> **Principle:** Share infrastructure, not design.
> Each phase builds on the previous. Do not skip ahead.
>
> **Last updated:** 2026-02-13
>
> **Reference:** See [MARKETING_REPO_ANALYSIS_AND_CATALOG.md](./MARKETING_REPO_ANALYSIS_AND_CATALOG.md) for exhaustive feature catalog and research synthesis.

---

## Guiding Principle

```
                SHARE THIS                           DON'T SHARE THIS
          ┌─────────────────────┐              ┌─────────────────────┐
          │  Primitives (UI)    │              │  Marketing Sections │
          │  Infrastructure     │              │  Page Layouts       │
          │  Feature Logic      │              │  Visual Design      │
          │  Integrations       │              │  Content Structure  │
          │  Security           │              │  "The Look"         │
          └─────────────────────┘              └─────────────────────┘
```

Marketing sections (Hero, Footer, CTA) are **per-app**. Every site should look different. Shared primitives provide building blocks; the design composition is bespoke.

---

## Current State

| Area                                                                                            | Status                                                 |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Monorepo (pnpm 10 + Turborepo 2.2)                                                              | ✅ Working                                             |
| `SiteConfig` type system (discriminated union, 4 flow types)                                    | ✅ Working                                             |
| `@repo/ui` (8 components: Button, Card, Container, Section, Input, Select, Textarea, Accordion) | ✅ Working — needs expansion                           |
| Tailwind preset with CSS variable tokens                                                        | ✅ Working                                             |
| Security infra (CSP, rate-limit, sanitize)                                                      | ✅ Working — duplicated in each template               |
| Lead capture (Supabase + HubSpot)                                                               | ✅ Working — duplicated in each template               |
| Env validation (Zod, 16 vars)                                                                   | ✅ Working — duplicated in each template               |
| Feature modules (booking, blog, contact, search, analytics)                                     | ✅ Working — duplicated in each template               |
| `@repo/shared`                                                                                  | Types only — no runtime code, no shared components     |
| `clients/`                                                                                      | Empty                                                  |
| Plumber template content                                                                        | ⚠️ Structural clone — page content is still hair-salon |

**Core problem:** Templates are full copies. Every bug fix must be applied N times. No feature code is actually shared.

---

## Research Foundation (2026-02-13)

Based on current best practices for multi-site repositories, marketing websites, and non-marketing multi-tenant systems:

### Multi-Site Repository Patterns

**Monorepo vs Polyrepo:** For a marketing multi-site repo launching many client sites from shared templates, **monorepo is appropriate** — shared UI, features, integrations, and config benefit from unified versioning and CI/CD. Key principles:
- **Single version policy** for shared dependencies (React, Next.js) to avoid conflicts
- **Packages depend only downward** — packages never import from apps
- **Per-app environment** — `.env.local` per app; no global env for secrets
- **Workspace boundaries** — lint rules prevent apps importing from each other

**Deployment Model:** **One deployment per app** (e.g., one Vercel project per site) = full isolation (builds, env vars, domains, rollback). This aligns with our "every site unique and novel" goal — no shared failure domains, independent deploys, bespoke design per client.

**Design System Flexibility:** Shared components = primitives + compositions, **not** full "marketing sections." Sections (Hero, CTA, Footer) are per-app so each site can be unique. Variants via props/slots/theming in shared components; avoid hard-coded "site type" branches in shared code.

**Config-Driven Architecture:** `site.config.ts` (or `createSiteConfig(preset, overrides)`) drives nav, footer, SEO, theme, conversion flow. Rebrand = edit config + CSS vars + content. This enables maximum flexibility while sharing infrastructure.

**Multi-Tenant Considerations:** For bespoke marketing sites, **separate Next.js apps per client** is correct. Multi-tenant single-deploy patterns (domain-based routing, shared DB) are only worth evaluating if demand emerges for a self-serve tier with 20+ similar clients. Document trade-offs; defer unless needed.

### Feature Catalog Integration

The exhaustive feature catalog (see `MARKETING_REPO_ANALYSIS_AND_CATALOG.md`) covers **500+ patterns** across 30+ categories:
- **Page types:** 40+ (home, about variants, services, pricing, gallery, team, blog, contact, booking, locations, FAQ, careers, resources, events, menu, listings, products, classes, insurance, practice areas, case results, testimonials, before/after, service area, legal pages, 404, thank you)
- **Hero/header:** 30+ variants (full-width image/video, split, centered, slider, parallax, animated, gradient, minimal, bent/curved, diagonal, floating, stats, form, search, video modal, multi-CTA, scroll indicator, sticky mini, full-viewport, dark/light, transparent nav)
- **Navigation:** 25+ patterns (horizontal, mega menu, sticky, transparent→solid, hide/show on scroll, sidebar, hamburger variants, bottom nav, search, phone/CTA, language/location switcher, utility nav, two-row, icons, announcement bar, floating CTA)
- **CTAs:** 25+ patterns (primary/secondary, text link, inline, floating, banner, section, card, modal, exit-intent, scroll-triggered, form, phone/SMS/email, chat, calendar, download, video, urgency, countdown, multi-step, comparison, social proof)
- **And 25+ more categories** covering every aspect of marketing sites

**How the catalog informs architecture:**
- **Page types:** Support via routes and content per app; shared packages don't dictate which pages exist. Industry presets suggest default routes (e.g., restaurant: menu, reservations).
- **Hero/Nav/Footer/CTA:** Remain per-app. Catalog is a checklist for *what* each site can implement differently; primitives from `@repo/ui` support building any variant.
- **Features:** Contact, booking, blog, search, gallery, team, reviews live in `packages/features/*`. Each feature package should be **configurable and composable** (e.g., booking: different providers, steps, fields) so many catalog patterns are achievable without new packages.
- **Industry-specific:** Presets define default features, nav, conversion flow, and schema type; per-industry content and sections stay in each app.
- **Integrations:** Catalog aligns with `packages/integrations/*`: analytics, CRM, booking providers, CMS (later). New integrations added as needed.
- **SEO, legal, a11y:** Handled in `@repo/infra` and shared features. Apps use shared infra and add page-level content (privacy, terms, accessibility statement).
- **Conversion, personalization, emerging:** Largely app-level or future (Phase 7). Shared pieces enable patterns without duplicating core logic.

---

## Target Architecture

```text
marketing-repo/
├── apps/                                 # Deployed sites (renamed from templates/)
│   ├── template-hair-salon/              # Reference template
│   ├── template-plumber/                 # Reference template
│   ├── template-restaurant/              # Future template
│   ├── template-medical/                 # Future template
│   ├── template-legal/                   # Future template
│   ├── template-home-services/           # Future template
│   ├── template-fitness/                 # Future template
│   ├── template-real-estate/             # Future template
│   └── client-<name>/                    # Client sites (extend templates)
│
├── packages/
│   ├── ui/                               # Primitives + Compositions + Feedback + Layout + Hooks
│   ├── infra/                            # Security, middleware, env, logger, sentry, SEO
│   ├── features/
│   │   ├── booking/                      # BookingForm + schema + actions + providers
│   │   ├── contact/                      # ContactForm + schema + actions
│   │   ├── blog/                         # MDX loader + rendering + images
│   │   ├── search/                       # Search index + overlay + page
│   │   ├── gallery/                      # Gallery layouts
│   │   ├── team/                         # Team display components
│   │   └── reviews/                      # Review aggregation + display + JSON-LD
│   ├── integrations/
│   │   ├── supabase/                     # Lead storage
│   │   ├── hubspot/                      # CRM sync
│   │   ├── booking-providers/            # Mindbody, Vagaro, Square, Cal.com
│   │   └── analytics/                    # GA4, Plausible, Vercel Analytics, consent
│   ├── config/
│   │   ├── eslint-config/
│   │   ├── tailwind-preset/
│   │   ├── typescript-config/
│   │   ├── industry-presets/             # Per-industry SiteConfig defaults
│   │   └── theme-generator/             # CSS var + OKLCH palette generation
│   └── shared/
│       ├── types/                        # SiteConfig, FeatureConfig, etc.
│       ├── constants/
│       └── utils/
│
├── docs/
└── ...config files
```

### What Each App Contains (Post-Extraction)

```text
apps/<site>/
├── site.config.ts          ← createSiteConfig(preset, overrides)
├── app/                    ← routes + pages only
├── components/             ← 100% custom visual sections (Hero, Footer, Nav)
├── content/                ← MDX content
├── public/                 ← site-specific assets
├── globals.css             ← theme CSS variables
├── middleware.ts            ← thin wrapper: createMiddleware(options)
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

No `lib/` or `features/` directories in apps — all shared logic lives in packages.

### How Client Sites Work

```tsx
// apps/client-joes-pizza/components/sections/JoesHero.tsx
import { Button, Container } from '@repo/ui';
import { BookingWidget } from '@repo/features/booking';

// 100% custom design — NOT a variant of a shared Hero
export function JoesHero() {
  return (
    <section className="relative min-h-[80vh] bg-[url('/joes-kitchen.jpg')]">
      <Container>
        <h1 className="font-italiana text-6xl text-white">Authentic Italian Since 1987</h1>
        <Button size="lg" variant="primary">
          Order Online
        </Button>
        <BookingWidget compact />
      </Container>
    </section>
  );
}
```

Shared primitives + shared feature logic, bespoke visual design.

---

## Evolution Plan (7 Phases)

> Full task breakdown with checkboxes is in [TODO.md](TODO.md).

### Phase 1 — Extract & Share Infrastructure

Extract all duplicated code from templates into shared packages. This is the highest-priority work.

| New Package                            | Source                                                                                                                                                           | Contents                                                                              |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `@repo/infra`                          | `lib/csp.ts`, `security-headers.ts`, `sanitize.ts`, `rate-limit.ts`, `request-validation.ts`, `logger.ts`, `request-context*.ts`, `sentry-*.ts`, `middleware.ts` | Security, middleware factory (`createMiddleware()`), logging, Sentry, request context |
| `@repo/infra/env`                      | `lib/env.ts`, `lib/env.public.ts`                                                                                                                                | Composable Zod env schemas (`baseEnvSchema.merge(rateLimitEnvSchema).merge(...)`)     |
| `@repo/integrations-supabase`          | `features/supabase/`                                                                                                                                             | Lead storage client                                                                   |
| `@repo/integrations-hubspot`           | `features/hubspot/`, `lib/actions/hubspot.ts`                                                                                                                    | CRM sync with retry                                                                   |
| `@repo/integrations-booking-providers` | `features/booking/lib/booking-providers.ts`                                                                                                                      | Mindbody, Vagaro, Square, Cal.com adapters                                            |
| `@repo/integrations-analytics`         | `features/analytics/`                                                                                                                                            | Consent-aware tracking (GA4, Plausible, Vercel)                                       |
| `@repo/features-contact`               | `features/contact/`, `lib/actions/submit.ts` + helpers                                                                                                           | ContactForm + schema + server action pipeline                                         |
| `@repo/features-booking`               | `features/booking/`                                                                                                                                              | BookingForm + schema + booking actions                                                |
| `@repo/features-blog`                  | `features/blog/`                                                                                                                                                 | MDX loader, parser, BlogPostContent (content stays per-app)                           |
| `@repo/features-search`                | `features/search/`, `lib/search.ts`                                                                                                                              | SearchDialog + SearchPage + index builder                                             |
| `@repo/features-gallery`               | New                                                                                                                                                              | Gallery layout components (grid, masonry, carousel)                                   |
| `@repo/features-team`                  | New                                                                                                                                                              | Team display components                                                               |
| `@repo/features-reviews`               | New                                                                                                                                                              | Review aggregation, ReviewCard, StarRating, JSON-LD                                   |

**Key security requirements:**

- Patch CVE-2025-29927: strip `x-middleware-subrequest` header in middleware factory; require Next.js ≥ 15.2.3
- Nonce-based CSP with `strict-dynamic`, no `unsafe-inline`/`unsafe-eval` in production
- Defense-in-depth: duplicate rate-limit/auth checks in Server Actions, never rely on middleware alone
- RSC-aware exports: separate server-safe and client barrel files

**Post-extraction:** Templates contain only `app/`, `components/`, `content/`, `site.config.ts`, `middleware.ts` (thin wrapper), `globals.css`, and config files.

### Phase 2 — Expand UI Primitives & Compositions

Grow `@repo/ui` from 8 components to a full toolkit that enables **every pattern in the feature catalog**. All RSC-compatible by default; only interactive components get `"use client"`.

**Goal:** Provide building blocks so apps can implement any hero variant, nav pattern, CTA style, gallery layout, form type, etc., from the catalog without duplicating infrastructure.

| Category         | Components                                                                                                                                           |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Content**      | Badge, Avatar, AvatarGroup, Divider/Separator, Image (Next.js wrapper), Icon (Lucide wrapper), VisuallyHidden                                        |
| **Layout**       | Stack, Inline/HStack, Grid, Spacer, AspectRatio                                                                                                      |
| **Inputs**       | Checkbox, Radio/RadioGroup, Switch, DatePicker, TimePicker, FileUpload, Slider                                                                       |
| **Feedback**     | Toast, Alert, Modal/Dialog (Radix), Drawer, Tooltip, Popover, Skeleton, Spinner, ProgressBar                                                         |
| **Compositions** | FormField, FormGroup, NavigationMenu (Radix), MobileMenu, Breadcrumb (+ JSON-LD), Tabs, Pagination, Table, DescriptionList, PhoneInput, Map          |
| **Utilities**    | ThemeToggle, CookieConsent, BackToTop, ShareButtons, SEOHead                                                                                         |
| **Hooks**        | `useMediaQuery`, `useScrollPosition`, `useDebounce`, `useClickOutside`, `useKeyboard`, `useIntersectionObserver`, `useReducedMotion`, `useFocusTrap` |

**Catalog Coverage:** These primitives enable apps to build:
- **30+ hero variants** (Container + Section + Button + Image/Video + custom CSS)
- **25+ nav patterns** (NavigationMenu + MobileMenu + custom styling)
- **25+ CTA patterns** (Button variants + Modal + Toast + custom positioning)
- **15+ gallery layouts** (Grid + AspectRatio + Lightbox components)
- **20+ form types** (FormField + Input variants + validation)
- **All other catalog patterns** via composition

**Accessibility (WCAG 2.2 AA):**

- All interactive elements: minimum 24×24px touch target (SC 2.5.8)
- Visible focus indicators on all focusable elements
- Drag alternatives for any draggable UI (SC 2.5.7)
- No redundant re-entry in forms (SC 3.3.7)
- Consider Radix UI as headless accessibility layer

**Quality gates:**

- Storybook or component showcase
- Visual regression testing (Chromatic/Percy)
- Unit tests for all primitives
- `eslint-plugin-jsx-a11y` — zero warnings
- Per-component entry points via `package.json` `exports` for tree-shaking
- Semantic versioning + CHANGELOG for `@repo/ui`

### Phase 3 — Industry Presets & Config System

Build the configuration layer for spinning up sites by industry. Presets provide sensible defaults; clients override for uniqueness.

**Extend `SiteConfig`** with:

- `features` — simple boolean map (`booking`, `blog`, `gallery`, `team`, `reviews`, `search`, `contact`, `faq`, `liveChat`, `newsletter`, `emergencyDispatch`, `quoteRequest`, `consultation`, `onlineOrdering`, etc.)
- `industry` — union type covering **100+ business types** from catalog (hair-salon, plumber, restaurant, medical, legal, home-services, professional-services, fitness, real-estate, automotive, education, SaaS, ecommerce, nonprofit, hospitality, wedding, pet-services, financial, construction, landscaping, cleaning, photography, tutoring, daycare, veterinary, dental, chiropractic, spa, florist, bakery, brewery, architect, moving, pest-control, roofing, HVAC, electrician, accounting, marketing-agency, consulting, coworking, music-arts, funeral, travel, property-management, storage, car-wash, printing, tailoring, jewelry, and custom)
- `seo.schemaType` — primary JSON-LD type (`LocalBusiness`, `Restaurant`, `MedicalBusiness`, `LegalService`, `HomeAndConstructionBusiness`, `SportsActivityLocation`, `RealEstateAgent`, etc.)
- `seo.geoTarget` — geographic targeting metadata for local SEO

**Industry presets** in `packages/config/industry-presets/`:

- One preset per industry with default features, theme, nav, conversion flow, JSON-LD type
- Presets align with catalog's **industry-specific features** (e.g., restaurant: menu, reservations; medical: providers, insurance; legal: practice areas, case results)
- `createSiteConfig(preset, overrides)` — deep-merge + Zod validation → fully typed config
- Presets suggest default page types (e.g., restaurant: menu, reservations; real estate: listings, agents)

**Theme system** in `packages/config/theme-generator/`:

- OKLCH-based palette generation for P3 color space
- Auto-generate accessible foreground colors (4.5:1 contrast)
- Layered design tokens: global → semantic → component
- **Design token brand overrides** — industry presets define semantic + component token defaults; client overrides swap values without touching layout code. This preserves layout reuse while allowing visual distinctiveness purely through token values.

**SEO module** in `packages/infra/seo/`:

- JSON-LD generators per schema type (LocalBusiness, FAQPage, Article, AggregateRating, Service, Person, Restaurant, MedicalBusiness, LegalService, HomeAndConstructionBusiness, SportsActivityLocation, RealEstateAgent, etc.)
- Auto-generated sitemap/robots from routes
- Dynamic OG image generation via `opengraph-image.tsx`
- GEO (Generative Engine Optimization) readiness — structured data and clear content for AI crawlers

### Phase 4 — Client Override System & First Client Sites

**Deployment model:** Separate Vercel project per app. Full isolation (builds, env vars, domains, rollback).

**Steps:**

1. Define and document canonical client site structure
2. Build first client site (existing industry) as proof of concept
3. Build second client site (different industry) to validate preset system
4. Rename `templates/` → `apps/` (`template-hair-salon`, `template-plumber`, etc.)
5. Set up CI/CD: Turborepo `--filter` for affected-only builds/tests, Vercel per-app deploys, preview URLs per PR
6. Multi-tenant routing spike — document trade-offs, defer unless demand emerges at 20+ clients

### Phase 5 — New Industry Templates

Create reference implementations to validate the architecture. Each template demonstrates unique visual design while using shared infrastructure.

| Template                 | Industry      | Key Features (from catalog)                                           | JSON-LD                         |
| ------------------------ | ------------- | ---------------------------------------------------------------------- | ------------------------------- |
| `template-restaurant`    | Restaurant    | Booking, menu (categories/items), gallery (food), reviews, maps, hours | `Restaurant`                    |
| `template-medical`       | Medical       | Consultation, team (providers), insurance accepted, FAQ, patient resources | `MedicalBusiness` + `Physician` |
| `template-legal`         | Legal         | Practice areas, case results (with disclaimers), attorney profiles, consultation | `LegalService` + `Attorney`     |
| `template-home-services` | Home Services | Quote request, emergency dispatch, before/after gallery, service areas map | `HomeAndConstructionBusiness`   |
| `template-fitness`       | Fitness       | Booking, class schedule, trainer profiles, facility gallery, membership tiers | `SportsActivityLocation`        |
| `template-real-estate`   | Real Estate   | Listings (grid/list/map), agent profiles, neighborhood guides, virtual tour embeds | `RealEstateAgent`               |

**Template validation:** Each template should demonstrate:
- **Unique visual design** — different hero variant, nav pattern, CTA style, footer layout
- **Industry-specific pages** — menu (restaurant), listings (real estate), class schedule (fitness)
- **Feature composition** — uses shared `@repo/features-*` packages with different configs
- **Proper JSON-LD** — industry-specific schema types
- **Catalog coverage** — implements multiple patterns from catalog to prove flexibility

### Phase 6 — Polish & Production Readiness

| Area               | Targets                                                                                                                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Testing**        | Unit tests for all shared packages, integration tests for lead pipeline + booking flow, E2E with Playwright, axe-core accessibility checks, Lighthouse 90+ all categories     |
| **Performance**    | Tree-shaking verification, `next/dynamic` for heavy components, Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1), evaluate PPR when stable, RUM via Vercel Speed Insights |
| **Security audit** | CSP `strict-dynamic` in production, rate limiting on Server Actions, CSRF via `allowedOrigins`, Next.js ≥ 15.2.3, `pnpm audit` clean, no `unsafe-eval`/`unsafe-inline`        |
| **DX**             | `CONTRIBUTING.md` guides (new client, new feature, new preset, new integration), VS Code workspace settings + extensions, DevContainer config, ADR template                   |
| **SEO**            | JSON-LD validation (Rich Results Test), canonical URLs, OG/Twitter cards, semantic HTML, GEO readiness                                                                        |
| **Dependencies**   | Peer deps in shared packages, `pnpm dedupe`, `depcheck`/`knip` for unused deps, workspace-aware Renovate                                                                      |

### Phase 7 — Future Enhancements (Backlog)

Tracked for future consideration. Do not build until demonstrated need.

| Enhancement                                          | Trigger                               |
| ---------------------------------------------------- | ------------------------------------- |
| **i18n** (`next-intl`, sub-path routing, `hreflang`) | Client needs multi-language           |
| **CMS integration** (Sanity, Storyblok, Payload)     | Client needs content editing          |
| **AI chatbot** (Intercom, custom)                    | Client requests live chat / AI help   |
| **A/B testing** (Vercel Edge Config, LaunchDarkly)   | Need data-driven optimization         |
| **CLI/generators** (`pnpm create:client`)            | 10+ client sites exist                |
| **Service worker / offline**                         | PWA requirement                       |
| **React Compiler**                                   | Stable release                        |
| **Multi-tenant self-serve tier**                     | High-volume, low-touch demand emerges |

---

## Key Architectural Decisions

| Decision                               | Choice                             | Rationale                                                                          |
| -------------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------------- |
| Marketing sections (Hero, CTA, Footer) | **Per-app**, not shared            | Design freedom > code reuse for visual elements. Every site should look different. Catalog shows 30+ hero variants, 25+ nav patterns — impossible to share as components. |
| Feature flags                          | Simple boolean map in `SiteConfig` | YAGNI — formal registry with conflict matrices is unjustified at this scale. Catalog shows features are largely independent (booking, blog, gallery, team, reviews). |
| Multi-tenancy                          | Separate Next.js apps per client   | Client isolation, independent deploys, no shared failure domains. Research confirms: separate apps = best isolation for bespoke sites. Multi-tenant single-deploy only if 20+ similar self-serve clients emerge. |
| CMS                                    | MDX now, CMS later per-client      | Build when needed, not speculatively. Catalog shows content types vary widely (menu, listings, class schedules, case results) — CMS integration per-client when editing needed. |
| CLI/generators                         | Defer until 10+ clients            | Manual scaffolding is fine for < 10 sites. Catalog shows 100+ business types — generators would need heavy customization anyway. |
| Animations                             | Per-app                            | Animations are design-specific, not infrastructure. Catalog shows 20+ animation patterns — per-app allows unique brand expression. |
| Design tokens                          | Layered tokens (global → semantic → component) | Enables visual distinctiveness via token overrides without layout duplication. Industry presets set defaults; clients override values. |

> [!IMPORTANT] > **Do NOT build Phases 3–4 until Phase 1–2 is solid.** The biggest risk is building abstractions before you have enough concrete examples. The catalog provides a roadmap, but validate with real templates first.

---

## How the Feature Catalog Informs Each Phase

The exhaustive feature catalog (500+ patterns across 30+ categories) serves as a **completeness checklist** and **flexibility validator** for each phase:

### Phase 1 — Extract & Share Infrastructure
- **Catalog coverage:** Features (contact, booking, blog, search, gallery, team, reviews) extracted into packages must support **all catalog patterns** for those features. For example:
  - `@repo/features-booking` must support catalog's 15+ booking patterns (inline widget, dedicated page, multi-step, calendar view, time slots, service/staff selection, duration, add-ons, deposit/payment, confirmation, reminder, reschedule/cancel, recurring, group, waitlist, external redirect)
  - `@repo/features-gallery` must support catalog's 15+ gallery patterns (masonry, uniform grid, lightbox, carousel, categories/tags, before/after slider, video, full-screen, captions, project link, infinite scroll, lazy loading, hover zoom, grid+detail, 360°/virtual tour)
- **Integration points:** Catalog's 25+ integration patterns (CRM, email, analytics, booking, forms, chat, payments, maps, reviews, social, CMS, search, CDN, monitoring, consent, A/B testing, SMS, calendar, video, ecommerce) guide which integrations to extract and how to make them composable.

### Phase 2 — Expand UI Primitives & Compositions
- **Catalog coverage:** Primitives must enable apps to build **every pattern** in the catalog:
  - **30+ hero variants** → Container + Section + Button + Image/Video + custom CSS
  - **25+ nav patterns** → NavigationMenu + MobileMenu + custom styling
  - **25+ CTA patterns** → Button variants + Modal + Toast + custom positioning
  - **15+ gallery layouts** → Grid + AspectRatio + Lightbox components
  - **20+ form types** → FormField + Input variants + validation
  - **All other patterns** via composition
- **Accessibility:** Catalog's 20+ accessibility patterns (skip to content, focus indicators, touch targets, color contrast, alt text, ARIA, heading hierarchy, form labels, error identification, keyboard nav, focus trap, focus not obscured, reduced motion, drag alternative, no redundant re-entry, live regions, screen reader only, caption/transcript, resize text) must be built into primitives.

### Phase 3 — Industry Presets & Config System
- **Catalog coverage:** Presets must align with catalog's **industry-specific features**:
  - Restaurant → menu, reservations, gallery (food), reviews, hours, order online
  - Medical → consultation, providers, insurance, patient forms, telehealth, conditions
  - Legal → practice areas, attorney bios, case results (disclaimers)
  - Real Estate → listings (grid/list/map), agents, neighborhood guides, virtual tours
  - And 100+ more business types from catalog
- **Page types:** Presets suggest default page types from catalog (e.g., restaurant: menu, reservations; real estate: listings, agents).
- **SEO schemas:** Presets map to catalog's JSON-LD schema types (LocalBusiness, Restaurant, MedicalBusiness, LegalService, HomeAndConstructionBusiness, SportsActivityLocation, RealEstateAgent, etc.).

### Phase 4 — Client Override System & First Client Sites
- **Catalog validation:** First client sites should implement **multiple unique patterns** from catalog to prove flexibility:
  - Different hero variant than template
  - Different nav pattern
  - Different CTA style
  - Different gallery layout
  - Different form type
- **Uniqueness proof:** Each client site should look **novel and unique** while using shared infrastructure, demonstrating catalog's "myriad of ways" goal.

### Phase 5 — New Industry Templates
- **Catalog coverage:** Each template demonstrates **5+ unique patterns** from catalog:
  - Restaurant → menu showcase, reservation CTA, food gallery, reviews, hours/location
  - Medical → services grid, provider profiles, patient resources, insurance info
  - Legal → practice areas, case results, attorney profiles, trust signals
  - Home Services → service areas map, emergency CTA, before/after gallery, estimate form
  - Fitness → class schedule, trainer profiles, facility gallery, membership CTA
  - Real Estate → listings gallery, agent profiles, neighborhood guides, virtual tour embed

### Phase 6 — Polish & Production Readiness
- **Catalog validation:** Testing, performance, security, SEO audits must cover **all catalog patterns**:
  - Test all form types (20+ patterns)
  - Test all gallery layouts (15+ patterns)
  - Test all nav patterns (25+ patterns)
  - Test all CTA patterns (25+ patterns)
  - Validate all JSON-LD schema types from catalog
  - Ensure all accessibility patterns (20+ patterns) are implemented
  - Verify all SEO patterns (25+ patterns) are working

### Phase 7 — Future Enhancements
- **Catalog alignment:** Future enhancements (i18n, CMS, AI chatbot, A/B testing, CLI, multi-tenant) should support catalog patterns:
  - i18n → support catalog's language/locale personalization patterns
  - CMS → enable catalog's content types (menu, listings, class schedules, case results)
  - AI chatbot → enable catalog's chatbot patterns
  - A/B testing → enable catalog's A/B tested CTA patterns
  - CLI → scaffold sites with catalog's page types and patterns

**Key insight:** The catalog is not a prescriptive list of what to build. It's a **completeness checklist** ensuring the repo can support maximum flexibility — every feature/element as a reusable capability that can be implemented in myriad ways so each site can be unique and novel.
