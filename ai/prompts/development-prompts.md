# Development Prompts

This file contains curated prompts for AI agents to assist with development tasks in the hair salon application.

## Code Generation Prompts

### Component Development
```
You are a senior React/Next.js developer working on a hair salon application. Generate a [component type] component that:

Requirements:
- Uses TypeScript with proper typing
- Follows our design system (Tailwind CSS)
- Implements proper accessibility (WCAG 2.2 AA)
- Includes proper error boundaries
- Uses semantic HTML5 elements
- Responsive design for mobile-first approach
- Follows our established patterns from /ai/patterns/

Component Details:
- Component: [component name]
- Purpose: [brief description]
- Props: [list of required props]
- Features: [specific features needed]

Please generate:
1. Complete React component code
2. TypeScript interfaces for props
3. JSDoc comments for documentation
4. Basic unit tests using React Testing Library
5. Storybook stories if applicable

Constraints:
- Use our design tokens from /ai/design/design-tokens.md
- Follow adapter pattern for external integrations
- Include proper error handling and loading states
- Use semantic HTML elements
- Ensure keyboard navigation support
- Add proper ARIA attributes where needed

Reference our existing patterns in /ai/patterns/ for consistency.
```

### API Route Development
```
You are a senior Next.js developer working on a hair salon application. Generate a Next.js API route for [API purpose] that:

Requirements:
- Follows our API route pattern from /ai/patterns/api-route-pattern.md
- Uses Zod for input validation
- Implements proper error handling
- Includes rate limiting middleware
- Uses TypeScript with proper typing
- Follows security best practices from /ai/security/security-standards.md
- Includes proper logging and monitoring

API Details:
- Endpoint: [API endpoint]
- Method: [HTTP method]
- Purpose: [brief description]
- Required fields: [list of required fields]
- Optional fields: [list of optional fields]
- Authentication: [auth requirements]

Please generate:
1. Complete API route handler
2. Zod validation schemas
3. TypeScript interfaces for request/response
4. Error handling with proper status codes
5. Integration with our middleware system
6. Basic integration tests

Constraints:
- Use our middleware patterns from /ai/patterns/middleware-pattern.md
- Follow our security standards
- Include proper CORS configuration
- Use our adapter pattern for external services
- Include proper request/response logging
- Handle edge cases and error scenarios

Reference our existing API patterns for consistency.
```

### Database Operations
```
You are a database developer working with PostgreSQL and Prisma in a hair salon application. Generate database operations for [operation type] that:

Requirements:
- Uses Prisma ORM with proper typing
- Follows our database best practices
- Includes proper error handling
- Implements transaction management where needed
- Uses proper indexing strategies
- Includes data validation at database level
- Follows our security standards for data access

Operation Details:
- Entity: [database entity]
- Operation: [CRUD operation]
- Purpose: [brief description]
- Related entities: [connected entities]
- Performance requirements: [performance needs]

Please generate:
1. Complete Prisma query/mutation
2. TypeScript interfaces for data structures
3. Error handling with proper error types
4. Transaction management where needed
5. Database migration if schema changes
6. Basic unit tests for database operations

Constraints:
- Use our established database patterns
- Follow our security standards for data access
- Include proper data validation
- Use efficient queries with proper indexing
- Handle edge cases and error scenarios
- Include proper logging for debugging

Reference our existing database patterns for consistency.
```

## Debugging Prompts

### Error Analysis
```
You are a senior developer debugging an issue in a hair salon application. Analyze this error and provide:

Error Details:
- Error: [error message]
- Location: [file and line number]
- Context: [what was happening when error occurred]
- Environment: [development/staging/production]

Please provide:
1. Root cause analysis
2. Step-by-step debugging approach
3. Potential solutions with pros/cons
4. Prevention strategies
5. Code fixes if applicable
6. Testing approach to verify fix

Debugging Approach:
- Check our patterns in /ai/patterns/ for similar implementations
- Verify environment configuration
- Check external service integrations
- Review recent changes that might have caused the issue
- Consider performance and security implications

Focus on systematic debugging rather than quick fixes.
```

### Performance Investigation
```
You are a performance optimization expert analyzing a hair salon application. Investigate this performance issue:

Performance Issue:
- Problem: [specific performance problem]
- Metrics: [Lighthouse scores, bundle size, etc.]
- Context: [when and where the issue occurs]
- Impact: [user experience impact]

Please provide:
1. Performance bottleneck analysis
2. Root cause identification
3. Optimization strategies
4. Implementation approach
5. Monitoring recommendations
6. Testing methodology

Investigation Areas:
- Bundle analysis and code splitting opportunities
- Database query optimization
- Image and asset optimization
- Network request optimization
- Rendering performance issues
- Memory usage analysis

Use our performance standards from /ai/performance/ as guidelines.
```

