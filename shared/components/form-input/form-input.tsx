"use client";

import { FC, useState,PropsWithChildren } from 'react'
import { twMerge } from "tailwind-merge";
import { InputProps } from '../props';
import FormError from '@/shared/components/form-error/form-error';




const FormInput:FC<PropsWithChildren<InputProps>>  = ({
    name,
    children,
    type='text',
    required=false,
    className='',
    sectionClassName='',
    props,
    error,
    disabled,
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const requiredCss = required? 'required' : '';
    const labelCss = `text-sm font-medium text-default mb-2 text-gray-900 dark:text-white ${requiredCss}`;
    const labelErrorCss = error? "text-rose-700 dark:text-rose-500":"";
    const labelHtml = children ? (
        <label htmlFor={name} className={twMerge(labelCss,labelErrorCss)}>
            {children}
        </label>
    ):null

    const defaultInputStyles = `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
        dark:focus:ring-blue-500 dark:focus:border-blue-500
    `;

    const disabledCss =" cursor-not-allowed ";

    const inputCss = disabled ? `${defaultInputStyles} ${disabledCss}`: `${defaultInputStyles}`


    const inputHtml = type ==='password' ? (
        <input 
            id={name}  
            name={name} 
            size={30}
            type={(showPassword) ? 'text' : "password"}
            className={twMerge(inputCss,className)}
            aria-invalid={error ? "true" : "false"}
            {...(props ?? {})}
            {...rest}/>
       
    ):(
        <input 
            id={name}  
            name={name} 
            size={30}
            type={type}
            className={twMerge(inputCss,className)}
            aria-invalid={error ? "true" : "false"}
            {...(props ?? {})}
            {...rest}/>
    );

    const errorHtml = error ? (<FormError error={error} />) : null;

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
            </div>
            {errorHtml}
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

export default FormInput