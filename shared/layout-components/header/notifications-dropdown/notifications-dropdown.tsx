'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/shadcn/components/ui/dropdown-menu";
import Link from "next/link"
import { useState } from "react"


const NotificationsDropdown = () => {
    const span1 = <span className="text-warning">ID: #1116773</span>
    const span2 = <span className="text-success">ID: 7731116</span>
  
    const notifydata = [
      { id: 1, class: "Your Order Has Been Shipped", data: "Order No: 123456 Has Shipped To Your Delivery Address", icon: "gift", class2: "", color: "primary" },
      { id: 2, class: "Discount Available", data: "Discount Available On Selected Products", icon: "discount-2", class2: "", color: "secondary" },
      { id: 3, class: "Account Has Been Verified", data: "Your Account Has Been Verified Sucessfully", icon: "user-check", class2: "", color: "pink" },
      { id: 4, class: "Order Placed", data: "Order Placed Successfully", icon: "circle-check", class2: span1, color: "warning" },
      { id: 5, class: "Order Delayed", data: "Order Delayed Unfortunately", icon: "clock", class2: span2, color: "success" },
    ]
 
    const [notifications, setNotifications] = useState([...notifydata]);
    
    const handleNotificationClose = (index:number) => {
        const updatedNotifications = [...notifications];
        updatedNotifications.splice(index, 1);
        setNotifications(updatedNotifications);
    };
    
    const handleRemoveNotification = (notificationId:number) => {
        // Handle remove logic for notifications here
        // For example, you can filter out the notification with the given notificationId
        const updatedNotifications = notifications.filter((notification) => notification.id !== notificationId);
        setNotifications(updatedNotifications);
    };
 
    return (
        <div className="header-element py-[1rem] md:px-[0.65rem] px-2 notifications-dropdown 
                header-notification hs-dropdown ti-dropdown !hidden md:!block [--placement:bottom-right]">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <button id="dropdown-notification" type="button"
                    className="hs-dropdown-toggle relative ti-dropdown-toggle !p-0 !border-0 flex-shrink-0  !rounded-full !shadow-none align-middle text-xs">
                    <i className="bx bx-bell header-link-icon  text-[1.125rem]"></i>
                    <span className="flex absolute h-5 w-5 -top-[0.25rem] end-0  -me-[0.6rem]">
                        <span
                            className="animate-slow-ping absolute inline-flex -top-[2px] -start-[2px] h-full w-full rounded-full bg-secondary/40 opacity-75"></span>
                        <span
                            className="relative inline-flex justify-center items-center rounded-full  h-[14.7px] w-[14px] bg-secondary text-[0.625rem] text-white bg-sky-500"
                            id="notification-icon-badge">{notifications.length}
                        </span>
                    </span>
                </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        <div className="ti-dropdown-header !m-0 !p-4 !bg-transparent flex justify-between items-center">
                            <p className="mb-0 text-[1.0625rem] text-defaulttextcolor font-semibold dark:text-[#8c9097] 
                            dark:text-white/50">
                                Notifications
                            </p>
                            <span className="text-[0.75em] py-[0.25rem/2] px-[0.45rem] font-[600] rounded-sm bg-secondary/10 text-secondary bg-sky-500"
                                id="notifiation-data">{`${notifications.length} Unread`}</span>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="main-header-dropdown !-mt-3 !p-0 hs-dropdown-menu 
                        bg-white !w-[22rem] border-0 border-defaultborder !m-0"
                        aria-labelledby="dropdown-notification">
                        <ul className="list-none !m-0 !p-0 end-0" id="header-notification-scroll">
                            {notifications.map((idx, index) => (
                                <li className="ti-dropdown-item dropdown-item hover:bg-violet-300" key={index}>
                                    <div className="flex items-start">
                                        <div className="pe-2">
                                            <span
                                                className={`inline-flex text-${idx.color} justify-center items-center !w-[2.5rem] !h-[2.5rem] !leading-[2.5rem] !text-[0.8rem] !bg-${idx.color}/10 !rounded-[50%]`}><i
                                                className={`ti ti-${idx.icon} text-[1.125rem]`}></i></span>
                                        </div>
                                        <div className="flex items-center justify-between grow">
                                            <div>
                                                <p className="mb-0 text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50 text-[0.8125rem] font-semibold"><Link
                                                href="#!">{idx.class} {idx.class2}</Link></p>
                                                <span className="text-[#8c9097] dark:text-white/50 font-normal text-[0.75rem] header-notification-text">{idx.data}</span>
                                            </div>
                                            <div>
                                                <Link aria-label="anchor" href="#!" className="min-w-fit text-[#8c9097] dark:text-white/50 me-1 dropdown-item-close1" onClick={(event) => handleNotificationClose(index)}><i
                                                className="ti ti-x text-[1rem]"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className={`p-4 empty-header-item1 border-t mt-2 ${notifications.length === 0 ? 'hidden' : 'block'}`}>
                            <div className="grid">
                                <Link href="#!" className="ti-btn ti-btn-primary-full !m-0 w-full p-2">View All</Link>
                            </div>
                        </div>
                        <div className={`p-[3rem] empty-item1 ${notifications.length === 0 ? 'block' : 'hidden'}`}>
                            <div className="text-center">
                                <span className="!h-[4rem]  !w-[4rem] avatar !leading-[4rem] !rounded-full !bg-secondary/10 !text-secondary">
                                    <i className="ri-notification-off-line text-[2rem]  "></i>
                                </span>
                                <h6 className="font-semibold mt-3 text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50 text-[1rem]">No New Notifications</h6>
                            </div>
                        </div>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default NotificationsDropdown