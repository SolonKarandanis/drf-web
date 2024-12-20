import { FC } from "react";

interface Props{
    sku:string;
    title:string;
    loading:boolean;
}

const SkuTitle:FC<Props> = ({
    sku,
    title,
    loading
}) => {
  return (
   <>
        {loading &&(
            <div role="status" className="w-full rounded animate-pulse dark:border-gray-700">
                <div className="h-4 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5 w-80"></div>
            </div>
        )}
        {!loading && (
            <p className="text-[1.125rem] font-semibold mb-0">
            {`(${sku}) ${title}`}
            </p>
        )}
   </>
  )
}

export default SkuTitle