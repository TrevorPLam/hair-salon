/**
 * @ai-pattern SEO Pattern
 * @ai-performance Optimized
 * @ai-accessibility WCAG AA
 * @ai-tests Required
 * @ai-reference /ai/patterns/seo-pattern.md
 */

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { StructuredData } from '@/components/StructuredData'

// SEO data interface
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
}

// Service data interface
interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number
  imageUrl: string
  category: string
  features: string[]
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
  } = seoData

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords?.join(', '),
    robots: {
      index: true,
      follow: true,
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

// Service page SEO data generator
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
      service.category.toLowerCase(),
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

// SEO-optimized service page component
interface ServicePageProps {
  service: Service
}

export default function ServicePage({ service }: ServicePageProps) {
  const seoData = getServicePageSEO(service)

  return (
    <>
      <StructuredData data={seoData.jsonLd || []} />
      <main>
        <article className="max-w-4xl mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {service.name}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {service.description}
            </p>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-semibold text-primary-600">
                ${service.price}
              </span>
              <span className="text-gray-500">
                • {service.duration} minutes
              </span>
            </div>
          </header>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              What's Included
            </h2>
            <ul className="space-y-2">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              About This Service
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                Our {service.name.toLowerCase()} service is designed to provide you with 
                exceptional results using premium products and techniques. Our experienced 
                stylists are trained in the latest trends and will work with you to achieve 
                your desired look.
              </p>
              <p>
                This service includes a consultation to determine the best approach for your hair 
                type and lifestyle, followed by the actual service execution. We use only 
                high-quality, professional-grade products to ensure lasting results.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Before & After Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={service.imageUrl}
                  alt={`${service.name} before`}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
                  Before
                </div>
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={service.imageUrl}
                  alt={`${service.name} after`}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
                  After
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="bg-gray-50 p-4 rounded-lg">
                <summary className="font-medium cursor-pointer">
                  How long does this service take?
                </summary>
                <div className="mt-2 text-gray-700">
                  This {service.name.toLowerCase()} service takes approximately {service.duration} minutes, 
                  though timing may vary based on hair length and complexity.
                </div>
              </details>
              <details className="bg-gray-50 p-4 rounded-lg">
                <summary className="font-medium cursor-pointer">
                  What should I do to prepare?
                </summary>
                <div className="mt-2 text-gray-700">
                  Come with clean, dry hair. If you have specific inspiration photos, 
                  feel free to bring them along. Avoid using heavy styling products for 24 hours 
                  before your appointment.
                </div>
              </details>
              <details className="bg-gray-50 p-4 rounded-lg">
                <summary className="font-medium cursor-pointer">
                  How do I maintain my style?
                </summary>
                <div className="mt-2 text-gray-700">
                  We'll provide personalized aftercare instructions and recommend products 
                  to maintain your look. Schedule a follow-up appointment in 4-6 weeks for maintenance.
                </div>
              </details>
            </div>
          </section>

          <section className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Ready to Book?
            </h2>
            <p className="text-gray-600 mb-6">
              Book your {service.name.toLowerCase()} appointment today and experience the difference 
              our professional stylists can make.
            </p>
            <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
              Book {service.name}
            </button>
          </section>
        </article>
      </main>
    </>
  )
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  // In a real implementation, you would fetch the service by slug
  const service = getServiceBySlug(params.slug)
  
  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
    }
  }

  const seoData = getServicePageSEO(service)
  return generateMetadata(seoData)
}

// Helper function (in real implementation, this would fetch from database)
function getServiceBySlug(slug: string): Service | null {
  // This would typically fetch from your database or CMS
  const services: Service[] = [
    {
      id: '1',
      name: 'Signature Haircut',
      description: 'Our signature haircut includes consultation, precision cut, and styling with premium products.',
      price: 75,
      duration: 60,
      imageUrl: '/images/services/haircut.jpg',
      category: 'Hair Services',
      features: [
        'Personalized consultation',
        'Precision cutting',
        'Professional styling',
        'Premium products',
        'Aftercare advice',
      ],
    },
    // ... other services
  ]

  return services.find(service => service.id === slug) || null
}
