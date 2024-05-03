"use client"

import { Button } from "@/shared/shadcn/components/ui/button";
import { Input } from "@/shared/shadcn/components/ui/input";
import { ChangeEvent, FC, useCallback, useState } from "react";
import {Search} from "lucide-react";
import debounce from "lodash.debounce";

interface Props{
    placeholder?:string;
    search: (query:string) => void;
    debounceTime:number;
}

const SearchInput:FC<Props> = ({placeholder,search,debounceTime=500}) => {
  const [searchTerm,setSearchTerm] = useState<string>('');

  const request = debounce((query:string)=> search(query),debounceTime);

  const debouncedRequest = useCallback((searhTerm:string)=>request(searchTerm),[]);

  const onChange = (e:ChangeEvent<HTMLInputElement>)=>{
    setSearchTerm(e.target.value);
    debouncedRequest(e.target.value)
  }

  return (
    <div className="flex items-center justify-between border rounded-lg">
        <Input 
            type="text" 
            placeholder={placeholder || "Search"}
            className="border-none"
            onChange={onChange}
            value={searchTerm}
        />
        <Button variant="ghost" size="icon">
            <Search />
            <span className="sr-only">Search Button</span>
        </Button>
    </div>
  )
}

export default SearchInput