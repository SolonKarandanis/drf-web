"use client";

import {FC, useEffect} from 'react'
import { useAction } from "next-safe-action/hooks"
import { getUserSocialsAction } from '@/actions/get-user-socials'

interface Props{
    userUuid:string;
}

const SocialNetworks:FC<Props> = ({userUuid}) => {
    const { execute, result } = useAction(getUserSocialsAction);
    useEffect(()=>{
        // execute({ uuid:userUuid });
    },[])
    return (
        <div className="items-center p-6 border-b border-dashed dark:border-defaultborder/10 sm:flex">
            <p className="text-[.9375rem] mb-2 me-6 font-semibold">
                Social Networks :
            </p>
            <div className="mb-0 btn-list">
            <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-primary text-primary me-[.375rem] mb-1">
                <i className="font-semibold ri-facebook-line"></i>
            </button>
            <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-secondary me-[.375rem] mb-1">
                <i className="font-semibold ri-twitter-line"></i>
            </button>
            <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-warning me-[.375rem] mb-1">
                <i className="font-semibold ri-instagram-line"></i>
            </button>
            <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-success me-[.375rem] mb-1">
                <i className="font-semibold ri-github-line"></i>
            </button>
            <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-danger me-[.375rem] mb-1">
                <i className="font-semibold ri-youtube-line"></i>
            </button>
            </div>
        </div>
    )
}

export default SocialNetworks