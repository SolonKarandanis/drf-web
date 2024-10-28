"use client";

import React from 'react'
import { useGetProductTotals } from '../hooks/useGetProductTotals';
import SideBarLoading from './sidebar-loading';

const Categories = () => {
    const {
        categoriesLoading,
        categoriesFirstThree,
        categoriesRest
    } = useGetProductTotals();
    
    return (
        <div className="box-body !p-0">
            <div className="p-4 border-b dark:border-defaultborder/10">
                <p className="font-semibold mb-0 text-[#8c9097] dark:text-white/50">
                    CATEGORIES
                </p>
                <div className="px-2 py-4 pb-0">
                    {categoriesLoading && (
                        <SideBarLoading />
                    )}
                    {!categoriesLoading && categoriesFirstThree.map((data)=>(
                        <div className="mb-2 form-check" key={data.id}>
                            <input className="form-check-input" type="checkbox" value=""
                                id={data.name} />
                            <label className="form-check-label" htmlFor={data.name}>
                                {data.name}
                            </label>
                            <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                                rtl:float-left">
                               {data.totalProducts}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Categories