# Structured Data

## Schema Markup for Salons

This document provides structured data implementations for salon websites to improve SEO and search visibility.

## Local Business Schema

### Basic Salon Information
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://salon.com#business",
  "name": "Salon Name",
  "description": "Professional hair salon offering cuts, coloring, and styling services",
  "url": "https://salon.com",
  "telephone": "+1-555-0123",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "openingHours": [
    "Mo-Fr 09:00-18:00",
    "Sa 09:00-17:00",
    "Su Closed"
  ],
  "priceRange": "$$",
  "paymentAccepted": ["Cash", "Credit Card", "Apple Pay", "Google Pay"],
  "currenciesAccepted": "USD"
}
```

### Enhanced Salon Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "@id": "https://salon.com#salon",
  "name": "Salon Name",
  "description": "Full-service beauty salon specializing in hair care, coloring, and styling",
  "url": "https://salon.com",
  "telephone": "+1-555-0123",
  "email": "info@salon.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  "openingHours": [
    "Mo-Fr 09:00-18:00",
    "Sa 09:00-17:00",
    "Su Closed"
  ],
  "priceRange": "$$",
  "paymentAccepted": ["Cash", "Credit Card", "Apple Pay", "Google Pay"],
  "currenciesAccepted": "USD",
  "image": "https://salon.com/images/salon-exterior.jpg",
  "logo": "https://salon.com/logo.png",
  "sameAs": [
    "https://facebook.com/salonname",
    "https://instagram.com/salonname",
    "https://twitter.com/salonname"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Salon Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Haircut",
          "description": "Professional haircut and styling",
          "category": "Hair Services"
        },
        "price": "50",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    ]
  }
}
```

## Service Schema

### Individual Service
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://salon.com/services/haircut#service",
  "name": "Professional Haircut",
  "description": "Expert haircut consultation and precision cutting with personalized styling",
  "provider": {
    "@type": "LocalBusiness",
    "@id": "https://salon.com#business",
    "name": "Salon Name"
  },
  "serviceType": "Hair Cutting",
  "category": "Beauty & Personal Care",
  "offers": {
    "@type": "Offer",
    "price": "50",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "validFrom": "2024-01-01",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "price": "50",
      "priceCurrency": "USD",
      "valueAddedTaxIncluded": "true"
    }
  },
  "areaServed": "City, State",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Haircut Options",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Women's Haircut"
        },
        "price": "60",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Men's Haircut"
        },
        "price": "40",
        "priceCurrency": "USD"
      }
    ]
  }
}
```

## Review and Rating Schema

### Aggregate Rating
```json
{
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "@id": "https://salon.com#rating",
  "itemReviewed": {
    "@type": "LocalBusiness",
    "@id": "https://salon.com#business",
    "name": "Salon Name"
  },
  "ratingValue": "4.8",
  "reviewCount": "156",
  "bestRating": "5",
  "worstRating": "1",
  "ratingExplanation": "Average rating based on customer reviews"
}
```

### Individual Review
```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "@id": "https://salon.com/reviews/123#review",
  "itemReviewed": {
    "@type": "LocalBusiness",
    "@id": "https://salon.com#business",
    "name": "Salon Name"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5",
    "worstRating": "1"
  },
  "author": {
    "@type": "Person",
    "name": "Sarah Johnson"
  },
  "datePublished": "2024-01-15",
  "reviewBody": "Amazing experience! The stylist really listened to what I wanted and delivered the perfect cut. The salon is beautiful and the staff is so friendly.",
  "publisher": {
    "@type": "Organization",
    "name": "Google"
  }
}
```

## Event Schema (Special Offers)

### Special Event
```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "@id": "https://salon.com/events/summer-special#event",
  "name": "Summer Beauty Special",
  "description": "Get 20% off all coloring services during our summer special event",
  "url": "https://salon.com/summer-special",
  "startDate": "2024-06-01",
  "endDate": "2024-08-31",
  "location": {
    "@type": "Place",
    "name": "Salon Name",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Main Street",
      "addressLocality": "City",
      "addressRegion": "State",
      "postalCode": "12345",
      "addressCountry": "US"
    }
  },
  "organizer": {
    "@type": "Organization",
    "@id": "https://salon.com#business",
    "name": "Salon Name",
    "url": "https://salon.com"
  },
  "offers": {
    "@type": "Offer",
    "price": "40",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "validFrom": "2024-06-01",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "price": "40",
      "priceCurrency": "USD",
      "valueAddedTaxIncluded": "true"
    }
  }
}
```

## FAQ Schema

### Frequently Asked Questions
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://salon.com/faq#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How far in advance should I book my appointment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We recommend booking at least 1-2 weeks in advance for popular times, but we often have same-day availability for weekdays."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer consultations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! We offer free 15-minute consultations for all new clients to discuss your hair goals and recommend the best services."
      }
    },
    {
      "@type": "Question",
      "name": "What payment methods do you accept?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We accept cash, all major credit cards, Apple Pay, Google Pay, and PayPal. We also offer payment plans for larger services."
      }
    }
  ]
}
```

