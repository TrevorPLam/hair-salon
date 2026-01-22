import { beforeEach, describe, expect, it, vi } from 'vitest'

const fetchMock = vi.hoisted(() => vi.fn())
const logError = vi.hoisted(() => vi.fn())

vi.stubGlobal('fetch', fetchMock)

vi.mock('@/lib/logger', () => ({
  logError,
}))

vi.mock('@/lib/env', () => ({
  validatedEnv: {
    HUBSPOT_PRIVATE_APP_TOKEN: 'hubspot-token',
  },
}))

const buildResponse = (data: unknown, ok = true, status = 200) => ({
  ok,
  status,
  json: async () => data,
  text: async () => JSON.stringify(data),
})

describe('hubspot client adapter', () => {
  beforeEach(() => {
    // WHY: Clear mocks so each test asserts on clean call data.
    vi.resetAllMocks()
  })

  it('test_happy_returns_search_result_id', async () => {
    // WHY: Happy path should return the first matching contact ID.
    fetchMock.mockResolvedValue(buildResponse({ total: 1, results: [{ id: 'hubspot-1' }] }))
    const { searchHubSpotContact } = await import('@/lib/hubspot-client')

    const result = await searchHubSpotContact('person@example.com')

    expect(result).toBe('hubspot-1')
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.hubapi.com/crm/v3/objects/contacts/search',
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('test_empty_returns_undefined_when_search_has_no_results', async () => {
    // WHY: Empty results should not throw, just return undefined.
    fetchMock.mockResolvedValue(buildResponse({ total: 0, results: [] }))
    const { searchHubSpotContact } = await import('@/lib/hubspot-client')

    const result = await searchHubSpotContact('missing@example.com')

    expect(result).toBeUndefined()
  })

  it('test_error_throws_when_search_response_fails', async () => {
    // WHY: Non-OK responses should be promoted to explicit errors.
    fetchMock.mockResolvedValue(buildResponse({ message: 'bad' }, false, 502))
    const { searchHubSpotContact } = await import('@/lib/hubspot-client')

    await expect(searchHubSpotContact('boom@example.com')).rejects.toThrow(
      'HubSpot search failed with status 502',
    )
    expect(logError).toHaveBeenCalledWith('HubSpot search request failed', undefined, { status: 502 })
  })

  it('test_happy_upserts_contact', async () => {
    // WHY: Upsert should parse the returned HubSpot contact ID.
    fetchMock.mockResolvedValue(buildResponse({ id: 'hubspot-2' }))
    const { upsertHubSpotContact } = await import('@/lib/hubspot-client')

    const result = await upsertHubSpotContact({
      properties: { email: 'upsert@example.com' },
      idempotencyKey: 'idem-1',
    })

    expect(result.id).toBe('hubspot-2')
  })

  it('test_error_throws_when_upsert_fails', async () => {
    // WHY: Failed upserts must surface to callers for retry logic.
    fetchMock.mockResolvedValue(buildResponse({ message: 'down' }, false, 500))
    const { upsertHubSpotContact } = await import('@/lib/hubspot-client')

    await expect(
      upsertHubSpotContact({
        properties: { email: 'down@example.com' },
        existingId: 'hubspot-9',
      }),
    ).rejects.toThrow('HubSpot upsert failed with status 500')
    expect(logError).toHaveBeenCalledWith('HubSpot upsert request failed', undefined, { status: 500 })
  })
})
