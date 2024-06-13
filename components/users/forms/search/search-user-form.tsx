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
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from "@/shared/redux/hooks";
import { useSearchUsersMutation } from '@/shared/redux/features/users/usersApiSlice';
import { UserSearchRequest, UserSearchResponse } from '@/models/search.models';
import { UserStatus } from '@/models/user.models';
import { ErrorResponse } from '@/models/error.models';
import { setUsers,resetUsers } from '@/shared/redux/features/users/usersSlice';
import { useTranslations } from 'next-intl';
import ButtonLoading from '@/shared/components/button-loading/button-loading';


type Inputs = z.infer<typeof UserSearchSchema>

interface Props{

}

const SearchUserForm:FC<Props> = ({}) => {
    const t = useTranslations();
    

    const dispatch = useAppDispatch();
    const [search, { isLoading, }] = useSearchUsersMutation();
    const form = useForm<Inputs>({
        resolver: zodResolver(UserSearchSchema),
        defaultValues:{
            email:"",
            name:"",
            username:"",
            role:0,
            status:"ACTIVE"
        }
    })

    const usersState = useAppSelector((state) => state.users);
    const paging = usersState.paging;

    const handleError =(errorResponse:ErrorResponse)=>{
		const {status, data:{detail}} = errorResponse;
		toast.error(`(${status}) ${detail}`);
	}

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const {username,email,name,role,status} = data;
        const request:UserSearchRequest={
            username,
            email,
            name,
            role,
            status: UserStatus[status as keyof typeof UserStatus],
            paging
        }
        search(request)
        .unwrap()
        .then((response:UserSearchResponse ) => {
            dispatch(setUsers(response));
        })
        .catch((error:ErrorResponse) => {
            handleError(error);
        });
    }

    const clear =() =>{
        dispatch(resetUsers())
    }

    return (
        <Form {...form}>
            <form className="space-y-8" 
                onSubmit={form.handleSubmit(onSubmit)}
                data-testid="form">
                <div className="flex gap-2">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                        <FormItem data-testid="username">
                            <FormLabel>Username</FormLabel>
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
                            <FormLabel>Name</FormLabel>
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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input 
                                    data-testid="input-email" 
                                    {...field} />
                            </FormControl>
                        </FormItem>
                        )}
                    />
                </div>
                <div className="flex gap-2">
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                        <FormItem data-testid="role">
                            <FormLabel>User Role</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue="">
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="1">Buyer</SelectItem>
                                    <SelectItem value="2">Seller</SelectItem>
                                </SelectContent> 
                            </Select>
                        </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                        <FormItem data-testid="status">
                            <FormLabel>User Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue="user.active">
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="ACTIVE">Active</SelectItem>
                                    <SelectItem value="UNVERIFIED">Unverified</SelectItem>
                                    <SelectItem value="DEACTIVATED">Deactivated</SelectItem>
                                    <SelectItem value="DELETED">Deleted</SelectItem>
                                </SelectContent> 
                            </Select>
                        </FormItem>
                        )}
                    />
                   
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