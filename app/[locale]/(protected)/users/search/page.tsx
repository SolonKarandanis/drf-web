import SearchUserForm from "@/components/users/forms/search/search-user-form";
import Table from "@/shared/components/table/table";
import { Metadata } from "next";
import { useMemo } from "react";

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

  const onDataAction = async (data: any) => {
    "use server"
    console.log(data);
    // fetch("/api/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then(data => console.log(data))
  }

  const COLUMNS = useMemo(
    () => [
      {
        header: "Id",
        accessor: "id",
      },
      {
        header: "User Name",
        accessor: "username",
      },
      {
        header: "Name",
        accessor: "first_name",
      },
      {
        header: "Email",
        accessor: "email",
      },
      {
        header: "Created",
        accessor: "created_at",
      },
      {
        header: "Status",
        accessor: "status",
      },
      // {
      //   header: "Actions",
      //   accessor: "",
      // },
    ],
    []
  );

  

  const DATA =[
    {
      "id":1,
      "username":"zle",
      "first_name":"Zelensky",
      "email":"sas@gmail.com",
      "created_at":"",
      "status":"In Progress"
    }

  ]

  return (
    <div className="inset-0 flex flex-col justify-between p-24">
      <SearchUserForm  onDataAction={onDataAction}/>
      <Table columns={COLUMNS}  data={DATA}/>
    </div>
  )
}

export default SearchUsersPage