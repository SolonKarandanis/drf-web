"use client";

import React from 'react'
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


type Inputs = z.infer<typeof UserSearchSchema>

const SearchUserForm = () => {
    const form = useForm<Inputs>({resolver: zodResolver(UserSearchSchema)})
    return (
        <Form {...form}>
            <form className="space-y-8">
                <div className="flex gap-2">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
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
                        <FormItem>
                            <FormLabel>User Role</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                        name="isActive"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Is Active</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="true">Yes</SelectItem>
                                    <SelectItem value="false">No</SelectItem>
                                </SelectContent> 
                            </Select>
                        </FormItem>
                        )}
                    />
                </div>
               
                <div className='pt-5 mt-8'>
                    <div className='flex justify-between'>
                        <Button type="submit" variant="outline">Search</Button>
                        <Button type="reset" variant="destructive">Clear</Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default SearchUserForm