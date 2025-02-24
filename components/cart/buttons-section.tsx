'use client';

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useMutateUserCart } from "./hooks/useMutateUserCart";
import FormButton from "@/shared/components/button/form-button";

const ButtonSection = () => {
    const t = useTranslations("CART.BUTTONS");
     const {
        mutationLoading,
        handleUpdateItemQuantities,
        handleClearCart,
    } = useMutateUserCart();
    
    
    return (
        <div className="grid gap-2 p-4">
            <FormButton 
                intent="info" 
                size="md" 
                type="button"
                className="ti-btn !font-medium text-white"
                isLoading={mutationLoading}
                disabled={mutationLoading}
                onClick={handleUpdateItemQuantities}>
                {t(`update-cart`)}
            </FormButton>
            <FormButton 
                intent="danger" 
                size="md" 
                type="button"
                className="ti-btn !font-medium text-white"
                isLoading={mutationLoading}
                disabled={mutationLoading}
                onClick={handleClearCart}>
                {t(`clear-cart`)}
            </FormButton>
            <Link 
                href="/components/pages/ecommerce/checkout/" 
                className="ti-btn bg-success hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white !font-medium !mb-2">
                    {t("proceed-to-checkout")}
            </Link>
            <Link 
                href="/products/search" 
                className="ti-btn bg-light hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700  !font-medium">
                    {t("continue-shopping")}
            </Link>
        </div>
    )
}

export default ButtonSection