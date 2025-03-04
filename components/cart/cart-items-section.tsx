'use client';

import { useGetUserCart } from "./hooks/useGetUserCart";
import CurrencyFormatter from "@/shared/components/currency-formatter/currency-formatter";
import { useTranslations } from "next-intl";
import { useMutateUserCart } from "./hooks/useMutateUserCart";
import { DeleteCartItemRequest } from "@/models/cart.models";
import { ChangeEvent, useState } from "react";
import { useCartApi } from "./providers/cart-context";
import {useForm } from "react-hook-form";
import { 
    getUpdateCartItemQuantitiesSchema, 
    UpdateCartItemQuantitiesSchema
} from "@/schemas/cart.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import EmptyCart from "./empty-cart";
import CartItemButtons from "./cart-item-buttons";
import CartItemAttributes from "./cart-item-attributes";

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
        mutationLoading,
        handleDeleteItemsFromCart,
    } = useMutateUserCart();
    const {
        handleSetQuantity
    }= useCartApi();


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
                                        const [quantity,setQuantity]= useState<number>(item.quantity);
                                        const [totalPrice,setTotalPrice]= useState<number>(item.totalPrice);
                                        const cartItemId=item.id;
                                        const price = item.unitPrice

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
                                                    <CartItemAttributes 
                                                        item={item}
                                                        productItemsAttributes={productItemsAttributes}
                                                        isLoading={mutationLoading}/>
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
                                                    <CartItemButtons
                                                        isLoading={mutationLoading}
                                                        handleAddToWishList={()=>handleAddToWishList(item.id)}
                                                        handleDeleteItemsFromCart={()=>handleRemoveFromCart(item.id)}
                                                    />
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