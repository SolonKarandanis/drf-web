import { UserGroup } from "@/models/user.models";
import { useLazyGetAllGroupsQuery } from "@/shared/redux/features/users/usersApiSlice";
import { setUserGroups, userUserGroupsSelector } from "@/shared/redux/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";

export function useGetUserGroups(){
    const dispatch = useAppDispatch();
    const [getAllGroups] = useLazyGetAllGroupsQuery();
    const userGroups:UserGroup[] = useAppSelector(userUserGroupsSelector);

    if(userGroups.length===0){
        getAllGroups()
            .unwrap()
            .then((groups) => dispatch(setUserGroups(groups)))
    }

    return {
        userGroups
    }
}