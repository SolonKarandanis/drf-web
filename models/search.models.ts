import { Product } from "./product.models";
import { UserModel, UserStatus } from "./user.models";

export enum SortDirection {
    ASC = 'ASC',
    DESC = 'DESC',
}
  
export interface Paging {
    page: number;
    limit: number;
    sortField?: string;
    sortOrder?: SortDirection;
}

export interface SearchRequest {
    paging: Paging;
}

export interface UserSearchRequest extends SearchRequest {
    username?: string;
    name?: string;
    email?: string;
    role:number;
    status?:UserStatus;
}

export interface SearchResponse{
    count: number;
    previous: number;
    next: number;
    pages: number;
}

export interface UserSearchResponse extends SearchResponse{
    data: UserModel[];
}

export interface ProductSearchResponse extends SearchResponse{
    data:Product[];
}