import { memo, useEffect, useMemo, useReducer, useRef, type CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import { FixedSizeList, type ListChildComponentProps, type ListOnItemsRenderedProps } from 'react-window'
import type { Session } from '@/features/sessions/types'
import { Card } from '@/shared/components/Card'
import { Button } from '@/shared/components/Button'
import { BottomSpinner } from '@/shared/components/BottomSpinner'

const ROW_HEIGHT_DESKTOP = 52
const ROW_HEIGHT_MOBILE = 108
const LIST_HEIGHT = 520
const INITIAL_BATCH_SIZE = 12
const LOAD_MORE_BATCH_SIZE = 4
const LOADING_PLACEHOLDER_ROWS = 3
const LOAD_MORE_THRESHOLD = 3
const LOAD_MORE_DELAY_MS = 520
const REVEAL_STAGGER_MS = 55
const REVEAL_RESET_MS = 520
const ROW_REVEAL_STEP_MS = 92
const DESKTOP_GRID_TEMPLATE =
  'minmax(140px, 1.35fr) minmax(92px, 0.95fr) minmax(88px, 0.9fr) minmax(88px, 0.9fr) minmax(96px, 1fr) minmax(92px, 0.95fr) minmax(86px, 0.85fr) minmax(112px, 0.9fr)'

const COLS = [
  { label: '日期' },
  { label: '類型' },
  { label: '距離' },
  { label: '時間' },
  { label: '配速' },
  { label: '心率' },
  { label: '負荷' },
  { label: '刪除' },
] as const

const TYPE_COLORS: Record<string, string> = {
  easy: 'text-sky-100 bg-sky-500/20 border-sky-400/30',
  tempo: 'text-amber-100 bg-amber-500/20 border-amber-400/30',
  interval: 'text-rose-100 bg-rose-500/20 border-rose-400/30',
  long: 'text-indigo-100 bg-indigo-500/20 border-indigo-400/30',
  recovery: 'text-emerald-100 bg-emerald-500/20 border-emerald-400/30',
}

const TYPE_LABELS: Record<string, string> = {
  easy: '輕鬆跑',
  tempo: '節奏跑',
  interval: '間歇跑',
  long: '長距離',
  recovery: '恢復跑',
}

interface RowData {
  sessions: Session[]
  navigate: (path: string) => void
  onDelete?: (id: string) => void
  revealRange: { start: number; end: number } | null
}

type TableState = {
  visibleCount: number
  loadingMore: boolean
  loadCompleteMessage: string | null
  revealRange: { start: number; end: number } | null
}

type TableAction =
  | { type: 'RESET'; count: number }
  | { type: 'START_LOADING' }
  | { type: 'REVEAL_STEP'; count: number }
  | { type: 'REVEAL_COMPLETE'; start: number; end: number }
  | { type: 'CLEAR_REVEAL' }
  | { type: 'LOAD_COMPLETE'; message: string }
  | { type: 'CLEAR_MESSAGE' }

function tableReducer(state: TableState, action: TableAction): TableState {
  switch (action.type) {
    case 'RESET':
      return { visibleCount: action.count, loadingMore: false, loadCompleteMessage: null, revealRange: null }
    case 'START_LOADING':
      return { ...state, loadingMore: true }
    case 'REVEAL_STEP':
      return { ...state, visibleCount: action.count }
    case 'REVEAL_COMPLETE':
      return { ...state, loadingMore: false, revealRange: { start: action.start, end: action.end } }
    case 'CLEAR_REVEAL':
      return { ...state, revealRange: null }
    case 'LOAD_COMPLETE':
      return { ...state, loadCompleteMessage: action.message }
    case 'CLEAR_MESSAGE':
      return { ...state, loadCompleteMessage: null }
  }
}

function Shimmer({ className }: { className: string }) {
  return <div className={`shimmer-card ${className}`} aria-hidden="true" />
}

function LoadingDesktopRow({ style }: { style: CSSProperties }) {
  return (
    <div
      style={{ ...style, gridTemplateColumns: DESKTOP_GRID_TEMPLATE }}
      className="grid w-full items-center gap-y-1 border-b border-[color:var(--app-border)]/70 bg-[color:var(--app-surface)]/40 px-4 py-2"
      aria-hidden="true"
    >
      <div className="min-w-0">
        <Shimmer className="h-3.5 w-24 rounded-full" />
      </div>
      <div className="min-w-0">
        <Shimmer className="h-5 w-16 rounded-full" />
      </div>
      <div className="min-w-0">
        <Shimmer className="h-3.5 w-14 rounded-full" />
      </div>
      <div className="min-w-0">
        <Shimmer className="h-3.5 w-12 rounded-full" />
      </div>
      <div className="min-w-0">
        <Shimmer className="h-3.5 w-14 rounded-full" />
      </div>
      <div className="min-w-0">
        <Shimmer className="h-3.5 w-12 rounded-full" />
      </div>
      <div className="min-w-0">
        <Shimmer className="h-3.5 w-10 rounded-full" />
      </div>
      <div className="min-w-0">
        <Shimmer className="h-7 w-16 rounded-full" />
      </div>
    </div>
  )
}

function LoadingMobileRow({ style }: { style: CSSProperties }) {
  return (
    <div
      style={style}
      className="border-b border-[color:var(--app-border)]/50 px-5 py-4"
      aria-hidden="true"
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <Shimmer className="h-6 w-28 rounded-full" />
        <Shimmer className="h-6 w-20 rounded-full" />
      </div>
      <div className="mb-2 flex flex-wrap gap-3">
        <Shimmer className="h-4 w-16 rounded-full" />
        <Shimmer className="h-4 w-14 rounded-full" />
        <Shimmer className="h-4 w-18 rounded-full" />
        <Shimmer className="h-4 w-20 rounded-full" />
      </div>
      <Shimmer className="h-3 w-5/6 rounded-full" />
    </div>
  )
}

const DesktopRow = memo(function DesktopRow({
  index,
  style,
  isScrolling,
  data,
}: ListChildComponentProps<RowData>) {
  const { sessions, navigate, onDelete, revealRange } = data
  const s = sessions[index]

  if (isScrolling || !s) {
    return <LoadingDesktopRow style={style} />
  }

  const entering = revealRange !== null && index >= revealRange.start && index < revealRange.end
  const rowStyle = entering
    ? {
        ...style,
        gridTemplateColumns: DESKTOP_GRID_TEMPLATE,
        animationDelay: `${(index - revealRange.start) * REVEAL_STAGGER_MS}ms`,
      }
    : { ...style, gridTemplateColumns: DESKTOP_GRID_TEMPLATE }

  return (
    <div
      className={`grid w-full cursor-pointer items-center border-b border-[color:var(--app-border)]/70 transition-all duration-200 hover:bg-cyan-400/5 ${
        entering ? 'session-row-enter' : ''
      }`}
      style={rowStyle}
      onClick={() => navigate(`/sessions/${s.id}`)}
    >
      <div className="min-w-0 px-4 text-sm whitespace-nowrap text-[color:var(--app-text-muted)]">
        {s.date}
      </div>
      <div className="min-w-0 px-2">
        <span
          className={`inline-flex items-center whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.15em] ${
            TYPE_COLORS[s.type] ?? 'border-[color:var(--app-border)] bg-[color:var(--app-surface)] text-[color:var(--app-text)]'
          }`}
        >
          {TYPE_LABELS[s.type] ?? s.type}
        </span>
      </div>
      <div className="min-w-0 px-2 text-sm font-semibold whitespace-nowrap text-[color:var(--app-text)]">
        {s.distanceKm} km
      </div>
      <div className="min-w-0 px-2 text-sm whitespace-nowrap text-[color:var(--app-text-muted)]">
        {s.durationMin} min
      </div>
      <div className="min-w-0 px-2 text-sm whitespace-nowrap text-[color:var(--app-text-muted)]">
        {s.avgPace}/km
      </div>
      <div className="min-w-0 px-2 text-sm whitespace-nowrap text-[color:var(--app-text-muted)]">
        {s.heartRate} bpm
      </div>
      <div className="min-w-0 px-2 text-sm whitespace-nowrap text-[color:var(--app-text-muted)]">
        {s.trainingLoad}
      </div>
      <div
        className="min-w-0 px-2"
        onClick={(e) => e.stopPropagation()}
      >
        {onDelete && (
          <Button variant="danger" size="sm" onClick={() => onDelete(s.id)}>
            刪除
          </Button>
        )}
      </div>
    </div>
  )
})

const MobileRow = memo(function MobileRow({
  index,
  style,
  isScrolling,
  data,
}: ListChildComponentProps<RowData>) {
  const { sessions, navigate, revealRange } = data
  const s = sessions[index]

  if (isScrolling || !s) {
    return <LoadingMobileRow style={style} />
  }

  const entering = revealRange !== null && index >= revealRange.start && index < revealRange.end

  return (
    <div
      style={style}
      className={`block cursor-pointer border-b border-[color:var(--app-border)]/50 px-5 py-4 transition-colors hover:bg-cyan-400/5 ${
        entering ? 'session-row-enter' : ''
      }`}
      onClick={() => navigate(`/sessions/${s.id}`)}
    >
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <span className="rounded-full border border-[color:var(--app-border)] bg-[color:var(--app-surface)] px-2.5 py-1 text-xs font-semibold tracking-[0.2em] text-cyan-500">
          {s.date}
        </span>
        <span
          className={`rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
            TYPE_COLORS[s.type] ?? 'border-[color:var(--app-border)] bg-[color:var(--app-surface)] text-[color:var(--app-text)]'
          }`}
        >
          {TYPE_LABELS[s.type] ?? s.type}
        </span>
      </div>
      <div className="mb-1 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        <span className="font-semibold text-[color:var(--app-text)]">{s.distanceKm} km</span>
        <span className="text-[color:var(--app-text-muted)]">{s.durationMin} min</span>
        <span className="text-[color:var(--app-text-muted)]">{s.avgPace}/km</span>
        <span className="text-[color:var(--app-text-muted)]">負荷 {s.trainingLoad}</span>
      </div>
      {s.note && <p className="truncate text-xs text-[color:var(--app-text-muted)]">{s.note}</p>}
    </div>
  )
})

interface SessionTableProps {
  sessions: Session[]
  onDelete?: (id: string) => void
}

export const SessionTable = memo(function SessionTable({ sessions, onDelete }: SessionTableProps) {
  const navigate = useNavigate()
  const [{ visibleCount, loadingMore, loadCompleteMessage, revealRange }, dispatch] = useReducer(
    tableReducer,
    {
      visibleCount: Math.min(INITIAL_BATCH_SIZE, sessions.length),
      loadingMore: false,
      loadCompleteMessage: null,
      revealRange: null,
    }
  )
  const loadTimerRef = useRef<number | null>(null)
  const revealTimerRef = useRef<number | null>(null)
  const revealStepTimerRef = useRef<number | null>(null)
  const noticeTimerRef = useRef<number | null>(null)
  const loadingRef = useRef(false)

  const itemData = useMemo<RowData>(
    () => ({ sessions, navigate, onDelete, revealRange }),
    [sessions, navigate, onDelete, revealRange]
  )

  useEffect(() => {
    dispatch({ type: 'RESET', count: Math.min(INITIAL_BATCH_SIZE, sessions.length) })
    loadingRef.current = false

    if (loadTimerRef.current !== null) {
      window.clearTimeout(loadTimerRef.current)
      loadTimerRef.current = null
    }
    if (revealTimerRef.current !== null) {
      window.clearTimeout(revealTimerRef.current)
      revealTimerRef.current = null
    }
    if (revealStepTimerRef.current !== null) {
      window.clearTimeout(revealStepTimerRef.current)
      revealStepTimerRef.current = null
    }
    if (noticeTimerRef.current !== null) {
      window.clearTimeout(noticeTimerRef.current)
      noticeTimerRef.current = null
    }
  }, [sessions])

  useEffect(() => {
    return () => {
      if (loadTimerRef.current !== null) {
        window.clearTimeout(loadTimerRef.current)
      }
      if (revealTimerRef.current !== null) {
        window.clearTimeout(revealTimerRef.current)
      }
      if (revealStepTimerRef.current !== null) {
        window.clearTimeout(revealStepTimerRef.current)
      }
      if (noticeTimerRef.current !== null) {
        window.clearTimeout(noticeTimerRef.current)
      }
    }
  }, [])

  const visibleSessions = sessions.slice(0, visibleCount)
  const hasMore = visibleCount < sessions.length
  const itemCount = visibleSessions.length + (hasMore ? LOADING_PLACEHOLDER_ROWS : 0)

  const revealRowsOneByOne = (startCount: number, targetCount: number) => {
    let nextCount = startCount

    const step = () => {
      nextCount += 1
      dispatch({ type: 'REVEAL_STEP', count: nextCount })

      if (nextCount < targetCount) {
        revealStepTimerRef.current = window.setTimeout(step, ROW_REVEAL_STEP_MS)
        return
      }

      dispatch({ type: 'REVEAL_COMPLETE', start: startCount, end: targetCount })
      if (revealTimerRef.current !== null) {
        window.clearTimeout(revealTimerRef.current)
      }
      revealTimerRef.current = window.setTimeout(() => {
        dispatch({ type: 'CLEAR_REVEAL' })
        revealTimerRef.current = null
      }, REVEAL_RESET_MS)

      loadingRef.current = false
      loadTimerRef.current = null
      dispatch({ type: 'LOAD_COMPLETE', message: `已載入 ${targetCount - startCount} 筆新資料` })
      if (noticeTimerRef.current !== null) {
        window.clearTimeout(noticeTimerRef.current)
      }
      noticeTimerRef.current = window.setTimeout(() => {
        dispatch({ type: 'CLEAR_MESSAGE' })
        noticeTimerRef.current = null
      }, 1800)
    }

    revealStepTimerRef.current = window.setTimeout(step, ROW_REVEAL_STEP_MS)
  }

  const handleItemsRendered = ({ visibleStopIndex }: ListOnItemsRenderedProps) => {
    if (!hasMore || loadingRef.current) return
    if (visibleStopIndex < visibleSessions.length - LOAD_MORE_THRESHOLD) return

    loadingRef.current = true
    dispatch({ type: 'START_LOADING' })

    loadTimerRef.current = window.setTimeout(() => {
      const startCount = visibleCount
      const targetCount = Math.min(startCount + LOAD_MORE_BATCH_SIZE, sessions.length)
      revealRowsOneByOne(startCount, targetCount)
      loadTimerRef.current = null
    }, LOAD_MORE_DELAY_MS)
  }

  return (
    <Card className="w-full overflow-hidden border-[color:var(--app-border)]">
      <div className="flex items-center justify-between border-b border-[color:var(--app-border)] bg-[color:var(--app-surface-strong)] px-5 py-4">
        <h3 className="text-sm font-semibold text-[color:var(--app-text)]">
          跑步紀錄
          <span className="font-normal text-[color:var(--app-text-muted)]"> ({sessions.length})</span>
        </h3>
        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
          react-window loading
        </span>
      </div>

      {loadCompleteMessage && (
        <div className="border-b border-[color:var(--app-border)] bg-cyan-400/10 px-5 py-2 text-xs font-semibold tracking-[0.16em] text-cyan-300 session-row-enter">
          {loadCompleteMessage}
        </div>
      )}

      <div className="hidden md:block">
        <div
          className="grid w-full border-b border-[color:var(--app-border)] bg-[color:var(--app-surface-strong)] text-xs uppercase tracking-[0.2em] text-[color:var(--app-text-muted)]"
          style={{ gridTemplateColumns: DESKTOP_GRID_TEMPLATE }}
        >
          {COLS.map((col) => (
            <div key={col.label} className="min-w-0 px-4 py-3 font-medium">
              {col.label}
            </div>
          ))}
        </div>

        <FixedSizeList
          height={LIST_HEIGHT}
          width="100%"
          itemCount={itemCount}
          itemSize={ROW_HEIGHT_DESKTOP}
          itemData={itemData}
          useIsScrolling
          overscanCount={5}
          onItemsRendered={handleItemsRendered}
        >
          {DesktopRow}
        </FixedSizeList>
      </div>

      <div className="md:hidden">
        <FixedSizeList
          height={LIST_HEIGHT}
          width="100%"
          itemCount={itemCount}
          itemSize={ROW_HEIGHT_MOBILE}
          itemData={itemData}
          useIsScrolling
          overscanCount={3}
          onItemsRendered={handleItemsRendered}
        >
          {MobileRow}
        </FixedSizeList>
      </div>

      <BottomSpinner visible={loadingMore} label="LOADING MORE" />
    </Card>
  )
})
