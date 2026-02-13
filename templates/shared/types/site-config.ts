// ---------------------------------------------------------------------------
// SiteConfig — the single source of truth for every marketing site.
// Each template defines one of these in its own `site.config.ts`.
// ---------------------------------------------------------------------------

// ---- Conversion Flow (Task 4) ----

/** Supported conversion flow types across all templates. */
export type ConversionFlowType = 'booking' | 'contact' | 'quote' | 'dispatch';

/** Fields that can appear on a booking form. */
export interface BookingFlowConfig {
  type: 'booking';
  /** Service categories offered for booking */
  serviceCategories: string[];
  /** Available time slots */
  timeSlots: { value: string; label: string }[];
  /** Max days in advance a booking can be made */
  maxAdvanceDays: number;
}

/** Simple contact-form flow. */
export interface ContactFlowConfig {
  type: 'contact';
  /** Subject line presets (optional) */
  subjects?: string[];
}

/** Quote / estimate request flow. */
export interface QuoteFlowConfig {
  type: 'quote';
  /** Service categories for the dropdown */
  serviceCategories: string[];
  /** Whether to collect photos/attachments */
  allowAttachments?: boolean;
}

/** Emergency / dispatch flow. */
export interface DispatchFlowConfig {
  type: 'dispatch';
  /** Urgency levels */
  urgencyLevels: { value: string; label: string }[];
}

/** Discriminated union — pick the right config shape per flow type. */
export type ConversionFlowConfig =
  | BookingFlowConfig
  | ContactFlowConfig
  | QuoteFlowConfig
  | DispatchFlowConfig;

// ---- Nav / Footer / Social ----

export interface NavLink {
  href: string;
  label: string;
}

export interface SocialLink {
  platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'youtube' | 'tiktok';
  url: string;
}

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export interface FooterConfig {
  columns: FooterColumn[];
  legalLinks: NavLink[];
  /** e.g. "© {year} Acme Inc. All rights reserved." — `{year}` is replaced at render time. */
  copyrightTemplate: string;
}

// ---- Contact ----

export interface BusinessHours {
  label: string; // e.g. "Tue – Fri"
  hours: string; // e.g. "10 am – 7 pm"
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  hours?: BusinessHours[];
}

// ---- SEO ----

export interface SeoDefaults {
  titleTemplate: string; // e.g. "%s | Acme Plumbing"
  defaultDescription: string;
  ogImage?: string;
  twitterHandle?: string;
  /** JSON-LD organization type (e.g. "HairSalon", "Plumber") */
  schemaType?: string;
}

// ---- Theme ----

/** HSL values as strings, e.g. "174 85% 33%" (no `hsl()` wrapper). */
export interface ThemeColors {
  primary: string;
  'primary-foreground': string;
  secondary: string;
  'secondary-foreground': string;
  accent: string;
  'accent-foreground': string;
  background: string;
  foreground: string;
  muted: string;
  'muted-foreground': string;
  card: string;
  'card-foreground': string;
  destructive: string;
  'destructive-foreground': string;
  border: string;
  input: string;
  ring: string;
}

// ---- Top-level SiteConfig ----

export interface SiteConfig {
  /** Short machine-readable id, e.g. "hair-salon", "plumber" */
  id: string;
  /** Display name shown in nav, footer, meta tags */
  name: string;
  /** One-liner under the logo / in meta descriptions */
  tagline: string;
  /** Longer description for SEO / about pages */
  description: string;
  /** Canonical production URL (no trailing slash) */
  url: string;

  /** Primary navigation links */
  navLinks: NavLink[];
  /** Social media profiles */
  socialLinks: SocialLink[];
  /** Footer layout */
  footer: FooterConfig;
  /** Contact information */
  contact: ContactInfo;
  /** SEO defaults */
  seo: SeoDefaults;
  /** Theme colors (HSL strings) */
  theme: ThemeColors;
  /** Conversion flow config */
  conversionFlow: ConversionFlowConfig;
}
