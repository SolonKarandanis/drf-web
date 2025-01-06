"use client"

import { useTranslations } from 'next-intl';
import {FC} from 'react'
import UserEditButton from './user-edit-button';
import UserEditGroupButtons from './user-edit-group-buttons';

import * as z from "zod";
import {SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/shared/shadcn/components/ui/form';
import { useParams } from 'next/navigation';
import { UpdateBioRequest } from '@/models/user.models';
import { useMutateUserDetails } from '../hooks/useMutateUserDetails';
import { UpdateUserBioSchema } from '@/schemas/user.schemas';
import FormTextArea from '@/shared/components/form-textarea/form-textarea';

type Inputs = z.infer<typeof UpdateUserBioSchema>
interface Props{
    isLoading:boolean;
    canEditUser:boolean;
}

const Bio:FC<Props> = ({
    isLoading,
    canEditUser
}) => {
    const t = useTranslations();
    const {
        isEdit,
        setIsEdit,
        mutationLoading,
        handleUpdateBioMutation,
        user,
    } = useMutateUserDetails();


    const params = useParams<{locale:string,uuid:string}>();
    const formId="bio-form";

    const form = useForm<Inputs>({
        resolver: zodResolver(UpdateUserBioSchema),
        defaultValues:{
            bio:user!.bio
        }
    })

    const onSubmit: SubmitHandler<Inputs> = async (data) =>{
        const {bio} = data;
        const request:UpdateBioRequest={
            bio
        }
        handleUpdateBioMutation(params.uuid,request);
    }

    const handleEditButtonClick = () => {
        setIsEdit(prev => !prev);
    };

    
    return (
        <div className="items-center justify-between p-6 border-b border-dashed dark:border-defaultborder/10 md:flex">
          <div className="w-full mb-6 ">
            <section className="flex items-center justify-between">
                <p className="text-[.9375rem] mb-2 font-semibold">{t("USERS.DETAILS.LABELS.bio")}:</p>
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
            {isLoading && (
                <div role="status" className="w-full rounded animate-pulse dark:border-gray-700">
                    <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-400 rounded-full dark:bg-gray-700"></div>
                </div>
            )}
            {!isLoading && isEdit && (
                <Form {...form} >
                    <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
                        <FormTextArea
                            name="bio"
                            props={form.register("bio")}
                            sectionClassName="col-span-12 mt-3 mb-0 xl:col-span-12">
                        </FormTextArea>
                    </form>
                </Form>
            )}
            {!isLoading && !isEdit && (
                <p className="text-[0.75rem] text-[#8c9097] dark:text-white/50 opacity-[0.7] mb-0 mt-3">
                    {user?.bio}
                </p>
            ) }
          </div>
        </div>
    )
}

export default Bio