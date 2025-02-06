import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import CartDetailsSection from '@/components/cart/cart-details-section'
import CartItemsSection from '@/components/cart/cart-items-section'
import { CartItem } from '@/models/cart.models'
import PageHeader from '@/shared/layout-components/page-header/PageHeader'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'


export const metadata:Metadata={
    title:"Drf Cart Page",
    description:"Drf market place",
    authors:[
      {
        name:"Solon Karandanis",
      }
    ]
}

const CartPage = async () => {
     

    const session = await getServerSession(authOptions);
    const {firstName, lastName}= session!.user!;
    const fullname = `${firstName} ${lastName}`;
    return (
        <>
            <PageHeader 
                currentpage="Cart" 
                activepage="Cart" 
                mainpage={fullname} />
            <div className="grid grid-cols-12 gap-0 sm:gap-x-6">
               <CartItemsSection />
                <div className="col-span-12 xxl:col-span-3">
                    <div className="box">
                        <div className="block p-4 border-b dark:border-defaultborder/10">
                            <div className="text-center alert alert-primary" role="alert">
                                <span className="text-defaulttextcolor">Sale Ends in</span> <span className="font-semibold text-[0.875rem] text-primary ms-1">8hours:32minutes</span>
                            </div>
                        </div>
                        <div className="box-body !p-0">
                            <div className="p-4 border-b border-dashed dark:border-defaultborder/10">
                                <p className="mb-2 font-semibold">Delivery:</p>
                                <div className="inline-flex" role="group" aria-label="Basic radio toggle button group">
                                    <input 
                                        type="radio" 
                                        className="btn-check dark:border-defaultborder/10 " 
                                        name="btnradio" 
                                        id="btnradio1" />
                                    <label 
                                        className="ti-btn ti-btn-outline-light !text-defaulttextcolor dark:hover:!bg-light 
                                            dark: !border-defaultborder/10 dark:text-defaulttextcolor/70 !border-e-0 
                                            dark:!border-defaultborder/10 !rounded-e-none !font-medium" 
                                            htmlFor="btnradio1">Free Delivery
                                    </label>
                                    <input 
                                        type="radio" 
                                        className="btn-check active active:bg-light" 
                                        name="btnradio" 
                                        id="btnradio2" defaultChecked 
                                    />
                                    <label 
                                        className="ti-btn ti-btn-light dark:!border-defaultborder/10  
                                            dark:text-defaulttextcolor/70 dark:hover:!bg-light !font-medium !rounded-s-none" 
                                        htmlFor="btnradio2">
                                        Express Delivery
                                    </label>
                                </div>
                                <p 
                                    className="mb-0 mt-2 text-[0.75rem] text-[#8c9097] dark:text-white/50">
                                        Delivered by 24,Nov 2022
                                </p>

                            </div>
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
                            <CartDetailsSection />
                            <div className="grid p-4">
                                <Link href="/components/pages/ecommerce/checkout/" className="ti-btn bg-success  text-white !font-medium !mb-2">Proceed To Checkout</Link>
                                <Link href="/products/search" className="ti-btn bg-light  !font-medium">Countinue Shopping</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPage