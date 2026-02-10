# ADR-003: Database Selection (Supabase)

## Status
Accepted

## Context
We need a database solution for the Hair Salon application that supports:

- User authentication
- Contact form submissions
- Booking management
- Real-time capabilities
- Easy deployment and management
- Good TypeScript support

## Decision
We chose Supabase as our database and backend service provider.

## Consequences

### Positive
- **All-in-One**: Database, auth, and real-time in one service
- **PostgreSQL**: Full PostgreSQL database with all its features
- **TypeScript**: Excellent TypeScript support with auto-generated types
- **Real-time**: Built-in real-time subscriptions
- **Auth**: Complete authentication system included
- **Easy Setup**: Quick setup and deployment
- **Open Source**: Open source with self-hosting option

### Negative
- **Vendor Lock-in**: Some Supabase-specific features
- **Learning Curve**: Team needs to learn Supabase patterns
- **External Dependency**: Relies on external service
- **Cost**: May become expensive at scale

### Neutral
- **Managed Service**: Less operational overhead but less control

## Alternatives Considered

1. **Direct PostgreSQL**: More control but requires more setup
2. **Firebase**: NoSQL, different paradigm
3. **PlanetScale**: MySQL-based, different features
4. **Neon**: PostgreSQL but fewer features
5. **Custom Backend**: More control but much more development time

## Implementation Notes

- Using Supabase Auth for user authentication
- Leveraging Row Level Security for data access
- Using TypeScript types generated from database schema
- Implementing real-time features for booking updates
- Following Supabase best practices for performance
