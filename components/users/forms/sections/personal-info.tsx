import CFormInput from '@/shared/components/form-input/cform-input'
import {FC} from 'react'
import { SectionProps } from './props';

const PersonalInfo:FC<SectionProps> = ({register,errors}) => {
  return (
    <>
        <h2 className='text-base font-semibold leading-7 text-gray-900'>
            Personal Information
        </h2>
        <p className='mt-1 text-sm leading-6 text-gray-600'>
            Provide your personal details.
        </p>
        <div className='grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <CFormInput 
                type='text'
                required={true}
                name='firstName' 
                placeholder="First Name"
                className="w-full !rounded-md"
                sectionClassName="sm:col-span-3"
                autoComplete='firstName'
                props={register("firstName")}
                error={errors.firstName?.message}>
                    First Name
            </CFormInput>
            <CFormInput 
                type='text'
                required={true}
                name='lastName' 
                placeholder="Last name"
                className="w-full !rounded-md"
                sectionClassName="sm:col-span-3"
                autoComplete='lastName'
                props={register("lastName")}
                error={errors.lastName?.message}>
                    Last name
            </CFormInput>
            <CFormInput 
                type='email'
                required={true}
                name='email' 
                placeholder="Email"
                className="w-full !rounded-md"
                sectionClassName="sm:col-span-3"
                autoComplete='email'
                props={register("email")}
                error={errors.email?.message}>
                    Email address
            </CFormInput>
        </div>
    </>
  )
}

export default PersonalInfo