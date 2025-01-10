import { Comment } from "./comment.models";
import { ImageModel } from "./image.models";
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
    content?:string;
    fabricDetails?:string;
    careInstructions?:string;
    price:number;
    inventory:number;
    publishedDate:string;
    publishStatus:ProductPublishedStatus;
    availabilityStatus: ProductAvailabilityStatus
}

export interface Products extends BaseProduct{
    id:number;
    salePrice:number;
    averageRating:number;
    previewImage:ImageModel|null;
    uuid:string;
}

export interface BaseProductDetails extends BaseProduct{
    id:number;
    salePrice:number;
    averageRating:number;
    numberOfRatings:number;
    publishStatusLabel:string;
    availabilityStatusLabel:string;
    uuid:string;
}


export interface ProductDetails extends BaseProductDetails{
    owner:UserPublic;
    comments:Comment[];
    brand:Brand;
    categories:Category[];
}

export interface SimilarProduct{
    id:number;
    sku:string;
    title:string;
    price:number;
    salePrice:number;
    rating:number;
    numberOfRatings:number;
    previewImage:ImageModel;
    uuid:string;
}

export interface SimilarProductRequest{
    categoryIds: number[];
    limit:number;
}

export interface Brand{
    id:number;
    name:string;
}

export interface Category{
    id:number;
    name:string;
    slug:string;
}

export interface AttributeOption{
    id:number;
    name:string;
}

export interface CreateProductRequest extends BaseProduct{
    categories:number[];
    brand:number;
    sizes:number[];
    colors:number[];
    gender:number;
}

export interface UpdateProductRequest extends BaseProduct{
}

export interface CreatedProductResponse{
    productId:string;
}

export interface PostProductCommentRequest{
    productId:number;
    comment:string;
}

export interface BaseTotals{
    id:number;
    name:string;
    totalProducts:number;
}

export interface  CategoriesWithTotals extends BaseTotals{

}

export interface  BrandsWithTotals extends BaseTotals{
    
}

export interface  SizesWithTotals extends BaseTotals{
    
}

export interface  DiscountsWithTotals extends BaseTotals{
    
}

export interface ProductAttributesValues{
    id:number;
    productId:number;
    attributeId:number;
    attributeOptionId:number;
}

export interface ProductAttributes{
    colors:ProductAttributesValues[];
    sizes:ProductAttributesValues[];
    genders:ProductAttributesValues[];
}

export interface AllAttributeOptions{
    colors:AttributeOption[];
    sizes:AttributeOption[];
    genders:AttributeOption[];
}