import { describe, expect, it, vi, beforeEach } from 'vitest'

const fetchMock = vi.hoisted(() => vi.fn())
const logError = vi.hoisted(() => vi.fn())

vi.stubGlobal('fetch', fetchMock)

vi.mock('@/lib/logger', () => ({
  logError,
}))

vi.mock('@/lib/env', () => ({
  validatedEnv: {
    SUPABASE_URL: 'https://supabase.example',
    SUPABASE_SERVICE_ROLE_KEY: 'service-key',
  },
}))

const buildResponse = (data: unknown, ok = true, status = 200) => ({
  ok,
  status,
  json: async () => data,
  text: async () => JSON.stringify(data),
})

describe('supabase lead repository', () => {
  beforeEach(() => {
    // WHY: Reset mocks to avoid leaking call history between tests.
    vi.resetAllMocks()
  })

  it('test_happy_inserts_lead_and_returns_id', async () => {
    // WHY: Happy path should return the first inserted lead record.
    fetchMock.mockResolvedValue(buildResponse([{ id: 'lead-123' }]))
    const { insertSupabaseLead } = await import('@/lib/supabase-leads')

    const result = await insertSupabaseLead({ name: 'Ada' })

    expect(result.id).toBe('lead-123')
    const [url, init] = fetchMock.mock.calls[0] ?? []
    expect(url).toBe('https://supabase.example/rest/v1/leads')
    expect((init?.headers as Record<string, string>)?.Prefer).toBe('return=representation')
  })

  it('test_empty_throws_when_no_lead_returned', async () => {
    // WHY: Empty arrays indicate Supabase returned no representation data.
    fetchMock.mockResolvedValue(buildResponse([]))
    const { insertSupabaseLead } = await import('@/lib/supabase-leads')

    await expect(insertSupabaseLead({ name: 'Empty' })).rejects.toThrow(
      'Supabase insert returned invalid lead ID',
    )
    expect(logError).toHaveBeenCalledWith('Supabase insert returned invalid lead ID')
  })

  it('test_error_throws_on_non_ok_response', async () => {
    // WHY: Non-OK responses must surface as explicit errors for the caller.
    fetchMock.mockResolvedValue(buildResponse({ message: 'Nope' }, false, 500))
    const { insertSupabaseLead } = await import('@/lib/supabase-leads')

    await expect(insertSupabaseLead({ name: 'Err' })).rejects.toThrow(
      'Supabase insert failed with status 500',
    )
    expect(logError).toHaveBeenCalledWith('Supabase lead insert failed', undefined, { status: 500 })
  })
})
