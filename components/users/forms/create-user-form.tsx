"use client";

import * as z from "zod";
import { useState } from "react";
import { motion } from 'framer-motion'
import { CreateUserSchema } from "@/schemas/auth.schemas";

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify';
import Stepper from "@/shared/components/stepper/stepper";
import CForm from "@/shared/components/form/cform";
import CFormInput from '@/shared/components/form-input/cform-input';

type Inputs = z.infer<typeof CreateUserSchema>

type Steps ={
    id:string;
    name:string;
    fields?:string[];
}

const steps:Steps[] = [
    {
      id: 'Step 1',
      name: 'Personal Information',
      fields: ['firstName', 'lastName', 'email']
    },
    {
      id: 'Step 2',
      name: 'Address',
      fields: ['country', 'state', 'city', 'street', 'zip']
    },
    {
        id: 'Step 3',
        name: 'Credenmtials',
        fields: ['username', 'password', 'confirmPassword']
    },
    { id: 'Step 4', name: 'Complete' }
]

const CreateUserForm = () => {
    const [previousStep, setPreviousStep] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const delta = currentStep - previousStep

    const {
        register,
        handleSubmit,
        watch,
        reset,
        trigger,
        formState: { errors }
    } = useForm<Inputs>({
        resolver: zodResolver(CreateUserSchema)
    })

    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data)
        reset()
    }

    type FieldName = keyof Inputs

    const next = async () => {
        const fields = steps[currentStep].fields
        const output = await trigger(fields as FieldName[], { shouldFocus: true })

        if (!output) return

        if (currentStep < steps.length - 1) {
            if (currentStep === steps.length - 2) {
            await handleSubmit(onSubmit)()
            }
            setPreviousStep(currentStep)
            setCurrentStep(step => step + 1)
        }
    }
    
    const prev = () => {
        if (currentStep > 0) {
            setPreviousStep(currentStep)
            setCurrentStep(step => step - 1)
        }
    }

    const handleError =(error:ErrorResponse)=>{
		const {status, data:{detail}} = error;
		toast.error(`(${status}) ${detail}`);
	}

    return (
        <section className='inset-0 flex flex-col justify-between p-24 '>
            <Stepper steps={steps}  currentStep={currentStep}/>
            <CForm className='py-12 mt-12' onSubmit={handleSubmit(onSubmit)}>
                {currentStep === 0 && (
                    <motion.div
                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
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
                    </motion.div>
                )}
                {currentStep === 1 && (
                    <motion.div
                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <h2 className='text-base font-semibold leading-7 text-gray-900'>
                            Address
                        </h2>
                        <p className='mt-1 text-sm leading-6 text-gray-600'>
                            Address where you can receive products.
                        </p>

                        <div className='grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6'>
                            
                            <div className='sm:col-span-3'>
                                <label
                                htmlFor='country'
                                className='block text-sm font-medium leading-6 text-gray-900'
                                >
                                Country
                                </label>
                                <div className='mt-2'>
                                <select
                                    id='country'
                                    {...register('country')}
                                    autoComplete='country-name'
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6'
                                >
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>Mexico</option>
                                </select>
                                {errors.country?.message && (
                                    <p className='mt-2 text-sm text-red-400'>
                                    {errors.country.message}
                                    </p>
                                )}
                                </div>
                            </div>

                            <CFormInput 
                                type='text'
                                required={true}
                                name='street' 
                                placeholder="Street"
                                className="w-full !rounded-md"
                                sectionClassName="col-span-full"
                                autoComplete='street-address'
                                props={register("street")}
                                error={errors.street?.message}>
                                    Street address
                            </CFormInput>
                            <CFormInput 
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
                    </motion.div>
                )}
                {currentStep === 2 && (
                    <motion.div
                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <h2 className='text-base font-semibold leading-7 text-gray-900'>
                            Credentials
                        </h2>
                        <p className='mt-1 text-sm leading-6 text-gray-600'>
                            Create Users Login Credentials
                        </p>
                    </motion.div>
                )}
                {currentStep === 3 && (
                    <>
                        <h2 className='text-base font-semibold leading-7 text-gray-900'>
                        Complete
                        </h2>
                        <p className='mt-1 text-sm leading-6 text-gray-600'>
                        Thank you for your submission.
                        </p>
                    </>
                )}
            </CForm>
            <div className='pt-5 mt-8'>
                <div className='flex justify-between'>
                    <button
                        type='button'
                        onClick={prev}
                        disabled={currentStep === 0}
                        className='px-2 py-1 text-sm font-semibold bg-white rounded shadow-sm text-sky-900 ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                        <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-6 h-6'
                        >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M15.75 19.5L8.25 12l7.5-7.5'
                        />
                        </svg>
                    </button>
                    <button
                        type='button'
                        onClick={next}
                        disabled={currentStep === steps.length - 1}
                        className='px-2 py-1 text-sm font-semibold bg-white rounded shadow-sm text-sky-900 ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                        <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-6 h-6'
                        >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M8.25 4.5l7.5 7.5-7.5 7.5'
                        />
                        </svg>
                    </button>
                </div>
            </div> 
        </section>
    )
}

export default CreateUserForm