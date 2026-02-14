# Marketing-First Monorepo Research 2026 - Enhanced Edition

## Executive Summary

This document compiles comprehensive research on marketing-first monorepo architecture for 2026, focusing on best practices, standards, and novel methodologies for building flexible, industry-agnostic marketing website systems. This enhanced edition includes deep analysis of tooling, architecture patterns, and emerging technologies.

---

## 1. Monorepo Fundamentals 2026

### 1.1 Core Monorepo Principles

**What is a Monorepo?**

- A single repository containing multiple distinct projects with well-defined relationships
- Not just "code colocation" - intentional architecture for code sharing and consistency
- Enables atomic commits across projects, one version of everything, and developer mobility

**Key Benefits for Marketing Websites:**

- No overhead to create new client projects (reuse CI/CD, configs)
- Atomic commits across templates and shared packages
- One version of all dependencies (no conflicting versions)
- Consistent tooling and code standards across all client sites
- Easy extraction of common patterns into shared components
- Cross-package refactoring with single commit

**2026 Monorepo Anti-Patterns to Avoid:**

- ❌ Tight coupling between unrelated packages
- ❌ Circular dependencies in workspace graph
- ❌ Monolithic build without proper caching
- ❌ Mixed versioning strategies
- ❌ Ignoring affected package detection

### 1.2 2026 Monorepo Tooling Landscape

**Leading Tools Comparison:**

| Tool                | Maintainer | Best For                                  | Learning Curve | Scale        |
| ------------------- | ---------- | ----------------------------------------- | -------------- | ------------ |
| **Turborepo**       | Vercel     | Next.js/React projects, remote caching    | Low            | Medium-Large |
| **Nx**              | Nrwl       | Enterprise scale, polyglot repos          | Medium         | Enterprise   |
| **pnpm Workspaces** | pnpm team  | Lightweight, fast package management      | Low            | All sizes    |
| **Rush**            | Microsoft  | Enterprise with strict versioning         | High           | Enterprise   |
| **Lage**            | Microsoft  | Incremental builds, pipeline optimization | Medium         | Large        |
| **Bazel**           | Google     | Polyglot, massive scale                   | Very High      | Massive      |

**2026 Recommended Stack:**

- **Package Manager:** pnpm 10+ (fastest, strictest, best workspace support)
- **Task Runner:** Turborepo 2.x (remote caching, pipeline visualization)
- **Build System:** Next.js 15 + React 19 + TypeScript 5.7

**Turborepo 2.x Key Features (2026):**

- **Remote Caching:** Share build cache across CI and team members
- **Pipeline Visualization:** Visual DAG of task dependencies
- **Affected Package Detection:** Only build what changed
- **Watch Mode:** Continuous builds during development
- **Daemon Mode:** Background process for faster subsequent runs
- **Scoped Tasks:** Run commands in specific packages

**pnpm 10+ Advanced Features:**

- **Catalogs:** Define dependency versions as reusable constants
  ```yaml
  # pnpm-workspace.yaml
  catalog:
    react: ^18.3.1
    next: ^15.2.0
  ```
  ```json
  // package.json
  "dependencies": {
    "react": "catalog:"
  }
  ```
- **Strict Peer Dependencies:** Enforces peer dependency contracts
- **Workspace Protocol:** `workspace:*` for internal dependencies
- **Injection:** Symlink workspace dependencies when possible
- **Content-Addressable Store:** Deduplicates packages across projects

**Catalog Advantages:**

- Maintain unique versions across workspace
- Easier upgrades - change one line in pnpm-workspace.yaml
- Fewer merge conflicts in package.json files
- Automatic dependency synchronization

### 1.3 Monorepo Structural Patterns

**Standard Marketing Website Monorepo Structure:**

```
├── apps/                    # Deployable applications
│   ├── client-a/            # Individual client websites
│   ├── client-b/
│   └── admin-dashboard/     # Internal tools
│
├── packages/                # Shared libraries
│   ├── ui/                  # Component library
│   ├── config/              # Shared configs (ESLint, TS, Tailwind)
│   ├── utils/               # Shared utilities
│   ├── infra/               # Security, middleware, logging
│   ├── integrations/        # Third-party APIs
│   ├── features/            # Shared feature modules (NEW)
│   └── types/               # Shared TypeScript definitions
│
├── templates/               # Industry-specific templates (to be deprecated)
├── clients/                 # Client implementations
├── tooling/                 # Scripts and generators
│   ├── create-client/       # CLI for new clients
│   └── generators/          # Component/feature generators
├── docs/                    # Documentation
└── scripts/                 # Utility scripts
```

**Package Dependency Graph Best Practices:**

```
@repo/config (no deps)
    ↓
@repo/utils → @repo/config
    ↓
@repo/ui → @repo/utils, @repo/config
    ↓
@repo/infra → @repo/utils, @repo/config
    ↓
@repo/features → @repo/ui, @repo/infra, @repo/utils
    ↓
@repo/integrations → @repo/infra, @repo/utils
    ↓
clients/* → @repo/features, @repo/integrations
```

**Workspace Configuration (pnpm-workspace.yaml):**

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
  - 'packages/config/*'
  - 'clients/*'

catalog:
  react: ^19.0.0
  react-dom: ^19.0.0
  next: ^15.2.0
  typescript: ^5.7.2

catalogs:
  # React ecosystem
  react19:
    react: ^19.0.0
    react-dom: ^19.0.0
    '@types/react': ^19.0.0

  # UI primitives
  radix:
    'radix-ui': ^1.0.0
```

---

## 2. Marketing-First Architecture 2026

### 2.1 Marketing Website Core Requirements

**Conversion Optimization Stack:**

- **Performance-first (Core Web Vitals)**

  - LCP < 2.5s, INP < 200ms, CLS < 0.1
  - 2026 addition: INP (Interaction to Next Paint) replaces FID
  - Performance budgets per component

- **SEO-optimized (semantic HTML, structured data)**

  - JSON-LD structured data for all business types
  - Dynamic sitemap generation
  - Meta tag automation from content
  - Core Web Vitals as ranking factor

- **Analytics integration (consent-gated, privacy-first)**

  - GDPR/CCPA compliant by default
  - Consent management platform (CMP) integration
  - Server-side tracking options
  - Cookieless analytics support

- **A/B testing infrastructure**

  - Feature flags for experiments
  - Traffic splitting at edge
  - Statistical significance tracking
  - Integration with Optimizely, VWO, or custom

- **Personalization capabilities**
  - Behavioral targeting
  - Geo-location customization
  - Return visitor recognition (privacy-safe)
  - Content recommendation engines

**Multi-Industry Support:**

- Configurable business types (salons, restaurants, law firms, etc.)
- Industry-specific schemas and structured data
- Flexible content models (services, products, team, etc.)
- Localization and multi-language support (i18n)
- Multi-currency support for e-commerce

**Client Customization:**

- Brand theming (colors, fonts, logos)
- Feature toggles (enable/disable modules)
- Content management (CMS integration)
- Custom domain support with SSL
- White-label capabilities

### 2.2 Component Architecture Patterns

**Atomic Design Methodology (Enhanced 2026):**

- **Atoms:** Basic building blocks (Button, Input, Text)

  - Must be themeable via CSS custom properties
  - Should support dark mode by default
  - Accessibility built-in (ARIA, keyboard nav)

- **Molecules:** Simple component groups (SearchBar, FormField)

  - Composed of 2-3 atoms
  - Self-contained validation logic
  - Responsive by default

- **Organisms:** Complex components (Header, Hero, FeatureGrid)

  - Business logic integration
  - Data fetching capabilities (Server Components)
  - Multiple layout variants

- **Templates:** Page-level layouts (HomeTemplate, ServiceTemplate)

  - Configurable section ordering
  - A/B testable layouts
  - Responsive breakpoints

- **Pages:** Specific instances with real content
  - Thin wrappers around templates
  - SEO metadata configuration
  - Analytics event tracking

**Headless/Composable Architecture:**

- Decoupled frontend from CMS/backend
- API-first content delivery (REST/GraphQL)
- Component-driven development
- Micro-frontend ready (Module Federation)
- Edge-rendered components

**2026 Best Practice: shadcn/ui Pattern Evolution**

**February 2026 Updates:**

- **Unified Radix UI Package:** New-york style now uses unified `radix-ui` package
- **Blocks for Radix and Base UI:** All blocks available for both libraries
- **RTL Support:** Full right-to-left language support
- **Base UI Documentation:** Now supports both Radix and Base UI primitives

**shadcn/ui Architecture:**

```
┌─────────────────────────────────────┐
│           Your Application          │
├─────────────────────────────────────┤
│         @repo/ui (your DS)           │
│  ┌─────────────────────────────┐   │
│  │    shadcn/ui patterns       │   │
│  │    ┌─────────────────┐      │   │
│  │    │  Radix/Base UI  │      │   │
│  │    │   Primitives    │      │   │
│  │    └─────────────────┘      │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

**Key Principles:**

- Copy-paste components (not dependencies)
- Built on Radix UI or Base UI primitives
- Tailwind CSS for styling
- Fully customizable and ownable
- No runtime dependency on shadcn/ui package

### 2.3 Design System Architecture

**Design Token Architecture (Three-Layer Model):**

Based on Martin Fowler's Design Token-Based UI Architecture:

**1. Option Tokens (Foundation Layer)**

- Define what design options are available
- Raw values: colors, spacing, typography scales
- Platform-agnostic (can be used for web, iOS, Android)

**2. Decision Tokens (Semantic Layer)**

- Define how styles are applied across the UI
- Semantic names: primary, secondary, success, error
- Theme-agnostic (work for light, dark, high-contrast)

**3. Component Tokens (Application Layer)**

- Define where exactly styles are applied
- Component-specific: button-primary-bg, input-border-color
- Implementation-specific

**CSS Custom Properties Implementation:**

```css
/* Option Tokens (Raw) */
:root {
  --color-teal-500: 174 85% 33%;
  --color-slate-900: 220 20% 14%;
  --space-4: 1rem;
}

/* Decision Tokens (Semantic) */
:root {
  --primary: var(--color-teal-500);
  --secondary: var(--color-slate-900);
  --spacing-md: var(--space-4);
}

/* Component Tokens */
:root {
  --button-primary-bg: var(--primary);
  --button-padding: var(--spacing-md);
}
```

**Benefits of Three-Layer Model:**

- **Consistency:** Changes propagate systematically
- **Flexibility:** Theme at any level
- **Clarity:** Clear abstraction boundaries
- **Maintainability:** Easier updates and debugging

**2026 Design Token Trends:**

- W3C Design Tokens Community Group standardization
- Token Studio integration with Figma
- Automated token generation from design files
- Runtime theme switching (no rebuild required)

---

## 3. Technology Stack 2026

### 3.1 Frontend Framework

**Next.js 15 (Maintenance LTS) - Key Features:**

> **Note:** Next.js 16 was released October 2025 (with 16.1 following).
> The project uses Next.js 15.5.12 (Maintenance LTS). Upgrading to 16 should
> be evaluated — it includes React 19.2 features, Turbopack improvements,
> and stabilized caching. See [Upgrading to v16](https://nextjs.org/docs/app/guides/upgrading/version-16).

**App Router (Stable):**

- Server Components by default
- Streaming SSR for progressive rendering
- Nested layouts with parallel routes
- Route groups for organization
- Intercepting routes for modals

**Partial Prerendering (PPR) - Experimental:**

```typescript
// next.config.js
module.exports = {
  experimental: {
    ppr: true,
  },
};
```

- Combines static and dynamic rendering
- Static shell pre-rendered at build time
- Dynamic content streams in at request time
- Uses React Suspense boundaries

**Caching Strategy (Next.js 15):**
| Cache Type | Duration | Use Case |
|------------|----------|----------|
| Request Memoization | Request lifecycle | Same data, multiple calls |
| Data Cache | Indefinite (revalidate) | fetch() results |
| Full Route Cache | Build/revalidate | Static route segments |
| Router Cache | Session | Client-side navigation |

**Turbopack (Dev Server):**

- Rust-based bundler
- 10x faster than Webpack for large apps
- Native TypeScript support
- Fast HMR (Hot Module Replacement)

**React 19 - New Features:**

**Actions (Stable):**

```typescript
// Server Action
async function submitForm(formData: FormData) {
  'use server';
  // Server-side logic
  await saveToDatabase(formData);
}

// Client Component with Action
function ContactForm() {
  return <form action={submitForm}>...</form>;
}
```

**New Hooks:**

- `useActionState`: Form submission state management

  ```typescript
  const [state, formAction, isPending] = useActionState(async (prevState, formData) => {
    // Action logic
    return { success: true };
  }, initialState);
  ```

- `useFormStatus`: Access form submission status from child components

  ```typescript
  const { pending, data, method, action } = useFormStatus();
  ```

- `useOptimistic`: Optimistic UI updates

  ```typescript
  const [optimisticState, addOptimistic] = useOptimistic(state, (currentState, newItem) => [
    ...currentState,
    newItem,
  ]);
  ```

- `use`: Read resources (Promises, Context) during render
  ```typescript
  const data = use(promise);
  ```

**Server Components Deep Dive:**

- Zero client-side JavaScript for static content
- Direct backend access (databases, file systems)
- Automatic code splitting
- Streaming for improved perceived performance

### 3.2 Styling & UI

**Tailwind CSS 3.4+ Features (Project uses 3.4.17):**

- JIT (Just-In-Time) compiler for fast builds
- CSS custom property support
- Plugin ecosystem (forms, typography, aspect-ratio)
- Design token integration
- Container queries support

> **Note:** Tailwind CSS v4.0 was released January 2025 with a completely
> new engine, CSS-first configuration, native cascade layers, and zero-config
> content detection. The project currently uses v3.4.17. Migration to v4
> should be evaluated — it's a significant architectural change (no more
> `tailwind.config.js`, uses `@import "tailwindcss"` in CSS instead).
> See [Tailwind v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide).

**Component Library Strategy (2026 Updated):**

**Option 1: Radix UI Primitives (Current shadcn/ui default)**

- Mature, battle-tested
- Comprehensive primitive set
- Good accessibility out of the box

**Option 2: Base UI (New 2026 alternative)**

- Lighter weight than Radix
- Modern architecture
- Growing primitive set
- Better tree-shaking

**Comparison:**
| Feature | Radix UI | Base UI |
|---------|----------|---------|
| Bundle Size | Larger | Smaller |
| Primitives | 20+ | 15+ |
| Accessibility | Excellent | Excellent |
| Maturity | Very mature | Newer |
| shadcn Support | Full | Full |

### 3.3 Type Safety & Validation

**TypeScript 5.7+ Features:**

- Strict mode enabled (non-negotiable for production)
- Path mapping for monorepo
- Shared types packages
- Decorator metadata (stage 3)
- Improved type inference

**Zod Schema Validation (2026 Best Practices):**

**Why Zod:**

- TypeScript-first schema validation
- Static type inference
- Zero dependencies
- Tree-shakeable
- Great error messages

**React Hook Form + Zod Pattern:**

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Minimum 8 characters'),
});

type FormData = z.infer<typeof schema>;

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return <form>...</form>;
}
```

**Advanced Zod Patterns:**

- Preprocessing for file uploads
- Transform for data normalization
- Refinement for custom validation
- Union types for conditional schemas
- Coercion for type conversion

### 3.4 Content Management

**Headless CMS Landscape 2026:**

**Market Growth:**

- Headless CMS market: $3.94B (2026) → $22.28B (2034)
- CAGR: 21%+
- Driven by multi-channel content needs

**Top Platforms (G2 Rankings):**

| Platform       | G2 Score | Best For                     | Deployment        |
| -------------- | -------- | ---------------------------- | ----------------- |
| **Sanity**     | 4.7/5    | Structured content, AI-ready | Cloud/Self-hosted |
| **Strapi**     | 4.5/5    | Open-source, full control    | Self-hosted       |
| **Storyblok**  | 4.4/5    | Visual editing               | Cloud             |
| **Kontent.ai** | 4.3/5    | Enterprise workflows         | Cloud             |
| **Contentful** | 4.2/5    | Enterprise scale             | Cloud             |

**Sanity (Content Operating System):**

- Real-time collaboration (no lockouts)
- Schema as Code (TypeScript/JavaScript)
- Customizable Studio (React-based)
- AI-ready structured content
- Content Lake architecture

**2026 CMS Trends:**

- AI-assisted content generation
- Real-time collaborative editing
- Visual editing for headless
- Multi-language AI translation
- Content federation (multiple sources)

**Git-Based Content (MDX):**

- Version controlled content
- Preview deployments
- No vendor lock-in
- Developer-friendly
- Code + content in one place

---

## 4. Security & Performance 2026

### 4.1 Security Best Practices

**Content Security Policy (CSP) - Strict CSP 2026:**

**Evolution from Allowlist to Strict CSP:**

- Old approach: Domain allowlists (easily bypassed)
- New approach: Nonce-based or hash-based strict CSP
- strict-dynamic for trusted scripts

**Recommended Strict CSP:**

```http
Content-Security-Policy:
  default-src 'self';
  script-src 'nonce-{random}' 'strict-dynamic' https:;
  style-src 'self' 'nonce-{random}';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://api.example.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
```

**Nonce Generation (128-bit entropy):**

```typescript
function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
}
```

**Security Headers (2026 Standards):**

```http
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

**OWASP Top 10 2026 Considerations:**

1. Broken Access Control
2. Cryptographic Failures
3. Injection (SQL, XSS)
4. Insecure Design
5. Security Misconfiguration
6. Vulnerable and Outdated Components
7. Identification and Authentication Failures
8. Software and Data Integrity Failures
9. Security Logging and Monitoring Failures
10. Server-Side Request Forgery (SSRF)

**Privacy-First Analytics (2026 Landscape):**

| Tool                 | Type             | GDPR | Hosting        | Best For             |
| -------------------- | ---------------- | ---- | -------------- | -------------------- |
| **Plausible**        | Open-source      | ✅   | EU/Self        | Simple web analytics |
| **Umami**            | Open-source      | ✅   | Self           | Full control         |
| **Mitzu**            | Warehouse-native | ✅   | Your warehouse | Product analytics    |
| **Vercel Analytics** | Managed          | ✅   | Edge           | Next.js apps         |
| **PostHog**          | Open-source      | ✅   | EU/Self        | Full-featured        |

**Privacy Compliance Checklist:**

- [ ] No personal data collection without consent
- [ ] IP anonymization
- [ ] No cross-site tracking
- [ ] Cookie consent banner (if using cookies)
- [ ] Data retention policies
- [ ] Right to be forgotten implementation
- [ ] Data processing agreements (DPAs)

### 4.2 Performance Optimization

**Core Web Vitals 2026 (Updated):**

**INP (Interaction to Next Paint) - STABLE:**

- Replaced FID (First Input Delay) in **March 2024** (not 2026 — already in effect)
- Measures responsiveness to user interactions
- Target: < 200ms (Good), < 500ms (Poor)
- Measures time from interaction to next frame paint

**All Core Web Vitals Targets:**
| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP | < 2.5s | 2.5-4s | > 4s |
| INP | < 200ms | 200-500ms | > 500ms |
| CLS | < 0.1 | 0.1-0.25 | > 0.25 |
| TTFB | < 600ms | 600-1000ms | > 1000ms |
| FCP | < 1.8s | 1.8-3s | > 3s |

**INP Optimization Strategies:**

- Break up long tasks (< 50ms each)
- Use Web Workers for heavy computation
- Debounce/throttle event handlers
- Optimize event callbacks
- Reduce DOM size and depth

**Next.js Performance Features:**

- Image optimization (next/image): WebP, AVIF, responsive sizes
- Font optimization (next/font): Subsetting, font-display: swap
- Script optimization (next/script): Loading strategies
- Edge Runtime: Lower latency worldwide
- Streaming SSR: Progressive content delivery

**Performance Budgets (2026):**

```javascript
// next.config.js
module.exports = {
  performanceBudgets: {
    limits: [
      { type: 'script', maximum: 200000 }, // 200KB scripts
      { type: 'image', maximum: 500000 }, // 500KB images
      { type: 'css', maximum: 50000 }, // 50KB CSS
    ],
  },
};
```

---

## 5. Novel Methodologies & Techniques 2026

### 5.1 Spec-Driven Development

**Feature Specification Format (.kiro/specs/):**

```markdown
# Feature: Booking System

## Overview

Implement appointment booking functionality for service businesses.

## Acceptance Criteria

- [ ] Users can select service type
- [ ] Users can select date and time
- [ ] Users can provide contact information
- [ ] Form validates all inputs
- [ ] Confirmation email sent
- [ ] Admin receives notification

## Technical Requirements

- Server Actions for form submission
- Zod validation schemas
- Rate limiting (5 requests/hour)
- HubSpot CRM integration
- Calendar conflict checking

## Implementation Phases

1. Schema design and validation
2. UI component development
3. Server action implementation
4. Integration testing
5. E2E testing

## Architecture Decisions

- ADR-001: Use Server Actions over API routes
- ADR-002: Store bookings in Supabase
```

**Benefits:**

- Clear scope definition
- Documentation as artifact
- AI-assisted implementation ready
- Consistent feature delivery
- Historical decision tracking

### 5.2 Marketing-First Component Classification

**Extended Feature Tags System:**

```typescript
// Core Feature Tags
[FEAT:MARKETING]       // Conversion optimization
[FEAT:SEO]            // Search engine optimization
[FEAT:UX]             // User experience
[FEAT:ACCESSIBILITY]  // WCAG compliance
[FEAT:PERFORMANCE]    // Speed optimization
[FEAT:SECURITY]       // Security features
[FEAT:PRIVACY]       // Privacy/GDPR compliance
[FEAT:ANALYTICS]     // Tracking and measurement

// Extended Tags (2026)
[FEAT:MOBILE]        // Mobile/responsive
[FEAT:PWA]          // Progressive web app
[FEAT:DESIGN]       // Visual design
[FEAT:COMPONENTS]   // UI components
[FEAT:FORMS]        // Form handling
[FEAT:BOOKING]      // Appointment booking
[FEAT:ECOMMERCE]    // Shopping/payments
[FEAT:CONTENT]      // CMS/content
[FEAT:SOCIAL]       // Social features
[FEAT:LOCALIZATION] // i18n/l10n
[FEAT:AI]          // AI/ML integration
```

**Trace-Based Documentation:**

```typescript
// File-level
[TRACE:FILE=packages.ui.components.Button]

// Component-level
[TRACE:FUNC=packages.ui.components.Button]
[TRACE:INTERFACE=packages.ui.components.ButtonProps]
[TRACE:CONST=packages.ui.components.Button.variantStyles]
[TRACE:BLOCK=packages.ui.components.Button.renderLogic]
```

### 5.3 Multi-Tenant Client Architecture

**Site Configuration Pattern (Enhanced):**

```typescript
// site.config.ts
interface SiteConfig {
  // Identity
  id: string;
  name: string;
  tagline: string;
  industry: IndustryType;

  // Features (enables feature flags)
  features: {
    hero: HeroVariant;
    services: ServiceDisplayVariant;
    team: TeamDisplayVariant;
    testimonials: TestimonialVariant;
    pricing: PricingVariant;
    contact: ContactFormVariant;
    gallery: GalleryVariant;
    blog: boolean;
    booking: boolean;
    faq: boolean;
  };

  // Design System
  theme: {
    colors: ColorPalette;
    fonts: FontFamily;
    borderRadius: BorderRadiusScale;
    shadows: ShadowScale;
  };

  // Integrations
  integrations: {
    analytics?: AnalyticsConfig;
    crm?: CRMConfig;
    booking?: BookingProvider;
    email?: EmailProvider;
    chat?: ChatProvider;
    reviews?: ReviewProvider;
  };

  // SEO
  seo: {
    titleTemplate: string;
    defaultDescription: string;
    ogImage: string;
    schemaType: SchemaType;
  };

  // Navigation
  navLinks: NavLink[];
  footer: FooterConfig;

  // Business Info
  contact: ContactInfo;
  hours: BusinessHours;

  // Conversion
  conversionFlow: ConversionConfig;
}
```

### 5.4 Template-to-Feature Extraction

**Migration Strategy (Detailed):**

**Phase 1: Inventory**

- Document all template components
- Map component dependencies
- Identify reusable patterns
- Catalog business logic

**Phase 2: Extract**

- Move components to `packages/`
- Refactor for configurability
- Maintain backward compatibility
- Extract shared utilities

**Phase 3: Configure**

- Replace hardcoded values with props
- Add variant support
- Implement feature flags
- Create configuration schemas

**Phase 4: Document**

- Usage guides per feature
- Configuration reference
- Migration instructions
- Best practices

**Phase 5: Deprecate**

- Mark templates as deprecated
- Migrate existing clients
- Remove templates/
- Update documentation

---

## 6. Industry-Specific Considerations

### 6.1 Service Businesses (Salons, Spas, Clinics)

**Core Features:**

- Online booking/scheduling (real-time availability)
- Service menu with pricing and duration
- Staff/professional profiles with specialties
- Before/after galleries
- Reviews and testimonials
- Location and hours
- Gift card sales
- Membership/subscription management

**Structured Data:**

```json
{
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "name": "Luxe Salon",
  "address": {...},
  "telephone": "...",
  "priceRange": "$$",
  "hasOfferCatalog": {...},
  "employee": [...],
  "aggregateRating": {...}
}
```

**Key Integrations:**

- Scheduling: Square Appointments, Acuity, Calendly
- POS: Square, Clover, Shopify POS
- Reviews: Google Business, Yelp

### 6.2 Restaurants & Hospitality

**Core Features:**

- Menu display with dietary info (vegan, gluten-free, allergens)
- Online ordering/reservations (OpenTable, Resy)
- Photo galleries (food, ambiance)
- Chef/team profiles
- Location and hours
- Event calendar (live music, specials)
- Catering information
- Gift cards

**Structured Data:**

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Bistro Central",
  "servesCuisine": ["French", "Italian"],
  "priceRange": "$$$",
  "menu": "https://...",
  "acceptsReservations": true,
  "aggregateRating": {...}
}
```

**Key Integrations:**

- Reservations: OpenTable, Resy, Tock
- Delivery: DoorDash, UberEats, Grubhub
- Reviews: Yelp, Google, TripAdvisor

### 6.3 Professional Services (Law, Dental, Consulting)

**Core Features:**

- Service descriptions and practice areas
- Team credentials/profiles (education, certifications)
- Case studies/portfolio (where permitted)
- Consultation booking (intake forms)
- Resources/blog (thought leadership)
- Trust indicators (certifications, awards, associations)
- FAQ (common client questions)
- Secure document upload

**Structured Data:**

```json
{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "Chen Law Firm",
  "areaServed": {...},
  "hasMap": "...",
  "priceRange": "$$$",
  "aggregateRating": {...}
}
```

**Compliance Considerations:**

- Attorney advertising disclaimers
- HIPAA compliance (medical)
- Client confidentiality
- Professional liability insurance mentions

### 6.4 Retail & E-commerce

**Core Features:**

- Product catalogs with filtering
- Shopping cart and checkout
- Inventory management
- Reviews and ratings
- Related products
- Wishlist/favorites
- Order tracking
- Returns/exchanges

**Structured Data:**

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "...",
  "image": "...",
  "description": "...",
  "brand": {...},
  "offers": {...},
  "aggregateRating": {...}
}
```

**Key Integrations:**

- Payments: Stripe, Square, PayPal
- Shipping: ShipStation, EasyPost
- Inventory: Shopify, BigCommerce
- Reviews: Yotpo, Trustpilot

### 6.5 Additional Industries (2026 Additions)

**Fitness & Wellness:**

- Class schedules and booking
- Trainer profiles
- Membership management
- Progress tracking
- Nutrition planning

**Real Estate:**

- Property listings
- Agent profiles
- Mortgage calculators
- Virtual tours
- Neighborhood guides

