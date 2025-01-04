"use client";

import * as z from "zod";
import { useState } from "react";
import { motion } from 'framer-motion'
import { CreateUserSchema,getCreateUserSchema } from "@/schemas/auth.schemas";

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import Stepper from "@/shared/components/stepper/stepper";
import CForm from "@/shared/components/form/cform";
import PersonalInfo from "../sections/personal-info";
import AddressInfo from "../sections/address-info";
import Credentials from "../sections/credentials";
import ArrowRight from "@/shared/svg/arrow-right";
import ArrowLeft from "@/shared/svg/arrow-left";
import { useTranslations } from "next-intl";



type Steps ={
    id:string;
    name:string;
    fields?:string[];
}

const steps:Steps[] = [
    {
      id: 'Step 1',
      name: 'Personal Information',
      fields: ['firstName', 'lastName', 'email','profileImage']
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

const roles =[
    {
        value:1,
        label:'Buyer',
    },
    {
        value:2,
        label:'Seller',
    }
]

const CreateUserForm = () => {
    const [previousStep, setPreviousStep] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const delta = currentStep - previousStep
    const formT = useTranslations("USERS.VALIDATION");
    

    const {
        register,
        handleSubmit,
        reset,
        trigger,
        control,
        formState: { errors,isDirty }
    } = useForm<CreateUserSchema>({
        resolver: zodResolver(getCreateUserSchema(formT))
    })


    const onSubmit: SubmitHandler<CreateUserSchema> = data => {
        console.log(data)
        reset()
    }

    type FieldName = keyof CreateUserSchema

    const next = async () => {
        const fields = steps[currentStep].fields
        const output = await trigger(fields as FieldName[], { shouldFocus: true })
        console.log(output)

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

    // const handleError =(error:ErrorResponse)=>{
	// 	const {status, data:{detail}} = error;
	// 	toast.error(`(${status}) ${detail}`);
	// }

    return (
        <section className='inset-0 flex flex-col justify-between p-24 '>
            {/* <PreventNavigation isDirty={isDirty} backHref={'/dashboard'} resetData={reset} /> */}
            <Stepper steps={steps}  currentStep={currentStep}/>
            <CForm className='py-12 mt-12' onSubmit={handleSubmit(onSubmit)}>
                {currentStep === 0 && (
                    <motion.div
                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <PersonalInfo control={control} register={register} errors={errors} />
                    </motion.div>
                )}
                {currentStep === 1 && (
                    <motion.div
                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <AddressInfo control={control} register={register} errors={errors} countries={countries} />
                    </motion.div>
                )}
                {currentStep === 2 && (
                    <motion.div
                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <Credentials control={control} register={register} errors={errors} roles={roles} />
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
                        data-testid="back-button"
                        type='button'
                        onClick={prev}
                        disabled={currentStep === 0}
                        className='px-2 py-1 text-sm font-semibold bg-white rounded shadow-sm text-sky-900 ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                        <ArrowLeft />
                    </button>
                    <button
                        data-testid="next-button"
                        type='button'
                        onClick={next}
                        disabled={currentStep === steps.length - 1}
                        className='px-2 py-1 text-sm font-semibold bg-white rounded shadow-sm text-sky-900 ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                        <ArrowRight />
                    </button>
                </div>
            </div> 
        </section>
    )
}

export default CreateUserForm