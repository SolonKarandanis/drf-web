import { queryOptions } from '@tanstack/react-query'
import { fetchWithAuth } from './client'
import { ApiControllers } from './api-controllers'
import type { UserAccount } from '#/models/user.models'

export const accountQueryOptions = () =>
  queryOptions({
    queryKey: ['user', 'account'] as const,
    queryFn: () => fetchWithAuth<UserAccount>(`${ApiControllers.USERS}/account/`),
    staleTime: 5 * 60 * 1000,
  })
