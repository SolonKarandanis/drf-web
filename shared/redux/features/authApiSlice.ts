import { apiSlice } from '../apiSlice';



const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query<UserDetails, void>({
			query: (userId) => `/auth/users/${userId}`,
		}),
        getLoggedInUserAccount: builder.query<UserDetails, string| undefined>({
			query(token?:string) {
				if(token){
					return {
						url: "/auth/users/account/",
						headers: { Authorization: `Bearer ${token}` }
					  }
				}
				return {
					url: "/auth/users/account/",
				}
			  }
			
		}),
        getUsers: builder.query<User[], {page:number,size:number}>({
			query: ({page,size}) => `/auth/users`,
		}),
        login: builder.mutation({
			query: ({ username, password }) => ({
				url: '/auth/token/',
				method: 'POST',
				body: { username, password },
			}),
		}),
        register: builder.mutation({
			query: ({
                username,
				first_name,
				last_name,
				email,
				password,
				password2,
			}) => ({
				url: '/auth/users/create/',
				method: 'POST',
				body: { username,first_name, last_name, email, password, password2 },
			}),
		}),
		verify: builder.mutation({
			query: (token) => ({
				url: '/auth/token/verify/',
				method: 'POST',
				body:{token}
			}),
		}),
		activation: builder.mutation({
			query: ({ uid, token }) => ({
				url: '/users/activation/',
				method: 'POST',
				body: { uid, token },
			}),
		}),
        resetPassword: builder.mutation({
			query: email => ({
				url: '/users/reset_password/',
				method: 'POST',
				body: { email },
			}),
		}),
		resetPasswordConfirm: builder.mutation({
			query: ({ uid, token, new_password, re_new_password }) => ({
				url: '/users/reset_password_confirm/',
				method: 'POST',
				body: { uid, token, new_password, re_new_password },
			}),
		}),
    })
});

export const {
	useLazyGetUserQuery,
	useLazyGetLoggedInUserAccountQuery,
	useLazyGetUsersQuery,
	useLoginMutation,
	useRegisterMutation,
	useVerifyMutation,
	useActivationMutation,
	useResetPasswordMutation,
	useResetPasswordConfirmMutation,
} = authApiSlice;