import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import AnalyticsConsentBanner from '@/components/AnalyticsConsentBanner'

vi.mock('next/script', () => ({
  default: () => null,
}))

const getAnalyticsConsentMock = vi.fn()
const setAnalyticsConsentMock = vi.fn()

vi.mock('@/lib/analytics-consent', () => ({
  getAnalyticsConsent: () => getAnalyticsConsentMock(),
  setAnalyticsConsent: (value: string) => setAnalyticsConsentMock(value),
}))

describe('AnalyticsConsentBanner', () => {
  beforeEach(() => {
    getAnalyticsConsentMock.mockReset()
    setAnalyticsConsentMock.mockReset()
  })

  it('test_renders_banner_when_consent_unknown', async () => {
    getAnalyticsConsentMock.mockReturnValue('unknown')

    render(<AnalyticsConsentBanner analyticsId="G-TEST123" />)

    expect(await screen.findByText('Analytics consent')).toBeInTheDocument()
    expect(await screen.findByRole('button', { name: 'Accept' })).toBeInTheDocument()
  })

  it('test_hides_banner_when_consent_granted', () => {
    getAnalyticsConsentMock.mockReturnValue('granted')

    render(<AnalyticsConsentBanner analyticsId="G-TEST123" />)

    expect(screen.queryByText('Analytics consent')).not.toBeInTheDocument()
  })

  it('test_hides_banner_without_analytics_id', () => {
    getAnalyticsConsentMock.mockReturnValue('unknown')

    render(<AnalyticsConsentBanner />)

    expect(screen.queryByText('Analytics consent')).not.toBeInTheDocument()
  })

  it('test_updates_consent_on_accept', async () => {
    const user = userEvent.setup()
    getAnalyticsConsentMock.mockReturnValue('unknown')

    render(<AnalyticsConsentBanner analyticsId="G-TEST123" />)

    await user.click(await screen.findByRole('button', { name: 'Accept' }))

    expect(setAnalyticsConsentMock).toHaveBeenCalledWith('granted')
  })
})
