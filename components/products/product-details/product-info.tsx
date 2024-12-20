import {FC} from 'react'

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
                            {loading && (
                                <div role="status" className="w-full rounded animate-pulse dark:border-gray-700">
                                    <div className="h-3 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                </div>
                            )}
                            {!loading && (<>{brand}</>)}
                        </td>
                    </tr>
                    <tr className="border border-defaultborder dark:border-defaultborder/10">
                        <th scope="row" className="!font-semibold text-start">
                            Model Name
                        </th>
                        <td>
                            {loading && (
                                <div role="status" className="w-full rounded animate-pulse dark:border-gray-700">
                                    <div className="h-3 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                </div>
                            )}
                            {!loading && (<>{modelName}</>)}
                        </td>
                    </tr>
                    <tr className="border border-defaultborder dark:border-defaultborder/10">
                        <th scope="row" className="!font-semibold text-start">
                            Color
                        </th>
                        <td>
                            {loading && (
                                <div role="status" className="w-full rounded animate-pulse dark:border-gray-700">
                                    <div className="h-3 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                </div>
                            )}
                            {!loading && (<>{color}</>)}
                        </td>
                    </tr>
                    <tr className="border border-defaultborder dark:border-defaultborder/10">
                        <th scope="row" className="!font-semibold text-start">
                            Availability Status
                        </th>
                        <td>
                            {loading && (
                                <div role="status" className="w-full rounded animate-pulse dark:border-gray-700">
                                    <div className="h-3 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                </div>
                            )}
                            {!loading && (<>{availabilityStatus}</>)}
                        </td>
                    </tr>
                    <tr className="border border-defaultborder dark:border-defaultborder/10">
                        <th scope="row" className="!font-semibold text-start">
                            Publish Status
                        </th>
                        <td>
                            {loading && (
                                <div role="status" className="w-full rounded animate-pulse dark:border-gray-700">
                                    <div className="h-3 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                </div>
                            )}
                            {!loading && (<>{publishStatus}</>)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ProductInfo