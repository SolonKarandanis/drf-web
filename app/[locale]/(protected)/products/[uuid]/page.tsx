import { Metadata } from "next";

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

const ProductDetailsPage = () => {
  return (
    <div>page</div>
  )
}

export default ProductDetailsPage