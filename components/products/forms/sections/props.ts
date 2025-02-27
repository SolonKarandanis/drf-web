import { ProductPublishedStatus } from "@/models/product.models";
import { Control, FieldErrors } from "react-hook-form";

export interface FormProps{
    title: string;
    sizes: number[];
    colors:number[];
    category: number;
    gender: number;
    brand: number;
    inventory: number;
    price: number;
    sku: string;
    publishStatus: ProductPublishedStatus;
    careInstructions?: string | undefined;
}

export interface SectionProps{
    errors: FieldErrors<FormProps>;
    isProductLoading:boolean;
}

export interface AttributesSectionProps extends SectionProps{
    defaultValues: {sizes: number[];colors:number[]};
    control:Control<any>;
}