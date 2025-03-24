import { handleError } from "@/lib/functions";
import { AddToCartRequest, Cart, CartItem, DeleteCartItemRequest, UpdateItemRequest } from "@/models/cart.models";
import { ErrorResponse } from "@/models/error.models";
import { ProductAttributes } from "@/models/product.models";
import { 
    useAddItemsToCartMutation, 
    useClearCartMutation, 
    useDeleteItemsFromCartMutation, 
    useUpdateCartItemsMutation 
} from "@/shared/redux/features/cart/cartApiSlice";
import { 
    mutateItemAttributes,
    mutateUpdateRequests,
    setCart, 
    userCartItemProductAttributesSelector, 
    userCartItemSelector, 
    userCartSelector, 
    userUpdateRequestsSelector 
} from "@/shared/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

export function useMutateUserCart(){
    const t = useTranslations("CART");
    const dispatch = useAppDispatch();


    const [addItemsToCart, { isLoading:addItemsToCartLoading }] = useAddItemsToCartMutation();
    const [deleteItemsFromCart, { isLoading:deleteItemsFromCartLoading }] = useDeleteItemsFromCartMutation();
    const [updateItems, { isLoading:updateItemsLoading }] = useUpdateCartItemsMutation();
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

    const handleUpdateItems = (updateQuantityRequests:UpdateItemRequest[]) =>{
        updateItems(updateQuantityRequests)
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
    const productItemsAttributes:Record<number,ProductAttributes>| undefined= useAppSelector(userCartItemProductAttributesSelector);
    const updateRequests:UpdateItemRequest[]= useAppSelector(userUpdateRequestsSelector);

    const mutationLoading = addItemsToCartLoading || deleteItemsFromCartLoading || updateItemsLoading || clearCartLoading;

    const onSetQuantity= (cartItemId:number,itemQuantity:number)=>{
        dispatch(mutateUpdateRequests({cartItemId,itemQuantity}));
    }

    const onChangeItemAttribute= (cartItemId:number,itemQuantity:number,attributes:string)=>{
        dispatch(mutateItemAttributes({cartItemId,itemQuantity,attributes}));
    }

    const onAddQuantity = (cartItemId:number)=>{
        // const newQuantity = quantity +1;
        // const newTotalLinePrice = newQuantity * price
    }

    return {
        cart,
        cartItems,
        productItemsAttributes,
        updateRequests,
        mutationLoading,
        handleAddItemsToCartRequest,
        handleDeleteItemsFromCart,
        handleUpdateItems,
        handleClearCart,
        onSetQuantity,
        onChangeItemAttribute
    }
}