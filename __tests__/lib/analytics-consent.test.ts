import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getAnalyticsConsent, hasAnalyticsConsent, setAnalyticsConsent } from '@/lib/analytics-consent'
import { logError } from '@/lib/logger'

vi.mock('@/lib/logger', () => ({
  logError: vi.fn(),
}))

describe('Analytics consent helpers', () => {
  const logErrorMock = vi.mocked(logError)

  beforeEach(() => {
    window.localStorage.removeItem('ydm_analytics_consent')
    document.cookie = 'ydm_analytics_consent=; Max-Age=0; Path=/'
    logErrorMock.mockClear()
  })

  afterEach(() => {
    window.localStorage.removeItem('ydm_analytics_consent')
    document.cookie = 'ydm_analytics_consent=; Max-Age=0; Path=/'
  })

  it('test_returns_granted_when_local_storage_set', () => {
    setAnalyticsConsent('granted')

    expect(getAnalyticsConsent()).toBe('granted')
    expect(hasAnalyticsConsent()).toBe(true)
  })

  it('test_returns_unknown_when_storage_empty', () => {
    expect(getAnalyticsConsent()).toBe('unknown')
    expect(hasAnalyticsConsent()).toBe(false)
  })

  it('test_returns_unknown_for_unrecognized_large_value', () => {
    const largeValue = 'x'.repeat(5000)
    window.localStorage.setItem('ydm_analytics_consent', largeValue)

    expect(getAnalyticsConsent()).toBe('unknown')
  })

  it('test_logs_error_when_local_storage_read_fails', () => {
    const getItemSpy = vi.spyOn(window.localStorage, 'getItem').mockImplementation(() => {
      throw new Error('Blocked')
    })

    expect(getAnalyticsConsent()).toBe('unknown')
    expect(logErrorMock).toHaveBeenCalled()

    getItemSpy.mockRestore()
  })
})
