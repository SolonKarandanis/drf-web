'use client';

import { useAppSelector } from '@/shared/redux/hooks';
import { redirect } from 'next/navigation';

const LandingPage = () => {
    const {isAuthenticated} = useAppSelector(state => state.auth);
    if(isAuthenticated){
        redirect('/dashboard');
    }
    redirect('/auth/login');
}

export default LandingPage
