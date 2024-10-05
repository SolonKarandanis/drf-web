"use client"

import Link from 'next/link';
import React, { useState } from 'react'
import { Itemsdata1 } from './product-data';

const SearchProductsHeader = () => {
  const [allData, setAllData] = useState(Itemsdata1);
    const userdata:any = [];

    const myfunction = (idx:string) => {
        let Data;
        for (Data of allData) {
            if (Data.title[0] == " ") {
                Data.title = Data.title.trim();
            }
            if (Data.title.toLowerCase().includes(idx.toLowerCase())) {
                if (Data.title.toLowerCase().startsWith(idx.toLowerCase())) {
                    userdata.push(Data);
                }
            }

        }
        setAllData(userdata);
  };

  return (
      <div className="col-span-12 xl:col-span-12">
        <div className="box">
            <div className="box-body !p-0">
                <nav className="w-full mx-auto px-4 xxl:flex sm:items-center xxl:justify-between navbar 
                    navbar-expand-xxl bg-white dark:bg-bodybg !py-2" aria-label="Global">
                    <div id="navbar-collapse-with-animation" 
                        className="hidden overflow-hidden transition-all duration-300 hs-collapse basis-full grow xxl:block">
                        <div className="flex-wrap mt-5 xxl:flex gap-x-5 gap-y-2 sm:mt-0">
                            <ul className="flex-wrap items-center flex-grow mt-2 navbar-nav me-auto lg:mb-0 xxl:items-center xxl:flex xxl:mt-0">
                                <li className="mb-2 nav-item xxl:mb-0">
                                    <Link className="nav-link whitespace-nowrap text-defaulttextcolor 
                                        dark:text-defaulttextcolor/70 active hover:!text-primary" aria-current="page"
                                        href="#!">
                                        Men
                                    </Link>
                                </li>
                                <li className="mb-2 nav-item xxl:mb-0">
                                    <Link className="nav-link whitespace-nowrap text-defaulttextcolor 
                                        dark:text-defaulttextcolor/70 hover:!text-primary" href="#!">
                                        Women
                                    </Link>
                                </li>
                                <li className="mb-2 nav-item xxl:mb-0 hs-dropdown ti-dropdown">
                                    <Link className="nav-link whitespace-nowrap text-defaulttextcolor dark:text-defaulttextcolor/70 dropdown-toggle" href="#!"
                                        id="navbarDropdown"
                                        aria-expanded="false">
                                        Kids
                                        <i className="inline-block align-middle ri-arrow-down-s-line ms-1"></i>
                                    </Link>
                                    <ul className="hidden hs-dropdown-menu ti-dropdown-menu"
                                        aria-labelledby="navbarDropdown">
                                        <li>
                                            <Link className="ti-dropdown-item !py-2 !px-[0.9375rem] 
                                                !text-[0.8125rem] !font-medium block"
                                                href="#!">
                                                Action
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="ti-dropdown-item !py-2 !px-[0.9375rem] 
                                                !text-[0.8125rem] !font-medium block"
                                                href="#!">
                                                Another action
                                            </Link>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <Link className="ti-dropdown-item !py-2 !px-[0.9375rem] 
                                                !text-[0.8125rem] !font-medium block"
                                            href="#!">
                                            Something else here
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="mb-2 nav-item xxl:mb-0">
                                    <Link href="#!" className="nav-link whitespace-nowrap 
                                        text-defaulttextcolor dark:text-defaulttextcolor/70 hover:!text-primary">
                                        Today Deals
                                    </Link>
                                </li>
                                <li className="mb-2 nav-item xxl:mb-0">
                                    <Link href="#!" className="nav-link whitespace-nowrap 
                                        text-defaulttextcolor dark:text-defaulttextcolor/70 hover:!text-primary">
                                        Electronics
                                    </Link>
                                </li>
                                <li className="mb-2 nav-item xxl:mb-0">
                                    <Link href="#!" className="nav-link whitespace-nowrap text-defaulttextcolor 
                                        dark:text-defaulttextcolor/70 hover:!text-primary">
                                        Home &amp; Kitchen
                                    </Link>
                                </li>
                                <li className="mb-2 nav-item xxl:mb-0">
                                    <Link href="#!" className="nav-link whitespace-nowrap text-defaulttextcolor 
                                        dark:text-defaulttextcolor/70 hover:!text-primary">
                                        Fashion
                                    </Link>
                                </li>
                                <li className="mb-2 nav-item xxl:mb-0">
                                    <Link href="#!" className="nav-link whitespace-nowrap text-defaulttextcolor 
                                        dark:text-defaulttextcolor/70 hover:!text-primary">
                                        <i className="inline-block align-middle ri-customer-service-line me-2"></i>
                                        Customer Service
                                    </Link>
                                </li>
                                <li className="nav-item xxl:mb-mb-0 mb-2 xxl:ms-0 !ms-4">
                                    <div className="block btn-group xxl:flex hs-dropdown ti-dropdown">
                                        <button className="ti-btn  !text-[0.75rem] ti-btn-primary !m-0"
                                            type="button"
                                            aria-expanded="false">
                                            SortBy
                                            <i className="inline-block align-middle ri-arrow-down-s-line ms-1"></i>
                                        </button>
                                        <ul className="hidden hs-dropdown-menu ti-dropdown-menu">
                                            <li>
                                                <Link className="ti-dropdown-item !py-2 !px-[0.9375rem] 
                                                    !text-[0.8125rem] !font-medium block"
                                                    href="#!">
                                                    Featured
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="ti-dropdown-item !py-2 !px-[0.9375rem] 
                                                    !text-[0.8125rem] !font-medium block"
                                                    href="#!">
                                                    Price: High to Low
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="ti-dropdown-item active !py-2 
                                                    !px-[0.9375rem] !text-[0.8125rem] !font-medium block"
                                                    href="#!">
                                                    Price: Low to High
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="ti-dropdown-item !py-2 !px-[0.9375rem] 
                                                    !text-[0.8125rem] !font-medium block"
                                                    href="#!">
                                                    Newest
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="ti-dropdown-item !py-2 !px-[0.9375rem] 
                                                    !text-[0.8125rem] !font-medium block"
                                                    href="#!">
                                                    Ratings
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="nav-item xxl:mb-0 mb-2 xxl:ms-4 !ms-4">
                                    <div className="inline-flex">
                                        <button type="button"
                                            className="ti-btn !py-[0.45rem] !px-3 bg-primary 
                                            text-white !rounded-e-none">
                                            IV
                                        </button>
                                        <button type="button"
                                            className="ti-btn !py-[0.45rem] !px-3 bg-primary 
                                            text-white !rounded-none">
                                            III
                                        </button>
                                        <button type="button"
                                            className="ti-btn !py-[0.45rem] !px-3 bg-primary 
                                            text-white !rounded-s-none">
                                            II
                                        </button>
                                    </div>
                                </li>
                            </ul>
                            <div className="sm:flex" role="search">
                                <input className="form-control !w-auto !rounded-sm me-2" 
                                    type="search" onChange={(ele) => { myfunction(ele.target.value); }}
                                    placeholder="Search" aria-label="Search" />
                                <button className="ti-btn ti-btn-light !font-medium mt-2 sm:mt-0"
                                    type="submit">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
  )
}

export default SearchProductsHeader