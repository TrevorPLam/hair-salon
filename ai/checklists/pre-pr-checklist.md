# Pre-PR Checklist

This checklist must be completed before submitting any pull request to ensure code quality and compliance.

## Code Quality

### TypeScript
- [ ] All TypeScript errors resolved
- [ ] No `any` types used without justification
- [ ] Proper type annotations on all functions
- [ ] Interfaces and types properly exported
- [ ] No unused imports or variables
- [ ] Strict TypeScript mode compliance

### Code Style
- [ ] ESLint passes without warnings or errors
- [ ] Prettier formatting applied
- [ ] Consistent naming conventions
- [ ] No commented out code
- [ ] Proper JSDoc comments on complex functions
- [ ] No console.log statements in production code

## Testing

### Unit Tests
- [ ] All new functions have unit tests
- [ ] Test coverage meets minimum requirements (90%+)
- [ ] Tests follow AAA pattern (Arrange, Act, Assert)
- [ ] Mock external dependencies
- [ ] Test error conditions and edge cases
- [ ] Test success scenarios
- [ ] Tests run successfully in CI

### Integration Tests
- [ ] API endpoints tested end-to-end
- [ ] Database operations tested
- [ ] External integrations tested
- [ ] Middleware functionality tested
- [ ] Authentication flows tested

## Security

### Input Validation
- [ ] All user inputs validated with Zod schemas
- [ ] SQL injection prevention implemented
- [ ] XSS prevention implemented
- [ ] CSRF protection implemented
- [ ] File upload validation implemented
- [ ] Rate limiting implemented

### Authentication & Authorization
- [ ] Password requirements enforced
- [ ] JWT tokens properly validated
- [ ] Session management secure
- [ ] Role-based access control implemented
- [ ] Secure cookie configuration

### Data Protection
- [ ] No sensitive data in client-side code
- [ ] Environment variables properly secured
- [ ] API keys not exposed to client
- [ ] PII handling compliant with privacy policy
- [ ] Data retention policies implemented

## Performance

### Bundle Size
- [ ] JavaScript bundle under 150KB gzipped
- [ ] Total bundle under 300KB gzipped
- [ ] No blocking scripts in critical path
- [ ] Images properly optimized
- [ ] Code splitting implemented for large features

### Loading Performance
- [ ] Lighthouse score ≥ 95 on mobile
- [ ] First Contentful Paint ≤ 2.5s
- [ ] Largest Contentful Paint ≤ 2.5s
- [ ] Cumulative Layout Shift ≤ 0.1
- [ ] First Input Delay ≤ 100ms

### Caching
- [ ] Appropriate caching headers set
- - [ ] Static assets cached long-term
- - [ ] API responses cached appropriately
- - [ ] Database queries optimized
- - [ ] CDN configuration verified

## Accessibility

### WCAG Compliance
- [ ] Semantic HTML structure used
- [ ] Proper heading hierarchy (h1-h6)
- [ ] All images have alt text
- [ ] Form fields have proper labels
- [ ] Keyboard navigation supported
- [ ] Screen reader compatibility
- [ ] Color contrast ratios ≥ 4.5:1
- [ ] Focus indicators visible

### Interactive Elements
- [ ] No clickable divs used
- [ ] Buttons have proper semantic markup
- [ - [ Links have descriptive text
- [ ] Form controls properly labeled
- [ ] Touch targets ≥ 44px
- [ ] No auto-playing media without controls

## SEO

### Meta Tags
- [ ] Unique title on each page
- [ ] Meta description present and unique
- [ ] Open Graph tags implemented
- - [ ] Twitter Card tags implemented
- [ ] Canonical URLs set
- [ ] Structured data implemented
- [ ] Proper robots.txt configuration

### Content Structure
- [ ] Proper heading structure
- [ ] Content logically organized
- - [ ] Internal linking implemented
- [ ] Breadcrumb navigation where appropriate
- [ ] Sitemap.xml generated and accessible

## Documentation

### Code Comments
- [ ] Complex logic documented
- [ ] API endpoints documented
- [ ] Component props documented
- [ ] Environment variables documented
- [ ] Setup instructions updated

### README Updates
- [ ] New features documented
- [ ] Installation instructions accurate
- [ ] Usage examples provided
- - [ ] Troubleshooting section updated

## Integration

### External Services
- [ ] API keys properly configured
- [ ] Webhook endpoints tested
- [ ] Error handling implemented
- [ ] Fallback mechanisms in place
- [ ] Rate limits respected

### Database
- [ ] Migrations included if needed
- [ ] Seed data provided
- [ ] Connection pooling configured
- [ ] Indexes optimized
- [ ] Backup strategy documented

## Deployment

### Environment Variables
- [ ] All required variables set
- [ ] No hardcoded secrets
- [ ] Development/production configs separate
- [ ] Environment-specific overrides documented

### Build Process
- [ ] Production build successful
- [ ] All assets optimized
- [ ] Error-free compilation
- [ ] Bundle analysis completed

### Monitoring
- [ ] Error tracking configured
- [ ] Performance monitoring active
- [ ] Uptime monitoring configured
- [ ] Analytics tracking verified

## Review Process

### Self-Review Checklist
- [ ] Code reviewed against requirements
- [ ] Security review completed
- [ ] Performance review completed
- [ ] Accessibility review completed
- [ ] Testing review completed

### Peer Review
- [ ] Code review completed by team member
- [ ] All feedback addressed
- [ ] Changes documented
- [ ] Approval received

## Final Checks

### CI/CD Pipeline
- [ ] All automated checks passing
- [ ] Deployment to staging successful
- - [ ] Production deployment ready
- [ ] Rollback plan documented

### Quality Gates
- [ ] All quality gates passed
- [ ] No blocking issues
- [ ] Ready for merge
- [ ] Release notes prepared

## Sign-off

### Approvals
- [ ] Developer: _________________________
- [ ] Reviewer: _________________________
- [ ] QA Engineer: _________________________
- [ ] Product Owner: _________________________

### Date
- [ ] PR Created: _________________________
- [ ] Review Completed: _________________________
- [ ] Approved: _________________________

## Notes

### Additional Requirements
- [ ] Any special requirements met
- [ ] Compliance checks passed
- [ ] Documentation updated
- [ ] Stakeholder communication complete

---

**Before submitting this PR, ensure all items are checked and any issues are resolved.**
