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
        role:z.number(),
    });
} 


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


export function getRegisterUserSchema(
    t?: (key: Messages, object?: TranslationValues | undefined) => string
){
    return getBaseAuthSchema(t).extend({
        confirmPassword: z.string().min(6, {
            message: t?.("min-confirm-password"),
        }),
    }).refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: t?.("passowrds-dont-match"),
    });
}

export type RegisterUserSchema = z.infer<ReturnType<typeof getRegisterUserSchema>>;

export function getCreateUserSchema(
    t?: (key: Messages, object?: TranslationValues | undefined) => string
){
    return getBaseAuthSchema(t).extend({
        confirmPassword: z.string().min(6, {
            message: t?.("min-confirm-password"),
        }),
        country: z.string().min(1, t?.("required-country")),
        street: z.string().min(1, t?.("required-street")),
        city: z.string().min(1, t?.("required-city")),
        state: z.string().min(1, t?.("required-state")),
        zip: z.string().min(1, t?.("required-zip"))
    }).refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: t?.("passowrds-dont-match"),
    });
}

export type CreateUserSchema = z.infer<ReturnType<typeof getCreateUserSchema>>;


export function getForgotPasswordSchema(
    t?: (key: Messages, object?: TranslationValues | undefined) => string
){
    return z.object({
        email: z.string().min(1,{
            message: t?.("required-email"),
        }),
        newPassword: z.string().min(6, {
            message: t?.("min-password"),
        }),
        confirmPassword: z.string().min(6, {
            message: t?.("min-confirm-password"),
        }),
    }).refine((data) => data.newPassword === data.confirmPassword, {
        path: ["confirmPassword"],
        message: t?.("passowrds-dont-match"),
    });
}

export type ForgotPasswordSchema = z.infer<ReturnType<typeof getForgotPasswordSchema>>;

export function getResetPasswordSchema(
    t?: (key: Messages, object?: TranslationValues | undefined) => string
){
    return z.object({
        email: z.string().min(1,{
            message: t?.("required-email"),
        }),
        newPassword: z.string().min(6, {
            message: t?.("min-password"),
        }),
        confirmPassword: z.string().min(6, {
            message: t?.("min-confirm-password"),
        }),
    }).refine((data) => data.newPassword === data.confirmPassword, {
        path: ["confirmPassword"],
        message: t?.("passowrds-dont-match"),
    });
}

export type ResetPasswordSchema = z.infer<ReturnType<typeof getForgotPasswordSchema>>;
