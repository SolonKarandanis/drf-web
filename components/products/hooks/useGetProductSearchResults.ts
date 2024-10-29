import { handleError } from "@/lib/functions";
import { ErrorResponse } from "@/models/error.models";
import { ProductSearchRequest, ProductSearchResponse } from "@/models/search.models";
import { useSearchProductsMutation } from "@/shared/redux/features/products/productsApiSlice";
import { productsSearchRequestSelector, setProducts } from "@/shared/redux/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { useEffect } from "react";

export function useGetProductSearchResults(){
    const dispatch = useAppDispatch();
    const [search,{ isLoading, }] = useSearchProductsMutation();
    const searchRequest = useAppSelector(productsSearchRequestSelector);

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
        handleGetSearchResults(searchRequest);
    },[]);

    return {
        handleGetSearchResults,
        isLoading,
        searchRequest
    }
}