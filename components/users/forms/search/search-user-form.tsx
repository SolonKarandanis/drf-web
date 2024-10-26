"use client";

import {FC} from 'react'
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { UserSearchSchema } from "@/schemas/search.schemas";
import { Button } from "@/shared/shadcn/components/ui/button";
import { Input } from "@/shared/shadcn/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/shadcn/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/shadcn/components/ui/select"
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { useLazyGetAllGroupsQuery } from '@/shared/redux/features/users/usersApiSlice';
import { UserSearchRequest } from '@/models/search.models';
import { UserStatus } from '@/models/user.models';
import {
    resetUsers,
    setSearchRequest,
    resetSearchRequest, 
    initialRequest, 
    setUserGroups, 
    UsersState 
} from '@/shared/redux/features/users/usersSlice';
import { useTranslations } from 'next-intl';
import ButtonLoading from '@/shared/components/button-loading/button-loading';
import { useGetUserSearchResults } from '../../hooks/useGetUserSearchResults';


type Inputs = z.infer<typeof UserSearchSchema>

interface Props{

}

const SearchUserForm:FC<Props> = ({}) => {
    const t = useTranslations();
    const [getAllGroups] = useLazyGetAllGroupsQuery();
    const usersState: UsersState = useAppSelector((state) => state.users);
    if(usersState.userGroups.length===0){
        getAllGroups()
            .unwrap()
            .then((groups) => dispatch(setUserGroups(groups)))
    }
    const userGroups = usersState.userGroups

    const {
        handleGetSearchResults,
        isLoading,
    } = useGetUserSearchResults();

    const dispatch = useAppDispatch();

    const searchRequest = usersState.request
    const paging = searchRequest.paging
    
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
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                            <FormItem data-testid="username">
                                <FormLabel>{t("USERS.SEARCH.FORM.LABELS.username")}</FormLabel>
                                <FormControl>
                                    <Input 
                                        data-testid="input-username"
                                        {...field} />
                                </FormControl>
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                            <FormItem data-testid="name">
                                <FormLabel>{t("USERS.SEARCH.FORM.LABELS.name")}</FormLabel>
                                <FormControl>
                                    <Input 
                                        data-testid="input-name" 
                                        {...field} />
                                </FormControl>
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                            <FormItem data-testid="email">
                                <FormLabel>{t("USERS.SEARCH.FORM.LABELS.email")}</FormLabel>
                                <FormControl>
                                    <Input 
                                        data-testid="input-email" 
                                        {...field} />
                                </FormControl>
                            </FormItem>
                            )}
                        />
                    </div>
                    <div className="">
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                            <FormItem data-testid="role">
                                <FormLabel>{t("USERS.SEARCH.FORM.LABELS.role")}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue="" >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {userGroups.map((group)=>(
                                            <SelectItem 
                                                key={group.id}
                                                value={String(group.id)}>
                                                {group.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent> 
                                </Select>
                            </FormItem>
                            )}
                        />
                        {errors.role? (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                {errors.role?.message}
                            </p>
                        ): null}

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                            <FormItem data-testid="status">
                                <FormLabel>{t("USERS.SEARCH.FORM.LABELS.status")}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue="">
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="ACTIVE">
                                            {t("USERS.SEARCH.FORM.LABELS.status-active")}
                                        </SelectItem>
                                        <SelectItem value="UNVERIFIED">
                                            {t("USERS.SEARCH.FORM.LABELS.status-unverified")}
                                        </SelectItem>
                                        <SelectItem value="DEACTIVATED">
                                            {t("USERS.SEARCH.FORM.LABELS.status-deactivated")}
                                        </SelectItem>
                                        <SelectItem value="DELETED">
                                            {t("USERS.SEARCH.FORM.LABELS.status-deleted")}
                                        </SelectItem>
                                    </SelectContent> 
                                </Select>
                            </FormItem>
                            )}
                        />
                        {errors.status? (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                {errors.status?.message}
                            </p>
                        ): null}
                    
                    </div>
                </div>
                <div className='pt-5 mt-8' data-testid="buttons">
                    <div className='flex justify-between'>
                        <Button 
                            type="submit" 
                            variant="outline"
                            disabled={isLoading}>
                            {isLoading ? 
                                <ButtonLoading /> : 
                                t(`GLOBAL.BUTTONS.search`)
                            }
                            
                        </Button>
                        <Button 
                            type="reset" 
                            variant="destructive"
                            disabled={isLoading}
                            onClick={clear}>
                            {t(`GLOBAL.BUTTONS.reset`)}
                        </Button>
                    </div>
                </div>
            </form>
        </Form> 
    )
}

export default SearchUserForm