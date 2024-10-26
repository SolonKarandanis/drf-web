interface Order{
    id:number;
    dateCreated:string;
    buyerId:number;
    supplierId:number;
    status:string;
    totalPrice:number;
    isShipped:boolean;
    dateShipped:string;
    uuid:string;
}

interface OrderDetails extends Order{
    comments:Comment[];
    orderItems:OrderItem[];
}

interface PostOrderComment{
    orderId:number;
    comment:string;
}

interface OrderItem{
    id:number;
    productId:number;
    productName:string;
    sku:string;
    manufacturer:string;
    startDate:string;
    endDate:string;
    status:string;
    price:number;
    quantity:number;
    totalPrice:number;
    uuid:string;
}