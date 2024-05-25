"use server";
import * as z from "zod";
import { RegisterSchema } from '@/schemas/auth.schemas';


type RegisterSchema = z.infer<typeof RegisterSchema>;
const baseUrl= process.env.NEXTAUTH_BACKEND_URL;

export async function registerUser(data:RegisterSchema){
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
        firstName:firstName,
        lastName:lastName,
        role,
        password,
        username,
        password2:confirmPassword
    }
    const response = await fetch(`${baseUrl}auth/users/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    })
    const body=response.json();
    console.log(response);
    return response;
}