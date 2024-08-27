"use client";

import { FC, useEffect } from "react";
import SocialNetworks from "./social-networks";
import { useLazyGetUserImageQuery, useLazyGetUserQuery } from "@/shared/redux/features/users/usersApiSlice";
import Profile from "./profile";
import { getUserGroups } from "@/utils/user-utils";
import ContactInformation from "./contanct-information";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { setProfileImage, setSelectedUser } from "@/shared/redux/features/users/usersSlice";
import ProfileLoading from "./profile-loading";


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
  userUuid:string;
}

const UserDetails:FC<Props> =  ({userUuid}) => {
  const [getUser, userData] = useLazyGetUserQuery();
  const [getUserImage, imageData] = useLazyGetUserImageQuery();
  const dispatch = useAppDispatch();
  const configState = useAppSelector((state) => state.config);
  const path = configState.baseUrl;
  const isLoading = true


  useEffect(()=>{
    getUser(userUuid)
      .unwrap()
      .then((user) => {
        dispatch(setSelectedUser(user))
        getUserImage(userUuid)
          .unwrap()
          .then((image)=>{
            dispatch(setProfileImage(image))
          })
      })
  },[])

  if(userData.isError){
    return <>Oh no, there was an error</>
  }

 

  if(userData.data){
    const user = userData.data;
    const groupNames =getUserGroups(user);
    const roles = groupNames.join(', ');
    const details = user.details;
    const image = imageData.data;

    return (
      <div className="box-body !p-0">
        {userData.isLoading? 
          (
            <ProfileLoading/>
          ):
          (
            <Profile  
              firstName={user.firstName}
              lastName={user.lastName}
              roles={roles}
              city={details?.city}
              country={details?.country}/>
          )
        }
       
        <div className="items-center justify-between p-6 border-b border-dashed dark:border-defaultborder/10 md:flex">
          <div className="w-full mb-6 ">
            <p className="text-[.9375rem] mb-2 font-semibold">Professional Bio :</p>
            {userData.isLoading ? (
                <div role="status" className="w-full rounded animate-pulse dark:border-gray-700">
                  <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700"></div>
                </div>
              ):
              (
                <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 opacity-[0.7] mb-0">
                  {user.bio}
                </p>
              )
            }
          </div>
        </div>

        <ContactInformation 
          email={user.email}
          phone={details?.phone}
          address={details?.address}
          city={details?.city}
          country={details?.country}
          state={details?.state}
          zipCode={details?.zip}
          isLoading={userData.isLoading}/>
          
        <SocialNetworks userUuid={userUuid} />
        <div className="p-6 border-b border-dashed dark:border-defaultborder/10">
          <p className="text-[.9375rem] mb-2 me-6 font-semibold">Skills :</p>
          <div>
              {Skillsdata.map((idx)=>(
                  <span key={Math.random()} className="badge bg-light text-[#8c9097] dark:text-white/50 m-1">{idx.text}</span>
              ))}
          </div>
        </div>
      </div>
    )
  }
  
}

export default UserDetails