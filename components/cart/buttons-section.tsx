'use client';

import { useTranslations } from "next-intl";
import Link from "next/link";
import FormButton from "@/shared/components/button/form-button";
import { useMutateUserCart } from "./hooks/useMutateUserCart";

const ButtonSection = () => {
    const t = useTranslations("CART.BUTTONS");
    const {
        mutationLoading,
        updateRequests,
        numberOfCartItems,
        handleUpdateItems,
        handleClearCart
    } = useMutateUserCart();

    const canUpdateCart = updateRequests.length > 0;

    const onUpdateItems = () =>{
        handleUpdateItems(updateRequests);
    }
    
    
    return (
        <div className="grid gap-2 p-4">
            {numberOfCartItems && numberOfCartItems>0 &&(
                <>
                    <FormButton 
                        intent="info" 
                        size="md" 
                        type="button"
                        className="ti-btn !font-medium text-white w-full"
                        isLoading={mutationLoading}
                        disabled={mutationLoading || !canUpdateCart}
                        onClick={onUpdateItems}>
                        {t(`update-cart`)}
                    </FormButton>
                    <FormButton 
                        intent="danger" 
                        size="md" 
                        type="button"
                        className="ti-btn !font-medium text-white w-full"
                        isLoading={mutationLoading}
                        disabled={mutationLoading}
                        onClick={handleClearCart}>
                        {t(`clear-cart`)}
                    </FormButton>
                    <Link 
                        href="/checkout/" 
                        className="ti-btn bg-success hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white !font-medium !mb-2">
                            {t("proceed-to-checkout")}
                    </Link>
                </>
            )}
            
            <Link 
                href="/products/search" 
                className="ti-btn bg-light hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700  !font-medium">
                    {t("continue-shopping")}
            </Link>
        </div>
    )
}

export default ButtonSection