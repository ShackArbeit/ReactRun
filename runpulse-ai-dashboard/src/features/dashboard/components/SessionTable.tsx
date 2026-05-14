import { memo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { Session } from '@/features/sessions/types'
import { Card } from '@/shared/components/Card'
import { Button } from '@/shared/components/Button'

const PAGE_SIZE = 10

const TYPE_COLORS: Record<string, string> = {
  easy: 'text-sky-100 bg-sky-500/20 border-sky-400/30',
  tempo: 'text-amber-100 bg-amber-500/20 border-amber-400/30',
  interval: 'text-rose-100 bg-rose-500/20 border-rose-400/30',
  long: 'text-indigo-100 bg-indigo-500/20 border-indigo-400/30',
  recovery: 'text-emerald-100 bg-emerald-500/20 border-emerald-400/30',
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

export const SessionTable = memo(function SessionTable({ sessions, onDelete }: SessionTableProps) {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(sessions.length / PAGE_SIZE))
  const paginated = sessions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <Card className="overflow-hidden border-[color:var(--app-border)]">
      <div className="flex items-center justify-between border-b border-[color:var(--app-border)] bg-[color:var(--app-surface-strong)] px-5 py-4">
        <h3 className="text-sm font-semibold text-[color:var(--app-text)]">
          訓練紀錄 <span className="font-normal text-[color:var(--app-text-muted)]">({sessions.length})</span>
        </h3>
        {totalPages > 1 && (
          <div className="flex items-center gap-2 text-sm text-[color:var(--app-text-muted)]">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-full border border-[color:var(--app-border)] bg-[color:var(--app-surface)] px-2.5 py-1 transition hover:border-cyan-300/40 hover:bg-cyan-400/10 hover:text-[color:var(--app-text)] disabled:cursor-not-allowed disabled:opacity-30"
            >
              ←
            </button>
            <span className="rounded-full border border-[color:var(--app-border)] bg-[color:var(--app-surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-500">
              {page} / {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-full border border-[color:var(--app-border)] bg-[color:var(--app-surface)] px-2.5 py-1 transition hover:border-cyan-300/40 hover:bg-cyan-400/10 hover:text-[color:var(--app-text)] disabled:cursor-not-allowed disabled:opacity-30"
            >
              →
            </button>
          </div>
        )}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-[860px] w-full text-sm">
          <thead>
            <tr className="border-b border-[color:var(--app-border)] bg-[color:var(--app-surface-strong)] text-xs uppercase tracking-[0.2em] text-[color:var(--app-text-muted)]">
              {['日期', '類型', '距離', '時間', '配速', '心率', '負荷'].map((h) => (
                <th key={h} className="whitespace-nowrap px-5 py-3 text-left font-medium">
                  {h}
                </th>
              ))}
              <th className="sticky right-0 z-10 bg-[color:var(--app-surface-strong)] px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {paginated.map((s) => (
              <tr
                key={s.id}
                onClick={() => navigate(`/sessions/${s.id}`)}
                className="cursor-pointer border-b border-[color:var(--app-border)]/70 transition-all duration-200 hover:bg-cyan-400/5"
              >
                <td className="whitespace-nowrap px-5 py-3 text-[color:var(--app-text-muted)]">{s.date}</td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-flex whitespace-nowrap items-center rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                      TYPE_COLORS[s.type] ?? 'border-[color:var(--app-border)] bg-[color:var(--app-surface)] text-[color:var(--app-text)]'
                    }`}
                  >
                    {TYPE_LABELS[s.type] ?? s.type}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-3 font-semibold text-[color:var(--app-text)]">{s.distanceKm} 公里</td>
                <td className="whitespace-nowrap px-5 py-3 text-[color:var(--app-text-muted)]">{s.durationMin} 分鐘</td>
                <td className="whitespace-nowrap px-5 py-3 text-[color:var(--app-text-muted)]">{s.avgPace}/公里</td>
                <td className="whitespace-nowrap px-5 py-3 text-[color:var(--app-text-muted)]">{s.heartRate} 次/分</td>
                <td className="whitespace-nowrap px-5 py-3 text-[color:var(--app-text-muted)]">{s.trainingLoad}</td>
                <td
                  className="sticky right-0 z-10 whitespace-nowrap bg-[color:var(--app-surface-strong)] px-5 py-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  {onDelete && (
                    <Button variant="danger" size="sm" onClick={() => onDelete(s.id)}>
                      刪除
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-[color:var(--app-border)]/50 md:hidden">
        {paginated.map((s) => (
          <Link
            key={s.id}
            to={`/sessions/${s.id}`}
            className="block space-y-2 px-5 py-4 transition-colors hover:bg-cyan-400/5"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full border border-[color:var(--app-border)] bg-[color:var(--app-surface)] px-2.5 py-1 text-xs font-semibold tracking-[0.2em] text-cyan-500">
                {s.date}
              </span>
              <span
                className={`rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                  TYPE_COLORS[s.type] ?? 'border-[color:var(--app-border)] bg-[color:var(--app-surface)] text-[color:var(--app-text)]'
                }`}
              >
                {TYPE_LABELS[s.type] ?? s.type}
              </span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <span className="font-semibold text-[color:var(--app-text)]">{s.distanceKm} 公里</span>
              <span className="text-[color:var(--app-text-muted)]">{s.durationMin} 分鐘</span>
              <span className="text-[color:var(--app-text-muted)]">{s.avgPace}/公里</span>
              <span className="text-[color:var(--app-text-muted)]">負荷 {s.trainingLoad}</span>
            </div>
            {s.note && <p className="truncate text-xs text-[color:var(--app-text-muted)]">{s.note}</p>}
          </Link>
        ))}
      </div>
    </Card>
  )
})
