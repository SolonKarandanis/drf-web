import type { FormHTMLAttributes, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  className?: string
}

export function CForm({ children, className, ...props }: PropsWithChildren<Props>) {
  return (
    <form noValidate className={twMerge('space-y-5', className)} {...props}>
      {children}
    </form>
  )
}
