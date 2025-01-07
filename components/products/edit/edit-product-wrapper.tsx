"use client";

import { FC} from "react"
import { useGetProductDetails } from "../hooks/useGetProductDetails";
import ProductForm from "../forms/product-form";

interface Props{
    uuid:string
}

const EditProductWrapper:FC<Props> = ({uuid}) => {
    const {
        isProductError,
        isProductLoading,
        productData,
        isProductAttributesLoading,
        sizesSelectedValues,
        colorsSelectedValues,
        genderSelectedValues,
    } = useGetProductDetails(uuid);

    if(!isProductLoading && !isProductAttributesLoading 
        && productData && genderSelectedValues && colorsSelectedValues && sizesSelectedValues){
        const defaultFormValues={
            title:productData.title,
            sku:productData.sku,
            brand:productData.brand.id,
            category:productData.categories[0].id,
            publishStatus:productData.publishStatus,
            availabilityStatus:productData.availabilityStatus,
            inventory:productData.inventory,
            price:productData.price,
            content:productData.content,
            fabricDetails:productData.fabricDetails,
            careInstructions:productData.careInstructions,
            gender:genderSelectedValues[0],
            colors:colorsSelectedValues,
            sizes:sizesSelectedValues 
        };
        return (
            <ProductForm
                key={1}
                defaultValues={defaultFormValues}
                isProductLoading={isProductLoading}/>
        )  
    }

    return (
        <ProductForm 
            key={2}
            isProductLoading={isProductLoading}/>
    )  

   
}

export default EditProductWrapper