/**
 * Reusable button component with consistent styling.
 *
 * @component Button
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🤖 AI METACODE — Quick Reference for AI Agents
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * **FILE PURPOSE**: Centralized button component for consistent UI/UX.
 * Used across all apps in the monorepo for design system consistency.
 *
 * **VARIANTS**:
 * - primary: Teal background with white text (main CTAs)
 * - secondary: Transparent with charcoal border (secondary actions)
 * - text: Teal text only (subtle actions)
 *
 * **SIZES**:
 * - small: Compact buttons (forms, tight spaces)
 * - medium: Default size (most use cases)
 * - large: Hero section CTAs, prominent actions
 *
 * **DESIGN TOKENS**:
 * - Colors: teal (primary), charcoal (secondary), off-white (hover)
 * - Focus: teal ring with offset for accessibility
 * - Typography: font-semibold, responsive text sizing
 *
 * **USAGE EXAMPLES**:
 * ```tsx
 * <Button variant="primary" size="large">Book Now</Button>
 * <Button variant="secondary" size="medium">Learn More</Button>
 * <Button variant="text" size="small">Cancel</Button>
 * ```
 *
 * **AI ITERATION HINTS**:
 * - Adding new variant? Update variants object and ButtonProps interface
 * - Changing colors? Update design tokens in variants object
 * - Focus styles follow WCAG AA contrast requirements
 * - All variants support disabled state via HTML attributes
 *
 * **DEPENDENCIES**:
 * - @repo/utils/cn for conditional class merging
 * - Uses forwardRef for ref forwarding (important for forms)
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * **Purpose:**
 * - Provide consistent button styling across the application
 * - Support multiple variants (primary, secondary, text) and sizes
 * - Ensure accessibility with proper focus management
 *
 * **Variants:**
 * - primary: Teal background, white text (main actions)
 * - secondary: Transparent with charcoal border (secondary actions)
 * - text: Teal text only, no background (subtle actions)
 *
 * **Sizes:**
 * - small: Compact (py-2 px-4, text-sm)
 * - medium: Default (py-3 px-6, text-base)
 * - large: Prominent (py-4 px-8, text-lg)
 *
 * **Features:**
 * - Focus ring with teal color for accessibility
 * - Disabled state with reduced opacity
 * - Forward ref support for form integration
 * - Transition effects for hover states
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="large" onClick={handleClick}>
 *   Book Appointment
 * </Button>
 * ```
 */

import React from 'react';
import { cn } from '@repo/utils';

// Gradient-free button styles with size/variant tokens to keep hair salon pages consistent
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'medium', children, ...props }, ref) => {
    // Base styles applied to all variants
    const baseStyles =
      'font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    // Variant-specific styling
    const variants = {
      primary: 'bg-teal hover:bg-teal-dark text-white',
      secondary: 'bg-transparent hover:bg-off-white text-charcoal border-2 border-charcoal',
      text: 'text-teal hover:text-teal-dark bg-transparent',
    };

    // Size-specific styling
    const sizes = {
      small: 'py-2 px-4 text-sm',
      medium: 'py-3 px-6 text-base',
      large: 'py-4 px-8 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
