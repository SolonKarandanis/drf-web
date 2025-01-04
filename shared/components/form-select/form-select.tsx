"use client"

import {FC,PropsWithChildren} from 'react'
import FormError from '@/shared/components/form-error/form-error'
import { SelectProps } from '../props'
import Select from 'react-select';


const FormSelect:FC<PropsWithChildren<SelectProps>> = ({
    name,
    options,
    required=false,
    sectionClassName,
    error,
    children,
    placeholder,
    isSearchable=false
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
            <Select 
                id={name}
                name={name} 
                options={options}
                isSearchable={isSearchable}
                menuPlacement='auto' 
                classNamePrefix="Select2"
                placeholder={placeholder}
                required={required}
            />
            {
                error ? (<FormError error={error} />) : null
            }
        </section>
    )
}

export default FormSelect