import PageHeader from "@/shared/layout-components/page-header/PageHeader";
const Select = dynamic(() => import("react-select"), { ssr: false });
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
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
    // const [files, setFiles] = useState([]);
    // const [files1, setFiles1] = useState([]);

    // const [startDate, setStartDate] = useState(new Date());
    // const handleDateChange = (date) => {
    //     // Ensure date is defined before setting it
    //     if (date) {
    //         setStartDate(date);
    //     }
    // };

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
                                                    {/* <Select 
                                                        id="product-category-add"  
                                                        name="product-category-add" 
                                                        options={Addproduct} 
                                                        className="w-full !rounded-md" 
                                                        isSearchable
                                                        menuPlacement='auto' 
                                                        classNamePrefix="Select2" 
                                                        placeholder="Category"
                                                    /> */}
                                                </div>
                                                <div className="col-span-12 xl:col-span-6">
                                                    <label 
                                                        htmlFor="product-gender-add" 
                                                        className="form-label">
                                                        Gender
                                                    </label>
                                                    {/* <Select 
                                                        id="product-gender-add"
                                                        name="product-gender-add" 
                                                        options={Addproduct1} 
                                                        className="w-full !rounded-md" 
                                                        isSearchable
                                                        menuPlacement='auto' 
                                                        classNamePrefix="Select2" 
                                                        placeholder="Select"
                                                    /> */}
                                                </div>
                                                <div className="col-span-12 xl:col-span-6">
                                                    <label 
                                                        htmlFor="product-size-add" 
                                                        className="form-label">
                                                        Size
                                                    </label>
                                                    {/* <Select 
                                                        id="product-size-add" 
                                                        name="product-size-add" 
                                                        options={Addproduct2} 
                                                        className="w-full !rounded-md" 
                                                        isSearchable
                                                        menuPlacement='auto' 
                                                        classNamePrefix="Select2" 
                                                        placeholder="Select"
                                                    /> */}
                                                </div>
                                                <div className="col-span-12 xl:col-span-6">
                                                    <label 
                                                        htmlFor="product-brand-add" 
                                                        className="form-label">
                                                        Brand
                                                    </label>
                                                    {/* <Select 
                                                        id="product-brand-add"
                                                        name="product-brand-add" 
                                                        options={Addproduct3} 
                                                        className="w-full !rounded-md" 
                                                        isSearchable
                                                        menuPlacement='auto' 
                                                        classNamePrefix="Select2" 
                                                        placeholder="Select" 
                                                    /> */}
                                                </div>
                                                <div className="col-span-12 xl:col-span-6 color-selection">
                                                    <label 
                                                        htmlFor="product-color-add" 
                                                        className="form-label">
                                                        Colors
                                                    </label>
                                                    {/* <Select 
                                                        id="product-color-add"
                                                        isMulti name="colors" 
                                                        options={Addproduct4} 
                                                        className="w-full !rounded-md" 
                                                        isSearchable 
                                                        menuPlacement='auto' 
                                                        classNamePrefix="Select2" 
                                                        placeholder="Select"
                                                    /> */}
                                                </div>
                                                <div className="col-span-12 xl:col-span-6">
                                                    <label 
                                                        htmlFor="product-cost-add" 
                                                        className="form-label">
                                                        Enter Cost
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control w-full !rounded-md" 
                                                        id="product-cost-add" 
                                                        placeholder="Cost" />
                                                    <label 
                                                        htmlFor="product-cost-add" 
                                                        className="form-label mt-1 text-[0.75rem] opacity-[0.5] 
                                                        !text-[#8c9097] dark:text-white/50 mb-0">
                                                        *Mention final price of the product
                                                    </label>
                                                </div>
                                                <div className="col-span-12 xl:col-span-12">
                                                    <label 
                                                        htmlFor="product-description-add" 
                                                        className="form-label">
                                                        Product Description
                                                    </label>
                                                    <textarea 
                                                        className="form-control w-full !rounded-md" 
                                                        id="product-description-add" rows={2}></textarea>
                                                    <label 
                                                        htmlFor="product-description-add" 
                                                        className="form-label mt-1 text-[0.75rem] opacity-[0.5] 
                                                        !text-[#8c9097] dark:text-white/50 mb-0">
                                                        *Description should not exceed 500 letters
                                                    </label>
                                                </div>
                                                <div className="col-span-12 mb-4 xl:col-span-12">
                                                    <label className="form-label">Product Features</label>
                                                    <div id="product-features">
                                                        <ReactQuill />
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
            </div>
        </>
    )
}

export default CreateProductPage