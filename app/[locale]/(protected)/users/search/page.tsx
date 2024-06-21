import SearchUserForm from "@/components/users/forms/search/search-user-form";
import { Metadata } from "next";

import PageHeader from "@/shared/layout-components/page-header/PageHeader";
import Results from "@/components/users/forms/search/results";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("USERS.SEARCH.PAGE");
  return (
    <>
      <PageHeader 
          currentpage={t("currentpage")} 
          activepage={t("activepage")}
          mainpage={t("mainpage")} />
      <div className="inset-0 flex flex-col justify-between p-24">
        <SearchUserForm  />
        <Results />
      </div>
    </>
  )
}

export default SearchUsersPage