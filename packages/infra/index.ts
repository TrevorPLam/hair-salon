// Infrastructure package entry point
// Exports server-side infrastructure utilities
// Note: Modules will be implemented in subsequent tasks (1.1.2-1.1.10)

// CSP Module (Task 1.1.2 - COMPLETED)
export * from './security/csp';

// Security Headers Module (Task 1.1.3 - COMPLETED)
export * from './security/security-headers';

// Sanitize Module (Task 1.1.4 - COMPLETED)
export * from './security/sanitize';

// Rate Limit Module (Task 1.1.5 - COMPLETED)
export * from './security/rate-limit';

// Request Validation Module (Task 1.1.6 - COMPLETED)
export * from './security/request-validation';

// Middleware Factory (Task 1.1.7 - COMPLETED)
export * from './middleware/create-middleware';

// Request context (stub — safe for all environments)
export * from './context/request-context';

// Logger (server-only; uses request-context.server internally)
export * from './logger';

// Sentry server and sanitize (server-only)
export * from './sentry/server';
export * from './sentry/sanitize';

export const INFRA_PACKAGE_VERSION = '1.0.0';
