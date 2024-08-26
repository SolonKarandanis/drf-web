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

interface Props{
    imagePath:string;
    imageId?:number;
    alt?:string;
}

const ProfilePicture:FC<Props> = ({
    imagePath,
    imageId,
    alt
}) => {
    const pathname = usePathname();
    // console.log(pathname)
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <span className="relative avatar avatar-xxl avatar-rounded online me-4">
                        <Image
                            src={`${imagePath}`}
                            alt={alt || 'no-image'}
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
                        <Link  href={`/en/users/image/${imageId}`}>
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