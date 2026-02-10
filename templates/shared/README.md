# Shared Template Components

This directory contains reusable components, features, and utilities that are shared across multiple business templates.

## Purpose

The shared directory promotes code reuse and consistency across different business templates (hair salon, nail salon, tanning salon, etc.) by providing common functionality that most salon/spa businesses need.

## Structure

```
shared/
├── components/          # Shared UI components
│   ├── forms/          # Form components (booking, contact)
│   ├── layouts/        # Common layout components
│   ├── marketing/      # Marketing sections (hero, CTA, social proof)
│   └── navigation/     # Navigation components
├── features/           # Shared business logic
│   ├── analytics/      # Analytics and tracking
│   ├── booking/        # Core booking system
│   ├── contact/        # Contact form logic
│   ├── crm/           # CRM integrations (HubSpot, etc.)
│   └── search/        # Search functionality
├── hooks/             # Shared React hooks
├── lib/               # Shared utilities and helpers
│   ├── schemas/       # Zod validation schemas
│   ├── security/      # Security utilities (CSP, rate limiting)
│   └── utils/         # Common utility functions
├── styles/            # Shared styles and themes
└── types/             # Shared TypeScript types
```

## Usage in Templates

### Importing Shared Components

Templates can import shared components directly:

```typescript
// In a template file
import { BookingForm } from '../../../templates/shared/components/forms/BookingForm';
import { HeroSection } from '../../../templates/shared/components/marketing/HeroSection';
```

### Using Shared Features

```typescript
// In a template
import { useAnalytics } from '../../../templates/shared/features/analytics';
import { submitContactForm } from '../../../templates/shared/features/contact';
```

## What Should Go in Shared?

### ✅ Good Candidates for Shared

- **Generic booking forms** that work for any service business
- **Contact form components** with standard fields
- **Analytics integration** code
- **Security utilities** (CSP, rate limiting, validation)
- **Common UI patterns** (navigation, footer, hero sections)
- **CRM integration logic** (HubSpot, Salesforce)
- **Authentication helpers**
- **Generic content management utilities**

### ❌ Keep in Templates

- **Business-specific branding** (colors, logos, specific styling)
- **Unique business logic** that only applies to one type of business
- **Custom page layouts** specific to one template
- **Business-specific content** (images, copy, blog posts)
- **Template-specific routes**

## Development Guidelines

### Adding New Shared Components

1. **Check for duplication** - Look across existing templates first
2. **Make it generic** - Remove business-specific logic and styling
3. **Document props** - Add TypeScript types and JSDoc comments
4. **Add examples** - Include usage examples in component docs
5. **Test thoroughly** - Ensure it works across different contexts
6. **Version carefully** - Breaking changes affect all templates

### Component Design Principles

```typescript
// ✅ Good: Generic and configurable
interface BookingFormProps {
  serviceTypes: string[];
  onSubmit: (data: BookingData) => Promise<void>;
  theme?: 'light' | 'dark';
}

// ❌ Bad: Too specific to hair salons
interface HairBookingFormProps {
  stylistName: string;
  hairServices: HairService[];
}
```

### Styling Approach

Shared components should:

- Use Tailwind CSS utility classes
- Accept className props for customization
- Avoid hardcoded colors (use theme variables)
- Support dark/light modes when applicable

```typescript
interface SharedComponentProps {
  className?: string; // Allow style overrides
  variant?: 'primary' | 'secondary'; // Provide variants
}
```

## Package Dependencies

Shared components can depend on:

- `@repo/ui` - Core UI component library
- `@repo/utils` - Utility functions
- Common third-party libraries (React Hook Form, Zod, etc.)

Templates should declare these dependencies in their own `package.json`.

## Migration Path

When you identify code that should be shared:

1. **Extract** the component/feature from a template
2. **Generalize** by removing specific logic
3. **Move** to appropriate `shared/` subdirectory
4. **Update** template imports
5. **Test** in at least 2 different templates
6. **Document** in this README

## Examples

### Shared Booking Form

```typescript
// templates/shared/components/forms/BookingForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingSchema } from '../../lib/schemas/booking';

export interface BookingFormProps {
  serviceTypes: { id: string; name: string }[];
  onSubmit: (data: BookingData) => Promise<void>;
  className?: string;
}

export function BookingForm({ serviceTypes, onSubmit, className }: BookingFormProps) {
  // Generic booking form implementation
}
```

### Usage in Hair Salon Template

```typescript
// templates/hair-salon/app/book/page.tsx
import { BookingForm } from '../../../templates/shared/components/forms/BookingForm';

const hairServices = [
  { id: 'haircut', name: 'Haircut' },
  { id: 'color', name: 'Color Treatment' },
];

export default function BookPage() {
  return (
    <BookingForm
      serviceTypes={hairServices}
      onSubmit={handleBooking}
    />
  );
}
```

## Contributing

When contributing to shared components:

1. Discuss the addition in team discussions
2. Ensure it benefits multiple templates
3. Follow existing patterns and conventions
4. Add comprehensive documentation
5. Update this README with your changes

---

**Last Updated:** 2026-02-10
