import { SimilarProduct } from "@/models/product.models";
import { useLazyGetSimilarProductsByIdQuery } from "@/shared/redux/features/products/productsApiSlice";
import { selectedProductSimilarProductsSelector, setSelectedProductSimilarProducts } from "@/shared/redux/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { useEffect } from "react";

export function useGetProductDetailsSimilarProducts(uuid:string){
    const [getSimilarProducts,{isError,isLoading}] = useLazyGetSimilarProductsByIdQuery();
    const dispatch = useAppDispatch();

    const similarProducts:SimilarProduct[]= useAppSelector(selectedProductSimilarProductsSelector);

    useEffect(()=>{
        getSimilarProducts(uuid)
        .unwrap()
        .then((products) =>dispatch(setSelectedProductSimilarProducts(products)))
        .catch((error)=>{
            // dispatch(resetSelectedProduct())
        })
    },[])

    return {
        similarProducts,
        isError,
        isLoading
    }
}