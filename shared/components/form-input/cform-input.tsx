"use client";

import { FC, useState,PropsWithChildren } from 'react'
import { twMerge } from "tailwind-merge";
import CFormError from '@/shared/components/form-error/cform-error'
import { InputProps } from '../props';




const CFormInput:FC<PropsWithChildren<InputProps>>  = ({
    name,
    children,
    type='text',
    required=false,
    className='',
    sectionClassName='',
    props,
    error,
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const requiredCss = required? 'required' : '';
    const labelHtml = (
        <label htmlFor={name} className={`form-label text-default ${requiredCss}`}>
            {children}
        </label>
    )

    const inputHtml = type ==='password' ? (
        <input 
            id={name}  
            name={name} 
            size={30}
            type={(showPassword) ? 'text' : "password"}
            className={twMerge('form-control',className)}
            aria-invalid={error ? "true" : "false"}
            {...(props ?? {})}
            {...rest}/>
       
    ):(
        <input 
            id={name}  
            name={name} 
            size={30}
            type={type}
            className={twMerge('form-control',className)}
            aria-invalid={error ? "true" : "false"}
            {...(props ?? {})}
            {...rest}/>
    );

    const errorHtml = error ? (<CFormError error={error} />) : null;

    const showPasswordButtonHtml = (
        <button onClick={()=>setShowPassword(!showPassword)}  aria-label="button" 
            className="ti-btn ti-btn-light !rounded-s-none !mb-0" type="button">
            <i className={`${showPassword ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}></i>
        </button>
    );

    const innerHtml = type ==='password' ? 
    (
        <>
            {labelHtml}
            <div className="input-group">
                {inputHtml}
                {showPasswordButtonHtml}
                {errorHtml}
            </div>
        </>
    ):
    (
        <>
            {labelHtml}
            {inputHtml}
            {errorHtml}
        </>
    );


    return (
        <section className={sectionClassName}>
            {innerHtml}
        </section>
    )
}

export default CFormInput