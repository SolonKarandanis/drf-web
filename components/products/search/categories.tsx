"use client";

import React, { useState } from 'react'
import { useGetProductTotals } from '../hooks/useGetProductTotals';
import SideBarLoading from './sidebar-loading';
import SideBarData from './sidebar-data';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/shadcn/components/ui/collapsible';
import { Button } from '@/shared/shadcn/components/ui/button';
import { ChevronsUpDown } from 'lucide-react';

const Categories = () => {
    const {
        categoriesLoading,
        categoriesFirstThree,
        categoriesRest
    } = useGetProductTotals();
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div className="box-body !p-0">
            <div className="p-4 border-b dark:border-defaultborder/10">
                <Collapsible
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    className="w-[350px] space-y-2"
                    >
                    <div className="flex flex-col justify-between">
                        <div className='flex items-center gap-2'>
                            <p className="font-semibold mb-0 text-[#8c9097] dark:text-white/50">
                                CATEGORIES
                            </p>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm" className="p-0 w-9">
                                    <ChevronsUpDown className="w-4 h-4" />
                                    <span className="sr-only">Toggle</span>
                                </Button>
                            </CollapsibleTrigger>
                        </div>
                       
                        <div className="px-2 py-4 pb-0">
                            {categoriesLoading && (
                                <SideBarLoading />
                            )}
                            {!categoriesLoading && categoriesFirstThree.map((data)=>(
                                <SideBarData 
                                    key={data.id}
                                    data={data}/>
                            ))}
                        </div>
                        <CollapsibleContent className="space-y-2">
                            <div className="px-2 py-4 pb-0">
                                {categoriesRest.map((data)=>(
                                    <SideBarData 
                                        key={data.id}
                                        data={data}/>
                                ))}
                            </div>
                        </CollapsibleContent>
                    </div>
                </Collapsible>
            </div>
        </div>
    )
}

export default Categories