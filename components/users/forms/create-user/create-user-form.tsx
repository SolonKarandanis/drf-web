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
import PersonalInfo from "../sections/personal-info";
import AddressInfo from "../sections/address-info";
import Credentials from "../sections/credentials";

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

const countries =[
    {
        value:1,
        label:'United States',
    },
    {
        value:2,
        label:'Canada',
    },
    {
        value:3,
        label:'Mexico',
    },
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
                        <PersonalInfo register={register} errors={errors} />
                    </motion.div>
                )}
                {currentStep === 1 && (
                    <motion.div
                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <AddressInfo register={register} errors={errors} countries={countries} />
                    </motion.div>
                )}
                {currentStep === 2 && (
                    <motion.div
                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <Credentials register={register} errors={errors} />
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