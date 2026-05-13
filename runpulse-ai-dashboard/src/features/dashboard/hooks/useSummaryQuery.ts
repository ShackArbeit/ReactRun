import { useQuery } from '@tanstack/react-query'
import { getSummary } from '@/shared/api/endpoints'

export function useSummaryQuery() {
  return useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60 * 5,
  })
}
