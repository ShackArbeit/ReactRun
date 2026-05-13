import { describe, it, expect } from 'vitest'
import { getSummary, getSessions } from '@/shared/api/endpoints'

describe('API endpoints', () => {
  it('getSummary returns summary data', async () => {
    const summary = await getSummary()
    expect(summary.totalDistanceKm).toBeGreaterThan(0)
    expect(summary.aiSuggestion).toBeTruthy()
  })

  it('getSessions returns session list', async () => {
    const sessions = await getSessions()
    expect(Array.isArray(sessions)).toBe(true)
    expect(sessions.length).toBeGreaterThan(0)
  })

  it('getSessions filters by type', async () => {
    const sessions = await getSessions({ type: 'easy' })
    expect(sessions.every((s) => s.type === 'easy')).toBe(true)
  })
})
