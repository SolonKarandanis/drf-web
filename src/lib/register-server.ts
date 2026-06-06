import { createServerFn } from '@tanstack/react-start'
import { registerUserSchema } from '#/features/auth/schemas'

const DJANGO_URL = process.env.DJANGO_BACKEND_URL ?? 'http://localhost:8000/api/'

// Mirrors drf-web/actions/register-user.ts. Posts to Django's user creation
// endpoint and returns either { ok: true } or a structured validation error
// payload that the form can surface.
export type RegisterError =
  | { kind: 'client'; message: string }
  | { kind: 'backend'; status: number; fieldErrors: Record<string, Array<string>> }

export type RegisterResult = { ok: true } | RegisterError

export const registerUser = createServerFn({ method: 'POST' })
  .inputValidator(registerUserSchema)
  .handler(async ({ data }): Promise<RegisterResult> => {
    const body = {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      role: data.role,
    }
    const response = await fetch(`${DJANGO_URL}auth/users/create/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (response.status === 400) {
      // Django returns { field: ["msg1", "msg2"], ... }
      const fieldErrors = (await response.json()) as Record<string, Array<string>>
      return { kind: 'backend', status: 400, fieldErrors }
    }
    if (!response.ok) {
      return {
        kind: 'client',
        message: `Server returned ${response.status}`,
      }
    }
    return { ok: true }
  })
