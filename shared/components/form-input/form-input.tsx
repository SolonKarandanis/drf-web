"use client";

import { FC, useState,PropsWithChildren, useRef, forwardRef, useImperativeHandle } from 'react'
import { twMerge } from "tailwind-merge";
import { InputProps } from '../props';
import FormError from '@/shared/components/form-error/form-error';
import FormLabel from '../form-label/form-label';

interface InputHandleApi{
    focus:()=>void;
    shake:()=>void;
}


const FormInput=forwardRef<InputHandleApi,PropsWithChildren<InputProps>>(({
    name,
    children,
    type='text',
    required=false,
    loading=false,
    className='',
    sectionClassName='',
    props,
    error,
    disabled=false,
    ...rest
},ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [shouldShake, setShouldShake] = useState(false);

    useImperativeHandle(ref, ()=>({
        focus() {
            // inputRef.current.focus();
        },
        shake() {
            setShouldShake(true);
        },
    }),[]);

    const hasError = error? true:false;
    const labelHtml = children ? (
        <FormLabel 
            name={name}
            required={required}
            hasError={hasError}>
            {children}
        </FormLabel>
    ):null

    if(loading){
        return (
          <section className={sectionClassName}>
            {labelHtml}
            <div role="status" className="w-full animate-pulse dark:border-gray-700">
              <div className="h-10 bg-gray-400  dark:bg-gray-700 mb-2.5"></div>
            </div>
          </section>
        )
    }

    const defaultInputStyles = `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
        block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
        dark:focus:ring-blue-500 dark:focus:border-blue-500
    `;

    const disabledCss =" cursor-not-allowed ";

    const inputCss = disabled ? `${defaultInputStyles} ${disabledCss}`: `${defaultInputStyles}`

    const shakeCss = hasError ? 'shake-animation' : '';


    const inputHtml = type ==='password' ? (
        <input 
            id={name}  
            name={name} 
            size={30}
            type={(showPassword) ? 'text' : "password"}
            className={twMerge(inputCss,className)}
            aria-invalid={error ? "true" : "false"}
            disabled={disabled}
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
            disabled={disabled}
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
})

export default FormInput