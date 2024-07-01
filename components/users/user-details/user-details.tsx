"use client";

import { FC } from "react";
import SocialNetworks from "./social-networks";
import { useGetUserQuery } from "@/shared/redux/features/users/usersApiSlice";
import Profile from "./profile";
import { getUserGroups } from "@/utils/user-utils";
import ContactInformation from "./contanct-information";
import { useAppDispatch } from "@/shared/redux/hooks";
import { setSelectedUser } from "@/shared/redux/features/users/usersSlice";


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
  path?:string;
}

const UserDetails:FC<Props> = ({userUuid,path}) => {
  const { data, error, isLoading } = useGetUserQuery(userUuid)
  const dispatch = useAppDispatch();
  if(isLoading){
    return <>Loading...</>
  }

  if(error){
    return <>Oh no, there was an error</>
  }

  if(data){
    // dispatch(setSelectedUser(data));
    const groupNames =getUserGroups(data);
    const roles = groupNames.join(', ');
    const details = data.details;

    return (
      <div className="box-body !p-0">
        <Profile  
          firstName={data.firstName}
          lastName={data.lastName}
          roles={roles}
          image={`${path}/assets/images/faces/9.jpg`}
          city={details?.city}
          country={details?.country}/>
        <div className="items-center justify-between p-6 border-b border-dashed dark:border-defaultborder/10 md:flex">
          <div className="mb-6">
            <p className="text-[.9375rem] mb-2 font-semibold">Professional Bio :</p>
            <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 opacity-[0.7] mb-0">
                I am <b className="text-defaulttextcolor">Sonya Taylor,</b> here by conclude that,i am the founder and managing director of the prestigeous company name laugh at all and acts as the cheif executieve officer of the company.
            </p>
          </div>
        </div>

        <ContactInformation 
          email={data.email}
          phone={details?.phone}
          address={details?.address}
          city={details?.city}
          country={details?.country}
          state={details?.state}
          zipCode={details?.zip}/>
          
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