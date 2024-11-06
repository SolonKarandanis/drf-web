import { useSearchParams } from "next/navigation";
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
    const query = searchParams.get('query') ?? '';
    const page = searchParams.get('page') ?? '1';
    const size = searchParams.get('size') ?? '8';

    const setFilters = useCallback((filters: ProductFilters) => {
        const params = new URLSearchParams(searchParams.toString())
        if (filters.query !== undefined) {
            params.set('query', filters.query);
        }
        if (filters.page !== undefined) {
            params.set('query', String(filters.page));
        }
        if (filters.limit !== undefined) {
            params.set('query', String(filters.limit));
        }
        
    }, []);

    return {
        query,
        page,
        size,
        setFilters
    };
}