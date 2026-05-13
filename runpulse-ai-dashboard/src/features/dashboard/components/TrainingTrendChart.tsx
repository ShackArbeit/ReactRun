import { memo, useMemo, useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import type { Session } from '@/features/sessions/types'
import { Card } from '@/shared/components/Card'

interface TrainingTrendChartProps {
  sessions: Session[]
}

// Memoized because chart option building from raw sessions is relatively expensive,
// and this component shouldn't re-render when unrelated state (e.g. filter inputs) changes.
export const TrainingTrendChart = memo(function TrainingTrendChart({
  sessions,
}: TrainingTrendChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  const option = useMemo(() => {
    // Sort chronologically for trend display
    const sorted = [...sessions].sort((a, b) => a.date.localeCompare(b.date))
    const dates = sorted.map((s) => s.date.slice(5))
    const distances = sorted.map((s) => s.distanceKm)
    const loads = sorted.map((s) => s.trainingLoad)

    return {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis', backgroundColor: '#1e293b', borderColor: '#475569', textStyle: { color: '#cbd5e1' } },
      legend: { data: ['距離（公里）', '訓練負荷'], textStyle: { color: '#94a3b8' }, top: 8 },
      grid: { left: 40, right: 20, top: 48, bottom: 32, containLabel: false },
      xAxis: {
        type: 'category',
        data: dates,
        axisLine: { lineStyle: { color: '#475569' } },
        axisLabel: { color: '#64748b', fontSize: 11 },
      },
      yAxis: [
        {
          type: 'value',
          name: '公里',
          nameTextStyle: { color: '#64748b' },
          axisLabel: { color: '#64748b', fontSize: 11 },
          splitLine: { lineStyle: { color: '#334155' } },
        },
        {
          type: 'value',
          name: '負荷',
          nameTextStyle: { color: '#64748b' },
          axisLabel: { color: '#64748b', fontSize: 11 },
          splitLine: { show: false },
        },
      ],
      series: [
        {
          name: '距離（公里）',
          type: 'bar',
          data: distances,
          itemStyle: { color: '#64748b', borderRadius: [4, 4, 0, 0] },
          barMaxWidth: 32,
        },
        {
          name: '訓練負荷',
          type: 'line',
          yAxisIndex: 1,
          data: loads,
          smooth: true,
          lineStyle: { color: '#475569', width: 2 },
          itemStyle: { color: '#475569' },
          areaStyle: { color: 'rgba(71,85,105,0.08)' },
          symbol: 'circle',
          symbolSize: 5,
        },
      ],
    }
  }, [sessions])

  useEffect(() => {
    if (!chartRef.current) return
    chartInstance.current = echarts.init(chartRef.current, null, { renderer: 'svg' })
    const ro = new ResizeObserver(() => chartInstance.current?.resize())
    ro.observe(chartRef.current)
    return () => {
      ro.disconnect()
      chartInstance.current?.dispose()
    }
  }, [])

  useEffect(() => {
    chartInstance.current?.setOption(option, true)
  }, [option])

  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-gray-300 mb-4">訓練趨勢</h3>
      <div ref={chartRef} style={{ height: 240, width: '100%' }} />
    </Card>
  )
})
