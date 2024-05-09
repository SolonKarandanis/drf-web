"use server";
import * as z from "zod";
import { RegisterSchema } from '@/schemas/auth.schemas';


type RegisterSchema = z.infer<typeof RegisterSchema>;

export async function registerUser(data:RegisterSchema){
    console.log(data);
    const result = RegisterSchema.safeParse(data);
    if (!result.success){
        const errorMessages = result.error.issues.reduce((prev, issue) => {
            return (prev += issue.message);
        }, '');
        return {
            error: errorMessages,
        };
    }

    const {username,password,email,role,firstName,lastName,confirmPassword} = data;
    const request:CreateUserRequest={
        email,
        first_name:firstName,
        last_name:lastName,
        password,
        username,
        password2:confirmPassword
    }
    // fetch("/api/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then(data => console.log(data))
}