import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface SectionProps{
    register: UseFormRegister<{
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        profileImage: File;
        password: string;
        confirmPassword: string;
        country: string;
        street: string;
        city: string;
        state: string;
        zip: string;
    }>;
    errors: FieldErrors<{
        email: string;
        firstName: string;
        lastName: string;
        profileImage: File;
        country: string;
        street: string;
        city: string;
        state: string;
        zip: string;
        username: string;
        password: string;
        confirmPassword: string;
    }>;
}

export interface AddressInfoProps extends SectionProps{
    countries:{value:number,label:string}[]
}