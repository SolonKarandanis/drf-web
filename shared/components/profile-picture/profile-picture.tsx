"use client";

import {FC} from 'react'
import Image from "next/image";
import { DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from '@/shared/shadcn/components/ui/dropdown-menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/shared/redux/hooks';

interface Props{
}

const ProfilePicture:FC<Props> = () => {
    const pathname = usePathname();
    const configState = useAppSelector((state) => state.config);
    const profileImage = useAppSelector((state)=> state.users.userProfileImage);
    const host = configState.djangoHost
    const path = configState.baseUrl
    const imagePath = profileImage ?   `${host}${profileImage.image}` : `${path}/assets/images1/faces/21.jpg`;
    const splitArray = pathname.split("/")
    const locale = splitArray[1];
    const usersUrl = splitArray[2];
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger >
                    <span className="relative avatar avatar-xxl avatar-rounded online me-4">
                        <Image
                            src={`${imagePath}`}
                            alt={profileImage?.alt || 'no-image'}
                            sizes="100vw"
                            width={700}
                            height={475}
                        />
                    </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Profile Picture</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link 
                            href={`/${locale}/${usersUrl}/image/${profileImage?.id}`}>
                            Show Profile Picture
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Upload a new Picture
                        <input 
                            className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="default_size" type="file" />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default ProfilePicture