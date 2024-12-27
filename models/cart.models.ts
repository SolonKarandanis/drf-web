export interface CartItem{
    id:number;
    name:string;
    text:string;
    imageSrc: string;
    color:string;
    modificationAlert:boolean;
    quantity:number;
    unitPrice:number;
    totalPrice:number;
    productId:number;
    uuid:string;
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
}

export interface UpdateQuantityRequest{
    cartItemId:number;
    quantity:number;
}

export interface DeleteCartItemRequest{
    cartItemId:number;
}
