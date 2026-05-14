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

const THEME_STORAGE_KEY = 'runpulse-theme'

function getInitialTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark'

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'dark' || stored === 'light') return stored

  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export const useUiStore = create<UiState>((set) => ({
  themeMode: getInitialTheme(),
  selectedWeek: '',
  sessionTypeFilter: '',
  dashboardCompactMode: false,
  toggleTheme: () =>
    set((s) => {
      const next = s.themeMode === 'dark' ? 'light' : 'dark'
      window.localStorage.setItem(THEME_STORAGE_KEY, next)
      return { themeMode: next }
    }),
  setSelectedWeek: (week) => set({ selectedWeek: week }),
  setSessionTypeFilter: (type) => set({ sessionTypeFilter: type }),
  toggleCompactMode: () =>
    set((s) => ({ dashboardCompactMode: !s.dashboardCompactMode })),
}))
