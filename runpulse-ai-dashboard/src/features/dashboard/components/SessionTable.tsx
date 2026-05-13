import { memo, useState } from 'react'
import type { Session } from '@/features/sessions/types'
import { Card } from '@/shared/components/Card'
import { Button } from '@/shared/components/Button'

const PAGE_SIZE = 10

const TYPE_COLORS: Record<string, string> = {
  easy: 'text-sky-300 bg-sky-500/10',
  tempo: 'text-amber-300 bg-amber-500/10',
  interval: 'text-rose-300 bg-rose-500/10',
  long: 'text-indigo-300 bg-indigo-500/10',
  recovery: 'text-emerald-300 bg-emerald-500/10',
}

const TYPE_LABELS: Record<string, string> = {
  easy: '輕鬆跑',
  tempo: '節奏跑',
  interval: '間歇跑',
  long: '長距離',
  recovery: '恢復跑',
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
      <div className="flex items-center justify-between border-b border-slate-700 px-5 py-4">
        <h3 className="text-sm font-semibold text-slate-300">
          訓練紀錄 <span className="text-gray-500 font-normal">({sessions.length})</span>
        </h3>
        {totalPages > 1 && (
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="hover:text-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ‹
            </button>
            <span>
              {page} / {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="hover:text-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
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
            <tr className="border-b border-slate-700 text-xs uppercase text-slate-400">
              {['日期', '類型', '距離', '時間', '配速', '心率', '負荷'].map((h) => (
                <th key={h} className="text-left px-5 py-3 font-medium">
                  {h}
                </th>
              ))}
              {onDelete && <th className="px-5 py-3" />}
            </tr>
          </thead>
          <tbody>
            {paginated.map((s) => (
              <tr key={s.id} className="border-b border-slate-700 transition-colors hover:bg-slate-700/40">
                <td className="px-5 py-3 text-slate-300">{s.date}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-sm font-semibold ${TYPE_COLORS[s.type] ?? ''}`}>
                    {TYPE_LABELS[s.type] ?? s.type}
                  </span>
                </td>
                <td className="px-5 py-3 text-slate-100 font-medium">{s.distanceKm} 公里</td>
                <td className="px-5 py-3 text-slate-300">{s.durationMin} 分鐘</td>
                <td className="px-5 py-3 text-slate-300">{s.avgPace}/公里</td>
                <td className="px-5 py-3 text-slate-300">{s.heartRate} 次/分</td>
                <td className="px-5 py-3 text-slate-300">{s.trainingLoad}</td>
                {onDelete && (
                  <td className="px-5 py-3">
                    <Button variant="danger" size="sm" onClick={() => onDelete(s.id)}>
                      刪除
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden divide-y divide-slate-700">
        {paginated.map((s) => (
          <div key={s.id} className="px-5 py-4 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">{s.date}</span>
              <span className={`rounded-full px-2 py-0.5 text-sm font-semibold ${TYPE_COLORS[s.type] ?? ''}`}>
                {TYPE_LABELS[s.type] ?? s.type}
              </span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <span className="text-slate-100 font-medium">{s.distanceKm} 公里</span>
              <span className="text-slate-400">{s.durationMin} 分鐘</span>
              <span className="text-slate-400">{s.avgPace}/公里</span>
              <span className="text-slate-400">負荷：{s.trainingLoad}</span>
            </div>
            {s.note && <p className="truncate text-xs text-slate-500">{s.note}</p>}
          </div>
        ))}
      </div>
    </Card>
  )
})
