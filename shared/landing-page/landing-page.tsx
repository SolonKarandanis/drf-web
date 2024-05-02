'use client';

import { useAppSelector } from '@/shared/redux/hooks';
import { getClientLocale } from '@/utils/functions';
import { redirect } from 'next/navigation';

const LandingPage = () => {
    const locale = getClientLocale();
    // const {isAuthenticated} = useAppSelector(state => state.auth);
    // console.log(isAuthenticated)
    // if(isAuthenticated){
    //     redirect(`/${locale}/dashboard`);
    // }
    redirect(`/${locale}/auth/login`);
}

export default LandingPage
