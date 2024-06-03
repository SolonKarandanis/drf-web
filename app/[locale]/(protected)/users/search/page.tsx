import SearchUserForm from "@/components/users/forms/search/search-user-form";
import { Metadata } from "next";

import PageHeader from "@/shared/layout-components/page-header/PageHeader";
import Results from "@/components/users/forms/search/results";

export const metadata:Metadata={
  title:"Drf Search Users",
  description:"Drf market place",
  authors:[
    {
      name:"Solon Karandanis",
    }
  ]
}

const SearchUsersPage = () => {
  return (
    <>
      <PageHeader 
          currentpage="Search Users" 
          activepage="Users" 
          mainpage="Search Users" />
      <div className="inset-0 flex flex-col justify-between p-24">
        <SearchUserForm  />
        <Results />
      </div>
    </>
  )
}

export default SearchUsersPage