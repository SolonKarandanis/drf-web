import { FC } from 'react'
import CFormError from '@/shared/components/form-error/cform-error'
import { InputProps } from '../props';



const CFormInput:FC<InputProps>  = ({
    name,
    label,
    labelPosition='side',
    required=false,
    className='',
    props,
    error,
    ...rest
}) => {
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

    const innerHtml = labelPosition==='side'? (
        <>
            {labelHtml}
            <div className="col-lg-8 fv-row">
                {inputHtml}
                {errorHtml}
            </div>
        </>
    ) :(
        <div className="fv-row mb-0">
            {labelHtml}
            {inputHtml}
            {errorHtml}
        </div>
    );


    return (
        <section className="xl:col-span-12 col-span-12">
            {innerHtml}
        </section>
    )
}

export default CFormInput