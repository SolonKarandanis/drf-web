import * as z from "zod";

export const UserSearchSchema = z.object({
    username: z.string().optional(),
    name: z.string().optional(),
    email: z.string().optional(),
    role:z.string(),
});