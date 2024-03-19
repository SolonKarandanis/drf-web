import LoginForm from '@/components/auth/forms/login-form';
import Social from '@/components/auth/social';
import Seo from '@/shared/layout-components/seo/Seo'
import Link from 'next/link';


const page = () => {
  return (
    <>
       <Seo title={"Signin"}/> 
       <div className="container">
            <div className="flex justify-center authentication authentication-basic 
                items-center h-full text-defaultsize text-defaulttextcolor">
                <div className="grid grid-cols-12">
                    <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
                    <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-8 col-span-12">
                        <div className="box">
                            <div className="box-body !p-[3rem]">
                              <p className="h5 font-semibold mb-2 text-center">Sign In</p>
                              <p className="mb-4 text-[#8c9097] dark:text-white/50 opacity-[0.7] font-normal text-center">Welcome back</p>
                              <LoginForm />
                              <div className="text-center">
                                <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mt-4">Dont have an account? <Link href="/components/authentication/sign-up/signup-basic/" className="text-primary">Sign Up</Link></p>
                              </div>
                              <div className="text-center my-4 authentication-barrier">
                                  <span>OR</span>
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