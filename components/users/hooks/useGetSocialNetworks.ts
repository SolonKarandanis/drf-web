import { useLazyGetUserSocialsQuery } from "@/shared/redux/features/social/socialApiSlice";
import { resetUserSocials, setUserSocials, socialsSelector, userSelectedSocialsSelector } from "@/shared/redux/features/social/socialSlice";
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
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

    const socials = useAppSelector(socialsSelector);
    const selectedUserSocials = useAppSelector(userSelectedSocialsSelector);

    return {
        socials,
        selectedUserSocials,
        response
    }
}