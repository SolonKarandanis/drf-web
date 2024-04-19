import * as z from "zod";

export const BaseAuthSchema = z.object({
    username: z.string().min(1,{
        message: "Username is required",
    }),
    email: z.string().email({
        message: "Email is required",
    }),
    firstName: z.string().min(1,{
        message: "First Name is required",
    }),
    lastName: z.string().min(1,{
        message: "Last Name is required",
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
    }),
});

export const NewPasswordSchema = BaseAuthSchema.pick({
    password:true
});
  
export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
});

export const LoginSchema = z.object({
    username: z.string().min(1,{
        message: "Username is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    })
});

export const RegisterSchema = BaseAuthSchema.extend({
    confirmPassword: z.string().min(6, {
        message: "Minimum 6 characters required",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
});

export const CreateUserSchema = BaseAuthSchema.extend({
    confirmPassword: z.string().min(6, {
        message: "Minimum 6 characters required",
    }),
    country: z.string().min(1, 'Country is required'),
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zip: z.string().min(1, 'Zip is required')
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
});