/**
 * @file apps/web/features/analytics/lib/analytics.ts
 * @role runtime
 * @summary Analytics tracking abstraction with consent gating.
 *
 * @entrypoints
 * - Used by UI event handlers and form submissions
 *
 * @exports
 * - trackEvent
 * - trackFormSubmission
 * - trackCTAClick
 *
 * @depends_on
 * - Internal: @/lib/logger (logInfo)
 * - Internal: ./analytics-consent (hasAnalyticsConsent)
 *
 * @used_by
 * - Contact form submission tracking
 *
 * @runtime
 * - environment: client
 * - side_effects: window analytics calls, console logging in dev/test
 *
 * @data_flow
 * - inputs: action, category, label
 * - outputs: gtag/plausible events
 *
 * @invariants
 * - No events sent without consent
 *
 * @issues
 * - [severity:low] Events are no-ops without consent or analytics scripts.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

import { logInfo } from '@/lib/logger';
import { hasAnalyticsConsent } from './analytics-consent';

function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

function isTest(): boolean {
  return process.env.NODE_ENV === 'test';
}

function isGtagFunction(value: unknown): value is (...args: unknown[]) => void {
  return typeof value === 'function';
}

/**
 * Analytics event structure following GA4 conventions.
 *
 * @property action - Event name (e.g., 'button_click')
 * @property category - Event category (e.g., 'engagement')
 * @property label - Optional label for additional context
 * @property value - Optional numeric value
 */
interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

/**
 * Track a custom event
 * Supports Google Analytics, Plausible, or custom analytics
 */
export function trackEvent({ action, category, label, value }: AnalyticsEvent) {
  if (!hasAnalyticsConsent()) {
    return;
  }

  if (isDevelopment() || isTest()) {
    logInfo('Analytics event', { action, category, label, value });
    return;
  }

  // Google Analytics 4
  if (typeof window !== 'undefined') {
    const w = window as Window & { gtag?: unknown };
    // Guard against misconfigured gtag to prevent runtime errors when scripts fail to load.
    if (isGtagFunction(w.gtag)) {
      w.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  }

  // Plausible Analytics
  if (typeof window !== 'undefined') {
    const w = window as Window & {
      plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
    };
    if (w.plausible) {
      w.plausible(action, {
        props: { category, label, value },
      });
    }
  }

  // Add other analytics providers here
}

/**
 * Track form submission (conversion on success)
 */
export function trackFormSubmission(formName: string, success = true) {
  trackEvent({
    action: `${formName}_submit`,
    category: success ? 'conversion' : 'error',
    label: formName,
    value: success ? 1 : 0,
  });
}

/**
 * Track CTA click
 */
export function trackCTAClick(ctaText: string) {
  trackEvent({
    action: 'cta_click',
    category: 'engagement',
    label: ctaText,
  });
}
