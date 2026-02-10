# ADR-002: Next.js Framework Choice

## Status
Accepted

## Context
We need to choose a React-based framework for the Hair Salon application. The requirements include:

- Server-side rendering for SEO
- Static site generation for performance
- API routes for backend functionality
- Modern development patterns
- Good performance and Core Web Vitals

## Decision
We chose Next.js 14 with the App Router over other React frameworks.

## Consequences

### Positive
- **Performance**: Excellent performance with automatic optimization
- **SEO**: Built-in server-side rendering and static generation
- **Developer Experience**: Great DX with fast refresh and TypeScript support
- **Ecosystem**: Large ecosystem of plugins and integrations
- **Deployment**: Easy deployment to Vercel and other platforms
- **Modern Patterns**: App Router provides modern React patterns

### Negative
- **Learning Curve**: App Router introduces new concepts vs Pages Router
- **Opinionated**: More opinionated than some alternatives
- **Bundle Size**: Initial bundle size larger than some alternatives

### Neutral
- **Vendor Lock-in**: Some Vercel-specific optimizations (mitigated by open standards)

## Alternatives Considered

1. **Create React App**: No built-in SSR/SSG, requires additional setup
2. **Remix**: Modern framework but smaller ecosystem
3. **Gatsby**: Static-site focused, less flexible for dynamic features
4. **Custom Setup**: More control but significantly more development time

## Implementation Notes

- Using App Router for new React patterns
- Leveraging Server Components where appropriate
- Implementing ISR for dynamic content
- Using API routes for backend functionality
- Following Next.js 14 best practices
