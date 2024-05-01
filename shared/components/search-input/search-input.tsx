"use client"

import { Button } from "@/shared/shadcn/components/ui/button";
import { Input } from "@/shared/shadcn/components/ui/input";
import { FC } from "react";
import {Search} from "lucide-react";

interface Props{
    placeholder?:string;
}

const SearchInput:FC<Props> = ({placeholder}) => {
  return (
    <div className="flex items-center justify-between border rounded-lg">
        <Input 
            type="text" 
            placeholder={placeholder || "Search"}
            className="border-none"
        />
        <Button variant="ghost" size="icon">
            <Search />
            <span className="sr-only">Search Button</span>
        </Button>
    </div>
  )
}

export default SearchInput