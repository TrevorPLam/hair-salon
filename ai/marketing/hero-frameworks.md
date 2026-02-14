# Hero Frameworks

## Hero Section Formulas

This document provides proven hero section frameworks that drive conversions for salon websites.

## Hero Formula 1: Problem-Solution-Benefit

### Structure
```
[Headline: Problem] + [Subheadline: Solution] + [CTA: Benefit] + [Social Proof]
```

### Examples
```typescript
// Hair Salon Example
const hero = {
  headline: "Tired of Bad Hair Days?",
  subheadline: "Professional Styling That Makes You Look and Feel Amazing",
  cta: "Book Your Transformation",
  socialProof: "500+ Happy Clients This Month"
}

// Implementation
<HeroBlock
  title={hero.headline}
  subtitle={hero.subheadline}
  cta={{ text: hero.cta, href: "/book" }}
  socialProof={hero.socialProof}
/>
```

### Variations
- **Service Focus**: "Need a Haircut?" → "Expert Cuts That Fit Your Style"
- **Time Focus**: "No Time for Beauty?" → "Quick Appointments, Stunning Results"
- **Price Focus**: "Expensive Salons?" → "Luxury Services at Fair Prices"

## Hero Formula 2: Aspiration-Transformation

### Structure
```
[Headline: Aspiration] + [Subheadline: Transformation] + [CTA: Action] + [Visual]
```

### Examples
```typescript
// Aspiration Hero
const hero = {
  headline: "Look Your Best, Feel Confident",
  subheadline: "Transform Your Look with Our Expert Stylists and Premium Products",
  cta: "Start Your Makeover",
  visual: "before-after-gallery"
}

// Implementation
<HeroBlock
  title={hero.headline}
  subtitle={hero.subheadline}
  cta={{ text: hero.cta, href: "/services" }}
  backgroundImage={hero.visual}
/>
```

### Aspiration Angles
- **Confidence**: "Walk in Confident, Walk Out Stunning"
- **Beauty**: "Unleash Your Natural Beauty"
- **Style**: "Express Your Unique Style"
- **Relaxation**: "Relax, Recharge, Renew"

## Hero Formula 3: Urgency-Scarcity

### Structure
```
[Headline: Offer] + [Subheadline: Urgency] + [CTA: Limited Time] + [Countdown]
```

### Examples
```typescript
// Urgency Hero
const hero = {
  headline: "50% Off First Visit - New Client Special",
  subheadline: "Limited Time Offer - Only 10 Spots Available This Month",
  cta: "Claim Your Discount",
  countdown: "Ends in 2 days, 14 hours"
}

// Implementation
<HeroBlock
  title={hero.headline}
  subtitle={hero.subheadline}
  cta={{ text: hero.cta, href: "/book" }}
  countdown={hero.countdown}
/>
```

### Urgency Triggers
- **Limited Spots**: "Only 3 Appointments Left Today"
- **Time Limited**: "Offer Ends Friday"
- **Seasonal**: "Summer Special - Book Now"
- **New Client**: "First-Time Client Discount"

## Hero Formula 4: Benefit-Driven

### Structure
```
[Headline: Primary Benefit] + [Subheadline: Supporting Benefits] + [CTA: Result] + [Proof]
```

### Examples
```typescript
// Benefit Hero
const hero = {
  headline: "Get the Perfect Cut Every Time",
  subheadline: "Expert Stylists • Premium Products • Guaranteed Satisfaction",
  cta: "Experience the Difference",
  proof: "4.9/5 Stars from 200+ Reviews"
}

// Implementation
<HeroBlock
  title={hero.headline}
  subtitle={hero.subheadline}
  cta={{ text: hero.cta, href: "/about" }}
  rating={hero.proof}
/>
```

### Benefit Categories
- **Quality**: "Expert Styling, Flawless Results"
- **Convenience**: "Book Online, Walk Out Beautiful"
- **Value**: "Luxury Experience, Affordable Prices"
- **Trust**: "20 Years of Excellence"

## Visual Guidelines

### Image Requirements
- **Hero Images**: 1920x1080px minimum
- **Compression**: Under 200KB
- **Format**: WebP with JPEG fallback
- **Subject**: Diverse models, authentic expressions

### Video Requirements
- **Duration**: 15-30 seconds
- **Format**: MP4 with WebM fallback
- **Size**: Under 5MB
- **Autoplay**: Muted with controls

### Color Psychology
- **Trust**: Blue tones
- **Energy**: Orange accents
- **Luxury**: Gold highlights
- **Nature**: Green elements

## CTA Optimization

### Button Text Formulas
- **Action + Benefit**: "Book Your Transformation"
- **Urgency + Action**: "Claim Your Spot Now"
- **Low Risk**: "Free Consultation"
- **Value**: "Save 50% Today"

### Button Placement
- **Above Fold**: Primary CTA visible immediately
- **Secondary**: Additional CTAs after scroll
- **Sticky**: Mobile CTA always accessible

### Button Design
- **Size**: Large (48px+ height)
- **Contrast**: WCAG AA compliant
- **Animation**: Subtle hover effects
- **Mobile**: Thumb-friendly

## Mobile Optimization

### Mobile Hero Rules
- **Text Size**: Minimum 18px for headlines
- **Tap Targets**: 44px minimum
- **Load Speed**: Under 2 seconds
- **Vertical Layout**: Stack elements

### Mobile-Specific Formulas
```
[Large Headline] + [Short Subheadline] + [Sticky CTA Button]
```

## Testing Framework

### A/B Test Variables
- **Headlines**: Test 3-5 variations
- **CTA Text**: Test action vs benefit
- **Images**: Test people vs product
- **Colors**: Test brand vs contrast

### Success Metrics
- **Click-Through Rate**: Above 5%
- **Conversion Rate**: Above 3%
- **Time on Page**: Above 30 seconds
- **Bounce Rate**: Below 40%

## Implementation Checklist

### Before Launch
- [ ] Headline follows proven formula
- [ ] CTA is action-oriented
- [ ] Social proof included
- [ ] Images optimized for web
- [ ] Mobile responsive
- [ ] Loading speed under 2 seconds
- [ ] Accessibility compliant
- [ ] A/B test ready

### After Launch
- [ ] Monitor conversion rates
- [ ] Track user behavior
- [ ] Test variations
- [ ] Optimize based on data
- [ ] Update seasonal content

These frameworks provide data-backed approaches to hero sections that drive bookings and build brand trust.
