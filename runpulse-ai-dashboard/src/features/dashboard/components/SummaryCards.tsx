import { memo } from 'react'
import type { Summary } from '../types'
import { Card } from '@/shared/components/Card'

interface MetricCardProps {
  label: string
  value: string | number
  unit?: string
  icon: string
  color: string
}

const MetricCard = memo(function MetricCard({ label, value, unit, icon, color }: MetricCardProps) {
  return (
    <Card className="p-5 flex items-start gap-4">
      <div className={`rounded-lg p-2.5 text-xl ${color}`}>{icon}</div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400 mb-1">{label}</p>
        <p className="text-2xl font-bold text-white">
          {value}
          {unit && <span className="text-sm font-normal text-gray-400 ml-1">{unit}</span>}
        </p>
      </div>
    </Card>
  )
})

interface SummaryCardsProps {
  summary: Summary
}

// Memoized to prevent re-render when parent re-renders with same summary data
export const SummaryCards = memo(function SummaryCards({ summary }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        label="Total Distance"
        value={summary.totalDistanceKm}
        unit="km"
        icon="📏"
        color="bg-cyan-500/20"
      />
      <MetricCard
        label="Weekly Load"
        value={summary.weeklyLoad}
        unit="au"
        icon="⚡"
        color="bg-purple-500/20"
      />
      <MetricCard
        label="Avg Pace"
        value={summary.avgPace}
        unit="/km"
        icon="⏱"
        color="bg-green-500/20"
      />
      <MetricCard
        label="Recovery Score"
        value={summary.recoveryScore}
        unit="/100"
        icon="💚"
        color="bg-emerald-500/20"
      />
    </div>
  )
})
