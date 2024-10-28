"use client"

import React from 'react'
import { useGetProductTotals } from '../hooks/useGetProductTotals';
import SideBarLoading from './sidebar-loading';
import SideBarData from './sidebar-data';

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
                {!sizesLoading && (
                    <SideBarData 
                        firstData={sizesFirstThree} 
                        restData={sizesRest}/>
                )}
            </div>
        </div>
    )
}

export default Sizes