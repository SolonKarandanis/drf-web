import { queryOptions } from '@tanstack/react-query'
import { fetchWithAuth } from '#/shared/http/client'
import { ApiControllers } from '#/shared/http/api-controllers'
import type {
  CreateUserSocialRequest,
  SocialModel,
  UserSocial,
} from './models'

export const socialsQueryOptions = () =>
  queryOptions({
    queryKey: ['socials'] as const,
    queryFn: () => fetchWithAuth<SocialModel[]>(`${ApiControllers.SOCIALS}/`),
    staleTime: 10 * 60 * 1000,
  })

export const userSocialsQueryOptions = (userUuid: string) =>
  queryOptions({
    queryKey: ['socials', userUuid] as const,
    queryFn: () => fetchWithAuth<UserSocial[]>(`${ApiControllers.SOCIALS}/users/${userUuid}`),
  })

// Mutation fns

export const createUserSocials = ({
  userUuid,
  request,
}: {
  userUuid: string
  request: CreateUserSocialRequest[]
}) =>
  fetchWithAuth<UserSocial[]>(`${ApiControllers.SOCIALS}/users/${userUuid}/create/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

export const deleteUserSocial = ({ userUuid, id }: { userUuid: string; id: number }) =>
  fetchWithAuth<UserSocial[]>(`${ApiControllers.SOCIALS}/users/${userUuid}/delete/${id}`, {
    method: 'PUT',
  })

export const deleteAllUserSocials = ({ userUuid }: { userUuid: string }) =>
  fetchWithAuth<UserSocial[]>(`${ApiControllers.SOCIALS}/users/${userUuid}/clear/`, {
    method: 'DELETE',
  })
