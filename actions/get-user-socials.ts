"use server"

import { actionClient } from "@/lib/safe-action"
import { ApiControllers } from "@/shared/redux/api/ApiControllers";
import { baseUrl } from "@/utils/constants";
import * as z from "zod";

const schema = z.object({
    uuid: z.string(),
    accessToken:z.string()
});

export const getUserSocialsAction = actionClient
.schema(schema)
.action(async ({ parsedInput: { uuid, accessToken } })=>{
    
    const result = await fetch(`${baseUrl}/${ApiControllers.USERS}/${uuid}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${accessToken}`
        }
    })

    return result
});