## How-To Schema

### Hair Care Tutorial
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": "https://salon.com/blog/how-to-maintain-color#howto",
  "name": "How to Maintain Your Hair Color Between Appointments",
  "description": "Professional tips for keeping your hair color vibrant and fresh between salon visits",
  "image": "https://salon.com/images/hair-color-maintenance.jpg",
  "totalTime": "PT10M",
  "supply": [
    {
      "@type": "HowToSupply",
      "name": "Color-safe shampoo"
    },
    {
      "@type": "HowToSupply",
      "name": "Color-safe conditioner"
    },
    {
      "@type": "HowToSupply",
      "name": "Leave-in treatment"
    }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "name": "Wash with cool water",
      "text": "Use cool or lukewarm water to wash your hair, as hot water can strip color",
      "image": "https://salon.com/images/wash-cool-water.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Use color-safe products",
      "text": "Always use shampoos and conditioners specifically formulated for color-treated hair",
      "image": "https://salon.com/images/color-safe-products.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Apply leave-in treatment",
      "text": "Apply a color-protecting leave-in treatment to damp hair for extra protection",
      "image": "https://salon.com/images/leave-in-treatment.jpg"
    }
  ],
  "tool": [
    {
      "@type": "HowToTool",
      "name": "Wide-tooth comb"
    }
  ]
}
```

## BreadcrumbList Schema

### Navigation Breadcrumbs
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://salon.com/services/haircut#breadcrumbs",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://salon.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://salon.com/services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Haircut",
      "item": "https://salon.com/services/haircut"
    }
  ]
}
```

## Website Schema

### Organization Information
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://salon.com#website",
  "name": "Salon Name",
  "url": "https://salon.com",
  "description": "Professional hair salon offering expert cuts, coloring, and styling services",
  "publisher": {
    "@type": "Organization",
    "@id": "https://salon.com#business",
    "name": "Salon Name",
    "logo": {
      "@type": "ImageObject",
      "url": "https://salon.com/logo.png",
      "width": 200,
      "height": 200
    }
  },
  "potentialAction": [
    {
      "@type": "SearchAction",
      "target": "https://salon.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    {
      "@type": "ReserveAction",
      "target": "https://salon.com/book",
      "object": {
        "@type": "Service",
        "name": "Book Appointment"
      }
    }
  ]
}
```

## Implementation Guidelines

### JSON-LD Placement
```html
<!-- Place in <head> section -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Salon Name"
}
</script>
```

### Multiple Schemas
```html
<!-- Combine related schemas -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://salon.com#business",
      "name": "Salon Name"
    },
    {
      "@type": "AggregateRating",
      "@id": "https://salon.com#rating",
      "ratingValue": "4.8",
      "reviewCount": "156"
    }
  ]
}
</script>
```

### Dynamic Schema Generation
```typescript
// Generate schema dynamically based on page content
function generateServiceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "offers": {
      "@type": "Offer",
      "price": service.price,
      "priceCurrency": "USD"
    }
  }
}

// Use in Next.js page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug)
  const schema = generateServiceSchema(service)
  
  return {
    title: service.name,
    other: {
      'application/ld+json': JSON.stringify(schema)
    }
  }
}
```

### Validation Tools
- **Google Rich Results Test**: Test structured data
- **Schema.org Validator**: Validate markup
- **Google Search Console**: Monitor implementation
- **Rich Results Testing**: Check appearance

This structured data implementation ensures maximum visibility in search results and rich snippets.
