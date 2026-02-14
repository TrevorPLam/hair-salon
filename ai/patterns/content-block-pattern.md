# Content Block Pattern

## Problem It Solves

Inconsistent content structure makes maintenance difficult and leads to poor user experience. The content block pattern provides reusable, composable content components with consistent styling and behavior.

## When to Use

- Landing pages with multiple sections
- Blog posts and articles
- Service descriptions
- Marketing pages
- Any page with structured content

## When NOT to Use

- Simple static pages with minimal content
- Forms and interactive components
- Navigation and layout components

## Required Constraints

1. **Composition**: Blocks must be composable and reusable
2. **Props**: Consistent prop interfaces across blocks
3. **Styling**: Use design system tokens
4. **Accessibility**: Proper semantic HTML and ARIA
5. **Performance**: Lazy load when appropriate

## Example Implementation

```typescript
/**
 * @ai-pattern Content Block
 * @ai-accessibility WCAG AA
 * @ai-performance Optimized
 * @ai-tests Required
 * @ai-reference /ai/patterns/content-block-pattern.md
 */

import { ReactNode } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Base block interface
interface BaseBlockProps {
  id?: string
  className?: string
  children?: ReactNode
}

// Hero block
interface HeroBlockProps extends BaseBlockProps {
  title: string
  subtitle?: string
  description?: string
  backgroundImage?: string
  cta?: {
    text: string
    href: string
    variant?: 'primary' | 'secondary'
  }
  alignment?: 'left' | 'center' | 'right'
}

export function HeroBlock({
  title,
  subtitle,
  description,
  backgroundImage,
  cta,
  alignment = 'center',
  className,
  id,
}: HeroBlockProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative min-h-screen flex items-center justify-center',
        backgroundImage && 'bg-cover bg-center bg-no-repeat',
        className
      )}
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : undefined
      }
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {subtitle && (
          <p className="text-sm font-medium text-primary mb-2 uppercase tracking-wider">
            {subtitle}
          </p>
        )}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          {title}
        </h1>
        {description && (
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        {cta && (
          <Button
            href={cta.href}
            variant={cta.variant || 'primary'}
            size="lg"
            className="text-lg px-8 py-4"
          >
            {cta.text}
          </Button>
        )}
      </div>
    </section>
  )
}

// Features block
interface Feature {
  icon?: string
  title: string
  description: string
  image?: string
}

interface FeaturesBlockProps extends BaseBlockProps {
  title: string
  subtitle?: string
  features: Feature[]
  layout?: 'grid' | 'list'
  columns?: 2 | 3 | 4
}

export function FeaturesBlock({
  title,
  subtitle,
  features,
  layout = 'grid',
  columns = 3,
  className,
  id,
}: FeaturesBlockProps) {
  return (
    <section id={id} className={cn('py-16 px-4', className)}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {subtitle && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        
        <div
          className={cn(
            'grid gap-8',
            layout === 'grid' && `grid-cols-1 md:grid-cols-${columns}`
          )}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                'flex flex-col items-center text-center',
                layout === 'list' && 'md:flex-row md:text-left md:items-start'
              )}
            >
              {feature.icon && (
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
              )}
              {feature.image && (
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials block
interface Testimonial {
  name: string
  role?: string
  company?: string
  content: string
  avatar?: string
  rating?: number
}

interface TestimonialsBlockProps extends BaseBlockProps {
  title: string
  subtitle?: string
  testimonials: Testimonial[]
  showRating?: boolean
}

export function TestimonialsBlock({
  title,
  subtitle,
  testimonials,
  showRating = true,
  className,
  id,
}: TestimonialsBlockProps) {
  return (
    <section id={id} className={cn('py-16 px-4 bg-muted/50', className)}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {subtitle && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <blockquote
              key={index}
              className="bg-background rounded-lg p-6 shadow-sm border"
            >
              {showRating && testimonial.rating && (
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        'text-lg',
                        i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                      )}
                    >
                      ★
                    </span>
                  ))}
                </div>
              )}
              <p className="text-muted-foreground mb-4 italic">
                "{testimonial.content}"
              </p>
              <footer className="flex items-center">
                {testimonial.avatar && (
                  <div className="relative w-12 h-12 mr-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                )}
                <div>
                  <cite className="font-semibold not-italic">
                    {testimonial.name}
                  </cite>
                  {testimonial.role && (
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                      {testimonial.company && ` at ${testimonial.company}`}
                    </div>
                  )}
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA block
interface CTABlockProps extends BaseBlockProps {
  title: string
  description?: string
  primaryCTA: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  background?: 'default' | 'primary' | 'muted'
}

export function CTABlock({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  background = 'primary',
  className,
  id,
}: CTABlockProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-16 px-4',
        background === 'primary' && 'bg-primary text-primary-foreground',
        background === 'muted' && 'bg-muted',
        className
      )}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        {description && (
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {description}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            href={primaryCTA.href}
            variant={background === 'primary' ? 'secondary' : 'primary'}
            size="lg"
          >
            {primaryCTA.text}
          </Button>
          {secondaryCTA && (
            <Button
              href={secondaryCTA.href}
              variant="outline"
              size="lg"
            >
              {secondaryCTA.text}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}

// Content composer for building pages
interface ContentComposerProps {
  blocks: Array<{
    type: string
    props: any
  }>
}

export function ContentComposer({ blocks }: ContentComposerProps) {
  return (
    <>
      {blocks.map((block, index) => {
        const { type, props } = block
        
        switch (type) {
          case 'hero':
            return <HeroBlock key={index} {...props} />
          case 'features':
            return <FeaturesBlock key={index} {...props} />
          case 'testimonials':
            return <TestimonialsBlock key={index} {...props} />
          case 'cta':
            return <CTABlock key={index} {...props} />
          default:
            return null
        }
      })}
    </>
  )
}
```

## Anti-Pattern Example

```typescript
// ❌ WRONG - Inconsistent structure, no reusability
export default function LandingPage() {
  return (
    <div>
      <div className="hero">
        <h1>Welcome</h1>
        <p>Our salon is great</p>
        <button>Book Now</button>
      </div>
      
      <div className="features">
        <div className="feature">
          <h3>Cut</h3>
          <p>We cut hair</p>
        </div>
        <div className="feature">
          <h3>Color</h3>
          <p>We color hair</p>
        </div>
      </div>
    </div>
  )
}
```

## Testing Requirements

1. **Unit Tests**: Test each block component
2. **Accessibility Tests**: Verify semantic HTML and ARIA
3. **Visual Tests**: Ensure consistent styling
4. **Performance Tests**: Check rendering performance

```typescript
import { render, screen } from '@testing-library/react'
import { HeroBlock } from '../content-blocks'

describe('HeroBlock', () => {
  it('should render hero content correctly', () => {
    render(
      <HeroBlock
        title="Test Title"
        subtitle="Test Subtitle"
        description="Test description"
        cta={{ text: "Test CTA", href: "/test" }}
      />
    )
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
    expect(screen.getByText('Test CTA')).toBeInTheDocument()
  })
})
```

## Performance Implications

- **Rendering**: Efficient React component structure
- **Images**: Next.js Image optimization
- **Lazy Loading**: Implement for below-the-fold blocks

## Security Implications

- **Content Sanitization**: Sanitize user-generated content
- **Image Security**: Validate image sources and dimensions

## Related Patterns

- [SEO Pattern](./seo-pattern.md) - For page optimization
- [Design System Pattern](./design-system-pattern.md) - For consistent styling
- [Accessibility Pattern](./accessibility-pattern.md) - For a11y compliance
