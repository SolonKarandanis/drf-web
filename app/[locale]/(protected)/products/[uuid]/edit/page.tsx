import EditProductWrapper from "@/components/products/edit/edit-product-wrapper";
import PageHeader from "@/shared/layout-components/page-header/PageHeader";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { FC } from "react";


export const metadata:Metadata={
    title:"Drf Edit Product",
    description:"Drf market place",
    authors:[
      {
        name:"Solon Karandanis",
      }
    ]
}

interface Props{
    params:{
        uuid:string;
    }
}

const EditProductPage:FC<Props>  = ({params:{uuid}}) =>{
    const t = useTranslations("PRODUCTS.EDIT.PAGE");

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
                                <EditProductWrapper  uuid={uuid} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProductPage