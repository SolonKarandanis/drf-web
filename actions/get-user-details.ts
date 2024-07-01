"use server"

import { actionClient } from "@/lib/safe-action"
import * as z from "zod";

const schema = z.object({
    uuid: z.string(),
});

export const getUserDetailsAction = actionClient
.schema(schema)
.action(async ({ parsedInput: { uuid } })=>{
    
    // await fetch(`http://localhost:3500/users/${id}`, {
    //     method: 'PATCH',
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //         firstname: firstname,
    //         lastname: lastname,
    //         email: email,
    //     })
    // })
});