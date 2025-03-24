"use client"

import { CartItem } from "@/models/cart.models"
import { ProductAttributes } from "@/models/product.models";
import { ChangeEvent, FC } from "react";
import CartItemAttributes from "./cart-item-attributes";
import CurrencyFormatter from "@/shared/components/currency-formatter/currency-formatter";
import CartItemQuantity from "./cart-item-quantity";
import CartItemButtons from "./cart-item-buttons";

interface Props{
    cartItems: CartItem[];
    productItemsAttributes: Record<number, ProductAttributes>
    onSetQuantity:(cartItemId:number,quantity:number)=>void;
}

const CartItems:FC<Props> = ({cartItems,productItemsAttributes,onSetQuantity}) => {
  return (
    <tbody>
        {cartItems.map((item) => {
            const cartItemId=item.id;
            const price = item.unitPrice

            const onAddQuantity = () =>{
                const newQuantity = item.quantity +1;
                onSetQuantity(cartItemId,newQuantity);
            }

            const onSubtractQuantity = () =>{
                const newQuantity = item.quantity +1;
                onSetQuantity(cartItemId,newQuantity);
            }

            const onChange = (event:ChangeEvent<HTMLInputElement>)=>{
                const newQuantity = Number(event.target.value);
                onSetQuantity(cartItemId,newQuantity);
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
                            quantity={item.quantity}
                            onSubtractQuantity={onSubtractQuantity}
                            onAddQuantity={onAddQuantity}
                            onChange={onChange}/>
                    </td>
                    <td>
                        <div className="text-[0.875rem] font-semibold">
                            <CurrencyFormatter amount={item.totalPrice} />
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
  )
}

export default CartItems