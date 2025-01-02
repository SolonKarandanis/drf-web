"use client"

import  { ChangeEvent, FC,PropsWithChildren } from 'react'
import Image from "next/image";
import { RegisterProps } from '../props';
import CFormError from '../form-error/form-error';

interface Props{
    handleUploadFile:(event:ChangeEvent<HTMLInputElement>)=>void;
    props?:RegisterProps,
    error?:string,
    file:File | null
}



const Dropzone:FC<PropsWithChildren<Props>> = ({
    children,
    handleUploadFile,
    props,
    error,
    file
}) => {
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
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                                className="w-8 h-8 mx-auto mb-4 text-gray-700">
                                <path strokeLinecap="round" strokeLinejoin="round" 
                                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                            {children}
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