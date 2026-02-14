# AGENT_SYSTEM.md - The Constitution

This document contains the constitutional rules that all AI agents must follow when working on the hair salon monorepo. These rules are non-negotiable and enforce architectural integrity, performance standards, and security compliance.

---

@ai-constitution This file contains the constitutional rules and architectural requirements that all AI agents must follow when working on the hair salon monorepo.

---

## A. Architectural Rules

### A1. Integration Pattern

**MANDATORY**: All third-party integrations MUST use the adapter pattern.

- No direct SDK imports in components
- All external services wrapped in adapter classes
- Adapters located in `features/[service]/adapters/`
- Reference: `ai/patterns/integration-adapter-pattern.md`

### A2. Input Validation

**MANDATORY**: All inputs MUST be validated with Zod schemas.

- API routes: validate request bodies
- Form handlers: validate form data
- Environment variables: validate with env schema
- No manual validation or type assertions

### A3. Middleware Pattern

**MANDATORY**: All routes MUST use middleware factory pattern.

- No inline middleware in route handlers
- All middleware created with factory functions
- Middleware located in `lib/middleware/`
- Reference: `ai/patterns/middleware-pattern.md`

### A4. Environment Access

**FORBIDDEN**: No direct environment access outside env schema.

- Use `@/env` for all environment variables
- No `process.env` access in components
- All env variables must be typed and validated

### A5. Styling Rules

**FORBIDDEN**: No inline styles unless explicitly approved.

- Use Tailwind CSS classes
- Use CSS modules for complex component styles
- Inline styles only for dynamic values (e.g., positioning)

---

## B. Performance Requirements

### B1. Lighthouse Performance

**MANDATORY**: Lighthouse score ≥ 95 on mobile.

- Performance budget: 95+ minimum
- All pages must pass Core Web Vitals
- Run Lighthouse audit before PR submission

### B2. Bundle Size Limits

**MANDATORY**: JavaScript bundle ≤ 150KB gzipped.

- First load JS ≤ 150KB
- Total bundle ≤ 300KB
- Use dynamic imports for non-critical code

### B3. Script Loading

**FORBIDDEN**: No blocking scripts in the critical path.

- All scripts must be async or defer
- Critical CSS must be inlined
- Use Next.js Script component with proper loading strategy

### B4. Image Optimization

**MANDATORY**: Images must use optimized loader.

- Use Next.js Image component for all images
- Proper sizing and format optimization
- Lazy loading for below-the-fold images

---

## C. Security Rules

### C1. Content Security Policy

**MANDATORY**: CSP enforced on all pages.

- Strict CSP headers in middleware
- No unsafe-inline or unsafe-eval
- Report-only mode for development, enforced in production

### C2. Input Sanitization

**MANDATORY**: All user inputs must be sanitized.

- Use DOMPurify for HTML content
- Zod validation for all inputs
- No direct HTML injection without sanitization

### C3. Rate Limiting

**MANDATORY**: Rate limiting required on all write routes.

- API routes: implement rate limiting
- Form submissions: limit per IP/user
- Database writes: protect against abuse

### C4. Secret Management

**FORBIDDEN**: No secrets in client bundle.

- Server-side only for API keys and secrets
- Use environment variables for sensitive data
- No hardcoded credentials in code

---

## D. Accessibility

### D1. WCAG Compliance

**MANDATORY**: WCAG 2.2 AA compliance minimum.

- All interactive elements keyboard accessible
- Proper ARIA labels and roles
- Color contrast ratios ≥ 4.5:1

### D2. Semantic HTML

**MANDATORY**: Semantic HTML required for all content.

- Use proper heading hierarchy (h1-h6)
- Use nav, main, section, article elements
- No div-only page structures

### D3. Form Accessibility

**MANDATORY**: Forms must have proper labels and descriptions.

- Every input has associated label
- Error messages linked to inputs
- Fieldset and legend for related groups

### D4. Interactive Elements

**FORBIDDEN**: No clickable divs or non-semantic interactive elements.

- Use button, a, input elements for interactions
- Proper focus management
- Visible focus indicators

---

## E. Testing

### E1. Business Logic Coverage

**MANDATORY**: All business logic must be tested.

- Unit tests for utility functions
- Integration tests for API routes
- Component tests for complex interactions

### E2. Environment Schema Testing

**MANDATORY**: Environment schema must be tested.

- Test validation logic
- Test error handling
- Test default values

### E3. Middleware Testing

**MANDATORY**: All middleware must be tested.

- Test request/response modification
- Test error handling
- Test authentication/authorization

### E4. Security Logic Testing

**MANDATORY**: No untested security logic.

- Rate limiting must be tested
- Input validation must be tested
- Authentication flows must be tested

---

## Enforcement Mechanisms

### Code Review Requirements

- All PRs must pass automated checks
- Manual review for architectural compliance
- Security review for sensitive changes

### Automated Validation

- CI/CD pipeline validates against `AI_MANIFEST.json`
- Lighthouse audits on every build
- Security scanning on all dependencies

### Documentation Requirements

- All patterns documented with examples
- Decision logs for architectural choices
- Examples for all common implementations

---

## Violations

### Critical Violations (Block Merge)

- Direct environment access outside schema
- Missing input validation
- No rate limiting on write routes
- Inline styles without approval

### High Priority Violations (Fix Required)

- Bundle size超过 limits
- Lighthouse score below 95
- Missing semantic HTML
- Untested business logic

### Medium Priority Violations (Address in Next Sprint)

- Suboptimal performance patterns
- Missing accessibility labels
- Incomplete test coverage

---

## References

- [Pattern Library](./patterns/) - Implementation patterns
- [Performance Doctrine](./performance/) - Performance requirements
- [Security Standards](./security/) - Security implementation
- [Testing Doctrine](./testing/) - Testing requirements
- [Examples](./examples/) - Canonical implementations
- [Checklists](./checklists/) - Validation checklists

---

**This document is law. No exceptions, no ambiguity.**
