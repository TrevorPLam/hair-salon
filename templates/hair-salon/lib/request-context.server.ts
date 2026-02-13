/**
 * @file templates/hair-salon/lib/request-context.server.ts
 * @role runtime
 * @summary AsyncLocalStorage request context for request IDs.
 *
 * @entrypoints
 * - runWithRequestId
 * - getRequestId
 *
 * @exports
 * - runWithRequestId
 * - getRequestId
 *
 * @depends_on
 * - Node: async_hooks
 *
 * @used_by
 * - templates/hair-salon/lib/logger.ts
 * - templates/hair-salon/middleware.ts
 *
 * @runtime
 * - environment: server
 * - side_effects: AsyncLocalStorage context
 *
 * @issues
 * - [severity:low] Not available on edge runtime.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

import { AsyncLocalStorage } from 'node:async_hooks';

interface RequestContext {
  requestId?: string;
}

const requestContextStore = new AsyncLocalStorage<RequestContext>();

export function runWithRequestId<T>(requestId: string | undefined, fn: () => T): T {
  if (!requestId) {
    return fn();
  }

  return requestContextStore.run({ requestId }, fn);
}

export function getRequestId(): string | undefined {
  return requestContextStore.getStore()?.requestId;
}
