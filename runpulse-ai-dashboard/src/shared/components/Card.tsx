import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-2xl border bg-[color:var(--app-surface)] shadow-[var(--app-shadow)] backdrop-blur ${className}`}
      style={{ borderColor: 'var(--app-border)' }}
    >
      {children}
    </div>
  )
}
