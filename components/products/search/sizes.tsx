"use client"

import Link from 'next/link'
import React from 'react'
import { useGetProductTotals } from '../hooks/useGetProductTotals';
import SideBarLoading from './sidebar-loading';

const Sizes = () => {
    const {
        sizesLoading,
        sizesFirstThree,
        sizesRest
    } = useGetProductTotals();
    return (
        <div className="p-4">
            <p className="font-semibold mb-0 text-[#8c9097] dark:text-white/50">
                SIZES
            </p>
            <div className="px-2 py-3 pb-0">
                {sizesLoading && (
                    <SideBarLoading />
                )}
                {!sizesLoading && sizesFirstThree.map((data)=>(
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
    )
}

export default Sizes