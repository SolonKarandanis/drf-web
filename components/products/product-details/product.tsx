"use client"

import React, { FC } from 'react'
import ProductRating from './product-rating'
import Link from 'next/link'
import Reviews from './reviews'
import ButtonGroup from './button-group'
import ProductInfo from './product-info'

interface Props{
    uuid:string;
}

const Product:FC<Props> = ({uuid}) => {
  return (
    <div className="md:grid grid-cols-12 gap-x-[3rem]">
        <div className="col-span-12 mt-4 xl:col-span-8 xxl:mt-0">
            <p className="text-[1.125rem] font-semibold mb-0">
                Orange Watch Series 4 (GPS + Cellular, 44mm) - Colored Aluminium Case with Multiple Featured Sports Band - Regular
            </p>
            <ProductRating />
            <div className="grid grid-cols-12 mb-6">
                <div className="col-span-12 xxl:col-span-3 xl:col-span-12">
                    <p className="mb-1 lh-1 text-[0.6875rem] text-success font-semibold">Special Offer</p>
                    <p className="mb-1">
                        <span className="font-semibold h3">
                            <sup className="text-[0.875rem]">$</sup>1,299<sup className="text-[0.875rem]">.00</sup>
                        </span>
                        <span className="ms-3 badge bg-danger/10 text-danger">50% Off</span>
                    </p>
                    <p className="mb-0 text-[#8c9097] dark:text-white/50 text-[0.75rem]">M.R.P-<s>$2,599.00</s></p>
                </div>
                <div className="col-span-12 mt-4 xxl:col-span-4 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 mml:mt-0">
                    <p className="mb-2 text-[.9375rem] font-semibold">Watch Type</p>
                    <div className="inline-flex" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check " name="select-type" id="type1" defaultChecked />
                        <label className="ti-btn !py-[0.45rem] !px-3 ti-btn-light !border-e-0 
                            !text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:!border-defaultborder/10 !text-[0.75rem] 
                            !font-medium !rounded-e-none hover:!bg-light hover:!text-defaulttextcolor" htmlFor="type1">
                            GPS
                        </label>
                        <input type="radio" className="btn-check" name="select-type" id="type2" />
                        <label className="ti-btn !py-[0.45rem] !px-3 ti-btn-outline-light !text-defaulttextcolor 
                            dark:!text-defaulttextcolor/70 dark:!border-defaultborder/10 !text-[0.75rem] !rounded-s-none 
                            hover:!bg-light hover:!text-defaulttextcolor" htmlFor="type2">
                            GPS+Cellular
                        </label>
                    </div>
                </div>
                <div className="col-span-12 mt-4 xxl:col-span-5 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 xxl:mt-0">
                    <p className="mb-2 text-[.9375rem] font-semibold">Strap Material</p>
                    <div className="inline-flex " role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check " name="strap-material" id="strap1" defaultChecked />
                        <label className="ti-btn !py-[0.45rem] !px-3 ti-btn-light !border-e-0 !text-defaulttextcolor 
                            dark:!text-defaulttextcolor/70 dark:!border-defaultborder/10 !text-[0.75rem] !font-medium 
                            !rounded-e-none hover:!bg-light hover:!text-defaulttextcolor" htmlFor="strap1">
                            Leather
                        </label>
                        <input type="radio" className="btn-check " name="strap-material" id="strap2" />
                        <label className="ti-btn !py-[0.45rem] !px-3 ti-btn-outline-light !border-e-0 !text-defaulttextcolor 
                            dark:!text-defaulttextcolor/70 dark:!border-defaultborder/10 !text-[0.75rem] !font-medium !rounded-none 
                            hover:!bg-light hover:!text-defaulttextcolor" htmlFor="strap2">
                            Stainless steel
                        </label>
                        <input type="radio" className="btn-check" name="strap-material" id="strap3" />
                        <label className="ti-btn !py-[0.45rem] !px-3 ti-btn-outline-light !text-defaulttextcolor 
                            dark:!text-defaulttextcolor/70 dark:!border-defaultborder/10 !text-[0.75rem] !font-medium  
                            !rounded-s-none hover:!bg-light hover:!text-defaulttextcolor" htmlFor="strap3">
                            Synthetic
                        </label>
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <p className="text-[.9375rem] font-semibold mb-1">Description :</p>
                <p className="text-[#8c9097] dark:text-white/50 mb-0">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati accusamus, 
                    quaerat nam quo optio reiciendis harum reprehenderit omnis tempora adipisci in iste aperiam unde, 
                    repellendus possimus explicabo veritatis? Dignissimos, id.
                </p>
            </div>
            <div className="mb-4">
                <div className="grid grid-cols-12 gap-x-6">
                    <div className="col-span-12 xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12">
                        <p className="text-[.9375rem] font-semibold mb-2">Colors :</p>
                        <p className="flex mb-0">
                            <Link aria-label="anchor" className="color-1 product-colors selected" href="#!">
                                <i className="ri-checkbox-blank-circle-fill"></i>
                            </Link>
                            <Link aria-label="anchor" className="color-2 product-colors" href="#!">
                                <i className="ri-checkbox-blank-circle-fill"></i>
                            </Link>
                            <Link aria-label="anchor" className="color-3 product-colors" href="#!">
                                <i className="ri-checkbox-blank-circle-fill"></i>
                            </Link>
                            <Link aria-label="anchor" className="color-4 product-colors" href="#!">
                                <i className="ri-checkbox-blank-circle-fill"></i>
                            </Link>
                            <Link aria-label="anchor" className="color-5 product-colors" href="#!">
                                <i className="ri-checkbox-blank-circle-fill"></i>
                            </Link>
                        </p>
                    </div>
                    <div className="col-span-12 mt-4 xxl:col-span-6 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 md:mt-0">
                        <p className="text-[.9375rem] font-semibold mb-2">Dial Size(in mm) :</p>
                        <p className="flex mb-0">
                            <Link className="color-1 product-sizes selected" href="#!">
                                44
                            </Link>
                            <Link className="color-2 product-sizes" href="#!">
                                40
                            </Link>
                            <Link className="color-3 product-sizes" href="#!">
                                38
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            
            <ProductInfo />
            <div className="mb-4">
                <p className="text-[.9375rem] font-semibold mb-2">Features :</p>
                <div className="grid grid-cols-12 gap-x-6 gap-y-2">
                    <div className="col-span-12 xl:col-span-6">
                        <ul className="mb-0 list-disc ps-8">
                            <li className="text-[#8c9097] dark:text-white/50 mb-2">
                                Dial height: 44 mm
                            </li>
                            <li className="text-[#8c9097] dark:text-white/50 mb-2">
                                Dial width: 35 mm
                            </li>
                            <li className="text-[#8c9097] dark:text-white/50 mb-2">
                                SpO2
                            </li>
                            <li className="text-[#8c9097] dark:text-white/50 mb-2">
                                30+ sports mode
                            </li>
                            <li className="text-[#8c9097] dark:text-white/50 mb-2">
                                Upto 12 days battery life
                            </li>
                            <li className="text-[#8c9097] dark:text-white/50">
                                Water resistant
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-12 xl:col-span-6">
                        <ul className="mb-0 list-disc ps-7">
                            <li className="text-[#8c9097] dark:text-white/50 mb-2">
                                Battery powered
                            </li>
                            <li className="text-[#8c9097] dark:text-white/50 mb-2">
                                Country of origin: USA
                            </li>
                            <li className="text-[#8c9097] dark:text-white/50">
                                1-year warranty against manufacturing defects
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Reviews />
        </div>

        <div className="col-span-12 mt-6 xl:col-span-4 xxl:mt-0">
            <div className="mb-[3rem]">
                <div className="mb-6">
                    <p className="text-danger mb-0 text-[1rem]">Only 5 left in stock.</p>
                    <p className="mb-0 text-[0.75rem]">
                        Sold by 
                        <span className="text-primary me-1">
                            <u>Regaltos PVT.LTD</u>
                        </span>
                        and quality checked by 
                        <span className="text-primary">
                            <u>Spruko Tchnologies</u>.
                        </span>
                    </p>
                </div>
                <div className="mb-4">
                    <p className="mb-0 font-semibold">Returns:</p>
                    <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50">
                        Min 7 days return and exchange policy. Return Policies may vary based on products and promotions. 
                        For full details on our Returns Policies, please 
                        <Link href="#!" className="text-primary">click here</Link>․
                    </p>
                </div>
                <ButtonGroup />
            </div>
        </div>
    </div>
  )
}

export default Product