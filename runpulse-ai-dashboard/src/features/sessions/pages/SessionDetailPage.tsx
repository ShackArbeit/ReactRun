import { useNavigate, useParams } from 'react-router-dom'
import { useSessionDetailQuery } from '../hooks/useSessionsQuery'
import { Card } from '@/shared/components/Card'
import { Button } from '@/shared/components/Button'
import { SkeletonCard } from '@/shared/components/Skeleton'
import { ErrorState } from '@/shared/components/ErrorState'

const TYPE_LABELS: Record<string, string> = {
  easy: '輕鬆跑',
  tempo: '節奏跑',
  interval: '間歇跑',
  long: '長距離',
  recovery: '恢復跑',
}

export default function SessionDetailPage() {
  const { id = '' } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: session, isLoading, error } = useSessionDetailQuery(id)

  if (isLoading) return <SkeletonCard />
  if (error) return <ErrorState message="訓練紀錄載入失敗" onRetry={() => navigate('/')} />

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          返回
        </Button>
        <h1 className="text-xl font-bold text-[color:var(--app-text)]">訓練詳情</h1>
      </div>

      {session && (
        <Card className="space-y-5 p-6">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: '日期', value: session.date },
              { label: '類型', value: TYPE_LABELS[session.type] ?? session.type },
              { label: '距離', value: `${session.distanceKm} 公里` },
              { label: '時間', value: `${session.durationMin} 分鐘` },
              { label: '平均配速', value: `${session.avgPace}/公里` },
              { label: '心率', value: `${session.heartRate} 次/分` },
              { label: '訓練負荷', value: session.trainingLoad },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl border border-[color:var(--app-border)] bg-[color:var(--app-surface-strong)] px-4 py-3 shadow-inner shadow-cyan-400/5"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--app-text-muted)]">
                  {label}
                </p>
                <p className="mt-1 font-semibold text-[color:var(--app-text)]">{value}</p>
              </div>
            ))}
          </div>

          {session.note && (
            <div className="rounded-xl border border-fuchsia-400/15 bg-gradient-to-r from-fuchsia-500/10 via-transparent to-cyan-500/10 p-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--app-text-muted)]">
                備註
              </p>
              <p className="text-sm leading-6 text-[color:var(--app-text-muted)]">{session.note}</p>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
