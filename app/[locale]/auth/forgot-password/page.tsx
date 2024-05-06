import ForgotPasswordForm from '@/components/auth/forms/forgot-password-form'
import Social from '@/components/auth/social'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'

export const metadata:Metadata={
  title:"Drf Forgot password",
  description:"Drf market place",
  authors:[
    {
      name:"Solon Karandanis",
    }
  ]
}

const ForgotPasswordPage= () => {
  const t = useTranslations();
  return (
    <>
      <div className="container">
        <div className="flex justify-center authentication authentication-basic 
          items-center h-full text-defaultsize text-defaulttextcolor">
            <div className="grid grid-cols-12">
              <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 
                md:col-span-3 sm:col-span-2"></div>
                <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 
                  md:col-span-6 sm:col-span-8 col-span-12">
                  <div className="box">
                    <div className="box-body !p-[3rem]">
                      <p className="h5 font-semibold mb-2 text-center">
                        Forgot Password
                      </p>
                      <ForgotPasswordForm />
                      <div className="text-center">
                            <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mt-4">Already have an account? <Link href="/components/authentication/sign-in/signin-basic/" className="text-primary">Sign In</Link></p>
                      </div>
                      <div className="text-center my-4 authentication-barrier">
                          <span>OR</span>
                      </div>
                      <Social />
                    </div>
                  </div>
                </div>
                <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
            </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPasswordPage