import * as z from "zod";

export const CreateUserSocialsSchema = z.object({
    userId: z.number(),
    socialId: z.number(),
    url: z.string()
});

export const DeleteSocialUserSchema = z.object({
    socialItemId: z.number(),
});