# Design Document: Marketing-First Enhancements

## Overview

This design document outlines the technical implementation for enhancing the hair salon website with marketing-first best practices. The enhancements transform the existing Next.js 15 application into a conversion-optimized platform featuring robust social proof, visual portfolios, trust indicators, and strategic conversion elements.

### Design Goals

1. **Maximize Conversions**: Implement strategic CTAs, urgency elements, and lead capture mechanisms throughout the user journey
2. **Build Trust**: Display authentic social proof, certifications, and credentials to establish credibility
3. **Showcase Quality**: Create compelling before/after galleries and stylist portfolios to demonstrate expertise
4. **Maintain Performance**: Ensure all enhancements maintain Lighthouse scores above 90 and Core Web Vitals compliance
5. **Preserve Architecture**: Follow existing feature-based architecture and monorepo patterns
6. **Enable Management**: Provide admin interfaces for content management without requiring developer intervention

### Technology Alignment

- **Framework**: Next.js 15.1.6 with App Router (existing)
- **Database**: Supabase (existing integration, will be extended)
- **Image Optimization**: Next.js Image component with Supabase Storage
- **Validation**: Zod schemas for all forms and data inputs
- **Styling**: Tailwind CSS with existing design system
- **State Management**: React Server Components with Server Actions
- **Analytics**: Extend existing GA4 integration

## Architecture

### High-Level Architecture

The enhancements follow a feature-based architecture pattern, creating new features while extending existing ones:

```
apps/web/
├── features/
│   ├── testimonials/          # NEW: Social proof system
│   ├── portfolio/             # NEW: Before/after gallery
│   ├── trust-indicators/      # NEW: Certifications & badges
│   ├── conversion/            # NEW: CTA management & tracking
│   ├── reviews/               # NEW: Review collection & aggregation
│   ├── team/                  # ENHANCED: Extended stylist profiles
│   ├── services/              # ENHANCED: Enhanced service pages
│   └── analytics/             # ENHANCED: Conversion tracking
├── app/
│   ├── admin/                 # NEW: Admin dashboard routes
│   │   ├── portfolio/
│   │   ├── testimonials/
│   │   └── reviews/
│   ├── team/[slug]/           # NEW: Individual stylist pages
│   └── api/
│       ├── reviews/           # NEW: Review endpoints
│       └── portfolio/         # NEW: Portfolio management
└── components/
    ├── ConversionElements/    # NEW: Reusable CTAs, popups
    └── TrustBadges/           # NEW: Trust indicator components
```

### Data Flow Architecture

```mermaid
graph TD
    A[Client Browser] -->|View Content| B[Next.js App Router]
    A -->|Submit Review| C[Server Actions]
    A -->|Upload Portfolio| D[Admin API Routes]

    B -->|Fetch Data| E[Supabase Database]
    C -->|Validate & Store| E
    D -->|Process & Store| F[Supabase Storage]

    E -->|Aggregate Reviews| G[Review Aggregator]
    G -->|Fetch External| H[Google Business API]
    G -->|Fetch External| I[Facebook Graph API]

    B -->|Track Events| J[Analytics Service]
    C -->|Conversion Events| J

    F -->|Optimize Images| K[Image Processor]
    K -->|Serve Optimized| A
```

### Feature Integration Points

1. **Homepage Integration**: Enhanced social proof, conversion elements, and trust badges
2. **Service Pages**: Before/after examples, detailed pricing, FAQs, service-specific testimonials
3. **Team Pages**: Individual stylist portfolios, reviews, certifications
4. **Gallery**: Filterable before/after showcase with Instagram integration
5. **Admin Dashboard**: Content management for all new features

## Components and Interfaces

### Feature: Testimonials

**Purpose**: Manage and display customer testimonials with text, video, and ratings.

#### Components

**`TestimonialCard`**

```typescript
interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: 'default' | 'featured' | 'compact';
  showService?: boolean;
  showDate?: boolean;
}

// Displays a single testimonial with optional video embed
// Supports verified badges and star ratings
```

**`TestimonialCarousel`**

```typescript
interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
  filterByService?: string;
}

// Rotating carousel for homepage and service pages
// Auto-advances with pause on hover
```

**`TestimonialGrid`**

```typescript
interface TestimonialGridProps {
  testimonials: Testimonial[];
  columns?: 2 | 3 | 4;
  filterByService?: string;
  showFilters?: boolean;
}

// Grid layout for dedicated testimonials page
// Supports filtering and sorting
```

**`VideoTestimonial`**

