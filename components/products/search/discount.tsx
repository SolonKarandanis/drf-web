import React from 'react'

const Discount = () => {
  return (
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
  )
}

export default Discount