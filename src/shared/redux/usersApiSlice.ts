import { apiSlice } from './apiSlice'
import { ApiControllers } from './apiControllers'
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

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<UserAccount, CreateUserRequest>({
      query: (request) => ({
        url: `${ApiControllers.USERS}/create/`,
        method: 'POST',
        body: request,
      }),
    }),
    searchUsers: builder.mutation<UserSearchResponse, UserSearchRequest>({
      query: (searchRequest) => ({
        url: `${ApiControllers.USERS}/search/`,
        method: 'POST',
        body: searchRequest,
      }),
    }),
    getAllGroups: builder.query<Array<UserGroup>, void>({
      query: () => `${ApiControllers.USERS}/groups/`,
    }),
    getUser: builder.query<UserAccount, string>({
      query: (uuid) => `${ApiControllers.USERS}/${uuid}`,
    }),
    getUserImage: builder.query<ImageModel, string>({
      query: (uuid) => `${ApiControllers.USERS}/${uuid}/image/`,
    }),
    uploadUserImage: builder.mutation<ImageModel, UploadProfileImageMutation>({
      query: ({ userUuid, image, title, alt }) => {
        const formData = new FormData()
        formData.append('alt', alt)
        formData.append('title', title)
        formData.append('image', image, image.name)
        return {
          url: `${ApiControllers.USERS}/${userUuid}/upload-profile-image/`,
          method: 'POST',
          body: formData,
        }
      },
    }),
    resetPassword: builder.mutation<void, ChangePasswordRequest>({
      query: (request) => ({
        url: `${ApiControllers.USERS}/reset-password/`,
        method: 'PUT',
        body: request,
      }),
    }),
    forgotPassword: builder.mutation<void, { email: string; newPassword: string; confirmPassword: string }>({
      query: (request) => ({
        url: `${ApiControllers.USERS}/forgot-password/`,
        method: 'POST',
        body: request,
      }),
    }),
    updateUserBio: builder.mutation<UserAccount, { uuid: string; request: UpdateBioRequest }>({
      query: ({ uuid, request }) => ({
        url: `${ApiControllers.USERS}/${uuid}/update-bio/`,
        method: 'PUT',
        body: request,
      }),
      async onQueryStarted({ uuid }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          dispatch((apiSlice.util as any).updateQueryData('getUser', uuid, () => data))
        } catch {}
      },
    }),
    updateContactInfo: builder.mutation<
      UserAccount,
      { uuid: string; request: UpdateContactInfoRequest }
    >({
      query: ({ uuid, request }) => ({
        url: `${ApiControllers.USERS}/${uuid}/update-contact-info/`,
        method: 'PUT',
        body: request,
      }),
      async onQueryStarted({ uuid }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          dispatch((apiSlice.util as any).updateQueryData('getUser', uuid, () => data))
        } catch {}
      },
    }),
    changeAccountStatus: builder.mutation<
      UserAccount,
      { request: ChangeUserStatusRequest; action: UserAccountActions }
    >({
      query: ({ request, action }) => {
        const base = ApiControllers.USERS
        const actionPath =
          action === 'ACTIVATE'
            ? `${base}/activate/`
            : action === 'DEACTIVATE'
              ? `${base}/deactivate/`
              : `${base}/delete/`
        return { url: actionPath, method: 'PUT', body: request }
      },
      async onQueryStarted({ request: { userId } }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          dispatch((apiSlice.util as any).updateQueryData('getUser', userId, () => data))
        } catch {}
      },
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateUserMutation,
  useSearchUsersMutation,
  useGetAllGroupsQuery,
  useGetUserQuery,
  useGetUserImageQuery,
  useUploadUserImageMutation,
  useResetPasswordMutation,
  useUpdateUserBioMutation,
  useUpdateContactInfoMutation,
  useChangeAccountStatusMutation,
  useForgotPasswordMutation,
} = usersApiSlice
