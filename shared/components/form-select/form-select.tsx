"use client"

import {FC,PropsWithChildren} from 'react'
import FormError from '@/shared/components/form-error/form-error'
import { SelectProps } from '../props'
import { twMerge } from 'tailwind-merge';
import Select from 'react-select';
import { useTranslations } from 'next-intl';


const FormSelect:FC<PropsWithChildren<SelectProps>> = ({
    name,
    options,
    required=false,
    sectionClassName,
    error,
    children,
    placeholder,
    isMulti=false,
    isSearchable=false,
    onChange,
}) => {
    const t = useTranslations();
    const labelCss = `${twMerge('block mb-2 text-sm font-medium text-gray-900 dark:text-white')}`;
    const labelHtml = required? (
        <label htmlFor={name} className={labelCss}>
            <span className='required'>{children}</span>
        </label>
    ):(
        
        <label htmlFor={name} className={labelCss}>
            {children}
        </label>
    )

    const placeholderValue = placeholder? placeholder : t('GLOBAL.LABELS.select-value');
    
    return (
        <section className={sectionClassName}>
            {labelHtml}
            <div className='mt-2'>
                <Select
                    required={required}
                    placeholder={placeholderValue}
                    options={options}
                    classNamePrefix="Select2"
                    isMulti={isMulti}
                    isSearchable={isSearchable}
                    onChange={onChange}
                />
            </div>
            {
                error ? (<FormError error={error} />) : null
            }
        </section>
    )
}

export default FormSelect