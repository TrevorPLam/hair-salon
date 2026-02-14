/**
 * @ai-pattern Environment Schema
 * @ai-security Input Validated
 * @ai-performance Server Only
 * @ai-tests Required
 * @ai-reference /ai/patterns/environment-schema-pattern.md
 */

import { z } from 'zod'

// Base environment variable schema
const BaseEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.string().optional(),
  HOST: z.string().optional(),
})

// Database configuration
const DatabaseSchema = z.object({
  DATABASE_URL: z.string().url('Invalid database URL'),
  DATABASE_SSL: z.boolean().default(false),
  DATABASE_POOL_SIZE: z.number().min(1).max(20).default(10),
})

// Application configuration
const AppSchema = z.object({
  SITE_URL: z.string().url().default('http://localhost:3000'),
  SITE_NAME: z.string().min(1).max(100).default('Salon'),
  SITE_DESCRIPTION: z.string().max(500).optional(),
  ADMIN_EMAIL: z.string().email('Invalid admin email'),
  DEFAULT_FROM_EMAIL: z.string().email('Invalid from email'),
})

// Authentication configuration
const AuthSchema = z.object({
  JWT_SECRET: z.string().min(32).max(128),
  JWT_EXPIRES_IN: z.string().regex(/^\d+[smhd]$/).default('7d'),
  SESSION_SECRET: z.string().min(32).max(128),
  SESSION_MAX_AGE: z.string().regex(/^\d+[smhd]$/).default('30d'),
})

// External service configuration
const ExternalServicesSchema = z.object({
  // Email service configuration
  EMAIL_SERVICE: z.enum(['resend', 'sendgrid']).default('resend'),
  RESEND_API_KEY: z.string().optional(),
  SENDGRID_API_KEY: z.string().optional(),
  
  // Payment service configuration
  PAYMENT_SERVICE: z.enum(['stripe']).default('stripe'),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  
  // SMS service configuration
  SMS_SERVICE: z.enum(['twilio']).optional(),
  TWILIO_ACCOUNT_SID: z.string().optional(),
  TWILIO_AUTH_TOKEN: z.string().optional(),
  TWILIO_PHONE_NUMBER: z.string().optional(),
  
  // Analytics service configuration
  GOOGLE_ANALYTICS_ID: z.string().optional(),
  GOOGLE_TAG_MANAGER_ID: z.string().optional(),
  FACEBOOK_PIXEL_ID: z.string().optional(),
})

// Feature flags
const FeatureFlagsSchema = z.object({
  ENABLE_BLOG: z.boolean().default(true),
  ENABLE_BOOKING: z.boolean().default(true),
  ENABLE_CONTACT_FORM: z.boolean().default(true),
  ENABLE_NEWSLETTER: z.boolean().default(true),
  ENABLE_ANALYTICS: z.boolean().default(true),
  ENABLE_MAINTENANCE_MODE: z.boolean().default(false),
  ENABLE_DEBUG_LOGGING: z.boolean().default(false),
})

// Security configuration
const SecuritySchema = z.object({
  CORS_ORIGINS: z.array(z.string()).default(['http://localhost:3000']),
  RATE_LIMIT_WINDOW_MS: z.number().default(60000), // 1 minute
  RATE_LIMIT_MAX_REQUESTS: z.number().default(100),
  SESSION_SECURE: z.boolean().default(true),
  COOKIE_SECURE: z.boolean().default(true),
  COOKIE_SAME_SITE: z.enum(['strict', 'lax', 'none']).default('strict'),
})

// Performance configuration
const PerformanceSchema = z.object({
  BUNDLE_ANALYZER: z.boolean().default(true),
  ENABLE_IMAGE_OPTIMIZATION: z.boolean().default(true),
  ENABLE_CACHING: z.boolean().default(true),
  CACHE_MAX_AGE: z.number().default(3600), // 1 hour
})

// Development configuration
const DevelopmentSchema = z.object({
  ENABLE_MOCK_SERVICES: z.boolean().default(false),
  ENABLE_SEED_DATA: z.boolean().default(false),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  ENABLE_HOT_RELOAD: z.boolean().default(true),
})

