# Deep Codebase Analysis

## Executive Summary

This document provides a comprehensive analysis of the marketing-websites monorepo, documenting its current architecture, component inventory, metaheader patterns, and recommendations for transforming from template-based to feature-based architecture.

---

## 1. Repository Structure Analysis

### 1.1 High-Level Architecture

```
c:\dev\marketing-websites/
├── .github/               # CI/CD workflows
├── .vscode/               # Editor configuration
├── clients/               # Client implementations (1 item - README only)
├── docs/                  # Documentation (empty)
├── packages/              # Shared packages (76 items, 5 categories)
│   ├── config/            # Shared configurations (ESLint, Tailwind, TS)
│   ├── infra/             # Security, middleware, logging (37 items)
│   ├── integrations/      # Third-party APIs (15 items)
│   ├── ui/                # Shared UI components (11 items)
│   └── utils/             # Shared utilities (4 items)
├── templates/             # Industry templates (97 items)
│   ├── hair-salon/        # Hair salon template (91 items)
│   └── shared/            # Shared template utilities (5 items)
├── package.json           # Root workspace configuration
├── pnpm-workspace.yaml    # pnpm workspace definition
├── turbo.json             # Turborepo configuration
└── tsconfig.base.json     # Base TypeScript configuration
```

### 1.2 Workspace Configuration

**Package Manager:** pnpm 10.29.2 (strictly enforced)
**Monorepo Tool:** Turborepo 2.2.3
**Node.js:** >= 24.0.0

**Workspace Definition (pnpm-workspace.yaml):**
```yaml
packages:
  - 'packages/*'
  - 'packages/config/*'
  - 'templates/*'
  - 'clients/*'
```

**Key Root Scripts:**
- `dev`: Turborepo parallel dev servers
- `build`: Build all packages and projects
- `lint`: ESLint across workspace
- `type-check`: TypeScript type checking
- `test`: Jest test runner
- `format`: Prettier formatting

---

## 2. Shared Packages Deep Dive

### 2.1 @repo/ui - UI Component Library

**Location:** `packages/ui/src/`
**Components (8):**

| Component | File | Features | Status |
|-----------|------|----------|--------|
| **Accordion** | `Accordion.tsx` | Disclosure, collapsible sections | ✅ Complete |
| **Button** | `Button.tsx` | 6 variants, 3 sizes, full accessibility | ✅ Complete |
| **Card** | `Card.tsx` | Basic container with variants | ✅ Complete |
| **Container** | `Container.tsx` | Max-width wrapper | ✅ Complete |
| **Input** | `Input.tsx` | Labels, validation states, errors | ✅ Complete |
| **Section** | `Section.tsx` | Page section wrapper | ✅ Complete |
| **Select** | `Select.tsx` | Dropdown with options | ✅ Complete |
| **Textarea** | `Textarea.tsx` | Multi-line input | ✅ Complete |

**Entry Point:** `packages/ui/src/index.ts`

**Metaheader Pattern:**
```typescript
// File: packages/ui/src/components/Button.tsx  [TRACE:FILE=packages.ui.components.Button]
// Purpose: Reusable button component providing consistent styling...
//
// Exports / Entry: Button component, ButtonProps interface
// Used by: All application components requiring button interactions
//
// Invariants:
// - Must maintain consistent visual hierarchy across all variants
// - Must be fully accessible with proper ARIA attributes
// - Must forward refs properly for DOM manipulation
//
// Status: @public
// Features:
// - [FEAT:UI] Consistent button styling and behavior
// - [FEAT:ACCESSIBILITY] Full keyboard and screen reader support
// - [FEAT:RESPONSIVE] Multiple size variants for different contexts
// - [FEAT:DESIGN] Multiple visual variants for different use cases
```

**Analysis:**
- ✅ Well-documented with comprehensive metaheaders
- ✅ Uses CSS custom properties for theming
- ✅ Full TypeScript support with exported types
- ✅ Accessibility-first design (ARIA attributes, keyboard nav)
- ⚠️ Limited component set - needs expansion
- ⚠️ No compound component patterns
- ⚠️ Missing: Dialog, Tabs, Toast, Dropdown Menu, Navigation Menu

### 2.2 @repo/utils - Utility Functions

**Location:** `packages/utils/src/`
**Exports:**

| Function | File | Purpose |
|----------|------|---------|
| **cn** | `cn.ts` | Tailwind class merging (clsx + tailwind-merge) |

