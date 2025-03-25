"use client"

import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props{
    iterate:number;
}

const CartItemsLoading:FC<Props> = ({iterate}) => {
    const t = useTranslations("CART");
    return (
        <div className="box" id="cart-container-delete">
            <div className="box-header">
                <div className="box-title">
                    {t("PAGE.cart-items")}
                </div>
            </div>
            <div className="box-body">
                <div className="table-responsive">
                    <table className="table min-w-full table-bordered whitespace-nowrap">
                        <thead>
                            <tr>
                                <th scope="row" className="text-start">
                                    {t("LABELS.product-name")}
                                </th>
                                <th scope="row" className="text-start">
                                    {t("LABELS.price")}
                                </th>
                                <th scope="row" className="text-start">
                                    {t("LABELS.quantity")}
                                </th>
                                <th scope="row" className="text-start">
                                    {t("LABELS.total")}
                                </th>
                                <th scope="row" className="text-start">
                                    {t("LABELS.action")}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(iterate)].map((e, i)=>(
                                <tr className="border border-solid animate-pulse border-inherit dark:border-defaultborder/10" key={i}>
                                    <td>
                                        <div className="flex items-start flex-grow w-full mt-4">
                                            <div className="similar-products-image me-5">
                                                <img src="../../../../assets/images/ecommerce/png/16.png" alt="" />
                                            </div>
                                            <div>
                                                <div className="h-3 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5 w-72"></div>
                                                <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5 w-52"></div>
                                                <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5 w-40"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h-3 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5 w-10"></div>
                                    </td>
                                    <td>
                                        <div className="h-3 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5 w-20"></div>
                                    </td>
                                    <td>
                                        <div className="h-3 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5 w-10"></div>
                                    </td>
                                    <td>
                                        <div className="h-3 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5 w-20"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CartItemsLoading