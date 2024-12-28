'use client';

import { CartItem } from "@/models/cart.models"
import { useAppSelector } from "@/shared/redux/hooks";
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

interface Props{
    item:CartItem;
    removeItem: (itemId:number)=> void;
}

const CartItemDropdown:FC<Props> = ({item,removeItem}) => {
    const configState = useAppSelector((state)=>state.config);
    const path = configState.baseUrl
    
    return (
        <li className={`ti-dropdown-item border-b dark:border-defaultborder/10 border-defaultborder hover:bg-violet-300`} key={item.id}>
            <div className="flex items-start cart-dropdown-item">
                <Image
                    alt="img"
                    src={`${path}${item.imageSrc}`}
                    width={700}
                    height={475}
                    sizes="100vw"
                    className="!h-[1.75rem] !w-[1.75rem] leading-[1.75rem] text-[0.65rem] rounded-[50%] br-5 me-3"
                />

                <div className="grow">
                    <div className="flex items-start justify-between mb-0">
                        <div className="mb-0 !text-[0.8125rem] text-[#232323] font-semibold dark:text-[#8c9097] dark:text-white/50">
                            <Link href="#!">{item.name}</Link>
                        </div>

                        <div className="inline-flex">
                            <span className="text-black mb-1 dark:text-white !font-medium">
                                {item.unitPrice}
                            </span>
                            <Link aria-label="anchor" href="#!" className="header-cart-remove ltr:float-right rtl:float-left dropdown-item-close" onClick={() => removeItem(item.id)}><i
                            className="ti ti-trash"></i></Link>
                        </div>
                    </div>
                    <div className="flex items-start justify-between min-w-fit">
                        <ul className="flex header-product-item dark:text-white/50">
                            <li>{item.color}</li>
                            <li>{item.text}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </li>
  )
}

export default CartItemDropdown