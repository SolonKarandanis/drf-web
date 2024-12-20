import {FC} from 'react'
import ProductInfoData from './product-info-data';

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
  return (
    <div className="mb-4">
        <p className="text-[.9375rem] font-semibold mb-2">Product Details :</p>
        <div className="min-w-full table-responsive">
            <table className="table w-full table-bordered whitespace-nowrap">
                <tbody>
                    <tr className="border border-defaultborder dark:border-defaultborder/10">
                        <th scope="row" className="!font-semibold text-start">
                            Brand
                        </th>
                        <td>
                            <ProductInfoData 
                                data={brand}
                                loading={loading}/>
                        </td>
                    </tr>
                    <tr className="border border-defaultborder dark:border-defaultborder/10">
                        <th scope="row" className="!font-semibold text-start">
                            Model Name
                        </th>
                        <td>
                            <ProductInfoData 
                                data={modelName}
                                loading={loading}/>
                        </td>
                    </tr>
                    <tr className="border border-defaultborder dark:border-defaultborder/10">
                        <th scope="row" className="!font-semibold text-start">
                            Color
                        </th>
                        <td>
                            <ProductInfoData 
                                data={color}
                                loading={loading}/>
                        </td>
                    </tr>
                    <tr className="border border-defaultborder dark:border-defaultborder/10">
                        <th scope="row" className="!font-semibold text-start">
                            Availability Status
                        </th>
                        <td>
                            <ProductInfoData 
                                data={availabilityStatus}
                                loading={loading}/>
                        </td>
                    </tr>
                    <tr className="border border-defaultborder dark:border-defaultborder/10">
                        <th scope="row" className="!font-semibold text-start">
                            Publish Status
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