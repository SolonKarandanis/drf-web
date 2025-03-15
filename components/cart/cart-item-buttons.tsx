"use client"

import FormButton from "@/shared/components/button/form-button"
import { useTranslations } from "next-intl";
import { FC } from "react";
import { useMutateUserCart } from "./hooks/useMutateUserCart";
import { DeleteCartItemRequest } from "@/models/cart.models";
import { useCartApi, useCartData } from "./providers/cart-context";

interface Props{
    itemId:number;
}

const CartItemButtons:FC<Props> = ({
    itemId
}) => {
    const {
        isLoading
    }= useCartData();
    const {
        onDeleteItem
    }= useCartApi();
    
    const handleAddToWishList = (cartItemId:number)=>{
    }
    
    const t = useTranslations("CART.BUTTONS");
    return (
        <div className="flex items-center">
            <div className="hs-tooltip ti-main-tooltip">
                <button 
                    onClick={()=>handleAddToWishList(itemId)} 
                    className="hs-tooltip-toggle ti-btn ti-btn-icon bg-success text-white !font-medium me-1">
                    <i className="ri-heart-line"></i>
                    <span
                        className="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm "
                        role="tooltip">
                        {t("add-to-wishlist")} 
                    </span>
                </button>
            </div>
            <div className="hs-tooltip ti-main-tooltip ltr:[--placement:left] rtl:[--placement:right]">
                <FormButton 
                    intent="info" 
                    size="sm" 
                    type="button"
                    className="hs-tooltip-toggle ti-btn ti-btn-icon bg-danger text-white !font-medium btn-delete !pr-1"
                    isLoading={isLoading}
                    disabled={isLoading}
                    onClick={()=>onDeleteItem(itemId)}>
                    <i className="ri-delete-bin-line"></i>
                    <span
                        className="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm "
                        role="tooltip">
                        {t("remove-from-cart")}
                    </span>
                </FormButton>
            </div>
        </div>
    )
}

export default CartItemButtons