"use client";

import { RegisterSchema } from '@/schemas/auth.schemas';
import CForm from '@/shared/components/form/cform'
import * as z from "zod";
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import CFormInput from '@/shared/components/form-input/cform-input';
import CButton from '@/shared/components/button/cbutton';
import { useRouter } from 'next/navigation';
import { useRegisterUserMutation } from '@/shared/redux/features/authApiSlice';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/shared/redux/hooks';
import { setLoading } from '@/shared/redux/features/authSlice';

type RegisterSchema = z.infer<typeof RegisterSchema>;

const RegisterForm = () => {
    const router = useRouter();
    const [registerUser, { isLoading }] = useRegisterUserMutation();
    const dispatch = useAppDispatch();

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

    const handleError =(error:ErrorResponse)=>{
		const {status, data:{detail}} = error;
		toast.error(`(${status}) ${detail}`);
	}

    const onSubmit:SubmitHandler<RegisterSchema> = (values: RegisterSchema) =>{
        const {username,password,email,firstName,lastName,confirmPassword} = values;
        const request:CreateUserRequest={
            email,
            first_name:firstName,
            last_name:lastName,
            password,
            username,
            password2:confirmPassword
        }
        dispatch(setLoading(true));
        registerUser(request)
			.unwrap()
			.then(() => {
				toast.success('Please check email to verify account');
				router.push('/auth/login');
			})
			.catch((error:ErrorResponse) => {
				handleError(error);
			});
    }

    return (
    <>
        <CForm onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 gap-y-4">
                <CFormInput 
                    type='text'
                    required={true}
                    name='firstName' 
                    placeholder="First Name"
                    className={"w-full !rounded-md"}
                    props={register("firstName")}
                    error={errors.firstName?.message}>
                        First Name
                </CFormInput>
                <CFormInput 
                    type='text'
                    required={true}
                    name='lastname' 
                    placeholder="Last Name"
                    className={"w-full !rounded-md"}
                    props={register("lastName")}
                    error={errors.lastName?.message}>
                        Last Name
                </CFormInput>
                <CFormInput 
                    type='email'
                    required={true}
                    name='email' 
                    placeholder="Email"
                    className={"w-full !rounded-md"}
                    props={register("email")}
                    error={errors.email?.message}>
                        Email
                </CFormInput>
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
                    autoComplete="new-password"
                    className={"!rounded-e-none"}
                    props={register("password")}
                    error={errors.password?.message}>
                        Password
                </CFormInput>
                <CFormInput 
                    type='password'
                    required={true}
                    name='confirmpassword' 
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                    className={"!rounded-e-none"}
                    props={register("confirmPassword")}
                    error={errors.confirmPassword?.message}>
                        Confirm Password
                </CFormInput>
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
                    <CButton 
                        intent="violet" 
                        size="md" 
                        type="submit">
                        Create Account
                    </CButton>
                </div>
            </div>
        </CForm>
    </>
    )
}

export default RegisterForm