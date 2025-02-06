"use client";

import Link from "next/link";

const CouponSection = () => {
  return (
    <div className="p-4 border-b border-dashed dark:border-defaultborder/10">
        <div className="input-group">
            <input 
                type="text" 
                className="form-control form-control-sm !rounded-s-sm  !border-e-0 dark:border-defaultborder/10"
                placeholder="Coupon Code" 
                aria-label="coupon-code" 
                aria-describedby="coupons" />
            <button 
                type="button" 
                className="ti-btn !bg-light !text-white !font-medium !rounded-s-none !mb-0" 
                id="coupons">
                Apply
            </button>
        </div>
        <Link href="#!" className="text-[0.75rem] text-success">10% off on first purchase</Link>
    </div>
  )
}

export default CouponSection