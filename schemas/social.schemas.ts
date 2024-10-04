import * as z from "zod";

export const CreateUserSocialSchema = z.object({
    userId: z.number(),
    socialId: z.string(),
    url: z.string().url()
})

export const CreateUserSocialsSchema = z.object({
    socials: z.array(CreateUserSocialSchema)
});

export const DeleteSocialUserSchema = z.object({
    socialItemId: z.number(),
});