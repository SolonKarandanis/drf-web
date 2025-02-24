import { handleError } from "@/lib/functions";
import { AddToCartRequest, Cart, CartItem, DeleteCartItemRequest, UpdateQuantityRequest } from "@/models/cart.models";
import { ErrorResponse } from "@/models/error.models";
import { 
    useAddItemsToCartMutation, 
    useClearCartMutation, 
    useDeleteItemsFromCartMutation, 
    useUpdateCartItemsQuantityMutation 
} from "@/shared/redux/features/cart/cartApiSlice";
import { setCart, userCartItemSelector, userCartSelector } from "@/shared/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

export function useMutateUserCart(){
    const t = useTranslations("CART");
    const dispatch = useAppDispatch();


    const [addItemsToCart, { isLoading:addItemsToCartLoading }] = useAddItemsToCartMutation();
    const [deleteItemsFromCart, { isLoading:deleteItemsFromCartLoading }] = useDeleteItemsFromCartMutation();
    const [updateItemQuantities, { isLoading:updateItemQuantitiesLoading }] = useUpdateCartItemsQuantityMutation();
    const [clearCart, { isLoading:clearCartLoading }] = useClearCartMutation();

    const handleAddItemsToCartRequest= (request:AddToCartRequest[]) =>{
        addItemsToCart(request)
            .unwrap()
            .then((response:Cart)=>{
                dispatch(setCart(response));
                toast.success(t("SUCCESS.add-to-cart"));
            })
            .catch((error:ErrorResponse)=>{
                toast.error(t("ERRORS.add-to-cart"));
                handleError(error);
            })
    }

    const handleDeleteItemsFromCart = (request:DeleteCartItemRequest[]) =>{
        deleteItemsFromCart(request)
            .unwrap()
            .then((response:Cart)=>{
                dispatch(setCart(response));
                toast.success(t("SUCCESS.remove-from-cart"));
            })
            .catch((error:ErrorResponse)=>{
                toast.error(t("ERRORS.remove-from-cart"));
                handleError(error);
            })
    }

    const handleUpdateItemQuantities = (updateQuantityRequests:UpdateQuantityRequest[]) =>{
        updateItemQuantities(updateQuantityRequests)
            .unwrap()
            .then((response:Cart)=>{
                dispatch(setCart(response));
                toast.success(t("SUCCESS.update-cart"));
            })
            .catch((error:ErrorResponse)=>{
                toast.error(t("ERRORS.update-cart"));
                handleError(error);
            })
    }

    const handleClearCart = () =>{
        clearCart()
            .unwrap()
            .then((response:Cart)=>{
                dispatch(setCart(response));
                toast.success(t("SUCCESS.clear-cart"));
            })
            .catch((error:ErrorResponse)=>{
                toast.error(t("ERRORS.clear-cart"));
                handleError(error);
            })
    }



    const cart:Cart | null= useAppSelector(userCartSelector);
    const cartItems:CartItem[]| undefined= useAppSelector(userCartItemSelector);


    const mutationLoading = addItemsToCartLoading || deleteItemsFromCartLoading || updateItemQuantitiesLoading || clearCartLoading;

    return {
        cart,
        cartItems,
        mutationLoading,
        handleAddItemsToCartRequest,
        handleDeleteItemsFromCart,
        handleUpdateItemQuantities,
        handleClearCart
    }
}