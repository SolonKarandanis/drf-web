import PageHeader from '@/shared/layout-components/page-header/PageHeader';
import { Metadata } from 'next';
import {FC} from 'react'
import RecentActivity from '@/components/users/user-details/recent-activity';
import PreviousOrders from '@/components/users/user-details/previous-orders';
import UserDetails from '@/components/users/user-details/user-details';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import Account from '@/components/users/user-details/account';
import { basePath } from '@/next.config';
import { FaPaypal } from "react-icons/fa";
import { FaLandmark } from "react-icons/fa";


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
  const path = process.env.NODE_ENV === "production" ? basePath : "";
  
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
              <Account />
            
              
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
              <div className="col-span-12 xl:col-span-12">
                <div className="box">
                  <div className="box-header">
                      <div className="box-title">
                          Billing
                      </div>
                  </div>
                  <div className="box-body !p-0">
                    <div className="max-w-full px-3 lg:w-2/3 lg:flex-none">
                      <div className="flex flex-wrap -mx-3">
                        <div className="w-full max-w-full px-3 mb-4 xl:mb-0 xl:w-1/2 xl:flex-none">
                          <div className="relative flex flex-col min-w-0 break-words bg-transparent border-0 border-transparent border-solid shadow-xl rounded-2xl bg-clip-border" >
                            <div className="relative overflow-hidden rounded-2xl" style={{backgroundImage: `url(${path}/assets/images/curved-images/curved14.jpg)`}}>
                              <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-gray-900 to-slate-800 opacity-80"></span>
                              <div className="relative z-10 flex-auto p-4">
                                <i className="p-2 text-white fas fa-wifi"></i>
                                <h5 className="pb-2 mt-6 mb-12 text-white">4562&nbsp;&nbsp;&nbsp;1122&nbsp;&nbsp;&nbsp;4594&nbsp;&nbsp;&nbsp;7852</h5>
                                <div className="flex">
                                  <div className="flex">
                                    <div className="mr-6">
                                      <p className="mb-0 text-sm leading-normal text-white opacity-80">Card Holder</p>
                                      <h6 className="mb-0 text-white">Jack Peterson</h6>
                                    </div>
                                    <div>
                                      <p className="mb-0 text-sm leading-normal text-white opacity-80">Expires</p>
                                      <h6 className="mb-0 text-white">11/22</h6>
                                    </div>
                                  </div>
                                  <div className="flex items-end justify-end w-1/5 ml-auto">
                                    <img className="w-3/5 mt-2"  src={`${path}/assets/images/logos/mastercard.png`} alt="logo" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-full max-w-full px-3 xl:w-1/2 xl:flex-none">
                          <div className="flex flex-wrap -mx-3">
                            <div className="w-full max-w-full px-3 md:w-1/2 md:flex-none">
                              <div className="relative flex flex-col min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
                                <div className="p-4 mx-6 mb-0 text-center bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                                  <div className="w-16 h-16 text-center bg-center icon bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl rounded-xl">
                                    {/* <i className="relative text-xl text-white opacity-100 fas fa-landmark top-31/100"></i> */}
                                    <FaLandmark className='relative text-xl text-white opacity-100 fas fa-landmark top-31/100' />
                                  </div>
                                </div>
                                <div className="flex-auto p-4 pt-0 text-center">
                                  <h6 className="mb-0 text-center">Salary</h6>
                                  <span className="text-xs leading-tight">Belong Interactive</span>
                                  <hr className="h-px my-4 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
                                  <h5 className="mb-0">+$2000</h5>
                                </div>
                              </div>
                            </div>
                            <div className="w-full max-w-full px-3 mt-6 md:mt-0 md:w-1/2 md:flex-none">
                              <div className="relative flex flex-col min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
                                <div className="p-4 mx-6 mb-0 text-center bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                                  <div className="w-16 h-16 text-center bg-center icon bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl rounded-xl">
                                    {/* <i className="relative text-xl text-white opacity-100 fab fa-paypal top-31/100"></i> */}
                                    <FaPaypal className='relative text-xl text-white opacity-100 fab fa-paypal top-31/100' />
                                  </div>
                                </div>
                                <div className="flex-auto p-4 pt-0 text-center">
                                  <h6 className="mb-0 text-center">Paypal</h6>
                                  <span className="text-xs leading-tight">Freelance Payment</span>
                                  <hr className="h-px my-4 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
                                  <h5 className="mb-0">$455.00</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>


                      </div>
                    </div>
                  </div>
                </div>
              </div>
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