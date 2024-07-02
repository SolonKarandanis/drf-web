import { UserSearchRequest } from "@/models/search.models";
import { ApiControllers } from "../../api/ApiControllers";
import { apiSlice } from "../../apiSlice";
import { UserAcount, UserGroup, UserModel, UserSocials } from "@/models/user.models";

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getUser: builder.query<UserAcount, string>({
			query: (userUuid) => `${ApiControllers.USERS}/${userUuid}`,
		}),
        getUsers: builder.query<UserModel[], {page:number,size:number}>({
			query: ({page,size}) => `${ApiControllers.USERS}/`,
		}),
        searchUsers: builder.mutation({
			query: ( searchRequest:UserSearchRequest)=>{
				return {
					url: `${ApiControllers.USERS}/search`,
					method: 'POST',
					body: searchRequest ,
				}
			}
			
		}),
		getAllGroups: builder.query<UserGroup[],void>({
			query:() =>{
				return {
					url:`${ApiControllers.USERS}/groups`,
				}
			}
		}),
		getUserSocials: builder.query<UserSocials[],string>({
			query:(userUuid) =>{
				return {
					url:`${ApiControllers.SOCIALS}/${ApiControllers.USERS}/${userUuid}`,
				}
			}
		})
    }),
    // @ts-ignore
	overrideExisting: module.hot?.status() === "apply",
})


export const {
	useLazyGetUserQuery,
    useLazyGetUsersQuery,
    useSearchUsersMutation,
	useLazyGetAllGroupsQuery,
	useGetUserSocialsQuery,
} = usersApiSlice;