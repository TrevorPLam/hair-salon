/**
 * Client-side providers wrapper for global functionality.
 *
 * @component Providers
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🤖 AI METACODE — Quick Reference for AI Agents
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * **FILE PURPOSE**: Client-only wrapper for global providers.
 * Wraps all pages with ErrorBoundary and Breadcrumbs components.
 *
 * **RENDERING**: Client component ('use client') required for ErrorBoundary.
 * Server components cannot use error boundaries (React limitation).
 *
 * **COMPONENT HIERARCHY**:
 * ```
 * <ErrorBoundary>     ← Catches React errors globally
 *   <div className="min-h-screen flex flex-col">
 *     <Breadcrumbs /> ← Navigation breadcrumbs
 *     {children}       ← Page content
 *   </div>
 * </ErrorBoundary>
 * ```
 *
 * **USAGE**:
 * - Called from app/layout.tsx around page content
 * - Enables client-side error handling for all pages
 * - Provides breadcrumb navigation for better UX
 *
 * **AI ITERATION HINTS**:
 * - Adding global provider? Add inside ErrorBoundary wrapper
 * - ErrorBoundary must remain outermost for proper error catching
 * - Breadcrumbs positioned before children for semantic order
 *
 * **DEPENDENCIES**:
 * - ErrorBoundary: React error boundary wrapper
 * - Breadcrumbs: Navigation breadcrumb component
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * **Purpose:**
 * - Wrap all pages with global error handling
 * - Provide breadcrumb navigation for all pages
 * - Enable client-side functionality that requires browser APIs
 *
 * **Components:**
 * - ErrorBoundary: Catches React errors and provides recovery UI
 * - Breadcrumbs: Shows navigation path from homepage to current page
 *
 * **Layout Structure:**
 * - Flex column layout for full-height pages
 * - ErrorBoundary as outer wrapper for global error catching
 * - Breadcrumbs positioned above page content
 *
 * **Why Client Component:**
 * - ErrorBoundary requires browser APIs for error handling
 * - Server components cannot use error boundaries
 * - Enables dynamic client-side functionality
 *
 * @see components/ErrorBoundary for error handling details
 * @see components/Breadcrumbs for navigation breadcrumbs
 */

'use client';

import React from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import Breadcrumbs from '@/components/Breadcrumbs';

// Client-only shell that wires global ErrorBoundary and breadcrumb trail around all pages
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <Breadcrumbs />
        {children}
      </div>
    </ErrorBoundary>
  );
}