**Metaheader Pattern:**
```typescript
// File: packages/utils/src/cn.ts  [TRACE:FILE=packages.utils.cn]
// Purpose: CSS class merging utility that combines clsx for conditional classes...
//
// Invariants:
// - Must handle both string and array inputs gracefully
// - Tailwind classes must be properly deduplicated
// - Output must be a valid string for className props
//
// Status: @public
// Features:
// - [FEAT:STYLING] Tailwind CSS class merging and deduplication
// - [FEAT:UTILITIES] Conditional class name resolution
```

**Analysis:**
- ✅ Properly typed with TypeScript
- ✅ Well-documented utility
- ⚠️ Minimal scope - only class merging
- ⚠️ Missing: Date formatting, validation helpers, array/object utilities

### 2.3 @repo/infra - Infrastructure & Security

**Location:** `packages/infra/`
**Modules:**

| Module | Location | Features |
|--------|----------|----------|
| **CSP** | `security/csp.ts` | Content Security Policy, nonce generation |
| **Rate Limiting** | `security/rate-limit.ts` | Sliding window, presets |
| **Security Headers** | `security/security-headers.ts` | HTTP security headers |
| **Sanitization** | `security/sanitize.ts` | XSS prevention, DOMPurify |
| **Request Validation** | `security/request-validation.ts` | Input validation |
| **Middleware Factory** | `middleware/create-middleware.ts` | Request middleware |
| **Logging** | `logger/index.ts` | Structured logging, Sentry integration |
| **Sentry** | `sentry/` | Error tracking, sanitization |
| **Context** | `context/` | Request context (server/client safe) |

**Key Features Identified:**

**CSP (Content Security Policy):**
- 128-bit entropy nonce generation
- strict-dynamic support
- Development vs production policies
- Violation reporting

**Rate Limiting Presets:**
```typescript
contact: { maxRequests: 3, windowMs: 1 hour }
booking: { maxRequests: 5, windowMs: 1 hour }
api: { maxRequests: 100, windowMs: 1 minute }
auth: { maxRequests: 5, windowMs: 15 minutes }
upload: { maxRequests: 10, windowMs: 1 hour }
general: { maxRequests: 20, windowMs: 1 hour }
```

**Analysis:**
- ✅ Comprehensive security infrastructure
- ✅ Privacy-first approach (no IP storage)
- ✅ 2026 security best practices (CSP, nonces)
- ✅ Structured logging with Sentry integration
- ✅ Well-documented with inline comments
- ✅ Test coverage present (`__tests__/`)`

### 2.4 @repo/integrations - Third-Party APIs

**Location:** `packages/integrations/`
**Integrations:**

| Integration | Location | Features |
|-------------|----------|----------|
| **Analytics** | `analytics/` | Consent-gated analytics, GTM, GA4 |
| **HubSpot** | `hubspot/` | CRM integration, form submissions |
| **Supabase** | `supabase/` | Database, auth, storage |

**Analytics Features:**
- Consent management
- Google Analytics 4 integration
- Google Tag Manager support
- Privacy-compliant tracking

**Analysis:**
- ✅ Privacy-first analytics approach
- ✅ Modular integration structure
- ⚠️ Limited integration ecosystem
- ⚠️ Missing: Mailchimp, Stripe, Calendly, OpenAI, etc.

### 2.5 @repo/config - Shared Configurations

**Location:** `packages/config/`
**Configs:**

| Config | File | Purpose |
|--------|------|---------|
| **Tailwind Preset** | `tailwind-preset.js` | Semantic color tokens, design system |
| **ESLint Config** | `eslint-config/next.js` | Next.js + TypeScript rules |
| **TypeScript Config** | `typescript-config/` | Base TS configurations |

**Tailwind Preset Features:**
- Semantic color mapping (primary, secondary, accent, muted)
- CSS custom property integration
- Border radius tokens
- Typography configuration (heading, body fonts)

**Analysis:**
- ✅ Comprehensive design token system
- ✅ CSS custom properties for theming
- ✅ Shared ESLint/TypeScript configs
- ⚠️ Tailwind preset hardcodes specific values

---

## 3. Templates Analysis

### 3.1 hair-salon Template

**Location:** `templates/hair-salon/`
**Structure:**

```
templates/hair-salon/
├── app/                   # Next.js App Router (28 items)
│   ├── layout.tsx         # Root layout with CSP, metadata
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── blog/              # Blog pages (listing, detail)
│   ├── book/              # Booking page
│   ├── contact/           # Contact page
│   ├── gallery/           # Gallery page
│   ├── pricing/           # Pricing page
│   ├── services/          # Service pages (5 routes)
│   └── team/              # Team page
├── components/            # Shared components (11 items)
│   ├── AnalyticsConsentBanner.tsx
│   ├── Breadcrumbs.tsx
│   ├── ErrorBoundary.tsx
│   ├── FinalCTA.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── InstallPrompt.tsx
│   ├── Navigation.tsx
│   ├── SkipToContent.tsx
│   ├── SocialProof.tsx
│   └── ValueProps.tsx
├── features/              # Feature modules (20 items)
│   ├── blog/              # Blog functionality
│   ├── booking/           # Booking system
│   ├── contact/           # Contact forms
│   ├── search/            # Search functionality
│   └── services/          # Services display
├── lib/                   # Utilities (14 items)
│   ├── actions/           # Server actions
│   ├── constants.ts       # Site constants
│   ├── env.ts             # Environment validation
│   └── utils.ts           # Utility functions
├── content/               # MDX content (5 items)
│   └── blog/              # Blog posts
└── site.config.ts         # Site configuration
```

### 3.2 Feature Module Analysis

**Feature Module Pattern (Barrel Export):**
```typescript
// features/booking/index.ts
// Component exports
export { default as BookingForm } from './components/BookingForm';

