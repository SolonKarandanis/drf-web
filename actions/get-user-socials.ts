"use server"

import { actionClient } from "@/lib/safe-action"
import { fetchUserSocials } from "@/shared/redux/api/fetch/fetch-user-socials";
import * as z from "zod";

const schema = z.object({
    uuid: z.string(),
});

export const getUserSocialsAction= actionClient
.schema(schema)
.action(async ({ parsedInput: { uuid } })=>{
    const result = await fetchUserSocials(uuid);
    return result
});