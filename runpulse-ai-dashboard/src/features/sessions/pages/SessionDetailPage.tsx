import { useParams, useNavigate } from 'react-router-dom'
import { useSessionDetailQuery } from '../hooks/useSessionsQuery'
import { Card } from '@/shared/components/Card'
import { Button } from '@/shared/components/Button'
import { SkeletonCard } from '@/shared/components/Skeleton'
import { ErrorState } from '@/shared/components/ErrorState'

export default function SessionDetailPage() {
  const { id = '' } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: session, isLoading, error } = useSessionDetailQuery(id)

  if (isLoading) return <SkeletonCard />
  if (error) return <ErrorState message="Session not found" onRetry={() => navigate('/')} />

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          ← Back
        </Button>
        <h1 className="text-xl font-bold text-white">Session Detail</h1>
      </div>

      {session && (
        <Card className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Date', value: session.date },
              { label: 'Type', value: session.type },
              { label: 'Distance', value: `${session.distanceKm} km` },
              { label: 'Duration', value: `${session.durationMin} min` },
              { label: 'Avg Pace', value: `${session.avgPace}/km` },
              { label: 'Heart Rate', value: `${session.heartRate} bpm` },
              { label: 'Training Load', value: session.trainingLoad },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-white font-medium">{value}</p>
              </div>
            ))}
          </div>
          {session.note && (
            <div className="pt-3 border-t border-white/10">
              <p className="text-xs text-gray-500 mb-1">Notes</p>
              <p className="text-gray-300 text-sm">{session.note}</p>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
