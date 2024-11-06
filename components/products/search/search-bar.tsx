"use client"

import { ChangeEvent, MouseEvent,  } from 'react';
import { useGetProductSearchResults } from '../hooks/useGetProductSearchResults';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ProductSearchRequest } from '@/models/search.models';

const SearchBar = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const query = searchParams.get('query') ?? '';

    const {
        handleGetSearchResults,
        isLoading
    } = useGetProductSearchResults();

    const handleSearch = (event:MouseEvent<HTMLInputElement>) => {
        const request:ProductSearchRequest={
            query:query,
            paging:{
                page:1,
                limit:8,
            }
        };
        handleGetSearchResults(request);
    };

    const handleOnChange=(event:ChangeEvent<HTMLInputElement>)=>{
        let query = event.target.value;
        if (query) {
            router.push(`${pathname}?query=${query}`);
        } else { 
          router.push(pathname); 
        }
    }

    return (
        <div className="sm:flex sm:justify-center" role="search">
            <input 
                className="form-control !w-auto !rounded-sm me-2" 
                type="search"
                value={query} 
                onChange={handleOnChange} 
                onClick={handleSearch}
                placeholder="Search" 
                aria-label="Search" />
            <button className="ti-btn ti-btn-light !font-medium mt-2 sm:mt-0"
                type="submit">
                Search
            </button>
        </div>
    )
}

export default SearchBar