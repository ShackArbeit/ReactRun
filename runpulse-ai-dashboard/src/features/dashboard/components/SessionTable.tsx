import { memo, useState } from 'react'
import type { Session } from '@/features/sessions/types'
import { Card } from '@/shared/components/Card'
import { Button } from '@/shared/components/Button'

const PAGE_SIZE = 10

const TYPE_COLORS: Record<string, string> = {
  easy: 'text-green-400 bg-green-400/10',
  tempo: 'text-orange-400 bg-orange-400/10',
  interval: 'text-red-400 bg-red-400/10',
  long: 'text-blue-400 bg-blue-400/10',
  recovery: 'text-purple-400 bg-purple-400/10',
}

interface SessionTableProps {
  sessions: Session[]
  onDelete?: (id: string) => void
}

// Memoized: table is expensive to re-render with many rows
export const SessionTable = memo(function SessionTable({ sessions, onDelete }: SessionTableProps) {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(sessions.length / PAGE_SIZE))
  const paginated = sessions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <Card className="overflow-hidden">
      <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-300">
          Sessions <span className="text-gray-500 font-normal">({sessions.length})</span>
        </h3>
        {totalPages > 1 && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ‹
            </button>
            <span>
              {page} / {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ›
            </button>
          </div>
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-500 uppercase border-b border-white/5">
              {['Date', 'Type', 'Distance', 'Duration', 'Pace', 'HR', 'Load'].map((h) => (
                <th key={h} className="text-left px-5 py-3 font-medium">
                  {h}
                </th>
              ))}
              {onDelete && <th className="px-5 py-3" />}
            </tr>
          </thead>
          <tbody>
            {paginated.map((s) => (
              <tr key={s.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-5 py-3 text-gray-300">{s.date}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TYPE_COLORS[s.type] ?? ''}`}>
                    {s.type}
                  </span>
                </td>
                <td className="px-5 py-3 text-white font-medium">{s.distanceKm} km</td>
                <td className="px-5 py-3 text-gray-300">{s.durationMin} min</td>
                <td className="px-5 py-3 text-gray-300">{s.avgPace}/km</td>
                <td className="px-5 py-3 text-gray-300">{s.heartRate} bpm</td>
                <td className="px-5 py-3 text-gray-300">{s.trainingLoad}</td>
                {onDelete && (
                  <td className="px-5 py-3">
                    <Button variant="danger" size="sm" onClick={() => onDelete(s.id)}>
                      ✕
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden divide-y divide-white/5">
        {paginated.map((s) => (
          <div key={s.id} className="px-5 py-4 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{s.date}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TYPE_COLORS[s.type] ?? ''}`}>
                {s.type}
              </span>
            </div>
            <div className="flex gap-4 text-sm">
              <span className="text-white font-medium">{s.distanceKm} km</span>
              <span className="text-gray-400">{s.durationMin} min</span>
              <span className="text-gray-400">{s.avgPace}/km</span>
              <span className="text-gray-400">Load: {s.trainingLoad}</span>
            </div>
            {s.note && <p className="text-xs text-gray-500 truncate">{s.note}</p>}
          </div>
        ))}
      </div>
    </Card>
  )
})
