"use client"



import { useAppDispatch } from '@/shared/redux/hooks';
import { useUploadUserImageMutation } from '@/shared/redux/features/users/usersApiSlice';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { UploadProfileImageSchema } from '@/schemas/user.schemas';
import { ErrorResponse } from '@/models/error.models';
import { toast } from 'react-toastify';

type Inputs = z.infer<typeof UploadProfileImageSchema>

const UploadPicture = () => {
    const dispatch = useAppDispatch();
    const [upload, { isLoading, }] = useUploadUserImageMutation();

    const {register,handleSubmit,formState: { errors ,isSubmitting },setValue} = useForm<Inputs>({
      resolver: zodResolver(UploadProfileImageSchema),
      defaultValues:{
          profileImage:undefined
      }
    })

    const handleError =(errorResponse:ErrorResponse)=>{
      const {status, data:{detail}} = errorResponse;
      toast.error(`(${status}) ${detail}`);
    }
  
  
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data)
    }


    return (
      <div>upload-picture</div>
    )
}

export default UploadPicture