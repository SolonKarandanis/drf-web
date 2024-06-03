import { CreateUserRequest, LoginRequest, UserAcount } from '@/models/user.models';
import { ApiControllers } from '../api/ApiControllers';
import { apiSlice } from '../apiSlice';



const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLoggedInUserAccount: builder.query<UserAcount, string| undefined>({
			query(token?:string) {
				if(token){
					return {
						url: `${ApiControllers.USERS}/account/`,
						headers: { Authorization: `Bearer ${token}` }
					  }
				}
				return {
					url: `${ApiControllers.USERS}/account/`,
				}
			  }
			
		}),
        
        login: builder.mutation({
			query: ({ username, password }:LoginRequest)=>{
				return {
					url: `${ApiControllers.AUTH}/`,
					method: 'POST',
					body: { username, password },
				}
			}
			
		}),
        registerUser: builder.mutation({
			query: ({
                username,
				firstName,
				lastName,
				email,
				password,
				password2,
			}:CreateUserRequest) => {
				return {
					url: `${ApiControllers.USERS}/create/`,
					method: 'POST',
					body: { username,firstName, lastName, email, password, password2 },
				}
			},
		}),
		verify: builder.mutation({
			query: (token) => {
				return{
					url: `${ApiControllers.AUTH}/verify/`,
					method: 'POST',
					body:{token}
				}
			},
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
	useLazyGetLoggedInUserAccountQuery,
	useLoginMutation,
	useRegisterUserMutation,
	useVerifyMutation,
	useActivationMutation,
	useResetPasswordMutation,
	useResetPasswordConfirmMutation,
} = authApiSlice;