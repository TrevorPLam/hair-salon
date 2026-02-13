// Infrastructure package client entry point
// Exports client-safe infrastructure utilities only (no server-only code)

export * from './sentry/client';
export { logError, logInfo } from './logger/client';

export const INFRA_CLIENT_PACKAGE_VERSION = '1.0.0';
