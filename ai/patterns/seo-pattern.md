# SEO Pattern

## Problem It Solves

Inconsistent SEO implementation leads to poor search rankings, missing metadata, and reduced organic traffic. This pattern provides comprehensive SEO optimization for all pages.

## When to Use

- All public-facing pages
- Blog posts and content pages
- Service and product pages
- Landing pages

## When NOT to Use

- Admin/dashboard pages
- Authentication pages
- Internal utility pages

## Required Constraints

1. **Metadata**: Complete meta tags for all pages
2. **Structured Data**: Proper schema markup
3. **Performance**: Fast loading and Core Web Vitals
4. **Accessibility**: Semantic HTML and proper heading structure
5. **Mobile**: Responsive design and mobile-first approach

## Example Implementation

```typescript
/**
 * @ai-pattern SEO Pattern
 * @ai-performance Optimized
 * @ai-accessibility WCAG AA
 * @ai-tests Required
 * @ai-reference /ai/patterns/seo-pattern.md
 */

import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// SEO metadata interface
interface SEOData {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  openGraph?: {
    title?: string
    description?: string
    image?: string
    type?: string
    url?: string
  }
  twitter?: {
    card?: 'summary' | 'summary_large_image'
    title?: string
    description?: string
    image?: string
  }
  jsonLd?: Record<string, any>[]
  noindex?: boolean
  nofollow?: boolean
}

// SEO metadata generator
export function generateMetadata(seoData: SEOData): Metadata {
  const {
    title,
    description,
    keywords,
    canonical,
    openGraph,
    twitter,
    jsonLd,
    noindex,
    nofollow,
  } = seoData

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords?.join(', '),
    robots: {
      index: !noindex,
      follow: !nofollow,
    },
  }

  if (canonical) {
    metadata.alternateCanonical = canonical
  }

  if (openGraph) {
    metadata.openGraph = {
      title: openGraph.title || title,
      description: openGraph.description || description,
      images: openGraph.image ? [{ url: openGraph.image }] : undefined,
      type: openGraph.type || 'website',
      url: openGraph.url || canonical,
    }
  }

  if (twitter) {
    metadata.twitter = {
      card: twitter.card || 'summary_large_image',
      title: twitter.title || title,
      description: twitter.description || description,
      images: twitter.image ? [twitter.image] : undefined,
    }
  }

  return metadata
}

// Structured data component
export function StructuredData({ data }: { data: Record<string, any>[] }) {
  return (
    <>
      {data.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}

// Service page SEO data
export function getServicePageSEO(service: Service): SEOData {
  return {
    title: `${service.name} - Professional Hair Services | Salon Name`,
    description: `Book ${service.name.toLowerCase()} at Salon Name. ${service.description}. Professional stylists, competitive prices, online booking.`,
    keywords: [
      service.name.toLowerCase(),
      'hair salon',
      'professional hairstyling',
      'beauty services',
      'hair treatments',
    ],
    openGraph: {
      title: `${service.name} - Salon Name`,
      description: service.description,
      image: service.imageUrl,
      type: 'service',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.name} - Salon Name`,
      description: service.description,
      image: service.imageUrl,
    },
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.name,
        description: service.description,
        provider: {
          '@type': 'LocalBusiness',
          name: 'Salon Name',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '123 Main St',
            addressLocality: 'City',
            addressRegion: 'State',
            postalCode: '12345',
          },
        },
        offers: {
          '@type': 'Offer',
          price: service.price,
          priceCurrency: 'USD',
        },
      },
    ],
  }
}

// Blog post SEO data
export function getBlogPostSEO(post: BlogPost): SEOData {
  return {
    title: `${post.title} - Hair Care Tips | Salon Name Blog`,
    description: post.excerpt,
    keywords: post.tags,
    canonical: `https://salon.com/blog/${post.slug}`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      image: post.featuredImage,
      type: 'article',
      url: `https://salon.com/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      image: post.featuredImage,
    },
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: post.featuredImage,
        author: {
          '@type': 'Person',
          name: post.author.name,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Salon Name',
          logo: {
            '@type': 'ImageObject',
            url: 'https://salon.com/logo.png',
          },
        },
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://salon.com/blog/${post.slug}`,
        },
      },
    ],
  }
}

// Page implementation example
export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug)
  
  if (!service) {
    notFound()
  }

  const seoData = getServicePageSEO(service)

  return (
    <>
      <StructuredData data={seoData.jsonLd || []} />
      <main>
        <article>
          <header>
            <h1>{service.name}</h1>
            <p>{service.description}</p>
          </header>
          
          <section>
            <h2>Service Details</h2>
            <p>{service.longDescription}</p>
            <div>
              <span>Duration: {service.duration} minutes</span>
              <span>Price: ${service.price}</span>
            </div>
          </section>
          
          <section>
            <h2>Book This Service</h2>
            <BookingForm serviceId={service.id} />
          </section>
        </article>
      </main>
    </>
  )
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug)
  
  if (!service) {
    return {}
  }

  const seoData = getServicePageSEO(service)
  return generateMetadata(seoData)
}
```

## Anti-Pattern Example

```typescript
// ❌ WRONG - No SEO optimization
export default function ServicePage({ service }) {
  return (
    <div>
      <h1>{service.name}</h1>
      <p>{service.description}</p>
      <button>Book Now</button>
    </div>
  )
}
```

## Testing Requirements

1. **Metadata Tests**: Verify all meta tags are generated
2. **Structured Data Tests**: Validate JSON-LD schemas
3. **Performance Tests**: Ensure fast loading
4. **Accessibility Tests**: Verify semantic HTML

```typescript
import { getServicePageSEO } from '../seo'

describe('SEO Pattern', () => {
  it('should generate complete metadata', () => {
    const service = {
      name: 'Haircut',
      description: 'Professional haircut service',
      price: 50,
      imageUrl: '/images/haircut.jpg',
    }
    
    const seoData = getServicePageSEO(service)
    
    expect(seoData.title).toContain('Haircut')
    expect(seoData.description).toContain('Professional haircut')
    expect(seoData.openGraph?.title).toBe('Haircut - Salon Name')
    expect(seoData.jsonLd).toHaveLength(1)
    expect(seoData.jsonLd[0]['@type']).toBe('Service')
  })
})
```

## Performance Implications

- **Metadata**: Minimal impact on page load
- **Structured Data**: Small JSON payload (< 2KB)
- **Images**: Optimize images for SEO

## Security Implications

- **Content Security Policy**: Allow inline scripts for structured data
- **XSS Prevention**: Sanitize user-generated content in metadata

## Related Patterns

- [Content Block Pattern](./content-block-pattern.md) - For content structure
- [Performance Pattern](./performance-pattern.md) - For page optimization
- [Accessibility Pattern](./accessibility-pattern.md) - For a11y compliance
