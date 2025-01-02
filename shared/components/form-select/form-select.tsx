"use client"

import {FC,PropsWithChildren} from 'react'
import { twMerge } from "tailwind-merge";
import FormError from '@/shared/components/form-error/form-error'
import { SelectProps } from '../props'


const FormSelect:FC<PropsWithChildren<SelectProps>> = ({
    name,
    options,
    required=false,
    inputProps,
    className,
    sectionClassName,
    error,
    children,
    ...rest
}) => {
    const labelHtml = required? (
        <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <span className='required'>{children}</span>
        </label>
    ):(
        
        <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {children}
        </label>
    )

    return (
        <section className={sectionClassName}>
            {labelHtml}
            <div className='mt-2'>
                <select 
                    className={
                        twMerge('bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',className)
                    }
                    {...(inputProps ?? {})}
                    {...rest}>
                    <option>Select a value...</option>
                    {options.map((option) =>(
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                {
                    error ? (<FormError error={error} />) : null
                }
            </div>
        </section>
    )
}

export default FormSelect