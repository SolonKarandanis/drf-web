import { CreateUserSocialRequest, DeleteUserSocialRequest, SocialModel, UserSocials } from "@/models/social.models";
import { apiSlice } from "../../apiSlice";
import { ApiControllers } from "../../api/ApiControllers";

const socialsApiSlice = apiSlice.injectEndpoints({
    endpoints:  builder =>({
        getSocials: builder.query<SocialModel[], void>({
			query: () => `${ApiControllers.SOCIALS}/`,
		}),
        getUserSocials: builder.query<UserSocials[],string>({
			query:(userUuid) =>{
				return {
					url:`${ApiControllers.SOCIALS}/users/${userUuid}`,
				}
			}
		}),
        createUserSocials:builder.mutation<UserSocials[],{userUuid:string, request:CreateUserSocialRequest[]}>({
			query:({userUuid,request})=>{
				return {
					url:`${ApiControllers.SOCIALS}/users/${userUuid}/create/`,
					method: 'POST',
					body: request ,
				}
			}
		}),
        deleteUserSocial:builder.mutation<UserSocials[],{userUuid:string, socialId:number}>({
            query:({userUuid,socialId})=>{
                return {
					url:`${ApiControllers.SOCIALS}/users/${userUuid}/delete/${socialId}`,
					method: 'PUT'
				}
            }
        }),
        deleteUserSocialsByIds:builder.mutation<UserSocials[],{userUuid:string, request:DeleteUserSocialRequest[]}>({
			query:({userUuid,request})=>{
				return {
					url:`${ApiControllers.SOCIALS}/users/${userUuid}/delete/`,
					method: 'PUT',
					body: request ,
				}
			}
		}),
        deleteAllUserSocials:builder.mutation<UserSocials[],{userUuid:string}>({
			query:({userUuid})=>{
				return {
					url:`${ApiControllers.SOCIALS}/users/${userUuid}/clear/`,
					method: 'DELETE'
				}
			}
		}),
    }),
     // @ts-ignore
	overrideExisting: module.hot?.status() === "apply",
});

export const {
    useGetSocialsQuery,
	useGetUserSocialsQuery,
    useCreateUserSocialsMutation,
    useDeleteUserSocialMutation,
    useDeleteUserSocialsByIdsMutation,
    useDeleteAllUserSocialsMutation
} = socialsApiSlice;