## Refactoring Prompts

### Code Refactoring
```
You are a senior developer refactoring code in a hair salon application. Refactor this code to improve:

Current Code:
[Code snippet or description]

Refactoring Goals:
- [specific refactoring objectives]
- Performance improvements needed
- Code quality improvements
- Maintainability enhancements
- Security improvements

Please provide:
1. Refactored code with explanations
2. Before/after comparison
3. Testing strategy for refactored code
4. Migration approach if breaking changes
5. Documentation updates needed
6. Risk assessment

Refactoring Principles:
- Follow our patterns from /ai/patterns/
- Maintain backward compatibility where possible
- Improve type safety
- Enhance error handling
- Optimize performance
- Improve code readability and maintainability

Focus on incremental improvements with proper testing.
```

### Architecture Refactoring
```
You are a senior architect refactoring the hair salon application architecture. Address this architectural concern:

Architectural Issue:
- Problem: [architectural problem description]
- Current approach: [current implementation approach]
- Pain points: [specific issues with current architecture]
- Scale requirements: [scaling and performance needs]

Please provide:
1. New architectural approach
2. Migration strategy
3. Implementation roadmap
4. Risk assessment
5. Testing strategy
6. Documentation requirements

Architectural Considerations:
- Scalability and performance requirements
- Maintainability and developer experience
- Security and compliance requirements
- Integration with existing systems
- Team skill set and learning curve
- Long-term maintainability

Use our architectural patterns from /ai/patterns/ and decisions from /ai/decisions/.
```

## Testing Prompts

### Unit Test Generation
```
You are a senior test developer working on a hair salon application. Generate comprehensive unit tests for:

Testing Target:
- Component: [component name]
- Function: [function name]
- Module: [module name]
- Integration: [integration point]

Testing Requirements:
- 100% line coverage for critical paths
- Test all success and error scenarios
- Test edge cases and boundary conditions
- Test accessibility compliance
- Test performance for critical paths
- Use React Testing Library for components

Please generate:
1. Complete test suite with multiple test cases
2. Mock implementations for external dependencies
3. Test data factories for consistent test data
4. Setup and teardown procedures
5. Integration test scenarios
6. Performance test cases if applicable

Testing Approach:
- Follow our testing patterns from /ai/testing/testing-doctrine.md
- Use AAA pattern (Arrange, Act, Assert)
- Include proper test isolation
- Use descriptive test names and documentation
- Test both happy path and error scenarios
- Include accessibility testing

Focus on comprehensive coverage and maintainable tests.
```

### Integration Test Generation
```
You are a senior test developer working on a hair salon application. Generate integration tests for:

Integration Target:
- API endpoint: [endpoint name]
- Database operation: [operation type]
- External service: [service name]
- Workflow: [business process]

Testing Requirements:
- Test complete user workflows
- Test error handling and recovery
- Test performance under load
- Test security and authorization
- Test data consistency across systems
- Test external service integrations

Please generate:
1. Complete integration test suite
2. Test environment setup requirements
3. Mock implementations for external services
4. Test data scenarios covering edge cases
5. Performance and load testing scenarios
6. Security testing scenarios

Integration Approach:
- Use realistic test data and scenarios
- Test both success and failure paths
- Include proper cleanup and isolation
- Test performance characteristics
- Test security boundaries and authorization
- Test error recovery and fallback mechanisms

Focus on real-world scenarios and system reliability.
```

## Security Prompts

### Security Review
```
You are a security expert reviewing code in a hair salon application. Analyze this code for security vulnerabilities:

Code to Review:
[Code snippet or file description]

Security Analysis:
- Input validation and sanitization
- Authentication and authorization
- Data exposure and PII handling
- SQL injection and XSS prevention
- CSRF protection implementation
- Error handling and information disclosure
- Session management and token security
- File upload security

Please provide:
1. Security vulnerability assessment
2. Risk level evaluation (Critical/High/Medium/Low)
3. Specific security issues found
4. Recommended fixes with code examples
5. Security testing approach
6. Prevention strategies for future development

Security Standards:
- Follow OWASP Top 10 guidelines
- Use our security patterns from /ai/security/security-standards.md
- Implement defense in depth
- Follow principle of least privilege
- Ensure proper data encryption and protection
- Include security headers and CSP implementation

Focus on comprehensive security assessment and practical remediation.
```

