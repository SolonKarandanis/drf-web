export enum SortDirection {
    ASC = 'ASC',
    DESC = 'DESC',
}
  
export interface Paging {
    page: number;
    limit: number;
    sortField?: string;
    sortDirection?: SortDirection;
}

export interface SearchRequest {
    paging: Paging;
}

export interface UserSearchRequest extends SearchRequest {
    username?: string;
    name?: string;
    email?: string;
    isActive?: boolean;
}

interface SearchResponse{
    count: number;
    previous: number;
    next: number;
}

interface UserSearchResponse extends SearchResponse{
    data: User[];
}

interface ProductSearchResponse extends SearchResponse{
    data:Product[];
}