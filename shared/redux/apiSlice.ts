import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import {  setAccesToken } from './features/authSlice';
import { Mutex } from 'async-mutex';
import { AllowedUrls, ApiControllers } from './api/ApiControllers';
import { RefreshResponse } from '@/models/user.models';
import { 
	getAccessTokenValue,
	getRefreshTokenValue,
	setStorageValue 
} from '@/utils/functions';
import { baseUrl } from '@/utils/constants';

const mutex = new Mutex();



const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	const token = getAccessTokenValue();
	const refresh = getRefreshTokenValue();
	
	await mutex.waitForUnlock();
	

	const baseQuery = fetchBaseQuery({
		baseUrl: baseUrl,
		credentials: 'include',
		prepareHeaders: (headers, { getState,endpoint }) => {
			if (token && !AllowedUrls.includes(endpoint)) headers.set('Authorization', `Bearer ${token}`);
			
			return headers;
		}
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
						body:{refresh}
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