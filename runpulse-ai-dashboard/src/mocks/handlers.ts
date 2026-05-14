import { http, HttpResponse } from 'msw'
import type { Session } from '@/features/sessions/types'
import type { CreateSessionPayload, UpdateSessionPayload } from '@/features/sessions/types'
import { mockSummary, mockSessions } from './data'

let sessions: Session[] = [...mockSessions]

export const handlers = [
  http.get('/api/summary', () => {
    return HttpResponse.json(mockSummary)
  }),

  http.get('/api/sessions', ({ request }) => {
    const url = new URL(request.url)
    const type = url.searchParams.get('type')
    const keyword = url.searchParams.get('keyword')
    const sort = url.searchParams.get('sort') as 'date' | 'distance' | 'trainingLoad' | null

    let result = [...sessions]

    if (type) result = result.filter((s) => s.type === type)
    if (keyword) {
      const kw = keyword.toLowerCase()
      result = result.filter(
        (s) =>
          s.type.includes(kw) ||
          s.note.toLowerCase().includes(kw) ||
          s.date.includes(kw)
      )
    }
    if (sort === 'distance') result.sort((a, b) => b.distanceKm - a.distanceKm)
    else if (sort === 'trainingLoad') result.sort((a, b) => b.trainingLoad - a.trainingLoad)
    else result.sort((a, b) => b.date.localeCompare(a.date))

    return HttpResponse.json(result)
  }),

  http.get('/api/sessions/:id', ({ params }) => {
    const session = sessions.find((s) => s.id === params.id)
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
    const payload = (await request.json()) as UpdateSessionPayload
    const idx = sessions.findIndex((s) => s.id === params.id)
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
    const idx = sessions.findIndex((s) => s.id === params.id)
    if (idx === -1) {
      return HttpResponse.json(
        { code: 'NOT_FOUND', message: '找不到訓練紀錄' },
        { status: 404 }
      )
    }
    sessions = sessions.filter((s) => s.id !== params.id)
    return new HttpResponse(null, { status: 204 })
  }),
]
