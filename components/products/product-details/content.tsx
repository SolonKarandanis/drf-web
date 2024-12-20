import React, { FC } from 'react'

interface Props{
    content:string;
    loading:boolean;
}


const Content:FC<Props> = ({
    content,
    loading
}) => {
  return (
    <>
        {loading &&(
            <div role="status" className="w-full rounded animate-pulse dark:border-gray-700">
                <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
            </div>
        )}
        {!loading && (
            <p className="text-[#8c9097] dark:text-white/50 mb-0">
                {content}
            </p>
        )}
    </>
  )
}

export default Content