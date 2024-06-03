import { ApiControllers } from "../../api/ApiControllers";
import { apiSlice } from "../../apiSlice";

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getUser: builder.query<UserAcount, void>({
			query: (userId) => `${ApiControllers.USERS}/${userId}`,
		}),
        getUsers: builder.query<UserModel[], {page:number,size:number}>({
			query: ({page,size}) => `${ApiControllers.USERS}/`,
		}),
    })
})


export const {
	useLazyGetUserQuery,
    useLazyGetUsersQuery,
} = usersApiSlice;