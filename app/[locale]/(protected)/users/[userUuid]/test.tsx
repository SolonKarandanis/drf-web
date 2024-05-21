"use client"

import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar';
import Link from 'next/link';

const Test = () => {
  return (
    <PerfectScrollbar>
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 xxl:col-span-12 xl:col-span-12 lg:col-span-12 md:col-span-12">
                <div className="border rounded dark:border-defaultborder/10">
                    <div className="flex flex-wrap items-start p-4">
                    <div className="me-2">
                        <span className="avatar avatar-sm avatar-rounded">
                            <img src="../../../assets/images/faces/9.jpg" alt="" />
                        </span>
                    </div>
                    <div className="flex-grow">
                        <p className="mb-1 font-semibold leading-none">You</p>
                        <p className="text-[.6875rem] mb-2 text-[#8c9097] dark:text-white/50">24, Dec - 04:32PM</p>
                        <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mb-4">As opposed to using Content here 👌</p>
                        <div className="flex items-center justify-between mb-2 md:mb-0">
                            <div>
                                <div className="btn-list">
                                    <button type="button" className="ti-btn ti-btn-primary !me-[.375rem] !py-1 !px-2 !text-[0.75rem] !font-medium btn-wave">
                                        Comment
                                    </button>
                                    <button aria-label="button" type="button" className="ti-btn !me-[.375rem] ti-btn-sm ti-btn-success">
                                        <i className="ri-thumb-up-line"></i>
                                    </button>
                                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-danger">
                                        <i className="ri-share-line"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div>
                            <span className="badge bg-primary/10 text-primary me-2">Fashion</span>
                        </div>
                        <div>
                            <div className="hs-dropdown ti-dropdown">
                                <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-light" aria-expanded="false">
                                    <i className="ti ti-dots-vertical"></i>
                                </button>
                                <ul className="hidden hs-dropdown-menu ti-dropdown-menu">
                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="#!">Delete</Link></li>
                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="#!">Hide</Link></li>
                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="#!">Edit</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="col-span-12 xxl:col-span-12 xl:col-span-12 lg:col-span-12 md:col-span-12">
                <div className="border rounded dark:border-defaultborder/10">
                    <div className="flex flex-wrap items-start p-4">
                    <div className="me-2">
                        <span className="avatar avatar-sm avatar-rounded">
                            <img src="../../../assets/images/faces/9.jpg" alt="" />
                        </span>
                    </div>
                    <div className="flex-grow">
                        <p className="mb-1 font-semibold leading-none">You</p>
                        <p className="text-[.6875rem] mb-2 text-[#8c9097] dark:text-white/50">26, Dec - 12:45PM</p>
                        <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mb-1">Shared pictures with 4 of friends <span>Hiren,Sasha,Biden,Thara</span>.</p>
                        <div className="flex justify-between mb-4 leading-none">
                            <div>
                                <Link aria-label="anchor" href="#!">
                                    <span className="avatar avatar-md me-1">
                                        <img src="../../../assets/images/media/media-52.jpg" alt="" />
                                    </span>
                                </Link>
                                <Link aria-label="anchor" href="#!">
                                    <span className="avatar avatar-md me-1">
                                        <img src="../../../assets/images/media/media-56.jpg" alt="" />
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mb-2 md:mb-0">
                            <div>
                                <div className="btn-list">
                                    <button type="button" className="ti-btn ti-btn-primary !me-[.375rem] !py-1 !px-2 !text-[0.75rem] !font-medium btn-wave">
                                        Comment
                                    </button>
                                    <button aria-label="button" type="button" className="ti-btn !me-[.375rem] ti-btn-sm ti-btn-success">
                                        <i className="ri-thumb-up-line"></i>
                                    </button>
                                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-danger">
                                        <i className="ri-share-line"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-start">
                            <div>
                                <span className="badge bg-success/10 text-secondary me-2">Nature</span>
                            </div>
                            <div>
                                <div className="hs-dropdown ti-dropdown">
                                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-light" aria-expanded="false">
                                        <i className="ti ti-dots-vertical"></i>
                                    </button>
                                    <ul className="hidden hs-dropdown-menu ti-dropdown-menu">
                                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="#!">Delete</Link></li>
                                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="#!">Hide</Link></li>
                                        <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="#!">Edit</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="block mt-4 avatar-list-stacked text-end">
                            <span className="avatar avatar-xs avatar-rounded">
                                <img src="../../../assets/images/faces/2.jpg" alt="img" />
                            </span>
                            <span className="avatar avatar-xs avatar-rounded">
                                <img src="../../../assets/images/faces/8.jpg" alt="img" />
                            </span>
                            <span className="avatar avatar-xs avatar-rounded">
                                <img src="../../../assets/images/faces/2.jpg" alt="img" />
                            </span>
                            <span className="avatar avatar-xs avatar-rounded">
                                <img src="../../../assets/images/faces/10.jpg" alt="img" />
                            </span>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="col-span-12 xxl:col-span-12 xl:col-span-12 lg:col-span-12 md:col-span-12">
                <div className="border rounded dark:border-defaultborder/10">
                    <div className="flex flex-wrap items-start p-4">
                    <div className="me-2">
                        <span className="avatar avatar-sm avatar-rounded">
                            <img src="../../../assets/images/faces/9.jpg" alt="" />
                        </span>
                    </div>
                    <div className="flex-grow">
                        <p className="mb-1 font-semibold leading-none">You</p>
                        <p className="text-[.6875rem] mb-2 text-[#8c9097] dark:text-white/50">29, Dec - 09:53AM</p>
                        <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mb-1">Sharing an article that excites me about nature more than what i thought.</p>
                        <p className="mb-4 profile-post-link">
                            <Link href="#!" className="text-[0.75rem] text-primary">
                                <u>https://www.discovery.com/ nature/caring-for-coral</u>
                            </Link>
                        </p>
                        <div className="flex items-center justify-between mb-2 md:mb-0">
                            <div>
                                <div className="btn-list">
                                    <button type="button" className="ti-btn ti-btn-primary !me-[.375rem] !py-1 !px-2 !text-[0.75rem] !font-medium btn-wave">
                                        Comment
                                    </button>
                                    <button aria-label="button" type="button" className="ti-btn !me-[.375rem] ti-btn-sm ti-btn-success">
                                        <i className="ri-thumb-up-line"></i>
                                    </button>
                                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-danger">
                                        <i className="ri-share-line"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div>
                            <span className="badge bg-secondary/10 text-secondary me-2">Travel</span>
                        </div>
                        <div className="hs-dropdown ti-dropdown">
                            <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-light" aria-expanded="false">
                                <i className="ti ti-dots-vertical"></i>
                            </button>
                            <ul className="hidden hs-dropdown-menu ti-dropdown-menu">
                                <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="#!">Delete</Link></li>
                                <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="#!">Hide</Link></li>
                                <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="#!">Edit</Link></li>
                            </ul>
                        </div>
                    </div>
                    </div>
            </div>
            </div>
            <div className="col-span-12 xxl:col-span-12 xl:col-span-12 lg:col-span-12 md:col-span-12">
                <div className="border rounded dark:border-defaultborder/10">
                    <div className="flex flex-wrap items-start p-4">
                    <div className="me-2">
                        <span className="avatar avatar-sm avatar-rounded">
                            <img src="../../../assets/images/faces/9.jpg" alt="" />
                        </span>
                    </div>
                    <div className="flex-grow">
                        <p className="mb-1 font-semibold leading-none">You</p>
                        <p className="text-[.6875rem] mb-2 text-[#8c9097] dark:text-white/50">22, Dec - 11:22PM</p>
                        <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mb-1">Shared pictures with 3 of your friends <span>Maya,Jacob,Amanda</span>.</p>
                        <div className="flex justify-between mb-4 leading-none">
                            <div>
                                <Link aria-label="anchor" href="#!">
                                    <span className="avatar avatar-md me-1">
                                        <img src="../../../assets/images/media/media-40.jpg" alt="" className="rounded-md" />
                                    </span>
                                </Link>
                                <Link aria-label="anchor" href="#!">
                                    <span className="avatar avatar-md me-1">
                                        <img src="../../../assets/images/media/media-45.jpg" alt="" className="rounded-md" />
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mb-2 md:mb-0">
                            <div>
                                <div className="btn-list">
                                    <button type="button" className="ti-btn ti-btn-primary !me-[.375rem] !py-1 !px-2 !text-[0.75rem] !font-medium btn-wave">
                                        Comment
                                    </button>
                                    <button aria-label="button" type="button" className="ti-btn !me-[.375rem] ti-btn-sm ti-btn-success">
                                        <i className="ri-thumb-up-line"></i>
                                    </button>
                                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-danger">
                                        <i className="ri-share-line"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-start">
                            <div>
                                <span className="badge bg-success/10 text-secondary me-2">Nature</span>
                            </div>
                            <div className="hs-dropdown ti-dropdown">
                                <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-light" aria-expanded="false">
                                    <i className="ti ti-dots-vertical"></i>
                                </button>
                                <ul className="hidden hs-dropdown-menu ti-dropdown-menu">
                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="#!">Delete</Link></li>
                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="#!">Hide</Link></li>
                                    <li><Link className="ti-dropdown-item !py-2 !px-[0.9375rem] !text-[0.8125rem] !font-medium block" href="#!">Edit</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="block mt-4 avatar-list-stacked text-end">
                            <span className="avatar avatar-xs avatar-rounded">
                                <img src="../../../assets/images/faces/1.jpg" alt="img" />
                            </span>
                            <span className="avatar avatar-xs avatar-rounded">
                                <img src="../../../assets/images/faces/5.jpg" alt="img" />
                            </span>
                            <span className="avatar avatar-xs avatar-rounded">
                                <img src="../../../assets/images/faces/16.jpg" alt="img" />
                            </span>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </PerfectScrollbar>
  )
}

export default Test