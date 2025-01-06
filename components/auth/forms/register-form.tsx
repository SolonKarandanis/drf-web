"use client";

import { RegisterUserSchema,getRegisterUserSchema } from '@/schemas/auth.schemas';
import CForm from '@/shared/components/form/cform'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import FormInput from '@/shared/components/form-input/form-input';
import FormButton from '@/shared/components/button/form-button';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import FormSelect from '@/shared/components/form-select/form-select';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { passwordStrength } from "check-password-strength";
import PasswordStrength from '@/shared/components/password-strength/password-strength';
import { ValidationError } from '@/models/error.models';
import { registerUser } from '@/actions/register-user';
import { Options } from '@/shared/components/props';
import { useGetUserGroups } from '@/components/users/hooks/useGetUserGroups';


const RegisterForm = () => {
    const t = useTranslations();
    const formT = useTranslations("USERS.VALIDATION");
    const rform='REGISTER.FORM';
    const router = useRouter();
    const {
        userGroups
    } = useGetUserGroups();
    const userGroupsOptions = userGroups.map((group)=> {
        return {
            value:group.id,
            label:group.name
        } as Options
    })

    
    const {
        register,
        handleSubmit,
        control,
        formState: { errors,isSubmitting, isValid },
        watch,
    } = useForm<RegisterUserSchema>({
        resolver: zodResolver(getRegisterUserSchema(formT)),
        defaultValues: {
            firstName:"",
            lastName:"",
            role:2,
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
                        toast.error(`(${status}) [${key}] ${value}`);
                    }
                    
                })
                break;
        }
	}

    const onSubmit:SubmitHandler<RegisterUserSchema> = async (values: RegisterUserSchema) =>{
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
                <FormInput 
                    type='text'
                    required={true}
                    name='firstName' 
                    placeholder={t(`${rform}.LABELS.first-name`)}
                    className={"w-full !rounded-md"}
                    sectionClassName="col-span-12 xl:col-span-12"
                    props={register("firstName")}
                    error={errors.firstName?.message}>
                       {t(`${rform}.LABELS.first-name`)}
                </FormInput>
                <FormInput 
                    type='text'
                    required={true}
                    name='lastname' 
                    placeholder={t(`${rform}.LABELS.last-name`)}
                    className={"w-full !rounded-md"}
                    sectionClassName="col-span-12 xl:col-span-12"
                    props={register("lastName")}
                    error={errors.lastName?.message}>
                        {t(`${rform}.LABELS.last-name`)}
                </FormInput>
                <FormInput 
                    type='email'
                    required={true}
                    name='email' 
                    placeholder={t(`${rform}.LABELS.email`)}
                    className={"w-full !rounded-md"}
                    sectionClassName="col-span-12 xl:col-span-12"
                    props={register("email")}
                    error={errors.email?.message}>
                        {t(`${rform}.LABELS.email`)}
                </FormInput>
                <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                        <FormSelect 
                            name="role"
                            options={userGroupsOptions}
                            required={true}
                            sectionClassName="col-span-12 xl:col-span-12"
                            field={field}
                            error={errors.role?.message}>
                                {t(`${rform}.LABELS.role`)}
                        </FormSelect>
                    )}
                />          
                <FormInput 
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
                </FormInput>
                <FormInput
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
                </FormInput>
                <PasswordStrength passStrength={passStrength} />
                <FormInput 
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
                </FormInput>
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
                    <FormButton 
                        intent="violet" 
                        size="md" 
                        type="submit"
                        isDisabled={isSubmitting || !isValid}>
                            {t(`${rform}.BUTTONS.create-account`)}
                    </FormButton>
                </div>
            </div>
        </CForm>
    </>
    )
}

export default RegisterForm