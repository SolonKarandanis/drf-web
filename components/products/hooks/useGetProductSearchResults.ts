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
import { useEffect, useRef } from "react";
import { useProductFilters } from "./useProductFilters";

export function useGetProductSearchResults(){
    const effectRan = useRef(false);
    const dispatch = useAppDispatch();
    const [search,{ isLoading, }] = useSearchProductsMutation();
    const {query,categories,brands,sizes,page,size} = useProductFilters();
    const results = useAppSelector(productsSearchResultsSelector);
    const count = useAppSelector(productsCountSelector);
    const previous = useAppSelector(productsPreviousSelector);
    const next = useAppSelector(productsNextSelector);
    

    const searchProducts = (request:ProductSearchRequest) =>{
        search(request)
            .unwrap()
            .then((response:ProductSearchResponse) => {
                dispatch(setProducts(response));
            })
            .catch((error:ErrorResponse) => {
                handleError(error);
            });
    };

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
            searchProducts(request); 
        }
        return () => {
            effectRan.current = true;
        }
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