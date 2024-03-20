"use client";

import { RegisterSchema } from '@/schemas/auth.schemas';
import CForm from '@/shared/components/form/cform'
import * as z from "zod";
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import CFormInput from '@/shared/components/form-input/cform-input';

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
            <CFormInput 
                type='text'
                required={true}
                name='firstName' 
                label='First Name'
                placeholder="first name"
                className={"w-full !rounded-md"}
                props={register("firstName")}
                error={errors.firstName?.message}/>
            <CFormInput 
                type='text'
                required={true}
                name='lastname' 
                label='Last Name'
                placeholder="last name"
                className={"w-full !rounded-md"}
                props={register("lastName")}
                error={errors.lastName?.message}/>
            <CFormInput 
                type='email'
                required={true}
                name='email' 
                label='Email'
                placeholder="Email"
                className={"w-full !rounded-md"}
                props={register("email")}
                error={errors.email?.message}/>
            <CFormInput 
                type='text'
                required={true}
                name='username' 
                label='Username'
                placeholder="Username"
                className={"w-full !rounded-md"}
                props={register("username")}
                error={errors.username?.message}/>
            
            <div className="xl:col-span-12 col-span-12">
                <label htmlFor="password" className="form-label text-default">Password</label>
                <div className="input-group">
                    <input type={(showPassword) ? 'text' : "password"}
                        className="form-control form-control-lg !rounded-e-none"
                        id="password" placeholder="password" autoComplete="password" {...register("password")}/>
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
            </div>
            <div className="xl:col-span-12 col-span-12 mb-2">
                <label htmlFor="confirmpassword" className="form-label text-default">Confirm
                    Password</label>
                <div className="input-group">
                    <input type={(showConfirmPassword) ? 'text' : "password"}
                        className="form-control form-control-lg !rounded-e-none"
                        id="confirmpassword" placeholder="confirm password" autoComplete="new-password" {...register("confirmPassword")}/>
                    <button onClick={()=>setConfirmShowPassword(!showConfirmPassword)}  aria-label="button" 
                        className="ti-btn ti-btn-light !rounded-s-none !mb-0" type="button" id="button-addon21">
                        <i className={`${showConfirmPassword ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}></i>
                    </button>
                    {errors.confirmPassword && (
                        <p className="text-xs italic text-red-500 mt-2">
                        {errors.confirmPassword?.message}
                        </p>
                    )}
                </div>
                
            </div>
            <div className="xl:col-span-12 col-span-12">
                <div className="form-check !flex !ps-0">
                    <input className="form-check-input me-1" type="checkbox" value="" id="defaultCheck1"/>
                    <label className="ps-2 form-check-label text-[#8c9097] dark:text-white/50 font-normal block" htmlFor="defaultCheck1">
                        By creating a account you agree to our <Link href="/components/pages/terms&conditions/"
                        className="text-success"><u>Terms &amp; Conditions</u></Link> and <Link href="#!"
                        className="text-success"><u>Privacy Policy</u></Link>
                    </label>
                </div>
            </div>
            <div className="xl:col-span-12 col-span-12 grid mt-2">
                  <button type="submit" className="ti-btn ti-btn-lg bg-primary text-white 
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