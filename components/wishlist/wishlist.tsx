"use client";

import Link from "next/link";
import { useState } from "react";
import WishlistHeader from "./wishlist-header";


const Wishlist = () => {
    const [allData, setAllData] = useState(Itemsdata1);
    
    return (
        <>
            <div className="grid grid-cols-12 gap-x-6">
                <WishlistHeader />
                {allData.map((idx) =>(
                    <div className="col-span-12 xxl:col-span-3 xl:col-span-6 lg:col-span-6 md:col-span-6 sm:col-span-12" key={Math.random()}>
                        <div className="box product-card">
                            <div className="box-body">
                                <Link href="#!" className="product-image">
                                    <img src={idx.preview} className="mb-3 rounded-sm card-img" alt="..." />
                                </Link>
                                <div className="product-icons">
                                    <Link aria-label="anchor"  href="#!" className="wishlist btn-delete"><i className="ri-close-line"></i></Link>
                                </div>
                                <p className="flex items-center justify-between mb-0 font-semibold product-name">{idx.title}<span className="text-xs ltr:float-right rtl:float-left text-warning">4.2<i className="align-middle ri-star-s-fill ms-1"></i></span></p>
                                <p className="product-description text-[.6875rem] text-[#8c9097] dark:text-white/50 mb-2">{idx.description}</p>
                                <p className="mb-1 font-semibold text-[1rem] flex items-center justify-between"><span>{idx.oldpr}<span className="text-[#8c9097] dark:text-white/50 line-through ms-1 opacity-[0.6] inline-block">{idx.newpr}</span></span><span className="badge bg-secondary/10 text-secondary ltr:float-right rtl:float-left !text-[.625rem]">{idx.percentage}</span></p>
                                <p className="text-[.6875rem] text-success font-semibold mb-0 flex items-center">
                                    <i className="ti ti-discount-2 text-[1rem] me-1"></i>Offer Price {idx.offerprice}
                                </p>
                            </div>
                            <div className="text-center box-footer ">
                                <Link href="/components/pages/ecommerce/cart/" className="ti-btn ti-btn-primary m-1 !font-medium" ><i className="inline-block align-middle ri-shopping-cart-2-line me-1 "></i>Move To Cart</Link>
                                <Link href="/components/pages/ecommerce/product-details/" className="ti-btn ti-btn-success m-1 !font-medium"><i className="inline-block align-middle ri-eye-line me-1 "></i>View Product</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <nav aria-label="Page navigation" className="">
                <ul className="ti-pagination flex ltr:float-right rtl:float-left mb-4 rounded-sm text-[1rem]">
                    <li className="page-item disabled">
                        <Link className="page-link !py-[0.375rem] !px-[0.75rem]" href="#!">
                            Previous
                        </Link>
                    </li>
                    <li className="page-item"><Link className="page-link !py-[0.375rem] !px-[0.75rem]" href="#!">1</Link></li>
                    <li className="page-item "><Link className="page-link !py-[0.375rem] !px-[0.75rem]" href="#!">2</Link></li>
                    <li className="page-item "><Link className="page-link !py-[0.375rem] !px-[0.75rem]" href="#!">3</Link></li>
                    <li className="page-item">
                        <Link className="page-link !text-primary !py-[0.375rem] !px-[0.75rem]" href="#!">
                            next
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Wishlist


const Itemsdata1= [
   {
     id: '1',
     percentage:"72% off",
     preview: "../../../../assets/images/ecommerce/png/1.png",
     title: 'Dapzem & Co',
    description:'Branded hoodie ethnic style',
     oldpr: '$229',
     newpr: '$1,799',
     offerprice:'$229',
     data:"In Offer",
     quantity:1,
     images: [
        { 'img': "../../../../assets/images/ecommerce/png/1.png" },
        { 'img': "../../../../assets/images/ecommerce/png/1.png" },
        { 'img': "../../../../assets/images/ecommerce/png/1.png" }],
  },
  {
     id: '2',
     percentage:"75% off",
     preview: "../../../../assets/images/ecommerce/png/2.png",
     title: 'Denim Winjo',
     description:'Vintage pure leather Jacket',
     oldpr: '$599',
     newpr: '$2,499',
     offerprice:'$599',
     quantity:2,
     images: [
        { 'img': "../../../../assets/images/ecommerce/png/2.png" },
        { 'img': "../../../../assets/images/ecommerce/png/2.png" },
        { 'img': "../../../../assets/images/ecommerce/png/2.png" }],
     ribbon: '',
  },
  {
     id: '3',
     percentage:"62% off",
     preview: "../../../../assets/images/ecommerce/png/3.png",
     title: 'Jimmy Lolfiger',
     description:'Unisex jacket for men & women',
     oldpr: '$1,199',
     newpr: '$3,299',
     offerprice:'$1,199',
     quantity:1,
     images: [
        { 'img': "../../../../assets/images/ecommerce/png/3.png" },
        { 'img': "../../../../assets/images/ecommerce/png/3.png"},
        { 'img': "../../../../assets/images/ecommerce/png/3.png" }],
     ribbon: '',
  },
  {
     id: '4',
     percentage:"60% off",
     preview: "../../../../assets/images/ecommerce/png/4.png",
     title: 'Bluberry Co.In',
     description:'Full sleeve white hoodie',
     oldpr: '$349',
     newpr: '$1,299',
     offerprice:'$349',
     quantity:1,
     images: [
        { "img": "../../../../assets/images/ecommerce/png/4.png" },
        { "img": "../../../../assets/images/ecommerce/png/4.png" },
        { "img": "../../../../assets/images/ecommerce/png/4.png" },],
     ribbon: '',
  },
  {
     id: '5',
     percentage:"50% off",
     preview: "../../../../assets/images/ecommerce/png/5.png",
     title: 'Aus Polo Assn',
     description:'Snow jacket with low pockets',
     oldpr: '$1,899',
     newpr: '$3,799',
     offerprice:'$1,899',
     quantity:1,
     images: [
        { 'img': "../../../../assets/images/ecommerce/png/5.png" },
        { 'img': "../../../../assets/images/ecommerce/png/5.png" },
        { 'img': "../../../../assets/images/ecommerce/png/5.png" }],
  },
  {
     id: '6',
     percentage:"38% off",
     preview: "../../../../assets/images/ecommerce/png/6.png",
     title: 'BMW',
     description:'Ethnic wear jackets form BMW',
     oldpr: '$1,499',
     newpr: '$2,499',
     offerprice:'$1,499',
     quantity:1,
     images: [
        { 'img': "../../../../assets/images/ecommerce/png/6.png" },
        { 'img': "../../../../assets/images/ecommerce/png/6.png" },
        { 'img': "../../../../assets/images/ecommerce/png/6.png" }],
  },
  {
     id: '7',
     percentage:"35% off",
     preview: "../../../../assets/images/ecommerce/png/7.png",
     title: 'Denim Corporation',
     description:'Flap pockets denim jackets for men',
     oldpr: '$299',
     newpr: '$399',
     offerprice:'$299',
     quantity:1,
     images: [
        { 'img': "../../../../assets/images/ecommerce/png/7.png" },
        { 'img': "../../../../assets/images/ecommerce/png/7.png" },
        { 'img': "../../../../assets/images/ecommerce/png/7.png" }],
     ribbon: '',
  },
  {
     id: '8',
     percentage:"72% off",
     preview: "../../../../assets/images/ecommerce/png/8.png",
     title: 'Pufa',
     description:'Ergonic designed full sleeve coat',
     oldpr: '$2,399',
     newpr: '$5,699',
     offerprice:'$2,399',
     quantity:1,
     images: [
        { 'img': "../../../../assets/images/ecommerce/png/8.png" },
        { 'img': "../../../../assets/images/ecommerce/png/8.png" },
        { 'img': "../../../../assets/images/ecommerce/png/8.png" }],
     ribbon: '',
  },
  {
     id: '9',
     percentage:"60% off",
     preview: "../../../../assets/images/ecommerce/png/9.png",
     title: 'Louie Phillippe',
     description:'Ergonic green colored full sleeve jacket',
     oldpr: '$1,899',
     newpr: '$3,299',
     offerprice:'$1,899',
     quantity:1,
     images: [
        { 'img': "../../../../assets/images/ecommerce/png/9.png" },
        { 'img': "../../../../assets/images/ecommerce/png/9.png" },
        { 'img': "../../../../assets/images/ecommerce/png/9.png" }],
  },
 
  {
   id: '10',
           percentage:"50% off",

      preview: "../../../../assets/images/ecommerce/png/10.png",
      title: 'Denim Corp',
      description:'beautiful brown colored snow jacket',
      oldpr: '$2,499',
      newpr: '$4,999',
      offerprice:'$499',
      quantity:1,
      images: [
         { 'img': "../../../../assets/images/ecommerce/png/10.png" },
         { 'img': "../../../../assets/images/ecommerce/png/10.png" },
         { 'img': "../../../../assets/images/ecommerce/png/10.png" }],
   },
  
   {
        id: '11',
           percentage:"70% off",

      preview: "../../../../assets/images/ecommerce/png/11.png",
      title: 'Garage & Co',
      description:'Full sleeve sweat shirt',
      oldpr: '$249',
      newpr: '$1,299',
      offerprice:'$249',
      quantity:1,
      images: [
         { 'img': "../../../../assets/images/ecommerce/png/11.png" },
         { 'img': "../../../../assets/images/ecommerce/png/11.png" },
         { 'img': "../../../../assets/images/ecommerce/png/11.png" }],
   },
   {
        id: '12',
           percentage:"32% off",

      preview: "../../../../assets/images/ecommerce/png/12.png",
      title: 'Blueberry & Co',
      description:'Light colored sweater form blueberry',
      oldpr: '$499',
      newpr: '$799',
      offerprice:'$499',
      quantity:1,
      images: [
         { 'img': "../../../../assets/images/ecommerce/png/12.png" },
         { 'img': "../../../../assets/images/ecommerce/png/12.png" },
         { 'img': "../../../../assets/images/ecommerce/png/12.png" }],
   },
 ];