// Library exports
export * from './lib/booking-schema';
export * from './lib/booking-actions';
export * from './lib/booking-providers';
```

**Features Identified:**

| Feature | Location | Components | Schema | Actions | Status |
|---------|----------|------------|--------|---------|--------|
| **Blog** | `features/blog/` | BlogPostContent | ✅ | ✅ | Complete |
| **Booking** | `features/booking/` | BookingForm | ✅ | ✅ | Complete |
| **Contact** | `features/contact/` | ContactForm | ✅ | ✅ | Complete |
| **Search** | `features/search/` | - | - | ✅ | Partial |
| **Services** | `features/services/` | ServicesOverview | - | - | Partial |

**Analysis:**
- ✅ Clean feature module architecture
- ✅ Barrel exports for clean imports
- ✅ Schema validation with Zod
- ✅ Server actions for form submission
- ⚠️ Search feature incomplete (no UI component)
- ⚠️ Services feature minimal (just overview)

### 3.3 Components Inventory

**Template-Specific Components:**

| Component | Features | TRACE ID |
|-----------|----------|----------|
| **AnalyticsConsentBanner** | [FEAT:ANALYTICS] [FEAT:PRIVACY] [FEAT:UX] | components.AnalyticsConsentBanner |
| **Breadcrumbs** | [FEAT:UX] [FEAT:SEO] [FEAT:ACCESSIBILITY] | components.Breadcrumbs |
| **ErrorBoundary** | [FEAT:ERROR_HANDLING] [FEAT:UX] | components.ErrorBoundary |
| **FinalCTA** | [FEAT:MARKETING] [FEAT:CONVERSION] | components.FinalCTA |
| **Footer** | [FEAT:UX] [FEAT:SEO] [FEAT:NAVIGATION] | components.Footer |
| **Hero** | [FEAT:MARKETING] [FEAT:UX] [FEAT:ACCESSIBILITY] [FEAT:PERFORMANCE] | components.Hero |
| **InstallPrompt** | [FEAT:PWA] [FEAT:UX] | components.InstallPrompt |
| **Navigation** | [FEAT:NAVIGATION] [FEAT:UX] [FEAT:ACCESSIBILITY] [FEAT:MOBILE] | components.Navigation |
| **SkipToContent** | [FEAT:ACCESSIBILITY] | components.SkipToContent |
| **SocialProof** | [FEAT:MARKETING] [FEAT:SOCIAL] [FEAT:CONVERSION] | components.SocialProof |
| **ValueProps** | [FEAT:MARKETING] [FEAT:UX] | components.ValueProps |

**Analysis:**
- ✅ All components have comprehensive feature tags
- ✅ Accessibility prioritized (SkipToContent, ARIA labels)
- ✅ Marketing-focused (Hero, FinalCTA, SocialProof, ValueProps)
- ⚠️ Limited component variety (11 components total)
- ⚠️ No layout variants (only single Hero style)
- ⚠️ No animation/transition components

### 3.4 Site Configuration Analysis

**site.config.ts Structure:**
```typescript
interface SiteConfig {
  id: string;                    // Site identifier
  name: string;                  // Site name
  tagline: string;               // Marketing tagline
  description: string;           // SEO description
  url: string;                   // Site URL
  navLinks: NavLink[];           // Navigation structure
  socialLinks: SocialLink[];     // Social media
  footer: FooterConfig;          // Footer columns and links
  contact: ContactConfig;        // Business contact info
  seo: SEOConfig;                // SEO metadata
  theme: ThemeConfig;            // CSS color values
  conversionFlow: ConversionConfig; // Booking/service flow
}
```

**Analysis:**
- ✅ Centralized configuration
- ✅ Type-safe with TypeScript
- ✅ Comprehensive (SEO, theme, contact, navigation)
- ✅ Supports conversion flow configuration
- ⚠️ Theme values are hardcoded HSL (not customizable)
- ⚠️ Limited conversion flow types (only 'booking')

---

## 4. Metaheader & Documentation Patterns

### 4.1 File-Level Metaheader Format

**Standard Structure:**
```typescript
// File: [relative-path]  [TRACE:FILE=identifier]
// Purpose: [Single-line description]
//          [Optional continuation]
//
// Exports / Entry: [What this file exports]
// Used by: [What uses this file]
//
// Invariants:
// - [Constraint 1]
// - [Constraint 2]
//
// Status: @public | @internal | @deprecated
// Features:
// - [FEAT:CATEGORY] Description
// - [FEAT:CATEGORY] Description
```

### 4.2 Inline Code Documentation

**TRACE Annotations:**
```typescript
// [TRACE:FUNC=identifier]           // Function trace
// [TRACE:INTERFACE=identifier]      // Interface trace
// [TRACE:CONST=identifier]        // Constant trace
// [TRACE:BLOCK=identifier]        // Code block trace
```

**Feature Tags:**
```typescript
// [FEAT:MARKETING]      // Conversion optimization
// [FEAT:SEO]            // Search engine optimization
// [FEAT:UX]             // User experience
// [FEAT:ACCESSIBILITY]  // WCAG compliance
// [FEAT:PERFORMANCE]    // Speed optimization
// [FEAT:SECURITY]       // Security features
// [FEAT:PRIVACY]        // Privacy/GDPR compliance
// [FEAT:ANALYTICS]      // Tracking and measurement
// [FEAT:MOBILE]         // Mobile/responsive
// [FEAT:PWA]            // Progressive web app
// [FEAT:DESIGN]         // Visual design
// [FEAT:COMPONENTS]     // UI components
// [FEAT:FORMS]          // Form handling
// [FEAT:BOOKING]        // Appointment booking
// [FEAT:ERROR_HANDLING] // Error management
// [FEAT:NAVIGATION]     // Site navigation
// [FEAT:CONVERSION]     // Conversion optimization
// [FEAT:SOCIAL]         // Social features
```

**NOTE Comments:**
```typescript
// NOTE: [Detailed explanation of why/how]
```

### 4.3 Documentation Coverage Analysis

**Well-Documented Areas:**
- ✅ All package entry points have comprehensive metaheaders
- ✅ All UI components have full TRACE annotations
- ✅ Infrastructure modules extensively documented
- ✅ Feature modules have clear barrel exports
- ✅ Complex functions have inline NOTES

**Documentation Gaps:**
- ⚠️ Template page components lack metaheaders
- ⚠️ Some lib/utilities lack inline documentation
- ⚠️ Test files lack documentation
- ⚠️ Configuration files (next.config.js) lack documentation

---

## 5. Current State Assessment

### 5.1 Strengths

1. **Architecture**
   - Clean monorepo structure with pnpm + Turborepo
   - Well-defined package boundaries
   - Feature-based module organization
   - Barrel exports for clean APIs

2. **Security & Privacy**
   - 2026 CSP best practices
   - Privacy-first rate limiting
   - Consent-gated analytics
   - Comprehensive security headers

3. **Developer Experience**
   - TypeScript strict mode
   - Comprehensive metaheader documentation
   - Shared configurations (ESLint, Prettier, Tailwind)
   - Feature tag system for organization

4. **Marketing Focus**
   - Conversion-optimized components (Hero, FinalCTA, SocialProof)
   - Site configuration for business info
   - SEO-structured metadata
   - Analytics integration

5. **Accessibility**
   - ARIA attributes throughout
   - Keyboard navigation support
   - Skip-to-content links
   - Semantic HTML

### 5.2 Weaknesses

1. **Component Library**
   - Limited component set (only 8 UI components)
   - No compound component patterns
   - Missing common patterns (Dialog, Tabs, Toast, etc.)
   - No animation/transition components

2. **Template Dependency**
   - Hardcoded hair-salon specific content
   - Templates need to be copied (not truly configurable)
   - No runtime theming (build-time only)
   - Industry-specific logic in components

3. **Feature Gaps**
   - Incomplete search feature
   - No e-commerce capabilities
   - Limited form field types
   - No content management system integration

4. **Scalability**
   - Single template approach (hair-salon only)
   - No multi-tenant architecture
   - Clients folder empty (no examples)
   - No component variant system

5. **Integration Ecosystem**
   - Limited third-party integrations
   - Missing: Email (Mailchimp, SendGrid), Payments (Stripe), Scheduling (Calendly)
   - No AI/ML integrations

### 5.3 Technical Debt

1. **Build System**
   - ESLint dependencies missing in packages/ui and packages/utils (per README)
   - Turbo v2.2.3 → v2.8.4 update needed

2. **Testing**
   - TESTING_STATUS.md claims passing but lint fails
   - Limited test coverage documentation

3. **Configuration**
   - Hardcoded theme values in site.config.ts
   - Environment variable duplication

---

## 6. Transformation Recommendations

### 6.1 From Templates to Features

**Current State:**
```
templates/hair-salon/ → copied to → clients/my-client/
```

**Target State:**
```
packages/features/       # Shared feature modules
  ├── hero/              # Hero variants
  ├── services/          # Service showcases
  ├── team/              # Team displays
  ├── testimonials/      # Social proof
  ├── booking/           # Appointment scheduling
  ├── contact/           # Contact forms
  ├── blog/              # Content publishing
  └── gallery/           # Portfolio showcase

