import type { Summary } from '@/features/dashboard/types'
import type { Session, SessionsParams, CreateSessionPayload, UpdateSessionPayload } from '@/features/sessions/types'
import { httpClient } from './httpClient'

function buildQuery(params: Record<string, string | undefined>): string {
  const q = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== '') q.set(k, v)
  }
  const s = q.toString()
  return s ? `?${s}` : ''
}

export function getSummary(): Promise<Summary> {
  return httpClient.get<Summary>('/api/summary')
}

export function getSessions(params: SessionsParams = {}): Promise<Session[]> {
  const query = buildQuery({
    week: params.week,
    type: params.type,
    keyword: params.keyword,
    sort: params.sort,
  })
  return httpClient.get<Session[]>(`/api/sessions${query}`)
}

export function getSessionById(id: string): Promise<Session> {
  return httpClient.get<Session>(`/api/sessions/${id}`)
}

export function createSession(payload: CreateSessionPayload): Promise<Session> {
  return httpClient.post<Session>('/api/sessions', payload)
}

export function updateSession(id: string, payload: UpdateSessionPayload): Promise<Session> {
  return httpClient.patch<Session>(`/api/sessions/${id}`, payload)
}

export function deleteSession(id: string): Promise<void> {
  return httpClient.delete<void>(`/api/sessions/${id}`)
}
