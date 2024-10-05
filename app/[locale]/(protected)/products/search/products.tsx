"use client"

import Link from 'next/link';
import React, { useState } from 'react'

export const ItemData1 = [
    {
       id: '1',
       preview: "../../../../assets/images/ecommerce/png/1.png",
       title: 'Dapzem & Co',
       oldpr: '$229',
       newpr: '$1,799',
       offerprice:'$229',
        quantity:1,
        color:"bg-success/10 text-success",
        data:"In Offer",
        color1:"Large", 
        color2:"Grey"
    },
    {
       id: '2',
       preview: "../../../../assets/images/ecommerce/png/2.png",
       title: 'Denim Winjo',
       oldpr: '$599',
       newpr: '$2,499',
       offerprice:'$599',
       quantity:2,
       color:"bg-secondary text-white",
       data:"25% Discount",
       color1:"Medium", 
       color2:"Blue"
       
    },
    {
       id: '3',
       preview: "../../../../assets/images/ecommerce/png/3.png",
       title: 'Jimmy Lolfiger',
       oldpr: '$1,199',
       newpr: '$3,299',
       offerprice:'$1,199',
       quantity:3,
       color:"bg-success/10 text-success",
       data:"In Offer",
       color1:"44mm dial", 
       color2:"Bronze"
    },
    {
       id: '4',
       preview: "../../../../assets/images/ecommerce/png/4.png",
       title: 'Bluberry Co.In',
       oldpr: '$349',
       newpr: '$1,299',
       offerprice:'$349',
       quantity:4,
       color:"bg-success/10 text-success",
       data:"In Offer",
       color1:"Medium", 
       color2:"Light Pink"
    },
    {
       id: '5',
       preview: "../../../../assets/images/ecommerce/png/5.png",
       title: 'Aus Polo Assn',
       oldpr: '$1,899',
       newpr: '$3,799',
       offerprice:'$1,899',
       quantity:5,
       color:"bg-success/10 text-success",
       data:"In Offer",
       color1:"Large", 
       color2:"Green"
    },

 ];


 export const Itemsdata1= [
    {
      id: '1',
      percentage:"72% off",
      preview: "../../../../assets/images/ecommerce/png/1.png",
      title: 'Dapzem & Co',
     description:'Branded hoodie ethnic style',
      oldpr: '$229',
      newpr: '$1,799',
      offerprice:'$229',
      data:"In Offer",
      quantity:1,
      images: [
         { 'img': "../../../../assets/images/ecommerce/png/1.png" },
         { 'img': "../../../../assets/images/ecommerce/png/1.png" },
         { 'img': "../../../../assets/images/ecommerce/png/1.png" }],
   },
   {
      id: '2',
      percentage:"75% off",
      preview: "../../../../assets/images/ecommerce/png/2.png",
      title: 'Denim Winjo',
      description:'Vintage pure leather Jacket',
      oldpr: '$599',
      newpr: '$2,499',
      offerprice:'$599',
      quantity:2,
      images: [
         { 'img': "../../../../assets/images/ecommerce/png/2.png" },
         { 'img': "../../../../assets/images/ecommerce/png/2.png" },
         { 'img': "../../../../assets/images/ecommerce/png/2.png" }],
      ribbon: '',
   },
   {
      id: '3',
      percentage:"62% off",
      preview: "../../../../assets/images/ecommerce/png/3.png",
      title: 'Jimmy Lolfiger',
      description:'Unisex jacket for men & women',
      oldpr: '$1,199',
      newpr: '$3,299',
      offerprice:'$1,199',
      quantity:1,
      images: [
         { 'img': "../../../../assets/images/ecommerce/png/3.png" },
         { 'img': "../../../../assets/images/ecommerce/png/3.png"},
         { 'img': "../../../../assets/images/ecommerce/png/3.png" }],
      ribbon: '',
   },
   {
      id: '4',
      percentage:"60% off",
      preview: "../../../../assets/images/ecommerce/png/4.png",
      title: 'Bluberry Co.In',
      description:'Full sleeve white hoodie',
      oldpr: '$349',
      newpr: '$1,299',
      offerprice:'$349',
      quantity:1,
      images: [
         { "img": "../../../../assets/images/ecommerce/png/4.png" },
         { "img": "../../../../assets/images/ecommerce/png/4.png" },
         { "img": "../../../../assets/images/ecommerce/png/4.png" },],
      ribbon: '',
   },
   {
      id: '5',
      percentage:"50% off",
      preview: "../../../../assets/images/ecommerce/png/5.png",
      title: 'Aus Polo Assn',
      description:'Snow jacket with low pockets',
      oldpr: '$1,899',
      newpr: '$3,799',
      offerprice:'$1,899',
      quantity:1,
      images: [
         { 'img': "../../../../assets/images/ecommerce/png/5.png" },
         { 'img': "../../../../assets/images/ecommerce/png/5.png" },
         { 'img': "../../../../assets/images/ecommerce/png/5.png" }],
   },
   {
      id: '6',
      percentage:"38% off",
      preview: "../../../../assets/images/ecommerce/png/6.png",
      title: 'BMW',
      description:'Ethnic wear jackets form BMW',
      oldpr: '$1,499',
      newpr: '$2,499',
      offerprice:'$1,499',
      quantity:1,
      images: [
         { 'img': "../../../../assets/images/ecommerce/png/6.png" },
         { 'img': "../../../../assets/images/ecommerce/png/6.png" },
         { 'img': "../../../../assets/images/ecommerce/png/6.png" }],
   },
   {
      id: '7',
      percentage:"35% off",
      preview: "../../../../assets/images/ecommerce/png/7.png",
      title: 'Denim Corporation',
      description:'Flap pockets denim jackets for men',
      oldpr: '$299',
      newpr: '$399',
      offerprice:'$299',
      quantity:1,
      images: [
         { 'img': "../../../../assets/images/ecommerce/png/7.png" },
         { 'img': "../../../../assets/images/ecommerce/png/7.png" },
         { 'img': "../../../../assets/images/ecommerce/png/7.png" }],
      ribbon: '',
   },
   {
      id: '8',
      percentage:"72% off",
      preview: "../../../../assets/images/ecommerce/png/8.png",
      title: 'Pufa',
      description:'Ergonic designed full sleeve coat',
      oldpr: '$2,399',
      newpr: '$5,699',
      offerprice:'$2,399',
      quantity:1,
      images: [
         { 'img': "../../../../assets/images/ecommerce/png/8.png" },
         { 'img': "../../../../assets/images/ecommerce/png/8.png" },
         { 'img': "../../../../assets/images/ecommerce/png/8.png" }],
      ribbon: '',
   },
   {
      id: '9',
      percentage:"60% off",
      preview: "../../../../assets/images/ecommerce/png/9.png",
      title: 'Louie Phillippe',
      description:'Ergonic green colored full sleeve jacket',
      oldpr: '$1,899',
      newpr: '$3,299',
      offerprice:'$1,899',
      quantity:1,
      images: [
         { 'img': "../../../../assets/images/ecommerce/png/9.png" },
         { 'img': "../../../../assets/images/ecommerce/png/9.png" },
         { 'img': "../../../../assets/images/ecommerce/png/9.png" }],
   },
  
   {
    id: '10',
            percentage:"50% off",
 
       preview: "../../../../assets/images/ecommerce/png/10.png",
       title: 'Denim Corp',
       description:'beautiful brown colored snow jacket',
       oldpr: '$2,499',
       newpr: '$4,999',
       offerprice:'$499',
       quantity:1,
       images: [
          { 'img': "../../../../assets/images/ecommerce/png/10.png" },
          { 'img': "../../../../assets/images/ecommerce/png/10.png" },
          { 'img': "../../../../assets/images/ecommerce/png/10.png" }],
    },
   
    {
         id: '11',
            percentage:"70% off",
 
       preview: "../../../../assets/images/ecommerce/png/11.png",
       title: 'Garage & Co',
       description:'Full sleeve sweat shirt',
       oldpr: '$249',
       newpr: '$1,299',
       offerprice:'$249',
       quantity:1,
       images: [
          { 'img': "../../../../assets/images/ecommerce/png/11.png" },
          { 'img': "../../../../assets/images/ecommerce/png/11.png" },
          { 'img': "../../../../assets/images/ecommerce/png/11.png" }],
    },
    {
         id: '12',
            percentage:"32% off",
 
       preview: "../../../../assets/images/ecommerce/png/12.png",
       title: 'Blueberry & Co',
       description:'Light colored sweater form blueberry',
       oldpr: '$499',
       newpr: '$799',
       offerprice:'$499',
       quantity:1,
       images: [
          { 'img': "../../../../assets/images/ecommerce/png/12.png" },
          { 'img': "../../../../assets/images/ecommerce/png/12.png" },
          { 'img': "../../../../assets/images/ecommerce/png/12.png" }],
    },
];

