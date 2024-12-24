import PageHeader from "@/shared/layout-components/page-header/PageHeader";
import { Metadata } from "next"
import { useTranslations } from "next-intl";
import ProductsHeader from "@/components/products/search/products-header";
import Pagination from "@/components/products/search/pagination";
import ProductsSidebar from "@/components/products/search/products-sidebar";
import ProductResults from "@/components/products/search/product-results";




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
                <div className="mb-6">
                    <div className="grid grid-cols-12 gap-x-6">
                        <ProductsHeader />
                        <ProductsSidebar />
                        <div className="col-span-12 xxl:col-span-9 xl:col-span-8 lg:col-span-8 md:col-span-12">
                            <ProductResults />
                        </div>
                    </div>
                </div>
                <Pagination />
            </div>
        </>
    )

}

export default SearchProductsPage