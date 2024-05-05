import LoginForm from '@/components/auth/forms/login-form';
import Social from '@/components/auth/social';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export const metadata:Metadata={
  title:"Drf Signin",
  description:"Drf market place",
  authors:[
    {
      name:"Solon Karandanis",
    }
  ]
}

const page = () => {
  const t = useTranslations();
  return (
    <>
       <div className="container">
            <div className="flex items-center justify-center h-full authentication authentication-basic text-defaultsize text-defaulttextcolor">
                <div className="grid grid-cols-12">
                    <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
                    <div className="col-span-12 xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-8">
                        <div className="box">
                            <div className="box-body !p-[3rem]">
                              <p className="mb-2 font-semibold text-center h5">{t("LOGIN.PAGE.title")}</p>
                              <p className="mb-4 text-[#8c9097] dark:text-white/50 opacity-[0.7] font-normal text-center">{t("LOGIN.PAGE.description")}</p>
                              <LoginForm />
                              <div className="text-center">
                                <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mt-4">{t("LOGIN.PAGE.dont-have-account")}
                                  <Link href='/auth/register' className="text-sky-900">{t("LOGIN.PAGE.sign-up")}</Link>
                                </p>
                              </div>
                              <div className="my-4 text-center authentication-barrier">
                                  <span>{t("GLOBAL.OR")}</span>
                              </div>
                              <Social />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </div>
    </>
  )
}

export default page