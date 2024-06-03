import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import {  logout, setAccesToken } from './features/authSlice';
import { Mutex } from 'async-mutex';
import { removeLoginResponseFromStorage, setStorageValue } from '@/utils/functions';
import { ApiControllers } from './api/ApiControllers';
import { useSession } from 'next-auth/react';
import { getAccessToken } from '@/utils/user-utils';

const mutex = new Mutex();


const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	const {data} = useSession();
	console.log('apiSlice')
	console.log(data)
	let headers;

	if(data){
		const loggedUser = data.user!;
		const accessToken =getAccessToken(loggedUser);
		headers = {Authorization: `Bearer ${accessToken}`}
	}
	
	await mutex.waitForUnlock();
	

	const baseQuery = fetchBaseQuery({
		baseUrl: `${process.env.NEXT_PUBLIC_HOST}/api`,
		credentials: 'include',
		headers,
	});

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