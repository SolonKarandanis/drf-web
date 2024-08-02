import Link from 'next/link'
import {FC} from 'react'
import { FaArrowDown, FaArrowUp, FaExclamation } from "react-icons/fa";


const RecentActivity = () => {
  return (
    <div className="col-span-12 xl:col-span-8">
        <div className="box">
            <div className="w-full max-w-full ">
                <div className="relative flex flex-col h-full min-w-0 mb-6 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                    <div className="p-6 px-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                        <div className="flex flex-wrap -mx-3">
                            <div className="max-w-full px-3 md:w-1/2 md:flex-none">
                                <h6 className="mb-0 font-bold text-[.9375rem]">Recent Transactions</h6>
                            </div>
                            <div className="flex items-center justify-end max-w-full px-3 md:w-1/2 md:flex-none">
                                <i className="mr-2 far fa-calendar-alt"></i>
                                <small>23 - 30 March 2020</small>
                            </div>
                        </div>
                    </div>
                    <div className="flex-auto p-4 pt-6">
                        <h6 className="mb-4 text-xs font-bold leading-tight uppercase text-slate-500">Newest</h6>
                        <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                            <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-t-inherit text-inherit rounded-xl">
                                <div className="flex items-center">
                                    <button className="leading-pro ease-soft-in text-xs bg-[150%] w-[1.5875rem] h-[1.5875rem] p-[0.3rem] rounded-[1.875rem]
                                        tracking-tight-soft bg-x-25 mr-4 mb-0 flex cursor-pointer items-center justify-center border 
                                        border-solid border-rose-600 border-transparent bg-transparent text-center align-middle font-bold 
                                        uppercase text-rose-600 transition-all hover:opacity-75">
                                        <i className="fas fa-arrow-down text-3xs"></i>
                                        <FaArrowDown className='text-3xs'/>
                                    </button>
                                    <div className="flex flex-col">
                                        <h6 className="mb-1 text-sm leading-normal text-slate-700">Netflix</h6>
                                        <span className="text-xs leading-tight">27 March 2020, at 12:30 PM</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <p className="relative z-10 inline-block m-0 text-sm font-semibold leading-normal text-transparent bg-gradient-to-tl from-red-600 to-rose-400 bg-clip-text">- $ 2,500</p>
                                </div>
                            </li>
                            <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 border-t-0 rounded-b-inherit text-inherit rounded-xl">
                                <div className="flex items-center">
                                    <button className="leading-pro ease-soft-in text-xs bg-[150%] w-[1.5875rem] h-[1.5875rem] p-[0.3rem] rounded-[1.875rem]  
                                        tracking-tight-soft bg-x-25 mr-4 mb-0 flex cursor-pointer items-center justify-center border 
                                        border-solid border-lime-500 border-transparent bg-transparent text-center align-middle font-bold 
                                        uppercase text-lime-500 transition-all hover:opacity-75">
                                        <FaArrowUp className='text-3xs'/>
                                    </button>
                                    <div className="flex flex-col">
                                        <h6 className="mb-1 text-sm leading-normal text-slate-700">Apple</h6>
                                        <span className="text-xs leading-tight">27 March 2020, at 04:30 AM</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <p className="relative z-10 inline-block m-0 text-sm font-semibold leading-normal text-transparent bg-gradient-to-tl from-green-600 to-lime-400 bg-clip-text">+ $ 2,000</p>
                                </div>
                            </li>
                        </ul>
                        <h6 className="my-4 text-xs font-bold leading-tight uppercase text-slate-500">Yesterday</h6>
                        <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                            <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-t-inherit text-inherit rounded-xl">
                                <div className="flex items-center">
                                    <button className="leading-pro ease-soft-in text-xs bg-[150%] w-[1.5875rem] h-[1.5875rem] p-[0.3rem] rounded-[1.875rem] 
                                        tracking-tight-soft bg-x-25 mr-4 mb-0 flex cursor-pointer items-center justify-center border 
                                        border-solid border-lime-500 border-transparent bg-transparent text-center align-middle font-bold 
                                        uppercase text-lime-500 transition-all hover:opacity-75">
                                        <FaArrowUp className='text-3xs'/>
                                    </button>
                                    <div className="flex flex-col">
                                        <h6 className="mb-1 text-sm leading-normal text-slate-700">Stripe</h6>
                                        <span className="text-xs leading-tight">26 March 2020, at 13:45 PM</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <p className="relative z-10 inline-block m-0 text-sm font-semibold leading-normal text-transparent bg-gradient-to-tl from-green-600 to-lime-400 bg-clip-text">+ $ 750</p>
                                </div>
                            </li>
                            <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 border-t-0 rounded-b-inherit text-inherit rounded-xl">
                                <div className="flex items-center">
                                    <button className="leading-pro ease-soft-in text-xs bg-[150%] w-[1.5875rem] h-[1.5875rem] p-[0.3rem] rounded-[1.875rem]
                                        tracking-tight-soft bg-x-25 mr-4 mb-0 flex cursor-pointer items-center justify-center border 
                                        border-solid border-slate-700 border-transparent bg-transparent text-center align-middle font-bold 
                                        uppercase text-slate-700 transition-all hover:opacity-75">
                                        <FaExclamation className='text-3xs'/>
                                    </button>
                                    <div className="flex flex-col">
                                        <h6 className="mb-1 text-sm leading-normal text-slate-700">Webflow</h6>
                                        <span className="text-xs leading-tight">26 March 2020, at 05:00 AM</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <p className="flex items-center m-0 text-sm font-semibold leading-normal text-slate-700">Pending</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RecentActivity