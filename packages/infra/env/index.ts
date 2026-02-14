/**
 * Environment variable validation and composition utilities.
 *
 * **2026 Best Practices Applied:**
 * - Composable schema validation with Zod
 * - Type-safe environment variable access
 * - Comprehensive error reporting and validation
 * - Support for optional and required variables
 * - Feature flag detection from configuration
 *
 * **Exports:**
 * - Individual schemas for modular validation
 * - Type definitions for TypeScript support
 * - Validation helpers for composable environments
 * - Feature flag utilities for conditional logic
 *
 * @example
 * ```typescript
 * import { validateEnv, getFeatureFlags } from '@repo/infra/env';
 * import type { CompleteEnv } from '@repo/infra/env/types';
 *
 * const env = validateEnv();
 * const flags = getFeatureFlags();
 *
 * if (flags.supabaseEnabled) {
 *   console.log('Supabase integration available');
 * }
 * ```
 */

// Export all schemas for individual validation
export { baseEnvSchema } from './schemas/base';
export { rateLimitEnvSchema } from './schemas/rate-limit';
export { supabaseEnvSchema } from './schemas/supabase';
export { hubspotEnvSchema } from './schemas/hubspot';
export { bookingEnvSchema } from './schemas/booking';
export { sentryEnvSchema } from './schemas/sentry';
export { publicEnvSchema } from './schemas/public';

// Export validation functions from individual schemas
export { validateBaseEnv, safeValidateBaseEnv } from './schemas/base';
export {
  validateRateLimitEnv,
  safeValidateRateLimitEnv,
  isDistributedRateLimitingEnabled,
} from './schemas/rate-limit';
export {
  validateSupabaseEnv,
  safeValidateSupabaseEnv,
  isSupabaseEnabled,
} from './schemas/supabase';
export { validateHubspotEnv, safeValidateHubspotEnv, isHubspotEnabled } from './schemas/hubspot';
export {
  validateBookingEnv,
  safeValidateBookingEnv,
  isBookingEnabled,
  getEnabledBookingProviders,
} from './schemas/booking';
export {
  validateSentryEnv,
  safeValidateSentryEnv,
  isSentryEnabled,
  getSentrySampleRate,
} from './schemas/sentry';
export {
  validatePublicEnv,
  safeValidatePublicEnv,
  isAnalyticsEnabled,
  getAnalyticsId,
} from './schemas/public';

// Export types and validation utilities
export type {
  BaseEnv,
  RateLimitEnv,
  SupabaseEnv,
  HubspotEnv,
  BookingEnv,
  SentryEnv,
  PublicEnv,
  CompleteEnv,
  ServerEnv,
  ClientEnv,
  EnvValidationResult,
  EnvConfigOptions,
  EnvSchemaComposition,
  EnvFeatureFlags,
  EnvValidationContext,
  EnvTypeGuards,
  EnvTransformations,
} from './types';

export {
  createEnvSchema,
  completeEnvSchema,
  validateEnv,
  safeValidateEnv,
  getEnvContext,
  getFeatureFlags,
  validateEnvForEnvironment,
  createEnvSchemaForEnvironment,
} from './validate';

// Re-export commonly used combinations for convenience
// Note: baseEnvSchema is already exported above at line 32
export { validateBaseEnv as validateCoreEnv } from './schemas/base';
export { safeValidateBaseEnv as safeValidateCoreEnv } from './schemas/base';
