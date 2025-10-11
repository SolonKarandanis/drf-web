"use client";

import PageHeader from "@/shared/layout-components/page-header/PageHeader";
import { useTranslations } from "next-intl";

const EditProductPageHeader = () => {
    const t = useTranslations("PRODUCTS.EDIT.PAGE");

    return (
        <PageHeader 
            currentpage={t("currentpage")} 
            activepage={t("activepage")}
            mainpage={t("mainpage")} 
        />
    )
}

export default EditProductPageHeader;