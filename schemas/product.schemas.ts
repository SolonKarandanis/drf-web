import * as z from "zod";
import { type TranslationValues } from "next-intl";

type Messages = keyof IntlMessages["PRODUCTS"]["VALIDATION"];

const numberSchema = z.object({
    code: z.number()
});

export function getSaveProductSchema(
    t?: (key: Messages, object?: TranslationValues | undefined) => string
){
    return z.object({
        name: z.string().min(1,{
            message: t?.("required-name"),
        }),
        sku: z.string({
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
        sizes:z.array(numberSchema).min(1, t?.("required-sizes")),
        colors:z.array(numberSchema).min(1,t?.("required-colors")),
        publishStatus:z.string({
            message: t?.("required-publish-status"),
        }),
        availabilityStatus:z.string({
            message: t?.("required-availability-status"),
        }),
    });
} 

export type SaveProductSchema = z.infer<ReturnType<typeof getSaveProductSchema>>;