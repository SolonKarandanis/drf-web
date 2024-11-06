"use client"

import { MouseEvent } from 'react';
import { useGetProductSearchResults } from '../hooks/useGetProductSearchResults';
import { useSearchParams } from 'next/navigation';

const SearchBar = () => {
    const searchParams = useSearchParams();
    const {
        handleGetSearchResults,
        isLoading
    } = useGetProductSearchResults();

    const handleSearch = (event:MouseEvent<HTMLInputElement>) => {
        
    };

    return (
        <div className="sm:flex sm:justify-center" role="search">
            <input className="form-control !w-auto !rounded-sm me-2" 
                type="search" onClick={handleSearch}
                placeholder="Search" aria-label="Search" />
            <button className="ti-btn ti-btn-light !font-medium mt-2 sm:mt-0"
                type="submit">
                Search
            </button>
        </div>
    )
}

export default SearchBar