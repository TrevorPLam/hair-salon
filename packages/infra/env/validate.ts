/**
 * Environment variable validation and composition utilities.
 *
 * **2026 Best Practices Applied:**
 * - Composable schema validation with Zod
 * - Descriptive error messages with setup instructions
 * - Type-safe environment variable access
 * - Support for optional and required variables
 * - Comprehensive validation context and error reporting
 *
 * **Features:**
 * - Schema composition with .merge()
 * - Selective validation based on environment
 * - Feature flag detection from configuration
 * - Graceful degradation for missing integrations
 *
 * @example
 * ```typescript
 * import { validateEnv, createEnvSchema } from '@repo/infra/env/validate';
 * import type { CompleteEnv } from '@repo/infra/env/types';
 *
 * const env = validateEnv();
 * console.log('Site:', env.NEXT_PUBLIC_SITE_NAME);
 * ```
 */

import type {
  CompleteEnv,
  EnvConfigOptions,
  EnvFeatureFlags,
  EnvSchemaComposition,
  EnvValidationContext,
  EnvValidationResult,
} from './types';

// Import all schemas for composition
import { baseEnvSchema } from './schemas/base';
import { rateLimitEnvSchema } from './schemas/rate-limit';
import { supabaseEnvSchema } from './schemas/supabase';
import { hubspotEnvSchema } from './schemas/hubspot';
import { bookingEnvSchema } from './schemas/booking';
import { sentryEnvSchema } from './schemas/sentry';
import { publicEnvSchema } from './schemas/public';

// Import helper functions from individual schemas
import { isDistributedRateLimitingEnabled } from './schemas/rate-limit';
import { isSupabaseEnabled } from './schemas/supabase';
import { isHubspotEnabled } from './schemas/hubspot';
import { isBookingEnabled, getEnabledBookingProviders } from './schemas/booking';
import { isSentryEnabled } from './schemas/sentry';
import { isAnalyticsEnabled } from './schemas/public';

/**
 * Creates a composable environment schema.
 * Combines multiple schemas based on configuration options.
 *
 * @param composition - Schema composition configuration
 * @returns Composed Zod schema
 *
 * @example
 * ```typescript
 * import { createEnvSchema } from '@repo/infra/env/validate';
 *
 * const schema = createEnvSchema({
 *   base: baseEnvSchema,
 *   optional: {
 *     rateLimit: rateLimitEnvSchema,
 *     supabase: supabaseEnvSchema,
 *     public: publicEnvSchema
 *   }
 * });
 * ```
 */
export const createEnvSchema = (composition: EnvSchemaComposition) => {
  let schema = baseEnvSchema;

  // Add optional schemas if provided
  if (composition.optional) {
    const {
      rateLimit,
      supabase,
      hubspot,
      booking,
      sentry,
      public: publicSchema,
    } = composition.optional;

    if (rateLimit) {
      schema = schema.merge(rateLimit);
    }
    if (supabase) {
      schema = schema.merge(supabase);
    }
    if (hubspot) {
      schema = schema.merge(hubspot);
    }
    if (booking) {
      schema = schema.merge(booking);
    }
    if (sentry) {
      schema = schema.merge(sentry);
    }
    if (publicSchema) {
      schema = schema.merge(publicSchema);
    }
  }

  return schema;
};

/**
 * Default complete environment schema.
 * Includes all available environment variables.
 */
export const completeEnvSchema = createEnvSchema({
  base: baseEnvSchema,
  optional: {
    rateLimit: rateLimitEnvSchema,
    supabase: supabaseEnvSchema,
    hubspot: hubspotEnvSchema,
    booking: bookingEnvSchema,
    sentry: sentryEnvSchema,
    public: publicEnvSchema,
  },
});

/**
 * Validates environment variables with comprehensive error reporting.
 * Returns validated environment or throws descriptive error.
 *
 * @param options - Validation options
 * @returns Validated environment variables
 * @throws {Error} When validation fails with detailed error message
 *
 * @example
 * ```typescript
 * import { validateEnv } from '@repo/infra/env/validate';
 *
 * try {
 *   const env = validateEnv();
 *   console.log('Environment validated successfully');
 * } catch (error) {
 *   console.error('Environment validation failed:', error.message);
 *   process.exit(1);
 * }
 * ```
 */
