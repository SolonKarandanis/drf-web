"use client"

import React, { FC, Fragment } from 'react'
import ProductRating from './product-rating'
import Link from 'next/link'
import ButtonGroup from './button-group'
import ProductInfo from './product-info'
import { useTranslations } from 'next-intl'
import { useGetProductDetails } from '../hooks/useGetProductDetails'
import Ratings from './ratings'
import Comments from './comments'

interface Props{
    uuid:string;
}

const Product:FC<Props> = ({uuid}) => {
    const t = useTranslations();
    const {
        isError,
        isLoading,
        product,
        productSalePriceIntegerPart,
        productSalePriceDecimalPart,
        productBrands,
        productCategories,
        productComments,
        productOwner
    } = useGetProductDetails(uuid);

    if(isError){
        return <>{t("GLOBAL.FETCH-ERROR")}</>
    }

    

    if(product && productOwner && productBrands){
        return (
            <div className="md:grid grid-cols-12 gap-x-[3rem]">
                <div className="col-span-12 mt-4 xl:col-span-8 xxl:mt-0">
                    <p className="text-[1.125rem] font-semibold mb-0">
                       {`(${product.sku}) ${product.title}`}
                    </p>
                    <ProductRating />
                    <div className="grid grid-cols-12 mb-6">
                        <div className="col-span-12 xxl:col-span-3 xl:col-span-12">
                            <p className="mb-1 lh-1 text-[0.6875rem] text-success font-semibold">Special Offer</p>
                            <p className="mb-1">
                                <span className="font-semibold h3">
                                    <sup className="text-[0.875rem]">
                                        $</sup>{productSalePriceIntegerPart}<sup className="text-[0.875rem]">{productSalePriceDecimalPart}
                                    </sup>
                                </span>
                            </p>
                            <p className="mb-0 text-[#8c9097] dark:text-white/50 text-[0.75rem]">
                                M.R.P-<s>${product.price}</s>
                            </p>
                        </div>
                        <div className="col-span-12 mt-4 xxl:col-span-4 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 mml:mt-0">
                            <p className="mb-2 text-[.9375rem] font-semibold">Categories:</p>
                            <div className="inline-flex" role="group" aria-label="Basic radio toggle button group">
                                {productCategories.map((category)=>(
                                    <Fragment key={category.id}>
                                        <input 
                                            type="radio" 
                                            className="btn-check " 
                                            name="select-type" 
                                            id={String(category.id)} />
                                        <label className="ti-btn !py-[0.45rem] !px-3 ti-btn-light !border-e-0 
                                            !text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:!border-defaultborder/10 !text-[0.75rem] 
                                            !font-medium !rounded-e-none hover:!bg-light hover:!text-defaulttextcolor" 
                                            htmlFor={String(category.id)}>
                                            {category.name}
                                        </label>
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <p className="text-[.9375rem] font-semibold mb-1">Description :</p>
                        <p className="text-[#8c9097] dark:text-white/50 mb-0">
                            {product.content}
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
                    
                    <ProductInfo 
                        brand={productBrands.name}
                        color='Red'
                        modelName={product.title}
                        availabilityStatus={product.availabilityStatusLabel}
                        publishStatus={product.publishStatusLabel}/>
                    <div className="mb-4">
                        <p className="text-[.9375rem] font-semibold mb-2">Fabric Details :</p>
                        <p className="text-[#8c9097] dark:text-white/50 mb-0">
                            {product.fabricDetails}
                        </p>
                    </div>
                    <div className="mb-4">
                        <p className="text-[.9375rem] font-semibold mb-2">Care Instructions :</p>
                        <p className="text-[#8c9097] dark:text-white/50 mb-0">
                            {product.careInstructions}
                        </p>
                    </div>
                    <div className="mb-0">
                        <p className="text-[.9375rem] font-semibold mb-3">Reviews &amp; Ratings :</p>
                        <div className="grid-cols-12 gap-6 sm:grid">
                            <Ratings />
                            <Comments comments={productComments} />
                        </div>
                    </div>
                </div>
    
                <div className="col-span-12 mt-6 xl:col-span-4 xxl:mt-0">
                    <div className="mb-[3rem]">
                        <div className="mb-6">
                            <p className="text-danger mb-0 text-[1rem]">Only {product.inventory} left in stock.</p>
                            <p className="mb-0 text-[0.75rem]">
                                Sold by 
                                <Link  href={`/users/${productOwner.uuid}`}
                                    className="ml-1 mr-1 hover:underline ltr:float-right rtl:float-left text-sky-600">
                                    {productOwner.firstName} {' '} {productOwner.lastName}
                                </Link>
                                and made by 
                                <span className="ml-1 text-info">
                                    <u>{productBrands.name}</u>.
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

    
}

export default Product