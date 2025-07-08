import { WishlistSearchResponse } from "@/models/search.models";
import { WihsilistItem } from "@/models/wishlist.models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../../store';

export interface WishlistState{
    wishlistItems: WihsilistItem[];
    totalCount: number| null;
    pages:number| null;
    next:number| null;
    previous:number| null;
    // updateRequests:UpdateItemRequest[];
}

const initialState = {
    wishlistItems: [],
    totalCount:null,
    pages:null,
    next:null,
    previous:null
} as WishlistState;


const wishlistSlice = createSlice({
    name: 'wishlist',
	initialState,
    reducers:{
        setWishListItems:(state, action:PayloadAction<WishlistSearchResponse>) =>{
            const payload =action.payload;
            state.wishlistItems = payload.data;
            state.totalCount = payload.count;
            state.pages = payload.pages;
            state.next = payload.next;
            state.previous = payload.previous;
        },
        resetWishListItems:(state)=>{
            state.wishlistItems = [];
            state.totalCount = null;
            state.pages = null;
            state.next = null;
            state.previous = null;
        },
    }
});

export const { 
    setWishListItems,
    resetWishListItems
} = wishlistSlice.actions;

export default wishlistSlice.reducer;

const wishlistItems = (state: RootState) => state.carts;