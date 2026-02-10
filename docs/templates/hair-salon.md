# Hair Salon Template Documentation

## Overview

The Hair Salon Template is a complete, production-ready website template designed for hair salons and related beauty service businesses. It provides a modern, performant, and SEO-optimized foundation that can be quickly customized for individual clients.

**Version:** 1.0.0  
**Location:** `templates/hair-salon/`  
**Based on:** Next.js 15.2.9 + React 19.0.0

## Features

### Core Features

✅ **Online Booking System**

- Service selection
- Stylist selection
- Date/time picker
- Form validation
- CRM integration (HubSpot)
- Email notifications

✅ **Service Showcase**

- Multiple service categories (Haircuts, Coloring, Treatments, Special Occasions)
- Detailed service descriptions
- Pricing information
- Before/after galleries
- SEO-optimized pages

✅ **Team Member Profiles**

- Individual stylist pages
- Photos and bios
- Specialties and experience
- Social media links
- Booking links

✅ **Blog & Content**

- MDX-powered blog
- Category filtering
- Search functionality
- Reading time estimates
- Syntax highlighting
- SEO metadata

✅ **Gallery**

- Portfolio showcase
- Category filtering
- Lightbox viewing
- Optimized images

✅ **Contact Forms**

- General contact form
- Validation with Zod
- Rate limiting
- Spam protection
- CRM integration

✅ **SEO & Performance**

- Server-side rendering
- Static page generation
- Open Graph images
- Structured data (JSON-LD)
- Sitemap generation
- robots.txt
- Optimized images
- Core Web Vitals optimization

✅ **Security**

- Content Security Policy (CSP)
- Security headers
- Rate limiting
- Input validation
- CSRF protection

✅ **Analytics**

- Google Analytics integration
- Privacy-compliant tracking
- Consent management
- Custom event tracking

## Technology Stack

### Frontend

- **Framework:** Next.js 15.2.9 (App Router)
- **UI Library:** React 19.0.0
- **Language:** TypeScript 5.7.2
- **Styling:** Tailwind CSS 3.4.17
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod validation

### Backend & Data

- **Database:** Supabase (PostgreSQL)
- **CRM:** HubSpot integration
- **Content:** MDX with frontmatter
- **Search:** Fuse.js (client-side)

### Development

- **Package Manager:** pnpm
- **Linting:** ESLint 9
- **Formatting:** Prettier
- **Testing:** Jest + React Testing Library
- **Type Checking:** TypeScript strict mode

## Directory Structure

```
hair-salon/
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── middleware.ts              # Security & CSP
├── app/                       # Next.js app directory
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   ├── about/                # About page
│   ├── blog/                 # Blog pages
│   │   ├── page.tsx          # Blog index
│   │   └── [slug]/           # Blog post detail
│   ├── book/                 # Booking page
│   ├── contact/              # Contact page
│   ├── gallery/              # Gallery page
│   ├── pricing/              # Pricing page
│   ├── services/             # Services pages
│   │   ├── page.tsx          # Services overview
│   │   ├── haircuts/
│   │   ├── coloring/
│   │   ├── treatments/
│   │   └── special-occasions/
│   ├── team/                 # Team page
│   ├── privacy/              # Privacy policy
│   └── terms/                # Terms of service
├── components/               # Shared components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── AnalyticsConsentBanner.tsx
│   └── ui/                   # UI components
├── features/                 # Feature modules
│   ├── analytics/            # Analytics & tracking
│   ├── blog/                 # Blog logic
│   ├── booking/              # Booking system
│   ├── contact/              # Contact forms
│   ├── hubspot/              # HubSpot integration
│   ├── search/               # Search functionality
│   ├── services/             # Services logic
│   └── supabase/             # Database integration
├── lib/                      # Utilities & helpers
│   ├── actions/              # Server actions
│   ├── env.ts                # Environment validation
│   ├── csp.ts                # Content Security Policy
│   ├── rate-limit.ts         # Rate limiting
│   └── security-headers.ts   # Security headers
├── public/                   # Static assets
│   ├── images/
│   └── logo.svg
└── content/                  # Content files
    └── blog/                 # Blog posts (MDX)
```

## Getting Started

### Prerequisites

- Node.js >= 24.0.0
- pnpm 10.29.2

### Installation

```bash
# Copy template to clients directory
cp -r templates/hair-salon clients/[client-name]

# Navigate to client directory
cd clients/[client-name]

# Install dependencies
pnpm install
```

### Configuration

1. **Create environment file** (`.env.local`):

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Your Salon Name"

# Business Information
NEXT_PUBLIC_BUSINESS_NAME="Your Salon"
NEXT_PUBLIC_BUSINESS_PHONE="(555) 123-4567"
NEXT_PUBLIC_BUSINESS_EMAIL="info@yoursalon.com"
NEXT_PUBLIC_BUSINESS_ADDRESS="123 Main St, City, State 12345"

# Features
NEXT_PUBLIC_ENABLE_BOOKING=true
NEXT_PUBLIC_ENABLE_BLOG=true

# API Keys (Optional - get from services)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=
HUBSPOT_API_KEY=
HUBSPOT_PORTAL_ID=
SUPABASE_URL=
SUPABASE_ANON_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

