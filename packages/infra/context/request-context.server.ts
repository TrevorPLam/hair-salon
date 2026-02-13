/**
 * Request context (server) — Node.js AsyncLocalStorage.
 * Server-only: do not import from client code.
 * @module @repo/infra/context/request-context.server
 */

import { AsyncLocalStorage } from 'node:async_hooks';

interface RequestContext {
  requestId?: string;
}

const requestContextStore = new AsyncLocalStorage<RequestContext>();

/**
 * Runs a function with the given request ID stored in async context.
 * Call this at the entry of a request (e.g. Server Action) so getRequestId() returns the ID in logs.
 */
export function runWithRequestId<T>(requestId: string | undefined, fn: () => T): T {
  if (!requestId) {
    return fn();
  }

  return requestContextStore.run({ requestId }, fn);
}

/**
 * Returns the request ID for the current async context, or undefined if not set.
 */
export function getRequestId(): string | undefined {
  return requestContextStore.getStore()?.requestId;
}
