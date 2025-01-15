import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/utils/constants";
import { TranslationValues } from "next-intl";
import * as z from "zod";

export type ImageMessages = keyof IntlMessages["GLOBAL"]["VALIDATION"]["IMAGES"];

export function getProfileImage(
    t?: (key: ImageMessages, object?: TranslationValues | undefined) => string
){
    return z.instanceof(File).superRefine((file, ctx) =>{
        if(file){
            // First, add an issue if the mime type is wrong.
            if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: t?.("file-type",{
                        accepted_types: `${ACCEPTED_IMAGE_TYPES.join(", ")}`,
                        type:file.type
                    }),
                });
            }
    
                // Next add an issue if the file size is too large.
            if (file.size > MAX_FILE_SIZE) {
                ctx.addIssue({
                    code: z.ZodIssueCode.too_big,
                    type: "array",
                    message: t?.("file-size",{
                        max_size: MAX_FILE_SIZE,
                        file_size:file.size
                    }),
                    maximum: MAX_FILE_SIZE,
                    inclusive: true
                });
            }
        }
    });
}

export type ProfileImage = z.infer<ReturnType<typeof getProfileImage>>;

export const profileImage = z.instanceof(File).nullable().superRefine((file, ctx) =>{
    if(file){
        // First, add an issue if the mime type is wrong.
        if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `File must be one of [${ACCEPTED_IMAGE_TYPES.join(
                    ", "
                )}] but was ${file.type}`
            });
        }

            // Next add an issue if the file size is too large.
        if (file.size > MAX_FILE_SIZE) {
            ctx.addIssue({
                code: z.ZodIssueCode.too_big,
                type: "array",
                message: `The file must not be larger than ${MAX_FILE_SIZE} bytes: ${
                    file.size
                }`,
                maximum: MAX_FILE_SIZE,
                inclusive: true
            });
        }
    }
});