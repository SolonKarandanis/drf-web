import * as z from "zod";
import { type TranslationValues } from "next-intl";

type Messages = keyof IntlMessages["PRODUCTS"]["VALIDATION"];

const numberSchema = z.object({
    code: z.number().optional()
});

export function getSaveProductSchema(
    t?: (key: Messages, object?: TranslationValues | undefined) => string
){
    return z.object({
        title: z.string().min(1,{
            message: t?.("required-name"),
        }),
        sku: z.string().min(1,{
            message: t?.("required-sku"),
        }),
        content: z.string().optional(),
        fabricDetails: z.string().optional(),
        careInstructions: z.string().optional(),
        category:z.number({
            message: t?.("required-category"),
        }),
        gender:z.number({
            message: t?.("required-gender"),
        }),
        brand:z.number({
            message: t?.("required-brand"),
        }),
        sizes:z.array(z.number()).nonempty({
            message:t?.("required-sizes")
        }),
        colors:z.array(z.number()).min(1,{
            message:t?.("required-colors")
        }),
        publishStatus:z.string({
            message: t?.("required-publish-status"),
        }),
        availabilityStatus:z.string({
            message: t?.("required-availability-status"),
        }),
        inventory: z.number({
            message:t?.("required-inventory")
        })
        .int({
            message:t?.("integer-inventory")
        })
        .positive({
            message:t?.("positive-inventory")
        }),
        price: z.number({
            message:t?.("required-price")
        })
        .positive({
            message:t?.("positive-price")
        }),
    });
} 

export type SaveProductSchema = z.infer<ReturnType<typeof getSaveProductSchema>>;