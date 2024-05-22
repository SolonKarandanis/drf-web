import PageHeader from '@/shared/layout-components/page-header/PageHeader';
import { Metadata } from 'next';
import Image from 'next/image';
import {FC} from 'react'
import { basePath } from '@/next.config';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getUserGroups } from '@/utils/user-utils';

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
  const groupNames =getUserGroups(loggedInUser);
  
  return (
    <>
      <PageHeader 
        currentpage="Profile" activepage="Users" mainpage={userUuid} />
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 xxl:col-span-4 xl:col-span-12">
            <div className="overflow-hidden box">
              <div className="box-body !p-0">
                
                <div className="items-start p-6 sm:flex main-profile-cover">
                  <div>
                      <span className="avatar avatar-xxl avatar-rounded online me-4">
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
                        <button type="button" className="ti-btn ti-btn-light !font-medium !gap-0"><i className="inline-block align-middle ri-add-line me-1"></i>Follow</button>
                    </div>
                    <p className="mb-1 text-black  opacity-[0.7]">Chief Executive Officer (C.E.O)</p>
                    <p className="text-[0.75rem] text-black mb-6 opacity-[0.5]">
                        <span className="inline-flex text-black me-4"><i className="align-middle ri-building-line me-1"></i>Georgia</span>
                        <span className="inline-flex text-black"><i className="align-middle ri-map-pin-line me-1"></i>Washington D.C</span>
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
                <div className="items-center p-6 border-b border-dashed dark:border-defaultborder/10 sm:flex">
                  <p className="text-[.9375rem] mb-2 me-6 font-semibold">
                    Social Networks :
                  </p>
                  <div className="mb-0 btn-list">
                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-primary text-primary me-[.375rem] mb-1">
                        <i className="font-semibold ri-facebook-line"></i>
                    </button>
                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-secondary me-[.375rem] mb-1">
                        <i className="font-semibold ri-twitter-line"></i>
                    </button>
                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-warning me-[.375rem] mb-1">
                        <i className="font-semibold ri-instagram-line"></i>
                    </button>
                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-success me-[.375rem] mb-1">
                        <i className="font-semibold ri-github-line"></i>
                    </button>
                    <button aria-label="button" type="button" className="ti-btn ti-btn-sm ti-btn-danger me-[.375rem] mb-1">
                        <i className="font-semibold ri-youtube-line"></i>
                    </button>
                  </div>
                </div>
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
                                    <p className="flex w-full mt-2 mb-0 profile-activity-media sm:mt-0">
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
                            <li>
                                <div>
                                    <span className="avatar avatar-sm avatar-rounded profile-timeline-avatar">
                                      <Image
                                        alt=""
                                        src={`${path}/assets/images/faces/11.jpg`}
                                        width={700}
                                        height={475}
                                        sizes="100vw"/>
                                    </span>
                                    <p className="text-[#8c9097] dark:text-white/50 mb-2">
                                        <span className="text-default"><b>Json Smith</b> reacted to the post 👍</span>.<span className="ltr:float-right rtl:float-left text-[.6875rem] text-[#8c9097] dark:text-white/50">18,Dec 2022 - 12:16</span>
                                    </p>
                                    <p className="text-[#8c9097] dark:text-white/50 mb-0">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, repellendus rem rerum excepturi aperiam ipsam temporibus inventore ullam tempora eligendi libero sequi dignissimos cumque, et a sint tenetur consequatur omnis!
                                    </p>
                                </div>
                            </li>
                            <li>
                              <div>
                                  <span className="avatar avatar-sm avatar-rounded profile-timeline-avatar">
                                    <Image
                                      alt=""
                                      src={`${path}/assets/images/faces/4.jpg`}
                                      width={700}
                                      height={475}
                                      sizes="100vw"/>
                                  </span>
                                  <p className="text-[#8c9097] dark:text-white/50 mb-2">
                                      <span className="text-default"><b>Alicia Keys</b> shared a document with <b>you</b></span>.<span className="ltr:float-right rtl:float-left text-[.6875rem] text-[#8c9097] dark:text-white/50">21,Dec 2022 - 15:32</span>
                                  </p>
                                  <p className="flex items-center w-full mt-2 mb-0 profile-activity-media sm:mt-0">
                                      <Link aria-label="anchor" href="#!">
                                        <Image
                                          alt=""
                                          src={`${path}/assets/images/faces/3.jpg`}
                                          width={700}
                                          height={475}
                                          sizes="100vw"/>
                                      </Link>
                                      <span className="text-[.6875rem] text-[#8c9097] dark:text-white/50">432.87KB</span>
                                  </p>
                              </div>
                            </li>
                            <li>
                              <div>
                                  <span className="avatar avatar-sm bg-success/10 !text-success avatar-rounded profile-timeline-avatar">
                                      P
                                  </span>
                                  <p className="text-[#8c9097] dark:text-white/50 mb-4">
                                      <span className="text-default"><b>You</b> shared a post with 4 people <b>Simon,Sasha, Anagha,Hishen</b></span>.<span className="ltr:float-right rtl:float-left text-[.6875rem] text-[#8c9097] dark:text-white/50">28,Dec 2022 - 18:46</span>
                                  </p>
                                  <p className="mb-4 profile-activity-media">
                                      <Link aria-label="anchor" href="#!">
                                          <img src="../../../assets/images/media/media-75.jpg" alt="" />
                                      </Link>
                                  </p>
                                  <div>
                                      <div className="avatar-list-stacked">
                                          <span className="avatar avatar-sm avatar-rounded">
                                              <img src="../../../assets/images/faces/2.jpg" alt="img" />
                                          </span>
                                          <span className="avatar avatar-sm avatar-rounded">
                                              <img src="../../../assets/images/faces/8.jpg" alt="img" />
                                          </span>
                                          <span className="avatar avatar-sm avatar-rounded">
                                              <img src="../../../assets/images/faces/2.jpg" alt="img" />
                                          </span>
                                          <span className="avatar avatar-sm avatar-rounded">
                                              <img src="../../../assets/images/faces/10.jpg" alt="img" />
                                          </span>
                                      </div>
                                  </div>
                              </div>
                            </li>
                            <li>
                                <div>
                                    <span className="avatar avatar-sm avatar-rounded profile-timeline-avatar">
                                        <img src="../../../assets/images/faces/5.jpg" alt="" />
                                    </span>
                                    <p className="text-[#8c9097] dark:text-white/50 mb-1">
                                        <span className="text-default"><b>Melissa Blue</b> liked your post <b>travel excites</b></span>.<span className="ltr:float-right rtl:float-left text-[.6875rem] text-[#8c9097] dark:text-white/50">11,Dec 2022 - 11:18</span>
                                    </p>
                                    <p className="text-[#8c9097] dark:text-white/50">you are already feeling the tense atmosphere of the video playing in the background</p>
                                    <p className="mb-0 profile-activity-media sm:flex">
                                        <Link aria-label="anchor" href="#!">
                                            <img src="../../../assets/images/media/media-59.jpg" className="m-1" alt="" />
                                        </Link>
                                        <Link aria-label="anchor" href="#!">
                                            <img src="../../../assets/images/media/media-60.jpg" className="m-1" alt="" />
                                        </Link>
                                        <Link aria-label="anchor" href="#!">
                                            <img src="../../../assets/images/media/media-61.jpg" className="m-1" alt="" />
                                        </Link>
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <span className="avatar avatar-sm avatar-rounded profile-timeline-avatar">
                                        <img src="../../../assets/images/media/media-39.jpg" alt="" />
                                    </span>
                                    <p className="mb-1">
                                        <b>You</b> Commented on <b>Peter Engola</b> post <Link className="text-secondary" href="#!"><u>#Mother Nature</u></Link>.<span className="ltr:float-right rtl:float-left text-[.6875rem] text-[#8c9097] dark:text-white/50">24,Dec 2022 - 14:34</span>
                                    </p>
                                    <p className="text-[#8c9097] dark:text-white/50">Technology id developing rapidly kepp uo your work 👌</p>
                                    <p className="flex w-full mt-2 mb-0 profile-activity-media sm:mt-0">
                                        <Link aria-label="anchor" href="#!">
                                            <img src="../../../assets/images/media/media-26.jpg" alt="" />
                                        </Link>
                                        <Link aria-label="anchor" href="#!">
                                            <img src="../../../assets/images/media/media-29.jpg" alt="" />
                                        </Link>
                                    </p>
                                </div>
                            </li>
                          </ul>
                        </div>
                        <div className="tab-pane fade !p-0 !border-0 hidden !rounded-md" id="posts-tab-pane"
                          role="tabpanel" aria-labelledby="posts-tab" tabIndex={0}>
                          <ul className="list-group !rounded-md">
                            <li className="list-group-item">
                                <div className="items-center leading-none sm:flex">
                                    <div className="me-4">
                                        <span className="avatar avatar-md avatar-rounded">
                                            <img src="../../../assets/images/faces/9.jpg" alt="" />
                                        </span>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="sm:flex">
                                            <input type="text" className="form-control !rounded-e-none !w-full" placeholder="Recipient's username" aria-label="Recipient's username with two button addons" />
                                            <button aria-label="button" className="ti-btn ti-btn-light !rounded-none !mb-0" type="button"><i className="bi bi-emoji-smile"></i></button>
                                            <button aria-label="button" className="ti-btn ti-btn-light !rounded-none !mb-0" type="button"><i className="bi bi-paperclip"></i></button>
                                            <button aria-label="button" className="ti-btn ti-btn-light !rounded-none !mb-0" type="button"><i className="bi bi-camera"></i></button>
                                            <button className="ti-btn bg-primary !mb-0 !rounded-s-none text-white" type="button">Post</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="text-center">
                                    <button type="button" className="ti-btn ti-btn-primary !font-medium">Show All</button>
                                </div>
                            </li>
                          </ul>
                        </div>
                        <div className="tab-pane fade !p-0 !border-0 hidden" id="followers-tab-pane"
                          role="tabpanel" aria-labelledby="followers-tab" tabIndex={0}>
                            <div className="grid grid-cols-12 sm:gap-x-6">
                              {Friendsdata.map((idx) =>(
                                <div className="col-span-12 xxl:col-span-4 xl:col-span-4 lg:col-span-6 md:col-span-6" key={Math.random()}>
                                    <div className="box !shadow-none border dark:border-defaultborder/10">
                                        <div className="p-6 box-body">
                                            <div className="text-center">
                                                <span className="avatar avatar-xl avatar-rounded">
                                                    <img src={idx.src} alt="" />
                                                </span>
                                                <div className="mt-2">
                                                    <p className="mb-0 font-semibold">{idx.name}</p>
                                                    <p className="text-[0.75rem] opacity-[0.7] mb-1 text-[#8c9097] dark:text-white/50">{idx.mail}</p>
                                                    <span className={`badge bg-${idx.color}/10 rounded-full text-${idx.color}`}>{idx.badge}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center box-footer">
                                            <div className="btn-list">
                                                <button type="button" className="ti-btn btn-sm !py-1 !px-2 !text-[0.75rem] me-1 ti-btn-light">Block</button>
                                                <button type="button" className="ti-btn btn-sm !py-1 !px-2 !text-[0.75rem] text-white bg-primary">Unfollow</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                              ))}
                              <div className="col-span-12">
                                  <div className="text-center !mt-4">
                                      <button type="button" className="ti-btn ti-btn-primary !font-medium btn-wave">Show All</button>
                                  </div>
                              </div>
                            </div>
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