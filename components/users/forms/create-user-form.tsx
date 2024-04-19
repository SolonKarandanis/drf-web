"use client";

import * as z from "zod";
import { useState } from "react";
import { CreateUserSchema } from "@/schemas/auth.schemas";

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = z.infer<typeof CreateUserSchema>

const steps = [
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

    const processForm: SubmitHandler<Inputs> = data => {
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
            await handleSubmit(processForm)()
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

    return (
        <section className='inset-0 flex flex-col justify-between p-24 '>
            <nav aria-label='Progress'>
                <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
                    {steps.map((step, index) => (
                        <li key={step.name} className='md:flex-1'>
                        {currentStep > index ? (
                            <div className='flex flex-col w-full py-2 pl-4 transition-colors border-l-4 group border-sky-600 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                            <span className='text-sm font-medium transition-colors text-sky-600 '>
                                {step.id}
                            </span>
                            <span className='text-sm font-medium'>{step.name}</span>
                            </div>
                        ) : currentStep === index ? (
                            <div
                            className='flex flex-col w-full py-2 pl-4 border-l-4 border-sky-600 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                            aria-current='step'
                            >
                            <span className='text-sm font-medium text-sky-600'>
                                {step.id}
                            </span>
                            <span className='text-sm font-medium'>{step.name}</span>
                            </div>
                        ) : (
                            <div className='flex flex-col w-full py-2 pl-4 transition-colors border-l-4 border-gray-200 group md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                            <span className='text-sm font-medium text-gray-500 transition-colors'>
                                {step.id}
                            </span>
                            <span className='text-sm font-medium'>{step.name}</span>
                            </div>
                        )}
                        </li>
                    ))}
                </ol>
            </nav>
        </section>
    )
}

export default CreateUserForm