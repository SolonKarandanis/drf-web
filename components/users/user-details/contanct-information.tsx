import { Button } from '@/shared/shadcn/components/ui/button';
import {FC, useState} from 'react'
import UserEditGroupButtons from './user-edit-group-buttons';
import UserEditButton from './user-edit-button';

interface Props{
    email:string;
    phone?:string;
    country?:string;
    city?:string;
    state?:string;
    zipCode?:string;
    address?:string;
    isLoading:boolean;
}

const ContactInformation:FC<Props> = ({
    email,
    phone,
    country,
    city,
    state,
    zipCode,
    address,
    isLoading = false
}) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const handleEditButtonClick = () => {
        setIsEdit(prev => !prev);
    };

    const handleSaveButtonClick = () =>{

    }

    let location=''
    if(address){
        location += `${address}`
    }
    if(city){
        location += `, ${city}`
    }
    if(state){
        location += `, ${state}`
    }
    if(country){
        location += `, ${country}`
    }
    if(zipCode){
        location += `, ${zipCode}`
    }
    return (
        <div className="p-6 border-b border-dashed dark:border-defaultborder/10">
            <section className="flex items-center justify-between">
                <p className="text-[.9375rem] mb-2 me-6 font-semibold">
                    Contact Information :
                </p>
                {isEdit ?(
                    <UserEditGroupButtons 
                        onCancelClick={handleEditButtonClick}  
                        onSaveClick={handleSaveButtonClick}/>
                    
                ):(
                    <UserEditButton onClick={handleEditButtonClick} />
                )}
            </section>
            <div className="text-[#8c9097] dark:text-white/50">
                <div className="flex items-center mb-2">
                    <span className="avatar avatar-sm avatar-rounded me-2 bg-light text-[#8c9097] dark:text-white/50">
                        <i className="ri-mail-line align-middle text-[.875rem] text-[#8c9097] dark:text-white/50"></i>
                    </span>
                    {isLoading ? (
                        <div role="status" className="animate-pulse">
                            <div className="w-32 h-3 bg-gray-400 rounded-full dark:bg-gray-700"></div>
                        </div>
                    ):(
                        <>
                            {email}
                        </>
                    )}
                </div>
                <div className="flex items-center mb-2">
                    <span className="avatar avatar-sm avatar-rounded me-2 bg-light text-[#8c9097] dark:text-white/50">
                        <i className="ri-phone-line align-middle text-[.875rem] text-[#8c9097] dark:text-white/50"></i>
                    </span>
                    {isLoading ? (
                        <div role="status" className="animate-pulse">
                            <div className="h-3 bg-gray-400 rounded-full w-28 dark:bg-gray-700"></div>
                        </div>
                    ):(
                        <>
                            {phone}
                        </>
                    )}
                </div>
                <div className="flex items-center mb-0">
                    <span className="avatar avatar-sm avatar-rounded me-2 bg-light text-[#8c9097] dark:text-white/50">
                        <i className="ri-map-pin-line align-middle text-[.875rem] text-[#8c9097] dark:text-white/50"></i>
                    </span>
                    {isLoading ? (
                        <div role="status" className="animate-pulse">
                            <div className="w-56 h-3 bg-gray-400 rounded-full dark:bg-gray-700"></div>
                        </div>
                    ):(
                        <>
                            {location}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ContactInformation