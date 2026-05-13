import { memo, useEffect, useState } from 'react'
import { Card } from '@/shared/components/Card'

interface WebVital {
  name: string
  value: string
  score: 'good' | 'needs-improvement' | 'poor'
  description: string
}

const MOCK_VITALS: WebVital[] = [
  { name: 'LCP', value: '1.2s', score: 'good', description: 'Largest Contentful Paint' },
  { name: 'CLS', value: '0.03', score: 'good', description: 'Cumulative Layout Shift' },
  { name: 'INP', value: '82ms', score: 'good', description: 'Interaction to Next Paint' },
]

const scoreColor = { good: 'text-green-400', 'needs-improvement': 'text-yellow-400', poor: 'text-red-400' }
const scoreBg = { good: 'bg-green-400/10', 'needs-improvement': 'bg-yellow-400/10', poor: 'bg-red-400/10' }

const STRATEGIES = [
  { icon: '⚡', label: 'Route-level code splitting', detail: 'React.lazy + Suspense' },
  { icon: '🧠', label: 'Memoized chart data', detail: 'useMemo on ECharts options' },
  { icon: '♻️', label: 'Optimistic updates', detail: 'TanStack Query mutation rollback' },
  { icon: '📦', label: 'Server state caching', detail: 'TanStack Query staleTime' },
  { icon: '📋', label: 'Pagination', detail: 'Large list — page size 10' },
]

export const PerformancePanel = memo(function PerformancePanel() {
  const [lazyStatus] = useState('✅ Loaded via React.lazy')
  const [clicked, setClicked] = useState(0)

  useEffect(() => {
    // Tracks INP test interaction — no side effects needed
  }, [clicked])

  return (
    <Card className="p-5 space-y-5">
      <h3 className="text-sm font-semibold text-gray-300">Performance Panel</h3>

      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Core Web Vitals (mock)</p>
        <div className="grid grid-cols-3 gap-3">
          {MOCK_VITALS.map((v) => (
            <div key={v.name} className={`rounded-lg p-3 text-center ${scoreBg[v.score]}`}>
              <p className={`text-xl font-bold ${scoreColor[v.score]}`}>{v.value}</p>
              <p className="text-xs font-semibold text-white mt-0.5">{v.name}</p>
              <p className="text-xs text-gray-500">{v.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Optimisation Strategies</p>
        <ul className="space-y-2">
          {STRATEGIES.map((s) => (
            <li key={s.label} className="flex items-center gap-2 text-sm">
              <span>{s.icon}</span>
              <span className="text-gray-300 font-medium">{s.label}</span>
              <span className="text-gray-500 text-xs ml-auto">{s.detail}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg bg-white/5 px-4 py-3 flex flex-wrap gap-4 text-xs">
        <span className="text-gray-400">
          Re-renders: <span className="text-cyan-400">isolated by React.memo</span>
        </span>
        <span className="text-gray-400">
          Lazy load: <span className="text-green-400">{lazyStatus}</span>
        </span>
        <button
          onClick={() => setClicked((c) => c + 1)}
          className="text-gray-500 hover:text-white transition-colors"
        >
          INP test: {clicked} clicks
        </button>
      </div>
    </Card>
  )
})
