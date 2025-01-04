import { FieldErrors, UseFormRegister,Control } from "react-hook-form";

export interface SectionProps{
    control:Control<{
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
    }>,
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
        role: number;
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
        role: number;
    }>;
}

export interface AddressInfoProps extends SectionProps{
    countries:{value:number,label:string}[]
}

export interface CredentialsProps extends SectionProps{
    roles:{value:number,label:string}[]
}