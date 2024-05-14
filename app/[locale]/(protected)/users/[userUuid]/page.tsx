import PageHeader from '@/shared/layout-components/page-header/PageHeader';
import { Metadata } from 'next';
import Image from 'next/image';
import {FC} from 'react'
import { basePath } from '@/next.config';

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
                            sizes="100vw"
                            className="main-logo toggle-white"/>
                      </span>
                  </div>
                  <div className="flex-grow main-profile-info">
                    <div className="flex items-center !justify-between">
                        <h6 className="font-semibold mb-1 text-white text-[1rem]">Json Taylor</h6>
                        <button type="button" className="ti-btn ti-btn-light !font-medium !gap-0"><i className="ri-add-line me-1 align-middle inline-block"></i>Follow</button>
                    </div>
                    <p className="mb-1 !text-white  opacity-[0.7]">Chief Executive Officer (C.E.O)</p>
                    <p className="text-[0.75rem] text-white mb-6 opacity-[0.5]">
                        <span className="me-4 inline-flex"><i className="ri-building-line me-1 align-middle"></i>Georgia</span>
                        <span className="inline-flex"><i className="ri-map-pin-line me-1 align-middle"></i>Washington D.C</span>
                    </p>
                    <div className="flex mb-0">
                      <div className="me-6">
                          <p className="font-bold text-[1.25rem] text-white text-shadow mb-0">113</p>
                          <p className="mb-0 text-[.6875rem] opacity-[0.5] text-white">Projects</p>
                      </div>
                      <div className="me-6">
                          <p className="font-bold text-[1.25rem] text-white text-shadow mb-0">12.2k</p>
                          <p className="mb-0 text-[.6875rem] opacity-[0.5] text-white">Followers</p>
                      </div>
                      <div className="me-6">
                          <p className="font-bold text-[1.25rem] text-white text-shadow mb-0">128</p>
                          <p className="mb-0 text-[.6875rem] opacity-[0.5] text-white">Following</p>
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