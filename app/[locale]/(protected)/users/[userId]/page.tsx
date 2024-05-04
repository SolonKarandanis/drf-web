import { Metadata } from 'next';
import {FC} from 'react'

export const metadata:Metadata={
  title:"Drf User Profile Page",
  description:"Drf market place",
  authors:[
    {
      name:"Solon Karandanis",
    }
  ]
}

interface Props{
    params:{
        userId:number;
    }
}

const UserDetailsPage:FC<Props> = ({params:{userId}}) => {
  return (
    <div>{userId}</div>
  )
}

export default UserDetailsPage

// export const revalidate = 120

// export async function generateStaticParams(){
//     //fetch all userIds
//     const userIds =[1,2]
//     return userIds.map((userId)=> ({userId}));
// }