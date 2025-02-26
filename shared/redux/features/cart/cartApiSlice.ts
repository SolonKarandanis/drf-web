import { AddToCartRequest, Cart, DeleteCartItemRequest, UpdateQuantityRequest } from "@/models/cart.models";
import { ApiControllers } from "../../api/ApiControllers";
import { apiSlice } from "../../apiSlice";

const cartsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getUserCart: builder.query<Cart,void>({
            query:()=>`${ApiControllers.CART}`,
        }),
        addItemsToCart:builder.mutation<Cart,AddToCartRequest[]>({
            query: ( request:AddToCartRequest[])=>{
                return {
                    url: `${ApiControllers.CART}/items/`,
                    method: 'PUT',
                    body: request ,
                }
            }
        }),
        deleteItemsFromCart:builder.mutation<Cart,DeleteCartItemRequest[]>({
            query: ( request:DeleteCartItemRequest[])=>{
                return {
                    url: `${ApiControllers.CART}/items/delete/`,
                    method: 'DELETE',
                    body: request ,
                }
            }
        }),
        updateCartItems:builder.mutation<Cart,UpdateQuantityRequest[]>({
            query: ( request:UpdateQuantityRequest[])=>{
                return {
                    url: `${ApiControllers.CART}/items/update/`,
                    method: 'PUT',
                    body: request ,
                }
            }
        }),
        clearCart:builder.mutation<Cart,void>({
            query: ()=>{
                return {
                    url: `${ApiControllers.CART}/clear/`,
                    method: 'PUT',
                    body: {} ,
                }
            }
        }),
    }),
     // @ts-ignore
	overrideExisting: module.hot?.status() === "apply",
});

export const {
    useLazyGetUserCartQuery,
    useAddItemsToCartMutation,
    useDeleteItemsFromCartMutation,
    useUpdateCartItemsMutation,
    useClearCartMutation,
} = cartsApiSlice;