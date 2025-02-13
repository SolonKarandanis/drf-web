import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import ButtonSection from '@/components/cart/buttons-section'
import CartDetailsSection from '@/components/cart/cart-details-section'
import CartItemsSection from '@/components/cart/cart-items-section'
import CouponSection from '@/components/cart/coupon-section'
import DeliverySection from '@/components/cart/delivery-section'
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
                            <DeliverySection />
                            <CouponSection />
                            <CartDetailsSection />
                            <ButtonSection />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPage