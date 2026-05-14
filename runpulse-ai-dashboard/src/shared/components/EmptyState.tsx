interface EmptyStateProps {
  message?: string
}

export function EmptyState({ message = '目前沒有資料' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-[color:var(--app-border)] bg-[color:var(--app-surface)] py-16 text-center">
      <div className="text-4xl opacity-70">📭</div>
      <p className="text-sm text-[color:var(--app-text-muted)]">{message}</p>
    </div>
  )
}
