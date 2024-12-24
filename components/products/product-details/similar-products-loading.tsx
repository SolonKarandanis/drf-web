import {FC} from 'react'

interface Props{
    iterate:number;
}

const SimilarProductsLoading:FC<Props> = ({iterate})=> {
  return (
    [...Array(iterate)].map((e, i) =>(
        <tr key={i} role="status" className="w-full rounded animate-pulse dark:border-gray-700 dark:border-defaultborder/10">
            <td className="flex flex-row">
                <div className="flex items-start flex-grow w-full mt-4">
                    <div className="similar-products-image me-2">
                        <img src="../../../../assets/images/ecommerce/png/16.png" alt="" />
                    </div>
                    
                    <div>
                        <div className="h-3 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5 w-72"></div>
                        <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5 w-52"></div>
                        <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5 w-40"></div>
                    </div>
                </div>
            </td>
        </tr>
    ))
  )
}

export default SimilarProductsLoading