import Link from 'next/link';
import { FC } from 'react'

interface Props{
    inventory:number;
    ownerId:string;
    firstName:string;
    lastName:string;
    brandName:string;
    loading:boolean;
}

const StockInfo:FC<Props> = ({
    inventory,
    firstName,
    lastName,
    brandName,
    ownerId,
    loading
}) => {
  return (
    <>
        {loading &&(
            <div role="status" className="w-full rounded animate-pulse dark:border-gray-700">
                <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
            </div>
        )}
        {!loading && (
            <>
                <p className="text-danger mb-0 text-[1rem]">Only {inventory} left in stock.</p>
                <p className="mb-0 text-[0.75rem]">
                    Sold by 
                    <Link  href={`/users/${ownerId}`}
                        className="ml-1 mr-1 hover:underline ltr:float-right rtl:float-left text-sky-600">
                        {firstName} {' '} {lastName}
                    </Link>
                    and made by 
                    <span className="ml-1 text-info">
                        <u>{brandName}</u>.
                    </span>
                </p>
            </>
        )}
    </>
  )
}

export default StockInfo