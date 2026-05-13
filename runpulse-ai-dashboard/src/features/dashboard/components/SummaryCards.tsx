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
        <p className="text-2xl font-bold text-slate-100">
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
        label="總距離"
        value={summary.totalDistanceKm}
        unit="公里"
        icon="📏"
        color="bg-slate-700 text-slate-200"
      />
      <MetricCard
        label="週訓練負荷"
        value={summary.weeklyLoad}
        unit="點"
        icon="⚡"
        color="bg-slate-700 text-slate-200"
      />
      <MetricCard
        label="平均配速"
        value={summary.avgPace}
        unit="/公里"
        icon="⏱"
        color="bg-slate-700 text-slate-200"
      />
      <MetricCard
        label="恢復分數"
        value={summary.recoveryScore}
        unit="/100"
        icon="💚"
        color="bg-slate-700 text-slate-200"
      />
    </div>
  )
})
