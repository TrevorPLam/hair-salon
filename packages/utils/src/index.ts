/**
 * @file packages/utils/src/index.ts
 * @role runtime
 * @summary Shared utility exports (class name merging).
 *
 * @entrypoints
 * - cn
 *
 * @exports
 * - cn
 *
 * @depends_on
 * - External: clsx
 * - External: tailwind-merge
 *
 * @used_by
 * - UI components and apps
 *
 * @runtime
 * - environment: shared
 * - side_effects: none
 *
 * @issues
 * - [severity:low] None observed in-file.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
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
