import { AddToCartRequest, Cart } from "@/models/cart.models";
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
    }),
     // @ts-ignore
	overrideExisting: module.hot?.status() === "apply",
});

export const {
    useLazyGetUserCartQuery,
    useAddItemsToCartMutation,
} = cartsApiSlice;