2. **Update branding** in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Your brand colors
          50: '#fef2f2',
          // ... more shades
          900: '#7f1d1d',
        },
      },
    },
  },
};
```

3. **Update metadata** in `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Your Salon Name',
  description: 'Professional hair salon services...',
};
```

### Development

```bash
# Start development server
pnpm dev

# Visit http://localhost:3000

# Run type checking
pnpm type-check

# Run linting
pnpm lint

# Run tests
pnpm test
```

### Building

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## Customization Guide

### Branding

#### Colors

Edit `tailwind.config.js` to set your brand colors:

```javascript
colors: {
  primary: { /* your primary color palette */ },
  secondary: { /* your secondary color palette */ },
}
```

#### Logo

Replace `public/logo.svg` with your client's logo.

#### Fonts

Update font in `app/layout.tsx`:

```typescript
import { YourFont } from 'next/font/google';

const font = YourFont({ subsets: ['latin'] });
```

### Content

#### Services

Edit service pages in `app/services/[service-name]/page.tsx`:

```typescript
const services = [
  {
    name: 'Service Name',
    description: 'Service description',
    price: '$50+',
    duration: '30 min',
  },
];
```

#### Team Members

Update team data in `app/team/page.tsx`:

```typescript
const team = [
  {
    name: 'Stylist Name',
    role: 'Senior Stylist',
    bio: 'Biography...',
    image: '/images/team/stylist.jpg',
  },
];
```

#### Blog Posts

Add MDX files to `content/blog/`:

```mdx
---
title: 'Blog Post Title'
date: '2026-02-10'
author: 'Author Name'
excerpt: 'Short description...'
category: 'hair-care'
image: '/images/blog/post.jpg'
---

# Your blog content here...
```

### Features

#### Enable/Disable Features

Use environment variables:

```bash
NEXT_PUBLIC_ENABLE_BOOKING=false  # Disable booking
NEXT_PUBLIC_ENABLE_BLOG=true      # Enable blog
```

#### Add New Pages

Create files in `app/` directory:

```typescript
// app/new-page/page.tsx
export default function NewPage() {
  return <div>New Page Content</div>;
}
```

### Integrations

#### Google Analytics

Add your GA ID to `.env.local`:

```bash
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

#### HubSpot CRM

Configure HubSpot in `.env.local`:

```bash
HUBSPOT_API_KEY=your-api-key
HUBSPOT_PORTAL_ID=your-portal-id
```

#### Supabase Database

Set up Supabase credentials:

```bash
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
```

## SEO Optimization

### Metadata

Each page should have proper metadata:

```typescript
export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
  openGraph: {
    title: 'OG Title',
    description: 'OG Description',
    images: ['/og-image.jpg'],
  },
};
```

### Structured Data

Add JSON-LD for local business:

```typescript
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'HairSalon',
  name: 'Salon Name',
  // ... more properties
};
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure build settings:
   - **Framework:** Next.js
   - **Root Directory:** `clients/[client-name]`
   - **Build Command:** `pnpm build`
4. Add environment variables
5. Deploy

### Docker

```bash
# Build image
docker build -t salon-app .

# Run container
docker run -p 3000:3000 salon-app
```

### Other Platforms

- Netlify
- AWS Amplify
- Azure Static Web Apps
- Self-hosted with PM2 or similar

## Performance

### Built-in Optimizations

- ✅ Server-side rendering
- ✅ Static page generation
- ✅ Image optimization
- ✅ Font optimization
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minification

### Best Practices

1. Use Next.js `<Image>` component
2. Lazy load below-the-fold content
3. Minimize JavaScript bundles
4. Optimize images before uploading
5. Enable caching headers
6. Use CDN for assets

## Security

### Built-in Security

- ✅ Content Security Policy (CSP)
- ✅ Security headers (HSTS, etc.)
- ✅ Rate limiting on forms
- ✅ Input validation with Zod
- ✅ CSRF protection
- ✅ XSS protection

### Additional Recommendations

1. Keep dependencies updated
2. Use environment variables for secrets
3. Enable HTTPS in production
4. Implement proper authentication
5. Regular security audits
6. Monitor for vulnerabilities

## Troubleshooting

### Build Errors

**Missing dependencies:**

```bash
pnpm install
```

**Type errors:**

```bash
pnpm type-check
```

### Runtime Errors

**Module not found:**

- Check imports are correct
- Verify file paths
- Ensure dependencies are installed

**Environment variables:**

- Verify `.env.local` exists
- Check variable names match code
- Restart dev server after changes

### Performance Issues

1. Check image sizes and formats
2. Analyze bundle size with `@next/bundle-analyzer`
3. Profile with React DevTools
4. Monitor Core Web Vitals

## Support & Resources

- **Template Issues:** Open issue in repository
- **Next.js Documentation:** https://nextjs.org/docs
- **React Documentation:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com/docs
- **TypeScript:** https://www.typescriptlang.org/docs

## Changelog

### Version 1.0.0 (2026-02-10)

- Initial release
- Complete feature set
- Production-ready
- Comprehensive documentation

---

**Template Maintainer:** Development Team  
**Last Updated:** 2026-02-10
