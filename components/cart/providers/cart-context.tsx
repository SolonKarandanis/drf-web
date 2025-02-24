import { UpdateQuantityRequest } from "@/models/cart.models";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type ContextState={
    updateRequests :UpdateQuantityRequest[];
    totalCartValue: number;
}

const initialValue: ContextState={
    updateRequests:[],
    totalCartValue:0
};

type ContextApi ={
    handleSetQuantity:(cartItemId:number,itemQuantity:number)=>void,
}

const CartDataContext = createContext<ContextState>({} as ContextState);
const CartApiContext = createContext<ContextApi>({} as ContextApi);


interface Props {
    children: ReactNode;
}


const CartProvider: React.FC<Props> = ({ children }) => {
    const [state, setState] = useState<ContextState>(initialValue);

    const api = useMemo(()=>{
        const handleSetQuantity= (cartItemId:number,itemQuantity:number) =>{
            const existingRequest = state.updateRequests.find(req=>req.cartItemId===cartItemId);
            if(existingRequest){
                existingRequest.quantity =itemQuantity
            }
            else{
                const update:UpdateQuantityRequest={
                    cartItemId:cartItemId,
                    quantity:itemQuantity
                }
                setState(({totalCartValue,updateRequests})=> ({totalCartValue,updateRequests:[...updateRequests,update ]}));
            }
        }

        return {
            handleSetQuantity
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