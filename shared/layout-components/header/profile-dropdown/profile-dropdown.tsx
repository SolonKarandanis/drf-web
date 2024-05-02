'use client';

import Link from 'next/link'
import { FC } from 'react'
import Image from "next/image";
import { useAppSelector } from '@/shared/redux/hooks';
import { useSession } from 'next-auth/react';

type Props = {
	path?: string;
}


const ProfileDropdown:FC<Props> = ({path})=> {
    const {data} = useSession();
    const loggedUser = data?.user;
    return (
        <div className="header-element md:!px-[0.65rem] px-2 hs-dropdown !items-center 
            ti-dropdown [--placement:bottom-left] profile-data">
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
                <p className="font-semibold mb-0 leading-none text-[#536485] text-[0.813rem] ">{loggedUser?.first_name} {loggedUser?.last_name}</p>
                <span className="opacity-[0.7] font-normal text-[#536485] block text-[0.6875rem] ">Web Designer</span>
            </div>
            <div
                className="hs-dropdown-menu ti-dropdown-menu !-mt-3 border-0 w-[11rem] !p-0 border-defaultborder hidden main-header-dropdown  pt-0 overflow-hidden header-profile-dropdown dropdown-menu-end"
                aria-labelledby="dropdown-profile">

                <ul className="text-defaulttextcolor font-medium dark:text-[#8c9097] dark:text-white/50">
                <li>
                    <Link className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0  !p-[0.65rem] !inline-flex" href="#!">
                    <i className="ti ti-user-circle text-[1.125rem] me-2 opacity-[0.7]"></i>Profile
                    </Link>
                </li>
                <li>
                    <Link className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0  !p-[0.65rem] !inline-flex" href="#!"><i
                    className="ti ti-inbox text-[1.125rem] me-2 opacity-[0.7]"></i>Inbox <span
                        className="!py-1 !px-[0.45rem] !font-semibold !rounded-sm text-success text-[0.75em] bg-success/10 ms-auto">25</span>
                    </Link>
                </li>
                <li><Link className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0 !p-[0.65rem] !inline-flex" href="#!"><i
                    className="ti ti-clipboard-check text-[1.125rem] me-2 opacity-[0.7]"></i>Task Manager</Link></li>
                <li><Link className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0 !p-[0.65rem] !inline-flex" href="#!"><i
                    className="ti ti-adjustments-horizontal text-[1.125rem] me-2 opacity-[0.7]"></i>Settings</Link></li>
                <li><Link className="w-full ti-dropdown-item !text-[0.8125rem] !gap-x-0 !p-[0.65rem] !inline-flex " href="#!"><i
                    className="ti ti-wallet text-[1.125rem] me-2 opacity-[0.7]"></i>Bal: $7,12,950</Link></li>
                <li><Link className="w-full ti-dropdown-item !text-[0.8125rem] !p-[0.65rem] !gap-x-0 !inline-flex" href="#!"><i
                    className="ti ti-headset text-[1.125rem] me-2 opacity-[0.7]"></i>Support</Link></li>
                <li><Link className="w-full ti-dropdown-item !text-[0.8125rem] !p-[0.65rem] !gap-x-0 !inline-flex" href="#!"><i
                    className="ti ti-logout text-[1.125rem] me-2 opacity-[0.7]"></i>Log Out</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default ProfileDropdown