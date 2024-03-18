import LoginForm from '@/components/auth/forms/login-form';
import Seo from '@/shared/layout-components/seo/Seo'


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
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
       </div>
    </>
  )
}

export default page