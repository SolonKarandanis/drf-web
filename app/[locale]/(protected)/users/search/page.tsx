import SearchUserForm from "@/components/users/forms/search/search-user-form";
import Table from "@/shared/components/table/table";

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

  const COLUMNS = [
    {
      header: "Id",
      field: "id",
    },
    {
      header: "User Name",
      field: "username",
    },
    {
      header: "Name",
      field: "first_name",
    },
    {
      header: "Email",
      field: "email",
    },
    {
      header: "Created",
      field: "created_at",
    },
    {
      header: "Status",
      field: "status",
    },
    {
      header: "Actions"
    },
  ]

  return (
    <div className="inset-0 flex flex-col justify-between p-24">
      <SearchUserForm  onDataAction={onDataAction}/>
      <Table columns={COLUMNS} />
    </div>
  )
}

export default SearchUsersPage