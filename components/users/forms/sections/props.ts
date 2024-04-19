import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface SectionProps{
    register: UseFormRegister<{
        username: string;
        email: string;
        firstName: string;
        lastName: string;
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
    }>;
}