import { FC, InputHTMLAttributes,RefCallback } from 'react'
import CFormError from '@/shared/components/form-error/cform-error'


interface InputProps {
    onChange: (event:any) => unknown;
    onBlur: (event:any) => unknown;
    ref: RefCallback<HTMLInputElement>;
    name?: string;
    min?: string | number;
    max?: string | number;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    required?: boolean;
    disabled?: boolean;
}

interface Props extends InputHTMLAttributes<HTMLInputElement>{
    name:string,
    label:string,
    labelPosition?:'top'|'side'
    required?:boolean,
    className?:string,
    inputProps?:InputProps,
    error?:string
}


const CFormInput:FC<Props>  = ({name,label,labelPosition='side',required=false,className='',inputProps,error,...rest}) => {
    const requiredCss = required? 'required' : '';
    const labelHtml = (
        <label htmlFor={name} className={`form-label text-default ${requiredCss}`}>
            {label}
        </label>
    )

    const innerHtml = labelPosition==='side'? (
        <>
            {labelHtml}
            <div className="col-lg-8 fv-row">
                <input 
                  id={name}  
                  name={name} 
                  size={30}
                  className={`form-control form-control-lg form-control-solid mb-3 mb-lg-0 ${className} `}
                  aria-invalid={error ? "true" : "false"}
                  {...(inputProps ?? {})}
                  {...rest}/>

                {
                    error ? (<CFormError error={error} />) : null
                }
            </div>
        </>
    ) :(
        <div className="fv-row mb-0">
            {labelHtml}
            <input 
                  id={name}  
                  name={name} 
                  size={30}
                  className={`form-control form-control-lg form-control-solid  ${className} `}
                  aria-invalid={error ? "true" : "false"}
                  {...(inputProps ?? {})}
                  {...rest}/>

                {
                    error ? (<CFormError error={error} />) : null
                }
        </div>
    );


    return (
        <section className="row mb-6">
            {innerHtml}
        </section>
    )
}

export default CFormInput