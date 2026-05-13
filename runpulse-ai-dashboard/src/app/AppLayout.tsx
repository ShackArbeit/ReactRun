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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 h-14 flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-white">
              <span className="text-xl">🏃</span>
              <span className="text-sm font-semibold tracking-tight">
                RunPulse <span className="text-cyan-400">AI</span>
              </span>
            </Link>

            <nav className="ml-4 flex items-center gap-1 text-sm text-gray-400">
              <Link
                to="/"
                className="rounded-md px-3 py-1.5 hover:bg-white/10 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
            </nav>

            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={toggleCompact}>
                {compact ? '⊞ Full' : '⊟ Compact'}
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
