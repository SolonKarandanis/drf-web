import { handleError } from "@/lib/functions";
import { ErrorResponse } from "@/models/error.models";
import { UpdateBioRequest, UpdateContactInfoRequest, UserAcount } from "@/models/user.models";
import { useUpdateContanctInfoMutation, useUpdateUserBioMutation } from "@/shared/redux/features/users/usersApiSlice";
import { setSelectedUser } from "@/shared/redux/features/users/usersSlice";
import { useAppDispatch } from "@/shared/redux/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "react-toastify";

export function useMutateUserDetails(){
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const t = useTranslations();
    const dispatch = useAppDispatch();
    const [updateContactInfo, { isLoading:contactInfoLoading }] = useUpdateContanctInfoMutation();
    const [updateBio, { isLoading:bioLoading }] = useUpdateUserBioMutation();

    const handleUpdateContanctInfoMutation = (userUuid:string, request:UpdateContactInfoRequest)=>{
        updateContactInfo({userUuid,request})
            .unwrap()
            .then((response:UserAcount ) => {
                dispatch(setSelectedUser(response));
                setIsEdit(prev => !prev);
                toast.success(t("USERS.DETAILS.SUCCESS.update-user"));
            })
            .catch((error:ErrorResponse) => {
                handleError(error);
            });
    };

    const handleUpdateBioMutation = (userUuid:string, request:UpdateBioRequest)=>{
        updateBio({userUuid,request})
            .unwrap()
            .then((response:UserAcount ) => {
                dispatch(setSelectedUser(response));
                setIsEdit(prev => !prev);
                toast.success(t("USERS.DETAILS.SUCCESS.update-user"));
            })
            .catch((error:ErrorResponse) => {
                handleError(error);
            });
    };

    const mutationLoading = contactInfoLoading || bioLoading;


    return {
        isEdit,
        setIsEdit,
        mutationLoading,
        handleUpdateContanctInfoMutation,
        handleUpdateBioMutation,
    }
}