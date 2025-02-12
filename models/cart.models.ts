import { ImageModel } from "./image.models";

export interface CartItem{
    id:number;
    name:string;
    text:string;
    previewImage:ImageModel|null;
    modificationAlert:boolean;
    quantity:number;
    unitPrice:number;
    totalPrice:number;
    productId:number;
    uuid:string;
    attributes?:string;
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
    attributes:string;
}

export interface UpdateQuantityRequest{
    cartItemId:number;
    quantity:number;
}

export interface DeleteCartItemRequest{
    cartItemId:number;
}
