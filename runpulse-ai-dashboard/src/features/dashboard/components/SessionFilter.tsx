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
  { value: '', label: 'All' },
  { value: 'easy', label: 'Easy' },
  { value: 'tempo', label: 'Tempo' },
  { value: 'interval', label: 'Interval' },
  { value: 'long', label: 'Long' },
  { value: 'recovery', label: 'Recovery' },
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
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              typeFilter === value
                ? 'bg-cyan-500 text-white'
                : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <input
        type="search"
        placeholder="Search sessions..."
        value={keyword}
        onChange={handleKeyword}
        className="flex-1 min-w-40 rounded-lg bg-white/10 border border-white/10 px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
      />

      <select
        value={sort}
        onChange={handleSort}
        className="rounded-lg bg-white/10 border border-white/10 px-3 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-500"
      >
        <option value="date">Sort: Date</option>
        <option value="distance">Sort: Distance</option>
        <option value="trainingLoad">Sort: Load</option>
      </select>
    </div>
  )
})
