"use client"

import {FC} from 'react'
import UserEditGroupButtons from './user-edit-group-buttons';
import UserEditButton from './user-edit-button';
import * as z from "zod";
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/shared/shadcn/components/ui/form';
import { useAppSelector } from '@/shared/redux/hooks';
import { UpdateContactInfoRequest } from '@/models/user.models';
import { useParams } from 'next/navigation';
import {  userLocationSelector } from '@/shared/redux/features/users/usersSlice';
import { useTranslations } from 'next-intl';
import { useMutateUserDetails } from '../hooks/useMutateUserDetails';
import { UpldateUserContactInfoSchema } from '@/schemas/user.schemas';


type Inputs = z.infer<typeof UpldateUserContactInfoSchema>
interface Props{
    email:string;
    phone?:string;
    country?:string;
    city?:string;
    state?:string;
    zipCode?:string;
    address?:string;
    isLoading:boolean;
    canEditUser:boolean;
}

const ContactInformation:FC<Props> = ({
    email,
    phone,
    country,
    city,
    state,
    zipCode,
    address,
    isLoading = false,
    canEditUser
}) => {
    const t = useTranslations();
    const location = useAppSelector(userLocationSelector);
    const params = useParams<{locale:string,uuid:string}>();

    const {
        isEdit,
        setIsEdit,
        mutationLoading,
        handleUpdateContanctInfoMutation
    } = useMutateUserDetails();

    const handleEditButtonClick = () => {
        setIsEdit(prev => !prev);
    };

    const formId="contact-form";

    const form = useForm<Inputs>({
        resolver: zodResolver(UpldateUserContactInfoSchema),
        defaultValues:{
            email,
            phone,
            country,
            city,
            state,
            zip:zipCode,
            address,
        }
    });


    const onSubmit: SubmitHandler<Inputs> = async (data) =>{
       const request:UpdateContactInfoRequest={...data}
       handleUpdateContanctInfoMutation(params.uuid,request);
    };
    
    return (
        <div className="p-6 border-b border-dashed dark:border-defaultborder/10">
            <section className="flex items-center justify-between">
                <p className="text-[.9375rem] mb-2 me-6 font-semibold">
                    {t("USERS.DETAILS.LABELS.contact-information")}:
                </p>
                {canEditUser && isEdit && (
                    <UserEditGroupButtons 
                        onCancelClick={handleEditButtonClick} 
                        fomrId={formId}
                        isLoading={mutationLoading}/>
                )}
                {canEditUser && !isEdit && (
                    <UserEditButton onClick={handleEditButtonClick} />
                )}
            </section>
            <div className="text-[#8c9097] dark:text-white/50">
                <Form {...form} >
                    <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex items-center mb-2">
                            <span className="avatar avatar-sm avatar-rounded me-2 bg-light text-[#8c9097] dark:text-white/50">
                                <i className="ri-mail-line align-middle text-[.875rem] text-[#8c9097] dark:text-white/50"></i>
                            </span>
                            {isLoading && (
                                <div role="status" className="animate-pulse">
                                    <div className="w-32 h-3 bg-gray-400 rounded-full dark:bg-gray-700"></div>
                                </div>
                            )}
                            {!isLoading && isEdit && (
                                <section className="col-span-12 mb-3 xl:col-span-12">
                                    <input 
                                        {...form.register("email")}
                                        size={20}
                                        disabled={mutationLoading}
                                        type="email"
                                        placeholder={t("USERS.DETAILS.LABELS.email")}
                                        className="form-control w-full !rounded-md"/>
                                </section>
                            ) }
                            {!isLoading && !isEdit && (
                                <>
                                    {email}
                                </>
                            ) }
                        </div>
                        <div className="flex items-center mb-2">
                            <span className="avatar avatar-sm avatar-rounded me-2 bg-light text-[#8c9097] dark:text-white/50">
                                <i className="ri-phone-line align-middle text-[.875rem] text-[#8c9097] dark:text-white/50"></i>
                            </span>
                            {isLoading && (
                                <div role="status" className="animate-pulse">
                                    <div className="h-3 bg-gray-400 rounded-full w-28 dark:bg-gray-700"></div>
                                </div>
                            )}
                            {!isLoading && isEdit && (
                                <section className="col-span-12 mb-3 xl:col-span-12">
                                    <input 
                                        {...form.register("phone")}
                                        disabled={mutationLoading}
                                        size={20}
                                        type="tel"
                                        placeholder={t("USERS.DETAILS.LABELS.phone")}
                                        className="form-control w-full !rounded-md"/>
                                </section>
                            ) }
                            {!isLoading && !isEdit && (
                                <>
                                    {phone}
                                </>
                            ) }
                        </div>
                        <div className="flex items-center mb-0">
                            <span className="avatar avatar-sm avatar-rounded me-2 bg-light text-[#8c9097] dark:text-white/50">
                                <i className="ri-map-pin-line align-middle text-[.875rem] text-[#8c9097] dark:text-white/50"></i>
                            </span>
                            {isLoading && (
                                <div role="status" className="animate-pulse">
                                    <div className="w-56 h-3 bg-gray-400 rounded-full dark:bg-gray-700"></div>
                                </div>
                            )}
                            {!isLoading && isEdit && (
                                <section className="flex flex-col gap-3 mb-3">
                                    <div className="flex flex-row gap-2">
                                        <input 
                                            {...form.register("address")}
                                            size={20}
                                            disabled={mutationLoading}
                                            type="text"
                                            placeholder={t("USERS.DETAILS.LABELS.address")}
                                            className="form-control !rounded-md"/>
                                        <input 
                                            {...form.register("city")}
                                            size={20}
                                            disabled={mutationLoading}
                                            type="text"
                                            placeholder={t("USERS.DETAILS.LABELS.city")}
                                            className="form-control  !rounded-md"/>
                                        <input 
                                            {...form.register("state")}
                                            size={20}
                                            disabled={mutationLoading}
                                            type="text"
                                            placeholder={t("USERS.DETAILS.LABELS.state")}
                                            className="form-control  !rounded-md"/>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <input 
                                            {...form.register("country")}
                                            size={20}
                                            disabled={mutationLoading}
                                            type="text"
                                            placeholder={t("USERS.DETAILS.LABELS.country")}
                                            className="form-control  !rounded-md"/>
                                        <input 
                                            {...form.register("zip")}
                                            size={20}
                                            disabled={mutationLoading}
                                            type="text"
                                            placeholder={t("USERS.DETAILS.LABELS.zip")}
                                            className="form-control  !rounded-md"/>
                                    </div>
                                </section>
                            ) }
                            {!isLoading && !isEdit && (
                                <>
                                    {location}
                                </>
                            ) }
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default ContactInformation