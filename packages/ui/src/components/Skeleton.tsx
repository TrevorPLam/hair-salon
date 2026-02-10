/**
 * @file packages/ui/src/components/Skeleton.tsx
 * @role runtime
 * @summary Skeleton placeholder for loading states.
 *
 * @entrypoints
 * - Skeleton
 *
 * @exports
 * - default Skeleton
 *
 * @depends_on
 * - External: react (HTMLAttributes)
 * - Internal: @repo/utils (cn)
 *
 * @used_by
 * - Loading states in UI
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

import { HTMLAttributes } from 'react';
import { cn } from '@repo/utils';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * Skeleton loading component
 * Provides visual feedback while content is loading
 */
const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return <div className={cn('animate-pulse rounded-md bg-gray-200', className)} {...props} />;
};

export default Skeleton;
