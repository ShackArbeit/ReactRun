export type SessionType = 'easy' | 'tempo' | 'interval' | 'long' | 'recovery'

export interface Session {
  id: string
  date: string
  type: SessionType
  distanceKm: number
  durationMin: number
  avgPace: string
  heartRate: number
  trainingLoad: number
  note: string
  createdAt: string
  updatedAt: string
}

export interface SessionsParams {
  week?: string
  type?: SessionType | ''
  keyword?: string
  sort?: 'date' | 'distance' | 'trainingLoad'
}

export type CreateSessionPayload = Omit<Session, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateSessionPayload = Partial<CreateSessionPayload>
