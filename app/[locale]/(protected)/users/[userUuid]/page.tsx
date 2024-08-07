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
import { FaPaypal,FaLandmark, FaPlus,FaPencilAlt } from "react-icons/fa";


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
                  <div className="w-full max-w-full ">
                    <div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
                      <div className="p-4 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                        <div className="flex flex-wrap -mx-3">
                          <div className="flex items-center flex-none w-1/2 max-w-full px-3">
                            <h6 className="mb-0 font-bold text-[.9375rem]">Invoices</h6>
                          </div>
                          <div className="flex-none w-1/2 max-w-full px-3 text-right">
                            <button className="inline-block px-8 py-2 mb-0 text-xs font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in bg-150 active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 border-fuchsia-500 text-fuchsia-500 hover:opacity-75">View All</button>
                          </div>
                        </div>
                      </div>
                      <div className="flex-auto p-4 pb-0">
                        <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                          <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-t-inherit text-inherit rounded-xl">
                            <div className="flex flex-col">
                              <h6 className="mb-1 text-sm font-semibold leading-normal text-slate-700">March, 01, 2020</h6>
                              <span className="text-xs leading-tight">#MS-415646</span>
                            </div>
                            <div className="flex items-center text-sm leading-normal">
                              $180
                              <button className="inline-block px-0 py-3 mb-0 ml-6 text-sm font-bold leading-normal text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer ease-soft-in bg-150 active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 text-slate-700"><i className="mr-1 text-lg fas fa-file-pdf"></i> PDF</button>
                            </div>
                          </li>
                          <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-xl text-inherit">
                            <div className="flex flex-col">
                              <h6 className="mb-1 text-sm font-semibold leading-normal text-slate-700">February, 10, 2021</h6>
                              <span className="text-xs leading-tight">#RV-126749</span>
                            </div>
                            <div className="flex items-center text-sm leading-normal">
                              $250
                              <button className="inline-block px-0 py-3 mb-0 ml-6 text-sm font-bold leading-normal text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer ease-soft-in bg-150 active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 text-slate-700"><i className="mr-1 text-lg fas fa-file-pdf"></i> PDF</button>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <RecentActivity />
              {/* <PreviousOrders /> */}
              <div className="col-span-12 xl:col-span-12">
                <div className="box">
                  <div className="box-header">
                      <div className="box-title">
                          Billing
                      </div>
                  </div>
                  <div className="box-body !p-0">
                    <div className="max-w-full p-3 lg:flex-none">
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
                                    <FaLandmark className='relative text-xl text-white opacity-100 top-1/3 left-1/3' />
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
                                    <FaPaypal className='relative text-xl text-white opacity-100 fab fa-paypal top-1/3 left-1/3' />
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

                        <div className="max-w-full px-3 mb-4 lg:mb-0 lg:w-full lg:flex-none">
                          <div className="relative flex flex-col min-w-0 mt-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
                            <div className="p-4 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                              <div className="flex flex-wrap -mx-3">
                                <div className="flex items-center flex-none w-1/2 max-w-full px-3">
                                  <h6 className="mb-0 text-base font-bold">Payment Method</h6>
                                </div>
                                <div className="flex-none w-1/2 max-w-full px-3 text-right">
                                  <a className="inline-block w-48 px-6 py-3 text-xs font-bold text-center text-white uppercase align-middle transition-all bg-transparent rounded-lg cursor-pointer leading-pro ease-soft-in shadow-soft-md bg-150 bg-gradient-to-tl from-gray-900 to-slate-800 hover:shadow-soft-xs active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25" > 
                                    <div className='flex items-center justify-center gap-3'>
                                      <FaPlus />
                                      <span>Add New Card</span>
                                    </div>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="flex-auto p-4">
                              <div className="flex flex-wrap -mx-3">
                                <div className="max-w-full px-3 mb-6 md:mb-0 md:w-1/2 md:flex-none">
                                  <div className="relative flex flex-row items-center flex-auto min-w-0 p-6 break-words bg-transparent border border-solid shadow-none rounded-xl border-slate-100 bg-clip-border">
                                    <img className="mb-0 mr-4 w-[10%]" src={`${path}/assets/images/logos/mastercard.png`} alt="logo" />
                                    <h6 className="mb-0">****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;7852</h6>
                                    <FaPencilAlt  className="ml-auto cursor-pointer text-slate-700" data-target="tooltip_trigger" data-placement="top"/>
                                    <div data-target="tooltip" className="hidden px-2 py-1 text-sm text-white bg-black rounded-lg">
                                      Edit Card
                                      <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']" data-popper-arrow></div>
                                    </div>
                                  </div>
                                </div>
                                <div className="max-w-full px-3 md:w-1/2 md:flex-none">
                                  <div className="relative flex flex-row items-center flex-auto min-w-0 p-6 break-words bg-transparent border border-solid shadow-none rounded-xl border-slate-100 bg-clip-border">
                                    <img className="mb-0 mr-4 w-[10%]" src={`${path}/assets/images/logos/visa.png`} alt="logo" />
                                    <h6 className="mb-0">****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;5248</h6>
                                    <FaPencilAlt  className="ml-auto cursor-pointer text-slate-700" data-target="tooltip_trigger" data-placement="top"/>
                                    <div data-target="tooltip" className="hidden px-2 py-1 text-sm text-white bg-black rounded-lg">
                                      Edit Card
                                      <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']" data-popper-arrow></div>
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