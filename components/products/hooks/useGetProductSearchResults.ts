import { handleError } from "@/lib/functions";
import { ErrorResponse } from "@/models/error.models";
import { ProductSearchRequest, ProductSearchResponse } from "@/models/search.models";
import { useSearchProductsMutation } from "@/shared/redux/features/products/productsApiSlice";
import { productsCountSelector, productsNextSelector, productsPreviousSelector, productsSearchResultsSelector, setProducts } from "@/shared/redux/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { useEffect } from "react";
import { useProductFilters } from "./useProductFilters";

export function useGetProductSearchResults(){
    const dispatch = useAppDispatch();
    const [search,{ isLoading, }] = useSearchProductsMutation();
    const {query,page,size} = useProductFilters();
    const results = useAppSelector(productsSearchResultsSelector);
    const count = useAppSelector(productsCountSelector);
    const previous = useAppSelector(productsPreviousSelector);
    const next = useAppSelector(productsNextSelector);
    

    const handleGetSearchResults = (request:ProductSearchRequest) =>{
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
        const request: ProductSearchRequest={
            query,
            paging:{
                limit:size,
                page
            }
        };
        handleGetSearchResults(request);
    },[]);

    return {
        results,
        count,
        previous,
        next,
        isLoading,
        handleGetSearchResults,
    }
}