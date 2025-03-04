'use client';

import CurrencyFormatter from "@/shared/components/currency-formatter/currency-formatter";
import { useTranslations } from "next-intl";
import { ChangeEvent, useState } from "react";
import { useCartApi, useCartData } from "./providers/cart-context";
import EmptyCart from "./empty-cart";
import CartItemButtons from "./cart-item-buttons";
import CartItemAttributes from "./cart-item-attributes";
import CartItemQuantity from "./cart-item-quantity";

const CartItemsSection = () => {
    const t = useTranslations("CART");
    const {
        handleSetQuantity
    }= useCartApi();
    const {
        cartItems,
        productItemsAttributes
    } = useCartData();

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
                                                        productItemsAttributes={productItemsAttributes}/>
                                                </td>
                                                <td>
                                                    <div className="font-semibold text-[0.875rem]">
                                                        <CurrencyFormatter amount={item.unitPrice} />
                                                    </div>
                                                </td>
                                                <td className="product-quantity-container">
                                                    <CartItemQuantity
                                                        quantity={quantity}
                                                        onSubtractQuantity={onSubtractQuantity}
                                                        onAddQuantity={onAddQuantity}
                                                        onChange={onChange}/>
                                                </td>
                                                <td>
                                                    <div className="text-[0.875rem] font-semibold">
                                                        <CurrencyFormatter amount={totalPrice} />
                                                    </div>
                                                </td>
                                                <td>
                                                    <CartItemButtons
                                                        itemId={item.id}/>
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