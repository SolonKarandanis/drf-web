import { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface Props{
    name:string;
    required:boolean;
    hasError:boolean;
}

const FormLabel:FC<PropsWithChildren<Props>> = ({
    name,
    required,
    hasError,
    children
}) => {
    const requiredCss = required? 'required' : '';
    const labelCss = `text-sm font-medium text-default mb-2 text-gray-900 dark:text-white ${requiredCss}`;
    const labelErrorCss = hasError? "text-rose-700 dark:text-rose-500":"";
    return (
        <label htmlFor={name} className={twMerge(labelCss,labelErrorCss)}>
            {children}
        </label>
    )
}

export default FormLabel