interface CartItem{
    id:number;
    modificationAlert:boolean;
    quantity:number;
    unitPrice:number;
    totalPrice:number;
    productId:number;
    uuid:string;
}

interface Cart{
    id:number;
    modificationAlert:boolean;
    totalPrice:number;
    dateCreated:string;
    dateModified:string;
    uuid:string;
    cartItems:CartItem[];
}

interface AddToCartRequest{
    productId:number;
    quantity:number;
}

interface UpdateQuantityRequest{
    cartItemId:number;
    quantity:number;
}

interface DeleteCartItemRequest{
    cartItemId:number;
}
