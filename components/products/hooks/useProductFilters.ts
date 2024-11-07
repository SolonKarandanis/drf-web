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
    const page = Number(searchParams.get('page') ?? '1');
    const size = Number(searchParams.get('size') ?? '8');

    const setQuery = useCallback((query:string)=>{
        if (query) {
            router.push(`${pathname}?query=${query}`);
        } else { 
          router.push(pathname); 
        }
    },[]);

    const setPage = useCallback((page:number)=>{
        if (page) {
            router.push(`${pathname}?page=${page}`);
        } else { 
          router.push(pathname); 
        }
    },[]);

    const setCategory = useCallback((category:number | number[])=>{
        if (category) {
            if(!Array.isArray(category)){
                category = [category]
            }
            const url = `${pathname}?page`;
            for(const [i, cat] of category.entries()){
                if (i !== category.length - 1) {
                    router.push(`${url}=${cat}&`);
                }
                else{
                    router.push(`${url}=${cat}`);
                }
            }
           
        } else { 
          router.push(pathname); 
        }
    },[]);

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