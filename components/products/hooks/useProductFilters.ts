import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export type ProductFilters = {
    query?: string;
    category?: number[];
    brand?: number[];
    size?: number[];
    discount?:number[];
    page: number;
    limit: number;
    sortField?: string;
  };

export function useProductFilters() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const query = searchParams.get('query') ?? '';
    const categories=searchParams.getAll('category').map(cat => Number(cat));
    const page = Number(searchParams.get('page') ?? '1');
    const size = Number(searchParams.get('size') ?? '8');

    const setQuery = useCallback((query:string)=>{
        if(query){
            const newSearchParams = new URLSearchParams(searchParams.toString());
            newSearchParams.set('query', query);
            router.push(`?${newSearchParams.toString()}`);
        }
        else{
            router.push(pathname); 
        }
    },[]);

    const setPage = useCallback((page:number)=>{
        if(page){
            const newSearchParams = new URLSearchParams(searchParams.toString());
            newSearchParams.set('page', String(page));
            router.push(`?${newSearchParams.toString()}`);
        }
        else{
            router.push(pathname); 
        }
    },[]);

    const setCategory = useCallback((category:number | number[])=>{
        if (category) {
            if(!Array.isArray(category)){
                category = [category]
            }
            if(categories){
                const set = new Set(categories);
                category.forEach(cat => set.add(cat));
            }
            const params = new URLSearchParams(searchParams);
            params.delete('category');
            category.forEach(cat=> {
                return params.append('category', String(cat));
            });
            router.push(`?${params.toString()}`);
           
        } else { 
          router.push(pathname); 
        }
    },[categories]);

    const setBrand = useCallback((brand:number[])=>{
        if (brand) {
            router.push(`${pathname}?page=${page}`);
        } else { 
          router.push(pathname); 
        }
    },[]);

    const setSize = useCallback((size:number[])=>{
        if (size) {
            router.push(`${pathname}?page=${page}`);
        } else { 
          router.push(pathname); 
        }
    },[]);

    return {
        query,
        page,
        size,
        setQuery,
        setPage,
        setCategory
    };
}