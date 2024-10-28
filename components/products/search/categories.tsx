"use client";

import React from 'react'
import { useGetProductTotals } from '../hooks/useGetProductTotals';
import SideBarLoading from './sidebar-loading';
import SideBarData from './sidebar-data';

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
                    {!categoriesLoading && (
                        <SideBarData 
                            firstData={categoriesFirstThree} 
                            restData={categoriesRest}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Categories