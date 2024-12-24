import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import ImageGallery from "@/components/products/product-details/image-gallery";
import Product from "@/components/products/product-details/product";
import SimilarProducts from "@/components/products/product-details/similar-products";
import PageHeader from "@/shared/layout-components/page-header/PageHeader";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

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
                                        <ImageGallery uuid={uuid} />
                                        <SimilarProducts uuid={uuid} />
                                    </div>
                                </div>
                                <div className="col-span-12 xxl:col-span-9 xl:col-span-12">
                                    <Product  uuid={uuid}/>
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