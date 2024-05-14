import PageHeader from '@/shared/layout-components/page-header/PageHeader';
import { Metadata } from 'next';
import Image from 'next/image';
import {FC} from 'react'
import { basePath } from '@/next.config';
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

interface Props{
    params:{
        userUuid:string;
    }
}

const UserDetailsPage:FC<Props> = ({params:{userUuid}}) => {
  const path = process.env.NODE_ENV === "production" ? basePath : "";
  return (
    <>
      <PageHeader 
        currentpage="Profile" activepage="Users" mainpage={userUuid} />
        <div className="grid grid-cols-12 gap-x-6">
          <div className="xxl:col-span-4 xl:col-span-12 col-span-12">
            <div className="box overflow-hidden">
              <div className="box-body !p-0">
                <div className="sm:flex items-start p-6 main-profile-cover">
                  <div>
                      <span className="avatar avatar-xxl avatar-rounded 
                        online me-4">
                          <Image
                            alt="profile-picture"
                            src={`${path}/assets/images/faces/9.jpg`}
                            width={700}
                            height={475}
                            sizes="100vw"/>
                      </span>
                  </div>
                  <div className="flex-grow main-profile-info">
                    <div className="flex items-center !justify-between">
                        <h6 className="font-semibold mb-1 text-black text-[1rem]">Json Taylor</h6>
                        <button type="button" className="ti-btn ti-btn-light !font-medium !gap-0"><i className="ri-add-line me-1 align-middle inline-block"></i>Follow</button>
                    </div>
                    <p className="mb-1 text-black  opacity-[0.7]">Chief Executive Officer (C.E.O)</p>
                    <p className="text-[0.75rem] text-black mb-6 opacity-[0.5]">
                        <span className="me-4 inline-flex text-black"><i className="ri-building-line me-1 align-middle"></i>Georgia</span>
                        <span className="inline-flex text-black"><i className="ri-map-pin-line me-1 align-middle"></i>Washington D.C</span>
                    </p>
                    <div className="flex mb-0">
                      <div className="me-6">
                          <p className="font-bold text-[1.25rem] text-black text-shadow mb-0">113</p>
                          <p className="mb-0 text-[.6875rem] opacity-[0.5] text-black">Projects</p>
                      </div>
                      <div className="me-6">
                          <p className="font-bold text-[1.25rem] text-black text-shadow mb-0">12.2k</p>
                          <p className="mb-0 text-[.6875rem] opacity-[0.5] text-black">Followers</p>
                      </div>
                      <div className="me-6">
                          <p className="font-bold text-[1.25rem] text-black text-shadow mb-0">128</p>
                          <p className="mb-0 text-[.6875rem] opacity-[0.5] text-black">Following</p>
                      </div>
                    </div>
                  </div>
                </div>
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
                <div className="p-6 border-b border-dashed dark:border-defaultborder/10">
                  <p className="text-[.9375rem] mb-2 me-6 font-semibold">
                    Contact Information :
                  </p>
                  <div className="text-[#8c9097] dark:text-white/50">
                    <p className="mb-2">
                        <span className="avatar avatar-sm avatar-rounded me-2 bg-light text-[#8c9097] dark:text-white/50">
                            <i className="ri-mail-line align-middle text-[.875rem] text-[#8c9097] dark:text-white/50"></i>
                        </span>
                        sonyataylor2531@gmail.com
                    </p>
                    <p className="mb-2">
                        <span className="avatar avatar-sm avatar-rounded me-2 bg-light text-[#8c9097] dark:text-white/50">
                            <i className="ri-phone-line align-middle text-[.875rem] text-[#8c9097] dark:text-white/50"></i>
                        </span>
                        +(555) 555-1234
                    </p>
                    <p className="mb-0">
                        <span className="avatar avatar-sm avatar-rounded me-2 bg-light text-[#8c9097] dark:text-white/50">
                            <i className="ri-map-pin-line align-middle text-[.875rem] text-[#8c9097] dark:text-white/50"></i>
                        </span>
                        MIG-1-11, Monroe Street, Georgetown, Washington D.C, USA,20071
                    </p>
                  </div>
                </div>
                <div className="p-6 border-b dark:border-defaultborder/10 border-dashed sm:flex items-center">
                  <p className="text-[.9375rem] mb-2 me-6 font-semibold">
                    Social Networks :
                  </p>
                  <div className="btn-list mb-0">
                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-primary text-primary me-[.375rem] mb-1">
                        <i className="ri-facebook-line font-semibold"></i>
                    </button>
                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-secondary me-[.375rem] mb-1">
                        <i className="ri-twitter-line font-semibold"></i>
                    </button>
                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-warning me-[.375rem] mb-1">
                        <i className="ri-instagram-line font-semibold"></i>
                    </button>
                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-success me-[.375rem] mb-1">
                        <i className="ri-github-line font-semibold"></i>
                    </button>
                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-danger me-[.375rem] mb-1">
                        <i className="ri-youtube-line font-semibold"></i>
                    </button>
                  </div>
                </div>
                <div className="p-6 border-b dark:border-defaultborder/10 border-dashed">
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
          <div className="xxl:col-span-8 xl:col-span-12 col-span-12">
            <div className="grid grid-cols-12 gap-x-6">
              <div className="xl:col-span-12 col-span-12">
                <div className="box">
                  <div className="box-body !p-0">
                    <div className="!p-4 border-b dark:border-defaultborder/10 border-dashed 
                      md:flex items-center justify-between">
                        <nav className="-mb-0.5 sm:flex md:space-x-6 rtl:space-x-reverse pb-2">
                          <Link className="w-full sm:w-auto flex active hs-tab-active:font-semibold  hs-tab-active:text-white hs-tab-active:bg-primary rounded-md py-2 px-4 text-primary text-sm" href="#!" id="activity-tab" data-hs-tab="#activity-tab-pane" aria-controls="activity-tab-pane">
                              <i className="ri-gift-line  align-middle inline-block me-1"></i>Activity
                          </Link>
                          <Link className="w-full sm:w-auto flex hs-tab-active:font-semibold  hs-tab-active:text-white hs-tab-active:bg-primary rounded-md  py-2 px-4 text-primary text-sm" href="#!" id="posts-tab" data-hs-tab="#posts-tab-pane" aria-controls="posts-tab-pane">
                              <i className="ri-bill-line me-1 align-middle inline-block"></i>Posts
                          </Link>
                          <Link className="w-full sm:w-auto flex hs-tab-active:font-semibold  hs-tab-active:text-white hs-tab-active:bg-primary rounded-md  py-2 px-4 text-primary text-sm" href="#!" id="followers-tab" data-hs-tab="#followers-tab-pane" aria-controls="followers-tab-pane">
                              <i className="ri-money-dollar-box-line me-1 align-middle inline-block"></i>Friends
                          </Link>
                          <Link className="w-full sm:w-auto flex hs-tab-active:font-semibold  hs-tab-active:text-white hs-tab-active:bg-primary rounded-md  py-2 px-4 text-primary text-sm" href="#!" id="gallery-tab" data-hs-tab="#gallery-tab-pane" aria-controls="gallery-tab-pane">
                              <i className="ri-exchange-box-line me-1 align-middle inline-block"></i>Gallery
                          </Link>
                        </nav>
                        <div>
                          <p className="font-semibold mb-2 ms-2">Profile 60% completed - <Link href="#!" className="text-primary text-[0.75rem]">Finish now</Link></p>
                          <div className="progress progress-xs progress-animate">
                              <div className="progress-bar bg-primary w-[60%]" ></div>
                          </div>
                        </div>
                    </div>
                    <div className="!p-4">
                      <div className="tab-content" id="myTabContent">
                        <div className="tab-pane show active fade !p-0 !border-0" id="activity-tab-pane"
                          role="tabpanel" aria-labelledby="activity-tab" tabIndex={0}>
                          <ul className="list-none profile-timeline">
                            <li>
                                <div>
                                    <span className="avatar avatar-sm bg-primary/10  !text-primary avatar-rounded profile-timeline-avatar">
                                        E
                                    </span>
                                    <p className="mb-2">
                                        <b>You</b> Commented on <b>alexander taylor</b> post <Link className="text-secondary" href="#!"><u>#beautiful day</u></Link>.<span className="ltr:float-right rtl:float-left text-[.6875rem] text-[#8c9097] dark:text-white/50">24,Dec 2022 - 14:34</span>
                                    </p>
                                    <p className="profile-activity-media mb-0 flex w-full mt-2 sm:mt-0">
                                        <Link aria-label="anchor" href="#!">
                                          <Image
                                            alt=""
                                            src={`${path}/assets/images/media/media-17.jpg`}
                                            width={700}
                                            height={475}
                                            sizes="100vw"/>
                                        </Link>
                                        <Link aria-label="anchor" href="#!">
                                          <Image
                                            alt=""
                                            src={`${path}/assets/images/media/media-18.jpg`}
                                            width={700}
                                            height={475}
                                            sizes="100vw"/>
                                        </Link>
                                    </p>
                                </div>
                            </li>
                            
                          </ul>
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