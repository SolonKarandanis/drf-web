"use client";

import { getResetPasswordSchema, ResetPasswordSchema } from "@/schemas/auth.schemas";
import { Button } from "@/shared/shadcn/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/shared/shadcn/components/ui/form";
import { Input } from "@/shared/shadcn/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutateUserDetails } from "../hooks/useMutateUserDetails";
import { ChangePasswordRequest } from "@/models/user.models";
import ButtonLoading from "@/shared/components/button-loading/button-loading";



const ChangePassword = () => {
    const t = useTranslations();
    const formT = useTranslations("USERS.VALIDATION");
    const {
        mutationLoading,
        handleChangePasswordMutation,
        user,
    } = useMutateUserDetails();

    const form = useForm<ResetPasswordSchema>({
        resolver: zodResolver(getResetPasswordSchema(formT)),
        defaultValues: {
            email: user?.email,
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit: SubmitHandler<ResetPasswordSchema> = async (data) =>{
        const request:ChangePasswordRequest={...data};
        handleChangePasswordMutation(request);
    }

    return (
        <section className="w-full max-w-full pl-1">
            <div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 dark:bg-gray-900 shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="flex-auto p-4">
                    <Form {...form} >
                        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
                            onSubmit={form.handleSubmit(onSubmit)} 
                            data-testid="form">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                <FormItem data-testid="email">
                                    <FormLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        {t("USERS.DETAILS.LABELS.email")}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email" 
                                            disabled
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                                                block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                                dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            data-testid="input-email"
                                            {...field} />
                                    </FormControl>
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                <FormItem data-testid="newPassword">
                                    <FormLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        {t("USERS.DETAILS.FORM.new-password")}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password" 
                                            placeholder="••••••••" 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 
                                                focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            data-testid="input-newPassword"
                                            {...field} />
                                    </FormControl>
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                <FormItem data-testid="confirm-password">
                                    <FormLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        {t("USERS.DETAILS.FORM.confirm-password")}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password" 
                                            placeholder="••••••••" 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 
                                                focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            data-testid="input-confirm-password"
                                            {...field} />
                                    </FormControl>
                                </FormItem>
                                )}
                            />
                            <Button 
                                type="submit" 
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none 
                                    focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 
                                    dark:focus:ring-primary-800"
                                disabled={mutationLoading}
                                >
                                {mutationLoading ? 
                                    <ButtonLoading /> : 
                                    t("USERS.DETAILS.BUTTONS.reset-password")
                                }
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    )
}

export default ChangePassword