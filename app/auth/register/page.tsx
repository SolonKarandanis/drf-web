import RegisterForm from '@/components/auth/forms/register-form';
import Social from '@/components/auth/social';
import Seo from '@/shared/layout-components/seo/Seo'
import Link from 'next/link';

const page = () => {
  return (
    <>
       <Seo title={"Signup"}/>
       <div className="container">
            <div className="flex items-center justify-center h-full authentication authentication-basic text-defaultsize text-defaulttextcolor">
                <div className="grid grid-cols-12">
                    <div className="xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-3 sm:col-span-2"></div>
                    <div className="col-span-12 xxl:col-span-4 xl:col-span-4 lg:col-span-4 md:col-span-6 sm:col-span-8">
                        <div className="box">
                            <div className="box-body !p-[3rem]">
                                <p className="mb-2 font-semibold text-center h5">Sign Up</p>
                                <p className="mb-4 text-[#8c9097] dark:text-white/50 opacity-[0.7] font-normal text-center">
                                    Welcome &amp; Join us by creating a free account !
                                </p>
                                <RegisterForm />
                                <div className="text-center">
                                    <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mt-4">Already have an account? 
                                        <Link href="/auth/login" className="text-sky-900">Sign In</Link>
                                    </p>
                                </div>
                                <div className="my-4 text-center authentication-barrier">
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