"use client"

import Link from 'next/link'
import React from 'react'

const ButtonGroup = () => {
  return (
    <div className="grid gap-2">
        <Link href="/components/pages/ecommerce/cart/" 
            className="ti-btn bg-primary !font-medium text-black">
            Add To Cart
        </Link>
        <Link href="/components/pages/ecommerce/checkout/" 
            className="ti-btn bg-success !font-medium text-white">
            Buy Now
        </Link>
        <Link href="/components/pages/ecommerce/wishlist/" 
            className="ti-btn bg-light !font-medium">
            Add To Wishlist
        </Link>
    </div>
  )
}

export default ButtonGroup