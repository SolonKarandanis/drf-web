import Link from 'next/link'
import React from 'react'

const Categories = () => {
  return (
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
  )
}

export default Categories