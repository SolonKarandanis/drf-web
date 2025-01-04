"use client";

import {FC} from 'react'
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { UserSearchSchema } from "@/schemas/search.schemas";
import {
  Form,
} from "@/shared/shadcn/components/ui/form";
import { useAppDispatch } from "@/shared/redux/hooks";
import { UserSearchRequest } from '@/models/search.models';
import { UserStatus } from '@/models/user.models';
import {
    resetUsers,
    setSearchRequest,
    resetSearchRequest, 
    initialRequest, 
} from '@/shared/redux/features/users/usersSlice';
import { useTranslations } from 'next-intl';
import { useGetUserSearchResults } from '../../hooks/useGetUserSearchResults';
import { useGetUserGroups } from '../../hooks/useGetUserGroups';
import FormInput from '@/shared/components/form-input/form-input';
import FormButton from '@/shared/components/button/form-button';
import FormSelect from '@/shared/components/form-select/form-select';
import { Options } from '@/shared/components/props';


type Inputs = z.infer<typeof UserSearchSchema>

interface Props{

}

const SearchUserForm:FC<Props> = ({}) => {
    const t = useTranslations();

    const {
        userGroups
    } = useGetUserGroups();

    const {
        handleGetSearchResults,
        isLoading,
        searchRequest,
    } = useGetUserSearchResults();

    const dispatch = useAppDispatch();

    const paging = searchRequest.paging

    const groupOptions = userGroups.map((group)=> {
            return {
                value:group.id,
                label:group.name
            } as Options
    })

    const statusOptions:Options[] = [
        {value:'ACTIVE',label:t("USERS.SEARCH.FORM.LABELS.status-active")},
        {value:'UNVERIFIED',label:t("USERS.SEARCH.FORM.LABELS.status-unverified")},
        {value:'DEACTIVATED',label:t("USERS.SEARCH.FORM.LABELS.status-deactivated")},
        {value:'DELETED',label:t("USERS.SEARCH.FORM.LABELS.status-deleted")}
    ]
    
    const form = useForm<Inputs>({
        resolver: zodResolver(UserSearchSchema),
        defaultValues:{
            email:initialRequest.email,
            name:initialRequest.name,
            username:initialRequest.username,
            role:String(initialRequest.role),
            status:undefined
        }
    })
    const {errors} = form.formState


    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const {username,email,name,role,status} = data;
        const request:UserSearchRequest={
            username,
            email,
            name,
            role: Number(role),
            status: UserStatus[status as keyof typeof UserStatus],
            paging
        }
        dispatch(setSearchRequest(request));
        handleGetSearchResults(request);
    }

    const clear =() =>{
        form.reset()
        dispatch(resetSearchRequest());
        dispatch(resetUsers());
    }

    return (
        <Form {...form} >
            <form className="space-y-8" 
                onSubmit={form.handleSubmit(onSubmit)}
                data-testid="form">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
                    <div className="grid grid-cols-1">
                        <FormInput 
                            type='text'
                            required={true}
                            name='username' 
                            placeholder={t(`USERS.SEARCH.FORM.LABELS.username`)}
                            className={"w-full !rounded-md"}
                            sectionClassName="mb-2"
                            props={form.register("username")}
                            error={errors.username?.message}>
                            {t(`USERS.SEARCH.FORM.LABELS.username`)}
                        </FormInput>
                        <FormInput 
                            type='text'
                            required={true}
                            name='name' 
                            placeholder={t(`USERS.SEARCH.FORM.LABELS.name`)}
                            className={"w-full !rounded-md"}
                            sectionClassName="mb-2"
                            props={form.register("name")}
                            error={errors.name?.message}>
                            {t(`USERS.SEARCH.FORM.LABELS.name`)}
                        </FormInput>
                        <FormInput 
                            type='text'
                            required={true}
                            name='email' 
                            placeholder={t(`USERS.SEARCH.FORM.LABELS.email`)}
                            className={"w-full !rounded-md"}
                            sectionClassName="mb-2"
                            props={form.register("email")}
                            error={errors.email?.message}>
                            {t(`USERS.SEARCH.FORM.LABELS.email`)}
                        </FormInput>
                    </div>
                    <div>
                        <Controller
                            name="role"
                            control={form.control}
                            render={({ field }) => (
                                <FormSelect 
                                    name="role"
                                    options={groupOptions}
                                    sectionClassName="mb-2"
                                    onChange={(( option ) => field.onChange(option!.value))}
                                    error={errors.role?.message}>
                                        {t("USERS.SEARCH.FORM.LABELS.role")}
                                </FormSelect>
                            )}
                        />
                        <Controller
                            name="status"
                            control={form.control}
                            render={({ field }) => (
                                <FormSelect 
                                    name="status"
                                    options={statusOptions}
                                    required={true}
                                    sectionClassName="mb-2"
                                    onChange={(( option ) => field.onChange(option!.value))}
                                    error={errors.status?.message}>
                                        {t("USERS.SEARCH.FORM.LABELS.status")}
                                </FormSelect>
                            )}
                        />
                    </div>
                </div>
                <div className='pt-5 mt-8' data-testid="buttons">
                    <div className='flex justify-between'>
                        <FormButton 
                            intent="info" 
                            size="md" 
                            type="submit"
                            isLoading={isLoading}
                            isDisabled={isLoading}>
                                {t(`GLOBAL.BUTTONS.search`)}
                        </FormButton>
                        <FormButton 
                            intent="danger" 
                            size="md" 
                            type="reset"
                            isDisabled={isLoading}
                            onClick={clear}>
                                {t(`GLOBAL.BUTTONS.reset`)}
                        </FormButton>
                    </div>
                </div>
            </form>
        </Form> 
    )
}

export default SearchUserForm