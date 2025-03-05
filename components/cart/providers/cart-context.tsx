import { Cart, CartItem, UpdateItemRequest } from "@/models/cart.models";
import { ProductAttributes } from "@/models/product.models";
import { createContext, ReactNode, useContext,useMemo, useState } from "react";
import { useAppSelector } from "@/shared/redux/hooks";
import { userCartItemProductAttributesSelector, userCartItemSelector, userCartSelector } from "@/shared/redux/features/cart/cartSlice";

type ContextState={
    updateRequests :UpdateItemRequest[];
    totalCartValue: number;
    cartItems: CartItem[];
    productItemsAttributes: Record<number, ProductAttributes>;
}



type ContextApi ={
    handleSetQuantity:(cartItemId:number,itemQuantity:number)=>void,
    handleChangeItemAttribute:(cartItemId:number,itemQuantity:number,attributes:string)=>void,
}

const CartDataContext = createContext<ContextState>({} as ContextState);
const CartApiContext = createContext<ContextApi>({} as ContextApi);


interface Props {
    children: ReactNode;
}


const CartProvider: React.FC<Props> = ({
    children,
}) => {
    const cart:Cart | null= useAppSelector(userCartSelector);
    const cartItems:CartItem[]| undefined= useAppSelector(userCartItemSelector);
    const productItemsAttributes:Record<number,ProductAttributes>| undefined= useAppSelector(userCartItemProductAttributesSelector);

    const initialValue: ContextState={
        updateRequests:[],
        totalCartValue: cart ? cart.totalPrice: 0,
        cartItems: cartItems ? cartItems : [],
        productItemsAttributes:productItemsAttributes
    };
    const [state, setState] = useState<ContextState>(initialValue);

    const api = useMemo(()=>{
        const handleSetQuantity= (cartItemId:number,itemQuantity:number) =>{
            const existingRequest = state.updateRequests.find(req=>req.cartItemId===cartItemId);
            const existingItem = state.cartItems.find(item=>item.id===cartItemId);
            if(existingRequest){
                existingRequest.quantity =itemQuantity
            }
            else{
                const update:UpdateItemRequest={
                    cartItemId:cartItemId,
                    productId: findProductId(cartItemId),
                    quantity:itemQuantity
                }
                setState((state)=> ({
                    ...state,updateRequests:[...state.updateRequests,update ]
                }));
            }
            if(existingItem){
                const newTotalLinePrice = itemQuantity * existingItem.unitPrice;
                existingItem.totalPrice = newTotalLinePrice;

                const newTotalCartPrice =  state.cartItems
                    .map(item=>item.totalPrice)
                    .reduce((sum,price)=>sum + price,0);
                setState((state)=> ({
                    ...state,totalCartValue:newTotalCartPrice
                }));
            }
            
        }

        const handleChangeItemAttribute= (cartItemId:number,itemQuantity:number,attributes:string)=>{
            const existingRequest = state.updateRequests.find(req=>req.cartItemId===cartItemId);
            if(existingRequest){
                existingRequest.attributes =attributes
            }
            else{
                
                const update:UpdateItemRequest={
                    cartItemId:cartItemId,
                    productId: findProductId(cartItemId),
                    quantity:itemQuantity,
                    attributes:attributes
                }
                setState((state)=> ({
                    ...state,updateRequests:[...state.updateRequests,update ]
                }));
            }
        }

        const findProductId = (cartItemId:number):number =>{
            const cartItem =state.cartItems.find(item=>item.id===cartItemId)!;
            return cartItem.productId;
        }

        return {
            handleSetQuantity,
            handleChangeItemAttribute
        }
    },[state]);

    


    return (
      <CartApiContext.Provider value={api}>
        <CartDataContext.Provider value={state}>
            {children}
        </CartDataContext.Provider>
      </CartApiContext.Provider>
    );
};

const useCartData =()=>{
    const context = useContext(CartDataContext)
	if (context === undefined) {
		throw new Error('useCartData must be used within a CartProvider')
	}
	return context
}

const useCartApi =()=>{
    const context = useContext(CartApiContext)
	if (context === undefined) {
		throw new Error('useCartApi must be used within a CartProvider')
	}
	return context
}

export { CartProvider,useCartData,useCartApi }