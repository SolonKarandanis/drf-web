"use client";

import {FC, PropsWithChildren} from 'react'
 // @ts-ignore
import DatePicker from 'react-datepicker';
import { DateInputProps } from '../props';
import FormLabel from '../form-label/form-label';


const FormDate:FC<PropsWithChildren<DateInputProps>> = ({
    name,
    field,
    required=false,
    loading=false,
    error,
    sectionClassName,
    children
}) => {
    const hasError = error? true:false;
    const labelHtml = children ? (
        <FormLabel 
            name={name}
            required={required}
            hasError={hasError}>
            {children}
        </FormLabel>
    ):null

    return (
        <section className={sectionClassName}>
            
        </section>
    )
}

export default FormDate