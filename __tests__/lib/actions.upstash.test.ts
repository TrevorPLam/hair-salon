import { beforeEach, describe, expect, it, vi } from 'vitest'

const limitMock = vi.hoisted(() => vi.fn())
const logError = vi.hoisted(() => vi.fn())
const logInfo = vi.hoisted(() => vi.fn())
const logWarn = vi.hoisted(() => vi.fn())

let currentIp = '203.0.113.55'

vi.mock('@upstash/ratelimit', () => {
  class Ratelimit {
    limit = limitMock

    constructor(_config: unknown) {}

    static slidingWindow() {
      return 'sliding-window'
    }
  }

  return { Ratelimit }
})

vi.mock('@upstash/redis', () => ({
  Redis: class Redis {
    constructor(_config: unknown) {}
  },
}))

vi.mock('@/lib/env', () => ({
  validatedEnv: {
    RESEND_API_KEY: '',
    CONTACT_EMAIL: 'contact@example.com',
    UPSTASH_REDIS_REST_URL: 'https://upstash.example',
    UPSTASH_REDIS_REST_TOKEN: 'token',
  },
}))

vi.mock('@/lib/logger', () => ({
  logError,
  logInfo,
  logWarn,
}))

vi.mock('next/headers', () => ({
  headers: () => ({
    get: (key: string) => (key === 'x-forwarded-for' ? currentIp : null),
  }),
}))

const buildPayload = (email: string) => ({
  name: 'Upstash User',
  email,
  phone: '555-555-5555',
  website: '',
  message: 'Message long enough for validation in the Upstash test suite.',
})

describe('contact form Upstash rate limiting', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.resetAllMocks()
    currentIp = '203.0.113.55'
  })

  it('uses Upstash limiter when credentials are present', async () => {
    limitMock.mockResolvedValue({ success: true })

    const { submitContactForm } = await import('@/lib/actions')
    const response = await submitContactForm(buildPayload('upstash@example.com'))

    expect(response.success).toBe(true)
    expect(limitMock).toHaveBeenCalledTimes(2)
    expect(limitMock).toHaveBeenNthCalledWith(1, 'email:upstash@example.com')
    expect(limitMock).toHaveBeenNthCalledWith(2, expect.stringMatching(/^ip:/))
    expect(logInfo).toHaveBeenCalledWith('Initialized distributed rate limiting with Upstash Redis')
  })

  it('blocks submissions when Upstash reports a limit breach', async () => {
    limitMock.mockResolvedValueOnce({ success: false })

    const { submitContactForm } = await import('@/lib/actions')
    const response = await submitContactForm(buildPayload('blocked@example.com'))

    expect(response.success).toBe(false)
    expect(response.message).toBe('Too many submissions. Please try again later.')
    expect(limitMock).toHaveBeenCalledTimes(1)
    expect(logWarn).toHaveBeenCalledWith(
      'Rate limit exceeded for contact form',
      expect.objectContaining({ emailHash: expect.any(String), ip: expect.any(String) })
    )
  })
})
