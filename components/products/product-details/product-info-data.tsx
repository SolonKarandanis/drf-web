import { FC } from "react";

interface Props{
    data:string;
    loading:boolean;
}


const ProductInfoData:FC<Props> = ({
    data,
    loading
}) => {
  return (
    <>
        {loading && (
            <div role="status" className="w-full rounded animate-pulse dark:border-gray-700">
                <div className="h-3 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
            </div>
        )}
        {!loading && (<>{data}</>)}
    </>
  )
}

export default ProductInfoData