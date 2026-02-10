# Architecture Documentation

## System Architecture Overview

This is a multi-template, multi-client monorepo system designed to support various beauty/wellness business types. Each template follows a modern web architecture with a focus on performance, scalability, and maintainability.

### Monorepo Structure

```
monorepo/
├── templates/           # Reusable business templates
│   ├── hair-salon/     # Hair salon template (port 3100)
│   └── shared/         # Shared template components
├── clients/            # Client implementations
│   └── example-client/ # Reference implementation (port 3001)
└── packages/           # Shared libraries
    ├── ui/            # UI component library
    ├── utils/         # Utility functions
    └── config/        # Shared configurations
```

```mermaid
graph TB
    subgraph "Client Layer"
        A[Web Browser] --> B[Next.js App]
        B --> C[React Components]
        C --> D[UI Components]
    end

    subgraph "Application Layer"
        E[Next.js API Routes] --> F[Business Logic]
        F --> G[Validation Layer]
        G --> H[Service Layer]
    end

    subgraph "Data Layer"
        I[Supabase] --> J[PostgreSQL]
        K[MDX Content] --> L[File System]
        M[Search Index] --> N[Fuse.js]
    end

    subgraph "External Services"
        O[HubSpot CRM]
        P[Analytics Service]
        Q[Email Service]
    end

    B --> E
    H --> I
    H --> K
    H --> M
    H --> O
    H --> P
    H --> Q
```

## Technology Stack

### Frontend

- **Framework**: Next.js 15.2.9 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 3.4.17
- **Components**: Custom component library (@repo/ui)
- **State Management**: React hooks and context
- **Type Safety**: TypeScript 5.7.2

### Backend

- **Runtime**: Node.js 24+
- **Database**: Supabase (PostgreSQL)
- **API**: Next.js API Routes
- **Validation**: Zod schemas
- **Authentication**: Supabase Auth (planned)

### Content Management

- **Blog**: MDX with frontmatter
- **Search**: Client-side with Fuse.js
- **Images**: Next.js Image optimization

### Development Tools

- **Package Manager**: pnpm 10.29.2
- **Monorepo**: pnpm workspaces
- **Linting**: ESLint 9 (flat config)
- **Formatting**: Prettier 3.2.5
- **Testing**: Jest + React Testing Library
- **Build System**: Turbo 2.2.3
- **CI/CD**: GitHub Actions

## Component Architecture

```mermaid
graph TB
    subgraph "Pages Layer"
        A[Home Page]
        B[Blog Pages]
        C[Contact Page]
        D[Services Page]
        E[Booking Page]
    end

    subgraph "Feature Modules"
        F[Blog Feature]
        G[Contact Feature]
        H[Search Feature]
        I[Analytics Feature]
        J[Booking Feature]
    end

    subgraph "Shared Components"
        K[Header]
        L[Footer]
        M[Navigation]
        N[Layout]
    end

    subgraph "UI Components"
        O[Button]
        P[Input]
        Q[Card]
        R[Modal]
        S[Form]
    end

    A --> F
    A --> G
    B --> F
    B --> H
    C --> G
    D --> J
    E --> J

    F --> K
    G --> K
    H --> K
    I --> K
    J --> K

    K --> N
    L --> N
    M --> N

    F --> O
    G --> P
    H --> Q
    J --> R
    G --> S
```

## Data Flow Architecture

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client
    participant A as API Routes
    participant V as Validation
    participant S as Services
    participant D as Database
    participant E as External

    U->>C: User Action
    C->>A: API Request
    A->>V: Validate Input
    V->>S: Validated Data
    S->>D: Query/Update
    D->>S: Data Response
    S->>E: External Call (optional)
    E->>S: External Response
    S->>A: Processed Response
    A->>C: API Response
    C->>U: Update UI
```

## Security Architecture

```mermaid
graph TB
    subgraph "Security Layers"
        A[Network Security]
        B[Application Security]
        C[Data Security]
        D[Compliance]
    end

    subgraph "Network Security"
        E[HTTPS/TLS]
        F[Rate Limiting]
        G[CORS]
    end

    subgraph "Application Security"
        H[Input Validation]
        I[Output Sanitization]
        J[CSRF Protection]
        K[XSS Prevention]
    end

    subgraph "Data Security"
        L[Encryption at Rest]
        M[Encryption in Transit]
        N[Access Controls]
    end

    subgraph "Compliance"
        O[GDPR Ready]
        P[CCPA Ready]
        Q[Consent Management]
    end

    A --> E
    A --> F
    A --> G

    B --> H
    B --> I
    B --> J
    B --> K

    C --> L
    C --> M
    C --> N

    D --> O
    D --> P
    D --> Q
```

## Performance Architecture

```mermaid
graph LR
    subgraph "Performance Optimization"
        A[Code Splitting]
        B[Lazy Loading]
        C[Image Optimization]
        D[Caching Strategy]
    end

    subgraph "Monitoring"
        E[Bundle Analysis]
        F[Performance Metrics]
        G[Error Tracking]
    end

    subgraph "Optimization Results"
        H[105kB Bundle]
        I[Fast Lighthouse]
        J[High Core Web Vitals]
    end

    A --> H
    B --> H
    C --> H
    D --> H

    E --> I
    F --> I
    G --> I

    H --> J
    I --> J
```

## Deployment Architecture

```mermaid
graph TB
    subgraph "Development"
        A[Local Development]
        B[pnpm dev]
        C[Hot Reload]
    end

    subgraph "CI/CD Pipeline"
        D[GitHub Actions]
        E[Automated Tests]
        F[Build Process]
        G[Security Scans]
    end

    subgraph "Production"
        H[Vercel/Netlify]
        I[Edge Network]
        J[CDN]
        K[Database]
    end

    A --> D
    B --> D
    C --> D

    D --> E
    E --> F
    F --> G
    G --> H

    H --> I
    I --> J
    J --> K
```

## Integration Architecture

```mermaid
graph TB
    subgraph "Core Application"
        A[Next.js App]
        B[API Routes]
        C[Services]
    end

    subgraph "Data Integrations"
        D[Supabase]
        E[MDX Content]
        F[Search Index]
    end

    subgraph "Third-Party Services"
        G[HubSpot CRM]
        H[Analytics]
        I[Email Service]
    end

    subgraph "Monitoring & Analytics"
        J[Error Tracking]
        K[Performance Monitoring]
        L[User Analytics]
    end

    B --> C
    C --> D
    C --> E
    C --> F
    C --> G
    C --> H
    C --> I

    A --> J
    A --> K
    H --> L
```

## Scalability Considerations

### Horizontal Scaling

- Stateless application design
- CDN distribution
- Database connection pooling
- Load balancing ready

### Vertical Scaling

- Optimized bundle size (105kB)
- Efficient rendering
- Memory management
- CPU optimization

### Performance Optimization

- Code splitting by routes
- Lazy loading components
- Image optimization
- Caching strategies

## Development Workflow

```mermaid
graph LR
    A[Development] --> B[Testing]
    B --> C[Code Review]
    C --> D[CI/CD]
    D --> E[Deployment]
    E --> F[Monitoring]
    F --> A
```

### Quality Gates

- Type checking (TypeScript)
- Unit testing (Jest)
- Integration testing
- Security scanning
- Performance monitoring

### Documentation

- API documentation (OpenAPI)
- Architecture diagrams
- ADRs (Architecture Decision Records)
- User guides
- Developer documentation
