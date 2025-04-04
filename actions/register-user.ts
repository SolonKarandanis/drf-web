"use server";

import { getRegisterUserSchema, RegisterUserSchema } from '@/schemas/auth.schemas';
import { objectToArrayOfObjects } from "@/utils/functions";
import { ClientValidationError, BackendValidationError } from "@/models/error.models";
import { CreateUserRequest } from "@/models/user.models";
import { baseUrl } from "@/utils/constants";




export async function registerUser(data:RegisterUserSchema){
    const result = getRegisterUserSchema().safeParse(data);
    if (!result.success){
        const errorMessages = result.error.issues.reduce((prev, issue) => {
            return (prev += issue.message);
        }, '');
        return {
            kind:"client",
            error: errorMessages,
        } as ClientValidationError;
    }

    const {username,password,email,role,firstName,lastName,confirmPassword} = data;
    const request:CreateUserRequest={
        email,
        firstName:firstName,
        lastName:lastName,
        role,
        password,
        username,
        confirmPassword
    }
    const response = await fetch(`${baseUrl}/auth/users/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    })
    const {status} = response;

    if(status===400){
        const bodyJson= await response.json();
        const arrayOfObj = objectToArrayOfObjects(bodyJson);
        return {
            kind:"backend",
            status,
            data:arrayOfObj
        } as BackendValidationError;
    }
    return null;
}