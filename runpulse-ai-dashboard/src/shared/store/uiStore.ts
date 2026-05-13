import { create } from 'zustand'
import type { SessionType } from '@/features/sessions/types'

interface UiState {
  themeMode: 'dark' | 'light'
  selectedWeek: string
  sessionTypeFilter: SessionType | ''
  dashboardCompactMode: boolean
  toggleTheme: () => void
  setSelectedWeek: (week: string) => void
  setSessionTypeFilter: (type: SessionType | '') => void
  toggleCompactMode: () => void
}

export const useUiStore = create<UiState>((set) => ({
  themeMode: 'dark',
  selectedWeek: '',
  sessionTypeFilter: '',
  dashboardCompactMode: false,
  toggleTheme: () =>
    set((s) => ({ themeMode: s.themeMode === 'dark' ? 'light' : 'dark' })),
  setSelectedWeek: (week) => set({ selectedWeek: week }),
  setSessionTypeFilter: (type) => set({ sessionTypeFilter: type }),
  toggleCompactMode: () =>
    set((s) => ({ dashboardCompactMode: !s.dashboardCompactMode })),
}))
