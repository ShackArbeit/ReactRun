import { memo } from 'react'
import { Card } from '@/shared/components/Card'

interface AiSuggestionCardProps {
  suggestion: string
  fatigueLevel: 'low' | 'medium' | 'high'
}

const fatigueBadge = {
  low: 'bg-slate-700 text-slate-300',
  medium: 'bg-slate-700 text-slate-200',
  high: 'bg-slate-700 text-slate-100',
}

const fatigueLabel = {
  low: '低',
  medium: '中',
  high: '高',
}

export const AiSuggestionCard = memo(function AiSuggestionCard({
  suggestion,
  fatigueLevel,
}: AiSuggestionCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🤖</span>
        <span className="text-sm font-semibold text-slate-300">智慧教練建議</span>
        <span className={`ml-auto rounded-full px-2.5 py-0.5 text-xs font-medium ${fatigueBadge[fatigueLevel]}`}>
          疲勞：{fatigueLabel[fatigueLevel]}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-slate-300">{suggestion}</p>
    </Card>
  )
})
