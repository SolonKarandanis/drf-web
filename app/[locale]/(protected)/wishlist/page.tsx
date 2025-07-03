import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Perimissions } from "@/models/constants";
import PageHeader from "@/shared/layout-components/page-header/PageHeader";
import { hasPermission } from "@/utils/user-utils";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata:Metadata={
    title:"Drf Wishlist Page",
    description:"Drf market place",
    authors:[
      {
        name:"Solon Karandanis",
      }
    ]
};

const WishlistPage = async () =>{
    const session = await getServerSession(authOptions);
    if(session && session.user){
        const {firstName, lastName}= session.user;
        const fullname = `${firstName} ${lastName}`;
        const canSeeWishlist =hasPermission(session.user,Perimissions.VIEW_WISH_LIST_ITEM);
        if(canSeeWishlist){
            return (
                <>
                    <PageHeader 
                        currentpage="Wishlist" 
                        activepage="Wishlist" 
                        mainpage={fullname} />
                    <h1>Wishlist</h1>
                </>
            )
        }

    }
    redirect('/dashboard');
};

export default WishlistPage;