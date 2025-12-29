import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://yourdedicatedmarketer.com'),
  title: {
    default: 'Your Dedicated Marketer | Digital Marketing Services That Drive Results',
    template: '%s | Your Dedicated Marketer',
  },
  description: 'Expert digital marketing services for businesses that want to grow. We specialize in SEO, content marketing, social media, and email marketing that delivers real ROI.',
  keywords: ['digital marketing', 'SEO services', 'content marketing', 'social media marketing', 'email marketing', 'marketing agency'],
  authors: [{ name: 'Your Dedicated Marketer' }],
  creator: 'Your Dedicated Marketer',
  publisher: 'Your Dedicated Marketer',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdedicatedmarketer.com',
    siteName: 'Your Dedicated Marketer',
    title: 'Your Dedicated Marketer | Digital Marketing Services That Drive Results',
    description: 'Expert digital marketing services for businesses that want to grow. We specialize in SEO, content marketing, social media, and email marketing that delivers real ROI.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Your Dedicated Marketer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Dedicated Marketer | Digital Marketing Services That Drive Results',
    description: 'Expert digital marketing services for businesses that want to grow. SEO, content, social media, and email marketing that delivers ROI.',
    images: ['/og-image.jpg'],
    creator: '@yourdedicatedmarketer',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Your Dedicated Marketer',
              description: 'Expert digital marketing services for businesses that want to grow.',
              url: 'https://yourdedicatedmarketer.com',
              logo: 'https://yourdedicatedmarketer.com/logo.png',
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                email: 'contact@yourdedicatedmarketer.com',
              },
              sameAs: [
                'https://www.facebook.com/yourdedicatedmarketer',
                'https://www.twitter.com/yourdedicatedmarketer',
                'https://www.linkedin.com/company/yourdedicatedmarketer',
                'https://www.instagram.com/yourdedicatedmarketer',
              ],
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'US',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '127',
              },
            }),
          }}
        />
      </head>
      <body className="font-sans">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
