import PageHeader from '@/shared/layout-components/page-header/PageHeader';
import { Metadata } from 'next';
import {FC,lazy, Suspense } from 'react'
import RecentActivity from '@/components/users/user-details/recent-activity';
import PreviousOrders from '@/components/users/user-details/previous-orders';
import UserDetails from '@/components/users/user-details/user-details';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

const Account = lazy(() => import("@/components/users/user-details/account"));
const RecentInvoices = lazy(() => import("@/components/users/user-details/recent-invoices"));
const Billing = lazy(() => import("@/components/users/user-details/billing"));


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
        uuid:string;
    }
}

const UserDetailsPage:FC<Props> = async ({params:{uuid}}) => {
  const session = await getServerSession(authOptions);
  const loggedInUser= session!.user!;
  
  return (
    <>
      <PageHeader 
        currentpage="Profile" activepage="Users" mainpage={uuid} />
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 xxl:col-span-4 xl:col-span-12">
            <div className="overflow-hidden box">
              <UserDetails uuid={uuid} />
            </div>
          </div>
          <div className="col-span-12 xxl:col-span-8 xl:col-span-12">
            <div className="grid grid-cols-12 gap-x-6">
              <Suspense fallback={<>LOADING</>}>
                <Account uuid={uuid}/>
                <RecentInvoices />
                <RecentActivity />
                {/* <PreviousOrders /> */}
                <Billing />
              </Suspense>
            </div>
          </div>
        </div>
    </>
  )
}

export default UserDetailsPage

// export const revalidate = 120

// export async function generateStaticParams(){
//     //fetch all userIds
//     const userIds =[1,2]
//     return userIds.map((userId)=> ({userId}));
// }