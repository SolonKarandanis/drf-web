import {FC} from 'react'
import FormInput from '@/shared/components/form-input/form-input'
import FormSelect from "@/shared/components/form-select/form-select";
import { AddressInfoProps } from './props';
import { Controller } from 'react-hook-form';

const AddressInfo:FC<AddressInfoProps> = ({control,register,errors,countries})=> {
  return (
    <>
        <h2 className='text-base font-semibold leading-7 text-gray-900'>
            Address
        </h2>
        <p className='mt-1 text-sm leading-6 text-gray-600'>
            Address where you can receive products.
        </p>
        <div className='grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <Controller
                name="country"
                control={control}
                render={({ field }) => (
                    <FormSelect 
                        name="role"
                        options={countries}
                        sectionClassName="sm:col-span-3"
                        field={field}
                        error={errors.country?.message}>
                            Country
                    </FormSelect>
                )}
            />
            <FormInput
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
            </FormInput>
            <FormInput
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
            </FormInput>
            <FormInput
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
            </FormInput>
            <FormInput
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
            </FormInput>
        </div>
    </>
  )
}

export default AddressInfo