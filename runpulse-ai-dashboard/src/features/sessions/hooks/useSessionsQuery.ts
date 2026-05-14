import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
} from '@/shared/api/endpoints'
import type { Session, SessionsParams, CreateSessionPayload, UpdateSessionPayload } from '../types'

export function useSessionsQuery(params: SessionsParams = {}) {
  return useQuery({
    queryKey: ['sessions', params],
    queryFn: () => getSessions(params),
    staleTime: 1000 * 60 * 2,
  })
}

export function useSessionDetailQuery(id: string) {
  return useQuery({
    queryKey: ['session', id],
    queryFn: () => getSessionById(id),
    enabled: Boolean(id),
  })
}

export function useCreateSessionMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateSessionPayload) => createSession(payload),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ['sessions'] })
    },
  })
}

export function useUpdateSessionMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateSessionPayload }) =>
      updateSession(id, payload),
    // Optimistic update: immediately reflect the change in the cache
    onMutate: async ({ id, payload }) => {
      await qc.cancelQueries({ queryKey: ['sessions'] })
      const previous = qc.getQueriesData<Session[]>({ queryKey: ['sessions'] })
      qc.setQueriesData<Session[]>({ queryKey: ['sessions'] }, (old) =>
        old?.map((s) => (s.id === id ? { ...s, ...payload } : s))
      )
      return { previous }
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        for (const [key, data] of ctx.previous) {
          qc.setQueryData(key, data)
        }
      }
    },
    onSettled: () => {
      void qc.invalidateQueries({ queryKey: ['sessions'] })
    },
  })
}

export function useDeleteSessionMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteSession(id),
    // Optimistic update: remove immediately from list
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ['sessions'] })
      const previous = qc.getQueriesData<Session[]>({ queryKey: ['sessions'] })
      qc.setQueriesData<Session[]>({ queryKey: ['sessions'] }, (old) =>
        old?.filter((s) => s.id !== id)
      )
      return { previous }
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        for (const [key, data] of ctx.previous) {
          qc.setQueryData(key, data)
        }
      }
    },
    onSettled: () => {
      void qc.invalidateQueries({ queryKey: ['sessions'] })
    },
  })
}
