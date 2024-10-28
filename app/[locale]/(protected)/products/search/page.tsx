import PageHeader from "@/shared/layout-components/page-header/PageHeader";
import { Metadata } from "next"
import { useTranslations } from "next-intl";
import { Itemsdata1 } from "@/components/products/search/product-data";
import ProductsHeader from "@/components/products/search/products-header";
import Pagination from "@/components/products/search/pagination";
import ProductsSidebar from "@/components/products/search/products-sidebar";
import Card from "@/shared/components/card/card";
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
    const productUuid ="1"
    

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

// <div className="col-span-12 xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12" key={Math.random()}>
                                    //     <div className="box product-card">
                                    //         <div className="box-body">
                                    //             <Link href="/components/pages/ecommerce/product-details/" className="product-image">
                                    //                 <img src={idx.preview} className="mb-3 rounded-md card-img"
                                    //                     alt="..." />
                                    //             </Link>
                                    //             <div className="product-icons">
                                    //                 <Link 
                                    //                     aria-label="anchor" 
                                    //                     href="/components/pages/ecommerce/wishlist/" 
                                    //                     className="wishlist">
                                    //                     <i className="ri-heart-line"></i>
                                    //                 </Link>
                                    //                 <Link 
                                    //                     aria-label="anchor" 
                                    //                     href="/components/pages/ecommerce/cart/" 
                                    //                     className="cart">
                                    //                     <i className="ri-shopping-cart-line"></i>
                                    //                 </Link>
                                    //                 <Link 
                                    //                     aria-label="anchor" 
                                    //                     href={`/products/${productUuid}`}
                                    //                     className="view">
                                    //                     <i className="ri-eye-line"></i>
                                    //                 </Link>
                                    //             </div>
                                    //             <p className="flex items-center justify-between mb-0 font-semibold product-name">
                                    //                 {idx.title}
                                    //                 <span className="text-xs ltr:float-right rtl:float-left text-warning">
                                    //                     4.2
                                    //                     <i className="inline-block align-middle ri-star-s-fill ms-1"></i>
                                    //                 </span>
                                    //             </p>
                                    //             <p className="product-description text-[.6875rem] text-[#8c9097] 
                                    //                 dark:text-white/50 mb-2">
                                    //                 {idx.description}
                                    //             </p>
                                    //             <p className="mb-1 font-semibold text-[1rem] flex items-center justify-between">
                                    //                 <span>{idx.newpr}
                                    //                     <span className="text-[#8c9097] dark:text-white/50 line-through 
                                    //                         ms-1 inline-block opacity-[0.6]">
                                    //                         {idx.newpr}
                                    //                     </span>
                                    //                 </span>
                                    //                 <span className="badge bg-secondary/10 text-secondary ltr:float-right 
                                    //                     rtl:float-left text-[0.625rem]">
                                    //                     72% off
                                    //                 </span>
                                    //             </p>
                                    //             <p className="text-[.6875rem] text-success font-semibold mb-0 flex items-center">
                                    //                 <i className="ti ti-discount-2 text-[1rem] me-1"></i>
                                    //                 Offer Price {idx.offerprice}
                                    //             </p>
                                    //         </div>
                                    //     </div>
                                    // </div>