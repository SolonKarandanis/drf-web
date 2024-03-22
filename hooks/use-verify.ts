import { useEffect } from 'react';
import { useAppDispatch } from '@/shared/redux/hooks';
import { logout, setTokens,setAuth, setLoading } from '@/shared/redux/features/authSlice';
import { useLazyGetLoggedInUserAccountQuery, useVerifyMutation } from '@/shared/redux/features/authApiSlice';
import { getAccessTokenValue,getRefreshTokenValue } from '@/utils/functions';


export default function useVerify() {
	const dispatch = useAppDispatch();
	const token = getAccessTokenValue();
	const refresh = getRefreshTokenValue();
	const [getAccount,{}] =useLazyGetLoggedInUserAccountQuery();

	const [verify] = useVerifyMutation();

	
	useEffect(() => {
		if(token){
			dispatch(setLoading(true));
			verify(token)
				.unwrap()
				.then(() => {
					const loginResponse:LoginResponse={
						access:token,
						refresh
					}
					dispatch(setTokens(loginResponse));

				})
				.catch((error)=>{
					dispatch(logout());
					// removeLoginResponseFromStorage();
				})

			getAccount(token)
				.unwrap()
				.then((user:UserDetails)=>{
					dispatch(setAuth(user));
				})
				.catch((error)=>{
					dispatch(logout());
					// removeLoginResponseFromStorage();
				})
		}
		
	}, [dispatch,verify,getAccount,refresh,token]);
}