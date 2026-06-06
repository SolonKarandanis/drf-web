import { Link, createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { passwordStrength } from 'check-password-strength'

import { forgotPasswordSchema, type ForgotPasswordSchema } from '#/features/auth/schemas'
import { forgotPassword } from '#/features/users/api'
import type { HttpError } from '#/shared/http/client'
import { m } from '#/paraglide/messages'
import { CForm, FormInput, FormButton, PasswordStrength } from '#/components/form'
import { SocialButtons } from '#/features/auth/components/SocialButtons'

export const Route = createFileRoute('/$locale/auth/forgot-password')({
  component: ForgotPasswordPage,
})

function ForgotPasswordPage() {
  const { locale } = useParams({ from: '/$locale/auth/forgot-password' })
  const navigate = useNavigate()
  const { mutateAsync } = useMutation({ mutationFn: forgotPassword })
  const [passStrength, setPassStrength] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  useEffect(() => {
    const strength = passwordStrength(watch('newPassword') ?? '')
    setPassStrength(strength.id)
  }, [watch('newPassword')])

  const onSubmit = async (values: ForgotPasswordSchema) => {
    try {
      await mutateAsync(values)
      navigate({ to: '/$locale/auth/login', params: { locale }, search: { reset: '1' } })
    } catch (err: unknown) {
      const body = (err as HttpError)?.body as Record<string, string[]> | undefined
      if (body?.email) {
        setError('email', { message: body.email[0] })
      } else if (body?.password) {
        setError('confirmPassword', { message: body.password[0] })
      } else {
        setError('root', { message: m.forgot_error() })
      }
    }
  }

  return (
    <div className="authentication flex items-center justify-center text-defaultsize text-defaulttextcolor px-4">
      <div className="w-full max-w-md">
        <div className="box">
          <div className="box-body !p-[3rem]">

            <p className="mb-4 font-semibold text-center text-xl">{m.forgot_title()}</p>

            <CForm onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-12 gap-y-4">

                <FormInput
                  {...register('email')}
                  name="email"
                  type="email"
                  autoComplete="email"
                  sectionClassName="col-span-12"
                  className="w-full !rounded-md"
                  error={errors.email?.message}
                >
                  {m.forgot_email()}
                </FormInput>

                <FormInput
                  {...register('newPassword')}
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  sectionClassName="col-span-12"
                  className="!rounded-e-none"
                  error={errors.newPassword?.message}
                >
                  {m.forgot_new_password()}
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
                  className="!rounded-e-none"
                  error={errors.confirmPassword?.message}
                >
                  {m.forgot_confirm_password()}
                </FormInput>

                {errors.root && (
                  <p className="col-span-12 text-sm text-destructive" role="alert">
                    {errors.root.message}
                  </p>
                )}

                <div className="col-span-12 mt-2">
                  <FormButton type="submit" isLoading={isSubmitting} className="w-full">
                    {m.forgot_submit()}
                  </FormButton>
                </div>
              </div>
            </CForm>

            <div className="text-center mt-4">
              <p className="text-[0.75rem] ">
                {m.forgot_back_to_login()}{' '}
                <Link
                  to="/$locale/auth/login"
                  params={{ locale }}
                  className="text-sky-900 hover:underline"
                >
                  {m.login_title()}
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
