import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import type { Session } from '@/features/sessions/types'
import { Card } from '@/shared/components/Card'
import { useUiStore } from '@/shared/store/uiStore'

interface TrainingTrendChartProps {
  sessions: Session[]
}

function buildOption(sessions: Session[], themeMode: 'dark' | 'light') {
  const sorted = [...sessions].sort((a, b) => a.date.localeCompare(b.date))
  const dates = sorted.map((s) => s.date.slice(5))
  const distances = sorted.map((s) => s.distanceKm)
  const loads = sorted.map((s) => s.trainingLoad)
  const isLight = themeMode === 'light'

  return {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: isLight ? '#ffffff' : '#1e293b',
      borderColor: isLight ? '#cbd5e1' : '#475569',
      textStyle: { color: isLight ? '#0f172a' : '#cbd5e1' },
    },
    legend: {
      data: ['距離（公里）', '訓練負荷'],
      textStyle: { color: isLight ? '#475569' : '#94a3b8' },
      top: 8,
    },
    grid: { left: 40, right: 20, top: 48, bottom: 32, containLabel: false },
    xAxis: {
      type: 'category',
      data: dates,
      axisLine: { lineStyle: { color: isLight ? '#cbd5e1' : '#475569' } },
      axisLabel: { color: '#64748b', fontSize: 11 },
    },
    yAxis: [
      {
        type: 'value',
        name: '公里',
        nameTextStyle: { color: '#64748b' },
        axisLabel: { color: '#64748b', fontSize: 11 },
        splitLine: { lineStyle: { color: isLight ? '#e2e8f0' : '#334155' } },
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
        itemStyle: {
          color: '#38bdf8',
          borderRadius: [6, 6, 0, 0],
          shadowColor: 'rgba(56,189,248,0.35)',
          shadowBlur: 10,
        },
        emphasis: {
          focus: 'self',
          scale: true,
          itemStyle: {
            color: '#f97316',
            shadowColor: 'rgba(249,115,22,0.45)',
            shadowBlur: 16,
          },
        },
        blur: {
          itemStyle: {
            opacity: 0.45,
          },
        },
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
}

export function TrainingTrendChart({ sessions }: TrainingTrendChartProps) {
  "use memo"

  const themeMode = useUiStore((s) => s.themeMode)
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

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
    chartInstance.current?.setOption(buildOption(sessions, themeMode), true)
  }, [sessions, themeMode])

  return (
    <Card className="p-5">
      <h3 className="mb-4 text-sm font-semibold text-[color:var(--app-text)]">訓練趨勢</h3>
      <div ref={chartRef} style={{ height: 240, width: '100%' }} />
    </Card>
  )
}
