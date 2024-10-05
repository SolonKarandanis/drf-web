"use client"

import { useState } from 'react'
import { Itemsdata1 } from './product-data';

const SearchBar = () => {
    const [allData, setAllData] = useState(Itemsdata1);
    const userdata:any = [];

    const myfunction = (idx:string) => {
        let Data;
        for (Data of allData) {
            if (Data.title[0] == " ") {
                Data.title = Data.title.trim();
            }
            if (Data.title.toLowerCase().includes(idx.toLowerCase())) {
                if (Data.title.toLowerCase().startsWith(idx.toLowerCase())) {
                    userdata.push(Data);
                }
            }

        }
        setAllData(userdata);
    };

    return (
        <div className="sm:flex" role="search">
            <input className="form-control !w-auto !rounded-sm me-2" 
                type="search" onChange={(ele) => { myfunction(ele.target.value); }}
                placeholder="Search" aria-label="Search" />
            <button className="ti-btn ti-btn-light !font-medium mt-2 sm:mt-0"
                type="submit">
                Search
            </button>
        </div>
    )
}

export default SearchBar