"use client";

import React from 'react'
import { useGetProductTotals } from '../hooks/useGetProductTotals';
import SideBarLoading from './sidebar-loading';
import SideBarData from './sidebar-data';

const Brands = () => {
    const {
        brandsLoading,
        brandsFirstThree,
        brandsRest
    } = useGetProductTotals();
    return (
        <div className="p-4 border-b dark:border-defaultborder/10">
            <p className="font-semibold mb-0 text-[#8c9097] dark:text-white/50">
                BRANDS
            </p>
            <div className="px-2 py-4 pb-0">
                {brandsLoading && (
                    <SideBarLoading />
                )}
                {!brandsLoading && (
                    <SideBarData 
                        firstData={brandsFirstThree} 
                        restData={brandsRest}/>
                )}
            </div>
        </div>
    )
}

export default Brands