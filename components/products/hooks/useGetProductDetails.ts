import { Comment } from "@/models/comment.models";
import { BaseProductDetails, Brand } from "@/models/product.models";
import { UserPublic } from "@/models/user.models";
import { useLazyGetProductDetailsQuery } from "@/shared/redux/features/products/productsApiSlice";
import { 
    resetSelectedProduct, 
    selectedProductBrandSelector, 
    selectedProductCommentsSelector, 
    selectedProductOwnerSelector, 
    selectedProductSelector, 
    setSelectedProduct 
} from "@/shared/redux/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { useEffect } from "react";

export function useGetProductDetails(uuid:string){
    const [getProduct] = useLazyGetProductDetailsQuery();
    const dispatch = useAppDispatch();
    const product:BaseProductDetails|null= useAppSelector(selectedProductSelector);
    const productOwner:UserPublic|null= useAppSelector(selectedProductOwnerSelector);
    const productComments:Comment[]= useAppSelector(selectedProductCommentsSelector);
    const productBrands:Brand|null= useAppSelector(selectedProductBrandSelector);

    useEffect(()=>{
        getProduct(uuid)
        .unwrap()
        .then((products) =>setSelectedProduct(products))
        .catch((error)=>{
            dispatch(resetSelectedProduct())
        })
    },[])

    return {
        product,
        productOwner,
        productComments,
        productBrands
    }
}