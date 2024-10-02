"use client"

import { useTranslations } from 'next-intl';
import {FC, useState} from 'react'
import UserEditButton from './user-edit-button';

interface Props{
    bio:string;
    isLoading:boolean;
}

const Bio:FC<Props> = ({
    bio,
    isLoading,
}) => {
    const t = useTranslations();
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const handleEditButtonClick = () => {
        setIsEdit(prev => !prev);
    };

    
    return (
        <div className="items-center justify-between p-6 border-b border-dashed dark:border-defaultborder/10 md:flex">
          <div className="w-full mb-6 ">
            <section className="flex items-center justify-between">
              <p className="text-[.9375rem] mb-2 font-semibold">{t("USERS.DETAILS.LABELS.bio")}:</p>
              <UserEditButton onClick={handleEditButtonClick} />
            </section>
            {isLoading ? (
                <div role="status" className="w-full rounded animate-pulse dark:border-gray-700">
                  <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700"></div>
                </div>
              ):
              (
                <>
                  {isEdit ? (
                    <>
                        <section className="col-span-12 xl:col-span-12">
                            <label htmlFor='bio-input' className="form-label text-default">
                                ssss
                            </label>
                            <input 
                                id="bio-input" 
                                name="bio-input"
                                size={30}
                                type="text"
                                className="form-control w-full !rounded-md"/>
                        </section>
                    </>
                  ):(
                    <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 opacity-[0.7] mb-0">
                      {bio}
                    </p>
                  )}
                  
                </>
              )
            }
          </div>
        </div>
    )
}

export default Bio