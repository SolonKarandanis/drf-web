"use client"

import  { ChangeEvent, FC, ReactNode, useState } from 'react'
import Image from "next/image";
import { Button } from '@/shared/shadcn/components/ui/button';
import ButtonLoading from '../button-loading/button-loading';
import { useTranslations } from 'next-intl';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler} from 'react-hook-form'
import { UploadProfileImageSchema } from '@/schemas/user.schemas';
import { useAppDispatch } from '@/shared/redux/hooks';
import { useUploadUserImageMutation } from '@/shared/redux/features/users/usersApiSlice';
import { RegisterProps } from '../props';
import CFormError from '../form-error/cform-error';


type Inputs = z.infer<typeof UploadProfileImageSchema>

interface Props{
    children?:ReactNode;
    setUploadFile:(file:File)=> void;
    props?:RegisterProps,
    error?:string,
}



const Dropzone:FC<Props> = ({
    children,
    setUploadFile,
    props,
    error
}) => {
    const t = useTranslations();
    const [file, setFile] = useState<File| null>();

    const handleUploadFile=(event:ChangeEvent<HTMLInputElement>)=>{
        if (!event.target.files) return;
        const fileUpload = event.target.files[0];
        setFile(fileUpload);
        setUploadFile(fileUpload);
    }

    const errorHtml = error ? (<CFormError error={error} />) : null;


    return (
        <div id="image-preview" 
            className="items-center max-w-sm p-6 mx-auto mb-4 text-center bg-gray-100 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer">
            {file ? 
                (
                    <Image
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        sizes="100vw"
                        width={700}
                        height={475}
                    />
                ):
                
                (
                    <>
                        <input id="upload" type="file" className="hidden" accept="image/*" {...(props ?? {})} onChange={handleUploadFile}/>
                        <label htmlFor="upload" className="flex flex-col gap-y-0.5 cursor-pointer">
                            {children}
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                                className="w-8 h-8 mx-auto mb-4 text-gray-700">
                                <path strokeLinecap="round" strokeLinejoin="round" 
                                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                            
                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">
                                Upload picture
                            </h5>
                            <p className="text-sm font-normal text-gray-400 md:px-6">
                                Choose photo size should be less than 
                                <b className="text-gray-600">2mb</b>
                            </p>
                            <p className="text-sm font-normal text-gray-400 md:px-6">
                                and should be in 
                                <b className="text-gray-600">JPG, PNG, or GIF</b> format.
                            </p>
                            <span id="filename" className="z-50 text-gray-500 bg-gray-200"></span>
                        </label>
                    </>
                )
            
            }
            {errorHtml}
        </div>
    )
}

export default Dropzone