```typescript
interface VideoTestimonialProps {
  videoUrl: string;
  thumbnailUrl: string;
  caption?: string;
  customerName: string;
  transcript?: string; // For accessibility
}

// Video player with captions and transcript
// Lazy loads video content
```

**`AggregateRating`**

```typescript
interface AggregateRatingProps {
  averageRating: number;
  totalReviews: number;
  showBreakdown?: boolean; // Show 5-star, 4-star, etc. counts
  size?: 'small' | 'medium' | 'large';
}

// Displays star rating with review count
// Includes schema markup for SEO
```

#### API Interfaces

**`/api/testimonials`**

```typescript
// GET: Fetch testimonials with filtering
interface GetTestimonialsParams {
  service?: string;
  limit?: number;
  offset?: number;
  includeVideo?: boolean;
  verified?: boolean;
}

interface GetTestimonialsResponse {
  testimonials: Testimonial[];
  total: number;
  averageRating: number;
}

// POST: Submit new testimonial (admin only)
interface CreateTestimonialRequest {
  customerId?: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  text: string;
  service: string;
  videoUrl?: string;
  photoUrl?: string;
  photoPermission: boolean;
  verified: boolean;
}
```

### Feature: Portfolio (Before/After Gallery)

**Purpose**: Showcase hair transformations with before/after images, filtering, and detailed information.

#### Components

**`BeforeAfterCard`**

```typescript
interface BeforeAfterCardProps {
  transformation: Transformation;
  layout?: 'side-by-side' | 'slider' | 'stacked';
  showDetails?: boolean;
  onClick?: () => void;
}

// Displays before/after images with comparison slider
// Supports multiple layout modes
```

**`PortfolioGallery`**

```typescript
interface PortfolioGalleryProps {
  transformations: Transformation[];
  categories: string[];
  defaultCategory?: string;
  layout?: 'masonry' | 'grid';
  enableLightbox?: boolean;
}

// Main gallery component with filtering
// Masonry or grid layout options
```

**`TransformationModal`**

```typescript
interface TransformationModalProps {
  transformation: Transformation;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

// Lightbox modal for detailed view
// Shows full details, stylist info, products used
```

**`CategoryFilter`**

```typescript
interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  showCount?: boolean;
}

// Filter tabs for gallery categories
// Shows item count per category
```

**`InstagramFeed`**

```typescript
interface InstagramFeedProps {
  posts: InstagramPost[];
  columns?: 3 | 4 | 6;
  limit?: number;
}

// Displays recent Instagram posts
// Links to Instagram profile
```

#### API Interfaces

**`/api/portfolio`**

```typescript
// GET: Fetch portfolio items
interface GetPortfolioParams {
  category?: string;
  stylistId?: string;
  limit?: number;
  offset?: number;
  sortBy?: 'date' | 'popularity';
}

interface GetPortfolioResponse {
  transformations: Transformation[];
  total: number;
  categories: string[];
}

// POST: Upload new transformation (admin only)
interface CreateTransformationRequest {
  beforeImageUrl: string;
  afterImageUrl: string;
  category: string;
  caption: string;
  stylistId: string;
  servicePerformed: string;
  duration?: number;
  productsUsed?: string[];
  clientPermission: boolean;
}

// PUT: Update transformation
// DELETE: Remove transformation
```

### Feature: Trust Indicators

**Purpose**: Display certifications, awards, and credibility markers throughout the site.

#### Components

**`TrustBadge`**

```typescript
interface TrustBadgeProps {
  type: 'certification' | 'award' | 'membership' | 'guarantee' | 'insurance';
  title: string;
  issuer?: string;
  date?: string;
  verificationUrl?: string;
  icon?: React.ReactNode;
}

// Individual trust badge component
// Links to verification when available
```

**`TrustBadgeGrid`**

```typescript
interface TrustBadgeGridProps {
  badges: TrustBadge[];
  columns?: 3 | 4 | 6;
  variant?: 'default' | 'compact';
}

// Grid display of multiple trust badges
// Used in footer, about page, service pages
```

**`CertificationCard`**

```typescript
interface CertificationCardProps {
  certification: Certification;
  showExpiry?: boolean;
  showVerification?: boolean;
}

// Detailed certification display
// Shows issuing organization, date, expiry
```

**`SatisfactionGuarantee`**

```typescript
interface SatisfactionGuaranteeProps {
  title: string;
  description: string;
  terms?: string;
  icon?: React.ReactNode;
}

// Displays service guarantee prominently
// Used near CTAs to build confidence
```

### Feature: Conversion Elements

