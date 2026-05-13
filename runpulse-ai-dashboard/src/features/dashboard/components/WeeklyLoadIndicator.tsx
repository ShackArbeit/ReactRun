import { memo } from 'react'
import { Card } from '@/shared/components/Card'

interface WeeklyLoadIndicatorProps {
  weeklyLoad: number
  maxLoad?: number
}

export const WeeklyLoadIndicator = memo(function WeeklyLoadIndicator({
  weeklyLoad,
  maxLoad = 500,
}: WeeklyLoadIndicatorProps) {
  const pct = Math.min((weeklyLoad / maxLoad) * 100, 100)
  const color = pct < 50 ? 'bg-slate-500' : pct < 75 ? 'bg-slate-400' : 'bg-slate-300'

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-slate-300">週訓練負荷</span>
        <span className="text-lg font-bold text-slate-100">{weeklyLoad} <span className="text-xs text-slate-400">點</span></span>
      </div>
      <div className="h-2 rounded-full bg-slate-700">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-1.5 text-xs text-slate-500">達成本週目標 {pct.toFixed(0)}%</p>
    </Card>
  )
})
