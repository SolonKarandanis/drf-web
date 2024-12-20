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
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/shared/redux/hooks';
import CFormSelect from '@/shared/components/form-select/cform-select';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { passwordStrength } from "check-password-strength";
import PasswordStrength from '@/shared/components/password-strength/password-strength';
import { ValidationError } from '@/models/error.models';
import { useLazyGetAllGroupsQuery } from '@/shared/redux/features/users/usersApiSlice';
import { registerUser } from '@/actions/register-user';
import { setUserGroups } from '@/shared/redux/features/users/usersSlice';
import { Options } from '@/shared/components/props';

type RegisterSchema = z.infer<typeof RegisterSchema>;


const RegisterForm = () => {
    const t = useTranslations();
    const rform='REGISTER.FORM';
    const router = useRouter();
    const [getAllGroups] = useLazyGetAllGroupsQuery();
    const dispatch = useAppDispatch();
    const usersState = useAppSelector((state) => state.users);
    const userGroups = usersState.userGroups.map((group)=> {
        return {
            value:group.id,
            label:group.name
        } as Options
    })

    useEffect(()=>{
        getAllGroups()
            .unwrap()
            .then((groups) => dispatch(setUserGroups(groups)))
    },[])
    
    const {
        register,
        handleSubmit,
        formState: { errors,isSubmitting, isValid },
        watch
    } = useForm<RegisterSchema>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            firstName:"",
            lastName:"",
            role:"",
            email:"",
            username: "",
            password: "",
            confirmPassword:""
        },
    });

    const [passStrength,setPassStrength]= useState<number>(0);

    useEffect(() => {
        const strength =passwordStrength(watch().password);
        setPassStrength(strength.id);
    }, [watch]);

    const handleError =(error:ValidationError)=>{
        switch (error.kind){
            case "client":
                toast.error(`${error}`);
                break;
            case "backend":
                const {status, data} = error;
                Object.values(data).forEach(dataValue =>{
                    for (const [key, value] of Object.entries(dataValue)) {
                        toast.error(`(${status}) ${value}`);
                    }
                    
                })
                break;
        }
	}

    const onSubmit:SubmitHandler<RegisterSchema> = async (values: RegisterSchema) =>{
        const response = await registerUser(values);
        if (response) {
            handleError(response);
        } else {
            toast.success(t(`${rform}.SUCCESS.summary`));
            router.push('/auth/login');
        }
    }

    return (
    <>
        <CForm onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 gap-y-4">
                <CFormInput 
                    type='text'
                    required={true}
                    name='firstName' 
                    placeholder={t(`${rform}.LABELS.first-name`)}
                    className={"w-full !rounded-md"}
                    sectionClassName="col-span-12 xl:col-span-12"
                    props={register("firstName")}
                    error={errors.firstName?.message}>
                       {t(`${rform}.LABELS.first-name`)}
                </CFormInput>
                <CFormInput 
                    type='text'
                    required={true}
                    name='lastname' 
                    placeholder={t(`${rform}.LABELS.last-name`)}
                    className={"w-full !rounded-md"}
                    sectionClassName="col-span-12 xl:col-span-12"
                    props={register("lastName")}
                    error={errors.lastName?.message}>
                        {t(`${rform}.LABELS.last-name`)}
                </CFormInput>
                <CFormInput 
                    type='email'
                    required={true}
                    name='email' 
                    placeholder={t(`${rform}.LABELS.email`)}
                    className={"w-full !rounded-md"}
                    sectionClassName="col-span-12 xl:col-span-12"
                    props={register("email")}
                    error={errors.email?.message}>
                        {t(`${rform}.LABELS.email`)}
                </CFormInput>
                <CFormSelect 
                    name="role"
                    options={userGroups}
                    required={true}
                    inputProps={register("role")}
                    className="text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    sectionClassName="col-span-12 xl:col-span-12"
                    autoComplete='role-name'
                    error={errors.role?.message}>
                        {t(`${rform}.LABELS.role`)}
                </CFormSelect>
                <CFormInput 
                    type='text'
                    required={true}
                    name='username' 
                    placeholder={t(`${rform}.LABELS.username`)}
                    autoComplete="username"
                    className={"w-full !rounded-md"}
                    sectionClassName="col-span-12 xl:col-span-12"
                    props={register("username")}
                    error={errors.username?.message}>
                        {t(`${rform}.LABELS.username`)}
                </CFormInput>
                <CFormInput
                    type='password'
                    required={true}
                    name='password' 
                    placeholder={t(`${rform}.LABELS.password`)}
                    autoComplete="new-password"
                    className={"!rounded-e-none"}
                    sectionClassName="col-span-12 xl:col-span-12"
                    props={register("password")}
                    error={errors.password?.message}>
                        {t(`${rform}.LABELS.password`)}
                </CFormInput>
                <PasswordStrength passStrength={passStrength} />
                <CFormInput 
                    type='password'
                    required={true}
                    name='confirmpassword' 
                    placeholder={t(`${rform}.LABELS.confirm-password`)}
                    autoComplete="new-password"
                    className={"!rounded-e-none"}
                    sectionClassName="col-span-12 xl:col-span-12"
                    props={register("confirmPassword")}
                    error={errors.confirmPassword?.message}>
                        {t(`${rform}.LABELS.confirm-password`)}
                </CFormInput>
                <div className="col-span-12 xl:col-span-12">
                    <div className="form-check !flex !ps-0">
                        <input className="form-check-input me-1" type="checkbox" value="" id="defaultCheck1"/>
                        <label className="ps-2 form-check-label text-[#8c9097] dark:text-white/50 font-normal block" htmlFor="defaultCheck1">
                        {/* /components/pages/terms&conditions/ */}
                            {t(`${rform}.LABELS.terms-description`)} <Link href="/en"
                            className="text-success"><u>{t(`${rform}.LABELS.terms`)} &amp; {t(`${rform}.LABELS.conditions`)}</u></Link> and <Link href="#!"
                            className="text-success"><u>{t(`${rform}.LABELS.privacy-policy`)}</u></Link>
                        </label>
                    </div>
                </div>
                <div className="grid col-span-12 mt-2 xl:col-span-12">
                    <CButton 
                        intent="violet" 
                        size="md" 
                        type="submit"
                        isDisabled={isSubmitting || !isValid}>
                            {t(`${rform}.BUTTONS.create-account`)}
                    </CButton>
                </div>
            </div>
        </CForm>
    </>
    )
}

export default RegisterForm