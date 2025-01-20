"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { getLoginSchema, LoginSchema } from "@/schemas/auth.schemas";
import CForm from "@/shared/components/form/cform";
import FormButton from "@/shared/components/button/form-button";
import { useTranslations } from "next-intl";
import {signIn, SignInResponse} from "next-auth/react"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import FormInput from "@/shared/components/form-input/form-input";
import { useState } from "react";



const LoginForm = () => {
    const router = useRouter()
    const t = useTranslations();
    const formT = useTranslations("USERS.VALIDATION");
    const lform='LOGIN.FORM';
    const [signinLoading,setSigninLoading] = useState<boolean>(false);
    
    const {register,control,handleSubmit,formState: { errors , isValid },} = useForm<LoginSchema>({
        resolver: zodResolver(getLoginSchema(formT)),
        defaultValues: {
          username: "",
          password: "",
        },
    });


    const onSubmit:SubmitHandler<LoginSchema> = async (values: LoginSchema) =>{
        const {username,password} = values;
        setSigninLoading(true);
        signIn("credentials",{
            username,
            password,
            redirect:false,
            callbackUrl:'/'
        })
        .then((response: SignInResponse| undefined) =>{
            setSigninLoading(false);
            if(response && response.ok){
                console.log(response);
                router.push(response.url!);
            }
            if(response && response.status && response.error){
                toast.error(`(${response.status}) ${response.error}`);
            }
        })
    }

    
    return (
        <>
            <CForm onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12 gap-y-4">                 
                    <FormInput 
                        type='text'
                        required={true}
                        name='username' 
                        placeholder={t(`${lform}.LABELS.username`)}
                        autoComplete="username"
                        className={"w-full !rounded-md"}
                        sectionClassName="col-span-12 xl:col-span-12"
                        props={register("username")}
                        error={errors.username?.message}>
                            {t(`${lform}.LABELS.username`)}
                    </FormInput>
                    <FormInput 
                        type='password'
                        required={true}
                        name='password' 
                        placeholder={t(`${lform}.LABELS.password`)}
                        autoComplete="current-password"
                        className={"!rounded-e-none"}
                        sectionClassName="col-span-12 xl:col-span-12"
                        props={register("password")}
                        error={errors.password?.message}>
                            {t(`${lform}.LABELS.password`)}
                            <Link href='/auth/forgot-password'
                                className="ml-1 ltr:float-right rtl:float-left text-danger">
                                {t(`${lform}.LABELS.forget-password`)}
                            </Link>
                    </FormInput>
                    <div className="col-span-12 mb-2 xl:col-span-12">
                        <div className="mt-2">
                            <div className="form-check !ps-0">
                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                                <label className="form-check-label text-[#8c9097] dark:text-white/50 font-normal" htmlFor="defaultCheck1">
                                    {t(`${lform}.LABELS.remember-password`)}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="grid col-span-12 mt-2 xl:col-span-12">
                        <FormButton 
                            intent="violet" 
                            size="md" 
                            type="submit"
                            isLoading={signinLoading}
                            isDisabled={signinLoading || !isValid}>                    
                                {t(`${lform}.BUTTONS.sign-in`)}
                        </FormButton>
                        {/* <Link href="/components/dashboards/crm/" className="ti-btn ti-btn-primary !bg-primary !text-white !font-medium">Sign In</Link> */}
                    </div>
                </div>
            </CForm>
        </>
    )
}

export default LoginForm