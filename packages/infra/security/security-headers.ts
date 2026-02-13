/**
 * Security headers utilities
 * Implements 2026 best practices with comprehensive cross-origin protection
 */

export interface SecurityHeadersConfig {
  environment: 'development' | 'production';
  enableHSTS?: boolean;
  enableCOEP?: boolean;
  enableCOOP?: boolean;
  customPermissions?: string[];
}

export interface SecurityHeaders {
  [key: string]: string;
}

/**
 * Base security headers applicable to all environments
 * Implements zero-trust security principles
 */
const baseSecurityHeaders: SecurityHeaders = {
  // Clickjacking protection
  'X-Frame-Options': 'DENY',

  // MIME type sniffing protection
  'X-Content-Type-Options': 'nosniff',

  // Referrer policy for privacy
  'Referrer-Policy': 'strict-origin-when-cross-origin',

  // DNS prefetch control
  'X-DNS-Prefetch-Control': 'on',

  // Download options protection
  'X-Download-Options': 'noopen',

  // Cross-domain policy protection
  'X-Permitted-Cross-Domain-Policies': 'none',

  // Cross-Origin Resource Policy
  'Cross-Origin-Resource-Policy': 'same-origin',

  // Critical Client Hints for performance
  'Critical-CH': 'Sec-CH-UA, Sec-CH-UA-Mobile, Sec-CH-UA-Platform',
};

/**
 * Enhanced Permissions-Policy for 2026 standards
 * Controls access to browser features and APIs
 */
function buildPermissionsPolicy(customPermissions: string[] = []): string {
  const defaultPermissions = [
    // Camera and microphone access
    'camera=()',
    'microphone=()',

    // Location services
    'geolocation=()',

    // Payment and credential management
    'payment=()',
    'credentials-management=()',

    // Sensitive APIs
    'usb=()',
    'bluetooth=()',
    'accelerometer=()',
    'gyroscope=()',
    'magnetometer=()',

    // Privacy-sensitive features
    'interest-cohort=()', // Deprecated FLoC
    'browsing-topics=()', // Topics API
    'attribution-reporting=()', // Attribution Reporting API

    // Screen and display
    'screen-wake-lock=()',
    'ambient-light-sensor=()',

    // WebRTC and media
    'display-capture=()',
    'speaker=()',

    // Experimental features
    'web-share=()',
    'serial=()',
    'hid=()',
  ];

  const allPermissions = [...defaultPermissions, ...customPermissions];
  return allPermissions.join(', ');
}

/**
 * Creates comprehensive security headers based on environment and configuration
 * Implements 2026 security best practices
 */
export function getSecurityHeaders(config: SecurityHeadersConfig): SecurityHeaders {
  const {
    environment,
    enableHSTS = true,
    enableCOEP = true,
    enableCOOP = true,
    customPermissions = [],
  } = config;

  const headers: SecurityHeaders = { ...baseSecurityHeaders };

  // Permissions-Policy with enhanced 2026 features
  headers['Permissions-Policy'] = buildPermissionsPolicy(customPermissions);

  // HTTP Strict Transport Security (HSTS) - production only
  if (enableHSTS && environment === 'production') {
    headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload';
  }

  // Cross-Origin Embedder Policy (COEP) - requires COOP for proper isolation
  if (enableCOEP) {
    headers['Cross-Origin-Embedder-Policy'] = 'require-corp';
  }

  // Cross-Origin Opener Policy (COOP) - works with COEP for full isolation
  if (enableCOOP) {
    headers['Cross-Origin-Opener-Policy'] = 'same-origin';
  }

  // Development-specific headers
  if (environment === 'development') {
    // Allow debugging in development
    headers['X-Debug-Info'] = 'enabled';
  }

  return headers;
}

/**
 * Creates security headers optimized for production
 * Maximum security hardening for live environments
 */
export function getProductionSecurityHeaders(customPermissions?: string[]): SecurityHeaders {
  return getSecurityHeaders({
    environment: 'production',
    enableHSTS: true,
    enableCOEP: true,
    enableCOOP: true,
    customPermissions,
  });
}

/**
 * Creates security headers for development
 * Relaxed security for development tools and debugging
 */
export function getDevelopmentSecurityHeaders(customPermissions?: string[]): SecurityHeaders {
  return getSecurityHeaders({
    environment: 'development',
    enableHSTS: false, // Not needed in dev
    enableCOEP: false, // Can break dev tools
    enableCOOP: false, // Can break dev tools
    customPermissions,
  });
}

/**
 * Validates security header configuration
 * Ensures headers meet security requirements
 */
export function validateSecurityHeaders(headers: SecurityHeaders): {
  isValid: boolean;
  warnings: string[];
  recommendations: string[];
} {
  const warnings: string[] = [];
  const recommendations: string[] = [];

  // Check for essential headers
  const essentialHeaders = ['X-Frame-Options', 'X-Content-Type-Options', 'Referrer-Policy'];

  essentialHeaders.forEach((header) => {
    if (!headers[header]) {
      warnings.push(`Missing essential security header: ${header}`);
    }
  });

  // Check HSTS configuration
  if (headers['Strict-Transport-Security']) {
    const hsts = headers['Strict-Transport-Security'];
    if (hsts.indexOf('includeSubDomains') === -1) {
      recommendations.push('Consider adding includeSubDomains to HSTS for broader protection');
    }
    if (hsts.indexOf('preload') === -1) {
      recommendations.push('Consider adding preload to HSTS for browser preloading');
    }
  }

  // Check Permissions-Policy
  if (!headers['Permissions-Policy']) {
    warnings.push('Missing Permissions-Policy header');
  } else {
    const policy = headers['Permissions-Policy'];
    if (policy.indexOf('camera=*') !== -1 || policy.indexOf('microphone=*') !== -1) {
      warnings.push('Permissions-Policy allows unrestricted camera/microphone access');
    }
  }

  // Check cross-origin policies
  const hasCOEP = !!headers['Cross-Origin-Embedder-Policy'];
  const hasCOOP = !!headers['Cross-Origin-Opener-Policy'];

  if (hasCOEP && !hasCOOP) {
    recommendations.push('Consider adding Cross-Origin-Opener-Policy when using COEP');
  }
  if (hasCOOP && !hasCOEP) {
    recommendations.push('Consider adding Cross-Origin-Embedder-Policy when using COOP');
  }

  const isValid = warnings.length === 0;

  return { isValid, warnings, recommendations };
}

/**
 * Legacy compatibility wrapper
 * Maintains backward compatibility with existing implementations
 * @deprecated Use getSecurityHeaders with full configuration
 */
export function getLegacySecurityHeaders(
  env: 'development' | 'production' = 'production'
): SecurityHeaders {
  return getSecurityHeaders({
    environment: env,
    enableHSTS: env === 'production',
    enableCOEP: env === 'production',
    enableCOOP: env === 'production',
  });
}
