/**
 * Centralized logging utility
 * In production, this should integrate with a service like Sentry, LogRocket, or Datadog
 */

import { isDevelopment } from './env'

type LogLevel = 'info' | 'warn' | 'error'

interface LogContext {
  [key: string]: unknown
}

/**
 * Log an informational message
 * In production, this would send to your logging service
 */
export function logInfo(message: string, context?: LogContext) {
  if (isDevelopment) {
    console.info('[INFO]', message, context || '')
  }
  // In production, send to logging service:
  // Sentry.captureMessage(message, { level: 'info', extra: context })
}

/**
 * Log a warning
 */
export function logWarn(message: string, context?: LogContext) {
  if (isDevelopment) {
    console.warn('[WARN]', message, context || '')
  }
  // In production, send to logging service:
  // Sentry.captureMessage(message, { level: 'warning', extra: context })
}

/**
 * Log an error
 */
export function logError(message: string, error?: Error | unknown, context?: LogContext) {
  if (isDevelopment) {
    console.error('[ERROR]', message, error, context || '')
  }
  // In production, send to logging service:
  // Sentry.captureException(error, { extra: { message, ...context } })
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
