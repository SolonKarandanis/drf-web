'use client';

import { CartItem } from "@/models/cart.models";
import Link from "next/link";
import { useGetUserCart } from "./hooks/useGetUserCart";

const CartItemsSection = () => {
    const {
        cartItems,
        isError,
        isLoading,
    } = useGetUserCart();
    const cartProducts:CartItem[] = [
        {
            id: 1,
            previewImage:null,
            name: 'SomeThing Phone',
            unitPrice: 1.299,
            text: '6gb Ram',
            modificationAlert:false,
            productId:1,
            quantity:4,
            totalPrice:4,
            uuid:'sss'
        },
        {
            id: 2,
            previewImage:null,
            name: 'Stop Watch',
            unitPrice: 179.29,
            text: '',
            modificationAlert:false,
            productId:1,
            quantity:4,
            totalPrice:4,
            uuid:'sss'
        },
        {
            id: 3,
            previewImage:null,
            name: 'Photo Frame',
            unitPrice: 29.00,
            text: '',
            modificationAlert:false,
            productId:1,
            quantity:4,
            totalPrice:4,
            uuid:'sss'
        },
        {
            id: 4,
            previewImage:null,
            name: 'Kikon Camera',
            unitPrice: 4.999,
            text: '50MM',
            modificationAlert:false,
            productId:1,
            quantity:4,
            totalPrice:4,
            uuid:'sss'
        },
        {
            id: 5,
            previewImage:null,
            name: 'Canvas Shoes',
            unitPrice: 129.00,
            text: 'Sports',
            modificationAlert:false,
            productId:1,
            quantity:4,
            totalPrice:4,
            uuid:'sss'
        },
        {
            id: 6,
            previewImage:null,
            name: 'Canvas Shoes',
            unitPrice: 129.00,
            text: 'Sports',
            modificationAlert:false,
            productId:1,
            quantity:4,
            totalPrice:4,
            uuid:'sss'
        },
        {
            id: 7,
            previewImage:null,
            name: 'Canvas Shoes',
            unitPrice: 129.00,
            text: 'Sports',
            modificationAlert:false,
            productId:1,
            quantity:4,
            totalPrice:4,
            uuid:'sss'
        },
        {
            id: 8,
            previewImage:null,
            name: 'Canvas Shoes',
            unitPrice: 129.00,
            text: 'Sports',
            modificationAlert:false,
            productId:1,
            quantity:4,
            totalPrice:4,
            uuid:'sss'
        },
        {
            id: 9,
            previewImage:null,
            name: 'Canvas Shoes',
            unitPrice: 129.00,
            text: 'Sports',
            modificationAlert:false,
            productId:1,
            quantity:4,
            totalPrice:4,
            uuid:'sss'
        },
    ];
    return (
        <div className="col-span-12 xxl:col-span-9">
            {!cartProducts || cartProducts.length ==0 && (
                <div className="box !hidden" id="cart-empty-cart">
                    <div className="box-header">
                        <div className="box-title">
                            Empty Cart
                        </div>
                    </div>
                    <div className="flex items-center justify-center box-body">
                        <div className="text-center cart-empty">
                            <svg xmlns="http://www.w3.org/2000/svg" className="svg-muted" width="24" height="24" viewBox="0 0 24 24"><path d="M18.6 16.5H8.9c-.9 0-1.6-.6-1.9-1.4L4.8 6.7c0-.1 0-.3.1-.4.1-.1.2-.1.4-.1h17.1c.1 0 .3.1.4.2.1.1.1.3.1.4L20.5 15c-.2.8-1 1.5-1.9 1.5zM5.9 7.1 8 14.8c.1.4.5.8 1 .8h9.7c.5 0 .9-.3 1-.8l2.1-7.7H5.9z" /><path d="M6 10.9 3.7 2.5H1.3v-.9H4c.2 0 .4.1.4.3l2.4 8.7-.8.3zM8.1 18.8 6 11l.9-.3L9 18.5z" /><path d="M20.8 20.4h-.9V20c0-.7-.6-1.3-1.3-1.3H8.9c-.7 0-1.3.6-1.3 1.3v.5h-.9V20c0-1.2 1-2.2 2.2-2.2h9.7c1.2 0 2.2 1 2.2 2.2v.4z" /><path d="M8.9 22.2c-1.2 0-2.2-1-2.2-2.2s1-2.2 2.2-2.2c1.2 0 2.2 1 2.2 2.2s-1 2.2-2.2 2.2zm0-3.5c-.7 0-1.3.6-1.3 1.3 0 .7.6 1.3 1.3 1.3.8 0 1.3-.6 1.3-1.3 0-.7-.5-1.3-1.3-1.3zM18.6 22.2c-1.2 0-2.2-1-2.2-2.2s1-2.2 2.2-2.2c1.2 0 2.2 1 2.2 2.2s-.9 2.2-2.2 2.2zm0-3.5c-.8 0-1.3.6-1.3 1.3 0 .7.6 1.3 1.3 1.3.7 0 1.3-.6 1.3-1.3 0-.7-.5-1.3-1.3-1.3z" /></svg>
                            <h3 className="font-bold mb-1 text-[1.75rem]">Your Cart is Empty</h3>
                            <h5 className="mb-4 text-[1.25rem]">Add some items to make me happy :)</h5>
                            <Link href="#!" className="ti-btn bg-primary text-white !font-medium m-4" data-abc="true">continue shopping <i className="bi bi-arrow-right ms-1"></i></Link>
                        </div>
                    </div>
                </div>                      
            )}
            {cartProducts && cartProducts.length>0 && (
                <div className="box" id="cart-container-delete">
                    <div className="box-header">
                        <div className="box-title">
                            Cart Items
                        </div>
                    </div>
                    <div className="box-body">
                        <div className="table-responsive">
                            <table className="table min-w-full table-bordered whitespace-nowrap">
                                <thead>
                                    <tr>
                                        <th scope="row" className="text-start">
                                            Product Name
                                        </th>
                                        <th scope="row" className="text-start">
                                            Price
                                        </th>
                                        <th scope="row" className="text-start">
                                            Quantity
                                        </th>
                                        <th scope="row" className="text-start">
                                            Total
                                        </th>
                                        <th scope="row" className="text-start">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartProducts.map((item) =>(
                                        <tr className="border border-solid border-inherit dark:border-defaultborder/10" key={item.id}>
                                            <td>
                                                <div className="flex items-center">
                                                    <div className="me-4">
                                                        <span className="avatar avatar-xxl bg-light">
                                                            {/* <img src={item.imageSrc} alt="" /> */}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div className="mb-1 text-[0.875rem] font-semibold">
                                                            <Link href="#!">{item.name}</Link>
                                                        </div>
                                                        <div className="flex items-center mb-1 align-middle">
                                                            <span className="me-1">Size:</span><span className="font-semibold text-[#8c9097] dark:text-white/50">Large</span>
                                                        </div>
                                                        <div className="flex items-center mb-1 align-middle">
                                                            <span className="me-1">Color:</span><span className="font-semibold text-[#8c9097] dark:text-white/50">Grey<span className="badge bg-success/10 text-success ms-4">In Offer</span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="font-semibold text-[0.875rem]">
                                                    {item.unitPrice}
                                                </div>
                                            </td>
                                            <td className="product-quantity-container">
                                                <div className="input-group dark:border-defaultborder/10 rounded-md !flex-nowrap">
                                                    <button 
                                                        aria-label="button" 
                                                        type="button"
                                                            className="!border-0 ti-btn ti-btn-icon ti-btn-light  input-group-text flex-grow 
                                                            product-quantity-minus !mb-0" >
                                                            <i className="ri-subtract-line"></i>
                                                    </button>
                                                    <input 
                                                        type="text" 
                                                        className="form-control form-control-sm text-center !w-[50px] !px-0" 
                                                        aria-label="quantity" 
                                                        id="product-quantity" 
                                                        defaultValue={item.quantity} />
                                                    <button 
                                                        aria-label="button" 
                                                        type="button" 
                                                        className="!border-0 ti-btn ti-btn-icon ti-btn-light input-group-text flex-grow 
                                                            product-quantity-plus !mb-0" >
                                                            <i className="ri-add-line"></i>
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="text-[0.875rem] font-semibold">
                                                    {item.totalPrice}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex items-center">
                                                    <div className="hs-tooltip ti-main-tooltip">
                                                        <button type="button" className="hs-tooltip-toggle ti-btn ti-btn-icon bg-success text-white !font-medium me-1">
                                                            <i className="ri-heart-line"></i>
                                                            <span
                                                                className="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm "
                                                                role="tooltip">
                                                                Add To Wishlist
                                                            </span>
                                                        </button>
                                                    </div>
                                                    <div className="hs-tooltip ti-main-tooltip ltr:[--placement:left] rtl:[--placement:right]">
                                                        <button type="button"
                                                            className="hs-tooltip-toggle ti-btn ti-btn-icon bg-danger text-white !font-medium btn-delete">
                                                            <i className="ri-delete-bin-line"></i>
                                                            <span
                                                                className="hs-tooltip-content  ti-main-tooltip-content py-1 px-2 !bg-black !text-xs !font-medium !text-white shadow-sm "
                                                                role="tooltip">
                                                                Remove From cart
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartItemsSection