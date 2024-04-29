import SearchUserForm from "@/components/users/forms/search/search-user-form";

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

  return (
    <div className="inset-0 flex flex-col justify-between p-24">
      <SearchUserForm  onDataAction={onDataAction}/>
    </div>
  )
}

export default SearchUsersPage