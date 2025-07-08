import { WihsilistItem } from "@/models/wishlist.models";

export interface WishlistState{
    wishlistItems: WihsilistItem[];
    totalCount: number| null;
    pages:number| null;
    next:number| null;
    previous:number| null;
    // updateRequests:UpdateItemRequest[];
}

// const initialState = {
//     cart: null,
//     totalCartValue:0,
//     updateRequests:[],
// } as WishlistState;