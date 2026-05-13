import { useParams, useNavigate } from 'react-router-dom'
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
  if (error) return <ErrorState message="找不到這筆訓練紀錄" onRetry={() => navigate('/')} />

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          ← 返回
        </Button>
        <h1 className="text-xl font-bold text-slate-100">訓練詳情</h1>
      </div>

      {session && (
        <Card className="p-6 space-y-4">
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
              <div key={label}>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-slate-100 font-medium">{value}</p>
              </div>
            ))}
          </div>
          {session.note && (
            <div className="pt-3 border-t border-slate-700">
              <p className="text-xs text-gray-500 mb-1">備註</p>
              <p className="text-gray-300 text-sm">{session.note}</p>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
