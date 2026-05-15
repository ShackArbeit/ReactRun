import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useUiStore } from '@/shared/store/uiStore'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const themeMode = useUiStore((s) => s.themeMode)
  const toggleTheme = useUiStore((s) => s.toggleTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode
  }, [themeMode])

  return (
    <div className="min-h-screen bg-[color:var(--app-bg)] text-[color:var(--app-text)]">
      <header className="sticky top-0 z-50 border-b border-[color:var(--app-border)] bg-[color:var(--app-header)] backdrop-blur">
        <div className="mx-auto flex min-h-14 max-w-7xl flex-wrap items-center gap-2 px-4 py-2 sm:flex-nowrap sm:gap-4 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-2 font-bold text-[color:var(--app-text)]">
            <span className="text-xl">🏃</span>
            <span className="truncate text-xs font-semibold tracking-tight sm:text-sm">
              跑者<span className="text-[color:var(--app-text-muted)]">儀表板</span>
            </span>
          </Link>

          {/* <nav className="ml-4 hidden items-center gap-1 text-sm text-[color:var(--app-text-muted)] sm:flex">
            <Link
              to="/"
              className="rounded-md px-3 py-1.5 transition-colors hover:bg-[color:var(--app-surface)] hover:text-[color:var(--app-text)]"
            >
              儀表板
            </Link>
          </nav> */}

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="切換淡色與深色模式"
              title={themeMode === 'dark' ? '切換到淡色模式' : '切換到深色模式'}
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--app-border)] bg-[color:var(--app-surface)] px-2.5 py-1.5 text-sm font-medium text-[color:var(--app-text)] transition-all hover:border-cyan-300/40 hover:bg-cyan-400/10"
            >
              <span className="text-base leading-none">{themeMode === 'dark' ? '🌙' : '☀️'}</span>
              <span className="relative flex h-6 w-11 items-center rounded-full bg-cyan-500/15 px-1">
                <span
                  className={`h-4 w-4 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 shadow-md shadow-cyan-500/30 transition-transform duration-300 ${
                    themeMode === 'dark' ? 'translate-x-0' : 'translate-x-5'
                  }`}
                />
              </span>
              <span className="hidden sm:inline">{themeMode === 'dark' ? '深色' : '淡色'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {children}
      </main>
    </div>
  )
}