### Security Testing
```
You are a security penetration tester working on a hair salon application. Generate security tests for:

Testing Target:
- Authentication system
- API endpoints
- File upload functionality
- Data access controls
- Session management
- External integrations

Security Testing Requirements:
- Test common attack vectors (XSS, SQLi, CSRF, etc.)
- Test authentication bypass attempts
- Test authorization and privilege escalation
- Test data exposure and PII leakage
- Test input validation bypasses
- Test session hijacking and fixation

Please generate:
1. Security test scenarios and test cases
2. Security testing tools and methodologies
3. Vulnerability assessment approach
4. Security testing automation scripts
5. Security reporting format
6. Remediation verification approach

Testing Approach:
- Use both automated and manual testing
- Test with various user roles and permissions
- Test with malicious input payloads
- Test network-level security issues
- Test client-side security vulnerabilities
- Test for common misconfigurations

Focus on comprehensive security assessment and realistic threat modeling.
```

## Documentation Prompts

### API Documentation
```
You are a technical writer documenting APIs for a hair salon application. Generate comprehensive API documentation for:

API Documentation Target:
- API endpoint: [endpoint name]
- Service: [service category]
- Version: [API version]

Documentation Requirements:
- Clear endpoint descriptions and purposes
- Request/response examples with sample data
- Authentication and authorization details
- Error response documentation
- Rate limiting and usage policies
- SDK integration examples
- Testing and debugging information

Please generate:
1. Complete API documentation in markdown
2. OpenAPI/Swagger specification
3. Code examples in multiple languages
4. Authentication and authorization guide
5. Error handling and troubleshooting guide
6. Integration examples and best practices

Documentation Standards:
- Follow our documentation patterns
- Include clear examples and use cases
- Provide troubleshooting and debugging information
- Include security considerations and best practices
- Use consistent formatting and structure
- Include versioning and change log information

Focus on developer-friendly documentation that enables quick integration.
```

### Component Documentation
```
You are a technical writer documenting React components for a hair salon application. Generate comprehensive component documentation for:

Component Documentation Target:
- Component: [component name]
- Purpose: [component purpose and use case]
- Complexity: [simple/medium/complex]

Documentation Requirements:
- Component overview and purpose
- Props interface with descriptions and examples
- Usage examples with code snippets
- Styling and customization options
- Accessibility features and considerations
- Performance characteristics and optimization tips
- Testing and debugging information

Please generate:
1. Complete component documentation in markdown
2. Props interface documentation
3. Usage examples with real-world scenarios
4. Styling customization guide
5. Accessibility implementation guide
6. Testing and troubleshooting information

Documentation Standards:
- Include visual examples where applicable
- Provide copy-paste ready code examples
- Include performance and accessibility considerations
- Use consistent formatting and structure
- Include best practices and gotchas
- Include related components and patterns

Focus on documentation that enables quick understanding and proper usage.
```

## Code Review Prompts

### Code Review
```
You are a senior developer conducting a code review for a hair salon application. Review this code for:

Code Review Target:
- File/Module: [file or module name]
- Author: [developer name]
- PR Description: [pull request description]

Review Criteria:
- Code quality and maintainability
- Performance implications
- Security considerations
- Testing coverage and quality
- Documentation and comments
- Adherence to our patterns and standards
- Integration with existing architecture

Please provide:
1. Overall assessment with specific feedback
2. Code quality issues and suggestions
3. Performance concerns and optimizations
4. Security vulnerabilities and recommendations
5. Testing gaps and improvements needed
6. Documentation and comment improvements

Review Approach:
- Be constructive and specific in feedback
- Provide code examples for improvements
- Consider both immediate and long-term implications
- Reference our patterns and standards
- Focus on maintainability and scalability
- Include positive reinforcement for good practices

Focus on actionable feedback that improves code quality and team knowledge.
```

### Architecture Review
```
You are a senior architect reviewing architectural decisions for a hair salon application. Review this architectural change:

Architecture Review Target:
- Change: [architectural change description]
- Impact: [areas affected by change]
- Rationale: [reasoning provided for change]

Review Criteria:
- Alignment with our architectural principles
- Scalability and performance implications
- Security and compliance considerations
- Maintainability and developer experience
- Integration with existing systems
- Long-term sustainability
- Cost and resource implications

Please provide:
1. Architectural assessment with pros/cons
2. Risk evaluation and mitigation strategies
3. Alternative approaches if applicable
4. Implementation recommendations
5. Testing and validation requirements
6. Documentation and communication needs

Review Approach:
- Consider both technical and business implications
- Evaluate short-term and long-term effects
- Reference our architectural decisions from /ai/decisions/
- Focus on system-wide implications
- Consider team capabilities and learning curve
- Include rollback and migration strategies

Focus on architectural decisions that balance immediate needs with long-term sustainability.
```
