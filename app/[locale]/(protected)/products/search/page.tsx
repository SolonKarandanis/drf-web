import PageHeader from "@/shared/layout-components/page-header/PageHeader";
import { Metadata } from "next"
import { useTranslations } from "next-intl";
import Products from "./products";




export const metadata:Metadata={
    title:"Drf Search Products",
    description:"Drf market place",
    authors:[
      {
        name:"Solon Karandanis",
      }
    ]
}

const SearchProductsPage =() =>{
    const t = useTranslations("PRODUCTS.SEARCH.PAGE");
    

    return (
        <>
            <PageHeader 
                currentpage={t("currentpage")} 
                activepage={t("activepage")}
                mainpage={t("mainpage")} />
            <div className="inset-0 flex flex-col justify-between p-24">
                <Products />
            </div>
        </>
    )

}

export default SearchProductsPage