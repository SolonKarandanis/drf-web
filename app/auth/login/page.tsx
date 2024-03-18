import Seo from '@/shared/layout-components/seo/Seo'
import React from 'react'

const page = () => {
  return (
    <>
       <Seo title={"Signin"}/> 
       <div className="container">
            <div className="flex justify-center authentication authentication-basic 
                items-center h-full text-defaultsize text-defaulttextcolor">
                
            </div>
       </div>
    </>
  )
}

export default page