import { useTranslations } from 'next-intl';
import React from 'react'

const ProfileLoading = () => {
  const t = useTranslations();
  return (
    <div role="status" className="w-full p-4 rounded shadow main-profile-cover animate-pulse md:p-6 dark:border-gray-700">
        <div className="flex flex-row">
          <div className="flex items-center flex-grow w-full mt-4">
              <svg className="w-20 h-20 text-gray-700 me-3 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
              </svg>
              <div>
                <div className="w-32 h-3 mb-2 bg-gray-700 rounded-full dark:bg-gray-700"></div>
                <div className="w-6 h-2 mb-2 bg-gray-700 rounded-full dark:bg-gray-700"></div>
                <div className="w-48 h-2 mb-4 bg-gray-700 rounded-full dark:bg-gray-700"></div>
                <div className="h-6 bg-gray-700 rounded-full dark:bg-gray-700 mb-2.5"></div>
              </div>
          </div>
          <div className="w-48 h-6 mt-3 bg-gray-700 rounded-full dark:bg-gray-700"></div>
        </div>
        
        <span className="sr-only">{t("GLOBAL.LOADING")}</span>
    </div>
  )
}

export default ProfileLoading