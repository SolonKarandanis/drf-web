import { AttributeIds } from "./attributes.models";
import { ImageModel } from "./image.models";
import { ProductAttributes } from "./product.models";

export interface CartItemProduct{
    sku:string;
    title:string;
    uuid:string;
}

export interface CartItem{
    id:number;
    productDetails:CartItemProduct;
    previewImage:ImageModel|null;
    modificationAlert:boolean;
    quantity:number;
    unitPrice:number;
    totalPrice:number;
    productId:number;
    uuid:string;
    attributes:Record<AttributeIds, number>;
    productAttributes: ProductAttributes;
}

export interface Cart{
    id:number;
    modificationAlert:boolean;
    totalPrice:number;
    dateCreated:string;
    dateModified:string;
    uuid:string;
    cartItems:CartItem[];
}

export interface AddToCartRequest{
    productId:number;
    quantity:number;
    attributes?:string;
}

export interface UpdateItemRequest{
    cartItemId:number;
    productId:number;
    quantity?:number;
    attributes?:string;
}

export interface DeleteCartItemRequest{
    cartItemId:number;
}
