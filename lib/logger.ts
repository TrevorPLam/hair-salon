/**
 * Centralized logging utility
 * Integrates with Sentry for production error tracking and monitoring
 * Works on both server and client side
 */

import * as Sentry from '@sentry/nextjs'
import { isDevelopment, isTest } from './env'

type LogLevel = 'info' | 'warn' | 'error'

interface LogContext {
  [key: string]: unknown
}

/**
 * Check if Sentry is properly configured and available
 */
function isSentryAvailable(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN)
}

/**
 * Log an informational message
 * In production, sends to Sentry
 */
export function logInfo(message: string, context?: LogContext) {
  if (isDevelopment() || isTest()) {
    console.info('[INFO]', message, context || '')
  } else if (isSentryAvailable()) {
    Sentry.captureMessage(message, { level: 'info', extra: context })
  }
}

/**
 * Log a warning
 * In production, sends to Sentry
 */
export function logWarn(message: string, context?: LogContext) {
  if (isDevelopment() || isTest()) {
    console.warn('[WARN]', message, context || '')
  } else if (isSentryAvailable()) {
    Sentry.captureMessage(message, { level: 'warning', extra: context })
  }
}

/**
 * Log an error
 * In production, sends to Sentry with full error details
 */
export function logError(message: string, error?: Error | unknown, context?: LogContext) {
  if (isDevelopment() || isTest()) {
    console.error('[ERROR]', message, error, context || '')
  } else if (isSentryAvailable()) {
    if (error instanceof Error) {
      Sentry.captureException(error, { extra: { message, ...context } })
    } else {
      Sentry.captureMessage(message, { level: 'error', extra: { error, ...context } })
    }
  }
}

/**
 * Generic log function
 */
export function log(level: LogLevel, message: string, context?: LogContext) {
  switch (level) {
    case 'info':
      logInfo(message, context)
      break
    case 'warn':
      logWarn(message, context)
      break
    case 'error':
      logError(message, undefined, context)
      break
  }
}
