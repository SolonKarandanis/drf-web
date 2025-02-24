import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import Cart from '@/components/cart/cart'
import PageHeader from '@/shared/layout-components/page-header/PageHeader'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import React from 'react'


export const metadata:Metadata={
    title:"Drf Cart Page",
    description:"Drf market place",
    authors:[
      {
        name:"Solon Karandanis",
      }
    ]
}

const CartPage = async () => {
     

    const session = await getServerSession(authOptions);
    const {firstName, lastName}= session!.user!;
    const fullname = `${firstName} ${lastName}`;
    return (
        <>
            <PageHeader 
                currentpage="Cart" 
                activepage="Cart" 
                mainpage={fullname} />
            <Cart />
        </>
    )
}

export default CartPage