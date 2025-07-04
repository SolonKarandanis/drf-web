import { AttributeIds } from "./attributes.models";
import { ImageModel } from "./image.models";

export interface WishlistItemProduct{
    sku:string;
    title:string;
    uuid:string;
}

export interface WihsilistItem{
    uuid:string;
    attributes:Record<AttributeIds, number>;
    previewImage:ImageModel|null;
    productDetails:WishlistItemProduct;
}