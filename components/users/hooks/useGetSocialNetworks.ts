import { useLazyGetUserSocialsQuery } from "@/shared/redux/features/social/socialApiSlice";
import { 
  resetUserSocials, 
  setUserSocials, 
} from "@/shared/redux/features/social/socialSlice";
import { useAppDispatch } from "@/shared/redux/hooks";
import { useEffect } from "react";


export function useGetSocialNetworks(uuid:string){
    const dispatch = useAppDispatch();
    const [getUserSocials, response]  = useLazyGetUserSocialsQuery();

    useEffect(()=>{
        getUserSocials(uuid)
          .unwrap()
          .then((userSocials) => {
            dispatch(resetUserSocials());
            dispatch(setUserSocials(userSocials));
          })
          .catch((error)=>{
            // dispatch(resetProfileImage())
          })
    },[])

    

    return {
        response
    }
}