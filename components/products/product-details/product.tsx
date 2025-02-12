"use client"

import React, { FC } from 'react'
import ProductRating from './product-rating'
import Link from 'next/link'
import ButtonGroup from './button-group'
import ProductInfo from './product-info'
import { useTranslations } from 'next-intl'
import { useGetProductDetails } from '../hooks/useGetProductDetails'
import Ratings from './ratings'
import Comments from './comments'
import SkuTitle from './sku-title'
import Price from './price'
import Categories from './categories'
import Content from './content'
import FabricDetails from './fabric-details'
import CareInstructions from './care-instructions'
import StockInfo from './stock-info'

interface Props{
    uuid:string;
}

const Product:FC<Props> = ({uuid}) => {
    const t = useTranslations();
    const {
        isProductError,
        isProductLoading,
        product,
        productSalePriceIntegerPart,
        productSalePriceDecimalPart,
        productBrands,
        productCategories,
        productComments,
        productOwner
    } = useGetProductDetails(uuid);

    if(isProductError){
        return <>{t("GLOBAL.FETCH-ERROR")}</>
    }

    
    if(product && productOwner && productBrands){
        return (
            <div className="md:grid grid-cols-12 gap-x-[3rem]">
                <div className="col-span-12 mt-4 xl:col-span-8 xxl:mt-0">
                    <SkuTitle 
                        sku={product.sku}
                        title={product.title}
                        loading={isProductLoading}/>
                    <ProductRating 
                        rating={product.averageRating} 
                        reviews={product.numberOfRatings} 
                        loading={isProductLoading}/>
                    <div className="grid grid-cols-12 mb-6">
                        <div className="col-span-12 xxl:col-span-3 xl:col-span-12">
                            <p className="mb-1 lh-1 text-[0.6875rem] text-success font-semibold">Special Offer</p>
                            <Price
                                salePriceIntegerPart={productSalePriceIntegerPart}
                                salePriceDecimalPart={productSalePriceDecimalPart} 
                                price={product.price}
                                loading={isProductLoading}/>
                        </div>
                        <div className="col-span-12 mt-4 xxl:col-span-4 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 mml:mt-0">
                            <p className="mb-2 text-[.9375rem] font-semibold">Categories:</p>
                            <Categories 
                                categories={productCategories}
                                loading={isProductLoading}/>
                        </div>
                    </div>
                    <div className="mb-4">
                        <p className="text-[.9375rem] font-semibold mb-1">Description :</p>
                        <Content 
                            content={product.content}
                            loading={isProductLoading}/>
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
                        publishStatus={product.publishStatusLabel}
                        loading={isProductLoading}/>
                    <div className="mb-4">
                        <p className="text-[.9375rem] font-semibold mb-2">Fabric Details :</p>
                        <FabricDetails 
                            details={product.fabricDetails}
                            loading={isProductLoading}/>
                    </div>
                    <div className="mb-4">
                        <p className="text-[.9375rem] font-semibold mb-2">Care Instructions :</p>
                        <CareInstructions 
                            instructions={product.careInstructions}
                            loading={isProductLoading}/>
                    </div>
                    <div className="mb-0">
                        <p className="text-[.9375rem] font-semibold mb-3">Reviews &amp; Ratings :</p>
                        <div className="grid-cols-12 gap-6 sm:grid">
                            <Ratings />
                            <Comments 
                                comments={productComments} 
                                loading={isProductLoading}/>
                        </div>
                    </div>
                </div>
    
                <div className="col-span-12 mt-6 xl:col-span-4 xxl:mt-0">
                    <div className="mb-[3rem]">
                        <div className="mb-6">
                            <StockInfo 
                                inventory={product.inventory}
                                ownerId={productOwner.uuid}
                                firstName={productOwner.firstName}
                                lastName={productOwner.lastName}
                                brandName={productBrands.name}
                                loading={isProductLoading}/>
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