import { Cart, CartItem } from "@/models/cart.models";
import { ProductAttributes } from "@/models/product.models";
import { useLazyGetUserCartQuery } from "@/shared/redux/features/cart/cartApiSlice";
import { resetCart, setCart, userCartItemProductAttributesSelector, userCartItemSelector, userCartSelector } from "@/shared/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { useEffect } from "react";

export function useGetUserCart(){
    const [getcart,{isError,isLoading,data}] = useLazyGetUserCartQuery();
    const dispatch = useAppDispatch();

    useEffect(()=>{
        getcart()
            .unwrap()
            .then((cart)=>{
                dispatch(setCart(cart));
            })
            .catch((error)=>{
                dispatch(resetCart());
            });
    },[]);

    const cart:Cart | null= useAppSelector(userCartSelector);
    const cartItems:CartItem[]| undefined= useAppSelector(userCartItemSelector);
    const cartItemAttributes:Record<number,ProductAttributes>| undefined= useAppSelector(userCartItemProductAttributesSelector);

    return {
        cart,
        cartItems,
        cartItemAttributes,
        isError,
        isLoading
    }
}