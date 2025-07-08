import { AddToWishlistRequest, DeleteWishlistItemRequest, WihsilistItem } from "@/models/wishlist.models";
import { ApiControllers } from "../../api/ApiControllers";
import { apiSlice } from "../../apiSlice";

const wishlistApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getUserWishlistItems: builder.query<WihsilistItem[],string>({
            query:(query)=>`${ApiControllers.WISHLIST}?q=${query}`,
        }),
        addToWishlist:builder.mutation<WihsilistItem[],AddToWishlistRequest[]>({
            query: ( request:AddToWishlistRequest[])=>{
                return {
                    url: `${ApiControllers.WISHLIST}/items/`,
                    method: 'POST',
                    body: request ,
                }
            }
        }),
        deleteWishlistItems:builder.mutation<WihsilistItem[],DeleteWishlistItemRequest[]>({
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
    useAddToWishlistMutation,
    useDeleteWishlistItemsMutation,
} = wishlistApiSlice;