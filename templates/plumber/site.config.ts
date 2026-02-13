import type { SiteConfig } from '@repo/shared/types';

const siteConfig: SiteConfig = {
  id: 'plumber',
  name: 'Plumber Template',
  tagline: 'Professional plumbing services you can trust.',
  description:
    'Professional plumbing website template with modern design, quote request system, and service showcase. Built with Next.js and Tailwind CSS.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',

  navLinks: [
    { href: '/services', label: 'Services' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/team', label: 'Team' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
  ],

  socialLinks: [
    { platform: 'facebook', url: 'https://www.facebook.com/plumbertemplate' },
    { platform: 'twitter', url: 'https://www.twitter.com/plumbertemplate' },
    { platform: 'linkedin', url: 'https://www.linkedin.com/company/plumbertemplate' },
  ],

  footer: {
    columns: [
      {
        heading: 'Services',
        links: [
          { href: '/services/residential', label: 'Residential Plumbing' },
          { href: '/services/commercial', label: 'Commercial Plumbing' },
          { href: '/services/emergency', label: 'Emergency Repairs' },
          { href: '/services/maintenance', label: 'Maintenance Plans' },
        ],
      },
      {
        heading: 'Company',
        links: [
          { href: '/about', label: 'About Us' },
          { href: '/services', label: 'Services' },
          { href: '/contact', label: 'Contact' },
        ],
      },
    ],
    legalLinks: [
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
    ],
    copyrightTemplate: '© {year} Plumber Template. All rights reserved.',
  },

  contact: {
    email: 'contact@plumbertemplate.com',
    phone: '(555) 555-1234',
    address: {
      street: '456 Pipe Lane',
      city: 'Fixture City',
      state: 'FL',
      zip: '33001',
      country: 'US',
    },
    hours: [
      { label: 'Mon - Fri', hours: '8am - 6pm' },
      { label: 'Saturday', hours: '9am - 2pm' },
      { label: 'Sunday', hours: 'Emergency calls only' },
    ],
  },

  seo: {
    titleTemplate: '%s | Plumber Template',
    defaultDescription:
      'Professional plumbing website template with modern design, quote request system, and service showcase.',
    ogImage: '/og-image.png',
    twitterHandle: '@plumbertemplate',
    schemaType: 'Plumber',
  },

  theme: {
    primary: '210 80% 45%',
    'primary-foreground': '0 0% 100%',
    secondary: '210 20% 20%',
    'secondary-foreground': '0 0% 100%',
    accent: '210 80% 90%',
    'accent-foreground': '210 80% 25%',
    background: '210 14% 96%',
    foreground: '210 20% 8%',
    muted: '210 14% 92%',
    'muted-foreground': '210 10% 40%',
    card: '0 0% 100%',
    'card-foreground': '210 20% 8%',
    destructive: '0 84% 60%',
    'destructive-foreground': '0 0% 100%',
    border: '210 14% 88%',
    input: '210 14% 88%',
    ring: '210 80% 45%',
  },

  conversionFlow: {
    type: 'quote',
    serviceCategories: [
      'residential-repair',
      'commercial-service',
      'emergency-response',
      'maintenance-plan',
    ],
    allowAttachments: true,
  },
};

export default siteConfig;
