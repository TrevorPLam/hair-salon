/**
 * @file apps/web/lib/utils.ts
 * @role runtime
 * @summary Local className merge helper for app components.
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
 * - apps/web/components and features
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

export function cn(...inputs: ClassValue[]) {
  // Merge conditional class names while resolving Tailwind conflicts (e.g., px-4 vs px-2)
  return twMerge(clsx(inputs));
}
