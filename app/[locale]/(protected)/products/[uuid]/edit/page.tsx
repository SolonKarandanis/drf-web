import EditProductWrapper from "@/components/products/edit/edit-product-wrapper";
import { Metadata } from "next";
import { FC } from "react";
import EditProductPageHeader from "./page-header";


export const metadata:Metadata={
    title:"Drf Edit Product",
    description:"Drf market place",
    authors:[
      {
        name:"Solon Karandanis",
      }
    ]
}

interface Props{
    params: Promise<{
        uuid:string;
    }>
}

const EditProductPage:FC<Props>  = async ({params}) =>{
    const {uuid} = await params;

    return (
        <>
            <EditProductPageHeader />
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-12">
                    <div className="box">
                        <div className="box-body add-products !p-0">
                            <div className="p-6">
                                <EditProductWrapper  uuid={uuid} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProductPage