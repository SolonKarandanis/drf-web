import * as z from "zod";
import { getProfileImage, ImageMessages, } from "./image.schemas";
import { TranslationValues } from "next-intl";

export function getUploadProfileImageSchema(
    t?: (key: ImageMessages, object?: TranslationValues | undefined) => string
){
    return z.object({
        profileImage: getProfileImage(t).nullable()
    });
}

export type UploadProfileImageSchema = z.infer<ReturnType<typeof getUploadProfileImageSchema>>;


export const UpdateUserBioSchema = z.object({
    bio:z.string().optional()
});

export const UpldateUserContactInfoSchema = z.object({
    email:z.string().email().optional(),
    phone: z.string().optional(),
    country: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    address: z.string().optional(),
    zip: z.string().optional(),
});