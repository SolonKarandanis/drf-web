'use client';

import CurrencyFormatter from "@/shared/components/currency-formatter/currency-formatter";
import { useTranslations } from "next-intl";
import { useGetUserCart } from "./hooks/useGetUserCart";

const CartDetailsSection = () => {
    const t = useTranslations("CART.LABELS");
    const {
        totalCartValue,
        isLoading
    }=useGetUserCart();
    return (
        <div className="p-4 border-b border-dashed dark:border-defaultborder/10">
            <div className="flex items-center justify-between mb-4">
                <div className="text-[#8c9097] dark:text-white/50 opacity-[0.7]">
                    {t("sub-total")}
                </div>
                {!isLoading &&(
                    <div className="font-semibold text-[0.875rem]">
                        <CurrencyFormatter amount={totalCartValue} />
                    </div>
                )}
                {isLoading && (
                    <div className="animate-pulse font-semibold text-[0.875rem]">
                        <div className="h-3 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5 w-20"></div>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-between mb-4">
                <div className="text-[#8c9097] dark:text-white/50 opacity-[0.7]">
                    {t("discount")}
                </div>
                {!isLoading &&(
                    <div className="font-semibold text-[0.875rem] text-success">10% - $129</div>
                )}
                {isLoading && (
                    <div className="animate-pulse font-semibold text-[0.875rem]">
                        <div className="h-3 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5 w-20"></div>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-between mb-4">
                <div className="text-[#8c9097] dark:text-white/50 opacity-[0.7]">
                    {t("delivery-charges")}
                </div>
                {!isLoading &&(
                    <div className="font-semibold text-[0.875rem] text-danger">- $49</div>
                )}
                {isLoading && (
                    <div className="animate-pulse font-semibold text-[0.875rem]">
                        <div className="h-3 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5 w-20"></div>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-between mb-4">
                <div className="text-[#8c9097] dark:text-white/50 opacity-[0.7]">
                    {t("service-tax")} (18%)
                </div>
                {!isLoading &&(
                   <div className="font-semibold text-[0.875rem]">- $169</div>
                )}
                {isLoading && (
                    <div className="animate-pulse font-semibold text-[0.875rem]">
                        <div className="h-3 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5 w-20"></div>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-between">
                <div className="text-[#8c9097] dark:text-white/50 opacity-[0.7]">
                    {t("total")} :
                </div>
                {!isLoading &&(
                    <div className="font-semibold text-[0.875rem] text-sky-600">
                        <CurrencyFormatter amount={totalCartValue} />
                    </div>
                )}
                {isLoading && (
                    <div className="animate-pulse font-semibold text-[0.875rem]">
                        <div className="h-3 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5 w-20"></div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartDetailsSection