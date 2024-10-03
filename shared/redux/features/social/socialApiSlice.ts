import { SocialModel, UserSocials } from "@/models/social.models";
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
    }),
     // @ts-ignore
	overrideExisting: module.hot?.status() === "apply",
});

export const {
	useGetUserSocialsQuery,
} = socialsApiSlice;