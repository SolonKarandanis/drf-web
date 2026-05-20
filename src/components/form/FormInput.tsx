import { forwardRef, useState } from 'react'
import type { InputHTMLAttributes, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import { Eye, EyeOff } from 'lucide-react'
import { FormLabel } from './FormLabel'
import { FormError } from './FormError'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  error?: string
  loading?: boolean
  sectionClassName?: string
}

export const FormInput = forwardRef<HTMLInputElement, PropsWithChildren<Props>>(
  (
    {
      name,
      children,
      type = 'text',
      required = false,
      loading = false,
      className,
      sectionClassName,
      error,
      disabled = false,
      ...rest
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const hasError = !!error

    const baseInputCss =
      'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'

    const errorCss = hasError ? 'border-destructive focus-visible:ring-destructive' : ''

    const labelNode = children ? (
      <FormLabel name={name} required={!!required} hasError={hasError}>
        {children}
      </FormLabel>
    ) : null

    if (loading) {
      return (
        <section className={sectionClassName}>
          {labelNode}
          <div className="h-9 w-full animate-pulse rounded-md bg-muted" />
        </section>
      )
    }

    if (type === 'password') {
      return (
        <section className={sectionClassName}>
          {labelNode}
          <div className="relative">
            <input
              ref={ref}
              id={name}
              name={name}
              type={showPassword ? 'text' : 'password'}
              className={twMerge(baseInputCss, errorCss, 'pr-9', className)}
              aria-invalid={hasError}
              disabled={disabled}
              {...rest}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {error && <FormError error={error} />}
        </section>
      )
    }

    return (
      <section className={sectionClassName}>
        {labelNode}
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          className={twMerge(baseInputCss, errorCss, className)}
          aria-invalid={hasError}
          disabled={disabled}
          {...rest}
        />
        {error && <FormError error={error} />}
      </section>
    )
  },
)

FormInput.displayName = 'FormInput'
