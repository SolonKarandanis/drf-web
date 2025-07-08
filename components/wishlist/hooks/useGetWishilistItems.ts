import { handleError } from "@/lib/functions";
import { ErrorResponse } from "@/models/error.models";
import { WishlistSearchResponse } from "@/models/search.models";
import { useLazyGetUserWishlistItemsQuery } from "@/shared/redux/features/wishlist/wishlistApiSlice";
import { setWishListItems } from "@/shared/redux/features/wishlist/wishlistSlice";
import { useAppDispatch } from "@/shared/redux/hooks";
import { useEffect, useRef } from "react";

export function useGetWishlistItemsSearchResults(){
    const dispatch = useAppDispatch();
    const [getItems] = useLazyGetUserWishlistItemsQuery();
}

export function useGetInitialWishlistItemsSearchResults(){
    const effectRan = useRef(false);
    const dispatch = useAppDispatch();

    const [getItems] = useLazyGetUserWishlistItemsQuery();

    useEffect(()=>{
        if (!effectRan.current){
            getItems('')
            .unwrap()
            .then((response:WishlistSearchResponse) => {
                dispatch(setWishListItems(response));
            })
            .catch((error:ErrorResponse) => {
                handleError(error);
            });
        }
        return () => {
            effectRan.current = true;
        }
    },[]);
}