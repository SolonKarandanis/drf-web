import {FC} from 'react'

interface Props{
    brand:string;
    modelName:string;
    color:string;
    availabilityStatus:string;
    publishStatus:string;
}

const ProductInfo:FC<Props> = ({
    brand,
    modelName,
    color,
    availabilityStatus,
    publishStatus
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
                        <td>{brand}</td>
                    </tr>
                    <tr className="border border-defaultborder dark:border-defaultborder/10">
                        <th scope="row" className="!font-semibold text-start">
                            Model Name
                        </th>
                        <td>
                            {modelName}
                        </td>
                    </tr>
                    <tr className="border border-defaultborder dark:border-defaultborder/10">
                        <th scope="row" className="!font-semibold text-start">
                            Color
                        </th>
                        <td>
                            {color}
                        </td>
                    </tr>
                    <tr className="border border-defaultborder dark:border-defaultborder/10">
                        <th scope="row" className="!font-semibold text-start">
                            Availability Status
                        </th>
                        <td>
                            {availabilityStatus}
                        </td>
                    </tr>
                    <tr className="border border-defaultborder dark:border-defaultborder/10">
                        <th scope="row" className="!font-semibold text-start">
                            Publish Status
                        </th>
                        <td>
                            {publishStatus}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ProductInfo