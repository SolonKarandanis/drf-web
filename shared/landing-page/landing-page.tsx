'use client';

import { getClientLocale } from '@/utils/functions';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const LandingPage = () => {
    const locale = getClientLocale();
    const session = useSession();
    // const {isAuthenticated} = useAppSelector(state => state.auth);
    // console.log(isAuthenticated)
    // if(isAuthenticated){
    //     redirect(`/${locale}/dashboard`);
    // }

    redirect(`/${locale}/auth/login`);
}

export default LandingPage
