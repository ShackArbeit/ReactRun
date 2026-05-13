import { useState, useCallback } from 'react'
import { useSummaryQuery } from '../hooks/useSummaryQuery'
import { useSessionsQuery, useDeleteSessionMutation } from '@/features/sessions/hooks/useSessionsQuery'
import { useUiStore } from '@/shared/store/uiStore'
import { SummaryCards } from '../components/SummaryCards'
import { TrainingTrendChart } from '../components/TrainingTrendChart'
import { SessionFilter } from '../components/SessionFilter'
import { SessionTable } from '../components/SessionTable'
import { AiSuggestionCard } from '../components/AiSuggestionCard'
import { WeeklyLoadIndicator } from '../components/WeeklyLoadIndicator'
import { PerformancePanel } from '../components/PerformancePanel'
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
      {/* Summary metrics */}
      {summaryLoading && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}
      {summaryError && (
        <ErrorState message="Failed to load summary" onRetry={() => void refetchSummary()} />
      )}
      {summary && <SummaryCards summary={summary} />}

      {/* AI suggestion + weekly load */}
      {summary && (
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <AiSuggestionCard
              suggestion={summary.aiSuggestion}
              fatigueLevel={summary.fatigueLevel}
            />
          </div>
          <WeeklyLoadIndicator weeklyLoad={summary.weeklyLoad} />
        </div>
      )}

      {/* Training trend chart */}
      {sessionsLoading ? (
        <SkeletonCard />
      ) : sessions.length > 0 ? (
        <TrainingTrendChart sessions={sessions} />
      ) : null}

      {/* Sessions */}
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
        {sessionsError && (
          <ErrorState message="Failed to load sessions" onRetry={() => void refetchSessions()} />
        )}
        {!sessionsLoading && !sessionsError && sessions.length === 0 && (
          <EmptyState message="No sessions match your filters" />
        )}
        {!sessionsLoading && sessions.length > 0 && (
          <SessionTable sessions={sessions} onDelete={handleDelete} />
        )}
      </div>

      {/* Performance panel */}
      <PerformancePanel />
    </div>
  )
}
