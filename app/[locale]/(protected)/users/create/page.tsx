import CreateUserForm from "@/components/users/forms/create-user/create-user-form"
import PageHeader from "@/shared/layout-components/page-header/PageHeader"
import { Metadata } from "next"

export const metadata:Metadata={
  title:"Drf Create User",
  description:"Drf market place",
  authors:[
    {
      name:"Solon Karandanis",
    }
  ]
}

const CreateUserPage = () => {
  return (
    <div>
      <PageHeader 
        currentpage="Create User" 
        activepage="Users" 
        mainpage="Create Users" />
      <CreateUserForm/>
    </div>
  )
}

export default CreateUserPage