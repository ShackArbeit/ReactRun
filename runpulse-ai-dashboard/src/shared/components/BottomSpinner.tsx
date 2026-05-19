interface BottomSpinnerProps {
  visible: boolean
  label?: string
}

export function BottomSpinner({ visible, label = 'LOADING' }: BottomSpinnerProps) {
  if (!visible) return null

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 flex items-center gap-3 rounded-full border border-cyan-400/30 bg-[color:var(--app-surface)]/80 px-5 py-2.5 shadow-xl shadow-black/50 backdrop-blur-md">
      {/* spinning ring */}
      <svg
        className="h-4 w-4 animate-spin text-cyan-400"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          className="opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-90"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>

      {/* label */}
      <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-400">
        {label}
      </span>

      {/* animated dots */}
      <span className="flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1 w-1 rounded-full bg-cyan-400"
            style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </span>
    </div>
  )
}
