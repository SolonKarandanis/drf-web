import { Cart } from "@/models/cart.models";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ProductAttributes } from "@/models/product.models";


export interface CartState{
    cart: Cart | null;
}

const initialState = {
    cart: null,
} as CartState;

const cartSlice = createSlice({
    name: 'carts',
	initialState,
    reducers:{
        setCart:(state, action:PayloadAction<Cart>)=>{
            const payload =action.payload;
            state.cart = payload;
        },
        resetCart:(state)=>{
            state.cart=null;
        },
    }
});


export const { 
    setCart,
    resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;

const carts = (state: RootState) => state.carts;

export const userCartSelector = createSelector([carts],(carts)=>  carts.cart);

export const userCartItemSelector = createSelector([userCartSelector],(cart)=> cart?.cartItems);

export const userCartItemProductAttributesSelector = createSelector([userCartItemSelector],(cartItems)=> {
    const map:Record<number,ProductAttributes>={};
    if(cartItems && cartItems.length >0){
        for(const cartItem of cartItems){
            map[cartItem.id]=cartItem.productAttributes;
        }
    }
    return map;
});