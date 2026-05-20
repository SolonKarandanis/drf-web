import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

import { setAccesToken } from './authSlice'
import { AllowedUrls, ApiControllers } from './apiControllers'
import {
  getAccessTokenValue,
  getRefreshTokenValue,
  setStorageValue,
} from '../token-storage'

interface RefreshResponse {
  access: string
}

const baseUrl = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:8000/api/'

const mutex = new Mutex()

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const refresh = getRefreshTokenValue()

  await mutex.waitForUnlock()

  // Read the access token inside prepareHeaders, NOT at the top of this
  // function — otherwise the retry after a successful refresh sends the stale
  // token. (Original drf-web inherited this bug; only worked because NextAuth
  // refreshed proactively so the captured token was always still valid.)
  const baseQuery = fetchBaseQuery({
    baseUrl,
    credentials: 'include',
    prepareHeaders: (headers, { endpoint }) => {
      const currentToken = getAccessTokenValue()
      if (currentToken && !AllowedUrls.includes(endpoint)) {
        headers.set('Authorization', `Bearer ${currentToken}`)
      }
      return headers
    },
  })

  let result = await baseQuery(args, api, extraOptions)

  // SimpleJWT returns 401 (with code "token_not_valid") when the access token
  // is expired or invalid. 403 was a legacy check from the original drf-web
  // that never fired because NextAuth proactively refreshed before expiry.
  if (result.error && result.error.status === 401 && refresh) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const refreshResult = await baseQuery(
          {
            url: `${ApiControllers.AUTH}/refresh/`,
            method: 'POST',
            body: { refresh },
          },
          api,
          extraOptions,
        )
        const data = refreshResult.data as RefreshResponse | undefined
        if (data) {
          const { access } = data
          api.dispatch(setAccesToken(data))
          setStorageValue('access', access)
          result = await baseQuery(args, api, extraOptions)
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})
