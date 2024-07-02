"use client";

import { useGetUserSocialsQuery } from '@/shared/redux/features/users/usersApiSlice';
import {FC} from 'react'


interface Props{
    userUuid:string;
}

const SocialNetworks:FC<Props> = ({userUuid}) => {
    const {data: socials,isLoading,} = useGetUserSocialsQuery(userUuid);
    if (isLoading) return <div>Loading...</div>
    return (
        <div className="items-center p-6 border-b border-dashed dark:border-defaultborder/10 sm:flex">
            <p className="text-[.9375rem] mb-2 me-6 font-semibold">
                Social Networks :
            </p>
            <div className="mb-0 btn-list">
                {socials?.map(social=> (
                    <button 
                        key={social.id} 
                        aria-label="button" 
                        type="button" 
                        className={`ti-btn ti-btn-sm mb-1 ${social.buttonCssClass}`}>
                        <a href={social.url} className={`font-semibold ${social.socialIcon}`}></a>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default SocialNetworks