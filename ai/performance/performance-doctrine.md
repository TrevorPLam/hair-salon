# Performance Doctrine

## Core Performance Principles

This document defines the performance requirements and standards for the hair salon application. All development must adhere to these principles to ensure optimal user experience.

---

@ai-performance This file defines the performance doctrine and requirements for the hair salon application, including Core Web Vitals thresholds, script loading policies, and performance optimization guidelines.

## Core Web Vitals Thresholds

### Largest Contentful Paint (LCP)

- **Target**: ≤ 2.5 seconds
- **Warning**: 2.5 - 4.0 seconds
- **Failing**: > 4.0 seconds

### First Input Delay (FID)

- **Target**: ≤ 100 milliseconds
- **Warning**: 100 - 300 milliseconds
- **Failing**: > 300 milliseconds

### Cumulative Layout Shift (CLS)

- **Target**: ≤ 0.1
- **Warning**: 0.1 - 0.25
- **Failing**: > 0.25

## Script Loading Policy

### Critical Scripts

- Must be loaded synchronously in the `<head>`
- Must be inline if possible
- Maximum size: 10KB compressed

### Non-Critical Scripts

- Must use `async` or `defer` attributes
- Load after DOM content is parsed
- Prefer dynamic imports for code splitting

### Third-Party Scripts

- Must be loaded with proper strategy
- Use Next.js Script component with appropriate loading strategy
- Implement consent gating for analytics scripts

```typescript
// Example: Proper script loading
import Script from 'next/script'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        {/* Critical CSS inline */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
      </head>
      <body>
        {children}

        {/* Non-critical scripts */}
        <Script
          src="https://cdn.example.com/analytics.js"
          strategy="afterInteractive"
          onLoad={() => {
            console.log('Analytics loaded')
          }}
        />

        {/* Deferred scripts */}
        <Script
          src="https://cdn.example.com/chat.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
```

## Server vs Client Component Guidelines

### Server Components (Default)

- Use for:
  - Data fetching
  - Database operations
  - Authentication checks
  - SEO-critical content
  - Static content generation

### Client Components (Opt-in)

- Use only when necessary:
  - Interactive elements (buttons, forms)
  - State management
  - Browser APIs (localStorage, window)
  - Event handlers
  - Real-time updates

```typescript
// ✅ Server Component - Default
export default function ServiceList() {
  const services = await getServices()

  return (
    <div>
      {services.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  )
}

// ❌ Client Component - Only when needed
'use client'

import { useState } from 'react'

export default function BookingForm() {
  const [selectedService, setSelectedService] = useState('')

  return (
    <form>
      <select
        value={selectedService}
        onChange={(e) => setSelectedService(e.target.value)}
      >
        <option value="">Select a service</option>
        {/* Options */}
      </select>
    </form>
  )
}
```

## Caching Rules

### Static Assets

- Images: Cache for 1 year with hash in filename
- CSS/JS: Cache for 1 year with hash in filename
- Fonts: Cache for 1 year

### API Responses

- GET requests: Cache based on content
- POST/PUT/DELETE: No caching
- User-specific data: Cache per user

### Browser Caching

- Use appropriate Cache-Control headers
- Implement ETags for conditional requests
- Use Service Workers for offline support

```typescript
// Example: API caching
export async function GET(request: Request) {
  const services = await getServices();

  return NextResponse.json(services, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=60',
      ETag: generateETag(services),
    },
  });
}
```

## Edge Runtime Preference

### Use Edge Runtime When:

- Global edge distribution needed
- Low latency required globally
- Simple compute operations
- No Node.js APIs needed

### Use Node.js Runtime When:

- Complex data processing
- Database connections
- File system operations
- Heavy computations

```typescript
// Edge runtime example
export const runtime = 'edge';

export async function GET() {
  return new Response('Hello from edge!', {
    headers: { 'Cache-Control': 'public, max-age=86400' },
  });
}
```

## Third-Party Script Restrictions

### Allowed Scripts

- Google Analytics (with consent)
- Google Tag Manager (with consent)
- Facebook Pixel (with consent)
- Essential payment processors

### Restricted Scripts

- No heavy chat widgets (> 50KB)
- No unnecessary tracking scripts
- No scripts that block rendering
- No scripts without proper consent

### Script Loading Requirements

- All scripts must be loaded with Next.js Script component
- Implement proper loading strategy
- Add error boundaries for script failures
- Monitor script performance impact

## Image Strategy

### Image Formats

- Use WebP for modern browsers
- Provide AVIF for supported browsers
- Fallback to JPEG for compatibility
- Use PNG for transparency only

### Image Optimization

- Compress all images before upload
- Use responsive images with srcset
- Implement lazy loading for below-the-fold images
- Use Next.js Image component automatically

```typescript
// ✅ Correct image usage
import Image from 'next/image'

export default function ServiceImage({ service }: { service: Service }) {
  return (
    <Image
      src={service.imageUrl}
      alt={service.name}
      width={400}
      height={300}
      priority={service.featured}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
      className="rounded-lg"
    />
  )
}
```

## Animation Performance Limits

### CSS Animations

- Prefer CSS transforms and opacity
- Avoid animating layout properties (width, height, margin)
- Use `will-change` sparingly
- Keep animations under 60fps

### JavaScript Animations

- Use requestAnimationFrame
- Throttle scroll events
- Debounce resize events
- Use CSS-in-JS libraries with performance optimization

```css
/* ✅ Performant animations */
.performant-animation {
  transform: translateX(0);
  opacity: 1;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
  will-change: transform, opacity;
}

/* ❌ Avoid these */
.slow-animation {
  width: 100px;
  height: 100px;
  margin-left: 20px;
  transition:
    width 0.3s ease,
    height 0.3s ease,
    margin-left 0.3s ease;
}
```

## Monitoring and Measurement

### Performance Budgets

- First Load JS: ≤ 150KB
- Total Bundle Size: ≤ 300KB
- Image Size per Page: ≤ 1MB
- Time to Interactive: ≤ 3 seconds

### Monitoring Tools

- Lighthouse CI in pipeline
- Real User Monitoring (RUM)
- Web Vitals reporting
- Bundle analysis tools

### Performance Testing

- Run Lighthouse audits on every PR
- Test on slow 3G networks
- Test on low-end devices
- Monitor Core Web Vitals in production

## Performance Checklist

Before deploying any changes:

- [ ] Lighthouse score ≥ 95 on mobile
- [ ] Bundle size within limits
- [ ] No render-blocking resources
- [ ] Images properly optimized
- [ ] Scripts use proper loading strategy
- [ ] Core Web Vitals within thresholds
- [ ] No layout shifts
- [ ] Fast time to interactive

## Performance Debt Management

### Identifying Performance Issues

- Regular performance audits
- User experience monitoring
- Bundle size tracking
- Core Web Vitals trends

### Prioritizing Fixes

- Critical: Blocking user interactions
- High: Core Web Vitals failures
- Medium: Bundle size overages
- Low: Minor optimizations

### Performance Reviews

- Monthly performance reviews
- Quarterly performance budgets
- Annual performance strategy updates

This doctrine ensures consistent performance optimization across the application and provides clear guidelines for developers.
