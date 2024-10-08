import { Addproduct, Addproduct1 } from "@/components/products/search/product-data";
import PageHeader from "@/shared/layout-components/page-header/PageHeader";
const Select = dynamic(() => import("react-select"), { ssr: false });
import { Metadata } from "next";
import dynamic from 'next/dynamic';
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
                                <div className="grid grid-cols-12 md:gap-x-[3rem] gap-0">
                                    <div className="col-span-12 xxl:col-span-6 xl:col-span-12 lg:col-span-12 md:col-span-6">
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12 xl:col-span-12">
                                                <label htmlFor="product-name-add" className="form-label">
                                                    Product Name
                                                </label>
                                                <input type="text" 
                                                    className="form-control w-full !rounded-md" 
                                                    id="product-name-add" 
                                                    placeholder="Name" />
                                                <label htmlFor="product-name-add" 
                                                    className="form-label mt-1 text-[0.75rem] opacity-[0.5] 
                                                        !text-[#8c9097] dark:text-white/50 !mb-0">
                                                        *Product Name should not exceed 30 characters
                                                </label>
                                                <div className="col-span-12 xl:col-span-6">
                                                    <label htmlFor="product-category-add" className="form-label">Category</label>
                                                    <Select 
                                                        id="product-category-add"  
                                                        name="product-category-add" 
                                                        options={Addproduct} 
                                                        className="w-full !rounded-md" 
                                                        isSearchable
                                                        menuPlacement='auto' 
                                                        classNamePrefix="Select2" 
                                                        placeholder="Category"
                                                    />
                                                </div>
                                                <div className="col-span-12 xl:col-span-6">
                                                    <label 
                                                        htmlFor="product-gender-add" 
                                                        className="form-label">
                                                        Gender
                                                    </label>
                                                    <Select 
                                                        id="product-gender-add"
                                                        name="product-gender-add" 
                                                        options={Addproduct1} 
                                                        className="w-full !rounded-md" 
                                                        isSearchable
                                                        menuPlacement='auto' 
                                                        classNamePrefix="Select2" 
                                                        placeholder="Select"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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