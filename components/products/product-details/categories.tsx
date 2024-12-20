import { Category } from '@/models/product.models';
import React, { FC, Fragment } from 'react'


interface Props{
    categories:Category[];
    loading:boolean;
}


const Categories:FC<Props> = ({
    categories,
    loading
}) => {
  return (
    <>
        {loading &&(
            <div role="status" className="w-full rounded animate-pulse dark:border-gray-700">
                <div className="h-4 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
            </div>
        )}
        <div className="inline-flex" role="group" aria-label="Basic radio toggle button group">
            {!loading && categories && categories.map((category)=>(
                <Fragment key={category.id}>
                    <input 
                        type="radio" 
                        className="btn-check " 
                        name="select-type" 
                        id={String(category.id)} />
                    <label className="ti-btn !py-[0.45rem] !px-3 ti-btn-light !border-e-0 
                        !text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:!border-defaultborder/10 !text-[0.75rem] 
                        !font-medium !rounded-e-none hover:!bg-light hover:!text-defaulttextcolor" 
                        htmlFor={String(category.id)}>
                        {category.name}
                    </label>
                </Fragment>
            ))}
        </div>
    </>
  )
}

export default Categories