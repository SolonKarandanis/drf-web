import { useLazyGetUserImageQuery, useLazyGetUserQuery } from "@/shared/redux/features/users/usersApiSlice";
import { 
  resetProfileImage, 
  userProfileImageSelector, 
  selectedUserSelector, 
  setProfileImage, 
  setSelectedUser 
} from "@/shared/redux/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
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

    const user = useAppSelector(selectedUserSelector);
    const profileImage = useAppSelector(userProfileImageSelector);

    return {
      user,
      profileImage,
      isError:userData.isError,
      isLoading:userData.isLoading,
    }

}