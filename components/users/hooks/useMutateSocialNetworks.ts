import { CreateUserSocialRequest, UserSocials } from "@/models/social.models";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAppDispatch } from "@/shared/redux/hooks";
import { useCreateUserSocialsMutation, useDeleteAllUserSocialsMutation, useDeleteUserSocialMutation } from "@/shared/redux/features/social/socialApiSlice";
import { resetUserSocials, setUserSocials } from "@/shared/redux/features/social/socialSlice";
import { toast } from "react-toastify";
import { ErrorResponse } from "@/models/error.models";
import { handleError } from "@/lib/functions";

export function useMutateSocialNetworks(){
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const t = useTranslations();
    const dispatch = useAppDispatch();
    const [createSocial, { isLoading:createMutationLoading }] = useCreateUserSocialsMutation();
    const [deleteSocial, { isLoading:deleteMutationLoading }] = useDeleteUserSocialMutation();
    const [deleteAllSocials, { isLoading:deleteAllMutationLoading }] = useDeleteAllUserSocialsMutation();

    const handleCreateMutation = (userUuid:string, request:CreateUserSocialRequest[]) =>{
        createSocial({userUuid,request})
        .unwrap()
        .then((response:UserSocials[] ) => {
            dispatch(setUserSocials(response));
            setIsEdit(prev => !prev);
            toast.success(t("USERS.DETAILS.SUCCESS.update-user"));
        })
        .catch((error:ErrorResponse) => {
            handleError(error);
        });
    }

    const handleDeleteAllMutation = (userUuid:string) =>{
        deleteAllSocials({userUuid})
            .unwrap()
            .then(( ) => {
                dispatch(resetUserSocials());
                setIsEdit(prev => !prev);
                toast.success(t("USERS.DETAILS.SUCCESS.delete-user-socials"));
            })
            .catch((error:ErrorResponse) => {
                handleError(error);
            });
    }

    const handleDeleteOneMutation =(userUuid:string,id:number) =>{
        deleteSocial({userUuid,id})
            .unwrap()
            .then((response:UserSocials[]) => {
                dispatch(setUserSocials(response));
                toast.success(t("USERS.DETAILS.SUCCESS.delete-user-social"));
            })
            .catch((error:ErrorResponse) => {
                handleError(error);
            });
    }

    const mutationLoading = createMutationLoading || deleteMutationLoading || deleteAllMutationLoading;

    return {
        isEdit,
        setIsEdit,
        mutationLoading,
        handleCreateMutation,
        handleDeleteAllMutation,
        handleDeleteOneMutation
    }
}
