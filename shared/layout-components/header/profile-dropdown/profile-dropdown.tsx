'use client';

import Link from 'next/link'
import Image from "next/image";
import { useSession } from 'next-auth/react';
import { getUserGroupsCapitalized } from '@/utils/user-utils';
import { useAppSelector } from '@/shared/redux/hooks';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from '@/shared/shadcn/components/ui/dropdown-menu';


const ProfileDropdown = ()=> {
    const {data} = useSession();
    const configState = useAppSelector((state)=>state.config);
    const host = configState.djangoHost
    const path = configState.baseUrl
    
    if(!data){
        return null
    }
    const loggedUser = data.user!;
    const groupNames =getUserGroupsCapitalized(loggedUser);
    
    // const imagePath = image.image ?   `${host}${image.image}` : `${path}/assets/images/ecommerce/png/16.png`;
    return (
        <div className="header-element md:!px-[0.65rem] px-2 hs-dropdown !items-center 
            ti-dropdown [--placement:bottom-left] profile-data">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className='flex flex-row items-center'>
                        <button id="dropdown-profile" type="button"
                            className="hs-dropdown-toggle ti-dropdown-toggle !gap-2 !p-0 flex-shrink-0 sm:me-2 me-0 !rounded-full !shadow-none text-xs align-middle !border-0 !shadow-transparent ">
                            <Image
                                alt="Image Description"
                                src={`${path}/assets/images/faces/9.jpg`}
                                width={32}
                                height={32}
                                sizes="100vw"
                                className="inline-block rounded-full "
                            />
                        </button>
                        <div className="hidden md:block dropdown-profile">
                            <p className="font-semibold mb-0 leading-none text-[#536485] text-[0.813rem] ">
                                {loggedUser?.firstName} {loggedUser?.lastName}
                            </p>
                            <span className="opacity-[0.7] font-normal text-[#536485] block text-[0.6875rem] ">
                                {groupNames.join(', ')}
                            </span>
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" >
                    <div
                        className="hs-dropdown-menu  !mt-3 border-0 w-[11rem] !p-0 border-defaultborder main-header-dropdown  pt-0 overflow-hidden header-profile-dropdown dropdown-menu-end"
                        aria-labelledby="dropdown-profile">
                        <DropdownMenuLabel className='py-2'>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <ul className="text-defaulttextcolor font-medium dark:text-[#8c9097] dark:text-white/50">
                            <li className='hover:bg-violet-300'>
                                <Link className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0  !p-[0.65rem] !inline-flex" href="#!">
                                    <i className="ti ti-user-circle text-[1.125rem] me-2 opacity-[0.7]"></i>Profile
                                </Link>
                            </li>
                            <li className='hover:bg-violet-300'>
                                <Link className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0  !p-[0.65rem] !inline-flex " href="#!">
                                    <i className="ti ti-inbox text-[1.125rem] me-2 opacity-[0.7]"></i>Inbox 
                                    <span className="!py-1 !px-[0.45rem] !font-semibold !rounded-sm text-success text-[0.75em] bg-success/10 ms-auto">25</span>
                                </Link>
                            </li>
                            <li className='hover:bg-violet-300'>
                                <Link className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0 !p-[0.65rem] !inline-flex" href="#!">
                                    <i className="ti ti-clipboard-check text-[1.125rem] me-2 opacity-[0.7]"></i>Task Manager
                                </Link>
                            </li>
                            <li className='hover:bg-violet-300'>
                                <Link className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0 !p-[0.65rem] !inline-flex" href="#!">
                                    <i className="ti ti-adjustments-horizontal text-[1.125rem] me-2 opacity-[0.7]"></i>Settings
                                </Link>
                            </li>
                            <li className='hover:bg-violet-300'>
                                <Link className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0 !p-[0.65rem] !inline-flex " href="#!">
                                    <i className="ti ti-wallet text-[1.125rem] me-2 opacity-[0.7]"></i>Bal: $7,12,950
                                </Link>
                            </li>
                            <li className='hover:bg-violet-300'>
                                <Link className="w-full ti-dropdown-item !text-[0.8125rem] !p-[0.65rem] !gap-x-0 !inline-flex" href="#!">
                                    <i className="ti ti-headset text-[1.125rem] me-2 opacity-[0.7]"></i>Support
                                </Link>
                            </li>
                            <li className='hover:bg-violet-300'>
                                <Link className="w-full ti-dropdown-item !text-[0.8125rem] !p-[0.65rem] !gap-x-0 !inline-flex" href="/api/auth/signout?callbackUrl=/">
                                    <i className="ti ti-logout text-[1.125rem] me-2 opacity-[0.7]"></i>Log Out
                                </Link>
                            </li>
                        </ul>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default ProfileDropdown