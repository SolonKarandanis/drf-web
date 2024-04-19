import {FC} from 'react'
import CFormInput from '@/shared/components/form-input/cform-input'
import { SectionProps } from './props';

const Credentials:FC<SectionProps> = ({register,errors}) => {
  return (
    <>
        <h2 className='text-base font-semibold leading-7 text-gray-900'>
            Credentials
        </h2>
        <p className='mt-1 text-sm leading-6 text-gray-600'>
            Create Users Login Credentials
        </p>
        <div className='grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <CFormInput 
                type='text'
                required={true}
                name='username' 
                placeholder="Username"
                autoComplete="username"
                className={"w-full !rounded-md"}
                sectionClassName="sm:col-span-2"
                props={register("username")}
                error={errors.username?.message}>
                    Username
            </CFormInput>
            <CFormInput 
                type='password'
                required={true}
                name='password' 
                placeholder="Password"
                autoComplete="new-password"
                className={"!rounded-e-none"}
                sectionClassName="sm:col-span-2"
                props={register("password")}
                error={errors.password?.message}>
                    Password
            </CFormInput>
            <CFormInput 
                type='password'
                required={true}
                name='confirmpassword' 
                placeholder="Confirm Password"
                autoComplete="new-password"
                className={"!rounded-e-none"}
                sectionClassName="sm:col-span-2"
                props={register("confirmPassword")}
                error={errors.confirmPassword?.message}>
                    Confirm Password
            </CFormInput>
        </div>
    </>
  )
}

export default Credentials