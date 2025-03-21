'use client';

import { useTranslations } from "next-intl";
import EmptyCart from "./empty-cart";
import { useGetUserCart } from "./hooks/useGetUserCart";
import { useMutateUserCart } from "./hooks/useMutateUserCart";
import CartItems from "./cart-items";
import { ChangeEvent } from "react";

const CartItemsSection = () => {
    const t = useTranslations("CART");
    const {
        cartItems,
        productItemsAttributes
    }=useGetUserCart();

    const {
        onSetQuantity
    } = useMutateUserCart();

    const onAddQuantity = (cartItemId:number)=>{
        // const newQuantity = quantity +1;
        // const newTotalLinePrice = newQuantity * price
    }

    const onSubtractQuantity = (cartItemId:number) =>{

    }

    const onChange = (event:ChangeEvent<HTMLInputElement>)=>{

    }

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
                                <CartItems 
                                    cartItems={cartItems}
                                    productItemsAttributes={productItemsAttributes}
                                    onSetQuantity={onSetQuantity}/>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartItemsSection