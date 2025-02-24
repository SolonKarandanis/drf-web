"use client";

import ButtonSection from "./buttons-section";
import CartDetailsSection from "./cart-details-section";
import CartItemsSection from "./cart-items-section";
import CouponSection from "./coupon-section";
import DeliverySection from "./delivery-section";
import { CartProvider } from "./providers/cart-context";

const Cart = () => {
  return (
    <CartProvider>
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
    </CartProvider>
  )
}

export default Cart