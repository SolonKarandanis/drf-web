import { ImageModel } from "@/models/image.models";
import { useLazyGetProductImagesQuery } from "@/shared/redux/features/products/productsApiSlice";
import { selectedProductImagesSelector, setSelectedProductImages } from "@/shared/redux/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { useEffect } from "react";

export function useGetProductDetailsImages(uuid:string){
    const [getProductImages,{isError,isLoading}] = useLazyGetProductImagesQuery();
    const dispatch = useAppDispatch();

    const productImages:ImageModel[]= useAppSelector(selectedProductImagesSelector);

    useEffect(()=>{
        getProductImages(uuid)
        .unwrap()
        .then((images) =>dispatch(setSelectedProductImages(images)))
        .catch((error)=>{
            // dispatch(resetSelectedProduct())
        })
    },[])

    return {
        productImages,
        isError,
        isLoading
    }
}