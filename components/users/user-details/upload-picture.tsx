"use client"


import {useAppSelector } from '@/shared/redux/hooks';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { UploadProfileImageSchema, getUploadProfileImageSchema } from '@/schemas/user.schemas';
import Dropzone from '@/shared/components/dropzone/dropzone';
import { Button } from '@/shared/shadcn/components/ui/button';
import { useTranslations } from 'next-intl';
import ButtonLoading from '@/shared/components/button-loading/button-loading';
import { ChangeEvent } from 'react';
import {  userUuidSelector } from '@/shared/redux/features/users/usersSlice';
import { UploadProfileImageMutation } from '@/models/image.models';
import { useMutateUserDetails } from '../hooks/useMutateUserDetails';


const UploadPicture = () => {
    const t = useTranslations();
    const formT = useTranslations("GLOBAL.VALIDATION.IMAGES");
    const {
      mutationLoading,
      handleUploadProfilePictureMutation
  } = useMutateUserDetails();
    const userUuid: string| undefined = useAppSelector(userUuidSelector);


    const handleUploadFile=(event:ChangeEvent<HTMLInputElement>)=>{
      if (!event.target.files) return;
      const fileUpload = event.target.files[0];
      setValue("profileImage",fileUpload);
    }

    const {register,handleSubmit,formState: { errors ,isSubmitting },setValue, watch} = useForm<UploadProfileImageSchema>({
      resolver: zodResolver(getUploadProfileImageSchema(formT)),
      defaultValues:{
          profileImage:null
      }
    })
  
    const onSubmit: SubmitHandler<UploadProfileImageSchema> = async (data) => {
      if(userUuid && data){
        const {profileImage } =data;
        const uploadPofileImageRequest:UploadProfileImageMutation ={
          userUuid,
          alt: profileImage!.name,
          image:profileImage!,
          title: profileImage!.name
        }
        handleUploadProfilePictureMutation(uploadPofileImageRequest);
      }
      
        
    }

    const resetUploadProfileImage = () =>{
      setValue("profileImage",null);
    }

    const profileImage = watch("profileImage")

    return (
      <form className="container items-center w-full py-32 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="items-center max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md">
          <div className="px-4 py-6">
            <div className="flex flex-col items-center justify-center w-full gap-y-2">
              <Dropzone
                file={profileImage}
                props={register("profileImage")} 
                handleUploadFile={handleUploadFile} 
                error={errors.profileImage?.message}>
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">
                      {t("USERS.DETAILS.UPLOAD-PROFILE.title")}
                  </h5>
                  <p className="text-sm font-normal text-gray-400 md:px-6">
                      {t("USERS.DETAILS.UPLOAD-PROFILE.photo-size-less-than")}
                      <b className="text-gray-600">2mb</b>
                  </p>
                  <p className="text-sm font-normal text-gray-400 md:px-6">
                      {t("USERS.DETAILS.UPLOAD-PROFILE.should-be-format")}
                      <b className="text-gray-600">JPG, PNG, or GIF</b> 
                      {t("USERS.DETAILS.UPLOAD-PROFILE.format")}
                  </p>
              </Dropzone>
              <Button 
                  type="submit"
                  className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 
                      focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center  mb-2 cursor-pointer"
                  disabled={!profileImage ||mutationLoading}
              >
                  {mutationLoading ? 
                      <ButtonLoading /> : 
                      <span className="ml-2 text-center">
                        {t("USERS.DETAILS.BUTTONS.upload")}
                      </span>
                  }
                  
              </Button>
              <Button 
                  type="reset" 
                  variant="destructive"
                  className="w-full"
                  disabled={mutationLoading}
                  onClick={resetUploadProfileImage}>
                  {t(`GLOBAL.BUTTONS.reset`)}
              </Button>
            </div>
          </div>
        </div>
      </form>
    )
}

export default UploadPicture