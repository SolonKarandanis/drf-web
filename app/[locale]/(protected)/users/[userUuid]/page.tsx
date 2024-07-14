import PageHeader from '@/shared/layout-components/page-header/PageHeader';
import { Metadata } from 'next';
import {FC} from 'react'
import RecentActivity from '@/components/users/user-details/recent-activity';
import PreviousOrders from '@/components/users/user-details/previous-orders';
import UserDetails from '@/components/users/user-details/user-details';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/shadcn/components/ui/tabs';


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
                  <div className="box-header">
                        <div className="box-title">
                            Account
                        </div>
                  </div>
                  <div className="box-body !p-0">
                    <div className="!p-4 border-b dark:border-defaultborder/10 border-dashed md:flex items-center justify-between">
                      <Tabs defaultValue="account" className="w-full">
                        <TabsList>
                          <TabsTrigger 
                            value="settings">
                            Settings
                          </TabsTrigger>
                          <TabsTrigger 
                            value="change-password">
                            Change Password
                          </TabsTrigger>
                          <TabsTrigger 
                            value="status">
                            Status
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="settings">
                          <div className="w-full max-w-full pl-1 xl:w-6/12">
                            <div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                              <div className="flex-auto p-4">
                                <h6 className="mb-4 text-xs font-bold leading-tight uppercase text-slate-500">Email Settings</h6>
                                <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                                  <li className="relative block px-0 py-2 bg-white border-0 rounded-t-lg text-inherit">
                                    <div className="min-h-6 mb-0.5 flex pl-0">
                                      <input id="follow" className="rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl 
                                        after:duration-250 checked:after:translate-x-5.25 h-5 relative float-left w-10 cursor-pointer appearance-none border 
                                        border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all 
                                        after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] 
                                        checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right" type="checkbox"   />
                                      <label htmlFor="follow" className="w-4/5 mb-0 ml-4 overflow-hidden text-sm font-normal cursor-pointer select-none text-ellipsis whitespace-nowrap text-slate-500" >Email me when someone follows me</label>
                                    </div>
                                  </li>
                                  <li className="relative block px-0 py-2 bg-white border-0 text-inherit">
                                    <div className="min-h-6 mb-0.5 flex pl-0">
                                      <input id="answer" className="rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl 
                                        after:duration-250 checked:after:translate-x-5.25 h-5 relative float-left w-10 cursor-pointer appearance-none border 
                                        border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all 
                                        after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-['']
                                      checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right" type="checkbox" />
                                      <label htmlFor='answer' className="w-4/5 mb-0 ml-4 overflow-hidden text-sm font-normal cursor-pointer select-none text-ellipsis whitespace-nowrap text-slate-500" >Email me when someone answers on my post</label>
                                    </div>
                                  </li>
                                  <li className="relative block px-0 py-2 bg-white border-0 rounded-b-lg text-inherit">
                                    <div className="min-h-6 mb-0.5 flex pl-0">
                                      <input id="mention" className="rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl 
                                        after:duration-250 checked:after:translate-x-5.25 h-5 relative float-left w-10 cursor-pointer appearance-none border 
                                        border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all 
                                        after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] 
                                        checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right" type="checkbox"  />
                                      <label htmlFor="mention" className="w-4/5 mb-0 ml-4 overflow-hidden text-sm font-normal cursor-pointer select-none text-ellipsis whitespace-nowrap text-slate-500" >Email me when someone mentions me</label>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="change-password">
                          Change your password here.
                        </TabsContent>
                        <TabsContent value="status">
                          Status
                        </TabsContent>
                      </Tabs>
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