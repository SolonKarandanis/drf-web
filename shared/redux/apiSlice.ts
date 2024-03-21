import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import {  logout, setAccesToken } from './features/authSlice';
import { Mutex } from 'async-mutex';
import { getAccessTokenValue, removeLoginResponseFromStorage, setStorageValue } from '@/utils/functions';
import { ApiControllers } from './api/ApiControllers';

const mutex = new Mutex();
const token = getAccessTokenValue();
let headers;

if(token){
	headers = {Authorization: `Bearer ${getAccessTokenValue()}`}
}

const baseQuery = fetchBaseQuery({
	baseUrl: `${process.env.NEXT_PUBLIC_HOST}/api`,
	credentials: 'include',
	headers,
});

const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	await mutex.waitForUnlock();
	let result = await baseQuery(args, api, extraOptions);

	if (result.error && result.error.status === 401) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
			try {
				const refreshResult = await baseQuery(
					{
						url: `${ApiControllers.AUTH}/refresh/`,
						method: 'POST',
					},
					api,
					extraOptions
				);
				const data:RefreshResponse = refreshResult.data as RefreshResponse;
				if (data) {
					const{access}=data;
					api.dispatch(setAccesToken(data));
					setStorageValue('access',access);

					result = await baseQuery(args, api, extraOptions);
				} else {
					api.dispatch(logout());
					removeLoginResponseFromStorage();
				}
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await baseQuery(args, api, extraOptions);
		}
	}
	return result;
};

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithReauth,
	endpoints: builder => ({}),
});