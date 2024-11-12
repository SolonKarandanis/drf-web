"use client";

import { BaseTotals } from "@/models/product.models";
import { Checkbox } from "@/shared/shadcn/components/ui/checkbox";
import { FC, useState } from "react";
 


interface Props{
    data: BaseTotals;
    onClick: (id:number)=>void;
    checked?:boolean
}

const SideBarData:FC<Props> = ({
    data,
    onClick,
    checked
}) => {
    const [isChecked, setChecked]= useState(checked? checked:false);
    const handleClick = () => {
        onClick(data.id);
        setChecked(!isChecked)
    };

    return (
        <div className="mb-2 form-check">
            <Checkbox 
                id={data.name} 
                checked={isChecked}
                onClick={handleClick}/>
            <label className="form-check-label" htmlFor={data.name}>
                {data.name}
            </label>
            <span className="badge bg-light text-[#8c9097] dark:text-white/50 ltr:float-right 
                rtl:float-left">
                {data.totalProducts}
            </span>
        </div>
    )
}

export default SideBarData