clients/my-client/       # Minimal client-specific code
  ├── site.config.ts     # Configuration only
  ├── app/               # Page routes (thin wrappers)
  └── public/            # Assets
```

### 6.2 Component Library Expansion

**Priority Additions:**

| Tier | Components |
|------|------------|
| **Critical** | Dialog/Modal, Toast/Notification, Tabs, Dropdown Menu |
| **High** | Carousel/Slider, Image Gallery, Video Player, Map Embed |
| **Medium** | Accordion (enhanced), Tooltip, Popover, Skeleton |
| **Marketing** | TestimonialCard, PricingTable, FeatureGrid, StatsCounter |

### 6.3 Configuration-Driven Architecture

**Proposed site.config.ts Enhancements:**
```typescript
interface SiteConfig {
  // ... existing fields
  
  features: {
    hero: 'centered' | 'split' | 'video' | 'carousel';
    services: 'grid' | 'list' | 'tabs' | 'accordion';
    team: 'grid' | 'carousel' | 'detailed';
    testimonials: 'carousel' | 'grid' | 'marquee';
    contact: 'simple' | 'multi-step' | 'with-scheduling';
    booking: boolean;
    blog: boolean;
    gallery: boolean;
    pricing: boolean;
  };
  
  industry: 'salon' | 'restaurant' | 'law-firm' | 'medical' | 'retail' | 'general';
  
