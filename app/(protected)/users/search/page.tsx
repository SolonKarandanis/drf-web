import SearchUserForm from "@/components/users/forms/search/search-user-form";

const SearchUsersPage = () => {

  const onDataAction = async (data: any) => {
    "use server"
    console.log(data);
  }

  return (
    <div className="inset-0 flex flex-col justify-between p-24">
      <SearchUserForm />
    </div>
  )
}

export default SearchUsersPage