const Products = () => {
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
        <div className="mb-6">
            <div className="grid grid-cols-12 gap-x-6">
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
                <div className="col-span-12 xxl:col-span-3 xl:col-span-4 lg:col-span-4 md:col-span-12">
                    <div className="box products-navigation-card">
                        <div className="box-body !p-0">
                            <div className="p-4 border-b dark:border-defaultborder/10">
                                <p className="font-semibold mb-0 text-[#8c9097] dark:text-white/50">
                                    CATEGORIES
                                </p>
                                <div className="px-2 py-4 pb-0">
                                    <div className="mb-2 form-check">
                                        <input className="form-check-input" type="checkbox" value=""
                                            id="electronics" />
                                        <label className="form-check-label" htmlFor="electronics">
                                            Electronics
                                        </label>
                                        <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                            rtl:float-left">
                                            2,712
                                        </span>
                                    </div>
                                    <div className="mb-2 form-check">
                                        <input className="form-check-input" type="checkbox" value=""
                                            id="Accesories" />
                                        <label className="form-check-label" htmlFor="Accesories">
                                            Accesories
                                        </label>
                                        <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                            rtl:float-left">
                                            536
                                        </span>
                                    </div>
                                    <div className="mb-2 form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="clothing"
                                            defaultChecked />
                                        <label className="form-check-label" htmlFor="clothing">
                                            Clothing
                                        </label>
                                        <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                            rtl:float-left">
                                            18,289
                                        </span>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="fashion" />
                                        <label className="form-check-label" htmlFor="fashion">
                                            Fashion
                                        </label>
                                        <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                            rtl:float-left">
                                            3,453
                                        </span>
                                    </div>
                                    <div id="hs-show-hide-categories-heading"
                                        className="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300"
                                        aria-labelledby="hs-show-hide-categories">
                                        <div className="mt-1 mb-2 form-check">
                                            <input className="form-check-input" type="checkbox" value=""
                                                id="furniture" />
                                            <label className="form-check-label" htmlFor="furniture">
                                                Furniture
                                            </label>
                                            <span className="badge bg-light text-[#8c9097] dark:text-white/50 
                                                ltr:float-right rtl:float-left">
                                                7,165
                                            </span>
                                        </div>
                                        <div className="mb-2 form-check">
                                            <input className="form-check-input" type="checkbox" value=""
                                                id="footwear" />
                                            <label className="form-check-label" htmlFor="footwear">
                                                Footwear
                                            </label>
                                            <span className="badge bg-light text-[#8c9097] dark:text-white/50 
                                                ltr:float-right rtl:float-left">
                                                5,964
                                            </span>
                                        </div>
                                        <div className="mb-2 form-check">
                                            <input className="form-check-input" type="checkbox" value=""
                                                id="mobiles" />
                                            <label className="form-check-label" htmlFor="mobiles">
                                                Mobiles
                                            </label>
                                            <span className="badge bg-light text-[#8c9097] dark:text-white/50 
                                                ltr:float-right rtl:float-left">
                                                2,123
                                            </span>
                                        </div>
                                    </div>
                                    <Link className="inline-flex items-center ecommerce-more-link text-success hs-collapse-toggle gap-x-2"
                                        href="#!" id="hs-show-hide-categories"
                                        data-hs-collapse="#hs-show-hide-categories-heading">
                                        <span className="hs-collapse-open:hidden">MORE</span>
                                        <span className="hidden hs-collapse-open:block">MORE</span>
                                        <svg className="hs-collapse-open:rotate-180 w-2.5 h-2.5" width="16"
                                            height="16" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-b dark:border-defaultborder/10">
                            <p className="font-semibold mb-0 text-[#8c9097] dark:text-white/50">
                                BRANDS
                            </p>
                            <div className="px-2 py-4 pb-0">
                                <div className="mb-2 form-check ">
                                    <input className="form-check-input" type="checkbox" value="" id="Jimmy-Lolfiger"
                                        defaultChecked />
                                    <label className="form-check-label" htmlFor="Jimmy-Lolfiger">
                                        Jimmy Lolfiger
                                    </label>
                                    <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                        rtl:float-left">
                                        512
                                    </span>
                                </div>
                                <div className="mb-2 form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="dapzem1"
                                        defaultChecked />
                                    <label className="form-check-label" htmlFor="dapzem1">
                                        Dapzem &amp; Co
                                    </label>
                                    <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                        rtl:float-left">
                                        2,186
                                    </span>
                                </div>
                                <div className="mb-2 form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="denim-winjo1"
                                        defaultChecked />
                                    <label className="form-check-label" htmlFor="denim-winjo1">
                                        Denim Winjo
                                    </label>
                                    <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                        rtl:float-left">
                                        734
                                    </span>
                                </div>
                                <div className="mb-2 form-check">
                                    <input className="form-check-input" type="checkbox" value=""
                                        id="Louie-Phillippe" />
                                    <label className="form-check-label" htmlFor="Louie-Phillippe">
                                        Louie Phillippe
                                    </label>
                                    <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                        rtl:float-left">
                                        16
                                    </span>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value=""
                                        id="garage-clothing" />
                                    <label className="form-check-label" htmlFor="garage-clothing">
                                        Garage &amp;Co
                                    </label>
                                    <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                        rtl:float-left">
                                        1,432
                                    </span>
                                </div>
                                <div id="hs-show-hide-brands-heading"
                                    className="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300"
                                    aria-labelledby="hs-show-hide-brands">
                                    <div className="mt-1 mb-2 form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="blueberry"
                                            defaultChecked />
                                        <label className="form-check-label" htmlFor="blueberry">
                                            Blueberry &amp;Co
                                        </label>
                                        <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                            rtl:float-left">
                                            257
                                        </span>
                                    </div>
                                    <div className="mb-2 form-check">
                                        <input className="form-check-input" type="checkbox" value=""
                                            id="aus-polo-assn" defaultChecked />
                                        <label className="form-check-label" htmlFor="aus-polo-assn">
                                            Aus Polo Assn
                                        </label>
                                        <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                            rtl:float-left">
                                            1,845
                                        </span>
                                    </div>
                                    <div className="mb-2 form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="denim-corp"
                                            defaultChecked />
                                        <label className="form-check-label" htmlFor="denim-corp">
                                            Denim Corp
                                        </label>
                                        <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                            rtl:float-left">
                                            5,893
                                        </span>
                                    </div>
                                </div>
                                <Link className="inline-flex items-center ecommerce-more-link text-success hs-collapse-toggle gap-x-2"
                                    href="#!" id="hs-show-hide-brands"
                                    data-hs-collapse="#hs-show-hide-brands-heading">
                                    <span className="hs-collapse-open:hidden">MORE</span>
                                    <span className="hidden hs-collapse-open:block">MORE</span>
                                    <svg className="hs-collapse-open:rotate-180 w-2.5 h-2.5" width="16" height="16"
                                        viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <div className="p-4 border-b dark:border-defaultborder/10">
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products