export const validateEnv = (
  options: EnvConfigOptions = {}
): CompleteEnv | EnvValidationResult<CompleteEnv> => {
  const {
    throwOnError = true,
    includeOptional = true,
    env = process.env,
    serverOnly = false,
  } = options;

  // Create schema based on options - always include public schema for CompleteEnv compatibility
  const schema = includeOptional ? completeEnvSchema : baseEnvSchema.merge(publicEnvSchema);

  // Validate environment
  const result = schema.safeParse(env);

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;
    const errorMessages = Object.entries(fieldErrors)
      .map(([field, errors]) => `${field}: ${errors?.join(', ')}`)
      .join('; ');

    const errorMessage =
      `❌ Invalid environment variables: ${errorMessages}\n\n` +
      `Validation context:\n` +
      `- Node Environment: ${env.NODE_ENV || 'development'}\n` +
      `- Include Optional: ${includeOptional}\n` +
      `- Server Only: ${serverOnly}\n\n` +
      `Common issues:\n` +
      `- Missing required variables (NODE_ENV, SITE_URL, SITE_NAME)\n` +
      `- Invalid URL format for SITE_URL or NEXT_PUBLIC_SITE_URL\n` +
      `- Incomplete provider configuration (both API key and ID required)\n\n` +
      `Setup instructions:\n` +
      `1. Copy .env.example to .env.local\n` +
      `2. Configure required variables for your environment\n` +
      `3. Add optional variables for integrations you need\n` +
      `4. Restart your application`;

    if (throwOnError) {
      throw new Error(errorMessage);
    }

    return {
      success: false,
      error: {
        fieldErrors,
        message: errorMessage,
      },
    } as EnvValidationResult<CompleteEnv>;
  }

  const validatedEnv = result.data as CompleteEnv;

  if (throwOnError) {
    return validatedEnv;
  }

  return {
    success: true,
    data: validatedEnv,
  } as EnvValidationResult<CompleteEnv>;
};

/**
 * Safe environment validation that doesn't throw errors.
 * Returns validation result with success status.
 *
 * @param options - Validation options
 * @returns Validation result with environment data or error information
 *
 * @example
 * ```typescript
 * import { safeValidateEnv } from '@repo/infra/env/validate';
 *
 * const result = safeValidateEnv();
 * if (result.success) {
 *   console.log('Environment:', result.data);
 * } else {
 *   console.error('Validation failed:', result.error.message);
 * }
 * ```
 */
export const safeValidateEnv = (
  options: Omit<EnvConfigOptions, 'throwOnError'> = {}
): EnvValidationResult<CompleteEnv> => {
  const result = validateEnv({ ...options, throwOnError: false });

  // Type guard to ensure we're returning the correct type
  if (typeof result === 'object' && 'success' in result) {
    return result;
  }

  // validateEnv returned CompleteEnv directly, wrap it in EnvValidationResult
  return {
    success: true,
    data: result,
  };
};

/**
 * Gets environment validation context.
 * Provides information about the current validation environment.
 *
 * @param env - Environment object to analyze (defaults to process.env)
 * @returns Validation context information
 *
 * @example
 * ```typescript
 * import { getEnvContext } from '@repo/infra/env/validate';
 *
 * const context = getEnvContext();
 * console.log('Environment:', context.nodeEnv);
 * console.log('Is Production:', context.isProduction);
 * ```
 */
export const getEnvContext = (env: Record<string, unknown> = process.env): EnvValidationContext => {
  const nodeEnv = (env.NODE_ENV as string) || 'development';

  return {
    nodeEnv: nodeEnv as 'development' | 'production' | 'test',
    isDevelopment: nodeEnv === 'development',
    isProduction: nodeEnv === 'production',
    isTest: nodeEnv === 'test',
    validatedAt: new Date(),
    source: env === process.env ? 'process.env' : 'custom',
  };
};

/**
 * Gets feature flags from environment configuration.
 * Returns boolean flags for enabled features and integrations.
 *
 * @param env - Environment object to analyze (defaults to process.env)
 * @returns Feature flags object
 *
 * @example
 * ```typescript
 * import { getFeatureFlags } from '@repo/infra/env/validate';
 *
 * const flags = getFeatureFlags();
 * console.log('Supabase enabled:', flags.supabaseEnabled);
 * console.log('Booking providers:', flags.enabledBookingProviders);
 * ```
 */
