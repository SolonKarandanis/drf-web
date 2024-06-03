import { UserSearchRequest } from "@/models/search.models";
import { ApiControllers } from "../../api/ApiControllers";
import { apiSlice } from "../../apiSlice";
import { UserAcount, UserModel } from "@/models/user.models";

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getUser: builder.query<UserAcount, void>({
			query: (userId) => `${ApiControllers.USERS}/${userId}`,
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
    }),
    // @ts-ignore
	overrideExisting: module.hot?.status() === "apply",
})


export const {
	useLazyGetUserQuery,
    useLazyGetUsersQuery,
    useSearchUsersMutation,
} = usersApiSlice;