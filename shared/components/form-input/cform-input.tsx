"use client";

import { FC, useState } from 'react'
import CFormError from '@/shared/components/form-error/cform-error'
import { InputProps } from '../props';



const CFormInput:FC<InputProps>  = ({
    name,
    label,
    type='text',
    required=false,
    className='',
    props,
    error,
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const requiredCss = required? 'required' : '';
    const labelHtml = (
        <label htmlFor={name} className={`form-label text-default ${requiredCss}`}>
            {label}
        </label>
    )

    const inputHtml = type ==='password' ? (
        <input 
            id={name}  
            name={name} 
            size={30}
            type={type}
            className={`form-control form-control-lg ${className} `}
            aria-invalid={error ? "true" : "false"}
            {...(props ?? {})}
            {...rest}/>
    ):(
        <input 
            id={name}  
            name={name} 
            size={30}
            type={(showPassword) ? 'text' : "password"}
            className={`form-control form-control-lg ${className} `}
            aria-invalid={error ? "true" : "false"}
            {...(props ?? {})}
            {...rest}/>
    );

    const errorHtml = error ? (<CFormError error={error} />) : null;

    const showPasswordButtonHtml = (
        <button onClick={()=>setShowPassword(!showPassword)}  aria-label="button" 
            className="ti-btn ti-btn-light !rounded-s-none !mb-0" type="button" id="button-addon2">
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

    // const innerHtml = labelPosition==='side'? (
    //     <>
    //         {labelHtml}
    //         <div className="input-group">
    //             {inputHtml}
    //             {errorHtml}
    //         </div>
    //     </>
    // ) :(
    //     <div className="input-group">
    //         {labelHtml}
    //         {inputHtml}
    //         {errorHtml}
    //     </div>
    // );


    return (
        <section className="xl:col-span-12 col-span-12">
            {innerHtml}
        </section>
    )
}

export default CFormInput