import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import PageHeader from "@/shared/layout-components/page-header/PageHeader";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { useTranslations } from "next-intl";
import { FC } from "react";

export const metadata:Metadata={
    title:"Drf Product Page",
    description:"Drf market place",
    authors:[
      {
        name:"Solon Karandanis",
      }
    ]
  }
  
  
  
interface Props{
    params:{
        uuid:string;
    }
}

const ProductDetailsPage:FC<Props>  =  async ({params:{uuid}}) => {
    // const t = useTranslations("PRODUCTS.DETAILS.PAGE");
    const session = await getServerSession(authOptions);
    const loggedInUser= session!.user!;

    return (
        <div>
            <PageHeader 
                currentpage="Product Details" activepage="Products" mainpage={uuid} />
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-12">
                    <div className="box">
                        <div className="box-body">
                            <div className="sm:grid grid-cols-12 xxl:md:!gap-[4rem]">
                                <div className="col-span-12 xxl:col-span-3 xl:col-span-12">
                                    <div className="sm:grid grid-cols-12 !gap-x-6 md:me-[1rem] ">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailsPage