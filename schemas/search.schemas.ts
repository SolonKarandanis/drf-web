import { UserStatus } from "@/models/user.models";
import * as z from "zod";

const statusValues = Object.keys(UserStatus) as [keyof typeof UserStatus]

export const UserSearchSchema = z.object({
    username: z.string().optional(),
    name: z.string().optional(),
    email: z.string().optional(),
    role:z.string(),
    status:z.enum(statusValues)
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