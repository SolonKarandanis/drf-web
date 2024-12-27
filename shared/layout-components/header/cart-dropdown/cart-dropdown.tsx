'use client';

import Link from "next/link"
import Image from "next/image";
import { useRef, useState } from "react";
import { useAppSelector } from "@/shared/redux/hooks";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/shadcn/components/ui/dropdown-menu";
import { CartItem } from "@/models/cart.models";
import { useVirtualizer } from '@tanstack/react-virtual';


const CartDropdown = () => {
    const configState = useAppSelector((state)=>state.config);
    const path = configState.baseUrl


    const data=  <span className="font-[600] py-[0.25rem] px-[0.45rem] rounded-[0.25rem] bg-pink/10 text-pink text-[0.625rem]">Free shipping</span>
    const cartProduct:CartItem[] = [
        {
          id: 1,
          imageSrc: "/assets/images/ecommerce/jpg/1.jpg",
          name: 'SomeThing Phone',
          unitPrice: 1.299,
          color: 'Metallic Blue',
          text: '6gb Ram',
          modificationAlert:false,
          productId:1,
          quantity:4,
          totalPrice:4,
          uuid:'sss'
        },
        {
          id: 2,
          imageSrc: "/assets/images/ecommerce/jpg/3.jpg",
          name: 'Stop Watch',
          unitPrice: 179.29,
          color: 'Analog',
          text: '',
          modificationAlert:false,
          productId:1,
          quantity:4,
          totalPrice:4,
          uuid:'sss'
        },
        {
          id: 3,
          imageSrc: "/assets/images/ecommerce/jpg/5.jpg",
          name: 'Photo Frame',
          unitPrice: 29.00,
          color: 'Decorative',
          text: '',
          modificationAlert:false,
          productId:1,
          quantity:4,
          totalPrice:4,
          uuid:'sss'
        },
        {
          id: 4,
          imageSrc: "/assets/images/ecommerce/jpg/4.jpg",
          name: 'Kikon Camera',
          unitPrice: 4.999,
          color: 'Black',
          text: '50MM',
          modificationAlert:false,
          productId:1,
          quantity:4,
          totalPrice:4,
          uuid:'sss'
        },
        {
          id: 5,
          imageSrc: "/assets/images/ecommerce/jpg/6.jpg",
          name: 'Canvas Shoes',
          unitPrice: 129.00,
          color: 'Gray',
          text: 'Sports',
          modificationAlert:false,
          productId:1,
          quantity:4,
          totalPrice:4,
          uuid:'sss'
        },
        {
            id: 6,
            imageSrc: "/assets/images/ecommerce/jpg/6.jpg",
            name: 'Canvas Shoes',
            unitPrice: 129.00,
            color: 'Gray',
            text: 'Sports',
            modificationAlert:false,
            productId:1,
            quantity:4,
            totalPrice:4,
            uuid:'sss'
          },
          {
            id: 7,
            imageSrc: "/assets/images/ecommerce/jpg/6.jpg",
            name: 'Canvas Shoes',
            unitPrice: 129.00,
            color: 'Gray',
            text: 'Sports',
            modificationAlert:false,
            productId:1,
            quantity:4,
            totalPrice:4,
            uuid:'sss'
          },
          {
            id: 8,
            imageSrc: "/assets/images/ecommerce/jpg/6.jpg",
            name: 'Canvas Shoes',
            unitPrice: 129.00,
            color: 'Gray',
            text: 'Sports',
            modificationAlert:false,
            productId:1,
            quantity:4,
            totalPrice:4,
            uuid:'sss'
          },
          {
            id: 9,
            imageSrc: "/assets/images/ecommerce/jpg/6.jpg",
            name: 'Canvas Shoes',
            unitPrice: 129.00,
            color: 'Gray',
            text: 'Sports',
            modificationAlert:false,
            productId:1,
            quantity:4,
            totalPrice:4,
            uuid:'sss'
          },
      ];
    const parentRef = useRef<HTMLDivElement>(null)
    const [cartItems, setCartItems] = useState([...cartProduct]);
    const [cartItemCount, setCartItemCount] = useState(cartProduct.length);

    const virtualizer = useVirtualizer({
        count: cartItemCount,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 35,
    });
    const virtualItems = virtualizer.getVirtualItems();
    const totalSize = virtualizer.getTotalSize();

    const handleRemove = (itemId:number) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCartItems);
        setCartItemCount(updatedCartItems.length);
      };

    return (
        <div ref={parentRef} className="header-element cart-dropdown hs-dropdown ti-dropdown md:!block !hidden py-[1rem] md:px-[0.65rem] px-2 
            [--placement:bottom-right]">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button id="dropdown-cart" type="button"
                        className="hs-dropdown-toggle relative ti-dropdown-toggle !p-0 !border-0 flex-shrink-0  !rounded-full !shadow-none align-middle text-xs">
                        <i className="bx bx-cart header-link-icon"></i>
                        <span className="flex absolute h-5 w-5 -top-[0.25rem] end-0 -me-[0.6rem]">
                            <span className="relative inline-flex rounded-full h-[14.7px] w-[14px] text-[0.625rem] bg-sky-500 text-white justify-center items-center"
                            id="cart-icon-badge">{cartItemCount}</span>
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
                                    Cart Items
                                </p>
                                <Link href="#!"
                                    className="font-[600] py-[0.25/2rem] px-[0.45rem] rounded-[0.25rem] bg-sky-500 text-white text-[0.75em] "
                                    id="cart-data">
                                    {cartItemCount} Item{cartItemCount !== 1 ? 's' : ''}
                                </Link>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <ul className={`mb-0 list-none overflow-y-auto h-[${totalSize}px]`} id="header-cart-items-scroll">
                        {virtualItems.map((virtualItem) => {
                            const listItem = cartItems[virtualItem.index];
                            return (
                                <li className={`ti-dropdown-item border-b dark:border-defaultborder/10 border-defaultborder h-[${virtualItem.size}px] translate-y-[${virtualItem.start}px]`} key={listItem.id}>
                                    <div className="flex items-start cart-dropdown-item">
                                        <Image
                                            alt="img"
                                            src={`${path}${listItem.imageSrc}`}
                                            width={700}
                                            height={475}
                                            sizes="100vw"
                                            className="!h-[1.75rem] !w-[1.75rem] leading-[1.75rem] text-[0.65rem] rounded-[50%] br-5 me-3"
                                        />
    
                                        <div className="grow">
                                            <div className="flex items-start justify-between mb-0">
                                                <div className="mb-0 !text-[0.8125rem] text-[#232323] font-semibold dark:text-[#8c9097] dark:text-white/50">
                                                    <Link href="#!">{listItem.name}</Link>
                                                </div>
    
                                                <div className="inline-flex">
                                                    <span className="text-black mb-1 dark:text-white !font-medium">
                                                        {listItem.unitPrice}
                                                    </span>
                                                    <Link aria-label="anchor" href="#!" className="header-cart-remove ltr:float-right rtl:float-left dropdown-item-close" onClick={() => handleRemove(listItem.id)}><i
                                                    className="ti ti-trash"></i></Link>
                                                </div>
                                            </div>
                                            <div className="flex items-start justify-between min-w-fit">
                                                <ul className="flex header-product-item dark:text-white/50">
                                                    <li>{listItem.color}</li>
                                                    <li>{listItem.text}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <div className={`p-3 empty-header-item border-t ${cartItemCount === 0 ? 'hidden' : 'block'}`}>
                        <div className="grid">
                            <Link href="#!" className="w-full p-2 ti-btn ti-btn-success-full">Proceed to checkout</Link>
                        </div>
                    </div>
                    <div className={`p-[3rem] empty-item ${cartItemCount === 0 ? 'block' : 'hidden'}`}>
                        <div className="text-center">
                            <span className="!w-[4rem] !h-[4rem] !leading-[4rem] rounded-[50%] avatar bg-warning/10 !text-warning">
                                <i className="ri-shopping-cart-2-line text-[2rem]"></i>
                            </span>
                            <h6 className="font-bold mb-1 mt-3 text-[1rem] text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">Your Cart is Empty</h6>
                            <span className="mb-3 !font-normal text-[0.8125rem] block text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">Add some items to make me happy :)</span>
                            <Link href="#!" className="ti-btn ti-btn-success btn-wave ti-btn-wave btn-sm m-1 !text-[0.75rem] !py-[0.25rem] !px-[0.5rem]"
                                data-abc="true">continue shopping <i className="bi bi-arrow-right ms-1"></i></Link>
                        </div>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default CartDropdown