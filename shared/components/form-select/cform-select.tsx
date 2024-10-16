"use client"

import {FC,PropsWithChildren} from 'react'
import { twMerge } from "tailwind-merge";
import CFormError from '@/shared/components/form-error/cform-error'
import { SelectProps } from '../props'


const CFormSelect:FC<PropsWithChildren<SelectProps>> = ({
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
        <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
            <span className='required'>{children}</span>
        </label>
    ):(
        
        <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
            {children}
        </label>
    )

    return (
        <section className={sectionClassName}>
            {labelHtml}
            <div className='mt-2'>
                <select 
                    className={twMerge('block w-full rounded-md border-0 py-1.5',className)}
                    
                    {...(inputProps ?? {})}
                    {...rest}>
                    {options.map((option) =>(
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                {
                    error ? (<CFormError error={error} />) : null
                }
            </div>
        </section>
    )
}

export default CFormSelect