# Requirements Document: Marketing-First Enhancements

## Introduction

This document specifies requirements for a **multi-industry marketing website template system**
with marketing-first best practices aligned with 2026 industry standards. The enhancements focus
on conversion optimization, social proof, trust building, and visual portfolio showcasing to drive
bookings and client engagement across **service-based businesses** (hair salons, nail salons,
dental practices, fitness centers, consulting, and similar appointment-based or service-focused
industries).

**Scope**: These features are implemented at the **template level** (templates/hair-salon/) and
are designed to be extracted into **shared components** (templates/shared/) so they can be used
across **multiple industry templates** (nail salons, tanning, restaurants, law firms, etc.) and
**deployed independently** for multiple clients (clients/[client-name]/).

The target posture shifts the repo from a single-template hair salon site to a **productized
marketing system** with:

- Multi-industry template reusability
- Evergreen maintenance and automated dependency management
- Golden-path initialization and demo modes
- Repeatable conversion science with quality gates
- Comprehensive proof artifacts (performance reports, security scans, accessibility audits)
- Centralized integration platform with consent gating and default-off providers

**Current Status**: Phase 1 (Core Site MVP) - 4/5 features complete. Phase 2+ (Marketing-First
Enhancements) in planning.

**Note**: As of Feb 2026, Next.js 15 is Maintenance LTS and Next.js 16 is Active LTS. Plan for
an upgrade path when scheduling implementation.

## Glossary

- **System**: The hair salon website application (Next.js 15 web application)
- **Client**: A person visiting the website who may become a customer
- **Customer**: A person who has booked or received services from the salon
- **Testimonial**: A written or video review from a customer about their experience
- **Before_After_Gallery**: A visual showcase displaying client hair transformations
- **Trust_Badge**: A visual indicator of certifications, awards, or professional memberships
- **CTA**: Call-to-action button or element designed to drive conversions
- **Social_Proof**: Evidence of customer satisfaction through reviews, ratings, and testimonials
- **Transformation**: A before/after hair service result with accompanying images
- **Portfolio_Item**: A single entry in the gallery showcasing work (may include before/after images, category, description)
- **Review_Aggregator**: System component that collects and displays reviews from multiple sources
- **Conversion_Element**: UI component designed to encourage booking actions (urgency indicators, CTAs, pricing displays)
- **Stylist_Profile**: Enhanced team member page with portfolio, certifications, and reviews
- **Service_Detail_Page**: Individual page for each service category with detailed information
- **Lead_Capture**: System for collecting potential customer contact information
- **Schema_Markup**: Structured data for search engines (JSON-LD format)
- **Integration_Registry**: Central configuration that declares all integrations and their enablement state
- **Consent_Category**: Consent grouping that gates tracking and marketing scripts (necessary, functional, analytics, marketing)
- **Script_Loader**: Centralized loader that controls if/when third-party scripts load
- **Verified_Badge**: Review badge indicating `source_verified` (platform) or `booking_verified` (appointment confirmed)
- **Golden_Path_Setup**: One-command initializer that generates config, content, and environment stubs
- **Experiment**: A controlled variant test with deterministic bucketing and exposure tracking
- **Event_Inspector**: Dev-only panel that shows emitted events and validates PII-free payloads
- **Quality_Gates**: CI-enforced checks with performance, accessibility, and privacy budgets
- **SBOM**: Software bill of materials for dependency transparency
- **Demo_Mode**: Seeded or routed mode that showcases all features and consent states
- **Repo_Scorecard**: README badges sourced from CI artifacts and quality gates
- **Upgrade_Posture**: Policy for evergreen patching and planned major upgrades
- **Template**: Industry-specific website package (templates/hair-salon/, templates/restaurant/) that serves as a starting point for client projects
- **Template_Feature**: Feature implemented at the template level (e.g., testimonial display, portfolio gallery) designed to be extracted into shared components for reuse across templates
- **Shared_Component**: Reusable feature extracted to templates/shared/ for use across multiple industry templates (booking forms, contact forms, analytics integration, social proof components)
- **Client_Project**: Production website for a specific business deployed from a template with customized branding and content (clients/[client-name]/)
- **Service_Business**: Business model based on appointments or services (hair salons, dental practices, fitness centers, consulting firms, nail salons, tanning salons)
- **Multi_Industry_Applicability**: Feature designed to work across multiple service-based industries without industry-specific code
- **Template_Inheritance**: Client projects inherit template structure, features, and shared components; can override/customize for specific branding
- **Shared_Extraction**: Process of identifying generic features implemented in one template and moving them to shared components for reuse across templates
- **Industry_Customization**: Theming, configuration, or feature flags that adapt shared components and templates for specific industry needs

## Global Constraints

1. **Truthfulness**: Any urgency or recent-activity messaging MUST be backed by a real data source or omitted.
2. **Consent**: Analytics and marketing scripts MUST NOT load before consent; use Consent Mode v2 when Google tags are enabled.
3. **Interstitials**: Avoid intrusive interstitials on mobile and on landing-from-search contexts; prefer inline or bottom banners.
4. **PII**: Analytics and tracking events MUST NOT include PII.
5. **Evergreen**: The system MUST track latest patches for the current major and maintain a documented path to the next major.
6. **Runtime**: Node 24 is the recommended engine; Node 20 is a fallback only when explicitly required.
7. **Automated Upkeep**: Dependency updates MUST be automated; patch updates auto-merge, minors require CI + changelog review.
8. **Proof Artifacts**: CI MUST publish performance, accessibility, security, and consent proof artifacts on PRs.

## Assumptions and Data Sources

- Booking provider availability and inventory data are only available when the configured provider exposes APIs or embeds.
- Post-appointment events (review requests, retention stats) require booking/POS webhooks or CRM integrations.
- Stylist availability requires provider support or manual scheduling rules.
- Review aggregation is limited to sources with authorized API access; no scraping.

## Requirements

**Scope Clarification**

- Requirement 1 covers testimonial display and presentation.
- Requirement 7 covers review collection, moderation, and aggregation workflows.
- Requirement 2 covers the client-facing gallery experience.
- Requirement 8 covers admin tools and storage pipeline for media.

### Requirement 1: Enhanced Social Proof System

**User Story:** As a potential client, I want to see authentic reviews and testimonials from real customers, so that I can trust the salon's quality and make an informed booking decision.

#### Acceptance Criteria

1. THE System SHALL display customer testimonials with name, date, and optional photo
2. WHEN a testimonial includes a video, THE System SHALL embed and play the video content
3. THE System SHALL display aggregate star ratings (1-5 stars) prominently on the homepage
4. THE System SHALL show the total number of reviews alongside the average rating
5. WHEN displaying testimonials, THE System SHALL include the service received and date of service
6. THE System SHALL support testimonials from multiple sources (Google, Facebook, direct submissions)
7. WHEN a client submits a testimonial, THE System SHALL request permission to use their photo
8. THE System SHALL display testimonials in a rotating carousel or grid layout
9. WHEN testimonials are displayed, THE System SHALL show verified badges using `source_verified` or `booking_verified` modes only when substantiated
10. THE System SHALL filter and display testimonials by service category when viewing service pages

### Requirement 2: Before/After Gallery Enhancement

**User Story:** As a potential client, I want to see real transformation examples of the salon's work, so that I can visualize the quality and style capabilities before booking.

#### Acceptance Criteria

1. THE System SHALL display before and after images side-by-side for each transformation
2. WHEN a client views the gallery, THE System SHALL provide category filters (cuts, color, treatments, special occasions, extensions)
3. THE System SHALL display transformation captions describing the service performed
4. WHEN uploading transformation images, THE System SHALL optimize images for web performance
5. THE System SHALL support high-resolution image viewing through a lightbox or modal
6. WHEN displaying transformations, THE System SHALL include the stylist name who performed the service
7. THE System SHALL allow sorting transformations by date, popularity, or category
8. WHEN a transformation is clicked, THE System SHALL display detailed information including service duration and products used
9. THE System SHALL integrate with Instagram to display recent salon posts
10. THE System SHALL integrate with Instagram Graph API (Business/Creator) as an optional feature and provide a manual ingestion fallback
11. THE System SHALL request and store client permission before displaying their transformation photos

### Requirement 3: Trust and Credibility Indicators

**User Story:** As a potential client, I want to see the salon's certifications, awards, and professional credentials, so that I can feel confident in their expertise and professionalism.

#### Acceptance Criteria

1. THE System SHALL display professional certifications for the salon and individual stylists
2. THE System SHALL showcase industry awards and recognitions with dates
3. WHEN displaying credentials, THE System SHALL include years of experience for the salon and each stylist
4. THE System SHALL display professional association memberships (e.g., Intercoiffure, American Board of Certified Haircolorists)
5. THE System SHALL show satisfaction guarantees or service warranties prominently
6. WHEN displaying trust indicators, THE System SHALL include insurance and safety protocol information
7. THE System SHALL display trust badges (secure payment, licensed professionals, insured)
8. THE System SHALL show business longevity indicators (e.g., "Serving the community since 2010")
9. WHEN a certification is displayed, THE System SHALL link to the issuing organization's verification page
10. THE System SHALL display client retention statistics only when backed by CRM/POS data sources

### Requirement 4: Conversion Rate Optimization

**User Story:** As a salon owner, I want strategic conversion elements throughout the website, so that I can maximize booking inquiries and reduce bounce rates.

#### Acceptance Criteria

1. THE System SHALL display a sticky booking button that remains visible during page scrolling
2. WHEN a client views a service page, THE System SHALL display at least three CTAs at strategic positions
3. THE System SHALL show urgency indicators only when backed by a real booking inventory feed; otherwise omit or show next available appointment
4. WHEN displaying special offers, THE System SHALL include expiration dates or countdown timers only when offer windows are real
5. THE System SHOULD implement exit-intent or scroll-trigger lead capture experiments, gated by UX and SEO constraints
6. WHEN a client attempts to leave the site, THE System SHOULD use non-intrusive formats on mobile (inline modules or bottom banners)
7. THE System SHALL display pricing transparency (starting prices or price ranges) on service pages
8. WHEN a client hovers over a CTA button, THE System SHALL provide visual feedback (animation, color change)
9. THE System SHALL display social proof near CTAs (e.g., "Join 5,000+ happy clients")
10. THE System SHALL display recent booking activity only when backed by a real event stream and anonymized
11. WHEN a client views the homepage, THE System SHALL display the primary CTA above the fold
12. THE System SHALL provide multiple contact methods (phone, form, chat) prominently displayed

### Requirement 5: Enhanced Team Profiles

**User Story:** As a potential client, I want to learn about individual stylists' expertise and see their work, so that I can choose the right stylist for my needs.

#### Acceptance Criteria

1. WHEN viewing a stylist profile, THE System SHALL display their individual portfolio of work
2. THE System SHALL show certifications and specialties for each stylist
3. WHEN a stylist has client reviews, THE System SHALL display them on their profile page
4. THE System SHALL allow clients to filter stylists by specialty (color, cuts, extensions, etc.)
5. WHEN displaying stylist profiles, THE System SHALL include years of experience and training background
6. THE System SHALL provide social media links for each stylist (Instagram, TikTok)
7. WHEN a client selects a stylist, THE System SHALL show their availability only if the provider supports it; otherwise show booking preference or contact option
8. THE System SHALL display before/after examples specific to each stylist's work
9. WHEN viewing a stylist profile, THE System SHALL show their average rating and number of reviews
10. THE System SHALL highlight signature services or specializations for each stylist

### Requirement 6: Service Page Enhancements

**User Story:** As a potential client, I want detailed information about each service including pricing and examples, so that I can understand what to expect and make informed decisions.

#### Acceptance Criteria

