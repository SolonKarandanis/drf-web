"use client";

import { RegisterSchema } from '@/schemas/auth.schemas';
import CForm from '@/shared/components/form/cform'
import * as z from "zod";
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

type RegisterSchema = z.infer<typeof RegisterSchema>;

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const {register,handleSubmit,formState: { errors },} = useForm<RegisterSchema>({
      resolver: zodResolver(RegisterSchema),
      defaultValues: {
        firstName:"",
        lastName:"",
        email:"",
        username: "",
        password: "",
        confirmPassword:""
      },
  });

  const onSubmit:SubmitHandler<RegisterSchema> = (values: RegisterSchema) =>{
      console.log(values)
  }
  return (
   <>
    <CForm onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-y-4">
            <div className="xl:col-span-12 col-span-12">
                <label htmlFor="firstname" className="form-label text-default">First Name</label>
                <input type="text" className="form-control form-control-lg w-full !rounded-md"
                    id="firstname" placeholder="first name"/>
            </div>
            <div className="xl:col-span-12 col-span-12">
                <label htmlFor="lastname" className="form-label text-default">Last Name</label>
                <input type="text" className="form-control form-control-lg w-full !rounded-md"
                    id="lastname" placeholder="last name"/>
            </div>
            <div className="xl:col-span-12 col-span-12">
                <label htmlFor="email" className="form-label text-default">Email</label>
                <input type="email" className="form-control form-control-lg w-full !rounded-md"
                    id="email" placeholder="Email"/>
            </div>
            <div className="xl:col-span-12 col-span-12">
                <label htmlFor="username" className="form-label text-default">Username</label>
                <input type="text" className="form-control form-control-lg w-full !rounded-md"
                    id="username" placeholder="Username" autoComplete="username"/>
            </div>
            <div className="xl:col-span-12 col-span-12">
                <label htmlFor="password" className="form-label text-default">Password</label>
                <div className="input-group">
                    <input type="password"
                        className="form-control form-control-lg !rounded-e-none"
                        id="password" placeholder="password" autoComplete="password"/>
                    <button onClick={()=>setShowPassword(!showPassword)}  aria-label="button" 
                        className="ti-btn ti-btn-light !rounded-s-none !mb-0" type="button" id="button-addon2">
                        <i className={`${showPassword ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}></i>
                    </button>
                </div>
            </div>
            <div className="xl:col-span-12 col-span-12 mb-2">
                <label htmlFor="confirmpassword" className="form-label text-default">Confirm
                    Password</label>
                <div className="input-group">
                    <input type="password"
                        className="form-control form-control-lg !rounded-e-none"
                        id="confirmpassword" placeholder="confirm password" autoComplete="new-password"/>
                    <button onClick={()=>setConfirmShowPassword(!showConfirmPassword)}  aria-label="button" 
                        className="ti-btn ti-btn-light !rounded-s-none !mb-0" type="button" id="button-addon21">
                        <i className={`${showPassword ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}></i>
                    </button>
                </div>
                <div className="mt-4">
                    <div className="form-check !flex !ps-0">
                        <input className="form-check-input me-1" type="checkbox" value="" id="defaultCheck1"/>
                        <label className="ps-2 form-check-label text-[#8c9097] dark:text-white/50 font-normal block" htmlFor="defaultCheck1">
                            By creating a account you agree to our <Link href="/components/pages/terms&conditions/"
                            className="text-success"><u>Terms &amp; Conditions</u></Link> and <Link href="#!"
                            className="text-success"><u>Privacy Policy</u></Link>
                        </label>
                    </div>
                </div>
            </div>
            <div className="xl:col-span-12 col-span-12 grid mt-2">
                  <button type="button" className="ti-btn ti-btn-lg bg-primary text-white 
                      !font-medium dark:border-defaultborder/10">
                      Create Account
                  </button>
            </div>
        </div>
    </CForm>
   </>
  )
}

export default RegisterForm