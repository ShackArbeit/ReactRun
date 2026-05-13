import { memo, useCallback } from 'react'
import type { SessionType } from '@/features/sessions/types'

interface SessionFilterProps {
  typeFilter: SessionType | ''
  keyword: string
  sort: 'date' | 'distance' | 'trainingLoad'
  onTypeChange: (type: SessionType | '') => void
  onKeywordChange: (keyword: string) => void
  onSortChange: (sort: 'date' | 'distance' | 'trainingLoad') => void
}

const SESSION_TYPES: Array<{ value: SessionType | ''; label: string }> = [
  { value: '', label: '全部' },
  { value: 'easy', label: '輕鬆跑' },
  { value: 'tempo', label: '節奏跑' },
  { value: 'interval', label: '間歇跑' },
  { value: 'long', label: '長距離' },
  { value: 'recovery', label: '恢復跑' },
]

// Memoized because it receives callbacks from DashboardPage — prevents re-render on parent re-render
export const SessionFilter = memo(function SessionFilter({
  typeFilter,
  keyword,
  sort,
  onTypeChange,
  onKeywordChange,
  onSortChange,
}: SessionFilterProps) {
  const handleKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onKeywordChange(e.target.value),
    [onKeywordChange]
  )
  const handleSort = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      onSortChange(e.target.value as 'date' | 'distance' | 'trainingLoad'),
    [onSortChange]
  )

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex gap-1.5 flex-wrap">
        {SESSION_TYPES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onTypeChange(value)}
            className={`rounded-full px-3 py-1 text-sm font-semibold transition-colors ${
              typeFilter === value
                ? 'bg-slate-600 text-slate-100'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-slate-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <input
        type="search"
        placeholder="搜尋訓練紀錄..."
        value={keyword}
        onChange={handleKeyword}
        className="flex-1 min-w-40 rounded-lg bg-slate-800 border border-slate-700 px-3 py-1.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-slate-500"
      />

      <select
        value={sort}
        onChange={handleSort}
        className="rounded-lg bg-slate-800 border border-slate-700 px-3 py-1.5 text-sm text-slate-100 focus:outline-none focus:border-slate-500"
      >
        <option value="date">排序：日期</option>
        <option value="distance">排序：距離</option>
        <option value="trainingLoad">排序：訓練負荷</option>
      </select>
    </div>
  )
})
