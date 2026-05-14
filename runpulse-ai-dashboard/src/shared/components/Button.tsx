import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

const variants = {
  primary:
    'bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/25 hover:brightness-110',
  secondary:
    'border text-[color:var(--app-text)] hover:border-cyan-300/40 hover:bg-cyan-400/10',
  ghost:
    'border border-transparent text-[color:var(--app-text-muted)] hover:border-cyan-400/20 hover:bg-cyan-400/10 hover:text-[color:var(--app-text)]',
  danger: 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-500/20 hover:brightness-110',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const sharedStyle =
    variant === 'secondary'
      ? { background: 'var(--app-surface)', borderColor: 'var(--app-border)' }
      : variant === 'ghost'
        ? { background: 'transparent' }
        : undefined

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      style={sharedStyle}
      {...props}
    >
      {children}
    </button>
  )
}
