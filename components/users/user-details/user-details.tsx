"use client";

import { FC} from "react";
import SocialNetworks from "./social-networks";
import Profile from "./profile";
import { getUserGroups } from "@/utils/user-utils";
import ContactInformation from "./contanct-information";
import ProfileLoading from "./profile-loading";
import { useTranslations } from "next-intl";
import Bio from "./bio";
import { useGetUserDetails } from "../hooks/useGetUserDetails";
import { useSession } from "next-auth/react";


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
  uuid:string;
}

const UserDetails:FC<Props> =  ({uuid}) => {
  const {data} = useSession();
  const loggedInUser = data?.user;
  const t = useTranslations();
  const {
    imageData,
    userData
  } = useGetUserDetails(uuid);

  if(userData.isError){
    return <>{t("GLOBAL.FETCH-ERROR")}</>
  }

  if(userData.data && loggedInUser){
    const isUserMe = uuid ===loggedInUser.uuid;
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
        <Bio 
          isLoading={userData.isLoading}
          canEditUser={isUserMe}/>
       
        <ContactInformation 
          email={user.email}
          phone={details?.phone}
          address={details?.address}
          city={details?.city}
          country={details?.country}
          state={details?.state}
          zipCode={details?.zip}
          isLoading={userData.isLoading}
          canEditUser={isUserMe}/>
          
        <SocialNetworks canEditUser={isUserMe}/>
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