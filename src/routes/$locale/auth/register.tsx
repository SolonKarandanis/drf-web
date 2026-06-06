import { Link, createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import { passwordStrength } from 'check-password-strength'

import { registerUser, type RegisterError } from '#/lib/register-server'
import { registerUserSchema, type RegisterUserSchema } from '#/features/auth/schemas'
import { useQuery } from '@tanstack/react-query'
import { allGroupsQueryOptions } from '#/features/users/api'
import { m } from '#/paraglide/messages'
import { CForm, FormInput, FormButton, PasswordStrength } from '#/components/form'
import { SocialButtons } from '#/features/auth/components/SocialButtons'

export const Route = createFileRoute('/$locale/auth/register')({
  component: RegisterPage,
})

function RegisterPage() {
  const { locale } = useParams({ from: '/$locale/auth/register' })
  const navigate = useNavigate()
  const [serverError, setServerError] = useState<RegisterError | null>(null)
  const [passStrength, setPassStrength] = useState(0)
  const { data: groups, isLoading: groupsLoading } = useQuery(allGroupsQueryOptions())

  const nonAdminGroups = (groups ?? []).filter((g) => g.name.toUpperCase() !== 'ADMIN')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUserSchema>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: { role: undefined, firstName: '', lastName: '', email: '', username: '', password: '', confirmPassword: '' },
  })

  useEffect(() => {
    const strength = passwordStrength(watch('password') ?? '')
    setPassStrength(strength.id)
  }, [watch('password')])

  const onSubmit = async (values: RegisterUserSchema) => {
    setServerError(null)
    const result = await registerUser({ data: values })
    if ('ok' in result && result.ok) {
      navigate({ to: '/$locale/auth/login', params: { locale } })
      return
    }
    setServerError(result as RegisterError)
  }

  return (
    <div className="authentication flex items-center justify-center text-defaultsize text-defaulttextcolor px-4 py-8">
      <div className="w-full max-w-md">
        <div className="box">
          <div className="box-body !p-[3rem]">

            <p className="mb-2 font-semibold text-center text-xl">{m.register_title()}</p>
            <p className="mb-4 text-[#8c9097] dark:text-white/50 opacity-70 font-normal text-center">
              {m.register_description()}
            </p>

            <CForm onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-12 gap-y-4">

                <FormInput
                  {...register('firstName')}
                  name="firstName"
                  sectionClassName="col-span-12 xl:col-span-6"
                  className="w-full rounded-md!"
                  error={errors.firstName?.message}
                >
                  {m.register_first_name()}
                </FormInput>

                <FormInput
                  {...register('lastName')}
                  name="lastName"
                  sectionClassName="col-span-12 xl:col-span-6"
                  className="w-full rounded-md!"
                  error={errors.lastName?.message}
                >
                  {m.register_last_name()}
                </FormInput>

                <FormInput
                  {...register('email')}
                  name="email"
                  type="email"
                  autoComplete="email"
                  sectionClassName="col-span-12"
                  className="w-full rounded-md!"
                  error={errors.email?.message}
                >
                  {m.register_email()}
                </FormInput>

                {/* Role */}
                <section className="col-span-12">
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    {m.register_role()} <span className="ml-0.5 text-destructive">*</span>
                  </label>
                  <select
                    {...register('role', { valueAsNumber: true })}
                    disabled={groupsLoading}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="">{m.register_role_placeholder()}</option>
                    {nonAdminGroups.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                  {errors.role && (
                    <p className="text-xs text-destructive mt-1">{errors.role.message}</p>
                  )}
                </section>

                <FormInput
                  {...register('username')}
                  name="username"
                  autoComplete="username"
                  sectionClassName="col-span-12"
                  className="w-full rounded-md!"
                  error={errors.username?.message}
                >
                  {m.register_username()}
                </FormInput>

                <FormInput
                  {...register('password')}
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  sectionClassName="col-span-12"
                  className="rounded-e-none!"
                  error={errors.password?.message}
                >
                  {m.register_password()}
                </FormInput>

                <div className="col-span-12 -mt-2">
                  <PasswordStrength passStrength={passStrength} />
                </div>

                <FormInput
                  {...register('confirmPassword')}
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  sectionClassName="col-span-12"
                  className="rounded-e-none!"
                  error={errors.confirmPassword?.message}
                >
                  {m.register_confirm_password()}
                </FormInput>

                {/* Terms & Conditions */}
                <div className="col-span-12">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="terms" />
                    <label className="form-check-label" htmlFor="terms">
                      {m.register_terms_agree()}
                      <Link to="/$locale/auth/login" params={{ locale }} className="text-success hover:underline">
                        <u>{m.register_terms()} &amp; {m.register_conditions()}</u>
                      </Link>
                      {' '}and{' '}
                      <Link to="/$locale/auth/login" params={{ locale }} className="text-success hover:underline">
                        <u>{m.register_privacy_policy()}</u>
                      </Link>
                    </label>
                  </div>
                </div>

                <div className="col-span-12 mt-2">
                  <FormButton type="submit" isLoading={isSubmitting} className="w-full">
                    {m.register_submit()}
                  </FormButton>
                </div>
              </div>

              {serverError && (
                <div className="text-sm text-destructive space-y-1 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 mt-4" role="alert">
                  <p className="font-medium">{m.register_error()}</p>
                  {serverError.kind === 'client' && <p>{serverError.message}</p>}
                  {serverError.kind === 'backend' && (
                    <ul className="list-disc pl-5">
                      {Object.entries(serverError.fieldErrors).map(([field, messages]) =>
                        messages.map((msg, i) => (
                          <li key={`${field}-${i}`}>
                            <strong>{field}:</strong> {msg}
                          </li>
                        )),
                      )}
                    </ul>
                  )}
                </div>
              )}
            </CForm>

            <div className="text-center mt-4">
              <p className="text-[0.75rem] ">
                {m.register_have_account()}{' '}
                <Link
                  to="/$locale/auth/login"
                  params={{ locale }}
                  className="text-sky-900 hover:underline"
                >
                  {m.register_sign_in()}
                </Link>
              </p>
            </div>

            <div className="my-4 text-center authentication-barrier">
              <span>{m.global_or()}</span>
            </div>

            <SocialButtons />

          </div>
        </div>
      </div>
    </div>
  )
}