// Production configuration
const ProductionSchema = z.object({
  ENABLE_LOGGING: z.boolean().default(true),
  LOG_LEVEL: z.enum(['error', 'warn', 'info']).default('warn'),
  ENABLE_ERROR_REPORTING: z.boolean().default(true),
  ERROR_REPORTING_WEBHOOK: z.string().url().optional(),
})

// Conditional schemas based on environment
const createConditionalSchema = (env: string) => {
  const isProduction = env === 'production'
  const isDevelopment = env === 'development'
  const isTest = env === 'test'

  let schema = BaseEnvSchema

  // Add database configuration (always required)
  schema = schema.merge(DatabaseSchema)

  // Add application configuration
  schema = schema.merge(AppSchema)

  // Add authentication configuration
  schema = schema.merge(AuthSchema)

  // Add external services (conditional requirements)
  if (isProduction) {
    schema = schema.merge(ExternalServicesSchema)
  } else {
    // In development/test, make external services optional
    schema = schema.merge(ExternalServicesSchema.partial())
  }

  // Add feature flags
  schema = schema.merge(FeatureFlagsSchema)

  // Add security configuration
  schema = schema.merge(SecuritySchema)

  // Add performance configuration
  schema = schema.merge(PerformanceSchema)

  // Add environment-specific configuration
  if (isDevelopment) {
    schema = schema.merge(DevelopmentSchema)
  } else if (isProduction) {
    schema = schema.merge(ProductionSchema)
  } else if (isTest) {
    schema = schema.merge(DevelopmentSchema)
  }

  return schema
}

// Environment-specific schemas
export const DevelopmentEnvSchema = createConditionalSchema('development')
export const TestEnvSchema = createConditionalSchema('test')
export const ProductionEnvSchema = createConditionalSchema('production')

// Type exports
export type BaseEnv = z.infer<typeof BaseEnvSchema>
export type DatabaseEnv = z.infer<typeof DatabaseSchema>
export type AppEnv = z.infer<typeof AppSchema>
export type AuthEnv = z.infer<typeof AuthSchema>
export type ExternalServicesEnv = z.infer<typeof ExternalServicesSchema>
export type FeatureFlagsEnv = z.infer<typeof FeatureFlagsSchema>
export type SecurityEnv = z.infer<typeof SecuritySchema>
export type PerformanceEnv = z.infer<typeof PerformanceSchema>
export type DevelopmentEnv = z.infer<typeof DevelopmentEnv>
export type ProductionEnv = z.infer<typeof ProductionEnv>

// Environment validation function
export function validateEnv(env: Record<string, unknown>, nodeEnv: string = process.env.NODE_ENV || 'development') {
  const schema = createConditionalSchema(nodeEnv)
  
  try {
    return schema.parse(env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Environment validation failed:')
      error.errors.forEach(err => {
        console.error(`  ${err.path.join('.')}: ${err.message}`)
      })
      
      if (nodeEnv === 'production') {
        throw new Error('Environment validation failed. Please check your environment variables.')
      }
    }
    
    throw error
  }
}

// Environment schema for different environments
export const envSchemas = {
  development: DevelopmentEnvSchema,
  test: TestEnvSchema,
  production: ProductionEnvSchema,
}

// Export the appropriate schema based on current environment
export const getCurrentEnvSchema = () => {
  const nodeEnv = process.env.NODE_ENV || 'development'
  return envSchemas[nodeEnv as keyof typeof envSchemas] || DevelopmentEnvSchema
}

// Helper function to get typed environment variables
export function getEnvVar<T>(key: string): T | undefined {
  const schema = getCurrentEnvSchema()
  const envSchema = schema.shape[key] as z.ZodTypeAny
  
  if (envSchema) {
    const value = process.env[key]
    if (value !== undefined) {
      try {
        return envSchema.parse(value)
      } catch {
        return undefined
      }
    }
  }
  
  return undefined
}

// Usage example:
// const env = validateEnv(process.env)
// const databaseUrl = env.DATABASE_URL
// const jwtSecret = env.JWT_SECRET
// const isProduction = env.NODE_ENV === 'production'
