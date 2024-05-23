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

const Friendsdata = [
  { id: 1, src: "../../../assets/images/faces/2.jpg", name: 'Samantha May', mail: 'samanthamay2912@gmail.com', badge: 'Team Member', color: 'info' },
  { id: 2, src: "../../../assets/images/faces/15.jpg", name: 'Andrew Garfield', mail: 'andrewgarfield98@gmail.com', badge: 'Team Lead', color: 'success' },
  { id: 3, src: "../../../assets/images/faces/5.jpg", name: 'Jessica Cashew', mail: 'jessicacashew143@gmail.com', badge: 'Team Member', color: 'info' },
  { id: 4, src: "../../../assets/images/faces/11.jpg", name: 'Simon Cowan', mail: 'jessicacashew143@gmail.com', badge: 'Team Manager', color: 'warning' },
  { id: 5, src: "../../../assets/images/faces/7.jpg", name: 'Amanda nunes', mail: 'amandanunes45@gmail.com', badge: 'Team Member', color: 'info' },
  { id: 6, src: "../../../assets/images/faces/12.jpg", name: 'Mahira Hose', mail: 'mahirahose9456@gmail.com', badge: 'Team Member', color: 'info' },
];

const Personalinfodata = [
  { id: 1, text1: 'Name :', text2: 'Sonya Taylor' },
  { id: 2, text1: 'Email :', text2: 'sonyataylor231@gmail.com' },
  { id: 3, text1: 'Phone :', text2: '+(555) 555-1234' },
  { id: 4, text1: 'Designation :', text2: 'C.E.O' },
  { id: 5, text1: 'Age :', text2: '28' },
  { id: 6, text1: 'Experience :', text2: '10 Years' },
];

const RecentPostsdata = [
  { id: 1, src: "../../../assets/images/media/media-39.jpg", name: 'Animals', text: 'There are many variations of passages of Lorem Ipsum available' },
  { id: 2, src: "../../../assets/images/media/media-56.jpg", name: 'Travel', text: 'Latin words, combined with a handful of model sentence' },
  { id: 3, src: "../../../assets/images/media/media-54.jpg", name: 'Interior', text: 'Contrary to popular belief, Lorem Ipsum is not simply random' },
  { id: 4, src: "../../../assets/images/media/media-64.jpg", name: 'Nature', text: 'It is a long established fact that a reader will be distracted by the readable content' }
];

const Suggestionsdata = [
  { id: 1, src: "../../../assets/images/faces/15.jpg", name: 'Alister' },
  { id: 2, src: "../../../assets/images/faces/4.jpg", name: 'Samantha Sams' },
  { id: 3, src: "../../../assets/images/faces/11.jpg", name: 'Jason Mama' },
  { id: 4, src: "../../../assets/images/faces/5.jpg", name: 'Alicia Sierra' },
  { id: 5, src: "../../../assets/images/faces/7.jpg", name: 'Kiara Advain' }
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
//   loggedInUser
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
                    firstName={loggedInUser.first_name}
                    lastName={loggedInUser.last_name}
                    roles={roles}
                    image={`${path}/assets/images/faces/9.jpg`}
                    city='Athens'
                    country='Greece'/>

                <div className="p-6 border-b border-dashed dark:border-defaultborder/10">
                  <div className="mb-6">
                      <p className="text-[.9375rem] mb-2 font-semibold">Professional Bio :</p>
                      <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 opacity-[0.7] mb-0">
                          I am <b className="text-defaulttextcolor">Sonya Taylor,</b> here by conclude that,i am the founder and managing director of the prestigeous company name laugh at all and acts as the cheif executieve officer of the company.
                      </p>
                  </div>
                  <div className="mb-0">
                    <p className="text-[.9375rem] mb-2 font-semibold">Links :</p>
                    <div className="mb-0">
                        <p className="mb-1">
                            <Link href="#!" className="text-blue"><u>https://www.spruko.com/</u></Link>
                        </p>
                        <p className="mb-0">
                            <Link href="#!" className="text-blue"><u>https://themeforest.net/user/ spruko/portfolio</u></Link>
                        </p>
                    </div>
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
              <div className="col-span-12 xl:col-span-12">
                <div className="box">
                  <div className="box-body !p-0">
                    <div className="!p-4 border-b dark:border-defaultborder/10 border-dashed 
                      md:flex items-center justify-between">
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
                        <div>
                          <p className="mb-2 font-semibold ms-2">Profile 60% completed - <Link href="#!" className="text-primary text-[0.75rem]">Finish now</Link></p>
                          <div className="progress progress-xs progress-animate">
                              <div className="progress-bar bg-primary w-[60%]" ></div>
                          </div>
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
              <div className="col-span-12 xl:col-span-4">
                  <div className="box">
                      <div className="flex justify-between box-header">
                          <div className="box-title">
                              Recent Posts
                          </div>
                          <div>
                              <span className="badge bg-primary/10 text-primary">Today</span>
                          </div>
                      </div>
                      <div className="box-body">
                          <ul className="list-group">
                              {RecentPostsdata.map((idx)=>(

                              <li className="list-group-item" key={Math.random()}>
                                  <Link href="#!">
                                      <div className="flex flex-wrap items-center">
                                          <span className="avatar avatar-md me-4 !mb-0">
                                              <img src={idx.src} className="img-fluid !rounded-md" alt="..." />
                                          </span>
                                          <div className="flex-grow">
                                              <p className="mb-0 font-semibold">{idx.name}</p>
                                              <p className="mb-0 text-[0.75rem] profile-recent-posts text-truncate text-[#8c9097] dark:text-white/50">
                                                  {idx.text}
                                              </p>
                                          </div>
                                      </div>
                                  </Link>
                              </li>
                              ))}
                          </ul>
                      </div>
                  </div>
              </div>
              <div className="col-span-12 xl:col-span-4">
                  <div className="box">
                      <div className="flex justify-between box-header">
                          <div className="box-title">
                              Suggestions
                          </div>
                          <div>
                              <button type="button" className="ti-btn !py-1 !px-2 !text-[0.75rem] !font-medium ti-btn-success">View All</button>
                          </div>
                      </div>
                      <div className="box-body">
                          <ul className="list-group">
                              {Suggestionsdata.map((idx) =>(

                              <li className="list-group-item" key={Math.random()}>
                                  <div className="flex items-center justify-between">
                                      <div className="flex items-center font-semibold">
                                          <span className="avatar avatar-xs me-2">
                                              <img src={idx.src} alt="" />
                                          </span>{idx.name}
                                      </div>
                                      <div>
                                          <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-primary !mb-0">
                                              <i className="ri-add-line"></i>
                                          </button>
                                      </div>
                                  </div>
                              </li>
                              ))}
                          </ul>
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