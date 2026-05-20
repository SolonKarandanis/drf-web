import { forwardRef } from 'react'
import type { PropsWithChildren, TextareaHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { FormLabel } from './FormLabel'
import { FormError } from './FormError'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  error?: string
  loading?: boolean
  sectionClassName?: string
}

export const FormTextArea = forwardRef<HTMLTextAreaElement, PropsWithChildren<Props>>(
  (
    {
      name,
      children,
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
    const hasError = !!error

    const baseTextAreaCss =
      'flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-y'

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
          <div className="h-20 w-full animate-pulse rounded-md bg-muted" />
        </section>
      )
    }

    return (
      <section className={sectionClassName}>
        {labelNode}
        <textarea
          ref={ref}
          id={name}
          name={name}
          className={twMerge(baseTextAreaCss, errorCss, className)}
          aria-invalid={hasError}
          disabled={disabled}
          {...rest}
        />
        {error && <FormError error={error} />}
      </section>
    )
  },
)

FormTextArea.displayName = 'FormTextArea'
