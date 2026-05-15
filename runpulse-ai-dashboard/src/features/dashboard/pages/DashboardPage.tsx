import { useState, useCallback } from 'react'
// 一開始載入畫面時跑步總結的 Tank Query Hook
import { useSummaryQuery } from '../hooks/useSummaryQuery'
// 有關 Sessions & 刪除 Sessions 的 Tank Query Hook
import { useSessionsQuery, useDeleteSessionMutation } from '@/features/sessions/hooks/useSessionsQuery'
// Zustand 中有關 Global State 的 Hook
import { useUiStore } from '@/shared/store/uiStore'
import { SummaryCards } from '../components/SummaryCards'
import { TrainingTrendChart } from '../components/TrainingTrendChart'
import { SessionFilter } from '../components/SessionFilter'
import { SessionTable } from '../components/SessionTable'
import { SkeletonCard } from '@/shared/components/Skeleton'
import { ErrorState } from '@/shared/components/ErrorState'
import { EmptyState } from '@/shared/components/EmptyState'
import type { SessionType } from '@/features/sessions/types'

export default function DashboardPage() {
  const sessionTypeFilter = useUiStore((s) => s.sessionTypeFilter)
  const setSessionTypeFilter = useUiStore((s) => s.setSessionTypeFilter)

  const [keyword, setKeyword] = useState('')
  const [sort, setSort] = useState<'date' | 'distance' | 'trainingLoad'>('date')

  const { data: summary, isLoading: summaryLoading, error: summaryError, refetch: refetchSummary } = useSummaryQuery()
  const { data: sessions = [], isLoading: sessionsLoading, error: sessionsError, refetch: refetchSessions } =
    useSessionsQuery({ type: sessionTypeFilter, keyword, sort })
  const deleteMutation = useDeleteSessionMutation()

  const handleTypeChange = useCallback(
    (type: SessionType | '') => setSessionTypeFilter(type),
    [setSessionTypeFilter]
  )
  const handleKeywordChange = useCallback((kw: string) => setKeyword(kw), [])
  const handleSortChange = useCallback((s: 'date' | 'distance' | 'trainingLoad') => setSort(s), [])
  const handleDelete = useCallback((id: string) => deleteMutation.mutate(id), [deleteMutation])

  return (
    <div className="space-y-6">
      {summaryLoading && (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}
      {summaryError && <ErrorState message="摘要資料載入失敗" onRetry={() => void refetchSummary()} />}
      {summary && <SummaryCards summary={summary} />}

      {sessionsLoading ? <SkeletonCard /> : sessions.length > 0 ? <TrainingTrendChart sessions={sessions} /> : null}

      <div className="space-y-3">
        <SessionFilter
          typeFilter={sessionTypeFilter}
          keyword={keyword}
          sort={sort}
          onTypeChange={handleTypeChange}
          onKeywordChange={handleKeywordChange}
          onSortChange={handleSortChange}
        />

        {sessionsLoading && <SkeletonCard />}
        {sessionsError && <ErrorState message="訓練紀錄載入失敗" onRetry={() => void refetchSessions()} />}
        {!sessionsLoading && !sessionsError && sessions.length === 0 && (
          <EmptyState message="目前沒有符合條件的訓練紀錄" />
        )}
        {!sessionsLoading && sessions.length > 0 && (
          <SessionTable sessions={sessions} onDelete={handleDelete} />
        )}
      </div>
    </div>
  )
}
