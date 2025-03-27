import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import Cart from '@/components/cart/cart'
import { Perimissions } from '@/models/constants'
import PageHeader from '@/shared/layout-components/page-header/PageHeader'
import { hasPermission } from '@/utils/user-utils'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
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
    if(session && session.user){
        const {firstName, lastName}= session.user;
        const fullname = `${firstName} ${lastName}`;
        const canSeeCart =hasPermission(session.user,Perimissions.VIEW_CART);
        if(canSeeCart){
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
        redirect('/dashboard');
    }
   
   
}

export default CartPage