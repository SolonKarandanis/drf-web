import { handleError } from "@/lib/functions";
import { ErrorResponse } from "@/models/error.models";
import { ImageModel, UploadProfileImageMutation } from "@/models/image.models";
import { UpdateBioRequest, UpdateContactInfoRequest, UserAcount } from "@/models/user.models";
import { useUpdateContanctInfoMutation, useUpdateUserBioMutation, useUploadUserImageMutation } from "@/shared/redux/features/users/usersApiSlice";
import { setProfileImage, setSelectedUser, userBioSelector } from "@/shared/redux/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export function useMutateUserDetails(){
    const router = useRouter();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const t = useTranslations();
    const dispatch = useAppDispatch();
    const [updateContactInfo, { isLoading:contactInfoLoading }] = useUpdateContanctInfoMutation();
    const [updateBio, { isLoading:bioLoading }] = useUpdateUserBioMutation();
    const [upload, { isLoading:pictureLoading }] = useUploadUserImageMutation();

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

    const handleUploadProfilePictureMutation = (request:UploadProfileImageMutation) =>{
        upload(request)
            .unwrap()
            .then((response:ImageModel)=>{
                dispatch(setProfileImage(response));
                router.back()
            })
            .catch((error:ErrorResponse) => {
                handleError(error);
            });
    };

    const mutationLoading = contactInfoLoading || bioLoading || pictureLoading;

    const bio = useAppSelector(userBioSelector);


    return {
        isEdit,
        setIsEdit,
        mutationLoading,
        handleUpdateContanctInfoMutation,
        handleUpdateBioMutation,
        handleUploadProfilePictureMutation,
        bio,
    }
}