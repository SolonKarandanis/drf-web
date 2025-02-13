import { logout } from "@/shared/redux/features/authSlice";
import { useLazyGetSocialsQuery } from "@/shared/redux/features/social/socialApiSlice";
import { setSocials } from "@/shared/redux/features/social/socialSlice";
import { useAppDispatch } from "@/shared/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useGetSocials(){
    const [getSocials, response] = useLazyGetSocialsQuery();
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(()=>{
        getSocials()
            .unwrap()
            .then((socials) => {
                dispatch(setSocials(socials))
            })
            .catch(error=>{
                dispatch(logout())
                router.push('/api/auth/signout?callbackUrl=/');
            })
    },[])

    return {
        response
    }

}