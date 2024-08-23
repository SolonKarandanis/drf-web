import {FC} from 'react'
import Image from "next/image";
import { DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from '@/shared/shadcn/components/ui/dropdown-menu';
import { Dialog,DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/shared/shadcn/components/ui/dialog'

interface Props{
    imagePath:string;
    title?:string;
    alt?:string;
}

const ProfilePicture:FC<Props> = ({
    imagePath,
    alt,
    title
}) => {
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
                    
                    {/* {image ? (
                        <Image
                            src={`${host}${image.image}`}
                            alt={image.alt || ''}
                            sizes="100vw"
                            width={700}
                            height={475}
                        />
                    ):(
                        
                        <Image
                            alt="no-image"
                            src={`${path}/assets/images1/faces/21.jpg`}
                            width={700}
                            height={475}
                            sizes="100vw"
                            className="h-[1.25rem] w-[1.25rem] rounded-full"
                        />
                        
                    )} */}
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Profile Picture</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    Show Profile Picture
                    <Dialog>
                        <DialogTrigger asChild>
                            Show Profile Picture
                        </DialogTrigger>
                        <DialogContent className="p-0 bg-transparent border-0 max-w-7xl">
                            <DialogDescription>
                                Description
                            </DialogDescription>
                            <DialogTitle>{title || 'no-image'}</DialogTitle>
                            <div className="relative h-[calc(100vh-220px)] w-full overflow-clip rounded-md bg-transparent shadow-md">
                                <Image src={`${imagePath}`} fill alt={alt || ''} className="object-contain w-full h-full" />
                            </div>
                        </DialogContent>
                    </Dialog>
                </DropdownMenuItem>
                <DropdownMenuItem>Upload a new Picture</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default ProfilePicture