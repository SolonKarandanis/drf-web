"use client";

import { BaseTotals } from "@/models/product.models";
import { FC } from "react";
 


interface Props{
    data: BaseTotals;
}

const SideBarData:FC<Props> = ({
    data,
}) => {
    return (
        <div className="mb-2 form-check">
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
    )
}

export default SideBarData