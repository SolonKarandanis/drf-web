import { FC } from "react";


interface Props{
    salePriceIntegerPart:number;
    salePriceDecimalPart:string;
    price:number;
    loading:boolean;
}

const Price:FC<Props> = ({
    salePriceIntegerPart,
    salePriceDecimalPart,
    price,
    loading
}) => {
  return (
    <>
        {loading &&(
            <div role="status" className="w-full rounded animate-pulse dark:border-gray-700">
                <div className="h-4 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5 w-20"></div>
                <div className="h-4 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5 w-28"></div>
            </div>
        )}
        {!loading && (
            <>
                <p className="mb-1">
                    <span className="font-semibold h3">
                        <sup className="text-[0.875rem]">
                            $</sup>{salePriceIntegerPart}<sup className="text-[0.875rem]">
                            {salePriceDecimalPart}
                        </sup>
                    </span>
                </p>
                <p className="mb-0 text-[#8c9097] dark:text-white/50 text-[0.75rem]">
                    M.R.P-<s>${price}</s>
                </p>
            </>
        )}
    </>
  )
}

export default Price