**Purpose**: Strategic CTAs, urgency indicators, and lead capture mechanisms.

#### Components

**`StickyBookingButton`**

```typescript
interface StickyBookingButtonProps {
  text?: string;
  href?: string;
  onClick?: () => void;
  showOnMobile?: boolean;
  hideOnScroll?: boolean;
}

// Sticky CTA button that follows scroll
// Hides when footer is visible
```

**`UrgencyIndicator`**

```typescript
interface UrgencyIndicatorProps {
  type: 'limited-slots' | 'countdown' | 'recent-booking' | 'special-offer';
  message: string;
  expiryDate?: Date;
  variant?: 'subtle' | 'prominent';
}

// Displays urgency messages
// Countdown timer for time-sensitive offers
```

**`ExitIntentModal`**

```typescript
interface ExitIntentModalProps {
  title: string;
  description: string;
  offerText?: string;
  onSubmit: (email: string) => void;
  onClose: () => void;
  triggerDelay?: number; // Delay before showing on mobile scroll
}

// Exit-intent popup for lead capture
// Mobile: triggers on scroll up
// Desktop: triggers on mouse leave
```

**`RecentActivityFeed`**

```typescript
interface RecentActivityFeedProps {
  activities: BookingActivity[];
  maxVisible?: number;
  autoRotate?: boolean;
  interval?: number;
}

// Shows recent booking activity
// "Sarah just booked a color appointment"
// Builds social proof and urgency
```

**`PricingDisplay`**

```typescript
interface PricingDisplayProps {
  price?: number;
  priceRange?: { min: number; max: number };
  startingPrice?: number;
  currency?: string;
  showFromLabel?: boolean;
  variant?: 'inline' | 'prominent';
}

// Displays pricing transparently
// Supports ranges and starting prices
```

**`CTAButton`**

```typescript
interface CTAButtonProps extends ButtonProps {
  trackingId: string;
  variant: 'primary' | 'secondary' | 'outline';
  size: 'small' | 'medium' | 'large';
  showSocialProof?: boolean; // "Join 5,000+ happy clients"
  urgency?: string; // "Only 3 slots left"
}

// Enhanced button with tracking and social proof
// Extends base Button component
```

### Feature: Reviews

**Purpose**: Collect, aggregate, and manage customer reviews from multiple sources.

#### Components

**`ReviewSubmissionForm`**

```typescript
interface ReviewSubmissionFormProps {
  serviceId?: string;
  stylistId?: string;
  onSuccess?: () => void;
  allowPhotoUpload?: boolean;
}

// Form for customers to submit reviews
// Includes star rating, text, optional photo
```

**`ReviewCard`**

```typescript
interface ReviewCardProps {
  review: Review;
  showSource?: boolean; // Google, Facebook, Direct
  showResponse?: boolean; // Salon response to review
  variant?: 'default' | 'compact';
}

// Displays individual review
// Shows verified badge, source platform
```

**`ReviewList`**

```typescript
interface ReviewListProps {
  reviews: Review[];
  filterByRating?: number;
  filterByService?: string;
  sortBy?: 'date' | 'rating' | 'helpful';
  showPagination?: boolean;
}

// List of reviews with filtering and sorting
// Pagination for large review sets
```

**`ReviewStats`**

```typescript
interface ReviewStatsProps {
  stats: ReviewStatistics;
  showBreakdown?: boolean;
}

// Displays review statistics
// Rating breakdown (5-star: 80%, 4-star: 15%, etc.)
```

#### API Interfaces

**`/api/reviews`**

```typescript
// GET: Fetch reviews
interface GetReviewsParams {
  service?: string;
  stylistId?: string;
  source?: 'google' | 'facebook' | 'direct' | 'all';
  minRating?: number;
  limit?: number;
  offset?: number;
}

interface GetReviewsResponse {
  reviews: Review[];
  total: number;
  statistics: ReviewStatistics;
}

// POST: Submit new review
interface CreateReviewRequest {
  customerName: string;
  customerEmail: string;
  rating: number;
  text: string;
  serviceId?: string;
  stylistId?: string;
  photoUrl?: string;
}

// POST: Aggregate external reviews (admin only)
interface AggregateReviewsRequest {
  source: 'google' | 'facebook';
  forceRefresh?: boolean;
}
```

**`/api/reviews/request`**

```typescript
// POST: Send review request email
interface SendReviewRequestRequest {
  customerEmail: string;
  customerName: string;
  serviceDate: Date;
  serviceType: string;
}
```

### Feature: Enhanced Team Profiles

