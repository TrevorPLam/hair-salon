// File: lib/routes.ts  [TRACE:FILE=lib.routes]
// Purpose: Single authoritative route registry — consumed by sitemap.ts and search.ts
//          to prevent route drift between navigation, sitemap, and search index.
//
// Exports / Entry: ROUTES, getRoutesByPriority, getSearchableRoutes
// Used by: app/sitemap.ts, lib/search.ts, components/Navigation (future)
//
// Invariants:
// - Every page route MUST be registered here
// - Adding/removing a route updates sitemap AND search automatically
// - Priority values follow sitemap protocol: 1.0 (homepage) to 0.1 (low priority)
//
// Status: @public
// Features:
// - [FEAT:ROUTING] Centralized route definitions
// - [FEAT:SEO] Sitemap priority and change frequency
// - [FEAT:SEARCH] Search index metadata

export interface RouteDefinition {
  /** URL path relative to site root */
  path: string;
  /** Human-readable title */
  title: string;
  /** Short description for search results and sitemap */
  description: string;
  /** Sitemap priority (0.0 to 1.0) */
  priority: number;
  /** Sitemap change frequency */
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  /** Whether this route should appear in search index */
  searchable: boolean;
  /** Optional search keywords for ranking boost */
  keywords?: string[];
  /** Optional category for grouping in search results */
  category?: string;
}

/**
 * Canonical route registry for the hair-salon template.
 *
 * Sources merged:
 * - app/sitemap.ts (sitemap priorities & change frequencies)
 * - lib/search.ts  (search descriptions, tags/keywords)
 *
 * When adding a new page, add a single entry here and both sitemap
 * and search index will pick it up automatically once the consumers
 * are refactored (see Task 0.25 TODOs in sitemap.ts / search.ts).
 */
export const ROUTES: RouteDefinition[] = [
  {
    path: '/',
    title: 'Home',
    description: 'Overview of our hair salon services, pricing, and booking information.',
    priority: 1.0,
    changeFrequency: 'weekly',
    searchable: true,
    keywords: ['hair salon', 'services', 'styling'],
    category: 'main',
  },
  {
    path: '/about',
    title: 'About',
    description: 'Learn about our stylists, mission, and hair care philosophy.',
    priority: 0.8,
    changeFrequency: 'monthly',
    searchable: true,
    keywords: ['team', 'mission'],
    category: 'main',
  },
  {
    path: '/services',
    title: 'Services',
    description: 'Explore haircuts, coloring, styling, and hair treatment services.',
    priority: 0.9,
    changeFrequency: 'monthly',
    searchable: true,
    keywords: ['hair services', 'treatments', 'styling'],
    category: 'services',
  },
  {
    path: '/services/haircuts',
    title: 'Haircuts',
    description: 'Professional haircut services for all styles and lengths.',
    priority: 0.8,
    changeFrequency: 'monthly',
    searchable: true,
    keywords: ['haircuts', 'hair styling', 'trim'],
    category: 'services',
  },
  {
    path: '/services/coloring',
    title: 'Coloring',
    description: 'Hair coloring, highlights, balayage, and color correction services.',
    priority: 0.8,
    changeFrequency: 'monthly',
    searchable: true,
    keywords: ['hair color', 'highlights', 'balayage'],
    category: 'services',
  },
  {
    path: '/services/treatments',
    title: 'Treatments',
    description: 'Deep conditioning, keratin, and restorative hair treatments.',
    priority: 0.8,
    changeFrequency: 'monthly',
    searchable: true,
    keywords: ['hair treatments', 'conditioning', 'keratin'],
    category: 'services',
  },
  {
    path: '/services/special-occasions',
    title: 'Special Occasions',
    description: 'Wedding, prom, and special event hair styling services.',
    priority: 0.8,
    changeFrequency: 'monthly',
    searchable: true,
    keywords: ['wedding hair', 'special events', 'updo'],
    category: 'services',
  },
  {
    path: '/pricing',
    title: 'Pricing',
    description: 'Review hair salon service packages, pricing, and membership options.',
    priority: 0.9,
    changeFrequency: 'monthly',
    searchable: true,
    keywords: ['pricing', 'packages'],
    category: 'main',
  },
  {
    path: '/book',
    title: 'Book',
    description: 'Request an appointment and share your preferred time.',
    priority: 0.9,
    changeFrequency: 'weekly',
    searchable: true,
    keywords: ['booking', 'appointment'],
    category: 'main',
  },
  {
    path: '/gallery',
    title: 'Gallery',
    description: 'Browse before-and-after transformations from our stylists.',
    priority: 0.8,
    changeFrequency: 'monthly',
    searchable: true,
    keywords: ['gallery', 'before and after'],
    category: 'main',
  },
  {
    path: '/team',
    title: 'Team',
    description: 'Meet stylists and learn about their specialties.',
    priority: 0.8,
    changeFrequency: 'monthly',
    searchable: true,
    keywords: ['team', 'stylists'],
    category: 'main',
  },
  {
    path: '/contact',
    title: 'Contact',
    description: 'Get in touch to schedule a free consultation.',
    priority: 0.9,
    changeFrequency: 'monthly',
    searchable: true,
    keywords: ['contact', 'consultation'],
    category: 'main',
  },
  {
    path: '/blog',
    title: 'Blog',
    description: 'Hair care tips, trends, and styling advice from our experts.',
    priority: 0.8,
    changeFrequency: 'weekly',
    searchable: true,
    keywords: ['blog', 'insights'],
    category: 'content',
  },
  {
    path: '/search',
    title: 'Search',
    description: 'Search blog posts, services, and hair care resources across site.',
    priority: 0.5,
    changeFrequency: 'weekly',
    searchable: true,
    keywords: ['search', 'resources'],
    category: 'utility',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy',
    description: 'Our privacy policy and data handling practices.',
    priority: 0.4,
    changeFrequency: 'yearly',
    searchable: false,
    category: 'legal',
  },
  {
    path: '/terms',
    title: 'Terms of Service',
    description: 'Terms of service and conditions for using our website.',
    priority: 0.4,
    changeFrequency: 'yearly',
    searchable: false,
    category: 'legal',
  },
];

/**
 * Returns routes sorted by sitemap priority (highest first).
 */
export function getRoutesByPriority(): RouteDefinition[] {
  return [...ROUTES].sort((a, b) => b.priority - a.priority);
}

/**
 * Returns only routes flagged as searchable.
 */
export function getSearchableRoutes(): RouteDefinition[] {
  return ROUTES.filter((route) => route.searchable);
}
