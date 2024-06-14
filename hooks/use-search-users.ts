import { ErrorResponse } from "@/models/error.models";
import { UserSearchRequest, UserSearchResponse } from "@/models/search.models";
import { useSearchUsersMutation } from "@/shared/redux/features/users/usersApiSlice";
import { setUsers } from "@/shared/redux/features/users/usersSlice";
import { useAppDispatch } from "@/shared/redux/hooks";
import { useState } from "react";
import { toast } from "react-toastify";

const handleError =(errorResponse:ErrorResponse)=>{
    const {status, data:{detail}} = errorResponse;
    toast.error(`(${status}) ${detail}`);
}

export const useSearchUsers =() =>{
    const [request,setRequest] = useState<UserSearchRequest| null>(null)
    const dispatch = useAppDispatch();
    const [search,{ isLoading, }] = useSearchUsersMutation();

    // const performSearch = () =

    // if(request){
    //     search(request)
    //         .unwrap()
    //         .then((response:UserSearchResponse ) => {
    //             dispatch(setUsers(response));
    //         })
    //         .catch((error:ErrorResponse) => {
    //             handleError(error);
    //         });
    // }
    
    
    return [
        isLoading
    ]
}