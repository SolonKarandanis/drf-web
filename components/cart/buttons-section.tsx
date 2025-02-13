'use client';

import { useTranslations } from "next-intl";
import Link from "next/link";

const ButtonSection = () => {
    const t = useTranslations("CART.BUTTONS");
    return (
        <div className="grid p-4">
            <Link 
                href="/components/pages/ecommerce/checkout/" 
                className="ti-btn bg-success  text-white !font-medium !mb-2">
                    {t("proceed-to-checkout")}
            </Link>
            <Link 
                href="/products/search" 
                className="ti-btn bg-light  !font-medium">
                    {t("continue-shopping")}
            </Link>
        </div>
    )
}

export default ButtonSection