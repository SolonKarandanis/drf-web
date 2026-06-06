import { Link, createFileRoute, useNavigate, useParams, useSearch } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { z } from 'zod'

import { signInWithDjango } from '#/lib/django-bridge'
import { setLoginResponseInStorage } from '#/shared/token-storage'
import { m } from '#/paraglide/messages'
import { CForm, FormInput, FormButton, FormError } from '#/components/form'
import { SocialButtons } from '#/features/auth/components/SocialButtons'

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
})
type FormValues = z.infer<typeof schema>

export const Route = createFileRoute('/$locale/auth/login')({
  validateSearch: z.object({ reset: z.string().optional() }),
  component: LoginPage,
})

function LoginPage() {
  const { locale } = useParams({ from: '/$locale/auth/login' })
  const { reset } = useSearch({ from: '/$locale/auth/login' })
  const navigate = useNavigate()
  const [serverError, setServerError] = useState<string | null>(null)
  const [rememberMe, setRememberMe] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (values: FormValues) => {
    setServerError(null)
    try {
      const result = await signInWithDjango({ data: values })
      setLoginResponseInStorage(result)
      navigate({ to: '/$locale/dashboard', params: { locale } })
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Login failed')
    }
  }

  return (
    <div className="authentication flex items-center justify-center text-defaultsize text-defaulttextcolor px-4">
      <div className="w-full max-w-md">
        <div className="box">
          <div className="box-body p-12!">

            <p className="mb-2 font-semibold text-center text-xl">{m.login_title()}</p>
            <p className="mb-4 text-[#8c9097] dark:text-white/50 opacity-70 font-normal text-center">
              {m.login_description()}
            </p>

            {reset === '1' && (
              <p className="rounded-md bg-green-50 px-4 py-3 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400 mb-4" role="status">
                {m.forgot_success()}
              </p>
            )}

            <CForm onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-12 gap-y-4">
                <FormInput
                  {...register('username')}
                  name="username"
                  autoComplete="username"
                  sectionClassName="col-span-12"
                  className="w-full rounded-md!"
                >
                  {m.login_username()}
                </FormInput>

                {/* Password with inline "Forgot?" link */}
                <section className="col-span-12">
                  <div className="flex justify-between items-center mb-1.5">
                    <label htmlFor="password" className="text-sm font-medium text-foreground">
                      {m.login_password()} <span className="ml-0.5 text-destructive">*</span>
                    </label>
                    <Link
                      to="/$locale/auth/forgot-password"
                      params={{ locale }}
                      className="text-xs text-danger hover:underline"
                    >
                      {m.login_forgot()}
                    </Link>
                  </div>
                  <FormInput
                    {...register('password')}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="rounded-e-none!"
                  />
                </section>

                {/* Remember me */}
                <div className="col-span-12 mb-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      {m.login_remember_me()}
                    </label>
                  </div>
                </div>

                <div className="col-span-12 mt-2">
                  <FormButton type="submit" isLoading={isSubmitting} className="w-full">
                    {m.login_submit()}
                  </FormButton>
                </div>
              </div>

              {serverError && <FormError error={serverError} />}
            </CForm>

            <div className="text-center mt-4">
              <p className="text-[0.75rem]">
                {m.login_have_no_account()}{' '}
                <Link
                  to="/$locale/auth/register"
                  params={{ locale }}
                  className="text-sky-900 hover:underline"
                >
                  {m.login_sign_up()}
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
