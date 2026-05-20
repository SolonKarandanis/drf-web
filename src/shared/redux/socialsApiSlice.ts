import { apiSlice } from './apiSlice'
import { ApiControllers } from './apiControllers'
import type {
  CreateUserSocialRequest,
  SocialModel,
  UserSocial,
} from '#/models/social.models'

const socialsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSocials: builder.query<Array<SocialModel>, void>({
      query: () => `${ApiControllers.SOCIALS}/`,
    }),
    getUserSocials: builder.query<Array<UserSocial>, string>({
      query: (userUuid) => `${ApiControllers.SOCIALS}/users/${userUuid}`,
    }),
    createUserSocials: builder.mutation<
      Array<UserSocial>,
      { userUuid: string; request: Array<CreateUserSocialRequest> }
    >({
      query: ({ userUuid, request }) => ({
        url: `${ApiControllers.SOCIALS}/users/${userUuid}/create/`,
        method: 'POST',
        body: request,
      }),
    }),
    deleteUserSocial: builder.mutation<Array<UserSocial>, { userUuid: string; id: number }>({
      query: ({ userUuid, id }) => ({
        url: `${ApiControllers.SOCIALS}/users/${userUuid}/delete/${id}`,
        method: 'PUT',
      }),
    }),
    deleteAllUserSocials: builder.mutation<Array<UserSocial>, { userUuid: string }>({
      query: ({ userUuid }) => ({
        url: `${ApiControllers.SOCIALS}/users/${userUuid}/clear/`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetSocialsQuery,
  useGetUserSocialsQuery,
  useCreateUserSocialsMutation,
  useDeleteUserSocialMutation,
  useDeleteAllUserSocialsMutation,
} = socialsApiSlice
