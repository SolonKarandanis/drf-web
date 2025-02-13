'use client';

import Link from "next/link"
import { useState } from "react";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/shared/shadcn/components/ui/dropdown-menu";
import CartItemDropdown from "./cart-item-dropdown";
import { Virtuoso } from 'react-virtuoso'
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetUserCart } from "@/components/cart/hooks/useGetUserCart";


const CartDropdown = () => {
    const t = useTranslations();
    const router = useRouter(); 
    const {
        cartItems,
        isError,
        isLoading,
    } = useGetUserCart();
    const [open, setOpen] = useState(false)

    const handleRemove = (itemId:number) => {
        
    };

    const handleProceedToCart=()=>{
        setOpen(false);
        router.push("/cart");
    }

    const handleProceedToShopping=()=>{
        setOpen(false);
        router.push("/products/search");
    }


    if(isError){
        return <>{t("GLOBAL.FETCH-ERROR")}</>
    }

    if(!isLoading){
        return (
            <div className="header-element cart-dropdown hs-dropdown ti-dropdown md:!block !hidden py-[1rem] md:px-[0.65rem] px-2 
                [--placement:bottom-right]">
                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger asChild>
                        <button id="dropdown-cart" type="button"
                            className="hs-dropdown-toggle relative ti-dropdown-toggle !p-0 !border-0 flex-shrink-0  !rounded-full !shadow-none align-middle text-xs">
                            <i className="bx bx-cart header-link-icon"></i>
                            <span className="flex absolute h-5 w-5 -top-[0.25rem] end-0 -me-[0.6rem]">
                                <span className="relative inline-flex rounded-full h-[14.7px] w-[14px] text-[0.625rem] bg-sky-500 text-white justify-center items-center"
                                id="cart-icon-badge">{cartItems?.length}</span>
                            </span>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>
                            <div className="main-header-dropdown bg-white !-mt-3 !p-0 hs-dropdown-menu 
                                w-[22rem] border-0 border-defaultborder"
                                aria-labelledby="dropdown-cart">
                                <div className="ti-dropdown-header !bg-transparent flex justify-between items-center !m-0 !p-4">
                                    <p className="text-black  !text-[1.0625rem] dark:text-[#8c9097] dark:text-white/50 font-semibold">
                                        {t("CART.PAGE.cart-items")}
                                    </p>
                                    <Link href="#!"
                                        className="font-[600] py-[0.25/2rem] px-[0.45rem] rounded-[0.25rem] bg-sky-500 text-white text-[0.75em] "
                                        id="cart-data">
                                        {cartItems?.length} {cartItems?.length !== 1 ? t("CART.LABELS.items") : t("CART.LABELS.item")}
                                    </Link>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <ul className={`mb-0 list-none overflow-y-auto `} id="header-cart-items-scroll">
                            <Virtuoso 
                                className="!h-[200px]"
                                data={cartItems} 
                                totalCount={cartItems?.length}
                                itemContent={(_,item)=>
                                    <CartItemDropdown  
                                        item={item} 
                                        removeItem={handleRemove}/>}
                            />
                        </ul>
                        <div className={`p-3 empty-header-item border-t ${cartItems?.length === 0 ? 'hidden' : 'block'}`}>
                            <div className="grid">
                                <button 
                                    onClick={handleProceedToCart}
                                    className="w-full p-2 ti-btn ti-btn-success-full hover:bg-emerald-600">
                                    {t("CART.BUTTONS.proceed-to-cart")}
                                </button>
                            </div>
                        </div>
                        <div className={`p-[3rem] empty-item ${cartItems?.length === 0 ? 'block' : 'hidden'}`}>
                            <div className="text-center">
                                <span className="!w-[4rem] !h-[4rem] !leading-[4rem] rounded-[50%] avatar bg-warning/10 !text-warning">
                                    <i className="ri-shopping-cart-2-line text-[2rem]"></i>
                                </span>
                                <h6 className="font-bold mb-1 mt-3 text-[1rem] text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">
                                    {t("CART.LABELS.empty-cart-description")}
                                </h6>
                                <button
                                    onClick={handleProceedToShopping}
                                    className="ti-btn ti-btn-success btn-wave ti-btn-wave btn-sm m-1 !text-[0.75rem] !py-[0.25rem] !px-[0.5rem]"
                                    data-abc="true">
                                    {t("CART.BUTTONS.continue-shopping")} 
                                    <i className="bi bi-arrow-right ms-1"></i>
                                </button>
                            </div>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        )
    }

    
}

export default CartDropdown