/**
 * @file templates/hair-salon/app/layout.tsx
 * @role runtime
 * @summary Root app layout defining document shell, metadata, CSP nonce, and global UI.
 *
 * @entrypoints
 * - Next.js App Router root layout for all routes
 *
 * @exports
 * - metadata
 * - default RootLayout
 *
 * @depends_on
 * - Internal: templates/hair-salon/app/globals.css
 * - Internal: templates/hair-salon/app/providers.tsx
 * - Internal: templates/hair-salon/components/Navigation.tsx
 * - Internal: templates/hair-salon/components/Footer.tsx
 * - Internal: templates/hair-salon/components/SkipToContent.tsx
 * - Internal: templates/hair-salon/components/InstallPrompt.tsx
 * - Internal: templates/hair-salon/components/AnalyticsConsentBanner.tsx
 * - Internal: templates/hair-salon/lib/csp.ts
 * - Internal: templates/hair-salon/lib/env.public.ts
 * - Internal: templates/hair-salon/lib/logger.ts
 * - Internal: templates/hair-salon/lib/search.ts
 * - Internal: templates/hair-salon/lib/constants.ts
 * - External: next, next/headers, next/font/google
 *
 * @used_by
 * - Next.js app router
 *
 * @runtime
 * - environment: server
 * - side_effects: reads request headers; logs warnings/errors; injects CSP nonce
 *
 * @data_flow
 * - inputs: request headers, public env, search index
 * - outputs: HTML shell, metadata, JSON-LD, consent banner props
 *
 * @invariants
 * - CSP nonce should be present in request headers from middleware
 * - metadataBase must be a valid URL
 *
 * @gotchas
 * - Fallback nonce is used if middleware omits the header
 *
 * @issues
 * - [severity:low] None observed in-file.
 *
 * @opportunities
 * - Verify structured data URLs derive from env (currently static strings)
 *
 * @verification
 * - Run dev server and confirm CSP nonce and structured data scripts render
 *
 * @status
 * - confidence: medium
 * - last_audited: 2026-02-09
 */

import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { IBM_Plex_Sans, Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SkipToContent from '@/components/SkipToContent';
import AnalyticsConsentBanner from '@/components/AnalyticsConsentBanner';
import Providers from '@/app/providers';
import InstallPrompt from '@/components/InstallPrompt';
import { createCspNonce, CSP_NONCE_HEADER } from '@/lib/csp';
import { getPublicBaseUrl, validatedPublicEnv } from '@/lib/env.public';
import { logError, logWarn } from '@/lib/logger';
import { getSearchIndex } from '@/lib/search';
import { ORGANIZATION } from '@/lib/constants';

// Font configuration with CSS variables
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-plex',
  display: 'swap',
  weight: ['400', '600', '700'],
});

const siteUrl = getPublicBaseUrl();
const analyticsId = validatedPublicEnv.NEXT_PUBLIC_ANALYTICS_ID;
const ogImageUrl = new URL('/api/og?title=Hair%20Salon%20Template', siteUrl).toString();
const NONCE_ERROR_FALLBACK = 'fallback-nonce';

function resolveCspNonce(requestHeaders: Headers): string {
  const headerNonce = requestHeaders.get(CSP_NONCE_HEADER);

  if (headerNonce) {
    return headerNonce;
  }

  // We prefer keeping the app online over hard-failing when middleware misses the header.
  logWarn('CSP nonce missing from request headers; using fallback nonce.', {
    header: CSP_NONCE_HEADER,
  });

  try {
    return createCspNonce();
  } catch (error) {
    // If crypto is unavailable, still return a nonce so the layout can render.
    logError('Failed to create CSP nonce fallback; using static nonce.', error, {
      header: CSP_NONCE_HEADER,
    });
    return NONCE_ERROR_FALLBACK;
  }
}

/**
 * Global metadata applied to all pages.
 * Child pages can override with their own metadata export.
 *
 * Title template: "%s | Hair Salon Template"
 * - Child page title replaces %s
 * - Example: "Services | Hair Salon Template"
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Hair Salon Template | Professional Hair Salon Website',
    template: '%s | Hair Salon Template',
  },
  description:
    'Professional hair salon website template with modern design, booking system, and service showcase. Perfect for hair stylists and salon owners.',
  keywords: [
    'hair salon',
    'hair stylist',
    'beauty salon',
    'haircut',
    'hair styling',
    'salon website',
    'booking system',
  ],
  authors: [{ name: 'Hair Salon Template' }],
  creator: 'Hair Salon Template',
  publisher: 'Hair Salon Template',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Hair Salon Template',
    title: 'Hair Salon Template | Professional Hair Salon Website',
    description:
      'Professional hair salon website template with modern design, booking system, and service showcase. Perfect for hair stylists and salon owners.',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Hair Salon Template brand preview image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hair Salon Template | Professional Hair Salon Website',
    description:
      'Professional hair salon website template with modern design and booking system. Perfect for hair stylists and salon owners.',
    images: [ogImageUrl],
    creator: '@hairsalontemplate',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const searchItems = await getSearchIndex();
  const requestHeaders = await headers();
  const cspNonce = resolveCspNonce(requestHeaders);

  return (
    <html lang="en" className={`${inter.variable} ${plexSans.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="HST" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />

        <script
          type="application/ld+json"
          nonce={cspNonce}
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Hair Salon Template',
              description:
                'Professional hair salon website template with modern design and booking system.',
              url: siteUrl,
              logo: new URL('/logo.png', siteUrl).toString(),
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                email: ORGANIZATION.CONTACT_EMAIL,
              },
              sameAs: [
                ORGANIZATION.SOCIAL_MEDIA.FACEBOOK,
                ORGANIZATION.SOCIAL_MEDIA.TWITTER,
                ORGANIZATION.SOCIAL_MEDIA.LINKEDIN,
                ORGANIZATION.SOCIAL_MEDIA.INSTAGRAM,
              ],
              address: {
                '@type': 'PostalAddress',
                addressCountry: ORGANIZATION.ADDRESS.COUNTRY,
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: ORGANIZATION.RATING.VALUE,
                reviewCount: ORGANIZATION.RATING.COUNT,
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          nonce={cspNonce}
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Hair Salon Template',
              url: siteUrl,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${siteUrl}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className="font-sans bg-muted text-foreground">
        <SkipToContent />
        <Navigation searchItems={searchItems} />
        <Providers>
          <main id="main-content" tabIndex={-1} className="focus-visible:outline-none">
            {children}
          </main>
        </Providers>
        <Footer />
        <InstallPrompt />
        {/* NOTE(consent): Banner must keep analytics default-off until user opts in. */}
        <AnalyticsConsentBanner analyticsId={analyticsId} nonce={cspNonce} />
      </body>
    </html>
  );
}