1. WHEN viewing a service page, THE System SHALL display detailed service descriptions with benefits
2. THE System SHALL show pricing ranges or starting prices for each service
3. WHEN displaying service information, THE System SHALL include estimated duration
4. THE System SHALL show before/after examples relevant to each specific service
5. WHEN a client views a service page, THE System SHALL display an FAQ section addressing common questions
6. THE System SHALL list products used or recommended for each service
7. WHEN displaying service pricing, THE System SHALL explain factors that affect final cost
8. THE System SHALL show related or complementary services with each service page
9. WHEN a service has multiple tiers or options, THE System SHALL clearly differentiate them
10. THE System SHALL display stylist recommendations for each service type
11. WHEN viewing a service page, THE System SHALL show client testimonials specific to that service
12. THE System SHALL provide a "What to Expect" section describing the service process

### Requirement 7: Review Collection and Management

**User Story:** As a salon owner, I want to collect and manage customer reviews efficiently, so that I can build social proof and improve services based on feedback.

#### Acceptance Criteria

1. WHEN a customer completes a service, THE System SHALL send an automated review request email
2. THE System SHALL provide a simple review submission form accessible via email link
3. WHEN a customer submits a review, THE System SHALL request a star rating (1-5 stars)
4. THE System SHALL allow customers to upload photos with their reviews
5. WHEN a review is submitted, THE System SHALL send a confirmation to the customer
6. THE System SHALL allow salon administrators to moderate reviews before public display
7. WHEN a negative review is received, THE System SHALL notify administrators immediately
8. THE System SHALL aggregate reviews from Google Business Profile for managed locations; Facebook aggregation is optional and best-effort
9. WHEN displaying aggregated reviews, THE System SHALL show the source platform
10. THE System SHALL calculate and update average ratings automatically when new reviews are added

### Requirement 8: Visual Content Management

**User Story:** As a salon administrator, I want to easily upload and manage before/after photos and portfolio content, so that I can keep the website fresh and showcase recent work.

#### Acceptance Criteria

1. THE System SHALL provide an admin interface for uploading before/after image pairs
2. WHEN uploading images, THE System SHALL automatically optimize and resize for web performance
3. THE System SHALL allow administrators to add captions, categories, and tags to portfolio items
4. WHEN uploading transformation photos, THE System SHALL prompt for client permission documentation
5. THE System SHALL support bulk upload of multiple portfolio items
6. WHEN managing portfolio items, THE System SHALL allow editing, archiving, and deletion
7. THE System SHALL automatically generate thumbnails for gallery views
8. WHEN images are uploaded, THE System SHALL validate file types (JPEG, PNG, WebP) and size limits
9. THE System SHALL organize portfolio items by date, category, and stylist
10. THE System SHALL provide image cropping and basic editing tools within the admin interface

### Requirement 9: SEO and Schema Markup

**User Story:** As a salon owner, I want the website optimized for local search and rich snippets, so that potential clients can easily find us through search engines.

#### Acceptance Criteria

1. THE System SHALL implement LocalBusiness schema markup with complete business information
2. WHEN reviews are displayed, THE System SHALL include AggregateRating schema markup where applicable, with the understanding that rich results are not guaranteed
3. THE System SHALL implement Service schema markup for each service offering
4. WHEN displaying team members, THE System SHALL include Person schema markup
5. THE System SHALL generate an XML sitemap including all service and portfolio pages
6. WHEN a before/after gallery item is displayed, THE System SHALL include ImageObject schema markup
7. THE System SHALL implement BreadcrumbList schema markup for navigation
8. THE System SHALL include OpenGraph and Twitter Card meta tags for social sharing
9. WHEN service pages are rendered, THE System SHALL include FAQ schema markup and only attach review markup where the review content is visible for the reviewed item
10. THE System SHALL implement Organization schema markup with social media profiles
11. THE System SHALL document that self-serving review snippets may not appear in rich results and SHOULD NOT promise stars in SERP

### Requirement 10: Mobile-First Responsive Design

**User Story:** As a mobile user, I want all new features to work seamlessly on my smartphone, so that I can browse and book services on the go.

#### Acceptance Criteria

1. WHEN viewing on mobile devices, THE System SHALL display all conversion elements optimized for touch interaction
2. THE System SHALL ensure sticky CTAs do not obstruct content on mobile screens
3. WHEN viewing the before/after gallery on mobile, THE System SHALL use swipe gestures for navigation
4. THE System SHALL optimize image loading for mobile networks (lazy loading, responsive images)
5. WHEN viewing testimonials on mobile, THE System SHALL use a card-based layout with horizontal scrolling
6. THE System SHALL ensure all forms are mobile-friendly with appropriate input types
7. WHEN displaying exit-intent popups on mobile, THE System SHALL use scroll-based triggers instead
8. THE System SHALL ensure touch targets meet minimum size requirements (44x44px)
9. WHEN viewing stylist profiles on mobile, THE System SHALL prioritize key information above the fold
10. THE System SHALL maintain fast load times on mobile (Core Web Vitals compliance)

### Requirement 11: Analytics and Conversion Tracking

**User Story:** As a salon owner, I want to track conversion metrics and user behavior, so that I can optimize marketing efforts and measure ROI.

#### Acceptance Criteria

1. THE System SHALL track CTA click-through rates for all booking buttons
2. WHEN a client submits a contact form, THE System SHALL fire a conversion event to analytics
3. THE System SHALL track which testimonials receive the most engagement
4. WHEN clients interact with the before/after gallery, THE System SHALL track view duration and clicks
5. THE System SHALL measure bounce rates for service pages
6. WHEN exit-intent popups are displayed, THE System SHALL track conversion rates
7. THE System SHALL track which traffic sources lead to the most bookings
8. WHEN clients view stylist profiles, THE System SHALL track which stylists receive the most views
9. THE System SHALL provide a dashboard showing key conversion metrics
10. THE System SHALL track mobile vs desktop conversion rates separately

### Requirement 12: Performance and Accessibility

**User Story:** As any user, I want the enhanced website to load quickly and be accessible, so that I can have a smooth experience regardless of my device or abilities.

#### Acceptance Criteria

1. THE System SHALL meet Core Web Vitals targets (LCP <= 2.5s, INP <= 200ms, CLS <= 0.1) on key pages
2. WHEN new images are added, THE System SHALL use modern formats (WebP, AVIF) with fallbacks
3. THE System SHALL implement lazy loading for below-the-fold images and videos
4. WHEN displaying video testimonials, THE System SHALL provide captions or transcripts
5. THE System SHALL ensure all interactive elements are keyboard accessible
6. WHEN using screen readers, THE System SHALL provide appropriate ARIA labels for all conversion elements
7. THE System SHALL maintain WCAG 2.1 AA compliance for all new features
8. WHEN displaying modals or popups, THE System SHALL trap focus and provide close mechanisms
9. THE System SHALL ensure color contrast ratios meet accessibility standards
10. THE System SHALL provide skip links for repetitive navigation elements
11. THE System SHALL keep third-party JavaScript budgets within defined thresholds on key pages (default: <= 200KB gzip unless explicitly approved)

### Requirement 13: Integration Architecture and Consent Gating

**User Story:** As a salon owner, I want all integrations to be present but default-off with consent gating, so that the site remains compliant and fast until I enable the tools I need.

#### Acceptance Criteria

1. THE System SHALL declare all integrations in a single integration registry/config object
2. THE System SHALL keep all integrations disabled by default until explicitly enabled
3. THE System SHALL provide a consent state model with categories: necessary, functional, analytics, marketing
4. THE System SHALL block analytics and marketing scripts until consent is granted
5. THE System SHALL load third-party scripts only after consent and only when needed (interaction or page load rules)
6. THE System SHALL provide a unified event bus for conversion and engagement events
7. THE System SHALL ensure publishable keys only are exposed to the client
8. THE System SHALL support Google Consent Mode v2 signals when Google tags are enabled
9. THE System SHALL update CSP allowlists to include only enabled integrations

### Requirement 14: Integration Catalog Support (Default-Off)

**User Story:** As a salon owner, I want a pre-wired integration catalog so I can enable vendors without custom code.

#### Acceptance Criteria

1. THE System SHALL support booking provider adapters (Square, Vagaro, Mindbody, Fresha, Booksy, generic link)
2. THE System SHALL support payments and gift card options (Stripe, Square, PayPal)
3. THE System SHALL support chat widgets loaded only after consent and interaction
4. THE System SHALL support email and SMS marketing providers via server-side routing
5. THE System SHALL support GA4 and optional GTM and privacy-friendly analytics
6. THE System SHALL support ad pixels and server-side conversions with deduping
7. THE System SHALL support CMP integration or a custom consent banner
8. THE System SHALL support local SEO fields (GBP booking URL) and maps links
9. THE System SHALL support review links and optional on-site testimonials
10. THE System SHALL support bot protection and webhook integrations
11. THE System SHALL optionally support a headless CMS adapter for content ops

### Requirement 15: Media Consent and Takedown

**User Story:** As a salon administrator, I need a compliant way to store photo/video permissions and honor removals, so that client privacy is respected.

#### Acceptance Criteria

1. THE System SHALL store a consent record per testimonial/transformation (timestamp, method, scope)
2. THE System SHALL support revocation requests and remove associated media from public views
3. THE System SHALL purge cached media from CDN/edge caches on takedown
4. THE System SHALL support additional safeguards for minors or sensitive cases

### Requirement 16: Evergreen Maintenance and Upgrade Posture

**User Story:** As a maintainer, I want a documented and automated upgrade posture, so that the repo stays secure, current, and resilient over time.

#### Acceptance Criteria

1. THE System SHALL document an upgrade policy for Next.js, React, and Turbo (latest patches in current major + tracked path to next major)
2. THE System SHALL recommend Node 24 as the default engine and document fallback requirements when older LTS versions are needed
3. THE System SHALL keep React on the latest stable patch in the current major release line
4. THE System SHALL either upgrade Turbo regularly or explicitly document why a pin is maintained
5. THE System SHALL automate dependency updates with Renovate
6. THE System SHALL auto-merge patch updates when CI is green
7. THE System SHALL require CI + changelog review for minor updates
8. THE System SHALL generate an SBOM as part of CI and publish it as an artifact
9. THE System SHALL fail CI on critical dependency vulnerabilities

### Requirement 17: Golden Path Initialization and Demo

**User Story:** As a new user, I want a single command to initialize the site and a demo mode to explore all features, so that setup feels premium and immediate.

#### Acceptance Criteria

1. THE System SHALL provide a one-command initializer (`pnpm template:init` or `node scripts/init.mjs`)
2. THE initializer SHALL collect salon name, address, hours, phone, booking provider, and primary CTA
3. THE initializer SHALL generate `site.config.ts`, default content, schema JSON-LD, and environment stubs
4. THE initializer SHALL default consent settings to “deny” for analytics/marketing until enabled
5. THE System SHALL include a `/demo` mode or seeded deployment that showcases all features
6. THE demo SHALL illustrate consent-gated scripts by showing enabled/disabled states
7. THE System SHALL document one-click deploy options (Vercel, Docker, Supabase bootstrap)

### Requirement 18: Experimentation Framework and Event Inspector

**User Story:** As a marketer, I want a lightweight experiment framework with event visibility, so that I can test changes safely and verify tracking.

#### Acceptance Criteria

1. THE System SHALL provide a feature-flag and experiment assignment layer
2. THE System SHALL use deterministic bucketing (cookie or anonymous ID)
3. THE System SHALL expose experimentId and variant in event payloads
4. THE System SHALL block marketing/analytics scripts until consent is granted
5. THE System SHALL include a dev-only event inspector panel
6. THE event inspector SHALL validate event payloads contain no PII
7. THE System SHALL include a test harness that verifies consent denied -> zero third-party requests

