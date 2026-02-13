/**
 * @file templates/hair-salon/features/analytics/lib/analytics-consent.ts
 * @role runtime
 * @summary Consent storage utilities for analytics gating.
 *
 * @entrypoints
 * - Used by analytics banner and tracking helpers
 *
 * @exports
 * - getAnalyticsConsent
 * - hasAnalyticsConsent
 * - setAnalyticsConsent
 * - AnalyticsConsentState
 *
 * @depends_on
 * - Internal: @/lib/logger
 *
 * @used_by
 * - templates/hair-salon/components/AnalyticsConsentBanner.tsx
 * - templates/hair-salon/features/analytics/lib/analytics.ts
 *
 * @runtime
 * - environment: client
 * - side_effects: localStorage and cookie writes
 *
 * @data_flow
 * - inputs: consent state
 * - outputs: persisted consent cookie/localStorage
 *
 * @invariants
 * - Consent defaults to unknown
 *
 * @issues
 * - [severity:low] localStorage access may fail in restricted modes.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

import { logError } from '@/lib/logger';

export type AnalyticsConsentState = 'granted' | 'denied' | 'unknown';

const ANALYTICS_CONSENT_KEY = 'ydm_analytics_consent';
const CONSENT_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function parseConsent(value?: string | null): AnalyticsConsentState {
  if (value === 'granted' || value === 'denied') {
    return value;
  }

  return 'unknown';
}

function readCookieValue(name: string): string | null {
  if (typeof document === 'undefined' || !document.cookie) {
    return null;
  }

  const match = document.cookie.split('; ').find((cookie) => cookie.startsWith(`${name}=`));

  if (!match) {
    return null;
  }

  return decodeURIComponent(match.split('=').slice(1).join('='));
}

function setConsentCookie(consent: AnalyticsConsentState) {
  if (typeof document === 'undefined') {
    return;
  }

  const maxAge = consent === 'unknown' ? 0 : CONSENT_COOKIE_MAX_AGE_SECONDS;
  const value = consent === 'unknown' ? '' : consent;
  const secureFlag = window.location.protocol === 'https:' ? '; Secure' : '';

  document.cookie = `${ANALYTICS_CONSENT_KEY}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secureFlag}`;
}

function readStoredConsent(): string | null {
  if (!isBrowser()) {
    return null;
  }

  try {
    return window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
  } catch (error) {
    logError('Failed to read analytics consent from localStorage', error, {
      key: ANALYTICS_CONSENT_KEY,
    });
    return null;
  }
}

function writeStoredConsent(consent: AnalyticsConsentState) {
  if (!isBrowser()) {
    return;
  }

  try {
    if (consent === 'unknown') {
      window.localStorage.removeItem(ANALYTICS_CONSENT_KEY);
      return;
    }

    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, consent);
  } catch (error) {
    logError('Failed to write analytics consent to localStorage', error, {
      key: ANALYTICS_CONSENT_KEY,
    });
  }
}

export function getAnalyticsConsent(): AnalyticsConsentState {
  if (!isBrowser()) {
    return 'unknown';
  }

  const storedValue = readStoredConsent();
  const cookieValue = storedValue ?? readCookieValue(ANALYTICS_CONSENT_KEY);

  return parseConsent(cookieValue);
}

export function hasAnalyticsConsent(): boolean {
  return getAnalyticsConsent() === 'granted';
}

export function setAnalyticsConsent(consent: AnalyticsConsentState) {
  if (!isBrowser()) {
    return;
  }

  writeStoredConsent(consent);
  setConsentCookie(consent);
}
