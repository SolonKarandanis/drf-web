"use client";

import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { LoginSchema } from "@/schemas/auth.schemas";
import CForm from "@/shared/components/form/cform";
import CFormInput from "@/shared/components/form-input/cform-input";
import CButton from "@/shared/components/button/cbutton";
import { useRouter } from 'next/navigation';
import { useAppDispatch } from "@/shared/redux/hooks";
import { useLazyGetLoggedInUserAccountQuery, useLoginMutation } from "@/shared/redux/features/authApiSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { setLoginResponseInStorage } from "@/utils/functions";
import { setAuth, setLoading, setTokens } from "@/shared/redux/features/authSlice";
import { useTranslations } from "next-intl";

type LoginSchema = z.infer<typeof LoginSchema>;


const LoginForm = () => {
    const t = useTranslations('LOGIN');
    const router = useRouter();
	const dispatch = useAppDispatch();
	const [login, { isLoading }] = useLoginMutation();
	const [getAccount,{}] =useLazyGetLoggedInUserAccountQuery();
	const [token,setToken] = useState<string|undefined>(undefined);
    
    const {register,handleSubmit,formState: { errors },} = useForm<LoginSchema>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
          username: "",
          password: "",
        },
    });

    const handleError =(errorResponse:ErrorResponse)=>{
		const {status, data:{detail}} = errorResponse;
		toast.error(`(${status}) ${detail}`);
	}

    const onSubmit:SubmitHandler<LoginSchema> = (values: LoginSchema) =>{
        const {username,password} = values;
        const request:LoginRequest={
            username,
            password
        }
        dispatch(setLoading(true));
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
    }

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
    
    return (
        <>
            <CForm onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12 gap-y-4">
                    <CFormInput 
                        type='text'
                        required={true}
                        name='username' 
                        placeholder="Username"
                        autoComplete="username"
                        className={"w-full !rounded-md"}
                        sectionClassName="col-span-12 xl:col-span-12"
                        props={register("username")}
                        error={errors.username?.message}>
                            Username
                    </CFormInput>
                    <CFormInput 
                        type='password'
                        required={true}
                        name='password' 
                        placeholder="Password"
                        autoComplete="current-password"
                        className={"!rounded-e-none"}
                        sectionClassName="col-span-12 xl:col-span-12"
                        props={register("password")}
                        error={errors.password?.message}>
                            Password
                            <Link href="/components/authentication/reset-password/reset-basic/" 
                                className="ml-1 ltr:float-right rtl:float-left text-danger">
                                Forget password ?
                            </Link>
                    </CFormInput>
                    <div className="col-span-12 mb-2 xl:col-span-12">
                        <div className="mt-2">
                            <div className="form-check !ps-0">
                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                                <label className="form-check-label text-[#8c9097] dark:text-white/50 font-normal" htmlFor="defaultCheck1">
                                    Remember password ?
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="grid col-span-12 mt-2 xl:col-span-12">
                        <CButton 
                            intent="violet" 
                            size="md" 
                            type="submit">
                            Sign In
                        </CButton>
                        {/* <Link href="/components/dashboards/crm/" className="ti-btn ti-btn-primary !bg-primary !text-white !font-medium">Sign In</Link> */}
                    </div>
                </div>
            </CForm>
        </>
    )
}

export default LoginForm