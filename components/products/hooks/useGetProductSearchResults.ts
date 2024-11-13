import { handleError } from "@/lib/functions";
import { ErrorResponse } from "@/models/error.models";
import { ProductSearchRequest, ProductSearchResponse } from "@/models/search.models";
import { useSearchProductsMutation } from "@/shared/redux/features/products/productsApiSlice";
import { 
    productsCountSelector, 
    productsNextSelector, 
    productsPreviousSelector, 
    productsSearchResultsSelector, 
    setProducts 
} from "@/shared/redux/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { useCallback, useEffect, useRef } from "react";
import { useProductFilters } from "./useProductFilters";

export function useGetProductSearchResults(){
    const dispatch = useAppDispatch();
    const [search,{ isLoading, }] = useSearchProductsMutation();
    const results = useAppSelector(productsSearchResultsSelector);
    const count = useAppSelector(productsCountSelector);
    const previous = useAppSelector(productsPreviousSelector);
    const next = useAppSelector(productsNextSelector);
    
    const searchProducts = useCallback((request:ProductSearchRequest)=>{
        search(request)
            .unwrap()
            .then((response:ProductSearchResponse) => {
                dispatch(setProducts(response));
            })
            .catch((error:ErrorResponse) => {
                handleError(error);
            });
    },[]);

    return {
        results,
        count,
        previous,
        next,
        isLoading,
        searchProducts,
    }
}

export function useGetInitialProductSearchResults(){
    const effectRan = useRef(false);
    const dispatch = useAppDispatch();
    const [search] = useSearchProductsMutation();
    const {query,categories,brands,sizes,page,size} = useProductFilters();

    useEffect(()=>{
        if (!effectRan.current){
            const request: ProductSearchRequest={
                query,
                categories,
                brands,
                sizes,
                paging:{
                    limit:size,
                    page
                }
            };
            search(request)
                .unwrap()
                .then((response:ProductSearchResponse) => {
                    dispatch(setProducts(response));
                })
                .catch((error:ErrorResponse) => {
                    handleError(error);
                });
        }
        return () => {
            effectRan.current = true;
        }
    },[]);
}