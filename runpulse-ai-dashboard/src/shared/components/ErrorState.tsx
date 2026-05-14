interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export function ErrorState({ message = '發生錯誤', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-rose-400/15 bg-[color:var(--app-surface)] py-16 text-center">
      <div className="text-4xl">⚠️</div>
      <p className="font-medium text-rose-400">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-xl border border-rose-400/20 bg-rose-500/15 px-4 py-2 text-sm text-rose-700 transition-all hover:bg-rose-500/25 hover:text-rose-900"
        >
          重新整理
        </button>
      )}
    </div>
  )
}
