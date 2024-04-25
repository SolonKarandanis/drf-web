import SearchUserForm from "@/components/users/forms/search/search-user-form";

const SearchUsersPage = () => {

  const onDataAction = async (data: any) => {
    "use server"
    console.log(data);
  }

  return (
    <div><SearchUserForm /></div>
  )
}

export default SearchUsersPage