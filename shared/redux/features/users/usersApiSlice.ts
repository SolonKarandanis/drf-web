import { UserSearchRequest, UserSearchResponse } from "@/models/search.models";
import { ApiControllers } from "../../api/ApiControllers";
import { apiSlice } from "../../apiSlice";
import { ChangePasswordRequest, UpdateBioRequest, UpdateContactInfoRequest, UserAccountActions, UserAcount, UserGroup, UserModel } from "@/models/user.models";
import { ImageModel, UploadProfileImageMutation } from "@/models/image.models";

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getUser: builder.query<UserAcount, string>({
			query: (userUuid) => `${ApiControllers.USERS}/${userUuid}`,
		}),
        getUsers: builder.query<UserModel[], {page:number,size:number}>({
			query: ({page,size}) => `${ApiControllers.USERS}/`,
		}),
        searchUsers: builder.mutation<UserSearchResponse,UserSearchRequest>({
			query: ( searchRequest:UserSearchRequest)=>{
				return {
					url: `${ApiControllers.USERS}/search/`,
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
		getUserImage: builder.query<ImageModel, string>({
			query: (userUuid) => `${ApiControllers.USERS}/${userUuid}/image/`,
		}),
		uploadUserImage:builder.mutation<ImageModel,UploadProfileImageMutation>({
			query:(uploadRequestMutation:UploadProfileImageMutation)=>{
				const {userUuid,image,title,alt} = uploadRequestMutation;

				const formData = new FormData();
				formData.append('alt',alt);
				formData.append('title',title);
				formData.append('image',image,image.name);

				return {
					url:`${ApiControllers.USERS}/${userUuid}/upload-profile-image/`,
					method: 'POST',
					body: formData ,
				}
			},
		}),
		updateUserBio:builder.mutation<UserAcount,{userUuid:string, request:UpdateBioRequest}>({
			query:({userUuid,request})=>{
				const {bio} = request;
				return {
					url:`${ApiControllers.USERS}/${userUuid}/update-bio/`,
					method: 'PUT',
					body: request ,
				}
			}
		}),
		updateContanctInfo:builder.mutation<UserAcount,{userUuid:string, request:UpdateContactInfoRequest}>({
			query:({userUuid,request})=>{
				return {
					url:`${ApiControllers.USERS}/${userUuid}/update-contact-info/`,
					method: 'PUT',
					body: request ,
				}
			}
		}),
		resetPassword: builder.mutation<void,ChangePasswordRequest>({
			query: (request) => ({
				url: `${ApiControllers.USERS}/reset-password/`,
				method: 'PUT',
				body: request,
			}),
		}),
		changeAccountStatus: builder.mutation<void,{userUuid:string, action:UserAccountActions}>({
			query: ({userUuid,action}) => {
				let actionUrl = `${ApiControllers.USERS}`
				switch(action){
					case "ACTIVATE":{
						actionUrl = `${actionUrl}/activate/`
						break;
					}
					case "DEACTIVATE":{
						actionUrl = `${actionUrl}/deactivate/`
						break;
					}
					case "DELETE":{
						actionUrl = `${actionUrl}/delete/`
						break;
					}
				}
				return{
					url: `${actionUrl}`,
					method: 'PUT',
					body: userUuid,
				}
			},
		}),
    }),
    // @ts-ignore
	overrideExisting: module.hot?.status() === "apply",
})


export const {
	useLazyGetUserQuery,
	useLazyGetUserImageQuery,
    useLazyGetUsersQuery,
    useSearchUsersMutation,
	useLazyGetAllGroupsQuery,
	useUploadUserImageMutation,
	useUpdateUserBioMutation,
	useUpdateContanctInfoMutation,
	useResetPasswordMutation,
	useChangeAccountStatusMutation,
} = usersApiSlice;