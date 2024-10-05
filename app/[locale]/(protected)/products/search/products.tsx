import { Itemsdata1 } from '@/components/products/search/product-data';
import SearchProductsHeader from '@/components/products/search/products-header';
import Link from 'next/link';



const Products = () => {
    

    return (
        <>
            <div className="mb-6">
                <div className="grid grid-cols-12 gap-x-6">
                    <SearchProductsHeader />
                    <div className="col-span-12 xxl:col-span-3 xl:col-span-4 lg:col-span-4 md:col-span-12">
                        <div className="box products-navigation-card">
                            <div className="box-body !p-0">
                                <div className="p-4 border-b dark:border-defaultborder/10">
                                    <p className="font-semibold mb-0 text-[#8c9097] dark:text-white/50">
                                        CATEGORIES
                                    </p>
                                    <div className="px-2 py-4 pb-0">
                                        <div className="mb-2 form-check">
                                            <input className="form-check-input" type="checkbox" value=""
                                                id="electronics" />
                                            <label className="form-check-label" htmlFor="electronics">
                                                Electronics
                                            </label>
                                            <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                                rtl:float-left">
                                                2,712
                                            </span>
                                        </div>
                                        <div className="mb-2 form-check">
                                            <input className="form-check-input" type="checkbox" value=""
                                                id="Accesories" />
                                            <label className="form-check-label" htmlFor="Accesories">
                                                Accesories
                                            </label>
                                            <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                                rtl:float-left">
                                                536
                                            </span>
                                        </div>
                                        <div className="mb-2 form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="clothing"
                                                defaultChecked />
                                            <label className="form-check-label" htmlFor="clothing">
                                                Clothing
                                            </label>
                                            <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                                rtl:float-left">
                                                18,289
                                            </span>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="fashion" />
                                            <label className="form-check-label" htmlFor="fashion">
                                                Fashion
                                            </label>
                                            <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                                rtl:float-left">
                                                3,453
                                            </span>
                                        </div>
                                        <div id="hs-show-hide-categories-heading"
                                            className="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300"
                                            aria-labelledby="hs-show-hide-categories">
                                            <div className="mt-1 mb-2 form-check">
                                                <input className="form-check-input" type="checkbox" value=""
                                                    id="furniture" />
                                                <label className="form-check-label" htmlFor="furniture">
                                                    Furniture
                                                </label>
                                                <span className="badge bg-light text-[#8c9097] dark:text-white/50 
                                                    ltr:float-right rtl:float-left">
                                                    7,165
                                                </span>
                                            </div>
                                            <div className="mb-2 form-check">
                                                <input className="form-check-input" type="checkbox" value=""
                                                    id="footwear" />
                                                <label className="form-check-label" htmlFor="footwear">
                                                    Footwear
                                                </label>
                                                <span className="badge bg-light text-[#8c9097] dark:text-white/50 
                                                    ltr:float-right rtl:float-left">
                                                    5,964
                                                </span>
                                            </div>
                                            <div className="mb-2 form-check">
                                                <input className="form-check-input" type="checkbox" value=""
                                                    id="mobiles" />
                                                <label className="form-check-label" htmlFor="mobiles">
                                                    Mobiles
                                                </label>
                                                <span className="badge bg-light text-[#8c9097] dark:text-white/50 
                                                    ltr:float-right rtl:float-left">
                                                    2,123
                                                </span>
                                            </div>
                                        </div>
                                        <Link className="inline-flex items-center ecommerce-more-link text-success hs-collapse-toggle gap-x-2"
                                            href="#!" id="hs-show-hide-categories"
                                            data-hs-collapse="#hs-show-hide-categories-heading">
                                            <span className="hs-collapse-open:hidden">MORE</span>
                                            <span className="hidden hs-collapse-open:block">MORE</span>
                                            <svg className="hs-collapse-open:rotate-180 w-2.5 h-2.5" width="16"
                                                height="16" viewBox="0 0 16 16" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 border-b dark:border-defaultborder/10">
                                <p className="font-semibold mb-0 text-[#8c9097] dark:text-white/50">
                                    BRANDS
                                </p>
                                <div className="px-2 py-4 pb-0">
                                    <div className="mb-2 form-check ">
                                        <input className="form-check-input" type="checkbox" value="" id="Jimmy-Lolfiger"
                                            defaultChecked />
                                        <label className="form-check-label" htmlFor="Jimmy-Lolfiger">
                                            Jimmy Lolfiger
                                        </label>
                                        <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                            rtl:float-left">
                                            512
                                        </span>
                                    </div>
                                    <div className="mb-2 form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="dapzem1"
                                            defaultChecked />
                                        <label className="form-check-label" htmlFor="dapzem1">
                                            Dapzem &amp; Co
                                        </label>
                                        <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                            rtl:float-left">
                                            2,186
                                        </span>
                                    </div>
                                    <div className="mb-2 form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="denim-winjo1"
                                            defaultChecked />
                                        <label className="form-check-label" htmlFor="denim-winjo1">
                                            Denim Winjo
                                        </label>
                                        <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                            rtl:float-left">
                                            734
                                        </span>
                                    </div>
                                    <div className="mb-2 form-check">
                                        <input className="form-check-input" type="checkbox" value=""
                                            id="Louie-Phillippe" />
                                        <label className="form-check-label" htmlFor="Louie-Phillippe">
                                            Louie Phillippe
                                        </label>
                                        <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                            rtl:float-left">
                                            16
                                        </span>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value=""
                                            id="garage-clothing" />
                                        <label className="form-check-label" htmlFor="garage-clothing">
                                            Garage &amp;Co
                                        </label>
                                        <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                            rtl:float-left">
                                            1,432
                                        </span>
                                    </div>
                                    <div id="hs-show-hide-brands-heading"
                                        className="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300"
                                        aria-labelledby="hs-show-hide-brands">
                                        <div className="mt-1 mb-2 form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="blueberry"
                                                defaultChecked />
                                            <label className="form-check-label" htmlFor="blueberry">
                                                Blueberry &amp;Co
                                            </label>
                                            <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                                rtl:float-left">
                                                257
                                            </span>
                                        </div>
                                        <div className="mb-2 form-check">
                                            <input className="form-check-input" type="checkbox" value=""
                                                id="aus-polo-assn" defaultChecked />
                                            <label className="form-check-label" htmlFor="aus-polo-assn">
                                                Aus Polo Assn
                                            </label>
                                            <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                                rtl:float-left">
                                                1,845
                                            </span>
                                        </div>
                                        <div className="mb-2 form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="denim-corp"
                                                defaultChecked />
                                            <label className="form-check-label" htmlFor="denim-corp">
                                                Denim Corp
                                            </label>
                                            <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                                rtl:float-left">
                                                5,893
                                            </span>
                                        </div>
                                    </div>
                                    <Link className="inline-flex items-center ecommerce-more-link text-success hs-collapse-toggle gap-x-2"
                                        href="#!" id="hs-show-hide-brands"
                                        data-hs-collapse="#hs-show-hide-brands-heading">
                                        <span className="hs-collapse-open:hidden">MORE</span>
                                        <span className="hidden hs-collapse-open:block">MORE</span>
                                        <svg className="hs-collapse-open:rotate-180 w-2.5 h-2.5" width="16" height="16"
                                            viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                            <div className="p-4 border-b dark:border-defaultborder/10">
                                <p className="font-semibold mb-0 text-[#8c9097] dark:text-white/50">
                                    DISCOUNT
                                </p>
                                <div className="px-2 py-3 pb-0">
                                    <div className="mb-2 form-check">
                                        <input className="form-check-input" type="checkbox" value=""
                                            id="Jimmy-Lolfiger1" />
                                        <label className="form-check-label" htmlFor="Jimmy-Lolfiger1">
                                            0% - 20%
                                        </label>
                                        <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                            rtl:float-left">
                                            16,563
                                        </span>
                                    </div>
                                    <div className="mb-2 form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="dapzem2" />
                                        <label className="form-check-label" htmlFor="dapzem2">
                                            20% - 40%
                                        </label>
                                        <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                            rtl:float-left">
                                            15,234
                                        </span>
                                    </div>
                                    <div className="mb-2 form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="denim-winjo" />
                                        <label className="form-check-label" htmlFor="denim-winjo">
                                            40% - 60%
                                        </label>
                                        <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                            rtl:float-left">
                                            6,278
                                        </span>
                                    </div>
                                    <div className="mb-2 form-check">
                                        <input className="form-check-input" type="checkbox" value=""
                                            id="Louie-Phillippe1" defaultChecked />
                                        <label className="form-check-label" htmlFor="Louie-Phillippe1">
                                            60% - 80%
                                        </label>
                                        <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                            rtl:float-left">
                                            4,531
                                        </span>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value=""
                                            id="garage-clothing1" />
                                        <label className="form-check-label" htmlFor="garage-clothing1">
                                            80% - 90%
                                        </label>
                                        <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                            rtl:float-left">
                                            2,405
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="font-semibold mb-0 text-[#8c9097] dark:text-white/50">
                                    SIZES
                                </p>
                                <div className="px-2 py-3 pb-0">
                                    <div className="mb-2 form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="extra-small" />
                                        <label className="form-check-label" htmlFor="extra-small">
                                            Extra Small (XS)
                                        </label>
                                        <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                            rtl:float-left">
                                            23,156
                                        </span>
                                    </div>
                                    <div className="mb-2 form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="small" />
                                        <label className="form-check-label" htmlFor="small">
                                            Small (SM)
                                        </label>
                                        <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                            rtl:float-left">
                                            15,632
                                        </span>
                                    </div>
                                    <div className="mb-2 form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="medium1" />
                                        <label className="form-check-label" htmlFor="medium1">
                                            Medium (MD)
                                        </label>
                                        <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                            rtl:float-left">
                                            15,032
                                        </span>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="large" defaultChecked />
                                        <label className="form-check-label" htmlFor="large">
                                            Large (L)
                                        </label>
                                        <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                            rtl:float-left">
                                            7,154
                                        </span>
                                    </div>
                                    <div id="hs-show-hide-sizes-heading"
                                        className="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300"
                                        aria-labelledby="hs-show-hide-sizes">
                                        <div className="mt-1 mb-2 form-check">
                                            <input className="form-check-input" type="checkbox" value=""
                                                id="extra-large" />
                                            <label className="form-check-label" htmlFor="extra-large">
                                                Extra Large (XL)
                                            </label>
                                            <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                                rtl:float-left">
                                                5,946
                                            </span>
                                        </div>
                                        <div className="mb-2 form-check">
                                            <input className="form-check-input" type="checkbox" value=""
                                                id="double-extralarge" />
                                            <label className="form-check-label" htmlFor="double-extralarge">
                                                XXL
                                            </label>
                                            <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                                rtl:float-left">
                                                3,267
                                            </span>
                                        </div>
                                        <div className="mb-2 form-check">
                                            <input className="form-check-input" type="checkbox" value=""
                                                id="triple-extralarge" />
                                            <label className="form-check-label" htmlFor="triple-extralarge">
                                                XXL
                                            </label>
                                            <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                                rtl:float-left">
                                                578
                                            </span>
                                        </div>
                                    </div>
                                    <Link className="inline-flex items-center ecommerce-more-link text-success hs-collapse-toggle gap-x-2"
                                        href="#!" id="hs-show-hide-sizes"
                                        data-hs-collapse="#hs-show-hide-sizes-heading">
                                        <span className="hs-collapse-open:hidden">MORE</span>
                                        <span className="hidden hs-collapse-open:block">MORE</span>
                                        <svg className="hs-collapse-open:rotate-180 w-2.5 h-2.5" width="16" height="16"
                                            viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 xxl:col-span-9 xl:col-span-8 lg:col-span-8 md:col-span-12">
                        <div className="grid grid-cols-12 gap-x-6">
                            {Itemsdata1.map((idx) =>(
                                <div className="col-span-12 xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12" key={Math.random()}>
                                    <div className="box product-card">
                                        <div className="box-body">
                                            <Link href="/components/pages/ecommerce/product-details/" className="product-image">
                                                <img src={idx.preview} className="mb-3 rounded-md card-img"
                                                    alt="..." />
                                            </Link>
                                            <div className="product-icons">
                                                <Link 
                                                    aria-label="anchor" 
                                                    href="/components/pages/ecommerce/wishlist/" 
                                                    className="wishlist">
                                                    <i className="ri-heart-line"></i>
                                                </Link>
                                                <Link 
                                                    aria-label="anchor" 
                                                    href="/components/pages/ecommerce/cart/" 
                                                    className="cart">
                                                    <i className="ri-shopping-cart-line"></i>
                                                </Link>
                                                <Link 
                                                    aria-label="anchor" 
                                                    href="/components/pages/ecommerce/product-details/" 
                                                    className="view">
                                                    <i className="ri-eye-line"></i>
                                                </Link>
                                            </div>
                                            <p className="flex items-center justify-between mb-0 font-semibold product-name">
                                                {idx.title}
                                                <span className="text-xs ltr:float-right rtl:float-left text-warning">
                                                    4.2
                                                    <i className="inline-block align-middle ri-star-s-fill ms-1"></i>
                                                </span>
                                            </p>
                                            <p className="product-description text-[.6875rem] text-[#8c9097] 
                                                dark:text-white/50 mb-2">
                                                {idx.description}
                                            </p>
                                            <p className="mb-1 font-semibold text-[1rem] flex items-center justify-between">
                                                <span>{idx.newpr}
                                                    <span className="text-[#8c9097] dark:text-white/50 line-through 
                                                        ms-1 inline-block opacity-[0.6]">
                                                        {idx.newpr}
                                                    </span>
                                                </span>
                                                <span className="badge bg-secondary/10 text-secondary ltr:float-right 
                                                    rtl:float-left text-[0.625rem]">
                                                    72% off
                                                </span>
                                            </p>
                                            <p className="text-[.6875rem] text-success font-semibold mb-0 flex items-center">
                                                <i className="ti ti-discount-2 text-[1rem] me-1"></i>
                                                Offer Price {idx.offerprice}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ul className="ti-pagination !px-3 !py-[0.375rem] !text-[1rem] !mb-4 flex justify-end">
                <li className="page-item disabled">
                    <Link className="page-link !px-3 !py-[0.375rem]" href="#!">Previous</Link>
                </li>
                <li className="page-item"><Link className="page-link !px-3 !py-[0.375rem]" href="#!">1</Link></li>
                <li className="page-item"><Link className="page-link !px-3 !py-[0.375rem]" href="#!">2</Link></li>
                <li className="page-item"><Link className="page-link !px-3 !py-[0.375rem]" href="#!">3</Link></li>
                <li className="page-item">
                    <Link className="page-link !px-3 !py-[0.375rem]" href="#!">Next</Link>
                </li>
            </ul>
        </>
    )
}

export default Products