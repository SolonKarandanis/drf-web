import { FieldErrors, UseFormRegister,Control } from "react-hook-form";


export interface FormProps{
    email: string;
    firstName: string;
    lastName: string;
    country: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    username: string;
    password: string;
    confirmPassword: string;
    profileImage?: File | undefined;
    role: number;
}

export interface SectionProps{
    control:Control<FormProps>,
    register: UseFormRegister<FormProps>;
    errors: FieldErrors<FormProps>;
}

export interface AddressInfoProps extends SectionProps{
    countries:{value:number,label:string}[]
}

export interface CredentialsProps extends SectionProps{
    roles:{value:number,label:string}[]
}