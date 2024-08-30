"use client"


import { useAppDispatch } from '@/shared/redux/hooks';
import { useUploadUserImageMutation } from '@/shared/redux/features/users/usersApiSlice';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { UploadProfileImageSchema } from '@/schemas/user.schemas';
import { ErrorResponse } from '@/models/error.models';
import { toast } from 'react-toastify';
import Dropzone from '@/shared/components/dropzone/dropzone';
import { Button } from '@/shared/shadcn/components/ui/button';
import { useTranslations } from 'next-intl';
import ButtonLoading from '@/shared/components/button-loading/button-loading';

type Inputs = z.infer<typeof UploadProfileImageSchema>

const UploadPicture = () => {
    const t = useTranslations();
    const dispatch = useAppDispatch();
    const [upload, { isLoading, }] = useUploadUserImageMutation();

    const {register,handleSubmit,formState: { errors ,isSubmitting },setValue, watch} = useForm<Inputs>({
      resolver: zodResolver(UploadProfileImageSchema),
      defaultValues:{
          profileImage:null
      }
    })

    const handleError =(errorResponse:ErrorResponse)=>{
      const {status, data:{detail}} = errorResponse;
      toast.error(`(${status}) ${detail}`);
    }
  
  
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data)
    }

    const handleSetUploadProfileImage = (file:File| null) =>{
      setValue("profileImage",file);
    }

    const profileImage = watch("profileImage")

    return (
      <form className="container items-center w-full py-32 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="items-center max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md">
          <div className="px-4 py-6">
            <div className="flex flex-col items-center justify-center w-full gap-y-2">
              <Dropzone 
                props={register("profileImage")} 
                setUploadFile={handleSetUploadProfileImage} 
                error={errors.profileImage?.message}>
              </Dropzone>
              <Button 
                  type="submit"
                  className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 
                      focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center  mb-2 cursor-pointer"
                  disabled={!profileImage ||isLoading}
              >
                  {isLoading ? 
                      <ButtonLoading /> : 
                      <span className="ml-2 text-center">Upload</span>
                  }
                  
              </Button>
              <Button 
                  type="reset" 
                  variant="destructive"
                  className="w-full"
                  disabled={isLoading}
                  onClick={()=>handleSetUploadProfileImage(null)}>
                  {t(`GLOBAL.BUTTONS.reset`)}
              </Button>
            </div>
          </div>
        </div>
      </form>
    )
}

export default UploadPicture