### Requirement 19: Quality Gates and Proof Artifacts

**User Story:** As a reviewer, I want CI-enforced quality gates with artifacts, so that the repo proves performance, privacy, and accessibility claims.

#### Acceptance Criteria

1. THE System SHALL run lint, type-check, and tests on every PR
2. THE System SHALL run Lighthouse CI for critical routes and enforce budgets (Performance >= 95, Accessibility >= 95, Best Practices >= 95, SEO >= 95)
3. THE System SHALL enforce bundle size budgets and fail on regressions (total JS <= 170KB gzip, third-party JS <= 80KB gzip per key route)
4. THE System SHALL run accessibility checks for modal and carousel patterns and require 95+ scores
5. THE System SHALL run security scans for dependencies and leaked secrets
6. THE System SHALL run E2E tests for consent denied/granted scenarios
7. THE System SHALL publish Lighthouse reports, bundle stats, and SBOMs as CI artifacts
8. THE System SHALL surface a Repo Scorecard in the README based on CI outputs

### Requirement 20: Integration Quality Bar

**User Story:** As a maintainer, I want every integration to follow a strict quality bar, so that enabling providers stays safe and consistent.

#### Acceptance Criteria

1. THE System SHALL require a Zod schema per integration config
2. THE System SHALL fail fast when an integration is enabled but misconfigured
3. THE System SHALL declare consent category and load rules per integration
4. THE System SHALL declare CSP domain lists per integration
5. THE System SHALL declare event subscriptions per integration
6. THE System SHALL include a test proving integrations do not load when disabled

## Special Requirements Guidance

### Event Taxonomy

All integrations MUST use a shared event taxonomy published by the event bus:

- `book_click`
- `contact_click`
- `lead_submit`
- `gallery_open`
- `testimonial_engage`
- `review_submit`
- `cta_click`

Events MUST avoid PII and include only high-level context (placement, service category, provider).

### Parser and Serializer Requirements

This feature does not involve custom parsers or serializers. All data handling uses standard JSON serialization provided by Next.js and React.

### Data Validation Requirements

All form inputs (review submissions, admin uploads, contact forms) must be validated using Zod schemas on both client and server sides. Image uploads must validate file types, sizes, and dimensions before processing.

### Security Requirements

- All user-generated content (reviews, testimonials) must be sanitized before display
- Admin interfaces must require authentication and authorization
- Image uploads must be scanned for malicious content
- Rate limiting must be applied to review submission endpoints
- Client photo permissions must be stored securely and respected
- Media consent records MUST be stored per transformation/testimonial and support revocation and cache purge
- The system MUST support removal requests and suppress content across CDN caches and local storage
- The system MUST generate and publish an SBOM during CI runs
- The system MUST scan dependencies and fail CI on critical vulnerabilities

### Integration Requirements

- Google Business Profile API for review aggregation
- Reviews MUST be fetched only for locations managed by the authenticated account; no scraping
- Facebook Graph API for social review collection (optional, best-effort)
- Instagram Graph API (Business/Creator) for portfolio integration (optional, app-review dependent) with manual ingestion fallback
- Image optimization service (e.g., Cloudinary, Imgix, or Next.js Image Optimization)
- Email service for automated review requests (existing HubSpot integration can be extended)
- Booking providers: Square, Vagaro, Mindbody, Fresha, Booksy, and a generic booking link
- Analytics and tags: GA4, GTM (optional), privacy-friendly analytics (Plausible or Matomo)
- Ads and remarketing: Google Ads, Meta Pixel + Conversions API, TikTok, Pinterest, Snapchat, LinkedIn
- Consent management: CMP integration or a custom banner with Consent Mode v2 support
- Chat and messaging: Intercom, Crisp, Tawk (loaded after consent + interaction)
- Payments: Stripe, Square, PayPal (as applicable)

## Multi-Industry Requirements

### Requirement 21: Multi-Industry Template Applicability

**User Story:** As a template maintainer, I want all marketing features to work across multiple service-based
industries with minimal customization, so that I can reuse code across templates (hair salon, nail salon,
dental practice, fitness center, consulting, etc.) without industry-specific implementations.

#### Acceptance Criteria

