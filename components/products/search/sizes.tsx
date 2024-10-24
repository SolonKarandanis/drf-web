import Link from 'next/link'
import React from 'react'

const Sizes = () => {
  return (
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
  )
}

export default Sizes