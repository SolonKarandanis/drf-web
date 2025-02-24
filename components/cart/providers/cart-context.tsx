import { UpdateQuantityRequest } from "@/models/cart.models";
import { createContext, ReactNode } from "react";

interface ContextState{
    updateRequests :UpdateQuantityRequest[];
    totalCartValue: number;
}

const initialValue: ContextState={
    updateRequests:[],
    totalCartValue:0
};
const CartContext = createContext(initialValue);


interface Props {
    children: ReactNode;
}


export const CartProvider: React.FC<Props> = ({ children }) => {
    return (
      <CartContext.Provider value={initialValue}>
        {children}
      </CartContext.Provider>
    );
};