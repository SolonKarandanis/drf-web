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
import { AddToCartSchema, getAddToCartSchema } from '@/schemas/cart.schemas'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import FormSelect from '@/shared/components/form-select/form-select'
import { useGetProductMisc } from '../hooks/useGetProductMisc'
import FormInput from '@/shared/components/form-input/form-input'
import { useMutateUserCart } from '@/components/cart/hooks/useMutateUserCart'
import { AddToCartRequest } from '@/models/cart.models'

interface Props{
    uuid:string;
}

const Product:FC<Props> = ({uuid}) => {
    const t = useTranslations();
    const formT = useTranslations("CART.VALIDATION");
    const {
        isProductError,
        isProductLoading,
        product,
        productSalePriceIntegerPart,
        productSalePriceDecimalPart,
        productBrands,
        productCategories,
        productComments,
        productOwner,
        productSizes,
        productColors,
    } = useGetProductDetails(uuid);
    const {
        sizesOptions,
        coloursOptions,
    } = useGetProductMisc();
    const {
        mutationLoading,
        handleAddItemsToCartRequest
    } = useMutateUserCart();

    const productSizesOptions = sizesOptions.filter(opt=>productSizes?.map(ps=>ps.attributeOptionId).includes(Number(opt.value)));
    const productColorOptions = coloursOptions.filter(opt=>productColors?.map(ps=>ps.attributeOptionId).includes(Number(opt.value)));


    const {
        register,
        control,
        handleSubmit,
        formState,
        setValue,
        getValues
    } = useForm<AddToCartSchema>({
        resolver: zodResolver(getAddToCartSchema(formT))
    });
    const {errors} = formState;

    const onAddToCart: SubmitHandler<AddToCartSchema> = async (data) =>{
        const {color,quantity,size} = data;
        const attributesObj = {1:size,2:color};
        const attributes =JSON.stringify(attributesObj);
        if(product){
            const request:AddToCartRequest = {
                productId:product.id,
                quantity,
                attributes
            };
            handleAddItemsToCartRequest([request]);
        }
    }

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
                            <Price
                                salePriceIntegerPart={productSalePriceIntegerPart}
                                salePriceDecimalPart={productSalePriceDecimalPart} 
                                price={product.price}
                                loading={isProductLoading}/>
                        </div>
                        <div className="col-span-12 mt-4 xxl:col-span-4 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 mml:mt-0">
                            <p className="mb-2 text-[.9375rem] font-semibold">{t("PRODUCTS.DETAILS.LABELS.categories")}:</p>
                            <Categories 
                                categories={productCategories}
                                loading={isProductLoading}/>
                        </div>
                    </div>
                    <div className="mb-4">
                        <p className="text-[.9375rem] font-semibold mb-1">{t("PRODUCTS.DETAILS.LABELS.description")} :</p>
                        <Content 
                            content={product.content}
                            loading={isProductLoading}/>
                    </div>
                    <form onSubmit={handleSubmit(onAddToCart)} className="mb-4">
                        <div className="grid grid-cols-12 gap-x-6">
                            <div className="col-span-12 xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-12">
                                <Controller
                                    name="color"
                                    control={control}
                                    render={({ field }) => (
                                        <FormSelect 
                                            name="color"
                                            isMulti={false}
                                            required={true}
                                            isSearchable={true}
                                            options={productColorOptions}
                                            sectionClassName="col-span-12 xl:col-span-6 mb-2"
                                            field={field}
                                            error={errors.color?.message}
                                            loading={isProductLoading}>
                                                <p className="text-[.9375rem] font-semibold mb-2">{t("PRODUCTS.DETAILS.LABELS.colors")} :</p>
                                        </FormSelect>
                                    )}
                                />
                            </div>
                            <div className="col-span-12 mt-4 xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-12 md:mt-0">
                                <Controller
                                    name="size"
                                    control={control}
                                    render={({ field }) => (
                                        <FormSelect 
                                            name="size"
                                            isMulti={false}
                                            required={true}
                                            isSearchable={true}
                                            options={productSizesOptions}
                                            sectionClassName="col-span-12 xl:col-span-6 mb-2"
                                            field={field}
                                            error={errors.size?.message}
                                            loading={isProductLoading}>
                                                <p className="text-[.9375rem] font-semibold mb-2">{t("PRODUCTS.DETAILS.LABELS.sizes")} :</p>
                                        </FormSelect>
                                    )}
                                />
                            </div>
                            <div className="col-span-12 mt-4 xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-12 md:mt-0">
                                <FormInput 
                                    type='number'
                                    required={true}
                                    name='quantity'
                                    props={register("quantity",{valueAsNumber:true})}
                                    error={errors.quantity?.message}
                                    loading={isProductLoading}>
                                    {t("PRODUCTS.DETAILS.LABELS.quantity")}
                                </FormInput>
                            </div>
                        </div>
                    </form>
                    
                    <ProductInfo 
                        brand={productBrands.name}
                        color='Red'
                        modelName={product.title}
                        availabilityStatus={product.availabilityStatusLabel}
                        publishStatus={product.publishStatusLabel}
                        loading={isProductLoading}/>
                    <div className="mb-4">
                        <p className="text-[.9375rem] font-semibold mb-2">{t("PRODUCTS.DETAILS.LABELS.fabric-details")} :</p>
                        <FabricDetails 
                            details={product.fabricDetails}
                            loading={isProductLoading}/>
                    </div>
                    <div className="mb-4">
                        <p className="text-[.9375rem] font-semibold mb-2">{t("PRODUCTS.DETAILS.LABELS.care-instructions")} :</p>
                        <CareInstructions 
                            instructions={product.careInstructions}
                            loading={isProductLoading}/>
                    </div>
                    <div className="mb-0">
                        <p className="text-[.9375rem] font-semibold mb-3">{t("PRODUCTS.DETAILS.LABELS.reviews")} &amp; {t("PRODUCTS.DETAILS.LABELS.ratings")} :</p>
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
                        <ButtonGroup 
                            isLoading={mutationLoading}
                            handleAddToCart={handleSubmit(onAddToCart)}/>
                    </div>
                </div>
            </div>
        )
    }

    
}

export default Product