'use client';

import Link from "next/link";
import { useGetUserCart } from "./hooks/useGetUserCart";
import { useAppSelector } from "@/shared/redux/hooks";
import CurrencyFormatter from "@/shared/components/currency-formatter/currency-formatter";
import { useGetProductMisc } from "../products/hooks/useGetProductMisc";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMutateUserCart } from "./hooks/useMutateUserCart";
import { DeleteCartItemRequest } from "@/models/cart.models";
import { ChangeEvent, useState } from "react";
import { useCartApi } from "./providers/cart-context";
import FormButton from "@/shared/components/button/form-button";

const CartItemsSection = () => {
    const t = useTranslations("CART");
    const router = useRouter(); 
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

    const handleProceedToShopping=()=>{
        router.push("/products/search");
    }

    const handleAddToWishList = (cartItemId:number)=>{

    }

    const handleRemoveFromCart = (cartItemId:number) =>{
        const request:DeleteCartItemRequest={
            cartItemId
        };
        handleDeleteItemsFromCart([request]);
    }

    return (
        <div className="col-span-12 xxl:col-span-9">
            {!cartItems || cartItems.length ==0 && (
                <div className="box !hidden" id="cart-empty-cart">
                    <div className="box-header">
                        <div className="box-title">
                        {t("LABELS.empty-cart-title")}
                        </div>
                    </div>
                    <div className="flex items-center justify-center box-body">
                        <div className="text-center cart-empty">
                            <svg xmlns="http://www.w3.org/2000/svg" className="svg-muted" width="24" height="24" viewBox="0 0 24 24"><path d="M18.6 16.5H8.9c-.9 0-1.6-.6-1.9-1.4L4.8 6.7c0-.1 0-.3.1-.4.1-.1.2-.1.4-.1h17.1c.1 0 .3.1.4.2.1.1.1.3.1.4L20.5 15c-.2.8-1 1.5-1.9 1.5zM5.9 7.1 8 14.8c.1.4.5.8 1 .8h9.7c.5 0 .9-.3 1-.8l2.1-7.7H5.9z" /><path d="M6 10.9 3.7 2.5H1.3v-.9H4c.2 0 .4.1.4.3l2.4 8.7-.8.3zM8.1 18.8 6 11l.9-.3L9 18.5z" /><path d="M20.8 20.4h-.9V20c0-.7-.6-1.3-1.3-1.3H8.9c-.7 0-1.3.6-1.3 1.3v.5h-.9V20c0-1.2 1-2.2 2.2-2.2h9.7c1.2 0 2.2 1 2.2 2.2v.4z" /><path d="M8.9 22.2c-1.2 0-2.2-1-2.2-2.2s1-2.2 2.2-2.2c1.2 0 2.2 1 2.2 2.2s-1 2.2-2.2 2.2zm0-3.5c-.7 0-1.3.6-1.3 1.3 0 .7.6 1.3 1.3 1.3.8 0 1.3-.6 1.3-1.3 0-.7-.5-1.3-1.3-1.3zM18.6 22.2c-1.2 0-2.2-1-2.2-2.2s1-2.2 2.2-2.2c1.2 0 2.2 1 2.2 2.2s-.9 2.2-2.2 2.2zm0-3.5c-.8 0-1.3.6-1.3 1.3 0 .7.6 1.3 1.3 1.3.7 0 1.3-.6 1.3-1.3 0-.7-.5-1.3-1.3-1.3z" /></svg>
                            <h3 className="font-bold mb-1 text-[1.75rem]">
                                {t("LABELS.empty-cart-description")}
                            </h3>
                            <button 
                                onClick={handleProceedToShopping}
                                className="ti-btn bg-primary text-white !font-medium m-4" 
                                data-abc="true">
                                {t("BUTTONS.continue-shopping")} 
                                <i className="bi bi-arrow-right ms-1"></i>
                            </button>
                        </div>
                    </div>
                </div>                      
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
                                        console.log(productItemAttributes);
                                        console.log(selectedItemAttributes);

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
                                                        <div>
                                                            <div className="mb-1 text-[0.875rem] font-semibold">
                                                                <Link href={`/products/${item.productDetails.uuid}`}>
                                                                    {`(${item.productDetails.sku}) ${item.productDetails.title}`}
                                                                </Link>
                                                            </div>
                                                            <div className="flex items-center mb-1 align-middle">
                                                                <span className="me-1">{t("LABELS.size")}:</span>
                                                                <span className="font-semibold text-[#8c9097] dark:text-white/50">Large</span>
                                                            </div>
                                                            <div className="flex items-center mb-1 align-middle">
                                                                <span className="me-1">{t("LABELS.color")}:</span>
                                                                <span className="font-semibold text-[#8c9097] dark:text-white/50">Grey</span>
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
                                                            {/* <button 
                                                                onClick={()=>handleRemoveFromCart(item.id)}
                                                                className="hs-tooltip-toggle ti-btn ti-btn-icon bg-danger text-white !font-medium btn-delete">
                                                                <i className="ri-delete-bin-line"></i>
                                                                <span
                                                                    className="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm "
                                                                    role="tooltip">
                                                                    {t("BUTTONS.remove-from-cart")}
                                                                </span>
                                                            </button> */}
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