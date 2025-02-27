import { useLazyGetAllGroupsQuery } from "@/shared/redux/features/users/usersApiSlice";
import { setUserGroups } from "@/shared/redux/features/users/usersSlice";
import { useAppDispatch } from "@/shared/redux/hooks";
import { useEffect } from "react";

export function useGetUserGroups(){
    const dispatch = useAppDispatch();
    const [getAllGroups,{isError,isLoading,data}] = useLazyGetAllGroupsQuery();

    useEffect(()=>{
        getAllGroups()
            .unwrap()
            .then((groups) => dispatch(setUserGroups(groups)))
    },[])
    
    

    

    return {
        userGroups:data,
        isUserGroupsLoading:isLoading
    }
}