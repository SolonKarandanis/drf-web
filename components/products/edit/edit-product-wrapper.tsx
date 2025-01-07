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
    } = useGetProductDetails(uuid);

    if(!isProductLoading && productData){
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
            gender:undefined,
            colors:[],
            sizes:[] 
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