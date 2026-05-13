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
      tooltip: { trigger: 'axis', backgroundColor: '#1e293b', borderColor: '#334155', textStyle: { color: '#cbd5e1' } },
      legend: { data: ['Distance (km)', 'Training Load'], textStyle: { color: '#94a3b8' }, top: 8 },
      grid: { left: 40, right: 20, top: 48, bottom: 32, containLabel: false },
      xAxis: {
        type: 'category',
        data: dates,
        axisLine: { lineStyle: { color: '#334155' } },
        axisLabel: { color: '#64748b', fontSize: 11 },
      },
      yAxis: [
        {
          type: 'value',
          name: 'km',
          nameTextStyle: { color: '#64748b' },
          axisLabel: { color: '#64748b', fontSize: 11 },
          splitLine: { lineStyle: { color: '#1e293b' } },
        },
        {
          type: 'value',
          name: 'load',
          nameTextStyle: { color: '#64748b' },
          axisLabel: { color: '#64748b', fontSize: 11 },
          splitLine: { show: false },
        },
      ],
      series: [
        {
          name: 'Distance (km)',
          type: 'bar',
          data: distances,
          itemStyle: { color: '#06b6d4', borderRadius: [4, 4, 0, 0] },
          barMaxWidth: 32,
        },
        {
          name: 'Training Load',
          type: 'line',
          yAxisIndex: 1,
          data: loads,
          smooth: true,
          lineStyle: { color: '#a855f7', width: 2 },
          itemStyle: { color: '#a855f7' },
          areaStyle: { color: 'rgba(168,85,247,0.08)' },
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
      <h3 className="text-sm font-semibold text-gray-300 mb-4">Training Trend</h3>
      <div ref={chartRef} style={{ height: 240, width: '100%' }} />
    </Card>
  )
})
