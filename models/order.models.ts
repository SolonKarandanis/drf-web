interface Order{
    id:number;
    date_created:string;
    buyer_id:number;
    supplier_id:number;
    status:string;
    total_price:number;
    is_shipped:boolean;
    date_shipped:string;
    uuid:string;
}

interface OrderDetails extends Order{
    comments:Comment[];
    order_items:OrderItem[];
}

interface PostOrderComment{
    order_id:number;
    comment:string;
}

interface OrderItem{
    id:number;
    product_id:number;
    product_name:string;
    sku:string;
    manufacturer:string;
    start_date:string;
    end_date:string;
    status:string;
    price:number;
    quantity:number;
    total_price:number;
    uuid:string;
}