  integrations: {
    analytics?: 'google' | 'plausible' | 'none';
    crm?: 'hubspot' | 'none';
    booking?: 'internal' | 'calendly' | 'none';
    email?: 'mailchimp' | 'sendgrid' | 'none';
  };
}
```

### 6.4 Industry-Specific Schema Support

**Structured Data Templates:**
- LocalBusiness (generic)
- HairSalon (beauty/wellness)
- Restaurant (food/hospitality)
- ProfessionalService (legal/medical/consulting)
- Store (retail)

---

## 7. Conclusion

The marketing-websites monorepo has a solid foundation with:
- Modern tooling (Next.js 15, React 19, pnpm, Turborepo)
- Strong security and privacy practices
- Good documentation patterns (metaheaders, TRACE annotations)
- Marketing-focused component architecture

**Critical Path for Transformation:**
1. Extract template features to shared `packages/features/`
2. Expand UI component library (critical components)
3. Implement configuration-driven page generation
4. Create industry-agnostic feature variants
5. Deprecate and remove templates/
6. Build client examples demonstrating flexibility

**Estimated Effort:**
- Component library expansion: 2-3 weeks
- Feature extraction: 3-4 weeks
- Configuration system: 1-2 weeks
- Industry schemas: 1 week
- Documentation & examples: 1-2 weeks

**Total: 8-12 weeks for complete transformation**

---

*Analysis completed: February 2026*
*Analyzed: 200+ files across packages and templates*
