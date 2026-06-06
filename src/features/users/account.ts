import { queryOptions } from '@tanstack/react-query'
import { fetchWithAuth } from '#/shared/http/client'
import { ApiControllers } from '#/shared/http/api-controllers'
import type { UserAccount } from './models'

export const accountQueryOptions = () =>
  queryOptions({
    queryKey: ['user', 'account'] as const,
    queryFn: () => fetchWithAuth<UserAccount>(`${ApiControllers.USERS}/account/`),
    staleTime: 5 * 60 * 1000,
  })
