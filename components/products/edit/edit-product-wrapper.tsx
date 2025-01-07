"use client";

import { FC } from "react"
import { useGetProductDetails } from "../hooks/useGetProductDetails";
import ProductForm from "../forms/product-form";

interface Props{
    uuid:string
}

const EditProductWrapper:FC<Props> = ({uuid}) => {
        const {
            isError,
            isLoading,
            product,
            productBrands,
            productCategories,
            productOwner
        } = useGetProductDetails(uuid);

        let defaultFormValues={
            title:'',
            sku:'',
            brand:0,
            gender:undefined,
            category:0,
            publishStatus:'',
            availabilityStatus:'',
            inventory:0,
            price:0,
            content:'',
            fabricDetails:'',
            careInstructions:'',
            colors:[],
            sizes:[] 
        }

        if(!isLoading && product && productBrands){
            defaultFormValues={
                title:product.title,
                sku:product.sku,
                brand:productBrands.id,
                category:productCategories[0].id,
                publishStatus:product.publishStatus,
                availabilityStatus:product.availabilityStatus,
                inventory:product.inventory,
                price:product.price,
                content:product.content,
                fabricDetails:product.fabricDetails,
                careInstructions:product.careInstructions,
                gender:undefined,
                colors:[],
                sizes:[] 
            };

            return (
                <ProductForm 
                    defaultValues={defaultFormValues}
                    isProductLoading={isLoading}/>
            )
        }
        
}

export default EditProductWrapper