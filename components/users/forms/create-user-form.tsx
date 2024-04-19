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
                <h2 className='text-base font-semibold leading-7 text-gray-900'>
                Personal Information
                </h2>
                <p className='mt-1 text-sm leading-6 text-gray-600'>
                Provide your personal details.
                </p>
            </CForm>   
        </section>
    )
}

export default CreateUserForm