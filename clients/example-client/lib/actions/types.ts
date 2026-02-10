/**
 * @file apps/web/lib/actions/types.ts
 * @role runtime
 * @summary Shared types for contact form actions.
 *
 * @entrypoints
 * - SanitizedContactData
 *
 * @exports
 * - SanitizedContactData
 *
 * @depends_on
 * - Internal: ../sentry-server (SpanAttributes)
 *
 * @used_by
 * - apps/web/lib/actions/*
 *
 * @runtime
 * - environment: server
 * - side_effects: none
 *
 * @issues
 * - [severity:low] None observed in-file.
 *
 * @status
 * - confidence: high
 * - last_audited: 2026-02-09
 */

import type { SpanAttributes } from '../sentry-server';

export type SanitizedContactData = {
  safeEmail: string;
  safeName: string;
  safePhone: string;
  safeMessage: string;
  emailHash: string;
  hashedIp: string;
  contactSpanAttributes: SpanAttributes;
};
