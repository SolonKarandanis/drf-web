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
    const brands=searchParams.getAll('brand').map(b => Number(b));
    const sizes=searchParams.getAll('psize').map(s => Number(s));
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
            category=toArray(category);
            const set = handleSetValues(categories,category);
            const params = new URLSearchParams(searchParams);
            params.delete('category');
            set.forEach(cat=> {
                return params.append('category', String(cat));
            });
            router.push(`?${params.toString()}`);
           
        } else { 
          router.push(pathname); 
        }
    },[categories]);

    const setBrand = useCallback((brand:number | number[])=>{
        if (brand) {
            brand=toArray(brand);
            const set = handleSetValues(brands,brand);
            const params = new URLSearchParams(searchParams);
            params.delete('brand');
            set.forEach(cat=> {
                return params.append('brand', String(cat));
            });
            router.push(`?${params.toString()}`);
        } else { 
            router.push(pathname);
        }
    },[brands]);

    const setSize = useCallback((size:number | number[])=>{
        const set = new Set();
        if (size) {
            size=toArray(size);
            const set = handleSetValues(sizes,size);
            const params = new URLSearchParams(searchParams);
            params.delete('psize');
            set.forEach(cat=> {
                return params.append('psize', String(cat));
            });
            router.push(`?${params.toString()}`);
        } else { 
            router.push(pathname);
        }
    },[sizes]);

    const toArray=(value:number | number[]):number[]=>{
        if(!Array.isArray(value)){
            value = [value]
        }
        return value;
    }

    const handleSetValues =(existingParams:number[],selectedParams:number[]):Set<number>=>{
        const set = new Set<number>();
        if(existingParams){
            existingParams.forEach(p=> {
                if(set.has(p)){
                    set.delete(p);
                }
                else{
                    set.add(p);
                }
            });
            selectedParams.forEach(p => {
                if(set.has(p)){
                    set.delete(p);
                }
                else{
                    set.add(p);
                }
            });
        }
        return set;
    }
    

    return {
        query,
        page,
        size,
        categories,
        brands,
        sizes,
        setQuery,
        setPage,
        setCategory,
        setBrand,
        setSize
    };
}