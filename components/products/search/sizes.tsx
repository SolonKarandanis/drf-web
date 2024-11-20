"use client"

import React, { useState } from 'react'
import { useGetProductTotals } from '../hooks/useGetProductTotals';
import SideBarLoading from './sidebar-loading';
import SideBarData from './sidebar-data';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/shared/shadcn/components/ui/collapsible';
import { Button } from '@/shared/shadcn/components/ui/button';
import { ChevronsUpDown } from 'lucide-react';
import { useProductFilters } from '../hooks/useProductFilters';
import { useTranslations } from 'next-intl';

const Sizes = () => {
    const {
        sizesLoading,
        sizesFirstThree,
        sizesRest
    } = useGetProductTotals();
    const [isOpen, setIsOpen] = useState(false);
    const {sizes,setSize} = useProductFilters();
    const t = useTranslations();

    const handleSizes =(id:number)=>{
        setSize(id);
    };


    const setIsChecked = (id:number):boolean =>{
        const found =sizes.find(c=>c===id);
        if(found){
            return true;
        }
        return false;
    }


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
                                {t("PRODUCTS.SEARCH.LABELS.sizes")}
                            </p>
                            {sizesRest.length >0 &&(
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm" className="p-0 w-9">
                                        <ChevronsUpDown className="w-4 h-4" />
                                        <span className="sr-only">{t("GLOBAL.BUTTONS.toggle")}</span>
                                    </Button>
                                </CollapsibleTrigger>
                            )}
                        </div>
                        <div className="px-2 py-4 pb-0">
                            {sizesLoading && (
                                <SideBarLoading />
                            )}
                            {!sizesLoading && sizesFirstThree.map((data)=>(
                                <SideBarData 
                                    key={data.id}
                                    data={data}
                                    checked={setIsChecked(data.id)}
                                    onClick={handleSizes}/>
                            ))}
                        </div>
                        <CollapsibleContent className="space-y-2">
                            <div className="px-2 py-4 pb-0">
                                {sizesRest.map((data)=>(
                                    <SideBarData 
                                        key={data.id}
                                        data={data}
                                        checked={setIsChecked(data.id)}
                                        onClick={handleSizes}/>
                                ))}
                            </div>
                        </CollapsibleContent>
                    </div>
                </Collapsible>
            </div>
        </div>
    )
}

export default Sizes