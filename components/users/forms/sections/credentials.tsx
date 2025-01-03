import {FC} from 'react'
import FormInput from '@/shared/components/form-input/form-input'
import { CredentialsProps } from './props';
import FormSelect from '@/shared/components/form-select/form-select';

const Credentials:FC<CredentialsProps> = ({register,errors,roles}) => {
  return (
    <>
        <h2 className='text-base font-semibold leading-7 text-gray-900'>
            Credentials
        </h2>
        <p className='mt-1 text-sm leading-6 text-gray-600'>
            Create Users Login Credentials
        </p>
        <div className='grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <FormSelect
                data-testid="select-role"
                name="role"
                options={roles}
                required={true}
                inputProps={register("role")}
                className="text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                sectionClassName="sm:col-span-3"
                autoComplete='role-name'
                error={errors.role?.message}>
                    Role
            </FormSelect>
            <FormInput
                data-testid="input-username"
                type='text'
                required={true}
                name='username' 
                placeholder="Username"
                autoComplete="username"
                className={"w-full !rounded-md"}
                sectionClassName="sm:col-span-3"
                props={register("username")}
                error={errors.username?.message}>
                    Username
            </FormInput>
            <FormInput
                data-testid="input-password"
                type='password'
                required={true}
                name='password' 
                placeholder="Password"
                autoComplete="new-password"
                className={"!rounded-e-none"}
                sectionClassName="sm:col-span-3"
                props={register("password")}
                error={errors.password?.message}>
                    Password
            </FormInput>
            <FormInput
                data-testid="input-confirmpassword"
                type='password'
                required={true}
                name='confirmpassword' 
                placeholder="Confirm Password"
                autoComplete="new-password"
                className={"!rounded-e-none"}
                sectionClassName="sm:col-span-3"
                props={register("confirmPassword")}
                error={errors.confirmPassword?.message}>
                    Confirm Password
            </FormInput>
        </div>
    </>
  )
}

export default Credentials