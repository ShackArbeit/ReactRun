export interface Summary {
  totalDistanceKm: number
  weeklyLoad: number
  avgPace: string
  recoveryScore: number
  fatigueLevel: 'low' | 'medium' | 'high'
  aiSuggestion: string
}
