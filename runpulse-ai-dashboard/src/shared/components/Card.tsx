import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-slate-700 bg-slate-800 ${className}`}
    >
      {children}
    </div>
  )
}
