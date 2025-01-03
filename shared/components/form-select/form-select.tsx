"use client"

import {FC,PropsWithChildren} from 'react'
import FormError from '@/shared/components/form-error/form-error'
import { SelectProps } from '../props'
import Select from 'react-select';


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
    return (
        <section className={sectionClassName}>
            <Select 
                id="product-gender-add"
                name="product-gender-add" 
                options={options} 
                className="w-full !rounded-md" 
                isSearchable
                menuPlacement='auto' 
                classNamePrefix="Select2" 
                placeholder="Select"
            />
            {
                error ? (<FormError error={error} />) : null
            }
        </section>
    )
}

export default FormSelect