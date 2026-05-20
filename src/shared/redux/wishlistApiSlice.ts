import { apiSlice } from './apiSlice'
import { ApiControllers } from './apiControllers'
import type {
  AddToWishlistRequest,
  DeleteWishlistItemRequest,
  WishlistItem,
} from '#/models/wishlist.models'

const wishlistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserWishlist: builder.query<Array<WishlistItem>, string | undefined>({
      query: (q) => ({
        url: `${ApiControllers.WISHLIST}/search/`,
        params: q ? { q } : undefined,
      }),
    }),
    addToWishlist: builder.mutation<Array<WishlistItem>, Array<AddToWishlistRequest>>({
      query: (request) => ({
        url: `${ApiControllers.WISHLIST}/items/`,
        method: 'POST',
        body: request,
      }),
    }),
    deleteWishlistItems: builder.mutation<Array<WishlistItem>, Array<DeleteWishlistItemRequest>>({
      query: (request) => ({
        url: `${ApiControllers.WISHLIST}/items/delete/`,
        method: 'DELETE',
        body: request,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetUserWishlistQuery,
  useAddToWishlistMutation,
  useDeleteWishlistItemsMutation,
} = wishlistApiSlice
