'use client';

import {FC} from 'react'
import { redirect } from 'next/navigation';
import { useAppSelector } from '@/shared/redux/hooks';
import Spinner  from '@/shared/components/spinner/spinner';

interface Props {
	children: React.ReactNode;
}

const RequireAuth:FC<Props> = ({ children }) => {
    const { isLoading, isAuthenticated } = useAppSelector(state => state.auth);
	console.log(isAuthenticated)
	console.log(isLoading)

	if (isLoading && isAuthenticated) {
		return (
			<div className='flex justify-center my-8'>
				<Spinner lg />
			</div>
		);
	}

	if (!isLoading && !isAuthenticated) {
		redirect('/auth/login');
	}
    return <>{children}</>;
}

export default RequireAuth