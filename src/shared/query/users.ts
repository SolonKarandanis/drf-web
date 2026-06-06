import { queryOptions } from '@tanstack/react-query'
import { fetchWithAuth, fetchPublic } from './client'
import { ApiControllers } from './api-controllers'
import type {
  ChangePasswordRequest,
  ChangeUserStatusRequest,
  CreateUserRequest,
  UpdateBioRequest,
  UpdateContactInfoRequest,
  UploadProfileImageMutation,
  UserAccount,
  UserAccountActions,
  UserGroup,
} from '#/models/user.models'
import type { ImageModel } from '#/models/product.models'
import type { UserSearchRequest, UserSearchResponse } from '#/models/search.models'

export const userQueryOptions = (uuid: string) =>
  queryOptions({
    queryKey: ['users', uuid] as const,
    queryFn: () => fetchWithAuth<UserAccount>(`${ApiControllers.USERS}/${uuid}`),
  })

export const userImageQueryOptions = (uuid: string) =>
  queryOptions({
    queryKey: ['users', uuid, 'image'] as const,
    queryFn: () => fetchWithAuth<ImageModel>(`${ApiControllers.USERS}/${uuid}/image/`),
  })

// getAllGroups is a public endpoint — no Authorization header required
export const allGroupsQueryOptions = () =>
  queryOptions({
    queryKey: ['users', 'groups'] as const,
    queryFn: () => fetchPublic<UserGroup[]>(`${ApiControllers.USERS}/groups/`),
    staleTime: 10 * 60 * 1000,
  })

// Mutation fns

export const searchUsers = (request: UserSearchRequest) =>
  fetchWithAuth<UserSearchResponse>(`${ApiControllers.USERS}/search/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

export const createUser = (request: CreateUserRequest) =>
  fetchWithAuth<UserAccount>(`${ApiControllers.USERS}/create/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

export const uploadUserImage = ({ userUuid, image, title, alt }: UploadProfileImageMutation) => {
  const formData = new FormData()
  formData.append('alt', alt)
  formData.append('title', title)
  formData.append('image', image, image.name)
  return fetchWithAuth<ImageModel>(`${ApiControllers.USERS}/${userUuid}/upload-profile-image/`, {
    method: 'POST',
    body: formData,
  })
}

export const resetPassword = (request: ChangePasswordRequest) =>
  fetchWithAuth<void>(`${ApiControllers.USERS}/reset-password/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

export const forgotPassword = (request: {
  email: string
  newPassword: string
  confirmPassword: string
}) =>
  fetchPublic<void>(`${ApiControllers.USERS}/forgot-password/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

export const updateUserBio = ({ uuid, request }: { uuid: string; request: UpdateBioRequest }) =>
  fetchWithAuth<UserAccount>(`${ApiControllers.USERS}/${uuid}/update-bio/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

export const updateContactInfo = ({
  uuid,
  request,
}: {
  uuid: string
  request: UpdateContactInfoRequest
}) =>
  fetchWithAuth<UserAccount>(`${ApiControllers.USERS}/${uuid}/update-contact-info/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

export const changeAccountStatus = ({
  request,
  action,
}: {
  request: ChangeUserStatusRequest
  action: UserAccountActions
}) => {
  const base = ApiControllers.USERS
  const actionPath =
    action === 'ACTIVATE'
      ? `${base}/activate/`
      : action === 'DEACTIVATE'
        ? `${base}/deactivate/`
        : `${base}/delete/`
  return fetchWithAuth<UserAccount>(actionPath, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })
}
