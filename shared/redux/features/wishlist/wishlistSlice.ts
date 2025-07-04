import { WihsilistItem } from "@/models/wishlist.models";

export interface WishlistState{
    wishlistItems: WihsilistItem[];
    totalCount: number;
    // updateRequests:UpdateItemRequest[];
}

// const initialState = {
//     cart: null,
//     totalCartValue:0,
//     updateRequests:[],
// } as WishlistState;