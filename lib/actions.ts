/**
 * Server actions for contact form submission with rate limiting and lead capture.
 *
 * @module lib/actions
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🤖 AI METACODE — Quick Reference for AI Agents
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * **FILE PURPOSE**: Core server action for contact form. Single entry point for
 * all form submissions. Handles validation → rate-limiting → persistence/sync.
 *
 * **ARCHITECTURE PATTERN**: Server Action (Next.js 14+ pattern)
 * - Called directly from ContactForm.tsx via `submitContactForm(data)`
 * - Runs server-side only (no API route needed)
 * - Returns { success, message, errors? } response object
 *
 * **CURRENT STATE**: Supabase + HubSpot lead pipeline (v1).
 *
 * **KEY DEPENDENCIES**:
 * - `./sanitize.ts` — XSS prevention (escapeHtml, sanitizeEmail, sanitizeName)
 * - `./env.ts` — Server-only env validation (validatedEnv)
 * - `./contact-form-schema.ts` — Zod schema (contactFormSchema)
 * - `@upstash/ratelimit` — Distributed rate limiting (optional)
 *
 * **RATE LIMIT DESIGN**:
 * - Dual limiting: per-email AND per-IP (both must pass)
 * - 3 requests/hour per identifier
 * - IP hashed with SHA-256 before storage (privacy)
 * - Falls back to in-memory Map when Upstash not configured (logged with missing keys)
 *
 * **AI ITERATION HINTS**:
 * 1. Schema changes: Update contact-form-schema.ts first, then this file
 * 2. New fields: Add to sanitized payload before storage and sync
 * 3. Testing: See __tests__/lib/actions.rate-limit.test.ts for mocking pattern
 *
 * **SECURITY CHECKLIST** (verify after any changes):
 * - [x] All user inputs pass through escapeHtml() before HTML context
 * - [x] CRM payload uses sanitizeName() / sanitizeEmail()
 * - [x] No raw IP addresses logged (use hashedIp)
 * - [x] Errors return generic messages (no internal details)
 * - [x] CSRF protection validates origin/referer headers
 * - [x] IP validation only trusts known proxy headers
 *
 * **RESOLVED ISSUES** (completed in transformation):
 * - [x] ~~In-memory rate limiter not suitable for multi-instance production~~ (FIXED: Issue #005)
 *       Production now enforces Upstash Redis at startup (lib/env.ts)
 * - [x] ~~No CSRF protection~~ (FIXED: Issue #010)
 *       Origin validation added with defense-in-depth approach
 * - [x] ~~IP header spoofing possible~~ (FIXED: Issue #011)
 *       Only trusted proxy headers accepted in production
 *
 * **REMAINING TECH DEBT**:
 * - [ ] No retry logic for HubSpot sync failures (tracked in Phase 5)
 *       Workaround: Failed syncs marked as `needs_sync` in database
 * - [ ] No performance monitoring for server action timing (tracked in Phase 4)
 *       Workaround: Sentry captures errors with context
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * **Features:**
 * - Distributed rate limiting via Upstash Redis (production) or in-memory fallback (development)
 * - Input sanitization to prevent XSS and injection attacks
 * - IP address hashing for privacy (SHA-256)
 * - Lead storage in Supabase and CRM sync to HubSpot
 *
 * **Security:**
 * - All user inputs sanitized with escapeHtml() before use
 * - IP addresses hashed before storage (never logged in plain text)
 * - Rate limits enforced per email address AND per IP address
 * - Payload size limited by middleware (1MB max)
 *
 * **Error Handling:**
 * - Validation errors return user-friendly messages
 * - Rate limit errors return "try again later" message
 * - Network/API errors logged to Sentry, return generic error message
 */

'use server'
import { createHash } from 'crypto'
import { headers } from 'next/headers'
import { z } from 'zod'
import { contactFormSchema, type ContactFormData } from '@/lib/contact-form-schema'
import { logError, logWarn, logInfo } from './logger'
import { escapeHtml, sanitizeEmail, sanitizeName } from './sanitize'
import { runWithRequestId } from './request-context.server'
import { withServerSpan, type SpanAttributes } from './sentry-server'
import { checkRateLimit } from './rate-limit'
import { getValidatedClientIp, validateOrigin } from './request-validation'
import { searchHubSpotContact, upsertHubSpotContact, type HubSpotContactResponse } from './hubspot-client'
import { insertSupabaseLead, updateSupabaseLead, type SupabaseLeadRow } from './supabase-leads'

const CORRELATION_ID_HEADER = 'x-correlation-id'

