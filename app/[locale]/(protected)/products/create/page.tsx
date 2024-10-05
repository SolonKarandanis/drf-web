import PageHeader from "@/shared/layout-components/page-header/PageHeader";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata:Metadata={
    title:"Drf Create Product",
    description:"Drf market place",
    authors:[
      {
        name:"Solon Karandanis",
      }
    ]
}

const CreateProductPage =() =>{
    const t = useTranslations("PRODUCTS.EDIT.PAGE");

    return (
        <>
            <PageHeader 
                currentpage={t("currentpage")} 
                activepage={t("activepage")}
                mainpage={t("mainpage")} />
            <div className="inset-0 flex flex-col justify-between p-24">
                create product
            </div>
        </>
    )
}

export default CreateProductPage