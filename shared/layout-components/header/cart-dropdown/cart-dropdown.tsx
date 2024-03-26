import Link from "next/link"
import Image from "next/image";
import { basePath } from '@/next.config';
import { useState } from "react";


const CartDropdown = () => {
    const data=  <span className="font-[600] py-[0.25rem] px-[0.45rem] rounded-[0.25rem] bg-pink/10 text-pink text-[0.625rem]">Free shipping</span>
    const cartProduct = [
        {
          id: 1,
          src: "/assets/images/ecommerce/jpg/1.jpg",
          name: 'SomeThing Phone',
          price: '$1,299.00',
          color: 'Metallic Blue',
          text: '6gb Ram',
          class: '',
        },
        {
          id: 2,
          src: "/assets/images/ecommerce/jpg/3.jpg",
          name: 'Stop Watch',
          price: '$179.29',
          color: 'Analog',
          text: data,
          class: '',
        },
        {
          id: 3,
          src: "/assets/images/ecommerce/jpg/5.jpg",
          name: 'Photo Frame',
          price: '$29.00',
          color: 'Decorative',
          text: '',
          class: '',
        },
        {
          id: 4,
          src: "/assets/images/ecommerce/jpg/4.jpg",
          name: 'Kikon Camera',
          price: '$4,999.00',
          color: 'Black',
          text: '50MM',
          class: '',
        },
        {
          id: 5,
          src: "/assets/images/ecommerce/jpg/6.jpg",
          name: 'Canvas Shoes',
          price: '$129.00',
          color: 'Gray',
          text: 'Sports',
          class: 'border-b-0',
        },
      ];
    
    const [cartItems, setCartItems] = useState([...cartProduct]);
    const [cartItemCount, setCartItemCount] = useState(cartProduct.length);

    const handleRemove = (itemId:number) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCartItems);
        setCartItemCount(updatedCartItems.length);
      };

    return (
        <div className="header-element cart-dropdown hs-dropdown ti-dropdown md:!block !hidden py-[1rem] md:px-[0.65rem] px-2 
            [--placement:bottom-right]">
            <button id="dropdown-cart" type="button"
                className="hs-dropdown-toggle relative ti-dropdown-toggle !p-0 !border-0 flex-shrink-0  !rounded-full !shadow-none align-middle text-xs">
                <i className="bx bx-cart header-link-icon"></i>
                <span className="flex absolute h-5 w-5 -top-[0.25rem] end-0 -me-[0.6rem]">
                    <span className="relative inline-flex rounded-full h-[14.7px] w-[14px] text-[0.625rem] bg-primary text-white justify-center items-center"
                    id="cart-icon-badge">{cartItemCount}</span>
                </span>
            </button>

            <div className="main-header-dropdown bg-white !-mt-3 !p-0 hs-dropdown-menu ti-dropdown-menu 
                w-[22rem] border-0 border-defaultborder hidden"
                aria-labelledby="dropdown-cart">
                <div className="ti-dropdown-header !bg-transparent flex justify-between items-center !m-0 !p-4">
                    <p className="text-defaulttextcolor  !text-[1.0625rem] dark:text-[#8c9097] dark:text-white/50 font-semibold">Cart Items</p>
                    <Link href="#!"
                    className="font-[600] py-[0.25/2rem] px-[0.45rem] rounded-[0.25rem] bg-success/10 text-success text-[0.75em] "
                    id="cart-data">{cartItemCount} Item{cartItemCount !== 1 ? 's' : ''}</Link>
                </div>
                <div>
                    <hr className="dropdown-divider dark:border-white/10" />
                </div>
                <ul className="list-none mb-0" id="header-cart-items-scroll">
                    {cartItems.map((idx) => (
                        <li className={`ti-dropdown-item border-b dark:border-defaultborder/10 border-defaultborder ${idx.class}`} key={Math.random()}>
                            <div className="flex items-start cart-dropdown-item">
                                <Image
                                    alt="img"
                                    src={`${process.env.NODE_ENV === "production" ? basePath : ""}${idx.src}`}
                                    width={700}
                                    height={475}
                                    sizes="100vw"
                                    className="!h-[1.75rem] !w-[1.75rem] leading-[1.75rem] text-[0.65rem] rounded-[50%] br-5 me-3"
                                />

                                <div className="grow">
                                    <div className="flex items-start justify-between mb-0">
                                        <div className="mb-0 !text-[0.8125rem] text-[#232323] font-semibold dark:text-[#8c9097] dark:text-white/50">
                                            <Link href="#!">{idx.name}</Link>
                                        </div>

                                        <div className="inline-flex">
                                            <span className="text-black mb-1 dark:text-white !font-medium">{idx.price}</span>
                                            <Link aria-label="anchor" href="#!" className="header-cart-remove ltr:float-right rtl:float-left dropdown-item-close" onClick={() => handleRemove(idx.id)}><i
                                            className="ti ti-trash"></i></Link>
                                        </div>
                                    </div>
                                    <div className="min-w-fit flex  items-start justify-between">
                                        <ul className="header-product-item dark:text-white/50 flex">
                                            <li>{idx.color}</li>
                                            <li>{idx.text}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className={`p-3 empty-header-item border-t ${cartItemCount === 0 ? 'hidden' : 'block'}`}>
                    <div className="grid">
                    <Link href="#!" className="w-full ti-btn ti-btn-primary-full p-2">Proceed to checkout</Link>
                    </div>
                </div>
                <div className={`p-[3rem] empty-item ${cartItemCount === 0 ? 'block' : 'hidden'}`}>
                    <div className="text-center">
                        <span className="!w-[4rem] !h-[4rem] !leading-[4rem] rounded-[50%] avatar bg-warning/10 !text-warning">
                            <i className="ri-shopping-cart-2-line text-[2rem]"></i>
                        </span>
                        <h6 className="font-bold mb-1 mt-3 text-[1rem] text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">Your Cart is Empty</h6>
                        <span className="mb-3 !font-normal text-[0.8125rem] block text-defaulttextcolor dark:text-[#8c9097] dark:text-white/50">Add some items to make me happy :)</span>
                        <Link href="#!" className="ti-btn ti-btn-primary btn-wave ti-btn-wave btn-sm m-1 !text-[0.75rem] !py-[0.25rem] !px-[0.5rem]"
                            data-abc="true">continue shopping <i className="bi bi-arrow-right ms-1"></i></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartDropdown