import PageHeader from '@/shared/layout-components/page-header/PageHeader';
import { Metadata } from 'next';
import {FC} from 'react'
import RecentActivity from '@/components/users/user-details/recent-activity';
import PreviousOrders from '@/components/users/user-details/previous-orders';
import UserDetails from '@/components/users/user-details/user-details';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import Link from 'next/link';


export const metadata:Metadata={
  title:"Drf User Profile Page",
  description:"Drf market place",
  authors:[
    {
      name:"Solon Karandanis",
    }
  ]
}

const Personalinfodata = [
  { id: 1, text1: 'Name :', text2: 'Sonya Taylor' },
  { id: 2, text1: 'Email :', text2: 'sonyataylor231@gmail.com' },
  { id: 3, text1: 'Phone :', text2: '+(555) 555-1234' },
  { id: 4, text1: 'Designation :', text2: 'C.E.O' },
  { id: 5, text1: 'Age :', text2: '28' },
  { id: 6, text1: 'Experience :', text2: '10 Years' },
];

interface Props{
    params:{
        userUuid:string;
    }
}

const UserDetailsPage:FC<Props> = async ({params:{userUuid}}) => {
  const session = await getServerSession(authOptions);
  const loggedInUser= session!.user!;
  const access = loggedInUser.access;
  
  return (
    <>
      <PageHeader 
        currentpage="Profile" activepage="Users" mainpage={userUuid} />
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 xxl:col-span-4 xl:col-span-12">
            <div className="overflow-hidden box">
              <UserDetails userUuid={userUuid} />
            </div>
          </div>
          <div className="col-span-12 xxl:col-span-8 xl:col-span-12">
            <div className="grid grid-cols-12 gap-x-6">
              <div className="col-span-12 xl:col-span-12">
                <div className="box">
                  <div className="box-body !p-0">
                    <div className="!p-4 border-b dark:border-defaultborder/10 border-dashed md:flex items-center justify-between">
                      <nav className="-mb-0.5 sm:flex md:space-x-6 rtl:space-x-reverse pb-2">
                          <Link className="flex w-full px-4 py-2 text-sm rounded-md sm:w-auto active hs-tab-active:font-semibold hs-tab-active:text-white hs-tab-active:bg-primary text-primary" href="#!" id="activity-tab" data-hs-tab="#activity-tab-pane" aria-controls="activity-tab-pane">
                              <i className="inline-block align-middle ri-gift-line me-1"></i>Activity
                          </Link>
                          <Link className="flex w-full px-4 py-2 text-sm rounded-md sm:w-auto hs-tab-active:font-semibold hs-tab-active:text-white hs-tab-active:bg-primary text-primary" href="#!" id="posts-tab" data-hs-tab="#posts-tab-pane" aria-controls="posts-tab-pane">
                              <i className="inline-block align-middle ri-bill-line me-1"></i>Posts
                          </Link>
                          <Link className="flex w-full px-4 py-2 text-sm rounded-md sm:w-auto hs-tab-active:font-semibold hs-tab-active:text-white hs-tab-active:bg-primary text-primary" href="#!" id="followers-tab" data-hs-tab="#followers-tab-pane" aria-controls="followers-tab-pane">
                              <i className="inline-block align-middle ri-money-dollar-box-line me-1"></i>Friends
                          </Link>
                          <Link className="flex w-full px-4 py-2 text-sm rounded-md sm:w-auto hs-tab-active:font-semibold hs-tab-active:text-white hs-tab-active:bg-primary text-primary" href="#!" id="gallery-tab" data-hs-tab="#gallery-tab-pane" aria-controls="gallery-tab-pane">
                              <i className="inline-block align-middle ri-exchange-box-line me-1"></i>Gallery
                          </Link>
                      </nav>
                    </div>
                    <div className="!p-4">
                      <div className="tab-content" id="myTabContent">
                        <div className="tab-pane show active fade !p-0 !border-0" id="activity-tab-pane"
                                                role="tabpanel" aria-labelledby="activity-tab" ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 xl:col-span-4">
                <div className="box">
                    <div className="box-header">
                        <div className="box-title">
                            Personal Info
                        </div>
                    </div>
                    <div className="box-body">
                        <ul className="list-group">
                            {Personalinfodata.map((idx)=>(

                            <li className="list-group-item" key={Math.random()}>
                                <div className="flex flex-wrap items-center">
                                    <div className="font-semibold me-2">
                                        {idx.text1}
                                    </div>
                                    <span className="text-[0.75rem] text-[#8c9097] dark:text-white/50">{idx.text2}</span>
                                </div>
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
              </div>
              <RecentActivity />
              <PreviousOrders />
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