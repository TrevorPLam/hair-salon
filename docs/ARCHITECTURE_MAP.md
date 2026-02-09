# Architecture Map

Status: INCOMPLETE. Populate as files are audited.

## High-Level Components

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
