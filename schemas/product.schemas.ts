import * as z from "zod";
import { type TranslationValues } from "next-intl";

type Messages = keyof IntlMessages["PRODUCTS"]["VALIDATION"];

export function getSaveProductSchema(
    t?: (key: Messages, object?: TranslationValues | undefined) => string
){
    return z.object({
        name: z.string().min(1,{
            message: t?.("required-name"),
        }),
        sku: z.string().email({
            message: t?.("required-sku"),
        }),
        category:z.number({
            message: t?.("required-category"),
        }),
        gender:z.number({
            message: t?.("required-gender"),
        }),
        brand:z.number({
            message: t?.("required-brand"),
        }),
        sizes:z.array(z.number()).min(1,{
            message: t?.("required-sizes"),
        }),
        colors:z.array(z.number()).min(1,{
            message: t?.("required-colors"),
        }),
    });
} 

export type SaveProductSchema = z.infer<ReturnType<typeof getSaveProductSchema>>;