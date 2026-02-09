/**
 * Before running env tests, set required environment variables.
 * These are test fixtures for environment validation testing.
 */

process.env.NODE_ENV = 'test'
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'
process.env.NEXT_PUBLIC_SITE_NAME = 'Test Hair Salon'
process.env.SUPABASE_URL = 'https://test-project.supabase.co'
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-secret-key-123'
process.env.HUBSPOT_PRIVATE_APP_TOKEN = 'pat-test-token-abc'
