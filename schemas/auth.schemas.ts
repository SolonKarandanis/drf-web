import * as z from "zod";
import { type TranslationValues } from "next-intl";

type Messages = keyof IntlMessages["USERS"]["VALIDATION"];

export function getBaseAuthSchema(
    t?: (key: Messages, object?: TranslationValues | undefined) => string
){
    return z.object({
        username: z.string().min(1,{
            message: t?.("required-username"),
        }),
        email: z.string().email({
            message: t?.("required-email"),
        }),
        firstName: z.string().min(1,{
            message: t?.("required-first-name"),
        }),
        lastName: z.string().min(1,{
            message: t?.("required-last-name"),
        }),
        password: z.string().min(6, {
            message: t?.("min-password"),
        }),
        role:z.string(),
    });
} 

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
    role:z.string(),
});

export function getNewPasswordSchema(
    t?: (key: Messages, object?: TranslationValues | undefined) => string
){
    return getBaseAuthSchema(t).pick({password:true});
}

export type NewPasswordSchema = z.infer<ReturnType<typeof getNewPasswordSchema>>;

export function getLoginSchema(
    t?: (key: Messages, object?: TranslationValues | undefined) => string
){
    return z.object({
        username: z.string().min(1,{
            message: t?.("required-username"),
        }),
        password: z.string().min(6, {
            message: t?.("min-password"),
        }),
    });
}

export type LoginSchema = z.infer<ReturnType<typeof getLoginSchema>>;


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
    
    // profileImage: z.instanceof(File).optional()
    //     .refine((files)=> files && files.size >= MAX_FILE_SIZE, `Max file size is 5MB.`)
    //     .refine((files)=> files && ACCEPTED_IMAGE_TYPES.includes(files.type),".jpg, .jpeg, .png and .webp files are accepted."),
    country: z.string().min(1, 'Country is required'),
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zip: z.string().min(1, 'Zip is required')
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
});

export const ForgotPasswordSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    newPassword: z.string().min(1, {
        message: "Minimum 6 characters required",
    }),
    confirmPassword: z.string().min(1, {
        message: "Minimum 6 characters required",
    }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
});

export const ResetPasswordSchema = z.object({
    currentPassword: z.string().min(1, {
        message: "Password is required",
    }),
    newPassword: z.string().min(1, {
        message: "Minimum 6 characters required",
    }),
    confirmPassword: z.string().min(1, {
        message: "Minimum 6 characters required",
    }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
});