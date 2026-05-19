import { http, HttpResponse } from 'msw'
import type { Session } from '@/features/sessions/types'
import type { CreateSessionPayload, UpdateSessionPayload } from '@/features/sessions/types'
import { mockSummary, mockSessions } from './data'

let sessions: Session[] = [...mockSessions]

const TYPE_LABEL: Record<string, string> = {
  easy: '輕鬆跑',
  tempo: '節奏跑',
  interval: '間歇跑',
  long: '長距離',
  recovery: '恢復跑',
}

export const handlers = [
  http.get('/api/summary', () => {
    return HttpResponse.json(mockSummary)
  }),

  http.get('/api/sessions', async ({ request }) => {
    // Simulate LLM model inference API latency (batch result delivery)
    await new Promise<void>((resolve) => setTimeout(resolve, 3500))

    const url = new URL(request.url)
    const type = url.searchParams.get('type')
    const rawKeyword = url.searchParams.get('keyword')
    const sort = url.searchParams.get('sort')

    let result = [...sessions]

    if (type) result = result.filter((s) => s.type === type)

    const kw = rawKeyword?.toLowerCase().trim() ?? ''
    if (kw) {
      const kwNum = parseFloat(kw.replace(/公里|分鐘|次\/分/g, '').trim())
      result = result.filter((s) =>
        TYPE_LABEL[s.type].includes(kw) ||
        s.type.includes(kw) ||
        s.note.toLowerCase().includes(kw) ||
        s.date.includes(kw) ||
        s.avgPace.includes(kw) ||
        (!isNaN(kwNum) && s.distanceKm === kwNum) ||
        (!isNaN(kwNum) && s.durationMin === kwNum) ||
        (!isNaN(kwNum) && s.heartRate === kwNum)
      )
    }

    if (sort === 'distance') result.sort((a, b) => b.distanceKm - a.distanceKm)
    else if (sort === 'trainingLoad') result.sort((a, b) => b.trainingLoad - a.trainingLoad)
    else result.sort((a, b) => b.date.localeCompare(a.date))

    return HttpResponse.json(result)
  }),

  http.get('/api/sessions/:id', ({ params }) => {
    const id = String(params.id)
    const session = sessions.find((s) => s.id === id)
    if (!session) {
      return HttpResponse.json(
        { code: 'NOT_FOUND', message: '找不到訓練紀錄' },
        { status: 404 }
      )
    }
    return HttpResponse.json(session)
  }),

  http.post('/api/sessions', async ({ request }) => {
    const payload = (await request.json()) as CreateSessionPayload
    const now = new Date().toISOString()
    const newSession: Session = {
      ...payload,
      id: String(Date.now()),
      createdAt: now,
      updatedAt: now,
    }
    sessions = [newSession, ...sessions]
    return HttpResponse.json(newSession, { status: 201 })
  }),

  http.patch('/api/sessions/:id', async ({ params, request }) => {
    const id = String(params.id)
    const payload = (await request.json()) as UpdateSessionPayload
    const idx = sessions.findIndex((s) => s.id === id)
    if (idx === -1) {
      return HttpResponse.json(
        { code: 'NOT_FOUND', message: '找不到訓練紀錄' },
        { status: 404 }
      )
    }
    sessions[idx] = { ...sessions[idx], ...payload, updatedAt: new Date().toISOString() }
    return HttpResponse.json(sessions[idx])
  }),

  http.delete('/api/sessions/:id', ({ params }) => {
    const id = String(params.id)
    const idx = sessions.findIndex((s) => s.id === id)
    if (idx === -1) {
      return HttpResponse.json(
        { code: 'NOT_FOUND', message: '找不到訓練紀錄' },
        { status: 404 }
      )
    }
    sessions = sessions.filter((s) => s.id !== id)
    return new HttpResponse(null, { status: 204 })
  }),
]
