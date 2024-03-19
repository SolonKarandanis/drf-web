"use client";

import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { LoginSchema } from "@/schemas/auth.schemas";
import CForm from "@/shared/components/form/cform";

type LoginSchema = z.infer<typeof LoginSchema>;


const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
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
                    <div className="xl:col-span-12 col-span-12">
                        <label htmlFor="username" className="form-label text-default">User Name</label>
                        <input type="text"
                            id="username" 
                            className="form-control form-control-lg w-full !rounded-md" 
                            placeholder="Username"
                            {...register("username")}/>
                            {errors.username && (
                                <p className="text-xs italic text-red-500 mt-2">
                                {errors.username?.message}
                                </p>
                            )}
                    </div>
                    <div className="xl:col-span-12 col-span-12 mb-2">
                        <label htmlFor="password" className="form-label text-default block">Password
                            <Link href="/components/authentication/reset-password/reset-basic/" 
                                className="ltr:float-right rtl:float-left text-danger ml-1">
                                Forget password ?
                            </Link>
                        </label>
                        <div className="input-group">
                            <input type={(showPassword) ? 'text' : "password"}
                                id="password"
                                className="form-control form-control-lg !rounded-s-md"  
                                placeholder="Password"
                                {...register("password")}/>
                            <button onClick={()=>setShowPassword(!showPassword)}  aria-label="button" 
                                className="ti-btn ti-btn-light !rounded-s-none !mb-0" type="button" id="button-addon2">
                                <i className={`${showPassword ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}></i>
                            </button>
                            {errors.password && (
                                <p className="text-xs italic text-red-500 mt-2">
                                {errors.password?.message}
                                </p>
                            )}
                        </div>

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
                        {/* <Link href="/components/dashboards/crm/" className="ti-btn ti-btn-primary !bg-primary !text-white !font-medium">Sign In</Link> */}
                    </div>
                </div>
            </CForm>
        </>
    )
}

export default LoginForm