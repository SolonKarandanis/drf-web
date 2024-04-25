import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface SectionProps{
    register: UseFormRegister<{
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
        role: string;
    }>;
    errors: FieldErrors<{
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
        role: string;
    }>;
}

export interface AddressInfoProps extends SectionProps{
    countries:{value:number,label:string}[]
}

export interface CredentialsProps extends SectionProps{
    roles:{value:number,label:string}[]
}