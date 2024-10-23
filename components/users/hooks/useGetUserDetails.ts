import { useLazyGetUserImageQuery, useLazyGetUserQuery } from "@/shared/redux/features/users/usersApiSlice";
import { resetProfileImage, setProfileImage, setSelectedUser } from "@/shared/redux/features/users/usersSlice";
import { useAppDispatch } from "@/shared/redux/hooks";
import { useEffect } from "react";

export function useGetUserDetails(uuid:string){
    const [getUser, userData] = useLazyGetUserQuery();
    const [getUserImage, imageData] = useLazyGetUserImageQuery();
    const dispatch = useAppDispatch();

    useEffect(()=>{
        getUser(uuid)
          .unwrap()
          .then((user) => {
            dispatch(setSelectedUser(user))
            getUserImage(uuid)
              .unwrap()
              .then((image)=>{
                dispatch(setProfileImage(image))
              })
              .catch((error)=>{
                dispatch(resetProfileImage())
              })
          })
    },[])

    return {
        userData,
        imageData
    }

}