export const getFeatureFlags = (env: Record<string, unknown> = process.env): EnvFeatureFlags => {
  return {
    distributedRateLimiting: isDistributedRateLimitingEnabled(env),
    supabaseEnabled: isSupabaseEnabled(env),
    hubspotEnabled: isHubspotEnabled(env),
    bookingEnabled: isBookingEnabled(env),
    sentryEnabled: isSentryEnabled(env),
    analyticsEnabled: isAnalyticsEnabled(env),
    enabledBookingProviders: getEnabledBookingProviders(env),
  };
};

/**
 * Validates environment for specific environment (development/production/test).
 * Applies environment-specific validation rules and requirements.
 *
 * @param targetEnv - Target environment to validate for
 * @param env - Environment object to validate (defaults to process.env)
 * @returns Validation result
 *
 * @example
 * ```typescript
 * import { validateEnvForEnvironment } from '@repo/infra/env/validate';
 *
 * const result = validateEnvForEnvironment('production');
 * if (!result.success) {
 *   console.error('Production environment validation failed');
 * }
 * ```
 */
export const validateEnvForEnvironment = (
  targetEnv: 'development' | 'production' | 'test',
  env: Record<string, unknown> = process.env
): EnvValidationResult<CompleteEnv> => {
  // Environment-specific validation options
  const options: EnvConfigOptions = {
    throwOnError: false,
    includeOptional: true,
    env,
    serverOnly: false,
  };

  const result = safeValidateEnv(options);

  if (!result.success) {
    return result;
  }

  // Add environment-specific warnings
  const { data } = result;
  if (!data) {
    return result;
  }
  const warnings: string[] = [];

  if (targetEnv === 'production') {
    // Production-specific validations
    if (!data.UPSTASH_REDIS_REST_URL || !data.UPSTASH_REDIS_REST_TOKEN) {
      warnings.push('Production should use distributed rate limiting with Redis');
    }

    if (!data.SENTRY_DSN) {
      warnings.push('Production should have Sentry error tracking enabled');
    }
  }

  if (targetEnv === 'development') {
    // Development-specific validations
    if (data.NODE_ENV !== 'development') {
      warnings.push('NODE_ENV should be set to "development" in development');
    }
  }

  if (targetEnv === 'test') {
    // Test-specific validations
    if (data.NODE_ENV !== 'test') {
      warnings.push('NODE_ENV should be set to "test" during testing');
    }
  }

  // Return result with warnings if any
  if (warnings.length > 0) {
    const warningMessage = `Environment warnings for ${targetEnv}:\n${warnings.join('\n')}`;

    return {
      success: true,
      data: result.data,
      error: {
        fieldErrors: {},
        message: warningMessage,
      },
    };
  }

  return result;
};

/**
 * Creates environment-specific schema.
 * Returns schema optimized for specific environment.
 *
 * @param targetEnv - Target environment
 * @returns Environment-specific schema
 *
 * @example
 * ```typescript
 * import { createEnvSchemaForEnvironment } from '@repo/infra/env/validate';
 *
 * const prodSchema = createEnvSchemaForEnvironment('production');
 * const result = prodSchema.safeParse(process.env);
 * ```
 */
export const createEnvSchemaForEnvironment = (targetEnv: 'development' | 'production' | 'test') => {
  const baseComposition: EnvSchemaComposition = {
    base: baseEnvSchema,
    optional: {
      public: publicEnvSchema,
    },
  };

  // Add optional schemas based on environment
  if (targetEnv === 'production') {
    baseComposition.optional = {
      ...baseComposition.optional,
      rateLimit: rateLimitEnvSchema,
      supabase: supabaseEnvSchema,
      hubspot: hubspotEnvSchema,
      booking: bookingEnvSchema,
      sentry: sentryEnvSchema,
    };
  } else if (targetEnv === 'development') {
    baseComposition.optional = {
      ...baseComposition.optional,
      rateLimit: rateLimitEnvSchema,
      supabase: supabaseEnvSchema,
      hubspot: hubspotEnvSchema,
      booking: bookingEnvSchema,
      sentry: sentryEnvSchema,
    };
  } else {
    // Test environment - minimal configuration
    baseComposition.optional = {
      ...baseComposition.optional,
      // Only include schemas needed for testing
    };
  }

  return createEnvSchema(baseComposition);
};
