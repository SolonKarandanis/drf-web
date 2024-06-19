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