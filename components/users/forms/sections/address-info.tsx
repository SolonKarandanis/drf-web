import {FC} from 'react'
import CFormInput from '@/shared/components/form-input/form-input'
import CFormSelect from "@/shared/components/form-select/form-select";
import { AddressInfoProps } from './props';

const AddressInfo:FC<AddressInfoProps> = ({register,errors,countries})=> {
  return (
    <>
        <h2 className='text-base font-semibold leading-7 text-gray-900'>
            Address
        </h2>
        <p className='mt-1 text-sm leading-6 text-gray-600'>
            Address where you can receive products.
        </p>
        <div className='grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <CFormSelect
                data-testid="select-country"
                name="country"
                options={countries}
                required={true}
                inputProps={register("country")}
                className="text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                sectionClassName="sm:col-span-3"
                autoComplete='country-name'
                error={errors.country?.message}>
                Country
            </CFormSelect>
            <CFormInput
                data-testid="input-street"
                type='text'
                required={true}
                name='street' 
                placeholder="Street"
                className="w-full !rounded-md"
                sectionClassName="sm:col-span-3"
                autoComplete='street-address'
                props={register("street")}
                error={errors.street?.message}>
                    Street address
            </CFormInput>
            <CFormInput
                data-testid="input-city"
                type='text'
                required={true}
                name='city' 
                placeholder="City"
                className="w-full !rounded-md"
                sectionClassName="sm:col-span-2 sm:col-start-1"
                props={register("city")}
                error={errors.city?.message}>
                    City
            </CFormInput>
            <CFormInput
                data-testid="input-state"
                type='text'
                required={true}
                name='state' 
                placeholder="State/Province"
                className="w-full !rounded-md"
                sectionClassName="sm:col-span-2"
                props={register("state")}
                error={errors.state?.message}>
                    State/Province
            </CFormInput>
            <CFormInput
                data-testid="input-zip"
                type='text'
                required={true}
                name='zip' 
                placeholder="ZIP/Postal code"
                className="w-full !rounded-md"
                sectionClassName="sm:col-span-2"
                autoComplete='postal-code'
                props={register("zip")}
                error={errors.zip?.message}>
                    ZIP/Postal code
            </CFormInput>
        </div>
    </>
  )
}

export default AddressInfo