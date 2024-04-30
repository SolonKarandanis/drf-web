'use client';

import {FC} from 'react'
import { redirect } from 'next/navigation';
import { useAppSelector } from '@/shared/redux/hooks';
import Spinner  from '@/shared/components/spinner/spinner';
import { getClientLocale } from '@/utils/functions';

interface Props {
	children: React.ReactNode;
}

const RequireAuth:FC<Props> = ({ children }) => {
	const locale = getClientLocale();
    const { isLoading, isAuthenticated } = useAppSelector(state => state.auth);

	if (isLoading && isAuthenticated) {
		return (
			<div className='flex justify-center my-8'>
				<Spinner lg />
			</div>
		);
	}

	if (!isLoading && !isAuthenticated) {
		redirect(`/${locale}/auth/login`);
	}
    return <>{children}</>;
}

export default RequireAuth