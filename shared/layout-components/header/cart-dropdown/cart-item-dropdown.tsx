'use client';

import { useGetProductMisc } from "@/components/products/hooks/useGetProductMisc";
import { CartItem } from "@/models/cart.models"
import CurrencyFormatter from "@/shared/components/currency-formatter/currency-formatter";
import { useAppSelector } from "@/shared/redux/hooks";
import { useTranslations } from "next-intl";
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

interface Props{
    item:CartItem;
    removeItem: (itemId:number)=> void;
}

const CartItemDropdown:FC<Props> = ({item,removeItem}) => {
    const t = useTranslations("CART");
    const {
        sizesOptions,
        coloursOptions,
    } = useGetProductMisc();
    const configState = useAppSelector((state)=>state.config);
    const path = configState.baseUrl
    const host = configState.djangoHost
    const productImage = item.previewImage
    const imagePath = productImage ?   `${host}${productImage.image}` : `${path}/assets/images/faces/21.jpg`;

    const findItemSize = (item:CartItem):string | undefined =>{
        const size = item.attributes[1];
        const selectedSize =sizesOptions.find(opt=>opt.value===size);
        return selectedSize?.label;
    }

    const findItemColor = (item:CartItem):string | undefined =>{
        const color = item.attributes[2];
        const slectedColor = coloursOptions.find(opt=>opt.value===color)
        return slectedColor?.label;
    }

    
    return (
        <li className={`ti-dropdown-item border-b dark:border-defaultborder/10 border-defaultborder hover:bg-violet-300`} key={item.id}>
            <div className="flex items-start cart-dropdown-item">
                <Image
                    alt={item.previewImage?.alt|| 'alt'}
                    src={`${imagePath}`}
                    width={700}
                    height={475}
                    sizes="100vw"
                    className="!h-[1.75rem] !w-[1.75rem] leading-[1.75rem] text-[0.65rem] rounded-[50%] br-5 me-3"
                />

                <div className="grow">
                    <div className="flex items-start justify-between mb-0">
                        <div className="mb-0 !text-[0.8125rem] text-[#232323] font-semibold dark:text-[#8c9097] dark:text-white/50">
                            <Link href={`/products/${item.productDetails.uuid}`}>
                                {`(${item.productDetails.sku}) ${item.productDetails.title}`}
                            </Link>
                        </div>

                        <div className="inline-flex">
                            <span className="text-black mb-1 mr-1 dark:text-white !font-medium">
                                {item.quantity}x
                            </span>
                            <span className="text-black mb-1 dark:text-white !font-medium">
                                <CurrencyFormatter amount={item.unitPrice} />
                            </span>
                            <button 
                                className="header-cart-remove ltr:float-right rtl:float-left dropdown-item-close" 
                                onClick={() => removeItem(item.id)}>
                                    <i className="ti ti-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div className="flex items-start justify-between min-w-fit">
                        <ul className="flex header-product-item dark:text-white/50">
                            <li>
                                <span className="me-1">{t("LABELS.size")}:</span>
                                <span className="font-semibold text-[#8c9097] dark:text-white/50">
                                    {findItemSize(item)}
                                </span>
                            </li>
                            <li>
                                <span className="me-1">{t("LABELS.color")}:</span>
                                <span className="font-semibold text-[#8c9097] dark:text-white/50">
                                    {findItemColor(item)}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </li>
  )
}

export default CartItemDropdown