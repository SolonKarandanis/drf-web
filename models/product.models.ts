interface BaseProduct{
    sku:string;
    title:string;
    content:string;
    price:number;
    inventory:number;
}

interface Product extends BaseProduct{
    id:number;
    sale_price:number;
    uuid:string;
}

interface ProductDetails extends Product{
    owner:UserPublic;
    comments:Comment[];
}

interface CreateProductRequest extends BaseProduct{

}

interface PostProductCommentRequest{
    product_id:number;
    comment:string;
}