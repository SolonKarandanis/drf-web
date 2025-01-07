import CreateProductWrapper from "@/components/products/create/create-product-wrapper";
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
    const t = useTranslations("PRODUCTS.CREATE.PAGE");

    return (
        <>
            <PageHeader 
                currentpage={t("currentpage")} 
                activepage={t("activepage")}
                mainpage={t("mainpage")} />
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-12">
                    <div className="box">
                        <div className="box-body add-products !p-0">
                            <div className="p-6">
                                <CreateProductWrapper />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateProductPage