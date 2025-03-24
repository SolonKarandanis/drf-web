import { Cart, CartItem, UpdateItemRequest } from "@/models/cart.models";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ProductAttributes } from "@/models/product.models";


export interface CartState{
    cart: Cart | null;
    totalCartValue: number;
    updateRequests:UpdateItemRequest[];
}

const initialState = {
    cart: null,
    totalCartValue:0,
    updateRequests:[],
} as CartState;

const cartSlice = createSlice({
    name: 'carts',
	initialState,
    reducers:{
        setCart:(state, action:PayloadAction<Cart>)=>{
            const payload =action.payload;
            state.cart = payload;
            state.totalCartValue= payload.totalPrice;
        },
        resetCart:(state)=>{
            state.cart=null;
            state.totalCartValue=0
        },
        mutateUpdateRequests:(state,action:PayloadAction<{cartItemId:number,itemQuantity:number}>)=>{
            const {cartItemId,itemQuantity} =action.payload;
            const existingRequest = state.updateRequests.find(req=>req.cartItemId===cartItemId);
            const cart = state.cart;
            if(cart){
                const cartItems=cart.cartItems;
                const existingItem = cartItems.find(item=>item.id===cartItemId);
                if(existingRequest){
                    existingRequest.quantity =itemQuantity;
                }
                else{
                    const update:UpdateItemRequest={
                        cartItemId:cartItemId,
                        productId: findProductId(cartItems,cartItemId),
                        quantity:itemQuantity
                    }
                    const newRequests =[...state.updateRequests,update]
                    state.updateRequests=newRequests;
                }
                if(existingItem){
                    const newTotalLinePrice = itemQuantity * existingItem.unitPrice;
                    existingItem.totalPrice = newTotalLinePrice;
                    existingItem.quantity=itemQuantity;
    
                    const newTotalCartPrice =  cartItems
                        .map(item=>item.totalPrice)
                        .reduce((sum,price)=>sum + price,0);
                    cart.totalPrice=newTotalCartPrice;
                    state.totalCartValue= newTotalCartPrice;
                }
            }
        },
        mutateItemAttributes:(state,action:PayloadAction<{cartItemId:number,itemQuantity:number,attributes:string}>)=>{
            const {cartItemId,itemQuantity,attributes} =action.payload;
            const existingRequest = state.updateRequests.find(req=>req.cartItemId===cartItemId);
            const cart = state.cart;
            if(cart){
                const cartItems=cart.cartItems;
                if(existingRequest){
                    existingRequest.attributes =attributes;
                }
                else{
                    const update:UpdateItemRequest={
                        cartItemId:cartItemId,
                        productId: findProductId(cartItems,cartItemId),
                        quantity:itemQuantity,
                        attributes:attributes
                    }
                    const newRequests =[...state.updateRequests,update]
                    state.updateRequests=newRequests;
                }
            }
        }
    }
});

const findProductId = (cartItems:CartItem[],cartItemId:number):number =>{
    const cartItem =cartItems.find(item=>item.id===cartItemId)!;
    return cartItem.productId;
}


export const { 
    setCart,
    resetCart,
    mutateUpdateRequests,
    mutateItemAttributes
} = cartSlice.actions;

export default cartSlice.reducer;

const carts = (state: RootState) => state.carts;

export const userCartSelector = createSelector([carts],(carts)=>  carts.cart);

export const userCartTotalValueSelector = createSelector([carts],(carts)=>  carts.totalCartValue);

export const userUpdateRequestsSelector = createSelector([carts],(carts)=>  carts.updateRequests);

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