function getCorrelationIdFromHeaders(requestHeaders: Headers): string | undefined {
  return requestHeaders.get(CORRELATION_ID_HEADER) ?? undefined
}

/**
 * Salts for hashing to prevent rainbow table attacks.
 */
const IP_HASH_SALT = 'contact_form_ip'
const EMAIL_HASH_SALT = 'contact_form_email'
const SPAN_HASH_SALT = 'contact_form_span'

/**
 * Hash an identifier (email or IP) for privacy and storage.
 * 
 * Uses SHA-256 with salt to prevent rainbow table attacks.
 * IP addresses are NEVER stored or logged in plain text.
 * 
 * @param value - The value to hash (email or IP address)
 * @returns Hex-encoded SHA-256 hash
 */
function hashIdentifier(value: string, salt: string): string {
  return createHash('sha256').update(`${salt}:${value}`).digest('hex')
}

function hashIp(value: string): string {
  // WHY: Explicit helper prevents accidental salt mix-ups for IP hashing.
  return hashIdentifier(value, IP_HASH_SALT)
}

function hashEmail(value: string): string {
  return hashIdentifier(value, EMAIL_HASH_SALT)
}

function hashSpanValue(value: string): string {
  return hashIdentifier(value, SPAN_HASH_SALT)
}

function buildContactSpanAttributes(emailHash: string, ipHash: string): SpanAttributes {
  return {
    email_hash: emailHash,
    ip_hash: ipHash,
  }
}

function buildLeadSpanAttributes(leadId: string, emailHash: string): SpanAttributes {
  return {
    lead_id_hash: hashSpanValue(leadId),
    email_hash: emailHash,
  }
}

import { HUBSPOT } from './constants'

const HUBSPOT_MAX_RETRIES = HUBSPOT.MAX_RETRIES
const HUBSPOT_RETRY_BASE_DELAY_MS = HUBSPOT.RETRY_BASE_DELAY_MS
const HUBSPOT_RETRY_MAX_DELAY_MS = HUBSPOT.RETRY_MAX_DELAY_MS

type SanitizedContactData = {
  safeEmail: string
  safeName: string
  safePhone: string
  safeMessage: string
  emailHash: string
  hashedIp: string
  contactSpanAttributes: SpanAttributes
}

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  const firstName = parts.shift() || fullName
  const lastName = parts.join(' ')

  return {
    firstName,
    lastName: lastName || undefined,
  }
}

function buildHubSpotIdempotencyKey(leadId: string, emailHash: string) {
  return hashSpanValue(`${leadId}:${emailHash}`)
}

function getRetryDelayMs(attempt: number) {
  return Math.min(HUBSPOT_RETRY_BASE_DELAY_MS * 2 ** (attempt - 1), HUBSPOT_RETRY_MAX_DELAY_MS)
}

function normalizeError(error: unknown) {
  if (error instanceof Error) {
    return error
  }

  return new Error('Unknown HubSpot sync error')
}

function waitForRetry(delayMs: number) {
  return new Promise((resolve) => setTimeout(resolve, delayMs))
}

function getBlockedSubmissionResponse(requestHeaders: Headers, data: ContactFormData) {
  if (!validateOrigin(requestHeaders)) {
    logError('CSRF: Invalid origin detected')
    return {
      success: false,
      message: 'Invalid request. Please refresh the page and try again.',
    }
  }

  if (data.website) {
    logWarn('Honeypot field triggered for contact form submission')
    return {
      success: false,
      message: 'Unable to submit your message. Please try again.',
    }
  }

  return null
}

function buildSanitizedContactData(
  validatedData: ContactFormData,
  clientIp: string,
): SanitizedContactData {
  const hashedIp = hashIp(clientIp)
  const safeEmail = sanitizeEmail(validatedData.email)
  const safeName = sanitizeName(validatedData.name)
  const safePhone = validatedData.phone ? escapeHtml(validatedData.phone) : ''
  const safeMessage = escapeHtml(validatedData.message)
  const emailHash = hashEmail(safeEmail)

  return {
    safeEmail,
    safeName,
    safePhone,
    safeMessage,
    emailHash,
    hashedIp,
    contactSpanAttributes: buildContactSpanAttributes(emailHash, hashedIp),
  }
}

