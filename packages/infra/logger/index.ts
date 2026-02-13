/**
 * Structured logger — server-only.
 * Production: JSON output (Vercel Log Drain compatible). Dev/test: human-readable.
 * Sanitizes context (OWASP logging); enriches with request ID when available.
 * @module @repo/infra/logger
 */

import * as Sentry from '@sentry/nextjs';
import { getRequestId } from '../context/request-context.server';

function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

function isTest(): boolean {
  return process.env.NODE_ENV === 'test';
}

export type LogLevel = 'info' | 'warn' | 'error';

export interface LogContext {
  [key: string]: unknown;
}

interface LogRecord {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: LogContext;
  error?: unknown;
}

const SENSITIVE_KEYS = new Set([
  'password',
  'passcode',
  'token',
  'authorization',
  'cookie',
  'api_key',
  'apikey',
  'secret',
  'client_secret',
  'refresh_token',
  'access_token',
  'session_id',
  'sessionid',
]);

const SENSITIVE_KEY_SUBSTRINGS = [
  'password',
  'passcode',
  'token',
  'secret',
  'authorization',
  'cookie',
  'apikey',
  'api_key',
  'client_secret',
  'refresh_token',
  'access_token',
  'session_id',
  'sessionid',
];

function normalizeKey(key: string): string {
  return key.toLowerCase().replace(/[^a-z0-9]/g, '_');
}

function isSensitiveKey(key: string): boolean {
  const normalized = normalizeKey(key);
  if (SENSITIVE_KEYS.has(normalized)) {
    return true;
  }
  return SENSITIVE_KEY_SUBSTRINGS.some((fragment) => normalized.includes(fragment));
}

function buildLogContext(context?: LogContext): LogContext | undefined {
  const requestId = getRequestId();
  const hasRequestId = Boolean(context?.request_id || context?.requestId);

  if (!requestId || hasRequestId) {
    return context;
  }

  return { ...(context ?? {}), request_id: requestId };
}

function buildLogRecord(
  level: LogLevel,
  message: string,
  context?: LogContext,
  error?: unknown
): LogRecord {
  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...(context ? { context } : {}),
    ...(error !== undefined ? { error } : {}),
  };
}

function logJson(level: LogLevel, message: string, context?: LogContext, error?: unknown) {
  const record = buildLogRecord(level, message, context, error);
  const payload = JSON.stringify(record);

  if (level === 'info') {
    console.info(payload);
    return;
  }

  if (level === 'warn') {
    console.warn(payload);
    return;
  }

  console.error(payload);
}

function shouldPreserveObject(value: object): boolean {
  return value instanceof Error || value instanceof Date || value instanceof RegExp;
}

function sanitizeArray(values: unknown[]): unknown[] {
  return values.map((item) => sanitizeValue(item));
}

function sanitizeObject(value: Record<string, unknown>): Record<string, unknown> {
  return Object.entries(value).reduce<Record<string, unknown>>(
    (acc, [key, entryValue]) => {
      acc[key] = isSensitiveKey(key) ? '[REDACTED]' : sanitizeValue(entryValue);
      return acc;
    },
    Object.create(null) as Record<string, unknown>
  );
}

function sanitizeValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return sanitizeArray(value);
  }

  if (value && typeof value === 'object') {
    if (shouldPreserveObject(value)) {
      return value;
    }

    return sanitizeObject(value as Record<string, unknown>);
  }

  return value;
}

/**
 * Sanitize log context for safe external usage (tests, integrations).
 */
export function sanitizeLogContext(context?: LogContext): LogContext | undefined {
  if (!context) {
    return context;
  }

  return sanitizeValue(context) as LogContext;
}

function serializeError(error?: Error | unknown): unknown {
  if (!error) {
    return undefined;
  }

  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return sanitizeValue(error);
}

function isSentryAvailable(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN);
}

/**
 * Log an informational message. In production: JSON + Sentry if configured.
 */
export function logInfo(message: string, context?: LogContext) {
  const enrichedContext = sanitizeLogContext(buildLogContext(context));
  if (isDevelopment() || isTest()) {
    console.info('[INFO]', message, enrichedContext || '');
    return;
  }

  logJson('info', message, enrichedContext);
  if (isSentryAvailable()) {
    Sentry.captureMessage(message, { level: 'info', extra: enrichedContext });
  }
}

/**
 * Log a warning. In production: JSON + Sentry if configured.
 */
export function logWarn(message: string, context?: LogContext) {
  const enrichedContext = sanitizeLogContext(buildLogContext(context));
  if (isDevelopment() || isTest()) {
    console.warn('[WARN]', message, enrichedContext || '');
    return;
  }

  logJson('warn', message, enrichedContext);
  if (isSentryAvailable()) {
    Sentry.captureMessage(message, { level: 'warning', extra: enrichedContext });
  }
}

/**
 * Log an error. In production: JSON + Sentry with full error details if configured.
 */
export function logError(message: string, error?: Error | unknown, context?: LogContext) {
  const enrichedContext = sanitizeLogContext(buildLogContext(context));
  const serializedError = serializeError(error);
  if (isDevelopment() || isTest()) {
    console.error('[ERROR]', message, serializedError, enrichedContext || '');
    return;
  }

  logJson('error', message, enrichedContext, serializedError);
  if (isSentryAvailable()) {
    if (error instanceof Error) {
      Sentry.captureException(error, { extra: { message, ...enrichedContext } });
    } else {
      Sentry.captureMessage(message, {
        level: 'error',
        extra: { error: sanitizeValue(error), ...enrichedContext },
      });
    }
    return;
  }
}

/**
 * Generic log by level.
 */
export function log(level: LogLevel, message: string, context?: LogContext) {
  switch (level) {
    case 'info':
      logInfo(message, context);
      break;
    case 'warn':
      logWarn(message, context);
      break;
    case 'error':
      logError(message, undefined, context);
      break;
  }
}
