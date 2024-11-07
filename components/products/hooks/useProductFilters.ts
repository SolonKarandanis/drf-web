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

    

    return {
        query,
        page,
        size,
        setQuery,
        setPage
    };
}