"use client";

import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { LoginSchema } from "@/schemas/auth.schemas";
import CForm from "@/shared/components/form/cform";
import CFormInput from "@/shared/components/form-input/cform-input";
import CButton from "@/shared/components/button/cbutton";

type LoginSchema = z.infer<typeof LoginSchema>;


const LoginForm = () => {
    const {register,handleSubmit,formState: { errors },} = useForm<LoginSchema>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
          username: "",
          password: "",
        },
    });

    const onSubmit:SubmitHandler<LoginSchema> = (values: LoginSchema) =>{
        console.log(values)
    }
    
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
                        props={register("password")}
                        error={errors.password?.message}>
                            Password
                            <Link href="/components/authentication/reset-password/reset-basic/" 
                                className="ltr:float-right rtl:float-left text-danger ml-1">
                                Forget password ?
                            </Link>
                    </CFormInput>
                    <div className="xl:col-span-12 col-span-12 mb-2">
                        <div className="mt-2">
                            <div className="form-check !ps-0">
                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                                <label className="form-check-label text-[#8c9097] dark:text-white/50 font-normal" htmlFor="defaultCheck1">
                                    Remember password ?
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="xl:col-span-12 col-span-12 grid mt-2">
                        <button type="submit" 
                            className="ti-btn ti-btn-primary !bg-primary !text-white !font-medium">
                                Sign In
                        </button>
                        <CButton 
                            btnType='primary' 
                            type="submit"
                            className='btn btn-shadow btn-lg w-40'
                            iconPosition='right'>
                            Next
                        </CButton>
                        {/* <Link href="/components/dashboards/crm/" className="ti-btn ti-btn-primary !bg-primary !text-white !font-medium">Sign In</Link> */}
                    </div>
                </div>
            </CForm>
        </>
    )
}

export default LoginForm