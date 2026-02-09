/**
 * @file apps/web/lib/sentry-sanitize.ts
 * @role runtime
 * @summary Sanitizes Sentry events to redact PII.
 *
 * @entrypoints
 * - sanitizeSentryEvent
 *
 * @exports
 * - sanitizeSentryEvent
 *
 * @depends_on
 * - External: @sentry/nextjs (Event)
 *
 * @used_by
 * - Sentry initialization config
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

import type { Event } from '@sentry/nextjs';

const EMAIL_REGEX = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const PHONE_REGEX = /\+?\d[\d\s().-]{7,}\d/g;

const SENSITIVE_KEYS = new Set([
  'email',
  'phone',
  'phoneNumber',
  'telephone',
  'mobile',
  'name',
  'firstName',
  'lastName',
  'company',
  'message',
  'form',
  'formData',
  'contact',
]);

const REDACTED_VALUE = '[REDACTED]';
const REDACTED_EMAIL = '[REDACTED_EMAIL]';
const REDACTED_PHONE = '[REDACTED_PHONE]';

type JsonValue = null | string | number | boolean | JsonValue[] | { [key: string]: JsonValue };

function redactString(value: string): string {
  return value.replace(EMAIL_REGEX, REDACTED_EMAIL).replace(PHONE_REGEX, REDACTED_PHONE);
}

function shouldRedactKey(key: string): boolean {
  return SENSITIVE_KEYS.has(key) || SENSITIVE_KEYS.has(key.toLowerCase());
}

function sanitizeValue(value: JsonValue, key?: string): JsonValue {
  if (key && shouldRedactKey(key)) {
    return REDACTED_VALUE;
  }

  if (typeof value === 'string') {
    return redactString(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item));
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([childKey, childValue]) => [
        childKey,
        sanitizeValue(childValue, childKey),
      ])
    );
  }

  return value;
}

export function sanitizeSentryEvent<TEvent extends Event>(event: TEvent): TEvent {
  return sanitizeValue(event as JsonValue) as TEvent;
}
