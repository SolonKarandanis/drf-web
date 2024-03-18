"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { LoginSchema } from "@/schemas/auth.schemas";
import Social from "@/components/auth/social";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
          username: "",
          password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) =>{

    }
    
    return (
        <>
            <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6">
                    <div className="box-body !p-[3rem]">
                        <p className="h5 font-semibold mb-2 text-center">Sign In</p>
                        <p className="mb-4 text-[#8c9097] dark:text-white/50 opacity-[0.7] font-normal text-center">Welcome back</p>
                        <div className="grid grid-cols-12 gap-y-4">
                            <div className="xl:col-span-12 col-span-12">
                                <label htmlFor="signin-username" className="form-label text-default">User Name</label>
                                <input type="text" className="form-control form-control-lg w-full !rounded-md" id="signin-username" placeholder="user name"/>
                            </div>
                            <div className="xl:col-span-12 col-span-12 mb-2">
                                <label htmlFor="signin-password" className="form-label text-default block">Password<Link href="/components/authentication/reset-password/reset-basic/" className="ltr:float-right rtl:float-left text-danger">Forget password ?</Link></label>
                                <div className="input-group">
                                    <input type={(showPassword) ? 'text' : "password"} className="form-control form-control-lg !rounded-s-md" id="signin-password" placeholder="password"/>
                                    <button onClick={()=>setShowPassword(!showPassword)}  aria-label="button" 
                                        className="ti-btn ti-btn-light !rounded-s-none !mb-0" type="button" id="button-addon2">
                                        <i className={`${showPassword ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}></i>
                                    </button>
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
                                <Link href="/components/dashboards/crm/" className="ti-btn ti-btn-primary !bg-primary !text-white !font-medium">Sign In</Link>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 mt-4">Dont have an account? <Link href="/components/authentication/sign-up/signup-basic/" className="text-primary">Sign Up</Link></p>
                        </div>
                        <div className="text-center my-4 authentication-barrier">
                            <span>OR</span>
                        </div>
                        <Social />
                    </div>
            </form>
        </>
    )
}

export default LoginForm