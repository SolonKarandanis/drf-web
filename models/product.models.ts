import { UserPublic } from "./user.models";

export enum ProductPublishedStatus{
    PUBLISHED = 'product.status.published',
    SCHEDULED = 'product.status.scheduled',
} 

export enum ProductAvailabilityStatus{
    IN_STOCK = 'product.availability.in.stock',
    OUT_OF_STOCK = 'product.availability.out.of.stock',
} 

export interface BaseProduct{
    sku:string;
    title:string;
    content:string;
    fabricDetails:string;
    careInstructions:string;
    price:number;
    inventory:number;
    publishStatus:ProductPublishedStatus;
    availabilityStatus: ProductAvailabilityStatus
}

export interface Product extends BaseProduct{
    id:number;
    salePrice:number;
    uuid:string;
}

export interface ProductDetails extends Product{
    owner:UserPublic;
    comments:Comment[];
}

export interface CreateProductRequest extends BaseProduct{

}

export interface PostProductCommentRequest{
    productId:number;
    comment:string;
}