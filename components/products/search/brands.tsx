import Link from 'next/link'
import React from 'react'

const Brands = () => {
  return (
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
  )
}

export default Brands