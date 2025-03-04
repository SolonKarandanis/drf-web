"use client";

import {FC} from 'react'
import ProfilePicture from '@/shared/components/profile-picture/profile-picture';
import { useTranslations } from 'next-intl';

interface Props{
    firstName:string;
    lastName:string;
    roles:string;
    country?:string;
    city?:string;
}

const Profile:FC<Props> = ({
    firstName,
    lastName,
    city,
    country,
    roles,
}) => {
    const t = useTranslations();
    return (
        <div className="items-start p-6 sm:flex main-profile-cover">
            <div>
                <ProfilePicture />
            </div>
            <div className="flex-grow main-profile-info">
                <div className="flex items-center !justify-between">
                    <h6 className="font-semibold mb-1 text-black text-[1rem]">{firstName} {lastName}</h6>
                    <div>
                        <p className="mb-2 font-semibold ms-2">{t("USERS.DETAILS.LABELS.profile")} 60% {t("USERS.DETAILS.LABELS.completed")}</p>
                        <div className="progress progress-xs progress-animate">
                            <div className="progress-bar bg-primary w-[60%]" ></div>
                        </div>
                    </div>
                </div>
                <p className="mb-1 text-black  opacity-[0.7]">{roles}</p>
                <p className="text-[0.75rem] text-black mb-6 opacity-[0.5]">
                    <span className="inline-flex text-black me-4"><i className="align-middle ri-building-line me-1"></i>{country}</span>
                    <span className="inline-flex text-black"><i className="align-middle ri-map-pin-line me-1"></i>{city}</span>
                </p>
                <div className="flex mb-0">
                    <div className="me-6">
                        <p className="font-bold text-[1.25rem] text-black text-shadow mb-0">113</p>
                        <p className="mb-0 text-[.6875rem] opacity-[0.5] text-black">Products</p>
                    </div>
                    <div className="me-6">
                        <p className="font-bold text-[1.25rem] text-black text-shadow mb-0">12.2k</p>
                        <p className="mb-0 text-[.6875rem] opacity-[0.5] text-black">Orders</p>
                    </div>
                    <div className="me-6">
                        <p className="font-bold text-[1.25rem] text-black text-shadow mb-0">128</p>
                        <p className="mb-0 text-[.6875rem] opacity-[0.5] text-black">Following</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile

 {/* <span className="relative avatar avatar-xxl avatar-rounded online me-4">
                    
                    {image ? (
                        <ZoomableImage
                            alt={image.alt}
                            title={image.title}
                            src={`${host}${image.image}`}/>
                        ): (
                            <Image
                                alt="no-image"
                                src={`${path}/assets/images1/faces/21.jpg`}
                                width={700}
                                height={475}
                                sizes="100vw"
                                className="h-[1.25rem] w-[1.25rem] rounded-full"
                            />
                        )}
                        <div className="absolute flex items-center justify-center transition duration-500 rounded-full cursor-pointer w-14 h-14 group hover:bg-gray-200 opacity-60">
                            <Image
                                alt="upload-image"
                                src={`${path}/assets/images1/media/upload.svg`}
                                width={700}
                                height={475}
                                sizes="100vw"
                                className="w-12 group-hover:block"
                            />
                        </div>
                </span> */}