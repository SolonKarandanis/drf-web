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
import { usePathname, useRouter } from 'next/navigation';
import { useAppSelector } from '@/shared/redux/hooks';
import { Button } from '@/shared/shadcn/components/ui/button';

interface Props{
}

const ProfilePicture:FC<Props> = () => {
    const pathname = usePathname();
    const router = useRouter()
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
                        <Button
                            type="submit" 
                            variant="outline"
                            disabled={!profileImage}
                            onClick={() => router.push(`/${locale}/${usersUrl}/image/${profileImage?.id}`)}>
                            Show Profile Picture
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Button
                            type="submit" 
                            variant="outline"
                            onClick={() => router.push(`/${locale}/${usersUrl}/image/upload`)}>
                            Upload a new Picture
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default ProfilePicture