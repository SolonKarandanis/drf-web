import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
import { fetchWithAuth } from '#/shared/http/client'
import { ApiControllers } from '#/shared/http/api-controllers'
import type { NotificationEvent, UnreadCountResponse } from './models'

interface CursorPage {
  next: string | null
  previous: string | null
  results: NotificationEvent[]
}

export const unreadCountQueryOptions = () =>
  queryOptions({
    queryKey: ['notifications', 'unread-count'] as const,
    queryFn: () => fetchWithAuth<UnreadCountResponse>(`${ApiControllers.NOTIFICATIONS}/unread-count/`),
  })

export const notificationsInfiniteQueryOptions = () =>
  infiniteQueryOptions({
    queryKey: ['notifications', 'list'] as const,
    queryFn: ({ pageParam }) => {
      const url = pageParam ?? `${ApiControllers.NOTIFICATIONS}/`
      return fetchWithAuth<CursorPage>(url)
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage?.next ?? null,
  })

export const markNotificationsRead = (ids: number[]) =>
  fetchWithAuth<void>(`${ApiControllers.NOTIFICATIONS}/read/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids }),
  })
