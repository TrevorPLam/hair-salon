import type { SiteConfig } from '@repo/shared/types';

const siteConfig: SiteConfig = {
  id: 'hair-salon',
  name: 'Hair Salon Template',
  tagline: 'Professional hair care that makes you shine.',
  description:
    'Professional hair salon website template with modern design, booking system, and service showcase. Built with Next.js and Tailwind CSS.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',

  navLinks: [
    { href: '/services', label: 'Services' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/team', label: 'Team' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
  ],

  socialLinks: [
    { platform: 'facebook', url: 'https://www.facebook.com/hairsalontemplate' },
    { platform: 'twitter', url: 'https://www.twitter.com/hairsalontemplate' },
    { platform: 'linkedin', url: 'https://www.linkedin.com/company/hairsalontemplate' },
    { platform: 'instagram', url: 'https://www.instagram.com/hairsalontemplate' },
  ],

  footer: {
    columns: [
      {
        heading: 'Services',
        links: [
          { href: '/services/haircuts', label: 'Haircuts & Styling' },
          { href: '/services/coloring', label: 'Coloring Services' },
          { href: '/services/treatments', label: 'Treatments' },
          { href: '/services/special-occasions', label: 'Special Occasions' },
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
    copyrightTemplate: '© {year} Salon Template. All rights reserved.',
  },

  contact: {
    email: 'contact@hairsalontemplate.com',
    phone: '(555) 123-4567',
    address: {
      street: '123 Salon Street',
      city: 'Style City',
      state: 'ST',
      zip: '12345',
      country: 'US',
    },
    hours: [
      { label: 'Tue - Fri', hours: '10am - 7pm' },
      { label: 'Saturday', hours: '9am - 5pm' },
      { label: 'Sun - Mon', hours: 'Closed' },
    ],
  },

  seo: {
    titleTemplate: '%s | Hair Salon Template',
    defaultDescription:
      'Professional hair salon website template with modern design, booking system, and service showcase.',
    ogImage: '/og-image.png',
    twitterHandle: '@hairsalontemplate',
    schemaType: 'HairSalon',
  },

  theme: {
    primary: '174 85% 33%',
    'primary-foreground': '0 0% 100%',
    secondary: '220 20% 14%',
    'secondary-foreground': '0 0% 100%',
    accent: '174 85% 93%',
    'accent-foreground': '174 85% 20%',
    background: '220 14% 96%',
    foreground: '220 20% 8%',
    muted: '220 14% 92%',
    'muted-foreground': '220 10% 40%',
    card: '0 0% 100%',
    'card-foreground': '220 20% 8%',
    destructive: '0 84% 60%',
    'destructive-foreground': '0 0% 100%',
    border: '220 14% 88%',
    input: '220 14% 88%',
    ring: '174 85% 33%',
  },

  conversionFlow: {
    type: 'booking',
    serviceCategories: [
      'haircut-style',
      'color-highlights',
      'treatment',
      'special-occasion',
      'consultation',
    ],
    timeSlots: [
      { value: 'morning', label: 'Morning (9am - 12pm)' },
      { value: 'afternoon', label: 'Afternoon (12pm - 4pm)' },
      { value: 'evening', label: 'Evening (4pm - 8pm)' },
    ],
    maxAdvanceDays: 90,
  },
};

export default siteConfig;
