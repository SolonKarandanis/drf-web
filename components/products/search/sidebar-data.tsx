"use client";

import { BaseTotals } from "@/models/product.models";
import { FC, useState } from "react";
import { ChevronsUpDown, Plus, X } from "lucide-react"
import { Collapsible } from "@/shared/shadcn/components/ui/collapsible";
 


interface Props{
    firstData: BaseTotals[];
    restData: BaseTotals[];
}

const SideBarData:FC<Props> = ({
    firstData,
    restData
}) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-[350px] space-y-2"
        >
            {firstData.map(data =>(
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
        </Collapsible>
    )
}

export default SideBarData