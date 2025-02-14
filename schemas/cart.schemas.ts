import * as z from "zod";
import { type TranslationValues } from "next-intl";

type Messages = keyof IntlMessages["CART"]["VALIDATION"];


export function getAddToCartSchema(
    t?: (key: Messages, object?: TranslationValues | undefined) => string
){
    return z.object({
        size:z.number({
            message: t?.("required-color"),
        }),
        color:z.number({
            message: t?.("required-size"),
        }),
        quantity:z.number({
            message: t?.("required-quantity"),
        })
            .int({
                message:t?.("integer-quantity")
            })
            .positive({
                message:t?.("positive-quantity")
            }),
    });
}

export type AddToCartSchema = z.infer<ReturnType<typeof getAddToCartSchema>>;