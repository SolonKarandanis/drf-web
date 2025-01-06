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
        name: z.string().min(1,{
            message: t?.("required-name"),
        }),
        sku: z.string().min(1,{
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
        // sizes:z.array(z.number()).nonempty({
        //     message:t?.("required-sizes")
        // }),
        // colors:z.array(z.number().optional()).min(1,{
        //     message:t?.("required-colors")
        // }),
        sizes:z.array(z.number()).optional(),
        colors:z.array(z.number()).optional(),
        publishStatus:z.string({
            message: t?.("required-publish-status"),
        }),
        availabilityStatus:z.string({
            message: t?.("required-availability-status"),
        }),
    });
} 

export type SaveProductSchema = z.infer<ReturnType<typeof getSaveProductSchema>>;