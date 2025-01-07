"use client";

import { FC} from "react"
import { useGetProductDetails } from "../hooks/useGetProductDetails";
import ProductForm from "../forms/product-form";

interface Props{
    uuid:string
}

const EditProductWrapper:FC<Props> = ({uuid}) => {
    const {
        isError,
        isLoading,
        data,
    } = useGetProductDetails(uuid);

    if(!isLoading && data){
        const defaultFormValues={
            title:data.title,
            sku:data.sku,
            brand:data.brand.id,
            category:data.categories[0].id,
            publishStatus:data.publishStatus,
            availabilityStatus:data.availabilityStatus,
            inventory:data.inventory,
            price:data.price,
            content:data.content,
            fabricDetails:data.fabricDetails,
            careInstructions:data.careInstructions,
            gender:undefined,
            colors:[],
            sizes:[] 
        };

        return (
            <ProductForm
                key={1}
                defaultValues={defaultFormValues}
                isProductLoading={isLoading}/>
        )  
    }

    return (
        <ProductForm 
            key={2}
            isProductLoading={isLoading}/>
    )  

   
}

export default EditProductWrapper