import * as z from "zod";
import { profileImage } from "./image.schemas";

export const UploadProfileImageSchema = z.object({
    profileImage: profileImage
});

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