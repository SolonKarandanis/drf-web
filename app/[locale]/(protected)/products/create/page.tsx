import CreateForm from "@/components/products/create/createform";
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
                                <CreateForm />
                                <div className="justify-end px-6 py-4 border-t border-dashed dark:border-defaultborder/10 sm:flex">
                                    <button 
                                        type="button" 
                                        className="ti-btn ti-btn-primary !font-medium m-1">
                                        Add Product<i className="bi bi-plus-lg ms-2"></i>
                                    </button>
                                    <button 
                                        type="button" 
                                        className="ti-btn ti-btn-success !font-medium m-1">
                                        Save Product<i className="bi bi-download ms-2"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateProductPage