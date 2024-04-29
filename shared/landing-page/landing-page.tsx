'use client';

import { useAppSelector } from '@/shared/redux/hooks';
import { redirect } from 'next/navigation';

const LandingPage = () => {
    const {isAuthenticated} = useAppSelector(state => state.auth);
    console.log(isAuthenticated)
    if(isAuthenticated){
        redirect('/en/dashboard');
    }
    redirect('/en/auth/login');
}

export default LandingPage
