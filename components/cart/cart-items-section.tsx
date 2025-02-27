'use client';

import Link from "next/link";
import { useGetUserCart } from "./hooks/useGetUserCart";
import { useAppSelector } from "@/shared/redux/hooks";
import CurrencyFormatter from "@/shared/components/currency-formatter/currency-formatter";
import { useGetProductMisc } from "../products/hooks/useGetProductMisc";
import { useTranslations } from "next-intl";
import { useMutateUserCart } from "./hooks/useMutateUserCart";
import { DeleteCartItemRequest } from "@/models/cart.models";
import { ChangeEvent, useState } from "react";
import { useCartApi } from "./providers/cart-context";
import FormButton from "@/shared/components/button/form-button";
import FormSelect from "@/shared/components/form-select/form-select";
import { Controller, useForm } from "react-hook-form";
import { 
    getUpdateCartItemAttributesSchema, 
    getUpdateCartItemQuantitiesSchema, 
    UpdateCartItemAttributesSchema, 
    UpdateCartItemQuantitiesSchema
} from "@/schemas/cart.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import EmptyCart from "./empty-cart";

const CartItemsSection = () => {
    const t = useTranslations("CART");
    const formT = useTranslations("CART.VALIDATION");
    const {
        cartItems,
        productItemsAttributes,
        isError,
        isLoading,
    } = useGetUserCart();
    const {
        sizesOptions,
        coloursOptions,
    } = useGetProductMisc();
    const {
        mutationLoading,
        handleDeleteItemsFromCart,
    } = useMutateUserCart();
    const {
        handleSetQuantity
    }= useCartApi();


    const configState = useAppSelector((state)=>state.config);
    const path = configState.baseUrl
    const host = configState.djangoHost


    const handleAddToWishList = (cartItemId:number)=>{

    }

    const handleRemoveFromCart = (cartItemId:number) =>{
        const request:DeleteCartItemRequest={
            cartItemId
        };
        handleDeleteItemsFromCart([request]);
    }

    const updatequantitiesForm = useForm<UpdateCartItemQuantitiesSchema>({
        resolver: zodResolver(getUpdateCartItemQuantitiesSchema(formT))
    });

    const updateAttributesForm = useForm<UpdateCartItemAttributesSchema>({
        resolver: zodResolver(getUpdateCartItemAttributesSchema(formT))
    });
    const {errors} = updateAttributesForm.formState;

    return (
        <div className="col-span-12 xxl:col-span-9">
            {!cartItems || cartItems.length ==0 && (
                <EmptyCart />           
            )}
            {cartItems && cartItems.length>0 && (
                <div className="box" id="cart-container-delete">
                    <div className="box-header">
                        <div className="box-title">
                            {t("PAGE.cart-items")}
                        </div>
                    </div>
                    <div className="box-body">
                        <div className="table-responsive">
                            <table className="table min-w-full table-bordered whitespace-nowrap">
                                <thead>
                                    <tr>
                                        <th scope="row" className="text-start">
                                            {t("LABELS.product-name")}
                                        </th>
                                        <th scope="row" className="text-start">
                                            {t("LABELS.price")}
                                        </th>
                                        <th scope="row" className="text-start">
                                            {t("LABELS.quantity")}
                                        </th>
                                        <th scope="row" className="text-start">
                                            {t("LABELS.total")}
                                        </th>
                                        <th scope="row" className="text-start">
                                            {t("LABELS.action")}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => {
                                        const productImage = item.previewImage
                                        const imagePath = productImage ?   `${host}${productImage.image}` : `${path}/assets/images/faces/21.jpg`;
                                        const [quantity,setQuantity]= useState<number>(item.quantity);
                                        const [totalPrice,setTotalPrice]= useState<number>(item.totalPrice);
                                        const cartItemId=item.id;
                                        const price = item.unitPrice
                                        const selectedItemAttributes = item.attributes;
                                        const productItemAttributes = productItemsAttributes[item.id];
                                        const productSizes=productItemAttributes.sizes.map(size=>size.attributeOptionId);
                                        const productColors=productItemAttributes.colors.map(color=>color.attributeOptionId);
                                        const productSizesOptions = sizesOptions.filter(option=>productSizes.includes(option.value as number));
                                        const productColorOptions = coloursOptions.filter(option=>productColors.includes(option.value as number));
                                        const selectedSize = selectedItemAttributes[1];
                                        const selectedColor = selectedItemAttributes[2];

                                        const onAddQuantity = () =>{
                                            const newQuantity = quantity +1;
                                            const newTotalLinePrice = newQuantity * price
                                            setQuantity(newQuantity);
                                            setTotalPrice(newTotalLinePrice);
                                            handleSetQuantity(cartItemId,newQuantity);
                                        }

                                        const onSubtractQuantity = () =>{
                                            const newQuantity = quantity -1;
                                            const newTotalLinePrice = newQuantity * price
                                            setQuantity(newQuantity);
                                            setTotalPrice(newTotalLinePrice);
                                            handleSetQuantity(cartItemId,newQuantity);
                                        }

                                        const onChange = (event:ChangeEvent<HTMLInputElement>)=>{
                                            const newQuantity = Number(event.target.value);
                                            const newTotalLinePrice = newQuantity * price
                                            setQuantity(newQuantity);
                                            setTotalPrice(newTotalLinePrice);
                                            handleSetQuantity(cartItemId,newQuantity);
                                        }

                                        return (
                                            <tr className="border border-solid border-inherit dark:border-defaultborder/10" key={item.id}>
                                                <td>
                                                    <div className="flex items-center">
                                                        <div className="me-4">
                                                            <span className="avatar avatar-xxl bg-light">
                                                                <img src={imagePath} alt="" />
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <div className="mb-1 text-[0.875rem] font-semibold">
                                                                <Link href={`/products/${item.productDetails.uuid}`}>
                                                                    {`(${item.productDetails.sku}) ${item.productDetails.title}`}
                                                                </Link>
                                                            </div>
                                                            <div className="flex flex-row items-center justify-start gap-2 mb-1">
                                                                <span className="me-1">{t("LABELS.size")}:</span>
                                                                <Controller
                                                                    name="size"
                                                                    control={updateAttributesForm.control}
                                                                    render={({ field }) => (
                                                                        <FormSelect 
                                                                            name="size"
                                                                            isMulti={false}
                                                                            required={true}
                                                                            isSearchable={true}
                                                                            options={productSizesOptions}
                                                                            defaultValues={[selectedSize]}
                                                                            sectionClassName="col-span-12 xl:col-span-6 mb-2 min-w-[10rem]"
                                                                            field={field}
                                                                            error={errors.size?.message}
                                                                            loading={mutationLoading}>
                                                                        </FormSelect>
                                                                    )}
                                                                />
                                                            </div>
                                                            <div className="flex flex-row items-center justify-start mb-1">
                                                                <span className="me-1">{t("LABELS.color")}:</span>
                                                                <Controller
                                                                    name="color"
                                                                    control={updateAttributesForm.control}
                                                                    render={({ field }) => (
                                                                        <FormSelect 
                                                                            name="color"
                                                                            isMulti={false}
                                                                            required={true}
                                                                            isSearchable={true}
                                                                            options={productColorOptions}
                                                                            defaultValues={[selectedColor]}
                                                                            sectionClassName="col-span-12 xl:col-span-6 mb-2 min-w-[10rem]"
                                                                            field={field}
                                                                            error={errors.size?.message}
                                                                            loading={mutationLoading}>
                                                                        </FormSelect>
                                                                    )}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="font-semibold text-[0.875rem]">
                                                        <CurrencyFormatter amount={item.unitPrice} />
                                                    </div>
                                                </td>
                                                <td className="product-quantity-container">
                                                    <div className="input-group dark:border-defaultborder/10 rounded-md !flex-nowrap">
                                                        <button 
                                                            aria-label="button" 
                                                            type="button"
                                                            className="!border-0 ti-btn ti-btn-icon ti-btn-light  input-group-text flex-grow 
                                                                product-quantity-minus !mb-0" 
                                                            onClick={onSubtractQuantity}>
                                                                <i className="ri-subtract-line"></i>
                                                        </button>
                                                        <input 
                                                            type="text" 
                                                            className="form-control form-control-sm text-center !w-[50px] !px-0" 
                                                            aria-label="quantity" 
                                                            id="product-quantity" 
                                                            value={quantity} 
                                                            onChange={(e)=>onChange(e)}/>
                                                        <button 
                                                            aria-label="button" 
                                                            type="button" 
                                                            className="!border-0 ti-btn ti-btn-icon ti-btn-light input-group-text flex-grow 
                                                                product-quantity-plus !mb-0" 
                                                            onClick={onAddQuantity}>
                                                                <i className="ri-add-line"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="text-[0.875rem] font-semibold">
                                                        <CurrencyFormatter amount={totalPrice} />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="flex items-center">
                                                        <div className="hs-tooltip ti-main-tooltip">
                                                            <button 
                                                                onClick={()=>handleAddToWishList(item.id)} 
                                                                className="hs-tooltip-toggle ti-btn ti-btn-icon bg-success text-white !font-medium me-1">
                                                                <i className="ri-heart-line"></i>
                                                                <span
                                                                    className="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm "
                                                                    role="tooltip">
                                                                    {t("BUTTONS.add-to-wishlist")} 
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <div className="hs-tooltip ti-main-tooltip ltr:[--placement:left] rtl:[--placement:right]">
                                                            <FormButton 
                                                                intent="info" 
                                                                size="sm" 
                                                                type="button"
                                                                className="hs-tooltip-toggle ti-btn ti-btn-icon bg-danger text-white !font-medium btn-delete !pr-1"
                                                                isLoading={mutationLoading}
                                                                disabled={mutationLoading}
                                                                onClick={()=>handleRemoveFromCart(item.id)}>
                                                                <i className="ri-delete-bin-line"></i>
                                                                <span
                                                                    className="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm "
                                                                    role="tooltip">
                                                                    {t("BUTTONS.remove-from-cart")}
                                                                </span>
                                                            </FormButton>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartItemsSection