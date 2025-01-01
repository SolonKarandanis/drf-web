"use client";

import { FC, PropsWithChildren, useState } from "react"
import { FormInputProps } from "../props"
import { FormControl, FormField, FormItem, FormLabel } from "@/shared/shadcn/components/ui/form";
import { Input  } from "@/shared/shadcn/components/ui/input";
import { twMerge } from "tailwind-merge";
import { Button } from "@/shared/shadcn/components/ui/button";

const FormInput:FC<PropsWithChildren<FormInputProps>> = ({
    name,
    children,
    required=false,
    className='',
    sectionClassName='',
    type,
    error,
    control,
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const requiredCss = required? 'required' : '';
    const labelHtml = (
        <FormLabel htmlFor={name} className={`form-label text-default ${requiredCss}`}>
            {children}
        </FormLabel>
    )

    const showPasswordButtonHtml = (
        <Button onClick={()=>setShowPassword(!showPassword)}  aria-label="button" 
            className="ti-btn ti-btn-light !rounded-s-none !mb-0" type="button">
            <i className={`${showPassword ? 'ri-eye-line' : 'ri-eye-off-line'} align-middle`}></i>
        </Button>
    );

    const errorHtml = error ? (
        <p className="mt-2 text-sm text-rose-600 dark:text-rose-500">
            {error}
        </p>
    ) : null;

    // const inputHtml = type ==='password' ? (
    //     <FormInput
    //         id={name}  
    //         name={name} 
    //         size={30}
    //         type={(showPassword) ? 'text' : "password"}
    //         className={twMerge('form-control',className)}
    //         aria-invalid={error ? "true" : "false"}
    //         {...rest}/>
       
    // ):(
    //     <FormInput 
    //         id={name}  
    //         name={name} 
    //         size={30}
    //         type={type}
    //         className={twMerge('form-control',className)}
    //         aria-invalid={error ? "true" : "false"}
    //         {...rest}/>
    // );

    const innerHtml = type ==='password' ? 
    (
        <FormField 
            control={control}
            name={name}
            render={({ field }) =>(
                <FormItem>
                    {labelHtml}
                    <div className="input-group">
                        <FormControl>
                            <Input
                                type={(showPassword) ? 'text' : "password"}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                                    block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                    dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                {...field} />
                            {showPasswordButtonHtml}
                            {errorHtml}
                        </FormControl>
                    </div>
                </FormItem>
            )}
        />
    ):
    (
        <FormField 
            control={control}
            name={name}
            render={({ field }) =>(
                <FormItem>
                    {labelHtml}
                    <FormControl>
                        <Input
                            type={type}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                                block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            {...field} />
                         {errorHtml}
                    </FormControl>
                </FormItem>
            )}
        />
    );


    return (
        <section className={sectionClassName}>
            {innerHtml}
        </section>
    )
}

export default FormInput