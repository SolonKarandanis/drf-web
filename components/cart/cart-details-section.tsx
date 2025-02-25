'use client';

import CurrencyFormatter from "@/shared/components/currency-formatter/currency-formatter";
import { useCartData } from "./providers/cart-context";

const CartDetailsSection = () => {
    const {
        totalCartValue
    }= useCartData();
    return (
        <div className="p-4 border-b border-dashed dark:border-defaultborder/10">
            <div className="flex items-center justify-between mb-4">
                <div className="text-[#8c9097] dark:text-white/50 opacity-[0.7]">Sub Total</div>
                <div className="font-semibold text-[0.875rem]">
                    <CurrencyFormatter amount={totalCartValue} />
                </div>
            </div>
            <div className="flex items-center justify-between mb-4">
                <div className="text-[#8c9097] dark:text-white/50 opacity-[0.7]">Discount</div>
                <div className="font-semibold text-[0.875rem] text-success">10% - $129</div>
            </div>
            <div className="flex items-center justify-between mb-4">
                <div className="text-[#8c9097] dark:text-white/50 opacity-[0.7]">Delivery Charges</div>
                <div className="font-semibold text-[0.875rem] text-danger">- $49</div>
            </div>
            <div className="flex items-center justify-between mb-4">
                <div className="text-[#8c9097] dark:text-white/50 opacity-[0.7]">Service Tax (18%)</div>
                <div className="font-semibold text-[0.875rem]">- $169</div>
            </div>
            <div className="flex items-center justify-between">
                <div className="text-[#8c9097] dark:text-white/50 opacity-[0.7]">Total :</div>
                <div className="font-semibold text-[0.875rem] text-sky-600">
                    <CurrencyFormatter amount={totalCartValue} />
                </div>
            </div>
        </div>
    )
}

export default CartDetailsSection