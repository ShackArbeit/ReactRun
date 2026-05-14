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
  { value: '', label: '全部類型' },
  { value: 'easy', label: '輕鬆跑' },
  { value: 'tempo', label: '節奏跑' },
  { value: 'interval', label: '間歇跑' },
  { value: 'long', label: '長距離' },
  { value: 'recovery', label: '恢復跑' },
]

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
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[color:var(--app-border)] bg-[color:var(--app-surface)] p-3 shadow-[var(--app-shadow)]">
      <div className="flex flex-wrap gap-2">
        {SESSION_TYPES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onTypeChange(value)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold tracking-wide transition-all duration-200 ${
              typeFilter === value
                ? 'border-cyan-300/50 bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/20'
                : 'border-[color:var(--app-border)] bg-[color:var(--app-surface-strong)] text-[color:var(--app-text-muted)] hover:border-cyan-300/40 hover:bg-cyan-400/10 hover:text-[color:var(--app-text)]'
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
        className="min-w-44 flex-1 rounded-xl border border-[color:var(--app-border)] bg-[color:var(--app-input-bg)] px-4 py-2 text-sm text-[color:var(--app-text)] placeholder:text-[color:var(--app-text-muted)] outline-none transition-all focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
      />

      <select
        value={sort}
        onChange={handleSort}
        className="rounded-xl border border-[color:var(--app-border)] bg-[color:var(--app-input-bg)] px-4 py-2 text-sm text-[color:var(--app-text)] outline-none transition-all focus:border-fuchsia-400/60 focus:ring-2 focus:ring-fuchsia-400/20"
      >
        <option value="date">依日期排序</option>
        <option value="distance">依距離排序</option>
        <option value="trainingLoad">依訓練負荷排序</option>
      </select>
    </div>
  )
})
