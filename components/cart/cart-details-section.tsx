'use client';

import CurrencyFormatter from "@/shared/components/currency-formatter/currency-formatter";
import { useTranslations } from "next-intl";
import { useCartContext } from "./providers/cart-context";

const CartDetailsSection = () => {
    const t = useTranslations("CART.LABELS");
    const {
        state
    }= useCartContext();
    const {totalCartValue} = state;
    return (
        <div className="p-4 border-b border-dashed dark:border-defaultborder/10">
            <div className="flex items-center justify-between mb-4">
                <div className="text-[#8c9097] dark:text-white/50 opacity-[0.7]">
                    {t("sub-total")}
                </div>
                <div className="font-semibold text-[0.875rem]">
                    <CurrencyFormatter amount={totalCartValue} />
                </div>
            </div>
            <div className="flex items-center justify-between mb-4">
                <div className="text-[#8c9097] dark:text-white/50 opacity-[0.7]">
                    {t("discount")}
                </div>
                <div className="font-semibold text-[0.875rem] text-success">10% - $129</div>
            </div>
            <div className="flex items-center justify-between mb-4">
                <div className="text-[#8c9097] dark:text-white/50 opacity-[0.7]">
                    {t("delivery-charges")}
                </div>
                <div className="font-semibold text-[0.875rem] text-danger">- $49</div>
            </div>
            <div className="flex items-center justify-between mb-4">
                <div className="text-[#8c9097] dark:text-white/50 opacity-[0.7]">
                    {t("service-tax")} (18%)
                </div>
                <div className="font-semibold text-[0.875rem]">- $169</div>
            </div>
            <div className="flex items-center justify-between">
                <div className="text-[#8c9097] dark:text-white/50 opacity-[0.7]">
                    {t("total")} :
                </div>
                <div className="font-semibold text-[0.875rem] text-sky-600">
                    <CurrencyFormatter amount={totalCartValue} />
                </div>
            </div>
        </div>
    )
}

export default CartDetailsSection