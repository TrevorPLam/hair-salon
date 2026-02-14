// File: packages/utils/src/cn.ts  [TRACE:FILE=packages.utils.cn]
// Purpose: CSS class merging utility that combines clsx for conditional classes with
//          tailwind-merge for deduplication. Provides consistent styling behavior
//          across all components and prevents Tailwind class conflicts.
//
// Exports / Entry: cn function for CSS class merging
// Used by: UI components, any code needing conditional Tailwind classes
//
// Invariants:
// - Must handle both string and array inputs gracefully
// - Tailwind classes must be properly deduplicated
// - Conditional logic from clsx must be preserved
// - Output must be a valid string for className props
//
// Status: @public
// Features:
// - [FEAT:STYLING] Tailwind CSS class merging and deduplication
// - [FEAT:UTILITIES] Conditional class name resolution
// - [FEAT:COMPONENTS] Consistent styling across UI components

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// [TRACE:FUNC=packages.utils.cn]
// [FEAT:STYLING] [FEAT:UTILITIES]
// NOTE: Primary utility function - combines clsx conditional logic with tailwind-merge deduplication.
//       Essential for preventing conflicting Tailwind classes in dynamic component styling.
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
