import { CartItem, UpdateItemRequest } from "@/models/cart.models";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { useGetUserCart } from "../hooks/useGetUserCart";

type ContextState={
    updateRequests :UpdateItemRequest[];
    totalCartValue: number;
    cartItems: CartItem[];
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


const CartProvider: React.FC<Props> = ({ children }) => {
    const {
        cart,
        cartItems
    } = useGetUserCart();
    const initialValue: ContextState={
        updateRequests:[],
        totalCartValue: cart ? cart.totalPrice: 0,
        cartItems: cartItems ? cartItems : [],
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
                setState(({totalCartValue,updateRequests, cartItems})=> ({
                    totalCartValue,cartItems,updateRequests:[...updateRequests,update ]
                }));
            }
            if(existingItem){
                const newTotalLinePrice = itemQuantity * existingItem.unitPrice;
                existingItem.totalPrice = newTotalLinePrice;

                const newTotalCartPrice =  state.cartItems
                    .map(item=>item.totalPrice)
                    .reduce((sum,price)=>sum + price,0);
                setState(({totalCartValue,updateRequests, cartItems})=> ({
                    totalCartValue:newTotalCartPrice,cartItems,updateRequests
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
                setState(({totalCartValue,updateRequests, cartItems})=> ({
                    totalCartValue,cartItems,updateRequests:[...updateRequests,update ]
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