"use client"

import { ChangeEvent, MouseEvent,  } from 'react';
import { useGetProductSearchResults } from '../hooks/useGetProductSearchResults';
import { ProductSearchRequest } from '@/models/search.models';
import { useProductFilters } from '../hooks/useProductFilters';
import { Button } from '@/shared/shadcn/components/ui/button';
import ButtonLoading from '@/shared/components/button-loading/button-loading';
import { useTranslations } from 'next-intl';

const SearchBar = () => {
    const {query,page,size,setQuery} = useProductFilters();
    const t = useTranslations();
    const {
        searchProducts,
        isLoading
    } = useGetProductSearchResults();

    const handleSearch = (event:MouseEvent<HTMLButtonElement>) => {
        const request:ProductSearchRequest={
            query:query,
            paging:{
                page:Number(page),
                limit:Number(size),
            }
        };
        searchProducts(request);
    };

    const handleOnChange=(event:ChangeEvent<HTMLInputElement>)=>{
        let query = event.target.value;
        setQuery(query);
    }

    return (
        <div className="sm:flex sm:justify-center" role="search">
            <input 
                className="form-control !w-auto !rounded-sm me-2" 
                type="search"
                value={query} 
                onChange={handleOnChange} 
                
                placeholder="Search" 
                aria-label="Search" />
            <Button 
                type="submit" 
                variant="outline"
                disabled={isLoading}
                onClick={handleSearch}>
                {isLoading ? 
                    <ButtonLoading /> : 
                    t(`GLOBAL.BUTTONS.search`)
                }
            </Button>
        </div>
    )
}

export default SearchBar