**Construction/Trades:**

- Project portfolios
- Service areas
- Free estimate forms
- License/insurance verification
- Before/after galleries

**Education:**

- Course listings
- Instructor profiles
- Enrollment forms
- Schedule/timetables
- Resource downloads

---

## 7. Development Workflow 2026

### 7.1 Modern Tooling

**Package Management (pnpm 10+):**

**Key Configuration (.npmrc):**

```ini
# Strict dependency management
strict-peer-dependencies=true
auto-install-peers=false

# Performance
node-linker=isolated
shamefully-hoist=false

# Workspace
prefer-workspace-packages=true
link-workspace-packages=true
```

**Workspace Commands:**

```bash
# Install all dependencies
pnpm install

# Add dependency to specific package
pnpm --filter @repo/ui add lodash

# Run script in all packages
pnpm -r run build

# Run script in changed packages only
pnpm --filter "...[origin/main]" run build

# Update all packages
pnpm up --latest --recursive
```

**Task Orchestration (Turborepo):**

**turbo.json Configuration:**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"]
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "type-check": {
      "dependsOn": ["^build"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

**Remote Caching Setup:**

```bash
# Environment variables
TURBO_TOKEN=your-token
TURBO_TEAM=your-team-slug

# Enable in CI
env:
  TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
  TURBO_TEAM: ${{ vars.TURBO_TEAM }}
```

**Code Quality (ESLint 9 Flat Config):**

**ESLint 9 Migration:**

- New flat config format (eslint.config.js)
- No more .eslintrc files
- Better performance
- Native TypeScript support

**Monorepo ESLint Configuration:**

```javascript
// eslint.config.js
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  }
);
```

**TypeScript Monorepo Setup:**

**Root tsconfig.json:**

```json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "composite": true,
    "declaration": true,
    "declarationMap": true
  },
  "references": [
    { "path": "./packages/ui" },
    { "path": "./packages/utils" },
    { "path": "./packages/infra" }
  ]
}
```

### 7.2 CI/CD Best Practices

**GitHub Actions Workflow:**

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
  TURBO_TEAM: ${{ vars.TURBO_TEAM }}

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 2

      - uses: pnpm/action-setup@v3
        with:
          version: 10.29.2

      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Lint
        run: pnpm lint

      - name: Type check
        run: pnpm type-check

      - name: Test
        run: pnpm test

      - name: Build
        run: pnpm build
```

**Caching Strategy:**

1. **pnpm store:** Cache ~/.local/share/pnpm/store
2. **Turborepo remote cache:** Cloud-based build caching
3. **GitHub Actions cache:** node_modules, .turbo
4. **Next.js build cache:** .next/cache

**Affected Package Detection:**

```bash
# Only test packages that changed
pnpm test --filter="...[origin/main]"

# Only build affected packages
pnpm build --filter="...[origin/main]"
```

**Deployment Strategy:**

| Environment | Trigger         | Caching | Preview |
| ----------- | --------------- | ------- | ------- |
| Production  | Push to main    | Full    | No      |
| Staging     | Manual/Schedule | Full    | No      |
| Preview     | PR open         | Partial | Yes     |
| Development | Local           | None    | N/A     |

### 7.3 Documentation Standards

**Documentation Types:**

| Document        | Location     | Audience     | Update Frequency |
| --------------- | ------------ | ------------ | ---------------- |
| README.md       | Root         | Everyone     | Major changes    |
| CONTRIBUTING.md | Root         | Contributors | Process changes  |
| ARCHITECTURE.md | docs/        | Developers   | Design changes   |
| COMPONENTS.md   | packages/ui/ | Developers   | New components   |
| API.md          | packages/\*/ | Integrators  | API changes      |
| CHANGELOG.md    | Root         | Users        | Releases         |

**Code Documentation Standards:**

- Metaheaders with TRACE annotations (project standard)
- JSDoc for public APIs
- Inline comments for complex logic
- TypeScript for type documentation
- Storybook for component documentation

**Documentation as Code:**

- MDX for guides and tutorials
- Version-controlled with code
- Reviewed in PR process
- Deployed with site

---

## 8. Agency Operating System (AOS) Architecture

**2026 Enterprise Architecture Pattern for Marketing Agencies**

The Agency Operating System model provides a layered architecture for building scalable, multi-tenant marketing platforms. While the current project scope focuses on layers 2-3 (Component Library and Experience Layer), understanding the full AOS architecture enables future expansion.

### 8.1 Seven-Layer Architecture Model

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  LAYER 7: Client Experience Layer      (White-labeled client portals)      │
│  LAYER 6: AI & Intelligence Layer      (Agentic workflows, predictive MRM) │
│  LAYER 5: Orchestration Layer          (Campaign management, MRM, CDP)     │
│  LAYER 4: Content & Asset Layer        (DAM, Headless CMS, Visual Editing)│
│  LAYER 3: Experience Layer             (Composed sites, apps, PWA)         │
│  LAYER 2: Component Library            (Atomic design system, 1000+ comps) │
│  LAYER 1: Data & Analytics Layer       (Real-time CDP, attribution, ML)    │
│  LAYER 0: Infrastructure Layer         (Multi-tenant SaaS, edge, security)│
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Current Project Scope (Layers 2-3)

**LAYER 2: Component Ecosystem (Atomic Design)**

The current project implements a focused version of the Component Library layer:

```
packages/
├── @repo/ui (Primitives)          # Atoms: Button, Input, Dialog, etc.
├── @repo/marketing-components      # Molecules/Organisms: Hero, Services, etc.
├── @repo/features                  # Templates: Booking, Contact, Blog
└── @repo/page-templates            # Page-level layouts
```

**LAYER 3: Experience Composition**

The page template system enables experience composition:

- **Site Composer**: Configuration-driven page assembly via `site.config.ts`
- **Multi-Channel**: Next.js PWA support, responsive design
- **Localization**: i18n-ready structure
- **SEO Automation**: Structured data generators, meta optimization

### 8.3 Future Expansion Path (Layers 4-7)

**LAYER 4: Content & Asset Management (Future Phase)**

| Component            | Purpose                    | Timeline |
| -------------------- | -------------------------- | -------- |
| Headless CMS Unified | CMS-agnostic content layer | Phase 3  |
| Visual Editing       | Storyblok-like editor      | Phase 4  |
| DAM Core             | Asset management           | Phase 4  |
| AI Content Engine    | Generative copy/images     | Phase 5  |

**LAYER 5: Marketing Operations (Future Phase)**

| Component              | Purpose               | Timeline |
| ---------------------- | --------------------- | -------- |
| Campaign Orchestration | Campaign management   | Phase 6  |
| Resource Management    | Capacity planning     | Phase 6  |
| Budget ROI             | Spend tracking        | Phase 6  |
| Client Collaboration   | White-labeled portals | Phase 7  |

**LAYER 6: AI & Agentic Layer (Future Phase)**

| Component           | Purpose                          | Timeline  |
| ------------------- | -------------------------------- | --------- |
| Agent Orchestration | Autonomous campaign optimization | Phase 5-6 |
| Model Garden        | LLM gateway, fine-tuning         | Phase 5   |
| Predictive Engine   | Lead scoring, churn prevention   | Phase 6   |
| MCP Servers         | Model Context Protocol           | Phase 5   |

**LAYER 7: Client Delivery (Current)**

| Component          | Purpose                   | Status      |
| ------------------ | ------------------------- | ----------- |
| Client Instances   | Per-client deployed sites | In Progress |
| Component Showroom | Storybook docs            | Planned     |

### 8.4 Architectural Patterns from AOS

**Pattern 1: Edge-First Multi-Tenancy**

Resolve tenant context at the edge for performance:

```typescript
// middleware.ts (runs at edge)
export default async function middleware(req: NextRequest) {
  const tenant = await resolveTenant(req.headers.get('host'));
  const config = await getTenantConfig(tenant.id);

  // Inject tenant context into request
  req.headers.set('x-tenant-id', tenant.id);
  req.headers.set('x-feature-flags', JSON.stringify(config.features));

  return NextResponse.next({ request: req });
}
```

**Pattern 2: Composable DXP Assembly**

Clients assemble their stack via configuration:

```typescript
// site.config.ts
export const siteConfig: SiteConfig = {
  stack: {
    cms: 'sanity', // or 'contentful', 'strapi'
    analytics: 'plausible', // or 'google', 'segment'
    booking: 'internal', // or 'calendly', 'acuity'
    crm: 'hubspot', // or 'salesforce'
  },
  components: {
    include: ['@repo/healthcare-components'],
    exclude: ['@repo/gamification'],
  },
  ai_agents: {
    enabled: ['content-optimizer'],
  },
};
```

**Pattern 3: Zero-Copy Data Federation**

Query data where it lives rather than moving it:

```typescript
// Federated query pattern
const unifiedQuery = `
  SELECT customer_id, ltv_score, last_ad_click
  FROM snowflake.clients.orders
  JOIN cdp.profiles USING (customer_id)
  WHERE tenant_id = ${currentTenant.id}
`;
```

**Pattern 4: Agentic CMS Architecture**

Autonomous agents respond to data changes:

```typescript
// Agent configuration example
const inventoryAgent = {
  trigger: 'PIM.stock_level < 10',
  action: [
    'updateHeroBanner({ urgency: "low_stock" })',
    'triggerEmailCampaign({ segment: "waitlist" })',
  ],
};
```

### 8.5 Package Inventory by Layer (Full AOS)

**LAYER 0: Infrastructure & Multi-Tenancy**

```
packages/infrastructure/
├── tenant-core/                    # Multi-tenant isolation engine
│   ├── tenant-context/             # Request scoping, data isolation
│   ├── tenant-provisioning/        # Automated client onboarding
│   └── tenant-config/              # Per-client feature flags, theming
├── edge-platform/                  # Edge computing & global CDN
│   ├── edge-functions/             # Vercel/Cloudflare Workers
│   ├── geo-routing/                # Localization, compliance routing
│   └── edge-cache/                 # Multi-tenant caching strategies
├── security-governance/            # Zero-trust, PQC-ready security
│   ├── identity-federation/        # SSO, SAML, OIDC
│   ├── encryption-service/         # Client-side encryption (CSE)
│   └── compliance-engine/          # GDPR, CCPA, NIS2 automation
└── observability/                  # Unified monitoring across tenants
    ├── distributed-tracing/
    ├── cost-attribution/           # Per-client infrastructure costs
    └── performance-budgets/
```

**LAYER 1: Data & Real-Time Analytics**

```
packages/data-platform/
├── unified-cdp/                    # Customer Data Platform core
│   ├── identity-resolution/        # Cross-channel identity graph
│   ├── real-time-streaming/        # Event ingestion (<100ms latency)
│   ├── audience-engine/            # Segmentation, lookalikes
│   └── privacy-vault/              # Consent management, data residency
├── attribution-engine/             # Marketing mix modeling (MMM)
│   ├── multi-touch-attribution/    # Data-driven attribution models
│   ├── incrementality-testing/     # Causal inference, lift analysis
│   └── halo-effect-analyzer/       # Brand impact measurement
└── predictive-analytics/           # AI/ML model serving
    ├── churn-prediction/
    ├── ltv-forecasting/
    └── next-best-action/           # Real-time personalization
```

**LAYER 2: Component Ecosystem (Current Focus)**

```
packages/components/
├── @agency/primitives/             # Design tokens, icons, utilities
│   ├── tokens/                     # CSS custom properties
│   ├── icons/                      # Icon library (via lucide-react)
│   └── motion/                     # Animation primitives
├── @agency/atoms/                  # Atomic components
│   ├── button/                     # Variants, loading states
│   ├── input/                      # Validation, masking
│   ├── typography/                 # Fluid type, variable fonts
│   └── media/                      # Responsive images, lazy loading
├── @agency/molecules/              # Composed atoms
│   ├── forms/                      # Multi-step, conditional logic
│   ├── cards/                      # Content variants
│   ├── navigation/                 # Menus, breadcrumbs
│   └── feedback/                   # Toasts, modals, tooltips
├── @agency/organisms/              # Section components
│   ├── heroes/                     # Layout variants
│   ├── content-sections/           # Feature grids, split content
│   ├── commerce-sections/          # Product showcases, pricing
│   ├── trust-sections/             # Testimonials, logos
│   └── conversion-sections/        # CTAs, lead capture
├── @agency/templates/              # Page-level layouts
│   ├── landing-pages/              # SaaS, product templates
│   ├── content-pages/              # Blog, docs
│   └── commerce-pages/             # PLP, PDP
└── @agency/variants/               # Industry-specific packs
    ├── healthcare-components/      # HIPAA-compliant forms
    ├── fintech-components/         # Secure inputs
    └── b2b-components/             # ROI calculators
```

**LAYER 3: Experience Composition (Current Focus)**

```
packages/experience-layer/
├── site-composer/                  # Site assembly engine
│   ├── page-builder/               # Visual composition (future)
│   ├── a-b-testing/                # Built-in experimentation
│   ├── personalization-engine/     # Rule-based personalization
│   └── preview-service/            # Real-time previews
├── multi-channel/
│   ├── pwa-generator/              # PWA capabilities
│   ├── email-renderer/             # Email components
│   └── iot-adapter/                # Voice, smart displays
├── localization/
│   ├── i18n-core/                  # Translation management
│   ├── cultural-adaptation/        # RTL, formatting
│   └── geo-personalization/        # Location-based content
└── seo-automation/
    ├── technical-seo/              # Structured data, Core Web Vitals
    ├── content-optimization/       # AI-powered meta generation
    └── rank-tracking/              # SERP monitoring
```

---

## 9. Emerging Technologies & Future Considerations

### 9.1 AI Integration (2026 Landscape)

**AI-Powered Development:**

- AI-assisted code generation (GitHub Copilot, Cursor)
- Automated test generation
- AI code review
- Documentation generation

**AI for Marketing Sites:**

- Personalized content generation
- A/B test variant creation
- SEO optimization suggestions
- Chatbot integration
- Image generation (DALL-E, Midjourney)

**Considerations:**

- Data privacy with AI services
- Hallucination risks
- Cost management
- Vendor lock-in

### 9.2 Edge Computing Trends

**Edge-First Architecture:**

- Vercel Edge Functions
- Cloudflare Workers
- AWS Lambda@Edge
- Google Cloud Edge

**Use Cases:**

- Geolocation personalization
- A/B testing at edge
- Authentication/authorization
- API aggregation
- Content transformation

**Performance Benefits:**

- Sub-50ms cold starts
- Global distribution
- Reduced origin load
- Better caching

### 9.3 WebAssembly (Wasm) Considerations

**When to Use:**

- Heavy computation (image processing)
- Cryptography operations
- Gaming/simulations
- Legacy code reuse (C++, Rust)

**2026 Maturity:**

- Browser support: Excellent
- Tooling: Improving rapidly
- Use in marketing sites: Niche but growing

---

## 10. Research Sources

### Primary Sources

- [monorepo.tools](https://monorepo.tools/) - Comprehensive monorepo guide
- [Turborepo Documentation](https://turbo.build/repo/docs) - Official docs
- [shadcn/ui](https://ui.shadcn.com/) - Component library patterns
- [Radix UI](https://www.radix-ui.com/) - Accessibility primitives
- [Next.js Documentation](https://nextjs.org/docs) - Framework docs
- [pnpm Catalogs](https://pnpm.io/catalogs) - Workspace dependency management
- [OWASP CSP Cheat Sheet](https://cheatsheetseries.owasp.org/) - Security best practices
- [web.dev Core Web Vitals](https://web.dev/articles/inp) - Performance metrics
- [Sanity CMS](https://www.sanity.io/) - Headless CMS insights
- [React 19 Release Notes](https://react.dev/blog/2024/12/05/react-19) - React features

### Industry Analysis

- G2 Headless CMS Rankings 2026
- Netlify Blog: Modular web design architecture
- Vercel Engineering: Monorepo patterns
- Martin Fowler: Design Token-Based UI Architecture
- Various technical blogs and conference talks

---

## 11. Key Takeaways

1. **Marketing-first means conversion-optimized** - Every component should drive toward business goals
2. **Monorepo enables consistency** - Shared packages ensure all clients benefit from improvements
3. **Spec-driven development** - Clear specifications lead to better implementations
4. **CSS custom properties enable theming** - Runtime branding without code changes
5. **Headless CMS provides flexibility** - Content separate from presentation
6. **Security and privacy are non-negotiable** - 2026 requires privacy-first analytics
7. **Performance is a feature** - Core Web Vitals directly impact conversions
8. **INP is the new metric** - Interaction responsiveness matters more than ever
9. **AI is changing development** - Embrace AI-assisted tools responsibly
10. **Edge computing is mainstream** - Use edge for personalization and performance

---

_Research compiled: February 2026_
_Enhanced Edition_
_For: Marketing Website Templates Monorepo_
