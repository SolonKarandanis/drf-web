import { Comment } from "@/models/comment.models";
import { BaseProductDetails, Brand, Category } from "@/models/product.models";
import { UserPublic } from "@/models/user.models";
import { useLazyGetProductAttributesByIdQuery, useLazyGetProductDetailsQuery } from "@/shared/redux/features/products/productsApiSlice";
import { 
    resetSelectedProduct, 
    selectedProductBrandSelector, 
    selectedProductCategoriesSelector, 
    selectedProductCommentsSelector, 
    selectedProductOwnerSelector, 
    selectedProductSalePriceDecimalPartSelector, 
    selectedProductSalePriceIntegerPartSelector, 
    selectedProductSelector, 
    setSelectedProduct, 
    setSelectedProductAttributes
} from "@/shared/redux/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { useEffect } from "react";

export function useGetProductDetails(uuid:string){
    const [getProduct,{isError:isProductError,isLoading:isProductLoading,data:productData}] = useLazyGetProductDetailsQuery();
    const [getProductAttributes,{isError:isProductAttributesError,isLoading:isProductAttributesLoading,data:productAttributesData}] = useLazyGetProductAttributesByIdQuery();
    const dispatch = useAppDispatch();
    const product:BaseProductDetails|null= useAppSelector(selectedProductSelector);
    const productOwner:UserPublic|null= useAppSelector(selectedProductOwnerSelector);
    const productComments:Comment[]= useAppSelector(selectedProductCommentsSelector);
    const productBrands:Brand|null= useAppSelector(selectedProductBrandSelector);
    const productCategories:Category[]= useAppSelector(selectedProductCategoriesSelector);
    const productSalePriceIntegerPart:number = useAppSelector(selectedProductSalePriceIntegerPartSelector);
    const productSalePriceDecimalPart:string = useAppSelector(selectedProductSalePriceDecimalPartSelector);

    useEffect(()=>{
        getProduct(uuid)
            .unwrap()
            .then((products) =>{
                dispatch(setSelectedProduct(products));
            })
            .catch((error)=>{
                dispatch(resetSelectedProduct());
            });

        getProductAttributes(uuid)
            .unwrap()
            .then((attributes) =>{
                dispatch(setSelectedProductAttributes(attributes));
            })

    },[]);

    const productSizes = productAttributesData?.sizes;
    const productColors = productAttributesData?.colors;
    

    const sizesSelectedValues = productSizes?.map(size=>size.attributeOptionId);
    const colorsSelectedValues = productColors?.map(color=>color.attributeOptionId);
    const genderSelectedValues = productAttributesData?.genders.map(gender=>gender.attributeOptionId);
 


    return {
        product,
        productSalePriceIntegerPart,
        productSalePriceDecimalPart,
        productOwner,
        productComments,
        productBrands,
        productCategories,
        productSizes,
        productColors,
        isProductError,
        isProductLoading,
        productData,
        isProductAttributesLoading,
        isProductAttributesError,
        sizesSelectedValues,
        colorsSelectedValues,
        genderSelectedValues
    }
}