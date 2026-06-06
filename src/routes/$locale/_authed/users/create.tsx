import { createFileRoute, redirect, useNavigate, useParams } from '@tanstack/react-router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'

import { getIsAdmin } from '#/lib/session-server'
import { createUser, allGroupsQueryOptions } from '#/features/users/api'
import type { HttpError } from '#/shared/http/client'
import { createUserSchema, type CreateUserSchema } from '#/features/auth/schemas'
import { Button } from '#/components/ui/button'
import { FormInput } from '#/components/form'

export const Route = createFileRoute('/$locale/_authed/users/create')({
  beforeLoad: async ({ params }) => {
    const isAdmin = await getIsAdmin()
    if (!isAdmin) {
      throw redirect({ to: '/$locale/dashboard', params: { locale: params.locale } })
    }
  },
  component: CreateUserPage,
})

function CreateUserPage() {
  const { locale } = useParams({ from: '/$locale/_authed/users/create' })
  const navigate = useNavigate()
  const { data: groups, isLoading: groupsLoading } = useQuery(allGroupsQueryOptions())
  const { mutateAsync, isPending } = useMutation({ mutationFn: createUser })

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateUserSchema>({ resolver: zodResolver(createUserSchema) })

  const onSubmit = async (data: CreateUserSchema) => {
    try {
      const user = await mutateAsync(data)
      navigate({ to: '/$locale/users/$uuid', params: { locale, uuid: user.uuid } })
    } catch (err: unknown) {
      const body = (err as HttpError)?.body as { detail?: string } | undefined
      setError('root', { message: body?.detail ?? 'Failed to create user. Please try again.' })
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Create user</h1>
        <p className="text-sm text-muted-foreground mt-1">Admin-only — creates a new user account.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <FormInput {...register('firstName')} error={errors.firstName?.message}>
            First name
          </FormInput>
          <FormInput {...register('lastName')} error={errors.lastName?.message}>
            Last name
          </FormInput>
        </div>

        <FormInput {...register('email')} type="email" autoComplete="off" error={errors.email?.message}>
          Email
        </FormInput>

        <FormInput {...register('username')} autoComplete="off" error={errors.username?.message}>
          Username
        </FormInput>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Role</label>
          <select
            {...register('role', { valueAsNumber: true })}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
            disabled={groupsLoading}
          >
            <option value="">Select a role…</option>
            {(groups ?? []).map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
          {errors.role && <p className="text-xs text-destructive">{errors.role.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            {...register('password')}
            type="password"
            autoComplete="new-password"
            error={errors.password?.message}
          >
            Password
          </FormInput>
          <FormInput
            {...register('confirmPassword')}
            type="password"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
          >
            Confirm password
          </FormInput>
        </div>

        {errors.root && (
          <p className="text-sm text-destructive" role="alert">
            {errors.root.message}
          </p>
        )}

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={isPending} className="gap-2">
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Create user
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate({ to: '/$locale/users/search', params: { locale } })}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
