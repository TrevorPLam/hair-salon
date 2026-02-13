/**
 * @file templates/hair-salon/lib/sentry-client.ts
 * @role runtime
 * @summary Client-side Sentry helpers and span wrapper.
 *
 * @entrypoints
 * - setSentryUser
 * - setSentryContext
 * - withSentrySpan
 *
 * @exports
 * - setSentryUser
 * - setSentryContext
 * - withSentrySpan
 * - SpanAttributes
 * - SpanAttributeValue
 *
 * @depends_on
 * - External: @sentry/nextjs (dynamic import)
 *
 * @used_by
 * - templates/hair-salon/features/contact/components/ContactForm.tsx
 *
 * @runtime
 * - environment: client
 * - side_effects: Sentry user/context state
 *
 * @issues
 * - [severity:low] No-op when Sentry DSN is missing.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

let sentryPromise: Promise<typeof import('@sentry/nextjs')> | null = null;
export type SpanAttributeValue = string | number | boolean;
export type SpanAttributes = Record<string, SpanAttributeValue | undefined>;

function loadSentry() {
  if (!sentryPromise) {
    sentryPromise = import('@sentry/nextjs');
  }
  return sentryPromise;
}

export async function setSentryUser(user: { id?: string; email?: string; name?: string }) {
  if (typeof window === 'undefined' || !process.env.NEXT_PUBLIC_SENTRY_DSN) return;
  const Sentry = await loadSentry().catch(() => null);
  if (Sentry) {
    Sentry.setUser(user);
  }
}

export async function setSentryContext(name: string, context: Record<string, unknown>) {
  if (typeof window === 'undefined' || !process.env.NEXT_PUBLIC_SENTRY_DSN) return;
  const Sentry = await loadSentry().catch(() => null);
  if (Sentry) {
    Sentry.setContext(name, context);
  }
}

export async function withSentrySpan<T>(
  options: { name: string; op?: string; attributes?: SpanAttributes },
  callback: () => Promise<T>
): Promise<T> {
  if (typeof window === 'undefined' || !process.env.NEXT_PUBLIC_SENTRY_DSN) {
    return callback();
  }

  const Sentry = await loadSentry().catch(() => null);
  if (!Sentry || typeof Sentry.startSpan !== 'function') {
    return callback();
  }

  return Sentry.startSpan(
    {
      name: options.name,
      op: options.op,
      attributes: options.attributes,
    },
    async () => callback()
  );
}
