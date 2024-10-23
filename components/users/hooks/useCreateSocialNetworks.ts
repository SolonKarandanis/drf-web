import { ErrorResponse } from "@/models/error.models";
import { CreateUserSocialRequest, UserSocials } from "@/models/social.models";
import { useCreateUserSocialsMutation } from "@/shared/redux/features/social/socialApiSlice";
import { setUserSocials } from "@/shared/redux/features/social/socialSlice";
import { useAppDispatch } from "@/shared/redux/hooks";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

export function useCreateSocialNetworks(userUuid:string, request:CreateUserSocialRequest[]){
    const t = useTranslations();
    const dispatch = useAppDispatch();
    const [createSocial, { isLoading }] = useCreateUserSocialsMutation();

    const handleCreateSocial =(userUuid:string, request:CreateUserSocialRequest[]) =>{
        createSocial({userUuid,request})
        .unwrap()
        .then((response:UserSocials[] ) => {
            dispatch(setUserSocials(response));
            // setIsEdit(prev => !prev);
            toast.success(t("USERS.DETAILS.SUCCESS.update-user"));
        })
        .catch((error:ErrorResponse) => {
            handleError(error);
        });
    }
    
    
        return {
            handleCreateSocial,
            isLoading
        }
}

const handleError =(errorResponse:ErrorResponse)=>{
    const {status, data} = errorResponse;
    toast.error(`(${status}) ${data}`);
};