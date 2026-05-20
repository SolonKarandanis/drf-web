import { apiSlice } from './apiSlice'
import { ApiControllers } from './apiControllers'
import type {
  AddToCartRequest,
  Cart,
  DeleteCartItemRequest,
  UpdateItemRequest,
} from '#/models/cart.models'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function patchCartCache(dispatch: any, cart: Cart) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch((apiSlice.util as any).updateQueryData('getUserCart', undefined, () => cart))
}

const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserCart: builder.query<Cart, void>({
      query: () => `${ApiControllers.CART}`,
    }),
    addItemsToCart: builder.mutation<Cart, Array<AddToCartRequest>>({
      query: (request) => ({
        url: `${ApiControllers.CART}/items/`,
        method: 'PUT',
        body: request,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          patchCartCache(dispatch, data)
        } catch {}
      },
    }),
    deleteItemsFromCart: builder.mutation<Cart, Array<DeleteCartItemRequest>>({
      query: (request) => ({
        url: `${ApiControllers.CART}/items/delete/`,
        method: 'DELETE',
        body: request,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          patchCartCache(dispatch, data)
        } catch {}
      },
    }),
    updateCartItems: builder.mutation<Cart, Array<UpdateItemRequest>>({
      query: (request) => ({
        url: `${ApiControllers.CART}/items/update/`,
        method: 'PUT',
        body: request,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          patchCartCache(dispatch, data)
        } catch {}
      },
    }),
    clearCart: builder.mutation<Cart, void>({
      query: () => ({
        url: `${ApiControllers.CART}/clear/`,
        method: 'PUT',
        body: {},
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          patchCartCache(dispatch, data)
        } catch {}
      },
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetUserCartQuery,
  useAddItemsToCartMutation,
  useDeleteItemsFromCartMutation,
  useUpdateCartItemsMutation,
  useClearCartMutation,
} = cartApiSlice
