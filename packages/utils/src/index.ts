/**
 * Utility functions for class name merging and common operations.
 *
 * @module utils
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🤖 AI METACODE — Quick Reference for AI Agents
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * **FILE PURPOSE**: Shared utility functions used across all packages.
 * Provides class name merging with Tailwind conflict resolution.
 *
 * **MAIN EXPORT**: `cn()` function for conditional class merging
 * - Combines clsx (conditional classes) with tailwind-merge (conflict resolution)
 * - Essential for dynamic styling with Tailwind CSS
 *
 * **USAGE EXAMPLES**:
 * ```tsx
 * cn('px-4 py-2', isActive && 'bg-blue-500', 'text-white')
 * // Resolves conflicts: cn('px-2', 'px-4') → 'px-4'
 *
 * cn('button', variant === 'primary' && 'bg-teal', variant === 'secondary' && 'bg-gray')
 * ```
 *
 * **AI ITERATION HINTS**:
 * - Adding new utility? Export from this index file for consistency
 * - This is the main export point for all shared utilities
 * - All packages import from here: `@repo/utils`
 *
 * **DEPENDENCIES**:
 * - clsx: Conditional class name utility
 * - tailwind-merge: Tailwind CSS conflict resolution
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * **Purpose:**
 * - Provide utility functions for common operations across the monorepo
 * - Enable conditional class name merging with Tailwind conflict resolution
 *
 * **Main Function:**
 * - `cn()`: Merges class names while resolving Tailwind conflicts
 *   - Uses clsx for conditional class logic
 *   - Uses tailwind-merge to resolve conflicting Tailwind classes
 *
 * **Usage:**
 * ```tsx
 * import { cn } from '@repo/utils'
 *
 * // Basic merging
 * cn('px-4 py-2', 'bg-blue-500')
 *
 * // Conditional classes
 * cn('button', isActive && 'bg-blue-500', isDisabled && 'opacity-50')
 *
 * // Conflict resolution (last one wins)
 * cn('px-2', 'px-4') // Results in 'px-4'
 * ```
 *
 * **Why This Matters:**
 * - Prevents CSS specificity issues with Tailwind
 * - Enables dynamic styling based on component state
 * - Maintains consistent styling patterns across the app
 */

import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge conditional class names while resolving Tailwind conflicts.
 *
 * Combines clsx (for conditional logic) with tailwind-merge (for conflict resolution).
 * Essential for dynamic styling with Tailwind CSS classes.
 *
 * @param inputs - Class values to merge (strings, objects, arrays)
 * @returns Merged class string with conflicts resolved
 *
 * @example
 * ```tsx
 * cn('px-4 py-2', isActive && 'bg-blue-500', 'text-white')
 * // Returns: 'px-4 py-2 bg-blue-500 text-white' when isActive is true
 *
 * cn('px-2', 'px-4') // Returns: 'px-4' (conflict resolved)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  // Merge conditional class names while resolving Tailwind conflicts (e.g., px-4 vs px-2)
  return twMerge(clsx(inputs));
}
