"use client"

import { Modal } from '@/shared/components/modal/modal'
import  { ChangeEvent, useState } from 'react'

const UploadProfileImageModal = () => {
    const [file, setFile] = useState<File>();

    const handleUploadFile=(event:ChangeEvent<HTMLInputElement>)=>{
        if (!event.target.files) return;
        const fileUpload = event.target.files[0];
        setFile(fileUpload);
    }

    return (
        <div>
            <Modal description='Upload Profile Image' title='Upload File'>
                <section className="container items-center w-full py-32 mx-auto">
                    <div className="items-center max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md">
                        <div className="px-4 py-6">
                            <div id="image-preview" 
                                className="items-center max-w-sm p-6 mx-auto mb-4 text-center bg-gray-100 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer">
                                <input id="upload" type="file" className="hidden" accept="image/*" />
                                <label htmlFor="upload" className="flex flex-col gap-y-0.5 cursor-pointer">
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
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="w-full">
                                    <label className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 
                                        focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer">
                                        <span className="ml-2 text-center">Upload</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Modal>
        </div>
    )
}

export default UploadProfileImageModal