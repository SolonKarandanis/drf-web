import { queryOptions } from '@tanstack/react-query'
import { fetchWithAuth } from '#/shared/http/client'
import { ApiControllers } from '#/shared/http/api-controllers'
import type { UnreadCountResponse } from './models'

export const unreadCountQueryOptions = () =>
  queryOptions({
    queryKey: ['notifications', 'unread-count'] as const,
    queryFn: () => fetchWithAuth<UnreadCountResponse>(`${ApiControllers.NOTIFICATIONS}/unread-count/`),
  })

export const markNotificationsRead = (ids: number[]) =>
  fetchWithAuth<void>(`${ApiControllers.NOTIFICATIONS}/read/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids }),
  })