async function insertLeadWithSpan(
  sanitized: SanitizedContactData,
  isSuspicious: boolean,
): Promise<SupabaseLeadRow> {
  const lead = await withServerSpan(
    {
      name: 'supabase.insert',
      op: 'db.supabase',
      attributes: {
        ...sanitized.contactSpanAttributes,
        is_suspicious: isSuspicious,
      },
    },
    () =>
      insertSupabaseLead({
        name: sanitized.safeName,
        email: sanitized.safeEmail,
        phone: sanitized.safePhone,
        message: sanitized.safeMessage,
        is_suspicious: isSuspicious,
        suspicion_reason: isSuspicious ? 'rate_limit' : null,
        hubspot_sync_status: 'pending',
        hubspot_retry_count: 0,
        hubspot_idempotency_key: null,
      }),
  )

  if (isSuspicious) {
    logWarn('Rate limit exceeded for contact form', {
      emailHash: sanitized.emailHash,
      ip: sanitized.hashedIp,
    })
  }

  return lead
}

function buildHubSpotProperties(sanitized: SanitizedContactData): Record<string, string> {
  const { firstName, lastName } = splitName(sanitized.safeName)
  const hubspotProperties: Record<string, string> = {
    email: sanitized.safeEmail,
    firstname: firstName,
  }

  if (lastName) {
    hubspotProperties.lastname = lastName
  }

  if (sanitized.safePhone) {
    hubspotProperties.phone = sanitized.safePhone
  }

  return hubspotProperties
}

async function updateLeadWithSpan(leadId: string, emailHash: string, updates: Record<string, unknown>) {
  return withServerSpan(
    {
      name: 'supabase.update',
      op: 'db.supabase',
      attributes: buildLeadSpanAttributes(leadId, emailHash),
    },
    () => updateSupabaseLead(leadId, updates),
  )
}

async function syncHubSpotLead(leadId: string, sanitized: SanitizedContactData) {
  const hubspotProperties = buildHubSpotProperties(sanitized)
  const syncAttemptedAt = new Date().toISOString()
  const idempotencyKey = buildHubSpotIdempotencyKey(leadId, sanitized.emailHash)
  const retryResult = await retryHubSpotUpsert(hubspotProperties, idempotencyKey, sanitized.emailHash)

  if (retryResult.contact) {
    try {
      await updateLeadWithSpan(leadId, sanitized.emailHash, {
        hubspot_contact_id: retryResult.contact.id,
        hubspot_sync_status: 'synced',
        hubspot_last_sync_attempt: syncAttemptedAt,
        hubspot_retry_count: retryResult.attempts,
        hubspot_idempotency_key: idempotencyKey,
      })
      logInfo('HubSpot contact synced', { leadId, emailHash: sanitized.emailHash })
    } catch (updateError) {
      logError('Failed to update HubSpot sync status', updateError)
    }
    return
  }

  logError('HubSpot sync failed', normalizeError(retryResult.error))
  try {
    await updateLeadWithSpan(leadId, sanitized.emailHash, {
      hubspot_sync_status: 'needs_sync',
      hubspot_last_sync_attempt: syncAttemptedAt,
      hubspot_retry_count: retryResult.attempts,
      hubspot_idempotency_key: idempotencyKey,
    })
  } catch (updateError) {
    logError('Failed to update HubSpot sync status', updateError)
  }
}

async function retryHubSpotUpsert(
  properties: Record<string, string>,
  idempotencyKey: string,
  emailHash: string,
) {
  let lastError: Error | undefined

  for (let attempt = 1; attempt <= HUBSPOT_MAX_RETRIES; attempt++) {
    try {
      const contact = await upsertHubSpotContactWithSpan(properties, idempotencyKey, emailHash)
      return { contact, attempts: attempt }
    } catch (error) {
      lastError = normalizeError(error)
      if (attempt < HUBSPOT_MAX_RETRIES) {
        logWarn('HubSpot sync retry scheduled', { attempt, emailHash })
        await waitForRetry(getRetryDelayMs(attempt))
      }
    }
  }

  return { attempts: HUBSPOT_MAX_RETRIES, error: lastError }
}

async function searchHubSpotContactId(email: string, emailHash: string): Promise<string | undefined> {
  // WHY: Keep spans in the action layer so adapters stay fetch-focused and reusable.
  return withServerSpan(
    {
      name: 'hubspot.search',
      op: 'http.client',
      attributes: { email_hash: emailHash },
    },
    () => searchHubSpotContact(email),
  )
}

async function upsertHubSpotContactWithSpan(
  properties: Record<string, string>,
  idempotencyKey: string,
  emailHash: string,
): Promise<HubSpotContactResponse> {
  const existingId = await searchHubSpotContactId(properties.email, emailHash)
  const existingIdHash = existingId ? hashSpanValue(existingId) : undefined

  // WHY: Search + upsert share hashed context for traceability without exposing PII.
  return withServerSpan(
    {
      name: 'hubspot.upsert',
      op: 'http.client',
      attributes: {
        email_hash: emailHash,
        hubspot_contact_id_hash: existingIdHash,
      },
    },
    () =>
      upsertHubSpotContact({
        properties,
        idempotencyKey,
        existingId,
      }),
  )
}

