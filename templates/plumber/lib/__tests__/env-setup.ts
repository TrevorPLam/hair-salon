

Object.assign(process.env, {
  NODE_ENV: 'test',
  NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
  NEXT_PUBLIC_SITE_NAME: 'Test Hair Salon',
  // Note: Supabase and HubSpot variables are optional in test mode
  // They will be set by individual tests that need them
  // Booking provider variables for testing
  MINDBODY_ENABLED: 'false',
  VAGARO_ENABLED: 'false',
  SQUARE_ENABLED: 'false',
});

// Export for Jest compatibility
module.exports = {};
