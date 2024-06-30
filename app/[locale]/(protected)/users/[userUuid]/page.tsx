import PageHeader from '@/shared/layout-components/page-header/PageHeader';
import { Metadata } from 'next';
import Image from 'next/image';
import {FC} from 'react'
import { basePath } from '@/next.config';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getUserGroups } from '@/utils/user-utils';
import Profile from '@/components/users/user-details/profile';
import ContactInformation from '@/components/users/user-details/contanct-information';
import SocialNetworks from '@/components/users/user-details/social-networks';
import RecentActivity from '@/components/users/user-details/recent-activity';
import PreviousOrders from '@/components/users/user-details/previous-orders';

export const metadata:Metadata={
  title:"Drf User Profile Page",
  description:"Drf market place",
  authors:[
    {
      name:"Solon Karandanis",
    }
  ]
}

const Skillsdata = [
  { id: 1, text: 'Cloud computing' },
  { id: 2, text: 'Data analysis' },
  { id: 3, text: 'DevOps' },
  { id: 4, text: 'Machine learning' },
  { id: 5, text: 'Programming' },
  { id: 6, text: 'Security' },
  { id: 7, text: 'Python' },
  { id: 8, text: 'JavaScript' },
  { id: 9, text: 'Ruby' },
  { id: 10, text: 'PowerShell' },
  { id: 11, text: 'Statistics' },
  { id: 12, text: 'SQL' },
];

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
  const path = process.env.NODE_ENV === "production" ? basePath : "";
  const session = await getServerSession(authOptions);
  const loggedInUser= session!.user!;
  const groupNames =getUserGroups(loggedInUser);
  const roles = groupNames.join(', ');
  
  return (
    <>
      <PageHeader 
        currentpage="Profile" activepage="Users" mainpage={userUuid} />
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 xxl:col-span-4 xl:col-span-12">
            <div className="overflow-hidden box">
              <div className="box-body !p-0">
                <Profile  
                    firstName={loggedInUser.firstName}
                    lastName={loggedInUser.lastName}
                    roles={roles}
                    image={`${path}/assets/images/faces/9.jpg`}
                    city='Athens'
                    country='Greece'/>

                <div className="items-center justify-between p-6 border-b border-dashed dark:border-defaultborder/10 md:flex">
                    <div className="mb-6">
                      <p className="text-[.9375rem] mb-2 font-semibold">Professional Bio :</p>
                      <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 opacity-[0.7] mb-0">
                          I am <b className="text-defaulttextcolor">Sonya Taylor,</b> here by conclude that,i am the founder and managing director of the prestigeous company name laugh at all and acts as the cheif executieve officer of the company.
                      </p>
                    </div>
                </div>
                <ContactInformation 
                    email={loggedInUser.email}
                    phone='+(555) 555-1234'
                    address='Maiandrou 58'
                    city='Athens'
                    country='Greece'
                    state='Attiki'
                    zipCode='14233'/>
                    
                <SocialNetworks />
                
                <div className="p-6 border-b border-dashed dark:border-defaultborder/10">
                  <p className="text-[.9375rem] mb-2 me-6 font-semibold">Skills :</p>
                  <div>
                      {Skillsdata.map((idx)=>(
                          <span key={Math.random()} className="badge bg-light text-[#8c9097] dark:text-white/50 m-1">{idx.text}</span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 xxl:col-span-8 xl:col-span-12">
            <div className="grid grid-cols-12 gap-x-6">
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