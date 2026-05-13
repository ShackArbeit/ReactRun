interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export function ErrorState({ message = '發生錯誤', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="text-4xl">⚠️</div>
      <p className="text-red-400 font-medium">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-100 hover:bg-slate-700 transition-colors"
        >
          重試
        </button>
      )}
    </div>
  )
}
