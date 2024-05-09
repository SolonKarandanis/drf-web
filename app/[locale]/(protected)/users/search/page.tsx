import SearchUserForm from "@/components/users/forms/search/search-user-form";
import { DataTable } from "@/shared/components/data-table/data-table";
import { Metadata } from "next";
import { useMemo } from "react";
import { columns } from "./columns";

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

  const DATA =[
    {
      "id":1,
      "username":"admin",
      "first_name":"admin",
      "last_name":"admin",
      "email":"skarandanis@gmail.com",
      "created_date":"2023-11-27 07:45:50.195 +0200"
    },
    {
      "id":2,
      "username":"skaran",
      "first_name":"Solon",
      "last_name":"Karandanis",
      "email":"skarandanis2@gmail.com",
      "created_date":"2023-11-27 07:58:00.758 +0200"
    },
    {
      "id":3,
      "username":"stratos",
      "first_name":"Stratos",
      "last_name":"Karandanis",
      "email":"skarandanis3@gmail.com",
      "created_date":"2023-11-27 07:59:16.353 +0200"
    },
    {
      "id":4,
      "username":"panos",
      "first_name":"Panagiotis",
      "last_name":"Karandanis",
      "email":"skarandanis4@gmail.com",
      "created_date":"2023-11-27 07:59:33.343 +0200"
    },

  ]

  return (
    <div className="inset-0 flex flex-col justify-between p-24">
      <SearchUserForm  onDataAction={onDataAction}/>
      <DataTable columns={columns}  data={DATA}/>
    </div>
  )
}

export default SearchUsersPage