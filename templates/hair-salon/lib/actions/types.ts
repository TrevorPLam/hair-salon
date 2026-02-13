

import type { SpanAttributes } from '@repo/infra';

export type SanitizedContactData = {
  safeEmail: string;
  safeName: string;
  safePhone: string;
  safeMessage: string;
  emailHash: string;
  hashedIp: string;
  contactSpanAttributes: SpanAttributes;
};