1. THE System SHALL use industry-agnostic terminology in components and APIs where possible (e.g., "Service"
   instead of "Hair Service", "Team Member" instead of "Stylist", "Transformation" instead of "Hair
   Transformation")
2. WHEN implementing features, THE System SHALL avoid hardcoded business-logic specific to hair salons; use
   configuration flags or feature toggles for industry-specific customizations
3. THE System SHALL provide configuration schemas that separate service-business common patterns from
   industry-specific ones (booking models, service categories, team specialties)
4. WHEN a feature requires industry-specific naming or terminology, THE System SHALL document the
   customization point and provide examples for at least 2 additional service industries
5. THE System SHALL include a "Shared Component Extraction Checklist" in technical documentation that guides
   developers on which features can be moved to templates/shared/

### Requirement 22: Shared Component Extraction and Reuse

**User Story:** As a developer adding a new template, I want to reuse social proof, portfolio, and
conversion components from templates/shared/, so that feature consistency is maintained across templates
and client projects.

#### Acceptance Criteria

1. WHEN implementing Requirement 1 (Social Proof), THE System SHALL extract generic testimonial/review display
   components to templates/shared/features/testimonials/
2. WHEN implementing Requirement 2 (Before/After Gallery), THE System SHALL extract generic gallery,
   lightbox, and filtering logic to templates/shared/features/portfolio/
3. WHEN implementing Requirement 3 (Trust Indicators), THE System SHALL extract badge components and schema
   generation to templates/shared/features/trust-indicators/
4. WHEN implementing Requirement 4 (Conversion Elements), THE System SHALL extract generic CTA, button, and
   lead-capture components to templates/shared/features/conversion/
5. THE System SHALL provide clear import paths and examples for shared components in feature README files
6. THE System SHALL use TypeScript interfaces and documentation to ensure shared components are configurable
   for industry-specific needs
7. WHEN a new template (templates/restaurant/) is created, THE System SHALL demonstrate reuse of at least 3
   shared components without modification

### Requirement 23: Template Inheritance and Customization Documentation

**User Story:** As a template user creating a new client project, I want to understand how to customize
template features for a specific salon/business, what can/should not be modified, and how to upgrade when
the template improves.

#### Acceptance Criteria

1. THE System SHALL document a "Template Customization Guide" for clients that explains:
   - Which files are "safe to edit" (content, branding, configuration)
   - Which files should "not be modified" (framework code, hooks)
   - How to override components or styles
2. THE System SHALL provide a deprecation policy and upgrade path for template modifications
3. THE System SHALL include examples showing how to customize:
   - Service categories and pricing structures
   - Team member profiles and specialties
   - Business hours and availability
   - Booking integrations and CTAs
4. WHEN implementing shared components, THE System SHALL provide configuration samples for hair salon, nail
   salon, and dental practice so customization is clear

### Requirement 24: Multi-Client Deployment Architecture

**User Story:** As an operator, I want each client project to deploy independently with their own
environment configuration, branding, and feature flags, while inheriting marketing features from the template.

#### Acceptance Criteria

1. THE System SHALL define a site.config.ts schema that stores client-specific configuration (business
   name, hours, location, phone, booking provider choice)
2. WHEN deploying a client project (clients/[client-name]/), THE System SHALL respect the client's
   site.config.ts and environment variables; no hardcoded template values should leak
3. THE System SHALL provide example client projects demonstrating:
   - Custom branding (logo, colors, fonts)
   - Industry-specific service setup (hair salon, nail salon)
   - Custom content (about, services, team)
   - Integration choices (which booking provider, which analytics, which ads)
4. THE System SHALL use server-side configuration to prevent client values from appearing in default/template
   data
5. THE System SHALL document a "Clone and Customize" workflow for teams setting up new clients

### Requirement 25: Quality Gates Across Templates and Clients

**User Story:** As a reviewer, I want CI to enforce the same performance, accessibility, and security
standards across all templates and client projects, so that quality is consistent.

#### Acceptance Criteria

1. THE System SHALL define shared Lighthouse CI budgets and configuration file templates/
   lighthouse-ci-config.yml that applies to all templates and clients
2. WHEN running CI for any template or client project, THE System SHALL enforce:
   - Performance >= 95 on key routes
   - Accessibility >= 95 for all template routes
   - SEO >= 95 including schema validation
   - Third-party JS <= 80KB gzip, total JS <= 170KB gzip per route (unless explicitly excepted)
3. THE System SHALL require bundle size checks for shared components to catch regressions
4. WHEN a shared component is updated, THE System SHALL verify that dependent templates still pass CI
   budgets
5. THE System SHALL publish CI artifacts (reports, budgets, compliance matrices) for each template and
   client project

---

## Additional Marketing Enhancement Requirements

### Requirement 26: Advanced Lead Management and Nurture

**User Story:** As a salon owner, I want to manage and nurture leads through automated workflows so
that I can convert more prospects into customers without manual effort.

#### Acceptance Criteria

1. THE System SHALL maintain a lead database with status tracking (new, contacted, qualified, converted,
   lost)
2. WHEN a lead is submitted (contact form, chat, etc.), THE System SHALL record the lead source and
   initial touchpoint
3. THE System SHALL allow manual lead segmentation by source, location, service interest, and other
   custom attributes
4. WHEN a lead's status changes, THE System SHALL trigger notifications to assigned team members
5. THE System SHALL track lead activity (page views, email opens, form submissions) to determine engagement
6. WHEN a lead converts to a booking, THE System SHALL update lead status and mark conversion date
7. THE System SHALL provide a lead dashboard showing:
   - Total leads by time period
   - Lead-to-customer conversion rate
   - Lead source performance
   - Average time-to-conversion
   - Lost lead reasons and recovery opportunities
8. THE System SHALL support lead assignment to team members with customizable routing rules
9. WHEN a lead hasn't engaged in X days, THE System SHOULD recommend re-engagement actions
10. THE System SHALL allow exporting lead lists for use in external email marketing tools

### Requirement 27: Marketing Automation and Email Workflows

**User Story:** As a salon owner, I want to create automated email sequences triggered by customer
actions, so that I can nurture leads and retain customers at scale without manual outreach.

#### Acceptance Criteria

1. THE System SHALL provide a workflow builder UI for creating automated email sequences
2. WHEN a lead submits a contact form, THE System SHALL automatically send a confirmation email
3. THE System SHALL support trigger types: new lead, booking completed, abandoned lead (X days inactive),
   post-appointment follow-up
4. THE System SHALL allow customizing email templates with dynamic fields (name, service, date, etc.)
5. WHEN an email is sent, THE System SHALL track open rate, click rate, and unsubscribe events
6. THE System SHALL support email scheduling at optimal times (per recipient timezone if available)
7. THE System SHALL allow setting delays between emails in a sequence (e.g., send day 1, day 3, day 7)
8. WHEN a recipient takes a desired action (books appointment, clicks link), THE System SHALL exit the
   sequence
9. THE System SHALL maintain an unsubscribe list and respect opt-out preferences
10. THE System SHALL provide analytics on workflow performance (open rate, conversion rate, ROI)

### Requirement 28: Advanced Form Optimization

**User Story:** As a salon owner, I want to optimize contact and lead capture forms to maximize
conversions and reduce abandonment.

#### Acceptance Criteria

1. THE System SHALL track form abandonment (incomplete submissions) and notify administrators
2. THE System SHALL display form field completion progress on multi-step forms
3. THE System SHALL support conditional logic (show/hide fields based on previous answers)
4. WHEN a user has interacted with the form before, THE System SHOULD pre-fill known fields
5. THE System SHALL support dynamic field ranking (important fields first, helpful fields later)
6. WHEN a user hovers over a form field, THE System SHOULD display helpful context or examples
7. THE System SHALL provide field-level validation with helpful error messages
8. WHEN a form has >3 fields, THE System SHOULD use progressive profiling (show 2-3 fields initially,
   more later)
9. THE System SHALL allow exit-intent modal experiments on form pages (desktop-only, mobile-friendly
   alternatives)
10. THE System SHALL track form analytics: views, starts, abandonments, completions, conversion rate
11. THE System SHALL support reCAPTCHA/hCaptcha for spam prevention without blocking legitimate users
12. WHEN a form submission includes suspicious patterns, THE System SHOULD flag for manual review

### Requirement 29: Personalization and Dynamic Content

**User Story:** As a salon owner, I want to show personalized content and recommendations to visitors
based on their behavior and interests, so that I can improve engagement and conversion rates.

#### Acceptance Criteria

1. THE System SHALL track visitor behavior (pages visited, time on page, scroll depth, clicks)
2. WHEN a visitor returns to the site, THE System SHOULD remember their previous interest (service
   category viewed)
3. THE System SHALL display service recommendations based on pages viewed (e.g., "Explore more color
   services")
4. WHEN a visitor has viewed 3+ pages without converting, THE System SHOULD show a contextual CTA
   (chat, call, form)
5. THE System SHALL support hiding already-viewed content (don't show same testimonial twice)
6. THE System SHALL display personalized email greetings when marketing emails are opened
7. WHEN a visitor comes from a paid ad campaign, THE System SHOULD tailor the landing page message to
   match ad copy
8. THE System SHALL support A/B testing content variations (headline, CTA text, image) by visitor segment
9. WHEN a visitor is from a repeat lead source, THE System SHOULD adjust CTAs (e.g., "Schedule your
   second appointment")
10. THE System SHALL do not rely on PII for personalization; use behavioral signals and anonymous cookies

### Requirement 30: Payment and Transaction Management

**User Story:** As a salon owner, I want to manage deposits, payments, gift cards, and promotions so
that I can reduce no-shows and increase revenue.

#### Acceptance Criteria

1. THE System SHALL support collecting service deposits or non-refundable booking fees
2. WHEN a payment is requested, THE System SHALL provide secure payment options (Stripe, Square, PayPal)
3. THE System SHALL issue digital receipts and payment confirmations via email
4. WHEN a customer requests a refund, THE System SHALL process refunds through the original payment
   method
5. THE System SHALL track payment status (pending, completed, failed, refunded) per booking
6. THE System SHALL support creating and managing digital gift cards
7. WHEN a gift card is used, THE System SHALL deduct balance and record transaction history
8. THE System SHALL allow discount codes/coupons with:
   - Fixed dollar amount or percentage discounts
   - Expiration dates
   - Usage limits (per code, per customer)
   - Service-specific restrictions
9. WHEN a discount is applied, THE System SHALL update pricing in real-time across all booking flows
10. THE System SHALL provide revenue reporting by payment method, discount, and source
11. THE System SHALL support payment plans (e.g., 50% deposit, 50% before service)
12. THE System SHALL handle failed payments with automatic retry logic and customer notification

### Requirement 31: Enhanced Appointment and Booking Management

**User Story:** As a salon owner, I want to prevent no-shows and optimize appointment scheduling through
automated reminders and availability management.

#### Acceptance Criteria

1. THE System SHALL sync with booking provider calendar in real-time (if provider supports)
2. WHEN an appointment is booked, THE System SHALL send automated confirmation email and SMS (if opted-in)
3. THE System SHALL send appointment reminders (24 hours before, 2 hours before) via email and SMS
4. WHEN a customer misses an appointment, THE System SHALL record no-show and notify the salon
5. THE System SHALL support rescheduling requests through email links (one-click reschedule)
6. THE System SHALL allow setting minimum lead time (e.g., 48 hours) for bookings
7. THE System SHALL prevent double-booking stylists through real-time availability checks
8. WHEN a stylist's availability changes, THE System SHALL update booking availability instantly
9. THE System SHALL support buffer time between appointments (e.g., 15-min cleanup between appointments)
10. THE System SHALL track appointment history per customer for upsell opportunities

### Requirement 32: Customer Retention and Lifecycle Marketing

**User Story:** As a salon owner, I want to identify at-risk customers and implement retention campaigns
to reduce churn and increase lifetime value.

#### Acceptance Criteria

1. THE System SHALL track customer visit frequency and time between visits
2. WHEN a customer hasn't visited in X days (customize per service), THE System SHALL flag as "at-risk"
3. WHEN a customer is at-risk, THE System SHOULD trigger a re-engagement email or offer
4. THE System SHALL segment customers by lifecycle stage (new, regular, at-risk, churned)
5. WHEN a customer books after being at-risk, THE System SHALL track win-back success
6. THE System SHALL identify upsell opportunities (suggest new services based on service history)
7. WHEN a customer has booked service A multiple times, THE System SHOULD recommend complementary
   services (cross-sell)
8. THE System SHALL calculate customer lifetime value (LTV) based on visit frequency and average service
   price
9. THE System SHALL provide loyalty/VIP tiers based on visit count or spending
10. WHEN a VIP customer books, THE System SHOULD:
    - Provide priority available times
    - Offer exclusive perks or discounts
    - Assign preferred stylist if available
11. THE System SHALL support referral programs (reward customers for referring friends)
12. THE System SHALL track referral success (referrals that convert to customers)

### Requirement 33: Advanced Analytics, Attribution, and Reporting

**User Story:** As a salon owner, I want to understand which marketing efforts drive the most bookings
and revenue, so that I can optimize marketing spend and budget allocation.

#### Acceptance Criteria

1. THE System SHALL track all customer touchpoints (web visit, ad click, email open, form submission,
   etc.)
2. WHEN a customer converts, THE System SHALL record the conversion path (first click, last click, all
   touches)
3. THE System SHALL support multiple attribution models:
   - First-touch (give credit to first interaction)
   - Last-touch (give credit to final interaction)
   - Multi-touch (distribute credit across all interactions)
4. THE System SHALL identify the highest-performing marketing channels (organic, paid, email, direct)
5. THE System SHALL calculate cost-per-lead and cost-per-acquisition by channel
6. WHEN budget is limited, THE System SHOULD recommend channel reallocation based on performance data
7. THE System SHALL track revenue per marketing channel (not just bookings)
8. THE System SHALL provide weekly/monthly reporting on:
   - New leads by source
   - Conversion rate by source
   - Cost per conversion
   - Customer lifetime value
   - Marketing ROI
9. THE System SHALL allow custom date ranges and filtering in reports
10. THE System SHALL support exporting reports (PDF, CSV) for stakeholder distribution
11. THE System SHALL identify seasonal trends in booking patterns
12. THE System SHALL forecast future demand based on historical trends

### Requirement 34: Promotional and Incentive Management

**User Story:** As a salon owner, I want to create limited-time offers and promotions to drive bookings
during slow periods without devaluing services.

#### Acceptance Criteria

1. THE System SHALL allow creating time-limited promotions with:
   - Discount amount or percentage
   - Specific services included
   - Customer eligibility (new customers only, all customers, specific segment)
   - Start and end dates
2. WHEN a promotion is active, THE System SHALL display it on relevant service pages
3. THE System SHALL show countdown timers for expiring promotions (when truthfully limited in time)
4. WHEN a customer applies a promotion code, THE System SHALL validate eligibility and apply discount
5. THE System SHALL track promotion performance:
   - Number of times viewed
   - Number of times redeemed
   - Revenue generated
   - Customer acquisition cost (attributable to promotion)
6. THE System SHALL prevent promotion stacking (limit to one promotion per booking)
7. WHEN a promotion ends, THE System SHALL automatically remove it from display
8. THE System SHALL support seasonal promotions (e.g., holiday specials) with recurring start/end dates
9. WHEN a promotion is ending in <48 hours, THE System SHOULD send reminder emails to leads who viewed
   but didn't convert
10. THE System SHALL allow test different promotion messages (A/B test) to identify most effective offers

### Requirement 35: Mobile-Optimized Conversion Elements

**User Story:** As a mobile user, I want a seamless booking experience on my phone with minimal
friction and clear CTAs.

#### Acceptance Criteria

1. WHEN viewing on mobile, THE System SHALL display prominent "Call Now" button (tel: links)
2. THE System SHALL implement click-to-call functionality for all phone numbers
3. THE System SHALL optimize checkout/booking for mobile (1-handed use)
4. WHEN a mobile user is on a service page, THE System SHALL show sticky CTA button at bottom
5. THE System SHALL detect if user is on Google Maps and display direction-to-salon deep link
6. WHEN viewing a booking provider's date picker on mobile, THE System SHALL expand date selection for
   easier interaction
7. THE System SHALL support mobile app deep links for booking apps (Square, Fresha, etc.)
8. THE System SHALL minimize form fields on mobile (use smart defaults, conditional logic)
9. WHEN a mobile user taps a review or testimonial, THE System SHALL expand it without leaving the page
10. THE System SHALL show appointment reminders via SMS (with opt-in) or push notification

### Requirement 36: Reporting, Business Intelligence, and Dashboards

**User Story:** As a salon owner, I want a comprehensive dashboard showing my most important metrics so
I can make data-driven business decisions.

#### Acceptance Criteria

1. THE System SHALL provide a customizable admin dashboard with drag-drop widgets
2. THE System SHALL display key performance indicators (KPIs):
   - New bookings (MoM, YoY)
   - New leads (by source)
   - Conversion rate (lead to booking)
   - Cancellation/no-show rate
   - Average booking value
   - Revenue (daily, weekly, monthly)
3. WHEN viewing the dashboard, THE System SHOULD highlight trends (↑ or ↓ vs. previous period)
4. THE System SHALL provide automated alerts when metrics fall below thresholds (e.g., bookings down 20%)
5. THE System SHALL generate weekly/monthly business health reports (email or in-app)
6. THE System SHALL support custom date ranges (today, this week, this month, custom)
7. THE System SHALL provide drill-down capability (click "leads" to see detail by source)
8. WHEN a metric is underperforming, THE System SHOULD suggest actions (e.g., "Increase Google Ads
   spending")
9. THE System SHALL allow comparing current period to previous periods to identify trends
10. THE System SHALL export reports as PDF or CSV for sharing with team or stakeholders

### Requirement 37: Admin Controls, Team Collaboration, and Audit Logs

**User Story:** As a salon owner/manager, I want to control who can access what data and take actions,
and maintain a log of changes for accountability.

#### Acceptance Criteria

1. THE System SHALL support role-based access control (Owner, Manager, Stylist, Receptionist)
2. WHEN assigning roles, THE System SHALL restrict access by feature:
   - Owner: Full access
   - Manager: Access to leads, bookings, team, reports (no billing)
   - Stylist: View own bookings and reviews only
   - Receptionist: Manage bookings and contact requests
3. THE System SHALL require authentication (login) for all admin features
4. THE System SHALL support multi-user accounts with invite flow
5. WHEN a team member is removed, THE System SHALL revoke access immediately
6. THE System SHALL maintain an audit log recording:
   - Who made changes
   - What changed (e.g., "Discount 20% applied")
   - When the change occurred
   - IP address/device used
7. THE System SHALL allow exporting audit logs for compliance purposes
8. WHEN sensitive data is accessed (customer details, payment info), THE System SHOULD log the access
9. THE System SHALL support password resets and account recovery
10. THE System SHALL provide activity feed showing recent actions by team members
11. THE System SHALL send weekly summaries of system activity to Owner/Managers
12. WHEN unauthorized access is attempted, THE System SHALL log the attempt and alert administrators

---
