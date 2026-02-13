/**
 * @file templates/hair-salon/features/booking/index.ts
 * @role barrel
 * @summary Booking feature barrel exports.
 *
 * @entrypoints
 * - Booking feature imports
 *
 * @exports
 * - BookingForm (component)
 * - booking schema (types/validation)
 * - booking actions (server actions)
 * - booking providers (external integrations)
 *
 * @depends_on
 * - Internal: ./components/BookingForm
 * - Internal: ./lib/booking-schema
 * - Internal: ./lib/booking-actions
 * - Internal: ./lib/booking-providers
 *
 * @used_by
 * - templates/hair-salon/app/book/page.tsx
 * - Service pages
 *
 * @runtime
 * - environment: universal
 * - side_effects: none
 *
 * @data_flow
 * - inputs: N/A (barrel file)
 * - outputs: Feature exports
 *
 * @invariants
 * - All exports must be re-exported correctly
 * - Default export must be the main component
 *
 * @verification
 * - Test all imports work correctly
 * - Verify default export behavior
 */

// Component exports
export { default as BookingForm } from './components/BookingForm';

// Library exports
export * from './lib/booking-schema';
export * from './lib/booking-actions';
export * from './lib/booking-providers';
