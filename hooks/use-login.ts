import { useState,useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/shared/redux/hooks';
import { useLoginMutation,useLazyGetLoggedInUserAccountQuery } from '@/shared/redux/features/authApiSlice';
import { setAuth, setTokens } from '@/shared/redux/features/authSlice';
import { toast } from 'react-toastify';
import {  setLoginResponseInStorage } from '@/utils/functions';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from "@/schemas/auth.schemas";
import * as z from "zod";



export default function useLogin() {
    const router = useRouter();
	const dispatch = useAppDispatch();
	const [login, { isLoading }] = useLoginMutation();
	const [getAccount,{}] =useLazyGetLoggedInUserAccountQuery();
	const [token,setToken] = useState<string|undefined>(undefined);

    type LoginSchema = z.infer<typeof LoginSchema>;

    const {register,handleSubmit,formState: { errors },} = useForm<LoginSchema>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
          username: "",
          password: "",
        },
    });

    const handleError =(error:ErrorResponse)=>{
		const {status, data:{detail}} = error;
		toast.error(`(${status}) ${detail}`);
	}

    const onSubmit:SubmitHandler<LoginSchema> = (values: LoginSchema) =>{
        const {username,password} = values;
        const request:LoginRequest={
            username,
            password
        }

        login(request)
            .unwrap()
			.then((loginResponse:LoginResponse) => {
				const {access} = loginResponse;
				setToken(access);
				setLoginResponseInStorage(loginResponse);
				dispatch(setTokens(loginResponse));
			})
			.catch((error:ErrorResponse) => {
				handleError(error);
			});
    };

    useEffect(()=>{
		if(token){
			getAccount(token)
			.unwrap()
			.then((user:UserDetails)=>{
				dispatch(setAuth(user));
				toast.success('Logged in');
				router.push('/dashboard');
			})
			.catch((error:ErrorResponse) => {
				handleError(error);
			});
		}
		
	},[token]);

    // return {
	// 	username,
	// 	password,
	// 	isLoading,
	// 	onChange,
	// 	onSubmit,
	// };

}