**Purpose**: Individual stylist pages with portfolios, reviews, and booking preferences.

#### Components

**`StylistCard`**

```typescript
interface StylistCardProps {
  stylist: Stylist;
  variant?: 'grid' | 'list' | 'featured';
  showPortfolio?: boolean;
  showReviews?: boolean;
}

// Stylist card for team grid
// Links to individual profile page
```

**`StylistProfile`**

```typescript
interface StylistProfileProps {
  stylist: Stylist;
  portfolio: Transformation[];
  reviews: Review[];
  certifications: Certification[];
}

// Full stylist profile page
// Includes bio, specialties, portfolio, reviews
```

**`StylistPortfolio`**

```typescript
interface StylistPortfolioProps {
  transformations: Transformation[];
  stylistName: string;
  layout?: 'grid' | 'masonry';
}

// Portfolio specific to one stylist
// Filtered view of main gallery
```

**`StylistReviews`**

```typescript
interface StylistReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

// Reviews specific to one stylist
// Shows aggregate rating
```

**`SpecialtyTags`**

```typescript
interface SpecialtyTagsProps {
  specialties: string[];
  variant?: 'default' | 'compact';
  clickable?: boolean;
  onSpecialtyClick?: (specialty: string) => void;
}

// Displays stylist specialties as tags
// Optionally filterable
```

### Feature: Enhanced Service Pages

**Purpose**: Detailed service information with pricing, FAQs, and examples.

#### Components

**`ServiceDetailHeader`**

```typescript
interface ServiceDetailHeaderProps {
  service: Service;
  pricing: PricingInfo;
  duration: string;
  showCTA?: boolean;
}

// Service page header with key info
// Prominent CTA placement
```

**`ServiceBenefits`**

```typescript
interface ServiceBenefitsProps {
  benefits: string[];
  variant?: 'list' | 'grid';
}

// Displays service benefits
// Icon + text format
```

**`ServiceFAQ`**

```typescript
interface ServiceFAQProps {
  faqs: FAQ[];
  defaultExpanded?: number;
}

// Accordion-style FAQ section
// Includes schema markup
```

**`ServiceExamples`**

```typescript
interface ServiceExamplesProps {
  transformations: Transformation[];
  serviceType: string;
}

// Before/after examples for this service
// Filtered from main portfolio
```

**`ServiceTestimonials`**

```typescript
interface ServiceTestimonialsProps {
  testimonials: Testimonial[];
  serviceType: string;
}

// Testimonials specific to this service
// Builds service-specific trust
```

**`RelatedServices`**

```typescript
interface RelatedServicesProps {
  services: Service[];
  currentServiceId: string;
}

// Suggests complementary services
// Cross-selling opportunity
```

## Data Models

### Core Data Types

**`Testimonial`**