async function handleContactFormSubmission(data: ContactFormData, requestHeaders: Headers) {
  const blockedResponse = getBlockedSubmissionResponse(requestHeaders, data)
  if (blockedResponse) {
    return blockedResponse
  }

  const validatedData = contactFormSchema.parse(data)
  const clientIp = await getClientIp()
  const sanitized = buildSanitizedContactData(validatedData, clientIp)

  const rateLimitPassed = await checkRateLimit({
    email: sanitized.safeEmail,
    clientIp,
    hashIp,
  })
  const isSuspicious = !rateLimitPassed

  const lead = await insertLeadWithSpan(sanitized, isSuspicious)
  await syncHubSpotLead(lead.id, sanitized)

  if (!rateLimitPassed) {
    return {
      success: false,
      message: 'Too many submissions. Please try again later.',
    }
  }

  return { success: true, message: "Thank you for your message! We'll be in touch soon." }
}

/**
 * Get validated client IP address from request headers (Issue #011 fixed).
 * 
 * In production, only trusts headers from known proxies (Cloudflare/Vercel).
 * Prevents IP spoofing attacks that bypass rate limiting.
 * 
 * @returns Client IP address or 'unknown' if not available
 */
async function getClientIp(): Promise<string> {
  const requestHeaders = await headers()
  return getValidatedClientIp(requestHeaders)
}


/**
 * Submit contact form with validation, rate limiting, sanitization, and lead capture.
 * 
 * **Flow:**
 * 1. Validate input with Zod schema (contactFormSchema)
 * 2. Check rate limits (email + IP)
 * 3. Sanitize inputs for storage and CRM sync
 * 4. Insert lead into Supabase (required)
 * 5. Attempt HubSpot sync (best-effort)
 * 6. Log result to Sentry (errors) and logger (info/warn)
 * 
 * **Rate Limiting:**
 * - 3 requests per hour per email address
 * - 3 requests per hour per IP address
 * - Uses Upstash Redis (distributed) or in-memory fallback
 * - Returns "Too many submissions" message on limit exceeded
 * 
 * **Security:**
 * - All inputs sanitized with escapeHtml() to prevent XSS
 * - IP addresses hashed before storage (SHA-256 with salt)
 * - Payload size limited by middleware (1MB max)
 * - Contact data stored in Supabase (server-only access)
 * 
 * **Lead Capture:**
 * - Supabase insert is required (fails if not configured)
 * - HubSpot sync is best-effort (failures marked for retry)
 * 
 * **Error Handling:**
 * - Validation errors (Zod): Returns field-specific error messages
 * - Rate limit errors: Returns "try again later" message
 * - Network/API errors: Returns generic error, logs to Sentry
 * - Never exposes internal error details to users
 * 
 * @param data - Contact form data (validated against contactFormSchema)
 * @returns Success response with message or error response with details
 * 
 * @throws Never throws - all errors caught and returned as response objects
 * 
 * @example
 * ```typescript
 * const result = await submitContactForm({
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   message: 'I need help with SEO',
 *   company: 'Acme Corp', // optional
 * });
 * 
 * if (result.success) {
 *   console.log(result.message); // "Thank you for your message!"
 * } else {
 *   console.error(result.message); // User-friendly error message
 *   if (result.errors) {
 *     // Zod validation errors
 *     result.errors.forEach(err => console.error(err.message));
 *   }
 * }
 * ```
 */
export async function submitContactForm(data: ContactFormData) {
  const requestHeaders = await headers()
  const correlationId = getCorrelationIdFromHeaders(requestHeaders)
  const correlationIdHash = correlationId ? hashSpanValue(correlationId) : undefined

  return runWithRequestId(correlationId, async () => {
    return withServerSpan(
      {
        name: 'contact_form.submit',
        op: 'action',
        attributes: {
          request_id_hash: correlationIdHash,
        },
      },
      async () => {
        try {
          return await handleContactFormSubmission(data, requestHeaders)
        } catch (error) {
          logError('Contact form submission error', error)

          if (error instanceof z.ZodError) {
            return {
              success: false,
              message: 'Please check your form inputs and try again.',
              errors: error.issues,
            }
          }

          return {
            success: false,
            message: 'Something went wrong. Please try again or email us directly.',
          }
        }
      },
    )
  })
}
