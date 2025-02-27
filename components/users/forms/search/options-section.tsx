"use client"

import FormSelect from "@/shared/components/form-select/form-select";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Options } from '@/shared/components/props';
import { useGetUserGroups } from "../../hooks/useGetUserGroups";

export interface FormProps{
    role: string;
    status: string;
}

export interface OptionsSectionProps{
    errors: FieldErrors<FormProps>;
    control:Control<any>;
}

const OptionsSection:FC<OptionsSectionProps> = ({
    control,
    errors
}) => {
    const t = useTranslations("USERS.SEARCH.FORM.LABELS");
    const groupOptions:Options[] = [];
    const {
        userGroups,
        isUserGroupsLoading
    } = useGetUserGroups();

    if(!isUserGroupsLoading && userGroups){
        userGroups.forEach((group)=> groupOptions.push({
            value:group.id,
            label:group.name
        }))
    }

    const statusOptions:Options[] = [
        {value:'ACTIVE',label:t("status-active")},
        {value:'UNVERIFIED',label:t("status-unverified")},
        {value:'DEACTIVATED',label:t("status-deactivated")},
        {value:'DELETED',label:t("status-deleted")}
    ]
    return (
        <div>
            <Controller
                name="role"
                control={control}
                render={({ field }) => (
                    <FormSelect 
                        options={groupOptions}
                        sectionClassName="mb-2"
                        field={field}
                        error={errors.role?.message}>
                            {t("role")}
                    </FormSelect>
                )}
            />
            <Controller
                name="status"
                control={control}
                render={({ field }) => (
                    <FormSelect 
                        options={statusOptions}
                        required={true}
                        sectionClassName="mb-2"
                        field={field}
                        error={errors.status?.message}>
                            {t("status")}
                    </FormSelect>
                )}
            />
        </div>
    )
}

export default OptionsSection