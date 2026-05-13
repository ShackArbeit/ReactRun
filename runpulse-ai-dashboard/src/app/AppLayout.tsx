import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useUiStore } from '@/shared/store/uiStore'
import { Button } from '@/shared/components/Button'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const themeMode = useUiStore((s) => s.themeMode)
  const toggleTheme = useUiStore((s) => s.toggleTheme)
  const toggleCompact = useUiStore((s) => s.toggleCompactMode)
  const compact = useUiStore((s) => s.dashboardCompactMode)

  return (
    <div className={`min-h-screen ${themeMode === 'dark' ? 'dark' : ''}`}>
      <div className="min-h-screen bg-slate-900 text-slate-200">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-800/95">
          <div className="mx-auto flex min-h-14 max-w-7xl flex-wrap items-center gap-2 px-4 py-2 sm:flex-nowrap sm:gap-4 sm:px-6">
            <Link to="/" className="flex min-w-0 items-center gap-2 font-bold text-slate-100">
              <span className="text-xl">🏃</span>
              <span className="truncate text-xs font-semibold tracking-tight sm:text-sm">
                跑者<span className="text-slate-300">儀表板</span>
              </span>
            </Link>

            <nav className="ml-4 hidden items-center gap-1 text-sm text-slate-400 sm:flex">
              <Link
                to="/"
                className="rounded-md px-3 py-1.5 hover:bg-slate-700 hover:text-slate-100 transition-colors"
              >
                儀表板
              </Link>
            </nav>

            <div className="ml-auto flex items-center gap-1 sm:gap-2">
              <Button variant="ghost" size="sm" onClick={toggleCompact}>
                {compact ? '⊞ 完整' : '⊟ 精簡'}
              </Button>
              <Button variant="ghost" size="sm" onClick={toggleTheme}>
                {themeMode === 'dark' ? '☀️' : '🌙'}
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className={`mx-auto max-w-7xl px-4 sm:px-6 ${compact ? 'py-4' : 'py-8'}`}>
          {children}
        </main>
      </div>
    </div>
  )
}
