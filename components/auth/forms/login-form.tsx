"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { getLoginSchema, LoginSchema } from "@/schemas/auth.schemas";
import CForm from "@/shared/components/form/cform";
import CFormInput from "@/shared/components/form-input/cform-input";
import CButton from "@/shared/components/button/cbutton";
import { useTranslations } from "next-intl";
import {signIn, SignInResponse} from "next-auth/react"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import FormInput from "@/shared/components/input/input";



const LoginForm = () => {
    const router = useRouter()
    const t = useTranslations();
    const formT = useTranslations("USERS.VALIDATION");
    const lform='LOGIN.FORM';
    
    const {register,control,handleSubmit,formState: { errors ,isSubmitting, isValid },} = useForm<LoginSchema>({
        resolver: zodResolver(getLoginSchema(formT)),
        defaultValues: {
          username: "",
          password: "",
        },
    });


    const onSubmit:SubmitHandler<LoginSchema> = async (values: LoginSchema) =>{
        const {username,password} = values;
        signIn("credentials",{
            username,
            password,
            redirect:false,
            callbackUrl:'/'
        })
        .then((response: SignInResponse| undefined) =>{
            if(response && response.ok){
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
                    {/* <FormInput 
                        control={control}
                        type='text'
                        required={true}
                        name='username'
                        placeholder={t(`${lform}.LABELS.username`)}
                        autoComplete="username"
                        sectionClassName="col-span-12 xl:col-span-12"
                        error={errors.username?.message}>
                            {t(`${lform}.LABELS.username`)}
                    </FormInput> */}
                    <CFormInput 
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
                    </CFormInput>
                    <CFormInput 
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
                    </CFormInput>
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
                        <CButton 
                            intent="violet" 
                            size="md" 
                            type="submit"
                            >                    
                                {t(`${lform}.BUTTONS.sign-in`)}
                        </CButton>
                        {/* <Link href="/components/dashboards/crm/" className="ti-btn ti-btn-primary !bg-primary !text-white !font-medium">Sign In</Link> */}
                    </div>
                </div>
            </CForm>
        </>
    )
}

export default LoginForm