import { memo } from 'react'
import type { Summary } from '../types'
import { Card } from '@/shared/components/Card'

interface MetricCardProps {
  label: string
  value: string | number
  unit?: string
  icon: string
  accent: string
}

const MetricCard = memo(function MetricCard({ label, value, unit, icon, accent }: MetricCardProps) {
  return (
    <Card className="flex items-start gap-4 p-5">
      <div className={`rounded-xl p-2.5 text-xl ${accent}`}>{icon}</div>
      <div className="min-w-0">
        <p className="mb-1 text-xs text-[color:var(--app-text-muted)]">{label}</p>
        <p className="text-2xl font-bold text-[color:var(--app-text)]">
          {value}
          {unit && <span className="ml-1 text-sm font-normal text-[color:var(--app-text-muted)]">{unit}</span>}
        </p>
      </div>
    </Card>
  )
})

interface SummaryCardsProps {
  summary: Summary
}

export const SummaryCards = memo(function SummaryCards({ summary }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <MetricCard label="總距離" value={summary.totalDistanceKm} unit="公里" icon="🏁" accent="bg-cyan-500/15 text-cyan-300" />
      <MetricCard label="週訓練負荷" value={summary.weeklyLoad} unit="點" icon="⚡" accent="bg-fuchsia-500/15 text-fuchsia-300" />
      <MetricCard label="平均配速" value={summary.avgPace} unit="/公里" icon="⏱️" accent="bg-amber-500/15 text-amber-300" />
      <MetricCard label="恢復分數" value={summary.recoveryScore} unit="/100" icon="💤" accent="bg-emerald-500/15 text-emerald-300" />
    </div>
  )
})
