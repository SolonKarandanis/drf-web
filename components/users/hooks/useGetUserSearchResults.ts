import { handleError } from "@/lib/functions";
import { ErrorResponse } from "@/models/error.models";
import { UserSearchRequest, UserSearchResponse } from "@/models/search.models";
import { useSearchUsersMutation } from "@/shared/redux/features/users/usersApiSlice";
import { setUsers } from "@/shared/redux/features/users/usersSlice";
import { useAppDispatch } from "@/shared/redux/hooks";

export function useGetUserSearchResults(){
    const dispatch = useAppDispatch();
    const [search] = useSearchUsersMutation();

    const handleGetSearchResults = (request:UserSearchRequest) =>{
        search(request)
            .unwrap()
            .then((response:UserSearchResponse) => {
                dispatch(setUsers(response));
            })
            .catch((error:ErrorResponse) => {
                handleError(error);
            });
    };

    return {
        handleGetSearchResults
    }
}