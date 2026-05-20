import { apiSlice } from './apiSlice'
import { ApiControllers } from './apiControllers'

export interface UserAccount {
  id: number
  uuid: string
  username: string
  email: string
  firstName?: string
  lastName?: string
}

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLoggedInUserAccount: builder.query<UserAccount, void>({
      query: () => ({
        url: `${ApiControllers.USERS}/account/`,
      }),
    }),
  }),
})

export const { useGetLoggedInUserAccountQuery, useLazyGetLoggedInUserAccountQuery } = userApiSlice
