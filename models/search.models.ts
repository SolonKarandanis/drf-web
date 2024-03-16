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