import { memo } from 'react'
import { Card } from '@/shared/components/Card'

interface WebVital {
  name: string
  value: string
  score: 'good' | 'needs-improvement' | 'poor'
  description: string
}

const MOCK_VITALS: WebVital[] = [
  { name: '最大內容繪製', value: '1.2 秒', score: 'good', description: '主要內容載入速度' },
  { name: '版面穩定度', value: '0.03', score: 'good', description: '載入前後位移幅度' },
  { name: '互動延遲', value: '82 毫秒', score: 'good', description: '操作後畫面回應速度' },
]

const scoreColor = { good: 'text-slate-200', 'needs-improvement': 'text-slate-300', poor: 'text-slate-100' }
const scoreBg = { good: 'bg-slate-700', 'needs-improvement': 'bg-slate-700', poor: 'bg-slate-700' }

const STRATEGIES = [
  { icon: '⚡', label: '路由層級程式碼分割', detail: '按頁面延遲載入' },
  { icon: '🧠', label: '圖表資料快取', detail: '避免重複建立圖表設定' },
  { icon: '♻️', label: '樂觀更新', detail: '失敗時回復快取資料' },
  { icon: '📦', label: '伺服器狀態快取', detail: '降低重複請求' },
  { icon: '📋', label: '分頁列表', detail: '每頁 10 筆資料' },
]

export const PerformancePanel = memo(function PerformancePanel() {
  return (
    <Card className="p-5 space-y-5">
      <h3 className="text-sm font-semibold text-gray-300">效能展示</h3>

      <div>
        <p className="mb-2 text-xs text-gray-500">核心網頁指標（模擬）</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {MOCK_VITALS.map((v) => (
            <div key={v.name} className={`rounded-md border border-slate-700 p-3 text-center ${scoreBg[v.score]}`}>
              <p className={`text-xl font-bold ${scoreColor[v.score]}`}>{v.value}</p>
              <p className="text-xs font-semibold text-slate-100 mt-0.5">{v.name}</p>
              <p className="text-xs text-gray-500">{v.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-gray-500 mb-2">優化策略</p>
        <ul className="space-y-2">
          {STRATEGIES.map((s) => (
            <li key={s.label} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              <span className="text-slate-400">{s.icon}</span>
              <span className="font-medium text-slate-300">{s.label}</span>
              <span className="text-gray-500 text-xs sm:ml-auto">{s.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
})
