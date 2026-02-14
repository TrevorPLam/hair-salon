# Security Checklist

This security checklist must be completed for all code changes to ensure security compliance and best practices.

## Input Validation

### Data Validation
- [ ] All user inputs validated with Zod schemas
- [ ] No raw SQL queries without parameterization
- [ ] File uploads validated for type, size, and content
- [ ] Email addresses validated with proper regex
- [ ] Phone numbers validated with proper format
- [ ] URLs validated and sanitized

### Sanitization
- [ ] HTML content sanitized with DOMPurify
- [ ] User-generated content escaped properly
- [ ] No unsafe HTML in user-facing content
- [ ] Markdown content sanitized if displayed

### Type Safety
- [ ] No `any` types without justification
- [ ] Proper TypeScript interfaces for all data structures
- [ ] Runtime type checking enabled
- [ ] No implicit `any` from JSON parsing

## Authentication & Authorization

### Password Security
- [ ] Passwords hashed with bcrypt/argon2
- [ ] Minimum password requirements enforced (8+ chars, mixed case, etc.)
- [ ] Password history not stored in plain text
- [ ] Password reset tokens have expiration
- [ ] Rate limiting on authentication attempts

### Session Management
- [ ] Secure, HttpOnly cookies for session tokens
- [ ] SameSite attribute set to 'strict'
- [ ] Session tokens have reasonable expiration
- [ ] Session regeneration implemented
- [ ] Session invalidation on logout

### JWT Implementation
- [ ] Strong secret key used (256+ bits)
- [ ] Proper algorithm (HS256) used
- [ ] Token expiration implemented
- [ ] Token refresh mechanism in place
- [ ] Token validation with signature verification

### Authorization
- [ ] Role-based access control implemented
- [ ] Principle of least privilege enforced
- [ ] Resource ownership verified
- [ ] Admin actions protected by role checks

## API Security

### Rate Limiting
- [ ] Rate limiting implemented on all write endpoints
- [ ] Rate limiting implemented on authentication endpoints
- [ ] Configurable limits per endpoint type
- [ ] IP-based and user-based limiting
- [ ] Proper error responses for rate limit exceeded

### CORS Configuration
- [ ] CORS properly configured for production
- [ ] Only allowed origins in production
- - [ ] Credentials only when needed
- [ ] Proper preflight handling
- [ ] Wildcard origins not used in production

### Headers Security
- [ ] Content Security Policy implemented
- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: DENY
- [ ] X-XSS-Protection: 1; mode=block
- [ ] Strict-Transport-Security (HTTPS only)
- [ ] Referrer-Policy: strict-origin-when-cross-origin

## Data Protection

### PII Handling
- [ ] No PII in client-side JavaScript
- [ ] Sensitive data masked in logs
- [ ] PII encrypted in database
- [ ] Data retention policies implemented
- [ ] Right to be forgotten implemented

### Encryption
- [ ] Data encrypted at rest
- [ ] HTTPS enforced in production
- - [ ] Database connections encrypted
- [ ] API keys stored securely
- [ ] Email communications encrypted when possible

## Error Handling

### Information Disclosure
- [ ] Generic error messages for users
- - [ ] No sensitive information in error responses
- [ ] Error details logged securely
- [ ] Stack traces only in development
- [ ] Custom error pages implemented

### Logging
- [ ] Security events logged
- [ ] Failed authentication attempts logged
- [ ] Suspicious activities logged
- [ ] Log tampering protection implemented
- [ ] Log rotation configured

## Database Security

### Access Control
- [ ] Principle of least privilege for database access
- [ ] Separate database users for different services
- [ ] Read-only users for reporting
- [ ] Connection pooling configured
- [ ] Database firewall rules implemented

### Query Security
- [ ] All queries use parameterized statements
- [ ] No dynamic SQL without validation
- [ ] ORM used for database operations
- [ ] SQL injection prevention implemented

### Data Integrity
- [ ] Foreign key constraints enforced
- [ ] Unique constraints enforced
- [ ] Data validation at database level
- [ ] Regular backups implemented
- [ ] Backup encryption verified

## File Security

### Upload Validation
- [ ] File type validation implemented
- [ ] File size limits enforced
- [ ] File content scanning for malware
- [ ] User-uploaded files isolated from web root
- [ ] Executable files blocked

### Access Control
- [ ] Proper file permissions set
- [ ] Directory traversal prevention implemented
- [ ] Authentication required for sensitive files
- [ ] Temporary files cleaned up properly

## Infrastructure Security

### Server Security
- [ ] Server software kept up to date
- [ ] Unnecessary services disabled
- [ ] Firewall rules configured
- [ ] Intrusion detection implemented
- [ ] DDoS protection implemented
- [ ] SSL/TLS properly configured

### Network Security
- - [ ] Internal network traffic encrypted
- [ ] VPN access for administration
- - ] Network segmentation implemented
- [ ] Port scanning protection active

## Third-Party Integrations

### API Key Management
- [ ] API keys stored in environment variables
- [ ] API keys rotated regularly
- [ ] API keys have minimum required permissions
- [ ] Third-party access logged and monitored

### Service Security
- [ ] Third-party services vetted for security
- [ ] Webhook signatures validated
- [ ] Rate limiting respected for external APIs
- [ ] Fallback mechanisms implemented

### Data Sharing
- [ ] Data sharing agreements in place
- [ ] Data processing agreements documented
- [ ] Privacy policy compliance verified
- [ ] GDPR/CCPA requirements met

## Compliance

### Privacy Regulations
- [ ] GDPR compliance implemented
- [ ] CCPA compliance implemented
- [ ] Data subject rights implemented
- [ ] Data portability implemented
- [ ] Cookie consent management implemented
- [ ] Privacy policy easily accessible

### Industry Standards
- [ ] PCI DSS compliance if applicable
- [ ] HIPAA compliance if applicable
- [ ] SOX compliance if applicable
- [ ] Industry best practices followed

## Testing Security

### Security Testing
- [ ] Security testing included in test suite
- [ ] Penetration testing conducted regularly
- [ ] Vulnerability scanning automated
- [ ] Dependency security scanning implemented
- [ ] OWASP Top 10 risks addressed

### Code Review
- [ ] Security code review process implemented
- [ ] Static analysis tools used
- [ ] Security training for developers
- [ ] Security checklist completed for all changes

## Monitoring

### Security Monitoring
- [ ] Real-time intrusion detection active
- [ ] Anomaly detection implemented
- [ ] Security incident response plan in place
- [ ] Security metrics dashboard implemented
- [ ] Alert system configured for critical issues

## Documentation

### Security Documentation
- [ ] Security policies documented
- [ ] Incident response procedures documented
- [ ] Security contact information available
- [ ] Security training materials provided
- [ ] Architecture security decisions recorded

---

**Before deploying any code changes, ensure all security requirements are met and this checklist is completed.**
