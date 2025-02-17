"use client"

import {FC} from 'react'
import ProductInfoData from './product-info-data';
import { useTranslations } from 'next-intl';

interface Props{
    brand:string;
    modelName:string;
    color:string;
    availabilityStatus:string;
    publishStatus:string;
    loading:boolean;
}

const ProductInfo:FC<Props> = ({
    brand,
    modelName,
    color,
    availabilityStatus,
    publishStatus,
    loading=false
}) => {
    const t = useTranslations("PRODUCTS.DETAILS.LABELS");
    return (
        <div className="mb-4">
            <p className="text-[.9375rem] font-semibold mb-2">{t("product-details")} :</p>
            <div className="min-w-full table-responsive">
                <table className="table w-full table-bordered whitespace-nowrap">
                    <tbody>
                        <tr className="border border-defaultborder dark:border-defaultborder/10">
                            <th scope="row" className="!font-semibold text-start">
                                {t("brand")}
                            </th>
                            <td>
                                <ProductInfoData 
                                    data={brand}
                                    loading={loading}/>
                            </td>
                        </tr>
                        <tr className="border border-defaultborder dark:border-defaultborder/10">
                            <th scope="row" className="!font-semibold text-start">
                                {t("model-name")}
                            </th>
                            <td>
                                <ProductInfoData 
                                    data={modelName}
                                    loading={loading}/>
                            </td>
                        </tr>
                        <tr className="border border-defaultborder dark:border-defaultborder/10">
                            <th scope="row" className="!font-semibold text-start">
                                {t("color")}
                            </th>
                            <td>
                                <ProductInfoData 
                                    data={color}
                                    loading={loading}/>
                            </td>
                        </tr>
                        <tr className="border border-defaultborder dark:border-defaultborder/10">
                            <th scope="row" className="!font-semibold text-start">
                                {t("availability-status")}
                            </th>
                            <td>
                                <ProductInfoData 
                                    data={availabilityStatus}
                                    loading={loading}/>
                            </td>
                        </tr>
                        <tr className="border border-defaultborder dark:border-defaultborder/10">
                            <th scope="row" className="!font-semibold text-start">
                                {t("publish-status")}
                            </th>
                            <td>
                                <ProductInfoData 
                                    data={publishStatus}
                                    loading={loading}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductInfo