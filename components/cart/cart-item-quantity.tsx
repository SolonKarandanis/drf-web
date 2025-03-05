"use client"

import { ChangeEvent, FC } from "react";

interface Props {
    quantity:number;
    onSubtractQuantity:()=>void;
    onAddQuantity:()=>void;
    onChange:(event:ChangeEvent<HTMLInputElement>)=>void;
}

const CartItemQuantity:FC<Props> = ({
    quantity,
    onAddQuantity,
    onSubtractQuantity,
    onChange,
}) => {
  return (
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
  )
}

export default CartItemQuantity