/**
 * Analytics event tracking abstraction layer.
 * 
 * **Purpose:**
 * - Provide unified API for analytics tracking
 * - Support multiple providers (GA4, Plausible) transparently
 * - Console logging in development for debugging
 * 
 * **Supported Providers:**
 * - Google Analytics 4 (via gtag.js)
 * - Plausible Analytics
 * - Extensible for others
 * 
 * **Configuration:**
 * - GA4: Set NEXT_PUBLIC_ANALYTICS_ID in env
 * - Plausible: Include script in layout
 * - No config needed for dev logging
 * 
 * **Usage:**
 * ```typescript
 * import { trackEvent, trackFormSubmission } from '@/lib/analytics'
 * 
 * // Track custom event
 * trackEvent({
 *   action: 'signup_click',
 *   category: 'conversion',
 *   label: 'homepage_hero'
 * })
 * 
 * // Track form submission
 * trackFormSubmission('contact', true)
 * ```
 * 
 * **Development Behavior:**
 * - Events logged to console instead of sent to providers
 * - Prefix: [Analytics]
 * 
 * @module lib/analytics
 */

import { isDevelopment, isTest } from './env'
import { logInfo } from './logger'

/**
 * Analytics event structure following GA4 conventions.
 * 
 * @property action - Event name (e.g., 'button_click')
 * @property category - Event category (e.g., 'engagement')
 * @property label - Optional label for additional context
 * @property value - Optional numeric value
 */
interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
}

/**
 * Track a custom event
 * Supports Google Analytics, Plausible, or custom analytics
 */
export function trackEvent({ action, category, label, value }: AnalyticsEvent) {
  if (isDevelopment() || isTest()) {
    logInfo('Analytics event', { action, category, label, value })
    return
  }

  // Google Analytics 4
  if (typeof window !== 'undefined') {
    const w = window as Window & { gtag?: (...args: unknown[]) => void }
    if (w.gtag) {
      w.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      })
    }
  }

  // Plausible Analytics
  if (typeof window !== 'undefined') {
    const w = window as Window & { plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void }
    if (w.plausible) {
      w.plausible(action, {
        props: { category, label, value },
      })
    }
  }

  // Add other analytics providers here
}

/**
 * Track page view
 */
export function trackPageView(url: string) {
  if (isDevelopment() || isTest()) {
    logInfo('Analytics page view', { url })
    return
  }

  // Google Analytics 4
  if (typeof window !== 'undefined') {
    const w = window as Window & { gtag?: (...args: unknown[]) => void }
    if (w.gtag) {
      w.gtag('config', process.env.NEXT_PUBLIC_ANALYTICS_ID, {
        page_path: url,
      })
    }
  }

  // Plausible Analytics (automatic)
  // No need to manually track page views with Plausible
}

/**
 * Track form submission
 */
export function trackFormSubmission(formName: string, success = true) {
  trackEvent({
    action: 'form_submission',
    category: 'form',
    label: formName,
    value: success ? undefined : 0,
  })
}

/**
 * Track button click
 */
export function trackButtonClick(buttonName: string, _location: string) {
  trackEvent({
    action: 'button_click',
    category: 'engagement',
    label: buttonName,
  })
}

/**
 * Track CTA click
 */
export function trackCTAClick(ctaText: string, _destination: string) {
  trackEvent({
    action: 'cta_click',
    category: 'engagement',
    label: ctaText,
  })
}

/**
 * Track outbound link
 */
export function trackOutboundLink(url: string) {
  trackEvent({
    action: 'outbound_link',
    category: 'navigation',
    label: url,
  })
}

/**
 * Track file download
 */
export function trackDownload(fileName: string) {
  trackEvent({
    action: 'download',
    category: 'engagement',
    label: fileName,
  })
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(depth: 25 | 50 | 75 | 100) {
  trackEvent({
    action: 'scroll_depth',
    category: 'engagement',
    value: depth,
  })
}

/**
 * Track time on page
 */
export function trackTimeOnPage(seconds: number) {
  trackEvent({
    action: 'time_on_page',
    category: 'engagement',
    value: seconds,
  })
}
