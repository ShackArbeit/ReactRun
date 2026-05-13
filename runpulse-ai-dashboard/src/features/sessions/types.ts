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
// 使用 Omit 排除自動建立資料時的 id，createAt，updatedAt
export type CreateSessionPayload = Omit<Session, 'id' | 'createdAt' | 'updatedAt'>

// 使用 Partial 增加修改資料時所送出的欄位彈性
export type UpdateSessionPayload = Partial<CreateSessionPayload>