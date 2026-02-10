/**
 * @file apps/web/lib/sentry-server.ts
 * @role runtime
 * @summary Server-side Sentry span helper.
 *
 * @entrypoints
 * - withServerSpan
 *
 * @exports
 * - withServerSpan
 * - SpanAttributes
 * - SpanAttributeValue
 *
 * @depends_on
 * - External: @sentry/nextjs
 *
 * @used_by
 * - apps/web/lib/actions/*
 *
 * @runtime
 * - environment: server
 * - side_effects: Sentry spans
 *
 * @issues
 * - [severity:low] No-op when Sentry DSN is missing.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

import * as Sentry from '@sentry/nextjs';

export type SpanAttributeValue = string | number | boolean;
export type SpanAttributes = Record<string, SpanAttributeValue | undefined>;

type SpanOptions = {
  name: string;
  op?: string;
  attributes?: SpanAttributes;
};

function isSentryTracingEnabled(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN) && typeof Sentry.startSpan === 'function';
}

export async function withServerSpan<T>(
  options: SpanOptions,
  callback: () => Promise<T>
): Promise<T> {
  if (!isSentryTracingEnabled()) {
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
