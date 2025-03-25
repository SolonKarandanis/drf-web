'use client';

import { useTranslations } from "next-intl";
import EmptyCart from "./empty-cart";
import { useGetUserCart } from "./hooks/useGetUserCart";
import { useMutateUserCart } from "./hooks/useMutateUserCart";
import CartItems from "./cart-items";
import CartItemsLoading from "./cart-items-loading";

const CartItemsSection = () => {
    const t = useTranslations("CART");
    const {
        cartItems,
        productItemsAttributes,
        isLoading,
    }=useGetUserCart();

    const {
        onSetQuantity
    } = useMutateUserCart();

    return (
        <div className="col-span-12 xxl:col-span-9">
            {isLoading &&(
                <CartItemsLoading iterate={5} />
            )}
            {!isLoading && (!cartItems || cartItems.length ==0) && (
                <EmptyCart />         
            )}
            {!isLoading && cartItems && cartItems.length>0 &&(
                <div className="box" id="cart-container-delete">
                    <div className="box-header">
                        <div className="box-title">
                            {t("PAGE.cart-items")}
                        </div>
                    </div>
                    <div className="box-body">
                        <div className="table-responsive">
                            <table className="table min-w-full table-bordered whitespace-nowrap">
                                <thead>
                                    <tr>
                                        <th scope="row" className="text-start">
                                            {t("LABELS.product-name")}
                                        </th>
                                        <th scope="row" className="text-start">
                                            {t("LABELS.price")}
                                        </th>
                                        <th scope="row" className="text-start">
                                            {t("LABELS.quantity")}
                                        </th>
                                        <th scope="row" className="text-start">
                                            {t("LABELS.total")}
                                        </th>
                                        <th scope="row" className="text-start">
                                            {t("LABELS.action")}
                                        </th>
                                    </tr>
                                </thead>
                                <CartItems 
                                    cartItems={cartItems}
                                    productItemsAttributes={productItemsAttributes}
                                    onSetQuantity={onSetQuantity}/>
                            
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartItemsSection