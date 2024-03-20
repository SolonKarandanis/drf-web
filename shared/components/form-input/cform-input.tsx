"use client";

import { FC, useState } from 'react'
import CFormError from '@/shared/components/form-error/cform-error'
import { InputProps } from '../props';



const CFormInput:FC<InputProps>  = ({
    name,
    label,
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

    const inputHtml = (
        <input 
            id={name}  
            name={name} 
            size={30}
            className={`form-control form-control-lg ${className} `}
            aria-invalid={error ? "true" : "false"}
            {...(props ?? {})}
            {...rest}/>
    );

    const errorHtml = error ? (<CFormError error={error} />) : null;

    

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
            {labelHtml}
            {inputHtml}
            {errorHtml}
        </section>
    )
}

export default CFormInput