interface EmptyStateProps {
  message?: string
}

export function EmptyState({ message = '目前沒有資料' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="text-4xl opacity-40">🏃</div>
      <p className="text-gray-400 text-sm">{message}</p>
    </div>
  )
}
