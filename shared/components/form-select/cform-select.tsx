import {FC} from 'react'
import CFormError from '@/shared/components/form-error/cform-error'
import { SelectProps } from '../props'


const CFormSelect:FC<SelectProps> = ({
    label,
    name,
    options,
    required=false,
    inputProps,
    error,
    ...rest
}) => {
    const labelHtml = required? (
        <label htmlFor={name} className="col-lg-4 col-form-label fw-bold fs-6">
            <span className='required'>{label}</span>
        </label>
    ):(
        
        <label htmlFor={name} className="col-lg-4 col-form-label fw-bold fs-6">
            {label}
        </label>
    )

    return (
        <section className="row mb-6">
            {labelHtml}
            <div className='col-lg-8 fv-row'>
                <select className='form-select form-select-solid form-select-lg fw-bold' 
                    {...(inputProps ?? {})}
                    {...rest}>
                    {options.map((option) =>(
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                {
                    error ? (<CFormError error={error} />) : null
                }
            </div>
        </section>
    )
}

export default CFormSelect