```typescript
interface Testimonial {
  id: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerPhoto?: string;
  rating: number; // 1-5
  text: string;
  service: string;
  serviceDate?: Date;
  videoUrl?: string;
  videoThumbnail?: string;
  transcript?: string; // For video accessibility
  verified: boolean;
  source: 'direct' | 'google' | 'facebook';
  photoPermission: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

**`Transformation`**

```typescript
interface Transformation {
  id: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  beforeImageThumbnail: string;
  afterImageThumbnail: string;
  category: 'cuts' | 'color' | 'treatments' | 'special-occasions' | 'extensions';
  caption: string;
  description?: string;
  stylistId: string;
  stylistName: string;
  servicePerformed: string;
  duration?: number; // minutes
  productsUsed?: string[];
  clientPermission: boolean;
  permissionDocumentUrl?: string;
  featured: boolean;
  viewCount: number;
  likeCount: number;
  instagramPostId?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**`Review`**

```typescript
interface Review {
  id: string;
  externalId?: string; // ID from Google/Facebook
  customerId?: string;
  customerName: string;
  customerEmail?: string;
  customerPhoto?: string;
  rating: number; // 1-5
  text: string;
  serviceId?: string;
  serviceName?: string;
  stylistId?: string;
  stylistName?: string;
  photoUrl?: string;
  source: 'direct' | 'google' | 'facebook';
  sourceUrl?: string; // Link to original review
  verified: boolean;
  helpful: number; // Helpful vote count
  response?: string; // Salon response
  responseDate?: Date;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}
```

**`ReviewStatistics`**

```typescript
interface ReviewStatistics {
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  sourceBreakdown: {
    direct: number;
    google: number;
    facebook: number;
  };
}
```

**`TrustBadge`**

```typescript
interface TrustBadge {
  id: string;
  type: 'certification' | 'award' | 'membership' | 'guarantee' | 'insurance';
  title: string;
  description?: string;
  issuer?: string;
  issueDate?: Date;
  expiryDate?: Date;
  verificationUrl?: string;
  iconUrl?: string;
  displayOrder: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

**`Certification`**

```typescript
interface Certification {
  id: string;
  stylistId?: string; // null for salon-wide certifications
  title: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  certificateNumber?: string;
  verificationUrl?: string;
  certificateImageUrl?: string;
  category: 'education' | 'license' | 'specialty' | 'safety';
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

**`Stylist`** (Extended from existing)

```typescript
interface Stylist {
  id: string;
  name: string;
  role: string;
  bio: string;
  slug: string; // URL-friendly identifier
  photoUrl: string;
  specialties: string[];
  yearsExperience: number;
  education?: string[];
  certifications: Certification[];
  socialMedia: {
    instagram?: string;
    tiktok?: string;
    facebook?: string;
  };
  averageRating: number;
  totalReviews: number;
  portfolioCount: number;
  signatureServices?: string[];
  availability?: string; // e.g., "Mon-Fri, 9AM-5PM"
  bookingPreference?: string;
  featured: boolean;
  displayOrder: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

**`Service`** (Extended from existing)

```typescript
interface Service {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  benefits: string[];
  pricing: PricingInfo;
  duration: number; // minutes
  durationRange?: { min: number; max: number };
  process?: string[]; // Step-by-step process
  productsUsed?: string[];
  recommendedFor?: string[];
  faqs: FAQ[];
  relatedServiceIds: string[];
  featured: boolean;
  displayOrder: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

**`PricingInfo`**

```typescript
interface PricingInfo {
  type: 'fixed' | 'range' | 'starting';
  amount?: number;
  min?: number;
  max?: number;
  currency: string;
  factors?: string[]; // Factors affecting price
  note?: string;
}
```

**`FAQ`**

```typescript
interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  displayOrder: number;
  active: boolean;
}
```

**`BookingActivity`** (For recent activity feed)

```typescript
interface BookingActivity {
  id: string;
  customerName: string; // Anonymized: "Sarah M."
  service: string;
  timestamp: Date;
  location?: string;
}
```

**`ConversionElement`**

```typescript
interface ConversionElement {
  id: string;
  type: 'cta' | 'urgency' | 'exit-intent' | 'social-proof';
  title: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  urgencyMessage?: string;
  expiryDate?: Date;
  active: boolean;
  placement: string[]; // ['homepage', 'services', 'team']
  displayRules: {
    showOnMobile: boolean;
    showOnDesktop: boolean;
    triggerDelay?: number;
    maxDisplaysPerSession?: number;
  };
  analytics: {
    impressions: number;
    clicks: number;
    conversions: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

**`InstagramPost`**

```typescript
interface InstagramPost {
  id: string;
  instagramId: string;
  caption: string;
  mediaUrl: string;
  thumbnailUrl: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  permalink: string;
  timestamp: Date;
  likeCount?: number;
  commentCount?: number;
  synced: boolean;
  syncedAt: Date;
}
```

### Database Schema (Supabase)

**Tables to Create:**

1. `testimonials` - Customer testimonials and ratings
2. `transformations` - Before/after portfolio items
3. `reviews` - Aggregated reviews from all sources
4. `trust_badges` - Certifications, awards, memberships
5. `certifications` - Detailed certification records
6. `stylists` - Extended stylist profiles (or extend existing)
7. `services` - Extended service information (or extend existing)
8. `faqs` - Frequently asked questions
9. `conversion_elements` - CTA and urgency element configurations
10. `booking_activities` - Recent booking feed (anonymized)
11. `instagram_posts` - Cached Instagram content

**Storage Buckets:**

1. `testimonial-photos` - Customer photos for testimonials
2. `testimonial-videos` - Video testimonial files
3. `portfolio-images` - Before/after transformation images
4. `certification-documents` - Certification PDFs and images
5. `trust-badge-icons` - Trust badge icon files

### Validation Schemas

All data models will have corresponding Zod schemas for validation:

```typescript
// Example: Testimonial validation
const testimonialSchema = z.object({
  customerName: z.string().min(2).max(100),
  customerEmail: z.string().email(),
  rating: z.number().int().min(1).max(5),
  text: z.string().min(10).max(1000),
  service: z.string().min(1),
  videoUrl: z.string().url().optional(),
  photoPermission: z.boolean(),
  verified: z.boolean().default(false),
});

// Similar schemas for all data models
```
