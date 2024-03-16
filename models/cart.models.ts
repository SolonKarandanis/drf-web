interface CartItem{
    id:number;
    modification_alert:boolean;
    quantity:number;
    unit_price:number;
    total_price:number;
    product_id:number;
    uuid:string;
}

interface Cart{
    id:number;
    modification_alert:boolean;
    total_price:number;
    date_created:string;
    date_modified:string;
    uuid:string;
    cart_items:CartItem[];
}

interface AddToCartRequest{
    product_id:number;
    quantity:number;
}

interface UpdateQuantityRequest{
    cart_item_id:number;
    quantity:number;
}

interface DeleteCartItemRequest{
    cart_item_id:number;
}
