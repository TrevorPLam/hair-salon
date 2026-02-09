# Requirements Document: Marketing-First Enhancements

## Introduction

This document specifies requirements for enhancing a hair salon website with marketing-first best practices aligned with 2026 industry standards. The enhancements focus on conversion optimization, social proof, trust building, and visual portfolio showcasing to drive bookings and client engagement.

The target posture shifts the repo from a template to a productized marketing system with evergreen maintenance, a golden-path setup, repeatable conversion science, and proof artifacts (benchmarks, CI gates, and demos).

The current website has basic functionality (services catalog, blog, contact form, team profiles, gallery, analytics) but lacks critical conversion elements such as robust social proof systems, before/after showcases, trust indicators, and strategic conversion optimization.

Note: As of Feb 2026, Next.js 15 is Maintenance LTS and Next.js 16 is Active LTS. Plan for an upgrade path when scheduling implementation.

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
