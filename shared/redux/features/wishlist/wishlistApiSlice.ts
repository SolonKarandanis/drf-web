import { AddToWishlistRequest, DeleteWishlistItemRequest } from "@/models/wishlist.models";
import { ApiControllers } from "../../api/ApiControllers";
import { apiSlice } from "../../apiSlice";
import { WishlistSearchRequest, WishlistSearchResponse } from "@/models/search.models";

const wishlistApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getUserWishlistItems: builder.query<WishlistSearchResponse,string>({
            query:(query)=>{
                const url = query? `${ApiControllers.WISHLIST}?q=${query}`: `${ApiControllers.WISHLIST}`
                return {
                    url
                }
            },
        }),
        searchItems: builder.mutation<WishlistSearchResponse,WishlistSearchRequest>({
            query: ( searchRequest:WishlistSearchRequest)=>{
                return {
                    url: `${ApiControllers.WISHLIST}/search/`,
                    method: 'POST',
                    body: searchRequest ,
                }
            }
        }),
        addToWishlist:builder.mutation<WishlistSearchResponse,AddToWishlistRequest[]>({
            query: ( request:AddToWishlistRequest[])=>{
                return {
                    url: `${ApiControllers.WISHLIST}/items/`,
                    method: 'POST',
                    body: request ,
                }
            }
        }),
        deleteWishlistItems:builder.mutation<WishlistSearchResponse,DeleteWishlistItemRequest[]>({
            query: ( request:DeleteWishlistItemRequest[])=>{
                return {
                    url: `${ApiControllers.WISHLIST}/items/delete/`,
                    method: 'DELETE',
                    body: request ,
                }
            }
        }),
    }),
     // @ts-ignore
	overrideExisting: module.hot?.status() === "apply",
});

export const {
    useLazyGetUserWishlistItemsQuery,
    useSearchItemsMutation,
    useAddToWishlistMutation,
    useDeleteWishlistItemsMutation,
} = wishlistApiSlice;