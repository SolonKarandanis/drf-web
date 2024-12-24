"use client"

import { useTranslations } from 'next-intl';
import { FC } from 'react'
import { useGetProductDetailsSimilarProducts } from '../hooks/useGetProductDetailsSimilarProducts';
import SimilarProductItem from './similar-product-item';

interface Props{
    uuid:string;
}


const SimilarProducts:FC<Props> = ({uuid}) => {
    const t = useTranslations();
    const {
            isError,
            isLoading,
            similarProducts
    } = useGetProductDetailsSimilarProducts(uuid);

    if(isError){
        return <>{t("GLOBAL.FETCH-ERROR")}</>
    }
    
    return (
        <div className="hidden col-span-12 xxl:col-span-12 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12 md:block">
            <p className="text-[.9375rem] font-semibold mb-2">
                Similar Products :
            </p>
            <div className="table-responsive">
                <table className="table min-w-full table-bordered whitespace-nowrap">
                    <tbody>
                        {!isLoading  && similarProducts && similarProducts.map(product=>(
                            <SimilarProductItem key={product.id} product={product} />
                        ))}
                        
                        <tr>
                            <td className="grid">
                                <button type="button" className="ti-btn ti-btn-info-full !font-medium">
                                    View All Products
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SimilarProducts