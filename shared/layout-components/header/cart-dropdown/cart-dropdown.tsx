'use client';

import Link from "next/link"
import { useRef, useState } from "react";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/shared/shadcn/components/ui/dropdown-menu";
import { CartItem } from "@/models/cart.models";
import CartItemDropdown from "./cart-item-dropdown";
import { Virtuoso } from 'react-virtuoso'


const CartDropdown = () => {
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
    const [cartItems, setCartItems] = useState([...cartProduct]);
    const [cartItemCount, setCartItemCount] = useState(cartProduct.length);


    const handleRemove = (itemId:number) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCartItems);
        setCartItemCount(updatedCartItems.length);
      };

    return (
        <div className="header-element cart-dropdown hs-dropdown ti-dropdown md:!block !hidden py-[1rem] md:px-[0.65rem] px-2 
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
                    <ul className={`mb-0 list-none overflow-y-auto `} id="header-cart-items-scroll">
                        <Virtuoso 
                            className="!h-[200px]"
                            data={cartItems} 
                            totalCount={cartItemCount}
                            itemContent={(_,item)=><CartItemDropdown  item={item} removeItem={handleRemove} />}/>
                    </ul>
                    <div className={`p-3 empty-header-item border-t ${cartItemCount === 0 ? 'hidden' : 'block'}`}>
                        <div className="grid">
                            <Link href="/cart" className="w-full p-2 ti-btn ti-btn-success-full">Proceed to checkout</Link>
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
                                data-abc="true">
                                continue shopping <i className="bi bi-arrow-right ms-1"></i>
                            </Link>
                        </div>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default CartDropdown