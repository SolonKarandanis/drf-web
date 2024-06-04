"use client"

import { setLoginResponseInStorage } from '@/utils/functions';
import { useSession } from 'next-auth/react';


const SetTokensLocalStorage= () => {
    const {data} = useSession();
    if(data && data.user){
        const access =data.user.access
        const refresh =data.user.refresh
        setLoginResponseInStorage({access,refresh});
    }
    return null;
}

export default SetTokensLocalStorage