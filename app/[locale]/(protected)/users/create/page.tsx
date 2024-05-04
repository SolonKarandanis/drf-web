import CreateUserForm from "@/components/users/forms/create-user/create-user-form"
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
    <div><CreateUserForm/> </div>
  )
}

export default CreateUserPage