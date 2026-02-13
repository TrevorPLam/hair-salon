/**
 * @file templates/hair-salon/lib/request-validation.ts
 * @role runtime
 * @summary CSRF validation and trusted client IP extraction.
 *
 * @entrypoints
 * - validateOrigin
 * - getValidatedClientIp
 *
 * @exports
 * - validateOrigin
 * - getValidatedClientIp
 *
 * @depends_on
 * - Node: net (isIP)
 * - Internal: ./logger
 * - Internal: ./env
 *
 * @used_by
 * - templates/hair-salon/lib/actions/submit.ts
 *
 * @runtime
 * - environment: server
 * - side_effects: none
 *
 * @issues
 * - [severity:low] Missing headers result in validation failure.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

import { isIP } from 'net';
import { logWarn } from './logger';
import { isProduction, validatedEnv } from './env';

/**
 * Trusted proxy header configuration.
 *
 * Maps environment to trusted headers in priority order.
 */
const TRUSTED_IP_HEADERS = {
  production: ['cf-connecting-ip', 'x-vercel-forwarded-for'],
  development: ['x-forwarded-for', 'x-real-ip'],
} as const;

function getExpectedHost(host: string | null): string {
  return host || validatedEnv.NEXT_PUBLIC_SITE_URL.replace(/^https?:\/\//, '');
}

function validateHeaderUrl(
  headerValue: string,
  expectedHost: string,
  headerName: 'origin' | 'referer'
): boolean {
  try {
    const url = new URL(headerValue);
    if (url.host !== expectedHost) {
      logWarn(`CSRF: ${headerName} mismatch`, { [headerName]: headerValue, expectedHost });
      return false;
    }
    return true;
  } catch {
    logWarn(`CSRF: Invalid ${headerName} URL`, { [headerName]: headerValue });
    return false;
  }
}

export function validateOrigin(requestHeaders: Headers): boolean {
  const origin = requestHeaders.get('origin');
  const referer = requestHeaders.get('referer');
  const host = requestHeaders.get('host');

  if (!origin && !referer) {
    logWarn('CSRF: No origin or referer header');
    return false;
  }

  const expectedHost = getExpectedHost(host);

  if (origin && !validateHeaderUrl(origin, expectedHost, 'origin')) {
    return false;
  }

  if (referer && !validateHeaderUrl(referer, expectedHost, 'referer')) {
    return false;
  }

  return true;
}

function isValidIpAddress(value: string): boolean {
  return isIP(value) !== 0;
}

function extractFirstIp(headerValue: string): string | null {
  const trimmedHeader = headerValue.trim();
  if (!trimmedHeader) {
    return null;
  }

  const firstIp = trimmedHeader.split(',')[0]?.trim();
  if (!firstIp) {
    return null;
  }

  if (!isValidIpAddress(firstIp)) {
    // WHY: Avoid trusting malformed proxy headers.
    return null;
  }

  return firstIp;
}

export function getValidatedClientIp(requestHeaders: Headers): string {
  const environment = isProduction() ? 'production' : 'development';
  const trustedHeaders = TRUSTED_IP_HEADERS[environment];

  for (const headerName of trustedHeaders) {
    const headerValue = requestHeaders.get(headerName);
    if (headerValue) {
      const candidateIp = extractFirstIp(headerValue);
      if (candidateIp) {
        return candidateIp;
      }
    }
  }

  return 'unknown';
}
