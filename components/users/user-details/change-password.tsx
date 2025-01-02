"use client";

import { getResetPasswordSchema, ResetPasswordSchema } from "@/schemas/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutateUserDetails } from "../hooks/useMutateUserDetails";
import { ChangePasswordRequest } from "@/models/user.models";
import FormInput from "@/shared/components/form-input/form-input";
import FormButton from "@/shared/components/button/form-button";



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
    const {errors} = form.formState

    const onSubmit: SubmitHandler<ResetPasswordSchema> = async (data) =>{
        const request:ChangePasswordRequest={...data};
        handleChangePasswordMutation(request);
    }

    return (
        <section className="w-full max-w-full pl-1">
            <div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 dark:bg-gray-900 shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="flex-auto p-4">
                    <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
                        onSubmit={form.handleSubmit(onSubmit)} 
                        data-testid="form">
                        <FormInput 
                            type='text'
                            required={true}
                            disabled
                            name='email'
                            autoComplete="email" 
                            placeholder={t(`USERS.SEARCH.FORM.LABELS.email`)}
                            className={"w-full !rounded-md"}
                            sectionClassName="mb-2"
                            props={form.register("email")}
                            error={errors.email?.message}>
                            {t(`USERS.SEARCH.FORM.LABELS.email`)}
                        </FormInput>
                        <FormInput 
                            type='password'
                            required={true}
                            name='newPassword'
                            autoComplete="new-password" 
                            placeholder='••••••••'
                            className={"w-full !rounded-md"}
                            sectionClassName="mb-2"
                            props={form.register("newPassword")}
                            error={errors.newPassword?.message}>
                            {t(`USERS.DETAILS.FORM.new-password`)}
                        </FormInput>
                        <FormInput 
                            type='password'
                            required={true}
                            name='confirmPassword'
                            autoComplete="new-password" 
                            placeholder='••••••••'
                            className={"w-full !rounded-md"}
                            sectionClassName="mb-2"
                            props={form.register("confirmPassword")}
                            error={errors.confirmPassword?.message}>
                            {t(`USERS.DETAILS.FORM.confirm-password`)}
                        </FormInput>
                        <FormButton 
                            intent="info" 
                            size="md" 
                            type="submit"
                            className="w-full px-5 py-3"
                            isLoading={mutationLoading}
                            isDisabled={mutationLoading}>
                                {t(`USERS.DETAILS.BUTTONS.reset-password`)}
                        </FormButton>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ChangePassword