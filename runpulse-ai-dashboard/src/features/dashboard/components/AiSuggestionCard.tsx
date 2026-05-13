import { memo } from 'react'
import { Card } from '@/shared/components/Card'

interface AiSuggestionCardProps {
  suggestion: string
  fatigueLevel: 'low' | 'medium' | 'high'
}

const fatigueBadge = {
  low: 'bg-green-500/20 text-green-400',
  medium: 'bg-yellow-500/20 text-yellow-400',
  high: 'bg-red-500/20 text-red-400',
}

export const AiSuggestionCard = memo(function AiSuggestionCard({
  suggestion,
  fatigueLevel,
}: AiSuggestionCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🤖</span>
        <span className="text-sm font-semibold text-cyan-400">AI Coach Insight</span>
        <span className={`ml-auto rounded-full px-2.5 py-0.5 text-xs font-medium ${fatigueBadge[fatigueLevel]}`}>
          Fatigue: {fatigueLevel}
        </span>
      </div>
      <p className="text-sm text-gray-300 leading-relaxed">{suggestion}</p>
    </Card>
  )
})
