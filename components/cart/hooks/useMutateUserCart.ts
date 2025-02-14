import { handleError } from "@/lib/functions";
import { AddToCartRequest, Cart, CartItem } from "@/models/cart.models";
import { ErrorResponse } from "@/models/error.models";
import { useAddItemsToCartMutation } from "@/shared/redux/features/cart/cartApiSlice";
import { setCart, userCartItemSelector, userCartSelector } from "@/shared/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useMutateUserCart(){
    const router = useRouter();
    const t = useTranslations("CART");
    const dispatch = useAppDispatch();

    const [addItemsToCart, { isLoading:addItemsToCartLoading }] = useAddItemsToCartMutation();

    const handleAddItemsToCartRequest= (request:AddToCartRequest[]) =>{
        addItemsToCart(request)
            .unwrap()
            .then((response:Cart)=>{
                dispatch(setCart(response));
                toast.success(t("SUCCESS.add-to-cart"));
                // router.push(`/products/${response.productId}`);
            })
            .catch((error:ErrorResponse)=>{
                toast.error(t("ERRORS.add-to-cart"));
                handleError(error);
            })
    }

    const cart:Cart | null= useAppSelector(userCartSelector);
    const cartItems:CartItem[]| undefined= useAppSelector(userCartItemSelector);


    const mutationLoading = addItemsToCartLoading;

    return {
        cart,
        cartItems,
        mutationLoading,
        handleAddItemsToCartRequest,
    }
}