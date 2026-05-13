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
  const color =
    pct < 50 ? 'bg-green-500' : pct < 75 ? 'bg-yellow-500' : 'bg-red-500'

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-300">Weekly Load</span>
        <span className="text-lg font-bold text-white">{weeklyLoad} <span className="text-xs text-gray-400">au</span></span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1.5">{pct.toFixed(0)}% of target</p>
    </Card>
  )
})
