/**
 * Request context (stub) — safe for client and edge.
 * Use request-context.server.ts in Node server code for real AsyncLocalStorage-backed context.
 * @see request-context.server.ts
 */

/**
 * Runs a function with a request ID. Stub implementation: runs the function without storing context.
 * In server bundles, use the export from `@repo/infra/context/request-context.server` for real context.
 */
export function runWithRequestId<T>(_requestId: string | undefined, fn: () => T): T {
  return fn();
}

/**
 * Returns the current request ID if running inside a server context; otherwise undefined.
 */
export function getRequestId(): string | undefined {
  return undefined;
}
