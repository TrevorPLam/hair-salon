# Marketing Repository: Analysis, Research & Exhaustive Feature Catalog

> **Generated:** 2026-02-13  
> **Purpose:** Align repo state, gameplan, multi-site research, and a complete catalog of features/elements/patterns for maximum flexibility across all client sites.

---

## Part 1 — Current State & Gameplan Summary

### 1.1 Repository State (from CODEBASE_ANALYSIS.md)

| Aspect | Status |
|--------|--------|
| **Identity** | `marketing-website-templates` v1.0.0 — multi-industry marketing template system |
| **Stack** | pnpm 10 + Turborepo 2.2 + TypeScript 5.7 + Next.js 15 + React 19 |
| **Shared packages** | `@repo/ui` (8 components), `@repo/utils` (cn), `@repo/config` (Tailwind, ESLint, TS), `@repo/shared` (types only) |
| **Templates** | `hair-salon` (fully built), `plumber` (structural clone, content still hair-salon) |
| **clients/** | Empty |
| **Core issue** | Templates are full copies; no feature code is actually shared. Plumber is not differentiated. |

**What works:** Monorepo structure, hair-salon template (17 pages, 11 components, 6 feature modules, 26 lib files), security (CSP, rate-limit, sanitize), blog (MDX), booking/contact forms, Supabase/HubSpot stubs.

**Gaps:** `@repo/shared` has only types; no shared features/lib; plumber content not differentiated; `public/` empty; no `@repo/ui` tests; docs aspirational.

### 1.2 Gameplan (from ARCHITECTURE.md & TODO.md)

**Principle:** *Share infrastructure, not design.* Marketing sections (Hero, Footer, CTA) are **per-app**; every site should look different. Shared primitives + feature logic; bespoke visual design.

**Target structure:**
- **apps/** — Deployed sites (templates + client-*), each with only `app/`, `components/`, `content/`, `site.config.ts`, thin `middleware.ts`, `globals.css`, configs.
- **packages/** — `ui`, `infra`, `features/*`, `integrations/*`, `config` (industry-presets, theme-generator), `shared` (types, constants, utils).

**Evolution (7 phases):**
1. **Phase 1** — Extract & share infrastructure (infra, env, integrations, features: contact, booking, blog, search, gallery, team, reviews).
2. **Phase 2** — Expand UI primitives & compositions (content, layout, inputs, feedback, compositions, a11y, hooks).
3. **Phase 3** — Industry presets & config (`createSiteConfig(preset, overrides)`, theme generator, SEO/schema).
4. **Phase 4** — Client override system, first client sites, rename templates→apps, CI/CD per app.
5. **Phase 5** — New industry templates (restaurant, medical, legal, home-services, fitness, real-estate).
6. **Phase 6** — Polish (testing, DX, performance, security, SEO, dependency hygiene).
7. **Phase 7** — Backlog: i18n, CMS, AI chatbot, A/B testing, CLI, multi-tenant self-serve.

**Critical:** Do not build Phases 3–4 until Phase 1–2 is solid. Biggest risk: abstractions before enough concrete examples.

---

## Part 2 — Multi-Site Repository Research (02/13/2026)

### 2.1 Fundamentals & Best Practices

**Monorepo vs polyrepo**
- Monorepo: single repo, multiple projects, shared code, unified versioning and CI. Best when many deployables share components/types/tooling.
- Polyrepo: one repo per product; clearer ownership, independent release cycles. Best when products are truly independent.
- For a *marketing* multi-site repo launching many client sites from shared templates: **monorepo is appropriate** — shared UI, features, integrations, config.

**Dependency & structure**
- **Single version policy** for shared deps (React, Next.js) to avoid conflicts.
- **Packages depend only downward** — packages never import from apps.
- **Per-app env** — `.env.local` per app; no global env for secrets.
- **Workspace boundaries** — lint rules to prevent apps importing from each other; only from `packages/`.

**CI/CD & deployment**
- **Turborepo `--filter=...[HEAD^1]`** — affected-only builds and tests.
- **One deployment per app** (e.g. one Vercel project per site) = full isolation (builds, env, domains, rollback).
- **Remote caching** (e.g. Vercel) for faster CI.

### 2.2 Marketing Multi-Site Specifics

**Multi-tenant CMS vs shared codebase**
- **CMS multi-tenant:** One CMS instance, one DB, many sites (different domains/templates/content). Good for: same team, shared content, brand families.
- **Your model (shared codebase, separate deploys):** One repo, many Next.js apps; each app = one site. Good for: **bespoke design per client**, full isolation, no shared DB. Fits “every site unique and novel.”

**Design system across sites**
- **Shared variables:** Colors, typography, spacing as design tokens (e.g. CSS custom properties) so each site overrides values, not structure.
- **Shared components = primitives + compositions**, not full “marketing sections.” Sections (Hero, CTA, Footer) are per-app so each site can be unique.
- **Variants via props/slots/theming** in shared components; avoid hard-coded “site type” branches in shared code.

**Content & branding**
- **Config-driven:** `site.config.ts` (or `createSiteConfig(preset, overrides)`) drives nav, footer, SEO, theme, conversion flow. Rebrand = edit config + CSS vars + content.
- **Content in app:** MDX/content in each app (or future CMS per client). Don’t share content between clients.

### 2.3 Non-Marketing Multi-Site (Relevant Takeaways)

**Multi-tenant SaaS (pool/silo/bridge)**
- Pool = shared DB with `tenant_id`; Silo = DB per tenant; Bridge = hybrid. For marketing sites you’re doing **silo per site** (separate app/deploy per client), which is the clearest isolation.
- **Domain-based routing:** In a single-app multi-tenant setup, hostname determines tenant. You’re not there yet; you deploy one app per client. Revisit only if you add a “self-serve” tier with many similar sites from one deploy.

**White-label / per-client customization**
- **Branding:** Logo, colors, fonts per client via config + CSS variables + assets in each app.
- **Feature toggles:** Simple boolean map in config (e.g. `features.booking`, `features.blog`) — no heavy feature-flag platform until needed.
- **Workflow tailoring:** Different conversion flows (booking, quote, contact, dispatch) via `SiteConfig.conversionFlow` and shared feature packages that read config.

### 2.4 Recommendations for This Repo

1. **Stick to “share infrastructure, not design.”** Keep Hero/CTA/Footer and all section layouts per-app. Expand `@repo/ui` with primitives and compositions only.
2. **Complete Phase 1 before adding presets.** Extract infra and features into packages so plumber (and future templates) consume shared code; then add industry presets and theme generator.
3. **Config as single source of truth.** Extend `SiteConfig` with `features`, `industry`, `seo.schemaType`, `seo.geoTarget`; implement `createSiteConfig(preset, overrides)` with Zod validation.
4. **One Vercel project per app.** No multi-tenant single deploy until you have a concrete need (e.g. 20+ similar self-serve clients).
5. **Design tokens.** Global → semantic → component tokens; industry presets set defaults, client overrides swap values. Supports “myriad of ways” and “unique and novel” without duplicating layout code.
6. **Document multi-tenant spike (Phase 4.1a).** Capture trade-offs and decision so you can revisit later without re-deriving.

---

## Part 3 — Exhaustive Feature / Element / Pattern Catalog

Below is a catalog of **page types**, **hero/header variants**, **navigation**, **footer**, **CTAs**, **social proof**, **content sections**, **service/product display**, **pricing**, **portfolio/gallery**, **contact/lead capture**, **blog**, **maps**, **booking**, **e‑commerce**, **interactive**, **media**, **SEO**, **legal/compliance**, **conversion**, **personalization**, **industry-specific**, **accessibility**, **animation**, **integrations**, **mobile**, **micro-interactions**, **data viz**, **community/social**, and **emerging** patterns. Use this to ensure the repo can support maximum flexibility—every feature/element as a reusable capability that can be implemented in many ways so each site can be unique.

---

### Page Types

| Page Type | Description |
|-----------|-------------|
| **Home / Landing** | Single-page or multi-section landing; hero, value props, social proof, CTA. |
| **About** | Company story, mission, values, history, timeline, team intro. |
| **About – History** | Timeline, milestones, “our story” narrative. |
| **About – Mission & Values** | Mission statement, value pillars, culture. |
| **About – Team** | Staff/leadership bios, roles, photos, credentials. |
| **Services Overview** | List or grid of service categories with links to detail pages. |
| **Service Detail** | Single service: description, pricing, process, FAQ, CTA (book/quote). |
| **Pricing** | Tiers, packages, add-ons, comparison table, FAQ. |
| **Gallery / Portfolio** | Images/videos of work; filterable by category, project, date. |
| **Portfolio – Project Detail** | Single project/case study: images, description, results, client. |
| **Team** | Full team listing with filters (role, location, specialty). |
| **Team – Person Profile** | Single team member: bio, photo, credentials, contact. |
| **Blog / News Index** | Post list with filters (category, tag, date), featured post. |
| **Blog Post** | Single article (MDX/HTML), author, date, related posts, share. |
| **Contact** | Contact form, address, map, hours, phone/email. |
| **Book / Schedule** | Booking widget or dedicated page (services, date/time, details). |
| **Quote / Estimate Request** | Form for quote (service type, details, contact). |
| **Locations** | Multi-location list with map, hours, contact per location. |
| **Location Detail** | Single location: address, map, hours, services, contact. |
| **FAQ** | Accordion or list of Q&As; optional JSON-LD FAQPage. |
| **Careers / Jobs** | Job listings; link to ATS or application form. |
| **Career – Job Detail** | Single job: description, requirements, apply CTA. |
| **Resources / Downloads** | Whitepapers, guides, PDFs, gated or ungated. |
| **Resource Detail** | Single resource with download or CTA. |
| **Events** | Event list (classes, workshops, open houses). |
| **Event Detail** | Single event: date, location, description, register CTA. |
| **Menu** | Restaurant/food: menu categories, items, prices (static or CMS). |
| **Menu – Category** | Single menu category (e.g. appetizers, mains). |
| **Listings** | Real estate/property listings with filters and map. |
| **Listing Detail** | Single property: photos, details, map, contact/apply. |
| **Products / Shop** | Product grid (e.g. bakery, retail); can be marketing-only previews. |
| **Product Detail** | Single product: images, description, order/quote CTA. |
| **Classes / Schedule** | Fitness/education: class schedule, filters, sign-up. |
| **Insurance / Patient Info** | Medical: accepted insurance, forms, patient resources. |
| **Practice Areas** | Legal: areas of law with links to detail pages. |
| **Case Results / Verdicts** | Legal: summaries or case results (with disclaimers). |
| **Testimonials / Reviews** | Dedicated page aggregating testimonials or reviews. |
| **Before & After** | Gallery of before/after (contractors, medical, beauty). |
| **Service Area** | Map or list of areas served (ZIP, cities, radius). |
| **Privacy Policy** | Privacy policy page; link in footer. |
| **Terms of Service** | Terms and conditions. |
| **Cookie Policy** | Cookie usage; often part of privacy or consent. |
| **Accessibility** | Accessibility statement and commitment. |
| **Sitemap** | HTML sitemap for users (in addition to XML). |
| **Search Results** | Full-page search (internal site search). |
| **404** | Custom not-found page with nav and CTA. |
| **Thank You / Confirmation** | Post-form confirmation (contact, quote, booking). |

---

### Hero / Header Sections

| Variant | Description |
|---------|-------------|
| **Full-width image** | Single background image, overlay text, primary CTA. |
| **Full-width video** | Background video (muted, loop, fallback image), headline + CTA. |
| **Split (image left, content right)** | Two-column; image one side, headline/copy/CTA other. |
| **Split (content left, image right)** | Same, reversed. |
| **Split 50/50** | Equal columns; optional swap on mobile. |
| **Centered stacked** | Centered headline, subhead, CTA(s); optional small image or icon. |
| **Asymmetric split** | e.g. 60/40 or 70/30 for emphasis. |
| **Slider / Carousel** | Multiple hero slides (images/videos + copy); auto-rotate or arrows. |
| **Parallax background** | Background image scrolls slower than content. |
| **Layered parallax** | Multiple layers with different parallax speeds. |
| **Animated background** | CSS/JS animation (gradient, particles, shapes). |
| **Gradient overlay** | Solid or gradient overlay on image/video for contrast. |
| **Minimal (no image)** | Color or subtle pattern; typography-focused. |
| **Bent or curved bottom** | Hero section with curved/bent bottom edge into next section. |
| **Diagonal split** | Diagonal line separating hero from next block. |
| **Floating elements** | Overlapping cards, icons, or shapes for depth. |
| **Stats in hero** | Headline + key numbers (e.g. “X years”, “Y clients”). |
| **Form in hero** | Hero with inline form (e.g. ZIP for quote, email for lead). |
| **Search in hero** | Large search bar (listings, jobs, resources). |
| **Video modal trigger** | Hero with “Watch video” button opening modal. |
| **Multi-CTA hero** | Primary + secondary buttons (e.g. Book + Menu). |
| **Scroll indicator** | Arrow or “Scroll” hint at bottom of hero. |
| **Breadcrumb in hero** | Optional breadcrumb strip in hero for inner pages. |
| **Sticky mini hero** | Compact hero that stays visible on scroll (e.g. event title). |
| **Full-viewport (100vh)** | Hero fills viewport; optional min-height for short viewports. |
| **Variable height** | Hero height adapts to content or viewport (e.g. clamp). |
| **Dark hero** | Dark background, light text; strong contrast. |
| **Light hero** | Light background, dark text. |
| **Transparent nav over hero** | Nav overlays hero with transparent or glass background. |
| **Hero with logo strip** | “As seen in” or client logos below CTA. |

---

### Navigation Patterns

| Pattern | Description |
|---------|-------------|
| **Horizontal top nav** | Main links in a single row; logo left, links right (or center). |
| **Horizontal with CTA** | Nav + primary CTA button (e.g. “Book Now”) on right. |
| **Centered logo** | Logo center; links split left and right. |
| **Mega menu** | Hover/click opens large dropdown with columns (services, featured, CTA). |
| **Dropdown menus** | Simple dropdown per nav item (single column). |
| **Mega menu + images** | Dropdown with thumbnails or featured content. |
| **Sticky nav** | Nav sticks to top on scroll; optional shrink or change style. |
| **Transparent → solid on scroll** | Nav starts transparent over hero; becomes solid after scroll. |
| **Hide on scroll down, show on scroll up** | Reduces clutter on long pages. |
| **Sidebar nav** | Vertical nav in sidebar (desktop); often for docs or dashboards. |
| **Hamburger (mobile)** | Icon toggles full-screen or slide-in menu. |
| **Hamburger – full screen** | Overlay menu fills viewport with links + CTA. |
| **Hamburger – slide from left** | Drawer from left with nav links. |
| **Hamburger – slide from right** | Drawer from right. |
| **Bottom nav (mobile)** | Fixed bottom bar with 3–5 icons (e.g. Home, Services, Book, Contact). |
| **Mega menu mobile** | Accordion or expandable sections for many links on mobile. |
| **Search in nav** | Search icon opening overlay or inline search. |
| **Phone / CTA in nav** | Click-to-call or prominent CTA in nav. |
| **Language switcher** | For i18n; dropdown or flags. |
| **Location switcher** | Multi-location sites; choose location in nav. |
| **Utility nav** | Secondary row: contact, login, cart (if applicable). |
| **Two-row nav** | Top row (utility), bottom row (main nav). |
| **Nav with icons** | Icons next to labels (e.g. services, contact). |
| **Mega menu – by category** | Columns = service categories or site sections. |
| **Mega menu – featured** | One column “Featured” (blog, offer), rest links. |
| **Breadcrumb (below nav)** | Breadcrumb strip under nav on inner pages. |
| **Announcement bar above nav** | Promo or notice (e.g. “Free consultation”, “Holiday hours”). |
| **Floating CTA** | Sticky floating button (e.g. “Book” or “Call”) on mobile. |

---

### Footer Patterns

| Pattern | Description |
|---------|-------------|
| **Single column** | Logo, tagline, contact, social, copyright. |
| **Two column** | Links one side, contact/social other. |
| **Multi-column (3–5)** | Columns: Company, Services, Resources, Contact, Legal. |
| **Footer with sitemap** | One or more columns of links (sitemap-style). |
| **Footer with newsletter** | Email signup inline or in one column. |
| **Footer with contact block** | Address, phone, email, hours in footer. |
| **Footer with map** | Small embedded map in footer. |
| **Footer with social only** | Icons to social profiles. |
| **Footer with badges** | Trust badges (secure, associations, awards). |
| **Footer with app store links** | App Store / Play Store buttons (if app exists). |
| **Minimal footer** | Copyright + one or two links (Privacy, Terms). |
| **Dark footer** | Dark background; common for contrast with light body. |
| **Light footer** | Light background. |
| **Footer with CTA strip** | “Ready to get started?” + button above footer columns. |
| **Divided footer** | Top section (links/newsletter), bottom bar (legal, copyright). |
| **Sticky footer** | Footer always at bottom on short pages. |
| **Expandable footer (mobile)** | Columns collapse to accordions on small screens. |
| **Footer with payment icons** | Card brands, PayPal, etc. (e.g. ecommerce). |
| **Footer with language/region** | Language or region selector. |
| **Footer with back-to-top** | Button or link to scroll to top. |

---

### Call-to-Action (CTA) Patterns

| Pattern | Description |
|---------|-------------|
| **Primary button** | Single prominent button (e.g. “Book Now”, “Get Quote”). |
| **Primary + secondary** | Two buttons (e.g. “Start Free Trial” + “Watch Demo”). |
| **Text link CTA** | “Learn more →” or “Contact us” as link. |
| **Inline CTA** | CTA within body copy (e.g. mid-article). |
| **Floating/sticky CTA** | Button fixed to bottom or corner (mobile). |
| **Banner CTA** | Full-width or strip with headline + button. |
| **Section CTA** | Dedicated section: headline, short copy, button(s). |
| **Card CTA** | Card with headline, copy, button (e.g. service card). |
| **Modal CTA** | Button opens modal (form, video, signup). |
| **Exit-intent CTA** | Popup or modal on exit intent. |
| **Scroll-triggered CTA** | CTA appears or changes after scroll depth. |
| **Inline form CTA** | “Get quote” with inline fields (e.g. ZIP + Submit). |
| **Phone CTA** | “Call now” with tel: link; prominent on mobile. |
| **SMS CTA** | “Text us” with sms: link. |
| **Email CTA** | “Email us” with mailto: or contact form link. |
| **Chat CTA** | “Chat with us” opening live chat or bot. |
| **Calendar CTA** | “Schedule a call” (Calendly, etc.). |
| **Download CTA** | “Download guide” (gated or direct). |
| **Video CTA** | “Watch video” opening modal or new page. |
| **Urgency CTA** | “Limited spots” or “Offer ends soon” with button. |
| **Countdown CTA** | Timer + CTA (event or offer deadline). |
| **Multi-step CTA** | “Step 1 → Step 2” (e.g. choose service then book). |
| **Comparison CTA** | “Compare plans” or “See pricing” leading to comparison. |
| **Social proof + CTA** | “Join 10,000+ customers” + button. |

---

### Social Proof / Trust Elements

| Element | Description |
|---------|-------------|
| **Testimonial quote** | Single quote with name, title, photo (optional). |
| **Testimonial carousel** | Rotating testimonials (auto or manual). |
| **Testimonial grid** | Multiple quotes in grid. |
| **Video testimonial** | Embedded or linked video of client. |
| **Star rating** | 1–5 stars (visual only or with count). |
| **Aggregate rating** | “4.8 from 200 reviews” with stars; JSON-LD. |
| **Review source** | “Google”, “Yelp”, “Facebook” badge or link. |
| **Logo strip** | “Trusted by” or “As seen in” with client/media logos. |
| **Logo carousel** | Scrolling or sliding logos. |
| **Case study** | Short story: client, challenge, solution, result. |
| **Case study card** | Card with thumbnail, title, result metric, link. |
| **Awards & certifications** | Badges (e.g. “Best of 2025”, certifications). |
| **Stats / numbers** | “X years”, “Y clients”, “Z projects” with optional animation. |
| **Certifications** | Industry certs (e.g. BBB, licensed, insured). |
| **Guarantee** | “Money-back”, “Satisfaction guaranteed” with icon. |
| **Security badges** | SSL, secure payment icons. |
| **Membership / associations** | Chamber, industry associations. |
| **Press mentions** | “As featured in” with logos or quotes. |
| **User-generated content** | Instagram feed, hashtag gallery. |
| **Live activity** | “John just booked” or “3 people viewing” (real or simulated). |
| **Before/after** | Visual proof (photos or metrics). |

---

### Content Sections

| Section | Description |
|---------|-------------|
| **About intro** | Short “Who we are” with headline and paragraph. |
| **Mission statement** | One or two sentences on purpose. |
| **Values list** | 3–6 values with icons and short copy. |
| **History / timeline** | Vertical or horizontal timeline with dates and events. |
| **Team grid** | Photos, names, titles, short bios. |
| **Team carousel** | Rotating team members. |
| **Process steps** | Numbered or icon steps (e.g. “Consult → Plan → Deliver”). |
| **Process timeline** | Visual timeline of how you work. |
| **Why choose us** | Bullets or cards (differentiators). |
| **Differentiators** | 3–4 cards (e.g. experience, quality, guarantee). |
| **FAQ block** | Accordion or list of Q&As. |
| **Stats block** | 3–4 key numbers (years, clients, projects). |
| **Quote / pull quote** | Large quote from founder or client. |
| **Location(s)** | Address, map snippet, hours. |
| **Credentials** | Licenses, certs, education. |
| **Awards** | List or grid of awards. |
| **Community / giving** | Charity, sponsorships, volunteer. |
| **Sustainability** | Environmental or social commitments. |

---

### Service / Product Display

| Pattern | Description |
|---------|-------------|
| **Service cards (grid)** | Card per service: image, title, short description, link. |
| **Service cards (list)** | Horizontal cards in a list. |
| **Service with icon** | Icon + title + description (no image). |
| **Service with image** | Image + title + description + CTA. |
| **Service comparison table** | Rows = services, columns = features/price. |
| **Feature matrix** | Grid of features vs. tiers or services. |
| **Tabs by category** | Tabs (e.g. Hair, Nails) with content per tab. |
| **Accordion by service** | Expandable sections per service. |
| **Carousel of services** | Horizontal scroll of service cards. |
| **Product grid** | Product cards (image, name, price, CTA). |
| **Product list** | List layout for products. |
| **Product with variants** | Options (size, color) and “Add to cart” or “Request quote”. |
| **Featured service/product** | One large featured item + smaller ones. |
| **Category filter** | Filter services/products by category. |
| **Search within services** | Search box filtering service list. |
| **Price on card** | “From $X” or “$X – $Y” on each card. |
| **Badge on card** | “Popular”, “New”, “Limited”. |
| **Service area tag** | “Available in [areas]” on card. |

---

### Pricing / Packages

| Pattern | Description |
|---------|-------------|
| **Single price** | One price point with features list. |
| **Two-tier** | Two options (e.g. Basic / Premium). |
| **Three-tier** | Three options; middle often “Recommended”. |
| **Pricing table** | Rows = features, columns = plans; checkmarks/crosses. |
| **Feature comparison** | Side-by-side plan comparison. |
| **Toggle monthly/annual** | Switch between billing intervals. |
| **Price cards** | Card per tier: name, price, features, CTA. |
| **Highlighted tier** | One card emphasized (border, “Most popular”). |
| **Add-ons** | Base plan + optional add-ons (checkboxes). |
| **Custom quote** | “Contact for pricing” or “Get a quote” CTA. |
| **Sliding scale** | Slider or inputs for quantity affecting price. |
| **Per-unit pricing** | “$X per session”, “$Y per hour”. |
| **Package bundles** | e.g. “Hair + Nails package”. |
| **Discount badge** | “Save 20%” or “First month free”. |
| **FAQ below pricing** | Billing, cancellation, refund Q&As. |
| **Calculator** | Inputs (e.g. square footage) → estimated price. |

---

### Portfolio / Gallery

| Pattern | Description |
|---------|-------------|
| **Masonry grid** | Pinterest-style uneven grid. |
| **Uniform grid** | Equal-sized thumbnails. |
| **Grid with aspect ratio** | e.g. all 4:3 or 1:1. |
| **Lightbox** | Click opens full-size image/video overlay. |
| **Gallery carousel** | Horizontal slider of images. |
| **Gallery with categories** | Filter by category (tabs or dropdown). |
| **Gallery with tags** | Filter by tags. |
| **Before/after slider** | Slider comparing before/after. |
| **Video in gallery** | Mixed image + video items. |
| **Full-screen gallery** | One large image at a time with prev/next. |
| **Gallery with captions** | Caption under or over image. |
| **Gallery with project link** | Each item links to project detail. |
| **Infinite scroll** | Load more on scroll. |
| **Load more button** | “Load more” for next batch. |
| **Lazy loading** | Images load as they enter viewport. |
| **Hover zoom** | Slight zoom on hover. |
| **Grid + detail** | Click opens side panel or new page with detail. |
| **360° or virtual tour** | Embedded 360 or tour link. |

---

### Contact / Lead Capture

| Pattern | Description |
|---------|-------------|
| **Full contact form** | Name, email, phone, message, submit. |
| **Minimal form** | Email only or email + name. |
| **Multi-step form** | Step 1 (contact) → Step 2 (details) → Submit. |
| **Inline form** | Form in hero or section (no separate page). |
| **Form in modal** | “Contact us” opens modal with form. |
| **Form with file upload** | Attachment field. |
| **Form with dropdown** | Subject or “I’m interested in” dropdown. |
| **Form with honeypot** | Hidden field for bot detection. |
| **Form with CAPTCHA** | reCAPTCHA or similar. |
| **Form with consent** | Checkbox for privacy/marketing consent. |
| **Newsletter signup** | Email only; optional name. |
| **Newsletter in footer** | Signup block in footer. |
| **Live chat widget** | Floating chat (Intercom, Drift, custom). |
| **Chatbot** | AI or rule-based bot for qualifying leads. |
| **Callback request** | “Request a call” with phone + time preference. |
| **Scheduling link** | “Book a call” → Calendly/Cal.com. |
| **Quote request form** | Service type, details, contact. |
| **Lead magnet** | Gated download (e.g. PDF) for email. |
| **Quiz/assessment** | Multi-step quiz; result + CTA or lead capture. |
| **SMS signup** | Phone number for SMS list. |
| **Dual opt-in** | Confirmation email before adding to list. |

---

### Blog / Content Marketing

| Pattern | Description |
|---------|-------------|
| **Blog list** | Cards or list of posts with image, title, excerpt, date. |
| **Featured post** | Large featured post at top. |
| **Category filter** | Tabs or dropdown by category. |
| **Tag filter** | Filter by tags. |
| **Author filter** | Filter by author. |
| **Search** | Full-text search within blog. |
| **Related posts** | “You might also like” on post page. |
| **Table of contents** | In-post TOC for long articles. |
| **Reading time** | “X min read” displayed. |
| **Share buttons** | Share to social or copy link. |
| **Author bio** | Author name, photo, short bio at end. |
| **Comments** | Comment section (optional). |
| **Newsletter CTA in post** | Inline or end-of-post signup. |
| **Series** | “Part 1”, “Part 2” links. |
| **Pagination** | Next/prev or page numbers. |
| **Infinite scroll** | Load more on scroll. |
| **RSS link** | Link to RSS feed. |
| **MDX** | Rich content (components, code blocks). |
| **Syntax highlighting** | Code blocks with highlighting. |
| **Embedded video** | Video in post body. |
| **Embedded social** | Tweet, Instagram embed. |
| **Canonical + OG** | Canonical URL, OG image per post. |

---

### Maps / Location

| Pattern | Description |
|---------|-------------|
| **Embedded map** | Google Maps or Mapbox embed (iframe or API). |
| **Map with marker** | Single location marker. |
| **Map with multiple markers** | Several locations; click for info. |
| **Map with info window** | Popup with address, hours, link. |
| **Static map image** | Image of map (e.g. Google Static Maps). |
| **Address + “Get directions”** | Link to Google Maps directions. |
| **Location card** | Address, hours, phone, map snippet per location. |
| **Location list + map** | List on one side, map on other; selection syncs. |
| **Service area map** | Shaded region (counties, ZIPs, radius). |
| **Store locator** | Search or filter to find nearest location. |
| **Map with custom styling** | Themed map colors/icons. |
| **Lazy-loaded map** | Map loads when section in viewport. |

---

### Booking / Scheduling

| Pattern | Description |
|---------|-------------|
| **Inline widget** | Embedded booking (e.g. Calendly, Acuity) in page. |
| **Dedicated booking page** | Full page for service + date/time selection. |
| **Multi-step booking** | Step 1: service → Step 2: date/time → Step 3: details. |
| **Calendar view** | Calendar grid to pick date. |
| **Time slots** | List of available times per day. |
| **Service selection first** | Choose service/category then availability. |
| **Staff selection** | Choose provider then see their availability. |
| **Duration selection** | Choose length (30/60/90 min). |
| **Add-ons** | Extra services or products during booking. |
| **Deposit or payment** | Pay deposit or full amount at booking. |
| **Confirmation page** | Summary + confirmation number + calendar add. |
| **Email/SMS reminder** | Optional reminder (handled by provider). |
| **Reschedule/cancel link** | Link in confirmation to reschedule or cancel. |
| **Recurring** | Option for recurring appointments. |
| **Group booking** | Book for multiple people or group event. |
| **Waitlist** | Join waitlist if no slots. |
| **External redirect** | “Book here” → Mindbody, Vagaro, Square, etc. |

---

### E-commerce Elements (on marketing sites)

| Element | Description |
|---------|-------------|
| **Product preview** | Image, name, short description, “Learn more” or “Order”. |
| **Add to cart** | Button adding to cart (if cart on same or external site). |
| **Order / request quote** | “Request quote” or “Order” opening form or external flow. |
| **Menu (restaurant)** | Menu sections and items with prices; “Order online” CTA. |
| **Menu PDF** | Downloadable menu. |
| **Price display** | “From $X” or range. |
| **Stock or availability** | “In stock” / “Limited” (if applicable). |
| **Gift card / voucher** | CTA to purchase gift card. |
| **Promo code** | Field for discount code (checkout or form). |
| **Cross-sell** | “You might also like” or “Add-ons”. |

---

### Interactive Elements

| Element | Description |
|---------|-------------|
| **Calculator** | Inputs → result (e.g. loan, ROI, project cost). |
| **Configurator** | Choose options (e.g. product configurator). |
| **Quiz** | Multi-step quiz with result (e.g. “Which service?”). |
| **Assessment** | Short assessment with recommendation. |
| **Poll** | Single or multi-question poll. |
| **Survey** | Multi-question survey; optional lead capture. |
| **ROI calculator** | Inputs → ROI or savings estimate. |
| **Payment calculator** | Loan or payment estimate. |
| **Size/coverage calculator** | e.g. square footage, coverage area. |
| **Scheduling widget** | Embedded calendar/time picker. |
| **Chatbot** | Conversational flow for FAQ or lead qual. |
| **Wizard** | Multi-step flow (e.g. “Find your plan”). |
| **Interactive map** | Clickable regions or markers. |
| **Before/after slider** | User drags to compare. |
| **Comparison tool** | Compare 2–3 options (plans, products). |

---

### Media Elements

| Element | Description |
|---------|-------------|
| **Background video** | Muted, looped hero or section video. |
| **Video embed** | YouTube, Vimeo, or self-hosted in page. |
| **Video in modal** | “Play” opens modal with video. |
| **Video with captions** | Captions/subtitles. |
| **Audio player** | Podcast or audio clip. |
| **Podcast embed** | Episode player (e.g. Spotify, Apple). |
| **Virtual tour** | 360° or Matterport-style embed. |
| **360° product view** | Rotate product view. |
| **AR preview** | AR try-on or placement (e.g. product in room). |
| **VR link** | Link to VR experience. |
| **Livestream** | Embedded livestream. |
| **Gallery with video** | Mixed image + video in gallery. |
| **Lazy-loaded video** | Video loads when in viewport. |
| **Autoplay (muted)** | Autoplay where allowed by policy. |

---

### SEO / Technical Features

| Feature | Description |
|---------|-------------|
| **Title & meta description** | Per-page and default from config. |
| **Canonical URL** | Explicit canonical to avoid duplicates. |
| **Open Graph** | og:title, og:description, og:image, og:url. |
| **Twitter Cards** | twitter:card, summary_large_image, etc. |
| **JSON-LD Organization** | Organization schema. |
| **JSON-LD WebSite** | WebSite + SearchAction. |
| **JSON-LD LocalBusiness** | LocalBusiness (or subtype) with address, hours. |
| **JSON-LD FAQPage** | FAQ schema for FAQ sections. |
| **JSON-LD Article/BlogPosting** | For blog posts. |
| **JSON-LD AggregateRating** | From reviews. |
| **JSON-LD BreadcrumbList** | Breadcrumbs. |
| **JSON-LD Service** | Per service page. |
| **JSON-LD Person** | For team/author. |
| **XML sitemap** | Dynamic or static sitemap.xml. |
| **robots.txt** | Allow/disallow, sitemap URL. |
| **Structured data validation** | Test with Rich Results Test. |
| **Semantic HTML** | header, nav, main, article, section, footer. |
| **Heading hierarchy** | Single h1, logical h2–h6. |
| **Image alt text** | All images with alt. |
| **Core Web Vitals** | LCP, INP, CLS targets. |
| **Mobile-friendly** | Responsive, touch targets. |
| **hreflang** | If multi-language. |
| **GEO-friendly content** | Clear, structured content for AI/LLM crawlers. |

---

### Legal / Compliance

| Feature | Description |
|---------|-------------|
| **Privacy policy** | Full page; link in footer. |
| **Terms of service** | Full page. |
| **Cookie policy** | What cookies are used. |
| **Cookie consent banner** | Accept/Reject/Preferences; GDPR/CCPA style. |
| **Consent preferences** | Granular (necessary, analytics, marketing). |
| **Accessibility statement** | Commitment and contact. |
| **ADA compliance** | WCAG 2.2 AA target; keyboard, screen reader, contrast. |
| **HIPAA (medical)** | If handling PHI; BAA and secure forms. |
| **Financial disclaimers** | For financial/insurance content. |
| **Legal disclaimers** | “Not legal advice”, “Results may vary”. |
| **Age gate** | If required (e.g. alcohol). |
| **Data request** | Link or form for access/deletion (GDPR). |

---

### Conversion Optimization

| Pattern | Description |
|---------|-------------|
| **Exit-intent popup** | Modal or slide when user moves to leave. |
| **Scroll-triggered CTA** | CTA appears or changes at X% scroll. |
| **Scroll-triggered form** | Form or signup appears after scroll. |
| **Urgency copy** | “Limited spots”, “Offer ends soon”. |
| **Countdown timer** | To event or offer end. |
| **Stock scarcity** | “Only 3 left” (if applicable). |
| **Popup (timed)** | After N seconds on page. |
| **Popup (scroll)** | At N% scroll. |
| **Slide-in CTA** | CTA slides in from corner. |
| **Sticky bar** | Top or bottom bar with CTA. |
| **Inline CTA expansion** | CTA expands or reveals on scroll. |
| **A/B tested CTA** | Different copy or placement by variant. |
| **Retargeting pixel** | Facebook, Google for retargeting. |
| **Thank-you page upsell** | Post-conversion offer. |

---

### Personalization

| Pattern | Description |
|---------|-------------|
| **Geolocation** | Show nearest location, local offers, or local content. |
| **Referrer-based** | Different hero or CTA by traffic source (e.g. Google vs social). |
| **Returning visitor** | “Welcome back” or different message. |
| **Device-based** | Mobile vs desktop layout or CTA (e.g. click-to-call on mobile). |
| **A/B test** | Variant A vs B for headline, CTA, or layout. |
| **UTM-based** | Prefill or highlight offer based on campaign. |
| **Segment-based** | Different content by segment (e.g. from CRM). |
| **Time-based** | “Open now” or different message by time. |
| **Language/locale** | Language or regional variant. |

---

### Industry-Specific Features

| Industry | Features / Elements |
|----------|---------------------|
| **Hair salon** | Service menu (cuts, color, treatments), stylist bios, gallery (styles), booking, gift cards. |
| **Plumber / HVAC / Electrician** | Service areas, emergency CTA, before/after, quote form, licenses/insured. |
| **Restaurant** | Menu (categories, items, prices), reservations, hours, dietary labels, order online. |
| **Medical** | Providers, insurance accepted, patient forms, telehealth CTA, conditions treated. |
| **Legal** | Practice areas, attorney bios, case results (disclaimers), consultation CTA. |
| **Home services** | Service areas map, quote, emergency, before/after gallery. |
| **Fitness / Gym** | Class schedule, trainers, membership tiers, trial CTA. |
| **Real estate** | Listings (grid/list/map), filters, property detail, agent bios, virtual tours. |
| **Automotive** | Inventory, service scheduling, trade-in, financing CTA. |
| **Education** | Programs/courses, faculty, admissions, events. |
| **SaaS** | Pricing, features comparison, signup, demo request, docs link. |
| **Ecommerce** | Product grid, cart, checkout (or link out), categories. |
| **Nonprofit** | Donate CTA, impact stats, campaigns, volunteer. |
| **Hospitality** | Rooms, amenities, booking, location, things to do. |
| **Wedding / Events** | Venue/packages, gallery, availability, contact. |
| **Pet services** | Services (grooming, daycare), staff, booking. |
| **Financial / Insurance** | Products, quote form, agent locator, disclaimers. |
| **Construction** | Projects gallery, services, quote, licenses. |
| **Landscaping** | Services, seasonal offers, gallery, quote. |
| **Cleaning** | Service types, areas, booking or quote. |
| **Photography** | Portfolio, packages, booking. |
| **Tutoring** | Subjects, tutors, scheduling. |
| **Daycare** | Programs, age groups, enrollment CTA. |
| **Veterinary** | Services, team, appointment, pet resources. |
| **Dental** | Services, team, patient forms, booking. |
| **Chiropractic** | Conditions, treatments, first visit, booking. |
| **Spa / Wellness** | Services, packages, booking, gift cards. |
| **Florist** | Occasions, delivery area, order or inquiry. |
| **Bakery** | Menu/products, orders, catering. |
| **Brewery / Winery** | Tasting, tours, events, shop. |
| **Architect / Interior design** | Portfolio, process, contact. |
| **Moving** | Quote (origin/dest), services, packing. |
| **Pest control** | Services, areas, quote, emergency. |
| **Roofing** | Services, gallery, quote, insurance. |
| **Accounting / Tax** | Services, checklist, appointment. |
| **Marketing agency** | Services, case studies, clients, contact. |
| **Consulting** | Offerings, team, case studies, contact. |
| **Coworking** | Spaces, amenities, pricing, tour CTA. |
| **Music / Arts studio** | Classes, teachers, schedule, enrollment. |
| **Funeral home** | Services, planning, obituaries, contact. |
| **Travel agency** | Destinations, packages, contact. |
| **Property management** | Listings, apply, contact. |
| **Storage** | Unit sizes, pricing, reserve. |
| **Car wash / Detailing** | Services, packages, location. |
| **Printing** | Products, quote, turnaround. |
| **Tailoring** | Services, turnaround, contact. |
| **Jewelry** | Collections, custom, repair. |
| **Antique / Thrift / Bookstore / Toy** | Categories, featured items, contact or shop. |
| **Auto repair / Mechanic** | Services, pricing, appointment, location. |
| **Catering** | Menu, events, quote, gallery. |
| **Recruiting / Staffing** | Jobs, for employers, for candidates, contact. |
| **Security services** | Commercial/residential, quote, licensing. |
| **Telecom / Utilities** | Plans, coverage, contact, support. |
| **Locksmith** | Emergency CTA, services, service area. |
| **Appliance repair** | Brands/services, booking, warranty. |
| **Pool service** | Services, seasonal, quote. |
| **Handyman** | Services, areas, quote. |
| **Limo / Transportation** | Fleet, quote, booking. |
| **Event planning** | Services, portfolio, contact. |
| **Cremation / Memorial** | Services, planning, obituaries. |
| **Med spa** | Treatments, team, booking. |
| **Tanning / Nails** | Services, pricing, booking. |
| **Barber** | Services, team, gallery, booking. |
| **Tattoo / Piercing** | Portfolio, aftercare, booking. |
| **Yoga / Pilates** | Classes, teachers, schedule, trial. |
| **Martial arts** | Programs, schedule, trial. |
| **Dance studio** | Classes, recitals, enrollment. |
| **Music lessons** | Instruments, teachers, schedule. |
| **Art gallery** | Exhibitions, artists, contact. |
| **Museum** | Exhibits, hours, tickets, shop. |
| **Zoo / Aquarium** | Tickets, hours, experiences. |
| **Amusement / Park** | Tickets, hours, groups. |
| **Camp** | Sessions, activities, registration. |
| **Tutoring (test prep)** | SAT/ACT, packages, booking. |
| **Language school** | Programs, levels, schedule. |
| **Driving school** | Packages, booking, FAQ. |
| **Trade school** | Programs, admissions, financial aid. |
| **Senior care** | Services, levels of care, contact. |
| **Home care** | Services, areas, referral. |
| **Rehab / Recovery** | Programs, insurance, contact. |
| **Mental health** | Providers, services, booking. |
| **Dermatology** | Conditions, treatments, booking. |
| **Optometry** | Services, frames, appointment. |
| **Orthodontics** | Treatments, before/after, consultation. |
| **Physical therapy** | Conditions, locations, booking. |
| **Urgent care** | Locations, wait time, services. |
| **Veterinary specialty** | Specialties, team, referral. |
| **Pet grooming** | Services, booking, gallery. |
| **Pet sitting / Walking** | Services, areas, booking. |
| **Pet training** | Programs, booking. |
| **Kennel / Boarding** | Amenities, pricing, reservation. |
| **Lodging (B&B, vacation rental)** | Rooms, amenities, booking. |
| **Catering (corporate)** | Packages, events, quote. |
| **Food truck** | Schedule, menu, locations. |
| **Craft / Hobby shop** | Classes, products, events. |
| **Gun store / Range** | Inventory, safety, classes. |
| **Bike shop** | Sales, service, rentals. |
| **Marina / Boat** | Slips, service, events. |
| **Golf** | Tee times, membership, events. |
| **Salon suite rental** | Suites, amenities, contact. |
| **Coaching (life, business)** | Offerings, booking. |
| **Speaker / Keynote** | Topics, calendar, contact. |
| **Photobooth** | Packages, events, gallery. |
| **DJ / Entertainment** | Services, portfolio, quote. |
| **Catering (wedding)** | Menus, tastings, contact. |
| **Venue (event space)** | Spaces, capacity, inquiry. |
| **Equipment rental** | Categories, quote, delivery. |
| **Scaffolding / Rigging** | Services, quote. |
| **Demolition** | Services, quote. |
| **Excavation** | Services, quote. |
| **Paving** | Residential/commercial, quote. |
| **Fencing** | Materials, gallery, quote. |
| **Tree service** | Services, emergency, quote. |
| **Lawn care** | Plans, areas, quote. |
| **Snow removal** | Seasonal, quote. |
| **Gutter** | Services, quote. |
| **Siding** | Materials, gallery, quote. |
| **Window/door** | Products, quote. |
| **Solar** | Quote, savings calc, FAQ. |
| **Insulation** | Services, quote. |
| **Painting** | Interior/exterior, gallery, quote. |
| **Flooring** | Types, gallery, quote. |
| **Garage door** | Services, quote. |
| **Locksmith (commercial)** | Services, emergency. |
| **Cleaning (commercial)** | Services, quote. |
| **Janitorial** | Services, areas, quote. |
| **Carpet cleaning** | Services, areas, booking. |
| **Pressure washing** | Services, gallery, quote. |
| **Junk removal** | Quote, areas. |
| **Donation pickup** | Scheduling. |
| **Notary** | Services, locations, walk-in. |
| **Translation** | Languages, quote. |
| **Court reporting** | Services, scheduling. |
| **Process serving** | Areas, contact. |
| **Private investigation** | Services, contact. |
| **Security (physical)** | Guard, patrol, quote. |
| **Alarm / Smart home** | Systems, monitoring, quote. |
| **IT support** | Services, plans, contact. |
| **Web design agency** | Portfolio, services, contact. |
| **SEO agency** | Services, case studies. |
| **PR agency** | Services, clients. |
| **Video production** | Portfolio, process, quote. |
| **Podcast production** | Services, portfolio. |
| **Branding agency** | Process, portfolio. |
| **Print shop** | Products, quote. |
| **Signage** | Types, gallery, quote. |
| **Embroidery** | Products, quote. |
| **Engraving** | Products, quote. |
| **Screen printing** | Products, quote. |
| **Promo products** | Categories, quote. |
| **Office supplies** | Catalog, quote. |
| **Furniture (commercial)** | Categories, quote. |
| **Locks (commercial)** | Products, access control. |
| **Vending** | Locations, products. |
| **Coffee service** | Plans, contact. |
| **Water cooler** | Rental, contact. |
| **Uniforms** | Catalog, quote. |
| **Laundry (commercial)** | Services, quote. |
| **Dry cleaning** | Services, locations. |
| **Tailoring (commercial)** | Services, quote. |
| **Shoe repair** | Services, turnaround. |
| **Watch repair** | Services, quote. |
| **Key cutting** | Services, locations. |
| **Battery** | Automotive, replacement. |
| **Tire** | Inventory, service. |
| **Glass (auto)** | Repair/replacement. |
| **Auto body** | Services, gallery, quote. |
| **Detailing (mobile)** | Packages, booking. |
| **Towing** | Service areas, emergency. |
| **Roadside** | Services, membership. |
| **RV service** | Services, quote. |
| **Trailer** | Sales, service. |
| **Equipment (construction)** | Rentals, quote. |
| **Tool rental** | Inventory, quote. |
| **Party rental** | Categories, quote. |
| **Medical equipment** | Products, rental. |
| **Mobility** | Scooters, chairs, quote. |
| **Hearing** | Services, products. |
| **Compounding pharmacy** | Services, contact. |
| **DME** | Products, insurance. |
| **Lab** | Services, ordering. |
| **Imaging** | Services, scheduling. |
| **Surgery center** | Procedures, insurance. |
| **Dialysis** | Centers, services. |
| **Hospice** | Services, referral. |
| **Pharmacy** | Services, refill, delivery. |
| **Optical** | Frames, exam, contact. |
| **Dental lab** | Services, orders. |
| **Veterinary lab** | Services, ordering. |
| **Any other local/service business** | Services, contact, trust, CTA; adapt from nearest preset. |

---

### Accessibility Features

| Feature | Description |
|---------|-------------|
| **Skip to content** | Link to skip nav and go to main. |
| **Focus indicators** | Visible focus ring on all focusable elements. |
| **Touch target size** | Min 24×24px (WCAG 2.2 SC 2.5.8). |
| **Color contrast** | 4.5:1 text, 3:1 large text. |
| **Alt text** | Meaningful alt for images. |
| **ARIA labels** | Where needed for icons, custom controls. |
| **Heading hierarchy** | Logical h1–h6. |
| **Form labels** | Visible or properly associated. |
| **Error identification** | Inline errors, clear messages. |
| **Keyboard nav** | All functionality via keyboard. |
| **Focus trap** | In modals/drawers. |
| **Focus not obscured** | Focused element not hidden (WCAG 2.2). |
| **Reduced motion** | Respect prefers-reduced-motion. |
| **Drag alternative** | Non-drag way to complete (WCAG 2.2). |
| **No redundant re-entry** | Prefill where possible (WCAG 2.2). |
| **Live regions** | aria-live for dynamic updates. |
| **Screen reader only** | Visually hidden but announced. |
| **Caption/transcript** | For video/audio. |
| **Resize text** | No loss of content at 200% zoom. |

---

### Animation / Motion

| Pattern | Description |
|---------|-------------|
| **Fade in** | Element fades in on load or scroll. |
| **Slide up / down** | Element slides into view. |
| **Stagger** | Children animate in sequence. |
| **Parallax** | Background or layer moves at different speed. |
| **Hover lift** | Card or button lifts on hover. |
| **Hover scale** | Slight scale on hover. |
| **Hover underline** | Underline animates in on hover. |
| **Page transition** | Transition between routes. |
| **Loading skeleton** | Skeleton pulse while loading. |
| **Number count-up** | Stat counts from 0 to value. |
| **Progress bar fill** | Bar fills on scroll or load. |
| **Scroll-triggered** | Animation starts when in viewport. |
| **Reduced motion** | Disable or simplify if prefers-reduced-motion. |
| **Micro-interaction** | Button press, toggle, small feedback. |
| **Marquee / ticker** | Scrolling text or logos. |
| **Morphing shape** | SVG or shape morph (e.g. logo). |
| **Cursor follow** | Custom cursor or element following cursor. |

---

### Integration Points

| Integration | Description |
|-------------|-------------|
| **CRM** | HubSpot, Salesforce, Pipedrive — contact/lead sync. |
| **Email** | Mailchimp, Klaviyo, SendGrid — signup, campaigns. |
| **Analytics** | GA4, Plausible, Vercel Analytics, Mixpanel. |
| **Booking** | Calendly, Cal.com, Acuity, Mindbody, Vagaro, Square. |
| **Forms** | Typeform, Tally, custom + server actions. |
| **Chat** | Intercom, Drift, Crisp, custom chatbot. |
| **Payments** | Stripe, PayPal — donations, deposits. |
| **Maps** | Google Maps, Mapbox. |
| **Reviews** | Google, Yelp, Facebook — aggregate or embed. |
| **Social** | Facebook, Instagram, Twitter, LinkedIn — share, embed, feed. |
| **CMS** | Sanity, Storyblok, Contentful, Payload. |
| **Search** | Algolia, custom search index. |
| **CDN / Media** | Cloudinary, imgix, Vercel Blob. |
| **Monitoring** | Sentry, LogRocket. |
| **Consent** | OneTrust, Cookiebot, custom. |
| **A/B testing** | Vercel Edge Config, LaunchDarkly, Optimizely. |
| **SMS** | Twilio — notifications, opt-in. |
| **Calendar** | Google Calendar — availability, embed. |
| **Video** | YouTube, Vimeo, Wistia. |
| **Ecommerce** | Shopify, WooCommerce — link or embed. |

---

### Mobile-Specific

| Feature | Description |
|---------|-------------|
| **Responsive layout** | Breakpoints; stacked or simplified on small screens. |
| **Touch targets** | Min 24×24px; adequate spacing. |
| **Click-to-call** | tel: link for phone. |
| **Click-to-email** | mailto: or contact form. |
| **PWA** | manifest.json, service worker (optional). |
| **App install banner** | “Add to home screen” prompt. |
| **Bottom nav** | Fixed bottom navigation on mobile. |
| **Swipe** | Swipe for carousel or drawer. |
| **Pull to refresh** | Optional on list pages. |
| **Mobile menu** | Hamburger → full-screen or drawer. |
| **Sticky CTA** | Floating “Call” or “Book” on mobile. |
| **Simplified forms** | Fewer fields or steps on mobile. |
| **Native share** | Web Share API where supported. |
| **Viewport meta** | Proper viewport tag. |

---

### Micro-interactions

| Pattern | Description |
|---------|-------------|
| **Button hover** | Color or scale change. |
| **Button active** | Press state. |
| **Link hover** | Underline or color. |
| **Focus ring** | Visible focus state. |
| **Form field focus** | Border or shadow change. |
| **Checkbox/radio** | Check animation. |
| **Loading spinner** | Button or inline spinner. |
| **Success check** | Checkmark after submit. |
| **Toast** | Notification in/out animation. |
| **Tooltip** | Show/hide on hover/focus. |
| **Dropdown** | Open/close animation. |
| **Accordion** | Expand/collapse. |
| **Skeleton** | Placeholder pulse. |
| **Like/favorite** | Heart or icon toggle. |
| **Copy feedback** | “Copied!” on copy. |

---

### Data Visualization

| Element | Description |
|---------|-------------|
| **Bar chart** | Horizontal or vertical bars. |
| **Line chart** | Trend over time. |
| **Pie/donut** | Part of whole. |
| **Stat number** | Single KPI with optional trend. |
| **Counter** | Animated count-up. |
| **Progress bar** | Linear progress (e.g. goal). |
| **Progress ring** | Circular progress. |
| **Comparison bar** | Side-by-side (e.g. before/after). |
| **Infographic** | Illustrated stats or process. |
| **Table** | Sortable/filterable table. |
| **Sparkline** | Small inline trend. |
| **Map with data** | Choropleth or markers with values. |

---

### Community / Social

| Element | Description |
|---------|-------------|
| **Social feed** | Embedded or API-driven feed (Instagram, Twitter). |
| **Hashtag gallery** | User photos by hashtag. |
| **Reviews widget** | Recent reviews from Google/Yelp. |
| **Testimonial carousel** | Rotating testimonials. |
| **Forum link** | Link to community forum. |
| **User-generated content** | Curated UGC section. |
| **Social share** | Share buttons on content. |
| **Follow links** | Links to social profiles. |
| **Comment section** | On blog or pages (optional). |
| **Live chat** | Real-time chat. |

---

### Emerging Patterns

| Pattern | Description |
|---------|-------------|
| **AI chatbot** | LLM-powered chat for FAQ or lead qual. |
| **Voice search** | Optimize for voice queries; schema, FAQs. |
| **AR preview** | Try product in room or try-on. |
| **Generative content** | Dynamic copy or images (with guardrails). |
| **Personalized recommendations** | “For you” or “Similar” based on behavior. |
| **Conversational form** | Form as chat-like flow. |
| **Video message** | Personalized video from founder/team. |
| **Interactive 3D** | 3D product or environment. |
| **GEO optimization** | Structure and clarity for AI/LLM crawlers. |
| **Edge A/B testing** | Variant at edge (Vercel, Cloudflare). |
| **Progressive profiling** | Collect lead data over time, not all at once. |

---

## Part 4 — How This Catalog Informs the Repo

1. **Page types** — Support is via routes and content per app; shared packages don’t dictate which pages exist. Industry presets can suggest default routes (e.g. restaurant: menu, reservations).
2. **Hero/Nav/Footer/CTA** — Remain per-app. Catalog is a checklist for *what* each site can implement differently; primitives from `@repo/ui` (Container, Section, Button, Card, etc.) support building any variant.
3. **Features** — Contact, booking, blog, search, gallery, team, reviews live in `packages/features/*`. Each feature package should be **configurable and composable** (e.g. booking: different providers, steps, fields) so many patterns in the catalog are achievable without new packages.
4. **Industry-specific** — Presets in `packages/config/industry-presets/` define default features, nav, conversion flow, and schema type; per-industry content and sections stay in each app.
5. **Integrations** — Catalog aligns with `packages/integrations/*`: analytics, CRM, booking providers, CMS (later). New integrations can be added as needed.
6. **SEO, legal, a11y** — Handled in `@repo/infra` (security, middleware) and shared features (e.g. JSON-LD in features-reviews, consent in integrations-analytics). Apps use shared infra and add page-level content (privacy, terms, accessibility statement).
7. **Conversion, personalization, emerging** — Largely app-level or future (Phase 7). Shared pieces: consent (analytics), form/booking (features), and config (e.g. UTM or referrer in `SiteConfig`) so apps can implement these patterns without duplicating core logic.

Using this document as a **single reference** for “every feature, component, element” will keep the repo flexible and ensure each client site can be **unique and novel** while still sharing infrastructure and feature logic.
